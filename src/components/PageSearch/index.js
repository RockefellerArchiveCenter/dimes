import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import queryString from 'query-string'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from 'react-helmet'
import { useNavigate, useLocation } from 'react-router-dom'
import PageBackendError from '../PageBackendError'
import Button from '../Button'
import { SelectInput } from '../Inputs'
import { SearchSkeleton } from '../LoadingSkeleton'
import { FacetModal } from '../ModalSearch'
import { SearchPagination } from '../Pagination'
import { Plural, Select, Trans, t } from '@lingui/macro'
import SearchForm from '../SearchForm'
import SearchNotFound from '../SearchNotFound'
import CardList from '../Card'
import { appendParams, firePageViewEvent } from '../Helpers'
import './styles.scss'

const PageSearch = () => {

  const [backendError, setBackendError] = useState({})
  const [facetIsOpen, setFacetIsOpen] = useState(false)
  const [facetData, setFacetData] = useState({})
  const [inProgress, setInProgress] = useState(true)
  const [items, setItems] = useState([])
  const [params, setParams] = useState({ query: '', category: '' })
  const [pageCount, setPageCount] = useState(0)
  const [startItem, setStartItem] = useState(0)
  const [endItem, setEndItem] = useState(0)
  const [resultsCount, setResultsCount] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const pageSize = 40
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const sortOptions = [
    {
      value: '', label: t({
        comment: 'Sort by relevance label',
        message: 'Sort by relevance'
      })
    },
    {
      value: 'title', label: t({
        comment: 'Sort by title label',
        message: 'Sort by title'
      })
    },
    {
      value: 'creator', label: t({
        comment: 'Sort by creator name label',
        message: 'Sort by creator name'
      })
    }
  ]

  /** Execute search on initial page load */
  useEffect(() => {
    let params = queryString.parse(search, { parseBooleans: true })
    params.limit = pageSize
    const parsedOffset = +(params.offset)
    if (parsedOffset > 0) { params.offset = parsedOffset } else { delete params.offset }
    setParams(params)
  }, [])

  /** Set first search result */
  useEffect(() => {
    let newStartItem = 0
    if (resultsCount) newStartItem = 1
    if (params.offset > 0) newStartItem = params.offset
    setStartItem(newStartItem)
  }, [resultsCount, params.offset])

  /** Set last search result */
  useEffect(() => {
    let newEndItem = resultsCount > pageSize ? pageSize : resultsCount
    if (params.offset) newEndItem = Math.ceil(Number(params.offset) + Number(pageSize))
    setEndItem(newEndItem)
  }, [resultsCount, params.offset])

  /** Fetch data from facets endpoint when params change */
  useEffect(() => {
    if (params.query) {
      axios
        .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}/facets`, params))
        .then(res => setFacetData(res.data))
        .catch(err => setBackendError(err));
    }
  }, [params])

  /** Fetch suggestions data when params change */
  useEffect(() => {
    if (params.query) {
      axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}/search/suggest?title_suggest=${params.query}`)
        .then(res => {
          const suggestions = res.data.title_suggest.reduce((a, c) => {
            const options = c.options.map(o => o.text)
            return (a.concat(options))
          }, [])
          setSuggestions(suggestions)
        })
        .catch(err => setBackendError(err))
      }
  }, [params])

  /** Executes search and sets results in state */
  useEffect(() => {
    if (params.query) {
      navigate(appendParams(pathname, params))
      setInProgress(true)
      axios
        .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}/search`, params))
        .then(res => {
          setItems(res.data.results)
          setResultsCount(res.data.count)
          setPageCount(Math.ceil(res.data.count / pageSize))
        })
        .catch(err => setBackendError(err))
        .then(res => setInProgress(false));
    } else {
      setInProgress(false)
    }
  }, [params])

  /** Executes search when user clicks on Apply button in date facet */
  const handleDateFacetChange = (startYear, endYear) => {
    let newParams = { ...params }
    newParams.start_date__gte = startYear
    newParams.end_date__lte = endYear
    delete newParams.offset
    setParams(newParams)
  }

  /** Pushes changes to facet checkboxes to url and executes search */
  const handleFacetChange = (event, k) => {
    let newParams = { ...params }
    if (event.target.checked) {
      if (Array.isArray(newParams[k])) {
        newParams[k].push(event.target.name)
      } else if (newParams[k]) {
        newParams[k] = [newParams[k], event.target.name]
      } else {
        newParams[k] = event.target.name;
      }
    } else {
      Array.isArray(newParams[k]) ? delete newParams[k][newParams[k].indexOf(event.target.name)] : delete newParams[k]
    }
    delete newParams.offset
    setParams(newParams)
  }

  /** Executes a new search when search form inputs are changed **/
  const handleSearchFormChange = (category, query, online) => {
    let newParams = { ...params, query: query, category: category }
    if (online) {
      newParams.online = true
    } else {
      delete newParams.online
    }
    setParams(newParams)
  }

  /** Sets offset and executes search based on user input */
  const handlePageClick = (data) => {
    let offset = Math.ceil(data.selected * pageSize);
    let newParams = { ...params }
    if (offset > 0) { newParams.offset = offset } else { delete newParams.offset }
    setParams(newParams)
  };

  /** Changes sort based on user input */
  const handleSortChange = value => {
    let newParams = { ...params }
    value ? newParams.sort = value : delete newParams['sort']
    delete newParams.offset
    setParams(newParams)
  }

  /** Shows and hides the facet modal */
  const toggleFacetModal = () => {
    setFacetIsOpen(!facetIsOpen)
  }

  if (!!Object.keys(backendError).length) {
    return <PageBackendError error={backendError} />
  }
  return (
    <React.Fragment>
      <Trans comment='Search Results title'>
        <Helmet
          onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
          <title>Search Results</title>
        </Helmet>
      </Trans>
      <div className='container--full-width'>
        <div className='search-bar'>
          <SearchForm
            className='search-form--results'
            handleSearchFormChange={handleSearchFormChange}
            query={params.query}
            online={params.online}
            category={params.category} />
        </div>
        <main id='main' className='results'>
          <h1 className={classnames('results__title mt-30 mb-13', { 'loading-dots': inProgress })}>
            <Trans comment='Search Results header'>
              <Select
                value={inProgress}
                _true="Searching"
                other=
                {
                  <Select value={params.query}
                    _false='No search query entered'
                    other={
                      <Plural
                        value={resultsCount}
                        _0={`Sorry, there are no search results for ${`“${params.query.replace(/"([^"]+(?="))"/g, '$1')}”`}`}
                        other={`Search Results for ${`“${params.query.replace(/"([^"]+(?="))"/g, '$1')}”`}`}
                      />
                    }
                  />
                }
              />
            </Trans>
          </h1>
          {!resultsCount && !inProgress ?
            (<SearchNotFound suggestions={suggestions} query={params.query}/>) :
            <>
              <div className='results__header'>
                <div className='results__summary'>
                  <p className='results__summary--text'>
                    {inProgress ? (<Skeleton />) :
                      <Trans comment='Current Results shown of total results'>
                        <Select
                          value={startItem === endItem}
                          _true={startItem}
                          other={`${startItem}-${endItem} of ${resultsCount} results`}
                        />
                      </Trans>
                    }
                  </p>
                </div>
                <div className='results__controls'>
                  <Button
                    handleClick={() => toggleFacetModal()}
                    label={t({
                      comment: 'Label for Filters button',
                      message: 'Filters'
                    })}
                    iconBefore='filter_alt'
                    className='btn--light-blue btn--filter mr-16' />
                  <SelectInput
                    className='select__sort'
                    hideLabel
                    id='sort'
                    name={t({
                      comment: 'Name for sort results input',
                      message: 'sort'
                    })}
                    onChange={({selectedItem}) => handleSortChange(selectedItem.value)}
                    label={t({
                      comment: 'Label for sort results input',
                      message: 'Sort search results'
                    })}
                    selectedItem={params.sort || ''}
                    options={sortOptions} />
                </div>
                <div className='results__pagination'>
                  { inProgress ? (null) : (
                    <SearchPagination
                      offset={params.offset}
                      pageSize={pageSize}
                      pageCount={pageCount}
                      handlePageClick={handlePageClick} />
                  )}
                </div>
              </div>
              { inProgress ?
                  (<SearchSkeleton />) :
                  (<CardList
                    items={items}
                    params={params} />)}
              <div className='results__footer mb-30'>
                <div className='results__summary'>
                  <p className='results__summary--text'>
                    {inProgress ? (<Skeleton />) :
                      <Select
                        value={startItem === endItem}
                        _true={startItem}
                        other={`${startItem}-${endItem} of ${resultsCount} results`}
                      />
                    }
                  </p>
                </div>
                <div className='results__pagination'>
                  { inProgress ? (null) : (
                    <SearchPagination
                      offset={params.offset}
                      pageSize={pageSize}
                      pageCount={pageCount}
                      handlePageClick={handlePageClick} />
                  )}
              </div>
            </div>
          </>
          }
        </main>
      </div>
      <FacetModal
        isOpen={facetIsOpen}
        toggleModal={toggleFacetModal}
        data={facetData}
        params={params}
        resultsCount={resultsCount}
        handleChange={handleFacetChange}
        handleDateChange={handleDateFacetChange} />
    </React.Fragment>
  )
}

export default PageSearch;

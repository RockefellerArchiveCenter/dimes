import React, { useEffect, useState } from "react";
import { LiveMessage } from 'react-aria-live'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import classnames from 'classnames'
import { Helmet } from 'react-helmet'
import PageBackendError from '../PageBackendError'
import ContextSwitcher from '../ContextSwitcher'
import Minimap from '../Minimap'
import MinimapButton from '../MinimapButton'
import { ModalMinimap, ModalMinimapInfo } from '../ModalMinimap'
import { t } from "@lingui/macro";
import RecordsContent from '../RecordsContent'
import RecordsDetail from '../RecordsDetail'
import PageNotFound from '../PageNotFound'
import { appendParams, firePageViewEvent, formatBytes } from '../Helpers'

const PageRecords = ({ isDesktop, isMobile, myListCount, toggleInList }) => {

  const [ancestors, setAncestors] = useState({})
  const [backendError, setBackendError] = useState({})
  const [children, setChildren] = useState([])
  const [childrenUri, setChildrenUri] = useState('')
  const [downloadSize, setDownloadSize] = useState('')
  const [found, setFound] = useState(true)
  const [hasSeenMinimapIntro, setHasSeenMinimapIntro] = useState(true)
  const [isAncestorsLoading, setIsAncestorsLoading] = useState(true)
  const [isContentShown, setIsContentShown] = useState(false)
  const [isItemLoading, setIsItemLoading] = useState(true)
  const [isMinimapLoading, setIsMinimapLoading] = useState(true)
  const [isMinimapModalOpen, setIsMinimapModalOpen] = useState(false)
  const [isMinimapInfoModalOpen, setIsMinimapInfoModalOpen] = useState(false)
  const [item, setItem] = useState({ group: {} })
  const [itemInitialLoad, setItemInitialLoad] = useState(true)
  const [itemUri, setItemUri] = useState('')
  const [minimap, setMinimap] = useState({ hits: [] })
  const [params, setParams] = useState({})
  const [preExpanded, setPreExpanded] = useState([])
  const [updateMessage, setUpdateMessage] = useState('')
  const navigate = useNavigate()
  const { id, type } = useParams()
  const { search } = useLocation()
  const pageSize = 5

  /** Constructs a preExpanded list based on an item's ancestors */
  const constructPreExpanded = (ancestors, list) => {
    Object.keys(ancestors).length && list.push(ancestors.uri)
    return ancestors.child ? constructPreExpanded(ancestors.child, list) : list
  }

  /** Returns the first ancestor or the item if no ancestors are present */
  const parseCollection = () => {
    return Object.keys(ancestors).length ? ancestors : item
  }

  /** Updates state with item found at URL. */
  const setActiveRecords = uri => {
    if (uri !== item.uri) {
      const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}${uri}`
      setItemUri(itemUrl)
    }
  }

  /** Show or hide the RecordsContent on mobile */
  const toggleIsContentShown = () => {
    setIsContentShown(!isContentShown)
  }

  /** Show or hide the Minimap modal (only used on mobile) */
  const toggleMinimapModal = () => {
    setIsMinimapModalOpen(!isMinimapModalOpen)
  }

  /** Show or hide the Minimap Information modal
  * 1. Set localStorage variable once user interacts with the modal
  */
  const toggleMinimapInfoModal = () => {
    setIsMinimapInfoModalOpen(!isMinimapInfoModalOpen)
    !(!!localStorage.getItem(`${process.env.REACT_APP_MINIMAP_KEY}`)) &&
      localStorage.setItem(`${process.env.REACT_APP_MINIMAP_KEY}`, 1) &&  /* 1 */
      setHasSeenMinimapIntro(true)
  }

  /** Handles navigation using browser back button
  * 1. Removes children to prevent creation of duplicates.
  * 2. Sets itemInitialLoad flag so fetch of children is triggered.
  **/
  useEffect(() => {
    if (window.history.action === "POP") {
      setChildrenUri('') /* 1 */
      setChildren([]) /* 1 */
      const itemPath = `/${type}/${id}`
      const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}${itemPath}`
      setItemInitialLoad(true) /* 2 */
      setItemUri(itemUrl)
    }
  }, [])

  /** Fetches item data when itemUri changes */
  useEffect(() => {
    if (itemUri) {
      setIsItemLoading(true)
      axios
        .get(appendParams(itemUri, params))
        .then(res => {
          setItem(res.data)
          if (res.data.online) {
            axios
              .head(`${process.env.REACT_APP_S3_BASEURL}/pdfs/${id}`)
              .then(res => setDownloadSize(formatBytes(res.headers['content-length'])))
              .catch(e => setDownloadSize(''))
          }
          if (itemInitialLoad) {
            setChildrenUri(`${process.env.REACT_APP_ARGO_BASEURL}${res.data.group.identifier}/children`)
          }
          setUpdateMessage(t({
            comment: 'Update message for selected record',
            message: `Details under heading 1 have been updated to describe the selected records titled ${res.data.title}`
          }))
        })
        .catch(err => {
          err.response.status === 404 ? setFound(false) : setBackendError(err) })
        .then(res => {
          setIsItemLoading(false)
          setItemInitialLoad(false)
        })
    }
  }, [itemUri])

 /** Fetches ancestors when itemUri changes */
  useEffect(() => {
    if (itemUri) {
      setIsAncestorsLoading(true)
      axios
        .get(appendParams(`${itemUri}/ancestors`, params))
        .then(res => {
          setAncestors(res.data)
          if (itemInitialLoad) {
            setPreExpanded(constructPreExpanded(res.data, [itemUri.replace(`${process.env.REACT_APP_ARGO_BASEURL}`, '')]))
          }
        })
        .catch(e => setBackendError(e))
        .then(() => setIsAncestorsLoading(false))
    }
  }, [itemUri])

  /** Fetches children when childrenUri changes */
  useEffect(() => {
    if (childrenUri) {
      const uri = childrenUri.includes('?') ? childrenUri : appendParams(childrenUri, { ...params, limit: pageSize })
      axios
          .get(uri)
          .then(res => {
            setChildren([...children].concat(res.data.results))
            res.data.next && setChildrenUri(res.data.next)
          }
        )
        .catch(err => setBackendError(err))
      }
  }, [childrenUri])

  /** Fetches minimap data when item.group.identifier changes */
  useEffect(() => {
    if (item.group && item.group.identifier) {
      if (Object.keys(params).length === 0) {
        setIsMinimapLoading(false)
      } else {
        axios
          .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}${item.group.identifier}/minimap`, params))
          .then(res => setMinimap(res.data))
          .catch(e => setBackendError(e))
          .then(() => setIsMinimapLoading(false))
      }
    }
  }, [item.group.identifier])

  /** Pushes a updated URL and state into browser history when itemUri changes */
  useEffect(() => {
    if (itemUri && !itemInitialLoad) {
      const updatedUri = appendParams(itemUri.replace(`${process.env.REACT_APP_ARGO_BASEURL}`, ''), params)
      navigate(updatedUri, {})
    }
  }, [itemUri])

  /** Set initial variables */
  useEffect(() => {
    const itemPath = `/${type}/${id}`
    const fullUrl = `${process.env.REACT_APP_ARGO_BASEURL}${itemPath}`
    const parsedParams = queryString.parse(search, { parseBooleans: true });
    setParams(parsedParams)
    setItemUri(fullUrl)
    setHasSeenMinimapIntro(!!localStorage.getItem(`${process.env.REACT_APP_MINIMAP_KEY}`))
    setIsMinimapInfoModalOpen(!(!!localStorage.getItem(`${process.env.REACT_APP_MINIMAP_KEY}`)))
  }, [])

  if (!found) {
    return (<PageNotFound />)
  }
  if (!!Object.keys(backendError).length) {
    return (<PageBackendError error={backendError} />)
  }
  return (
    <React.Fragment>
      <LiveMessage message={updateMessage} aria-live='polite' />
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ item.title }</title>
      </Helmet>
      <main id='main' className='container--full-width'>
        {isDesktop ? null : <MinimapButton toggleMinimapModal={toggleMinimapModal}/>}
        <ContextSwitcher
          isContentShown={isContentShown}
          toggleIsContentShown={toggleIsContentShown} />
        <RecordsDetail
          ancestors={ancestors}
          downloadSize={downloadSize}
          isAncestorsLoading={isAncestorsLoading}
          isContentShown={isContentShown}
          isDesktop={isDesktop}
          isItemLoading={isItemLoading}
          item={item}
          myListCount={myListCount}
          params={params}
          toggleInList={toggleInList}
          toggleMinimapModal={toggleMinimapInfoModal} />
        {isDesktop ?
          <div className={classnames('minimap__wrapper', {'bring-forward': !hasSeenMinimapIntro})}>
            <Minimap
              data={minimap}
              isLoading={isMinimapLoading}
              params={params} />
          </div>
          : null}
        <RecordsContent
          children={children}
          collection={parseCollection()}
          isContentShown={isContentShown}
          isMobile={isMobile}
          myListCount={myListCount}
          offsetAfter={item.offset + 1}
          offsetBefore={item.offset}
          params={params}
          parent={item}
          preExpanded={preExpanded}
          setActiveRecords={setActiveRecords}
          toggleInList={toggleInList} />
      </main>
      <ModalMinimapInfo
        isOpen={isMinimapInfoModalOpen}
        toggleModal={toggleMinimapInfoModal}
        hasSeenMinimapIntro={hasSeenMinimapIntro} />
      <ModalMinimap
        data={minimap}
        isLoading={isMinimapLoading}
        isOpen={isMinimapModalOpen}
        params={params}
        toggleModal={toggleMinimapModal} />
    </React.Fragment>
  )
}

PageRecords.propTypes = {
  myListCount: PropTypes.number.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;

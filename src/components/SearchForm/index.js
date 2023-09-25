import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Button from '../Button'
import PropTypes from 'prop-types'
import { CheckBoxInput, SelectInput, TextInput } from '../Inputs'
import { t } from '@lingui/macro'
import './styles.scss'

const SearchForm = props => {
  var [category, setCategory] = useState(props.category || '')
  var [online, setOnline] = useState(props.online)
  var [query, setQuery] = useState(props.query)
  const isHomePage = props.className === 'search search-form--home'

  /** Sets the search category, query and online checkbox */
  useEffect(() => {
    setOnline(props.online ? true : false)
    setCategory(props.category || '')
    setQuery(props.query)
  }, [props.category, props.online, props.query])

  const selectOptions = [
    {
      value: '',
      label: t({
        comment: 'Label for All Categories',
        message: 'All Types'
      })
    },
    {
      value: 'collection',
      label: t({
        comment: 'Label for Collections category',
        message: 'Collections'
      })
    },
    {
      value: 'person',
      label: t({
        comment: 'Label for People category',
        message: 'People'
      })
    },
    {
      value: 'organization',
      label: t({
        comment: 'Label for Organizations category',
        message: 'Organizations'
      })
    }
  ]

  return (
    <form role='search' action='/search' method='get'>
      <div className="wrapper">
        <div className={props.className}>
          <div className={classnames('input-group__search', { 'input-group__search-results': !isHomePage })}>
            <TextInput
              className={classnames('hide-label', 'input__search', { 'input__search-results': !isHomePage })}
              label={t({
                comment: 'Label for search textbox',
                message: 'Enter a search term'
              })}
              id='query'
              placeholder={t({
                comment: 'Placeholder text for search textbox',
                message: 'Search...'
              })}
              size={60}
              value={query || ''}
              handleChange={e => setQuery(e.target.value)}
              type='search'
              required
            />
            <Button
              className={ classnames({ 'btn--orange search__submit-btn': isHomePage, 'btn btn--orange search__submit-btn search__results-submit-btn': !isHomePage })}
              type='submit'
              label={isHomePage ? (props.isMobile ? null : t({
                comment: 'Label for Search button',
                message: 'Search'
              })) : null}
              iconAfter='search'
              ariaLabel={t({
                comment: 'Aria Label for search submission button',
                message: 'Submit search'
              })}
            />
          </div>
          <div className={classnames(
              'input-group__search-controls',
              { 'input-group__search-controls-results' : !isHomePage })}>
            <SelectInput
              className='select__search'
              hideLabel
              iconAfter='expand_more'
              id='category'
              label={t({
                comment: 'Label for Category selector',
                message: 'Choose a search category'
              })}
              name={t({
                comment: 'Name for Category selector',
                message: 'category'
              })}
              onChange={({ selectedItem }) => {
                isHomePage ? setCategory(selectedItem.value) : props.handleSearchFormChange(selectedItem.value, query, online)
              }}
              options={ selectOptions }
              selectedItem={ category || '' }
            />
            <CheckBoxInput
              id='online'
              name={t({
                comment: 'Name for digital matches only checkbox',
                message: 'online'
              })}
              className='checkbox--blue checkbox--online input--outline'
              checked={online}
              handleChange={e => {
                isHomePage ? setOnline(e.target.checked) : props.handleSearchFormChange(category, query, e.target.checked)
              }}
              label={t({
                comment: 'Label for digital matches only checkbox',
                message: 'Show only results with digital matches'
              })}
            />
          </div>
        </div>
      </div>
    </form>)
}

SearchForm.propTypes = {
  className: PropTypes.string,
  handleOnlineChange: PropTypes.func
}

export default SearchForm

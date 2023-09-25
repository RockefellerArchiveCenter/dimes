import React from 'react'
import './styles.scss'
import { Trans } from '@lingui/macro'


const SuggestionItem = ({text}) => (
  <li>
    <a className="results__not-found--text" href={`/search?query=${text}`}>{text}</a>
  </li>
)

const SearchNotFound = ({suggestions, query}) => {

  const suggestionList = suggestions && suggestions.map((item, idx) => <SuggestionItem key={idx} text={item} />)

  if (query) {
    return (
      <div className='mb-60'>
        <Trans comment='Search not found tips'>
          <p className="results__not-found--text">Have you tried doing the following:</p>
          <ul className="results__not-found--text">
            <li>Check for spelling errors or typos</li>
            <li>Use fewer keywords</li>
            <li>Clear search filter options</li>
          </ul>
        </Trans>
        {suggestions.length ? (
          <>
            <Trans comment='Suggested terms message'>
              <p className="results__not-found--text">Here are some suggested search terms:</p>
            </Trans>
            <ul className="suggestions list--unstyled">
              {suggestionList}
            </ul>
          </>
        ) : null}
      </div>
    )
  } else {
    return (
      <div className='mb-60'>
        <Trans comment='No search terms supplied message'>
          <p className="results__not-found--text">Please add a word or phrase to search for.</p>
        </Trans>
      </div>
    )
  }
}

export default SearchNotFound

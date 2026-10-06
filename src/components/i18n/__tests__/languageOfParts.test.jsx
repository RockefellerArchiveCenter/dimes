import { render, act } from '@testing-library/react'
import { i18n } from '@lingui/core'
import { I18nApp } from '..'
import { DESCR_LANG } from '../../Helpers'
import CardList from '../../Card'
import RecordsDetail from '../../RecordsDetail'
import SearchNotFound from '../../SearchNotFound'

import { cardItems } from '../../../__fixtures__/cardItems'
import { collectionWithChildHits } from '../../../__fixtures__/collection'

/* To support WCAG 3.1.2 Language of Parts: archival description keeps lang="en" when the UI is translated. */

beforeEach(() => {
  i18n.activate('fr')
})

afterEach(() => {
  i18n.activate('en')
})

it('marks card titles and dates as description language', () => {
  act(() => {
    render(<I18nApp ReactComponent={<CardList items={cardItems} />} />)
  })
  const card = document.querySelector('.card')
  expect(document.documentElement.lang).toBe('fr')
  expect(card.querySelector('.card__title a')).toHaveAttribute('lang', DESCR_LANG)
  expect(card.querySelector('.card__date')).toHaveAttribute('lang', DESCR_LANG)
  // Translated UI text inherits the page language
  expect(card.querySelector('.card__type-label')).not.toHaveAttribute('lang')
})

it('marks record detail content but not translated headings', () => {
  act(() => {
    render(<I18nApp ReactComponent={<RecordsDetail
      ancestors={{}}
      isAncestorsLoading={false}
      isContentShown={false}
      isItemLoading={false}
      item={collectionWithChildHits}
      myListCount={0}
      params={{}}
      toggleInList={vi.fn()}
      toggleMinimapModal={vi.fn()} />} />)
  })
  expect(document.querySelector('.records__title')).toHaveAttribute('lang', DESCR_LANG)
  const narratives = document.querySelectorAll('.panel__text--narrative')
  expect(narratives.length).toBeGreaterThan(0)
  narratives.forEach(p => expect(p).toHaveAttribute('lang', DESCR_LANG))
  document.querySelectorAll('.panel__heading').forEach(h => {
    // Only API-sourced note titles carry lang; translated headings inherit fr
    if (h.hasAttribute('lang')) expect(h).toHaveAttribute('lang', DESCR_LANG)
  })
  expect(document.querySelector('.accordion__button')).not.toHaveAttribute('lang')
})

it('marks search suggestions as description language', () => {
  act(() => {
    render(<I18nApp ReactComponent={<SearchNotFound query='rockefeler' suggestions={['Rockefeller Foundation records']} />} />)
  })
  expect(document.querySelector('.suggestions a')).toHaveAttribute('lang', DESCR_LANG)
})

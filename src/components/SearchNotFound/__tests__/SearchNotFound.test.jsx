import { render, act } from '@testing-library/react'
import SearchNotFound from '..'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'

const suggestions = ["foo", "bar"]
const query = "bananas"

it('renders suggestions correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={
      <SearchNotFound suggestions={suggestions} query={query} />
    } />)
  })
  const list = document.querySelector('.suggestions')
  expect(list.children.length).toBe(suggestions.length)
  suggestions.map(s => {
    expect(list.textContent).toContain(s)
  })
})

it('renders missing query correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={
      <SearchNotFound suggestions={suggestions} query={''} />
    } />)
  })
  const text = document.querySelector('.results__not-found--text')
  expect(text.textContent).toContain(t({
    comment: 'Missing word/phrase Test',
    message: 'Please add a word or phrase to search for.'
  }))
})

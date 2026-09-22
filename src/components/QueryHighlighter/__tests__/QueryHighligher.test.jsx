import { render, act } from '@testing-library/react'
import QueryHighlighter from '..'
import { I18nApp } from '../../i18n'

it('finds word at beginning', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo' text='foo bar baz' />} />)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

it('finds word in middle', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='bar baz' text='foo bar baz' />} />)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('bar')
})

it('finds phrase', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo bar' text='foo bar baz' />} />)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

it('finds phrase separated by another word', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo baz' text='foo bar baz' />} />)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import QueryHighlighter from '..'
import { I18nApp } from '../../i18n'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('finds word at beginning', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo' text='foo bar baz' />} />, container)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

it('finds word in middle', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='bar baz' text='foo bar baz' />} />, container)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('bar')
})

it('finds phrase', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo bar' text='foo bar baz' />} />, container)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

it('finds phrase separated by another word', () => {
  act(() => {
    render(<I18nApp ReactComponent={<QueryHighlighter query='foo baz' text='foo bar baz' />} />, container)
  })

  const highlight = document.querySelector('.query-highlight')
  expect(highlight.textContent).toBe('foo')
})

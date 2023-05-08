import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import SearchNotFound from '..'

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

const suggestions = ["foo", "bar"]
const query = "bananas"

it('renders suggestions correctly', () => {
  act(() => {render(<SearchNotFound suggestions={suggestions} query={query} />, container)})
  const list = document.querySelector('.suggestions')
  expect(list.children.length).toBe(suggestions.length)
  suggestions.map(s => {
    expect(list.textContent).toContain(s)
  })
})

it('renders missing query correctly', () => {
  act(() => {render(<SearchNotFound suggestions={suggestions} query={''} />, container)})
  const text = document.querySelector('.results__not-found--text')
  expect(text.textContent).toContain('Please add a word or phrase to search for.')
})

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { FacetModal } from '..'

import { facet } from '../../../__fixtures__/facet'
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

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<FacetModal
      appElement={container}
      handleChange={jest.fn()}
      handleDateChange={jest.fn()}
      isOpen
      params={{}}
      resultsCount={2}
      data={facet}
      toggleModal={jest.fn()} />} />, container)
  })

  const startYear = document.querySelector('#startYear')
  expect(startYear.value).toBe('-8867404800000')
  const endYear = document.querySelector('#endYear')
  expect(endYear.value).toBe('1546300800000')
  const formats = document.querySelector('[id=Format] + .facet__items')
  expect(formats.children.length).toBe(4)
  const creators = document.querySelector('[id=Creator] + .facet__items')
  expect(creators.children.length).toBe(5)
  const subjects = document.querySelector('[id=Subject] + .facet__items')
  expect(subjects.children.length).toBe(5)
})

it('handles clicks', () => {
  const handleDateChange = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<FacetModal
      appElement={container}
      handleChange={jest.fn()}
      handleDateChange={handleDateChange}
      isOpen
      params={{}}
      resultsCount={2}
      data={facet}
      toggleModal={jest.fn()} />} />, container)
  })

  const apply = document.querySelector('.modal__body--search .btn')

  act(() => {
    apply.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(handleDateChange).toHaveBeenCalledTimes(1)
})

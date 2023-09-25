import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import { MyListDropdown, NavDropdown } from '..'

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
    render(<I18nApp ReactComponent={<MyListDropdown
      downloadCsv={jest.fn()}
      duplicationRequest={jest.fn()}
      emailList={jest.fn()}
      readingRoomRequest={jest.fn()}
      removeAllItems={jest.fn()} />} />, container)
  })

  const dropdown = document.querySelector('.dropdown')
  expect(dropdown.className).toBe('dropdown mylist__actions hide-on-lg-up mt-40 mr-30 mb-30')
  const button = document.querySelector('.dropdown > button')
  expect(button.className).toBe('btn btn--orange btn--md closed')
  const list = document.querySelector('.dropdown > div')
  expect(list.className).toBe('dropdown__list dropdown__list--orange dropdown__list--slide-down mylist__actions--dropdown closed')
})

it('renders without crashing', () => {
  act(() => {
    render(<I18nApp ReactComponent={<NavDropdown />} />, container)
  })

  const dropdown = document.querySelector('.dropdown')
  expect(dropdown.className).toBe('dropdown hide-on-lg-up')
  const button = document.querySelector('.dropdown > button')
  expect(button.className).toBe('btn btn--navy nav__btn--mobile closed')
  const list = document.querySelector('.dropdown > div')
  expect(list.className).toBe('dropdown__list dropdown__list--mobile dropdown__list--navy dropdown__list--slide-left closed')
})

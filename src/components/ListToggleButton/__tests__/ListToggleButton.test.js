import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'
import ListToggleButton from '..'

import { object } from '../../../__fixtures__/object'

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

it('renders correctly in desktop and modal', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />} />, container)
  })

  const button = document.querySelector('button')
  expect(button.textContent).toContain(t({
    comment: "Test Add button label",
    message: 'Add to List'
  }))
  expect(button).toHaveAttribute('aria-label', t({
    comment: "Test Add button aria label",
    message: 'Add item to list'
  }))
  expect(button.className).not.toContain('saved')

  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isSaved
      item={object}
      toggleSaved={jest.fn()} />} />, container)
  })

  expect(button.textContent).toContain(t({
    comment: "Test Remove button label",
    message: 'Remove from List'
  }))
  expect(button).toHaveAttribute('aria-label', t({
    comment: "Test Remove button aria label",
    message: 'Remove item from list'
  }))
  expect(button.className).toContain('saved')

  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isMobile
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />} />, container)
  })

  expect(button.textContent).toContain(t({
    comment: "Test Remove button label",
    message: 'Add'
  }))

  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isMobile
      isSaved
      item={object}
      toggleSaved={jest.fn()} />} />, container)
  })

  expect(button.textContent).toContain(t({
    comment: "Test Remove button label",
    message: 'Remove'
  }))
})

it('handles clicks correctly', () => {
  const toggleSaved = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isSaved={false}
      item={object}
      toggleSaved={toggleSaved} />} />, container)
  })

  const button = document.querySelector('button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleSaved).toHaveBeenCalledTimes(1)
})

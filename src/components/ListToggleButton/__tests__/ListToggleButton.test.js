import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'
import ListToggleButton from '..'

import { object } from '../../../__fixtures__/object'

it('renders add button correctly in desktop', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />} />)
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
})

it('renders remove button correctly in desktop', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isSaved
      item={object}
      toggleSaved={jest.fn()} />} />)
  })

  const button = document.querySelector('button')
  expect(button.textContent).toContain(t({
    comment: "Test Remove button label",
    message: 'Remove from List'
  }))
  expect(button).toHaveAttribute('aria-label', t({
    comment: "Test Remove button aria label",
    message: 'Remove item from list'
  }))
  expect(button.className).toContain('saved')
})

it('renders add button correctly in mobile', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isMobile
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />} />)
  })

  const button = document.querySelector('button')
  expect(button.textContent).toContain(t({
    comment: "Test Remove button label",
    message: 'Add'
  }))
})

it('renders remove button correctly in mobile', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ListToggleButton
      isMobile
      isSaved
      item={object}
      toggleSaved={jest.fn()} />} />)
  })

  const button = document.querySelector('button')
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
      toggleSaved={toggleSaved} />} />)
  })

  const button = document.querySelector('button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleSaved).toHaveBeenCalledTimes(1)
})

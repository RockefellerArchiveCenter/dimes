import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from '..'
import * as focus from '../helpers/focus'

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

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<Accordion />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItem preExpanded={[]} />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItemHeading />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItemButton />} />, container)
})

it('handles clicks', () => {
  const onClick = jest.fn()
  const setIsExpanded = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<AccordionItemButton setIsExpanded={setIsExpanded} onClick={onClick} />} />, container)
  })

  const button = document.querySelector('[data-accordion-component=AccordionItemButton]')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(onClick).toHaveBeenCalledTimes(1)
  expect(setIsExpanded).toHaveBeenCalledTimes(1)
})

it('handles keyboard events', () => {
  const onClick = jest.fn()
  const setIsExpanded = jest.fn()
  focus.focusFirstSiblingOf = jest.fn()
  focus.focusLastSiblingOf = jest.fn()
  focus.focusPreviousSiblingOf = jest.fn()
  focus.focusNextSiblingOf = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<AccordionItemButton setIsExpanded={setIsExpanded} onClick={onClick} />} />, container)
  })

  const button = document.querySelector('[data-accordion-component=AccordionItemButton]')

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(setIsExpanded).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(setIsExpanded).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusNextSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 35, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusLastSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 36, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusFirstSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusPreviousSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusNextSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()

  act(() => {
    button.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38, bubbles: true }))
  })
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(setIsExpanded).toHaveBeenCalledTimes(0)
  expect(focus.focusPreviousSiblingOf).toHaveBeenCalledTimes(1)
  jest.clearAllMocks()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<AccordionItemPanel />} />, container)
})

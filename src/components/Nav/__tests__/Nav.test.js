import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import {Nav, NavItem} from '..'

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

it('renders nav props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<Nav className='foo' ariaLabel='bar' />} />, container)
  })

  const nav = document.querySelector('nav')
  expect(nav.className).toBe('nav-right foo')
  expect(nav).toHaveAttribute('aria-label', 'bar')
})

it('renders navitem props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<NavItem className='bar' href='#' label='Nav Item' icon='foo' />} />, container)
  })

  const navItem = document.querySelector('a')
  expect(navItem.textContent).toBe('Nav Item foo')
  expect(navItem).toHaveAttribute('href', '#')
  expect(navItem.className).toBe('nav__link bar')
})

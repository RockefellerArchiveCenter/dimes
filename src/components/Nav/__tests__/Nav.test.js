import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import {Nav, NavItem} from '..'

it('renders nav props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<Nav className='foo' ariaLabel='bar' />} />)
  })

  const nav = document.querySelector('nav')
  expect(nav.className).toBe('nav-right foo')
  expect(nav).toHaveAttribute('aria-label', 'bar')
})

it('renders navitem props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<NavItem className='bar' href='#' label='Nav Item' icon='foo' />} />)
  })

  const navItem = document.querySelector('a')
  expect(navItem.textContent).toBe('Nav Item foo')
  expect(navItem).toHaveAttribute('href', '#')
  expect(navItem.className).toBe('nav__link bar')
})

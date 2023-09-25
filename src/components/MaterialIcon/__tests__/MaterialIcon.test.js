import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import MaterialIcon from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<MaterialIcon icon='close' />} />, div)
  })

  const icon = document.querySelector('span')
  expect(icon.textContent).toBe('close')
  expect(icon).toHaveAttribute('aria-hidden', 'true')

  act(() => {
    render(<I18nApp ReactComponent={<MaterialIcon icon='archive_box' />} />, div)
  })

  expect(icon).toHaveAttribute('aria-hidden', 'true')
})

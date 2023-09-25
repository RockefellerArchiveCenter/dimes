import React from 'react'
import { render } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import PageBackendError from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const error = {
    config: {
      url: "https://api.rockarch.org/",
      data: "foo"
    },
    code: "ERR_NETWORK",
    message: "Network Error",
    response: {
      data: "bar"
    }
  }

  act(() => {
    render(<I18nApp ReactComponent={<PageBackendError
      error={error} />} />, div)
  })

  const page = document.querySelector('.backend-error')

  expect(page.textContent).toContain(error.config.url)
  expect(page.textContent).toContain(error.code)
  expect(page.textContent).toContain(error.message)
  expect(page.textContent).toContain(error.config.data)
})

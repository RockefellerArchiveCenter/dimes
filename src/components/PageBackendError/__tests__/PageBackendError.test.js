import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import PageBackendError from '..'

it('renders props correctly', () => {
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
      error={error} />} />)
  })

  const page = document.querySelector('.backend-error')

  expect(page.textContent).toContain(error.config.url)
  expect(page.textContent).toContain(error.code)
  expect(page.textContent).toContain(error.message)
  expect(page.textContent).toContain(error.config.data)
})

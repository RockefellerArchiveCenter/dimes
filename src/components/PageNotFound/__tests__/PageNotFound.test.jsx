import { render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/core/macro'
import PageNotFound from '..'

it('renders props correctly', () => {

  act(() => {
    render(
      <MemoryRouter>
        <I18nApp ReactComponent={<PageNotFound  />} />
      </MemoryRouter>)
  })

  expect(document.querySelector('h1').textContent).toBe(t({
    comment: 'Page Not Found Test',
    message: 'Sorry, the requested page was not found!'
  }))

})

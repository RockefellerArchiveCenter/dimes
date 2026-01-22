import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'
import PageNotFound from '..'

it('renders props correctly', () => {

  act(() => {
    render(<I18nApp ReactComponent={<PageNotFound  />} />)
  })

  expect(document.querySelector('h1').textContent).toBe(t({
    comment: 'Page Not Found Test',
    message: 'Sorry, the requested page was not found!'
  }))

})

import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'
import PageHome from '..'

it('renders props correctly', () => {

  act(() => {
    render(<I18nApp ReactComponent={<PageHome  />} />)
  })

  expect(document.querySelector('h1').textContent).toBe(t({
    comment: 'Page Home Test',
    message: 'Search Our Collections.Discover People and Organizations.Access Digital Content.'
  }))

})

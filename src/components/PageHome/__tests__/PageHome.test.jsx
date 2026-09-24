import { render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/core/macro'
import PageHome from '..'

it('renders props correctly', () => {

  act(() => {
    render(
      <MemoryRouter>
        <I18nApp ReactComponent={<PageHome  />} />
      </MemoryRouter>)
  })

  expect(document.querySelector('h1').textContent).toBe(t({
    comment: 'Page Home Test',
    message: 'Search Our Collections.Discover People and Organizations.Access Digital Content.'
  }))

})

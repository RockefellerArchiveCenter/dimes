import { render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/core/macro'
import PageSiteMap from '..'

it('renders props correctly', () => {

  act(() => {
    render(
      <MemoryRouter>
        <I18nApp ReactComponent={<PageSiteMap />} />
      </MemoryRouter>)
  })

  expect(document.querySelector('h1').textContent).toBe(t({
    comment: 'Site map page heading',
    message: 'Site map'
  }))

})

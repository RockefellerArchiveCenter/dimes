import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import Header from '..'

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<Header myListCount={4} />} />)
  })

  list = document.querySelector('#list')
  expect(list.textContent).toContain('(4)')
})

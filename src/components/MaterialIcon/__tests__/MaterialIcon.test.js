import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import MaterialIcon from '..'

it('renders props correctly', () => {

  act(() => {
    render(<I18nApp ReactComponent={<MaterialIcon icon='close' />} />)
  })

  const icon = document.querySelector('span')
  expect(icon.textContent).toBe('close')
  expect(icon).toHaveAttribute('aria-hidden', 'true')

  act(() => {
    render(<I18nApp ReactComponent={<MaterialIcon icon='archive_box' />} />)
  })

  expect(icon).toHaveAttribute('aria-hidden', 'true')
})

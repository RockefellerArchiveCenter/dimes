import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { Badge } from '..'

it('renders without errors', () => {
  act(() => {
    render(<I18nApp ReactComponent={<Badge text={"foobar"} />} />)
  })
})

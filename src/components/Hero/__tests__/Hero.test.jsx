import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import Hero from '..'

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<Hero />} />)
})

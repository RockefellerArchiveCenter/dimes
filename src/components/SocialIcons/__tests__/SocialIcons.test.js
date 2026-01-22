import { render } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import SocialIcons from '..'

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<SocialIcons />} />)
})

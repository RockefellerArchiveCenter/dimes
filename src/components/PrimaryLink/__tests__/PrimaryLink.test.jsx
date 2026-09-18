import { render } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { PrimaryLinkAccessMaterials, PrimaryLinkAccessibilityPolicy, PrimaryLinkEmail, PrimaryLinkHoliday, PrimaryLinkPrivacyPolicy, PrimaryLinkRACPolicy,  } from '..'

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkAccessMaterials />} />)
})
  
it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkEmail />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkHoliday />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkAccessibilityPolicy />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkPrivacyPolicy />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<PrimaryLinkRACPolicy />} />)
})
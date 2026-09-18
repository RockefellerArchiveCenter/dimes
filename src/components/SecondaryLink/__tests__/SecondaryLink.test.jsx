import { render } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { SecondaryLinkBulkData, SecondaryLinkCollectionsAPI, SecondaryLinkLicensing, SecondaryLinkTakeDownPolicy } from '..'

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<SecondaryLinkCollectionsAPI />} />)
})
  
it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<SecondaryLinkBulkData />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<SecondaryLinkLicensing />} />)
})

it('renders without crashing', () => {
	render(<I18nApp ReactComponent={<SecondaryLinkTakeDownPolicy />} />)
})
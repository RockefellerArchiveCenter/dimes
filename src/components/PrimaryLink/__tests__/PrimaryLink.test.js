import React from 'react'
import {render} from 'react-dom'
import { I18nApp } from '../../i18n'
import { PrimaryLinkAccessMaterials, PrimaryLinkAccessibilityPolicy, PrimaryLinkEmail, PrimaryLinkHoliday, PrimaryLinkPrivacyPolicy, PrimaryLinkRACPolicy,  } from '..'

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkAccessMaterials />} />, div)
})
  
it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkEmail />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkHoliday />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkAccessibilityPolicy />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkPrivacyPolicy />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<PrimaryLinkRACPolicy />} />, div)
})
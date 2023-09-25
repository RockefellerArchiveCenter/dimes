import React from 'react'
import {render} from 'react-dom'
import { I18nApp } from '../../i18n'
import { SecondaryLinkBulkData, SecondaryLinkCollectionsAPI, SecondaryLinkLicensing, SecondaryLinkTakeDownPolicy } from '..'

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<SecondaryLinkCollectionsAPI />} />, div)
})
  
it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<SecondaryLinkBulkData />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<SecondaryLinkLicensing />} />, div)
})

it('renders without crashing', () => {
	const div = document.createElement('div')
	render(<I18nApp ReactComponent={<SecondaryLinkTakeDownPolicy />} />, div)
})
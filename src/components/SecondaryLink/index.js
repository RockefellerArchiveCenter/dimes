import React from 'react'
import PropTypes from 'prop-types'
import { t } from '@lingui/macro'

const SecondaryLink = ({ href, text }) => (
	<a className='footer-secondary__link' href={href}>
		{text}
	</a>
)

SecondaryLink.propTypes = {
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export const SecondaryLinkCollectionsAPI = () => (
	<SecondaryLink
		href={t({
			comment: 'Collections data API link',
			message: 'https://docs.rockarch.org/argo-docs/'
		})}
		text={t({
			comment: 'Collections data API message',
			message: 'Collections data API'
		})}
	/>
)

export const SecondaryLinkBulkData = () => (
	<SecondaryLink
		href={t({
			comment: 'Bulk Data Download link',
			message: 'https://github.com/RockefellerArchiveCenter/data/'
		})}
		text={t({
			comment: 'Bulk Data Download message',
			message: 'Bulk data download'
		})}
	/>
)

export const SecondaryLinkLicensing = () => (
	<SecondaryLink
		href={t({
			comment: 'Licensing link',
			message: 'https://docs.rockarch.org/archival-description-license/'
		})}
		text={t({
			comment: 'Licensing message',
			message: 'Licensing for descriptive metadata'
		})}
	/>
)

export const SecondaryLinkTakeDownPolicy = () => (
	<SecondaryLink
		href={t({
			comment: 'Take-down Policy link',
			message: 'https://docs.rockarch.org/takedown-policy/'
		})}
		text={t({
			comment: 'Take-down Policy message',
			message: 'Take-down policy'
		})}
	/>
)
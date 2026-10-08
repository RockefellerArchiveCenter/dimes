import { t } from '@lingui/core/macro'

const SecondaryLink = ({ href, text }) => (
	<a className='footer-secondary__link' href={href}>
		{text}
	</a>
)

export const SecondaryLinkCollectionsAPI = () => (
	<SecondaryLink
		href='https://docs.rockarch.org/argo-docs/'
		text={t({
			comment: 'Collections data API message',
			message: 'Collections data API'
		})}
	/>
)

export const SecondaryLinkBulkData = () => (
	<SecondaryLink
		href='https://github.com/RockefellerArchiveCenter/data/'
		text={t({
			comment: 'Bulk Data Download message',
			message: 'Bulk data download'
		})}
	/>
)

export const SecondaryLinkLicensing = () => (
	<SecondaryLink
		href='https://docs.rockarch.org/archival-description-license/'
		text={t({
			comment: 'Licensing message',
			message: 'Licensing for descriptive metadata'
		})}
	/>
)

export const SecondaryLinkTakeDownPolicy = () => (
	<SecondaryLink
		href='https://docs.rockarch.org/takedown-policy/'
		text={t({
			comment: 'Take-down Policy message',
			message: 'Take-down policy'
		})}
	/>
)

export const SecondaryLinkSiteMap = () => (
	<SecondaryLink
		href='/sitemap'
		text={t({
			comment: 'Site map message',
			message: 'Site map'
		})}
	/>
)

import classnames from 'classnames'
import { t } from '@lingui/core/macro'
import { ARCHIVE_EMAIL } from '../Helpers'

const PrimaryLink = ({ className, href, text }) => (
	<a className={classnames('footer-primary__link', className)} href={href}>
		{text}
	</a>
)

export const PrimaryLinkAccessMaterials = () => (
	<PrimaryLink
		href='https://rockarch.org/collections/access-and-request-materials/'
		text={t({
			comment: 'How to Access materials message',
			message: 'How to access and request materials.'
    })}
  />
)

export const PrimaryLinkEmail = () => (
  <PrimaryLink
    href={`mailto:${ARCHIVE_EMAIL}`}
    text={ARCHIVE_EMAIL}
  />
)

export const PrimaryLinkHoliday = () => (
  <PrimaryLink
    href='https://rockarch.org/collections/access-and-request-materials/holiday-schedule'
    text={t({
      comment: 'Holiday Schedule message',
      message: 'See holiday schedule'
    })}
  />
)

export const PrimaryLinkAccessibilityPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href='https://rockarch.org/about-us/accessibility/'
		text={t({
			comment: 'Accessibility Statement message',
      message: 'Accessibility Statement'
    })}
  />
)

export const PrimaryLinkPrivacyPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href='https://rockarch.org/about-us/privacy-policy/'
    text={t({
      comment: 'Privacy Policy message',
      message: 'Privacy Policy'
    })}
  />
)

export const PrimaryLinkRACPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href='https://docs.rockarch.org'
    text={t({
      comment: 'Footer.Primary.RAC.message',
      message: 'RAC Policies'
    })}
  />
)
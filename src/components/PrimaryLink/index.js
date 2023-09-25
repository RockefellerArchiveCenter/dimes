import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { t } from '@lingui/macro'

const PrimaryLink = ({ className, href, text }) => (
	<a className={classnames('footer-primary__link', className)} href={href}>
		{text}
	</a>
)

PrimaryLink.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export const PrimaryLinkAccessMaterials = () => (
	<PrimaryLink
		href={t({
			comment: 'Access Materials link',
			message: 'https://rockarch.org/collections/access-and-request-materials/'
		})}
		text={t({
			comment: 'How to Access materials message',
			message: 'How to access and request materials.'
    })}
  />
)

export const PrimaryLinkEmail = () => (
  <PrimaryLink
    href={t({
      comment: 'Company Email link',
      message: 'mailto:archive@rockarch.org'
    })}
    text={t({
      comment: 'Company Email shown',
      message: 'archive@rockarch.org'
    })}
  />
)

export const PrimaryLinkHoliday = () => (
  <PrimaryLink
    href={t({
      comment: 'Holiday Schedule link',
      message: 'https://rockarch.org/collections/access-and-request-materials/holiday-schedule'
    })}
    text={t({
      comment: 'Holiday Schedule message',
      message: 'See holiday schedule'
    })}
  />
)

export const PrimaryLinkAccessibilityPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href={t({
      comment: 'Accessibility Statement Link',
      message: 'https://rockarch.org/about-us/accessibility/'
		})}
		text={t({
			comment: 'Accessibility Statement message',
      message: 'Accessibility Statement'
    })}
  />
)

export const PrimaryLinkPrivacyPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href={t({
      comment: 'Privacy Policy link',
      message: 'https://rockarch.org/about-us/privacy-policy/'
    })}
    text={t({
      comment: 'Privacy Policy message',
      message: 'Privacy Policy'
    })}
  />
)

export const PrimaryLinkRACPolicy = () => (
  <PrimaryLink className='footer-primary__policy-link'
    href={t({
      message: 'https://docs.rockarch.org',
      comment: 'Footer.Primary.RAC.href'
    })}
    text={t({
      comment: 'Footer.Primary.RAC.message',
      message: 'RAC Policies'
    })}
  />
)
import React from 'react'
import SocialIcons from '../SocialIcons'
import { PrimaryLinkAccessMaterials, PrimaryLinkAccessibilityPolicy, PrimaryLinkEmail, PrimaryLinkHoliday, PrimaryLinkPrivacyPolicy, PrimaryLinkRACPolicy } from '../PrimaryLink'
import { SecondaryLinkCollectionsAPI, SecondaryLinkBulkData, SecondaryLinkLicensing, SecondaryLinkTakeDownPolicy } from '../SecondaryLink'
import { t, Trans } from '@lingui/macro'

const Footer = () => (
  <footer className='footer' role='contentinfo'>
    <div className='footer-primary'>
      <div className='container grid'>
        <h2 className='footer-primary__title heading--dotted-border'>
          <Trans comment='Primary Title'>
            Rockefeller
            <span className='line-break'>
              Archive Center
            </span>
          </Trans>
        </h2>
        <div className='footer-primary__address'>
          <p className='footer-primary__text'>
            <Trans comment='Full Company Address'>
              15 Dayton Avenue
              <br />
              Sleepy Hollow, New York 10591
            </Trans>
          </p>
          <p className='footer-primary__text'>
            <Trans comment='Company Phonenumber'>
              Phone: (914) 366-6300
            </Trans><br />
            <Trans comment='Company Fax'>
              Fax: (914) 631-6017
            </Trans><br />
            <Trans comment='Company Email'>
              E-mail:
              <PrimaryLinkEmail />
            </Trans>
          </p>
        </div>
        <div className='footer-primary__reading-room'>
          <p className='footer-primary__text'>
            <Trans comment='Reading Room Hours message'>
              Reading Room Hours:
            </Trans>
          </p>
          <p className='footer-primary__text'>
            <Trans comment='Reading Room Actual Hours'>
              Monday-Friday<br />
              9:00 a.m. to 5:00 p.m.<br />
            </Trans>
            <PrimaryLinkAccessMaterials />
          </p>
          <PrimaryLinkHoliday />
        </div>
        <div className='footer-primary__social'>
          <SocialIcons />
          <p>
            <PrimaryLinkAccessibilityPolicy />
            <PrimaryLinkPrivacyPolicy />
            <PrimaryLinkRACPolicy />
          </p>
          <p className='footer-primary__text'>
            <Trans comment='Copyright message'>
              Copyright © Rockefeller Archive Center. All rights reserved.
            </Trans>
          </p>
        </div>
      </div>
    </div>
    <div className='footer-secondary'>
      <div className='grid'>
        <ul className='footer-secondary__list'>
          <li className='footer-secondary__list-item'>
            <SecondaryLinkCollectionsAPI />
          </li>
          <li className='footer-secondary__list-item'>
            <SecondaryLinkBulkData />
          </li>
          <li className='footer-secondary__list-item'>
            <SecondaryLinkLicensing />
          </li>
          <li className='footer-secondary__list-item'>
            <SecondaryLinkTakeDownPolicy />
          </li>
        </ul>
      </div>
    </div>
  </footer>)

export default Footer

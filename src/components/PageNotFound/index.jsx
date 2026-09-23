import React from 'react'
import MaterialIcon from '../MaterialIcon'
import { usePageView } from '../Hooks'
import './styles.scss'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

const PageNotFound = () => {

  usePageView(t({
    comment: 'Page Not Found',
    message: 'Page Not Found'
  }))

  return (
    <Trans comment='Page Not Found'>
      <main id='main' className='not-found mt-60'>
        <span className='not-found__icon'><MaterialIcon icon='help_outline' /></span>
        <h1 className='not-found__header'>Sorry, the requested page was not found!</h1>
        <p className='not-found__text'>Try <a href='/'>a search</a> to find what you're looking for.</p>
      </main>
    </Trans>
  )
}

export default PageNotFound;

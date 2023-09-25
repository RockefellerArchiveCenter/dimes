import React from 'react'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import { firePageViewEvent } from '../Helpers'
import './styles.scss'
import { Trans } from '@lingui/macro'

const PageNotFound = () => (
  <Trans comment='Page Not Found'>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>Page Not Found</title>
    </Helmet>
    <main id='main' className='not-found mt-60'>
      <span className='not-found__icon'><MaterialIcon icon='help_outline' /></span>
      <h1 className='not-found__header'>Sorry, the requested page was not found!</h1>
      <p className='not-found__text'>Try <a href='/'>a search</a> to find what you're looking for.</p>
    </main>
  </Trans>
)

export default PageNotFound;

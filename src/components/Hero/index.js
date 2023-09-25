import React from 'react'
import { Trans } from '@lingui/macro'
import './styles.scss'

const Hero = () => (
  <div className='hero'>
    <div className='hero__logo'>
      <img alt='' src='https://assets.rockarch.org/assets/img/hero_logo.png' />
    </div>
    <h1 className='hero__text'>
      <Trans comment='Message shown within the Hero'>
        Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content.
      </Trans>
    </h1>
  </div>)

export default Hero

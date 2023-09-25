import React from 'react'
import {render} from 'react-dom'
import { I18nApp } from '../../i18n'
import Footer from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<Footer />} />, div)
})

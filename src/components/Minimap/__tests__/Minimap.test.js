import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import Minimap from '..'

import { minimap } from '../../../__fixtures__/minimap.js'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(
      <I18nApp ReactComponent={
        <Minimap
          data={minimap}
          isLoading={false}
          params={{}} />}
      />, div)
  })

})

import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import Minimap from '..'

import { minimap } from '../../../__fixtures__/minimap.js'

it('renders props correctly', () => {

  act(() => {
    render(
      <I18nApp ReactComponent={
        <Minimap
          data={minimap}
          isLoading={false}
          params={{}} />}
      />)
  })

})

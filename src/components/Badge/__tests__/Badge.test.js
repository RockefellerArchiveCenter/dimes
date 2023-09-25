import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import { Badge } from '..'

it('renders without errors', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<Badge text={"foobar"} />} />, div)
  })
})

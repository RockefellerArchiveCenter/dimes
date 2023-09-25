import React from 'react'
import {render} from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import Header from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<Header myListCount={4} />} />, div)
  })

  list = document.querySelector('#list')
  expect(list.textContent).toContain('(4)')
})

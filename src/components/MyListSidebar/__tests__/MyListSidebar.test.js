import React from 'react'
import { render } from 'react-dom'
import MyListSidebar from '..'
import { I18nApp } from '../../i18n'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<MyListSidebar
    duplicationRequest={jest.fn()}
    readingRoomRequest={jest.fn()}
    sendEmail={jest.fn()} />
  } />, div)
})

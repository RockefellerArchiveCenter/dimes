import React from 'react'
import { render } from 'react-dom'
import { I18nApp } from '../../i18n'
import MyListExportActions from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<MyListExportActions
    confirmDeleteAll={jest.fn()}
    downloadCsv={jest.fn()}
    emailList={jest.fn()}
            />} />, div)
})

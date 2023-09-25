import React from 'react'
import { render } from 'react-dom'
import { I18nApp } from '../../i18n'
import { SearchPagination } from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(
    <I18nApp ReactComponent={<SearchPagination
      handlePageClick={jest.fn()}
      offset={0}
      pageCount={20}
      pageSize={40}
    />} />, div)
})

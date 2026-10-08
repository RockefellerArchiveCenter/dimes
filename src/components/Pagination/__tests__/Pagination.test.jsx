import { render, screen } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { SearchPagination } from '..'

it('renders without crashing', () => {
  render(
    <I18nApp ReactComponent={<SearchPagination
      handlePageClick={vi.fn()}
      hrefBuilder={page => `/search/?offset=${(page - 1) * 40}`}
      offset={0}
      pageCount={20}
      pageSize={40}
    />} />)
})

import ReactPaginate from 'react-paginate'
import { t } from '@lingui/core/macro'
import MaterialIcon from '../MaterialIcon'
import './styles.scss'

export const SearchPagination = props => (
  <ReactPaginate
    previousLabel={<MaterialIcon icon='keyboard_arrow_left' />}
    previousClassName={'pagination__button'}
    previousAriaLabel={t({
      comment: 'Accessible label for the previous page pagination button',
      message: 'Previous page'
    })}
    nextLabel={<MaterialIcon icon='keyboard_arrow_right' />}
    nextClassName={'pagination__button'}
    nextAriaLabel={t({
      comment: 'Accessible label for the next page pagination button',
      message: 'Next page'
    })}
    breakLabel={'...'}
    breakClassName={'pagination__break'}
    breakAriaLabels={{
      forward: t({
        comment: 'Accessible label for the pagination button that skips ahead several pages',
        message: 'Jump forward several pages'
      }),
      backward: t({
        comment: 'Accessible label for the pagination button that skips back several pages',
        message: 'Jump backward several pages'
      })
    }}
    hrefBuilder={props.hrefBuilder}
    forcePage={Math.ceil((props.offset || 0) / props.pageSize)}
    pageCount={props.pageCount}
    marginPagesDisplayed={1}
    pageRangeDisplayed={4}
    onPageChange={props.handlePageClick}
    containerClassName={'pagination__list'}
    pageClassName={'pagination__page'}
    activeClassName={'page__active'}
  />
)

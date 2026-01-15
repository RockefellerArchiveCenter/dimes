import { render, act } from '@testing-library/react'
import RecordsDetail from '..'

import { ancestors } from '../../../__fixtures__/ancestors'
import { collectionWithChildHits } from '../../../__fixtures__/collection'
import { object } from '../../../__fixtures__/object'
import { I18nApp } from '../../i18n'

it('renders no ancestors without crashing', () => {
  act(() => {
    render(<I18nApp ReactComponent={<RecordsDetail
      ancestors={{}}
      isAncestorsLoading={false}
      isContentShown={false}
      isItemLoading={false}
      item={collectionWithChildHits}
      myListCount={0}
      params={{}}
      toggleInList={jest.fn()}
      toggleMinimapModal={jest.fn()} />} />)
  })
})

it('renders ancestors without crashing', () => {
  act(() => {
    render(<I18nApp ReactComponent={<RecordsDetail
      ancestors={ancestors}
      isAncestorsLoading={false}
      isContentShown
      isItemLoading={false}
      item={object}
      myListCount={0}
      params={{}}
      toggleInList={jest.fn()}
      toggleMinimapModal={jest.fn()} />} />)
  })
})

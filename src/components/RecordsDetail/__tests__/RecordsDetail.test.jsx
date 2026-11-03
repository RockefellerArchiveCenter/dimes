import { render, act } from '@testing-library/react'
import RecordsDetail from '..'

import { ancestors } from '../../../__fixtures__/ancestors'
import { collectionWithChildHits } from '../../../__fixtures__/collection'
import { object, objectNoDownload, objectNoManifest } from '../../../__fixtures__/object'
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
      toggleInList={vi.fn()}
      toggleMinimapModal={vi.fn()} />} />)
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
      toggleInList={vi.fn()}
      toggleMinimapModal={vi.fn()} />} />)
  })
  const buttons = document.querySelectorAll('.btn--detail')
  expect(buttons.length).toBe(5)
  expect(buttons[3].textContent).toContain('View Online')
  expect(buttons[4].textContent).toContain('Download')
})


it('renders with no download file version', () => {
  act(() => {
    render(<I18nApp ReactComponent={<RecordsDetail
      ancestors={ancestors}
      isAncestorsLoading={false}
      isContentShown
      isItemLoading={false}
      item={objectNoDownload}
      myListCount={0}
      params={{}}
      toggleInList={vi.fn()}
      toggleMinimapModal={vi.fn()} />} />)
  })
  const buttons = document.querySelectorAll('.btn--detail')
  expect(buttons.length).toBe(4)
  expect(buttons[3].textContent).toContain('View Online')
})

it('renders with no manifest file version', () => {
  act(() => {
    render(<I18nApp ReactComponent={<RecordsDetail
      ancestors={ancestors}
      isAncestorsLoading={false}
      isContentShown
      isItemLoading={false}
      item={objectNoManifest}
      myListCount={0}
      params={{}}
      toggleInList={vi.fn()}
      toggleMinimapModal={vi.fn()} />} />)
  })
  const buttons = document.querySelectorAll('.btn--detail')
  expect(buttons.length).toBe(4)
  expect(buttons[3].textContent).toContain('Download')
})
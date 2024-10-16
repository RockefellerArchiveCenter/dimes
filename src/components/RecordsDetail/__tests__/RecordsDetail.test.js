import React from 'react'
import { render } from 'react-dom'
import RecordsDetail from '..'
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import { ancestors } from '../../../__fixtures__/ancestors'
import { collectionWithChildHits } from '../../../__fixtures__/collection'
import { object } from '../../../__fixtures__/object'
import { I18nApp } from '../../i18n'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={
    <LiveAnnouncer>
    <RecordsDetail
    ancestors={{}}
    isAncestorsLoading={false}
    isContentShown={false}
    isItemLoading={false}
    item={collectionWithChildHits}
    myListCount={0}
    params={{}}
    toggleInList={jest.fn()}
    toggleMinimapModal={jest.fn()} />
    </LiveAnnouncer>} />, div)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={
  <LiveAnnouncer>
    <RecordsDetail
    ancestors={ancestors}
    isAncestorsLoading={false}
    isContentShown
    isItemLoading={false}
    item={object}
    myListCount={0}
    params={{}}
    toggleInList={jest.fn()}
    toggleMinimapModal={jest.fn()} />
    </LiveAnnouncer>} />, div)
})

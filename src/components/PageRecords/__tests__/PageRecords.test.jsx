import axios from 'axios'
import { LiveAnnouncer } from 'react-aria-live';
import { render, act } from '@testing-library/react'
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PageRecords from '..'

import { object } from '../../../__fixtures__/object'
import { ancestors } from '../../../__fixtures__/ancestors'
import { childrenCollections } from '../../../__fixtures__/children'
import { minimap } from '../../../__fixtures__/minimap'
import { I18nApp } from '../../i18n'

jest.mock('axios')
jest.mock('../../Hooks')

it('renders props correctly', async () => {
  let container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)

  axios.get.mockImplementation((url) => {
    if (url.includes('ancestors')) {
      return Promise.resolve({data: ancestors})
    } else if (url.includes('children')) {
      return Promise.resolve({data: {next: null, results: childrenCollections}})
    } else if (url.includes('objects')) {
      return Promise.resolve({data: object})
    } else if (url.includes('minimap')) {
      return Promise.resolve({data: minimap})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(
    <I18nApp ReactComponent={
      <LiveAnnouncer>
        <MemoryRouter initialEntries={['/objects/oVDNM8UtE3ox9fiESd99Wy']}>
          <Routes>
            <Route path='/:type/:id' element={
              <PageRecords myListCount={1} toggleInList={jest.fn()} />} />
          </Routes>
        </MemoryRouter>
      </LiveAnnouncer>}
      />)
  })

  const title = await document.querySelector('h1')

  expect(title.textContent).toBe('Volunteer Urban Consulting Group, Inc.')

})

import axios from 'axios'
import { render, act } from '@testing-library/react'
import { Route, Routes, MemoryRouter } from 'react-router';
import PageAgent from '..'
import { I18nApp } from '../../i18n';

import { agent } from '../../../__fixtures__/agents'
import { collections } from '../../../__fixtures__/agents'

vi.mock('axios')

beforeEach(() => {
  window._mtm = []
})

it('renders props correctly', async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('agents')) {
      return Promise.resolve({data: agent})
    } else if (url.includes('search')) {
      return Promise.resolve({data: collections})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(
      <I18nApp ReactComponent={
        <MemoryRouter initialEntries={['/agents/nQV9zedPVBqFgyGrXPQvBw']}>
          <Routes>
            <Route path='/agents/:id' element={<PageAgent />} />
          </Routes>
        </MemoryRouter>
      }/>)
  })

  const title = await document.querySelector('h1')
  const children = await document.querySelector('.card-list')

  expect(title.textContent).toBe('Rockefeller, Nelson A. (Nelson Aldrich)')
  expect(children.children.length).toBe(8)

  expect(document.title).toBe(agent.title)
  expect(window._mtm).toEqual([{
    event: 'reactPageViewEvent',
    pageTitle: agent.title,
    pageUrl: window.location.href,
  }])
})

import React from 'react'
import axios from 'axios'
import { LiveAnnouncer, LiveMessage } from "react-aria-live";
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageRecords from '..'

import { object } from '../../../__fixtures__/object'
import { ancestors } from '../../../__fixtures__/ancestors'
import { childrenCollections } from '../../../__fixtures__/children'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

jest.mock('axios')

it('renders props correctly', async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('ancestors')) {
      return Promise.resolve({data: ancestors})
    } else if (url.includes('children')) {
      return Promise.resolve({data: {next: null, results: childrenCollections}})
    } else if (url.includes('objects')) {
      return Promise.resolve({data: object})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(
      <LiveAnnouncer>
        <PageRecords
          history={{ push: jest.fn() }}
          match={{params: {type: "objects", id: "oVDNM8UtE3ox9fiESd99Wy"}}}
          location={{search: ""}}
          myListCount={1}
          toggleInList={jest.fn()} />
      </LiveAnnouncer>, container)
  })

  const title = await document.querySelector('h1')

  expect(title.textContent).toBe('Volunteer Urban Consulting Group, Inc.')

})

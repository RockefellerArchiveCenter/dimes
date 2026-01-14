import axios from 'axios'
import { render, act } from '@testing-library/react'
import PageMyList from '..'

import { resolvedList } from '../../../__fixtures__/resolvedList'
import { parsedBatch } from '../../../__fixtures__/parsedBatch'
import { I18nApp } from '../../i18n'

beforeEach(() => {
  let container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
})

jest.mock('axios')

it('renders props correctly', async () => {
  axios.post.mockImplementation((url) => {
    if (url.includes('mylist')) {
      return Promise.resolve({ data: resolvedList })
    } else if (url.includes('process-request/parse-batch')) {
      return Promise.resolve({ data: parsedBatch })
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  axios.get.mockImplementation((url) => {
    if (url.includes('status')) {
      return Promise.resolve({ data: { pong: true } })
    } else if (url.includes('reading-rooms')) {
      return Promise.resolve({data:[]})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(<I18nApp ReactComponent={<PageMyList
      removeAllListItems={jest.fn()}
      toggleInList={jest.fn()} />} />)
  })

  const list = await document.querySelector('.saved-items')

  expect(list.children.length).toBe(1)

})

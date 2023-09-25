import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import {ModalSavedItemList} from '..'

import { checkedList } from '../../../__fixtures__/checkedList'
import { resolvedList } from '../../../__fixtures__/resolvedList'


let container = null
beforeEach(() => {
  container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

jest.mock('axios')

it('renders props correctly', async () => {
  axios.post.mockImplementation((url) => {
    if (url.includes('parse')) {
      return Promise.resolve({data: {}})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    render(<I18nApp ReactComponent={<ModalSavedItemList
      items={resolvedList}
      ignoreRestrictions={true}
      handleChange={jest.fn()}
      setSubmit={jest.fn()} />} />, container)
  })

  await act(async () => {
    const groupTitle = document.querySelector('.modal-item-group__title')
    expect(groupTitle.textContent).toBe('Cary Reich papers')
    const itemTitle = document.querySelector('.modal-saved-item > label')
    expect(itemTitle.textContent).toBe('Abramovitz, Max')
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).not.toBeChecked()
  })

  await act(async () => {
    render(<I18nApp ReactComponent={<ModalSavedItemList
      items={checkedList}
      ignoreRestrictions={true}
      handleChange={jest.fn()}
      setSubmit={jest.fn()} />} />, container)
  })

  await act(async () => {
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).toBeChecked()
  })
})

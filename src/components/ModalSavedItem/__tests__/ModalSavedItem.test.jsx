import axios from 'axios'
import { render, act } from '@testing-library/react'
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

jest.mock('axios')

it('renders resolved list correctly', async () => {
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
      setSubmit={jest.fn()} />} />)
  })

  await act(async () => {
    const groupTitle = document.querySelector('.modal-item-group__title')
    expect(groupTitle.textContent).toBe('Cary Reich papers')
    const itemTitle = document.querySelector('.modal-saved-item > label')
    expect(itemTitle.textContent).toBe('Abramovitz, Max')
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).not.toBeChecked()
  })
})

it('renders checked list correctly', async () => {
  await act(async () => {
    render(<I18nApp ReactComponent={<ModalSavedItemList
      items={checkedList}
      ignoreRestrictions={true}
      handleChange={jest.fn()}
      setSubmit={jest.fn()} />} />)
  })

  await act(async () => {
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).toBeChecked()
  })
})

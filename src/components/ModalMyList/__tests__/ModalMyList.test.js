import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import {
  DuplicationRequestModal,
  EmailModal,
  ModalMyList,
  ReadingRoomRequestModal
} from '..'

import { checkedList } from '../../../__fixtures__/checkedList'
import { resolvedList } from '../../../__fixtures__/resolvedList'
import { submitList } from '../../../__fixtures__/submitList'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  axios.post.mockImplementation((url) => {
    if (url.includes('parse')) {
      return Promise.resolve({data: {}})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })
  axios.get.mockImplementation((url) => Promise.resolve({data:[]}))
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

jest.mock('axios')

it('renders props correctly', async () => {
  act(() => {
    render(<ModalMyList
      appElement={container}
      handleChange={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      title='foo'
      toggleModal={jest.fn()} />, container)
  })

  const selectButton = document.querySelector('.modal-list > button')
  const title = document.querySelector('.modal-header__title')
  const totals = document.querySelector('.selected-totals')

  await act(async () => {
    expect(selectButton.textContent).toContain('Select all items')
    expect(title.textContent).toBe('foo')
    expect(totals.textContent).toBe('selected: 0 items')
  })

  act(() => {
    render(<ModalMyList
      appElement={container}
      handleChange={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={checkedList}
      setSubmit={jest.fn()}
      title='foo'
      toggleModal={jest.fn()} />, container)
  })

  await act(async () => {
    expect(selectButton.textContent).toContain('Deselect all items')
    expect(totals.textContent).toBe('selected: 2 audio tapes, 9 folders, 1 item')
  })
})

it('renders email modal props correctly', async () => {
  act(() => {
    render(<EmailModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain("Email *")
    expect(form.textContent).toContain("Subject")
    expect(form.textContent).toContain("Message")
    expect(buttons.querySelector("[type=submit]").textContent).toBe('Send List')
    expect(buttons.querySelector("[type=reset]").textContent).toBe('Cancel')
  })
})

it('validates email modal form correctly', async () => {
  act(() => {
    render(<EmailModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain('Please complete this field.')
  expect(form.textContent).toContain('An email address is required.')
})

it('renders reading room modal props correctly', async () => {
  act(() => {
    render(<ReadingRoomRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain("Message for RAC staff")
    expect(buttons.querySelector("[type=submit]").textContent).toBe('Request 4 Items')
    expect(buttons.querySelector("[type=reset]").textContent).toBe('Cancel')
  })
})

it('validates reading room modal form correctly', async () => {
  act(() => {
    render(<ReadingRoomRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain('Please complete this field.')
})

it('renders duplication modal props correctly', async () => {
  act(() => {
    render(<DuplicationRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain("Description of Materials")
    expect(form.textContent).toContain("Message for RAC staff")
    expect(buttons.querySelector("[type=submit]").textContent).toBe('Request 4 Items')
    expect(buttons.querySelector("[type=reset]").textContent).toBe('Cancel')
  })
})

it('validates duplication modal form correctly', async () => {
  act(() => {
    render(<DuplicationRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain('Please complete this field.')
  expect(form.textContent).toContain('Please select your desired duplication format.')
  expect(form.textContent).toContain('We cannot process your request unless you agree to pay the costs of reproduction.')
})

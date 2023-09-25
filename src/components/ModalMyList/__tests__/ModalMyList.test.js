import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import { t } from '@lingui/macro'
import {
  DuplicationRequestModal,
  EmailModal,
  ModalMyList,
  ReadingRoomRequestModal
} from '..'

import { checkedList } from '../../../__fixtures__/checkedList'
import { resolvedList } from '../../../__fixtures__/resolvedList'
import { submitList } from '../../../__fixtures__/submitList'
import { I18nApp } from '../../i18n'

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
    render(<I18nApp ReactComponent={<ModalMyList
      appElement={container}
      handleChange={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      title='foo'
      toggleModal={jest.fn()} />} />, container)
  })

  const selectButton = document.querySelector('.modal-list > button')
  const title = document.querySelector('.modal__header-title')
  const totals = document.querySelector('.selected-totals')

  await act(async () => {
    expect(selectButton.textContent).toContain(t({
      comment: 'Button Select all items Test',
      message: 'Select all items'
    }))
    expect(title.textContent).toBe('foo')
    expect(totals.textContent).toBe(t({
      comment: 'totals empty Test',
      message: 'selected: 0 items'
    }))
  })

  act(() => {
    render(<I18nApp ReactComponent={<ModalMyList
      appElement={container}
      handleChange={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={checkedList}
      setSubmit={jest.fn()}
      title='foo'
      toggleModal={jest.fn()} />} />, container)
  })

  await act(async () => {
    expect(selectButton.textContent).toContain(t({
      comment: 'Button Deselect all items Test',
      message: 'Deselect all items'
    }))
    expect(totals.textContent).toBe(t({
      comment: 'Button Select all items Test',
      message: 'selected:'
    }) + ' 2 audio tapes, 9 folders, 1 item')
  })
})

it('renders email modal props correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<EmailModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain(t({
      comment: 'Email Modal Form Test',
      message: "Email *"
    }))
    expect(form.textContent).toContain(t({
      comment: 'Subject Modal Form Test',
      message: "Subject"
    }))
    expect(form.textContent).toContain(t({
      comment: 'Message Modal Form Test',
      message: "Message"
    }))
    expect(buttons.querySelector("[type=submit]").textContent).toBe(t({
      comment: 'Modal Form Submit Test',
      message: 'Send List'
    }))
    expect(buttons.querySelector("[type=reset]").textContent).toBe(t({
      comment: 'Modal Form Reset Test',
      message: 'Cancel'
    }))
  })
})

it('validates email modal form correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<EmailModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain(t({
    comment: 'Modal Form Missing Field Test',
    message: 'Please complete this field.'
  }))
  expect(form.textContent).toContain(t({
    comment: 'Modal Form Missing Email Address Test',
    message: 'An email address is required.'
  }))
})

it('renders reading room modal props correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<ReadingRoomRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain(t({
      comment: 'Scheduled Date Modal Form Test',
      message: "Scheduled Date *"
    }))
    expect(form.textContent).toContain(t({
      message: "Message for RAC staff"
    }))
    expect(buttons.querySelector("[type=submit]").textContent).toBe(t({
      comment: 'Request items Modal Form Test',
      message: 'Request 4 Items'
    }))
    expect(buttons.querySelector("[type=reset]").textContent).toBe(t({
      message: 'Cancel'
    }))
  })
})

it('validates reading room modal form correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<ReadingRoomRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain(t({
    message: 'Please complete this field.'
  }))
})

it('renders duplication modal props correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<DuplicationRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')
  const buttons = document.querySelector('.modal-form__buttons')

  await act(async () => {
    expect(form.textContent).toContain(t({
      comment: 'Description Modal Form Test',
      message: "Description of Materials"
    }))
    expect(form.textContent).toContain(t({
      comment: 'Message Modal Form Test',
      message: "Message for RAC staff"
    }))
    expect(buttons.querySelector("[type=submit]").textContent).toBe(t({
      message: 'Request 4 Items'
    }))
    expect(buttons.querySelector("[type=reset]").textContent).toBe(t({
      message: 'Cancel'
    }))
  })
})

it('validates duplication modal form correctly', async () => {
  act(() => {
    render(<I18nApp ReactComponent={<DuplicationRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      ignoreRestrictions={true}
      isOpen={true}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />} />, container)
  })

  const form = document.querySelector('.modal-form')

  await act(async () => {
    document.querySelector("[type=submit]").dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(form.textContent).toContain(t({
    message: 'Please complete this field.'
  }))
  expect(form.textContent).toContain(t({
    comment: 'Duplication Format Message Test',
    message: 'Please select your desired duplication format.'
  }))
  expect(form.textContent).toContain(t({
    comment: 'Payment Modal Form Test',
    message: 'We cannot process your request unless you agree to pay the costs of reproduction.'
  }))
})

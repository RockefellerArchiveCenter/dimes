import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import ModalConfirm from '..'

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

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ModalConfirm
      appElement={container}
      isOpen
      message='foo'
      title='Bar'
      toggleModal={jest.fn()} />} />, container)
  })

  const title = document.querySelector('.modal__header-title')
  const message = document.querySelector('.modal-message')
  expect(title.textContent).toBe('Bar')
  expect(message.textContent).toBe('foo')
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<ModalConfirm
      appElement={container}
      isOpen
      message='foo'
      title='Bar'
      toggleModal={toggleModal} />} />, container)
  })

  const button = document.querySelector('.modal__header-button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

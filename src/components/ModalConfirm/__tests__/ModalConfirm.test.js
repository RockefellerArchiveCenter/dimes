import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
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
    render(<ModalConfirm
      appElement={container}
      isOpen
      message='foo'
      title='Bar'
      toggleModal={jest.fn()} />, container)
  })

  const title = document.querySelector('.modal-header__title')
  const message = document.querySelector('.modal-message')
  expect(title.textContent).toBe('Bar')
  expect(message.textContent).toBe('foo')
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()

  act(() => {
    render(<ModalConfirm
      appElement={container}
      isOpen
      message='foo'
      title='Bar'
      toggleModal={toggleModal} />, container)
  })

  const button = document.querySelector('.modal-header__button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

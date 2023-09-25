import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import { ModalMinimapInfo } from '..'

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
    render(<I18nApp ReactComponent={<ModalMinimapInfo
      appElement={container}
      hasSeenMinimapIntro={false}
      isOpen
      toggleModal={jest.fn()} />} />, container)
  })
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<ModalMinimapInfo
      appElement={container}
      hasSeenMinimapIntro={false}
      isOpen
      toggleModal={toggleModal} />} />, container)
  })

  const button = document.querySelector('.modal__header-button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

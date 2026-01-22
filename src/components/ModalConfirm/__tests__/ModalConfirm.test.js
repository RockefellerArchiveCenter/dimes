import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import ModalConfirm from '..'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
})

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ModalConfirm
      appElement={container}
      isOpen
      message='foo'
      title='Bar'
      toggleModal={jest.fn()} />} />)
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
      toggleModal={toggleModal} />} />)
  })

  const button = document.querySelector('.modal__header-button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { ModalMinimapInfo } from '..'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
})

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ModalMinimapInfo
      appElement={container}
      hasSeenMinimapIntro={false}
      isOpen
      toggleModal={jest.fn()} />} />);
  })
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<ModalMinimapInfo
      appElement={container}
      hasSeenMinimapIntro={false}
      isOpen
      toggleModal={toggleModal} />} />);
  })

  const button = document.querySelector('.modal__header-button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

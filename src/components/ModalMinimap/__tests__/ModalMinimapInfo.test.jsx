import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { ModalMinimapInfo } from '..'

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ModalMinimapInfo
      hasSeenMinimapIntro={false}
      isOpen
      toggleModal={vi.fn()} />} />);
  })
})

it('handles clicks correctly', () => {
  const toggleModal = vi.fn()

  act(() => {
    render(<I18nApp ReactComponent={<ModalMinimapInfo
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

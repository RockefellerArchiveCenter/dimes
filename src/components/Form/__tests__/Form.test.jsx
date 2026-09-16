import { render, act } from '@testing-library/react'
import { t } from '@lingui/macro'
import { I18nApp } from '../../i18n'
import { FormButtons } from '..'

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<FormButtons submitText='foo' toggleModal={jest.fn()} />} />)
  })

  const submit = document.querySelector('div > button[type=submit]')
  const cancel = document.querySelector('div > button[type=reset]')
  expect(submit.textContent).toBe('foo')
  expect(cancel.textContent).toBe(t({
    comment: 'Test Cancel Button Label',
    message: 'Cancel'
  }))
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()
  act(() => {
    render(<I18nApp ReactComponent={<FormButtons submitText='foo' toggleModal={toggleModal} />} />)
  })

  const cancel = document.querySelector('div > button[type=reset]')

  act(() => {
    cancel.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})

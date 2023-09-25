import React from 'react'
import { render } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import Button from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const handleClick = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<Button
      type='submit'
      label='foo'
      className='bar'
      handleClick={handleClick} />} />, div)
  })

  const button = document.querySelector('button')

  expect(button.textContent).toContain('foo')
  expect(button.className).toBe('btn bar')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(handleClick).toHaveBeenCalledTimes(1)
})

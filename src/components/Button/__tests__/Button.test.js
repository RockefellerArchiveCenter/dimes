import { render } from '@testing-library/react'
import { act } from 'react'
import { I18nApp } from '../../i18n'
import Button from '..'

it('renders props correctly', () => {
  const handleClick = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<Button
      type='submit'
      label='foo'
      className='bar'
      handleClick={handleClick} />} />)
  })

  const button = document.querySelector('button')

  expect(button.textContent).toContain('foo')
  expect(button.className).toBe('btn bar')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(handleClick).toHaveBeenCalledTimes(1)
})

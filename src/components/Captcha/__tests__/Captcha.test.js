import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import Captcha from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const onChange = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<Captcha
      className='foo'
      form={{}}
      handleCaptchaChange={onChange} />} />, div)
  })

  const captcha = document.querySelector('[name=recaptcha]')
  expect(captcha.className).toBe('captcha my-10 mx-0 foo')
})

import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import Captcha from '..'

it('renders props correctly', () => {

  const onChange = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<Captcha
      className='foo'
      form={{}}
      handleCaptchaChange={onChange} />} />)
  })

  const captcha = document.querySelector('.captcha')
  expect(captcha.className).toBe('captcha my-10 mx-0 foo')
})

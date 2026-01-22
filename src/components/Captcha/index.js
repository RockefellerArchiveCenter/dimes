import { createRef, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import classnames from 'classnames'
import './styles.scss'

const Captcha = ({ className, form, handleCaptchaChange }) => {

  const recaptchaRef = createRef()

  useEffect(() => {
    if (form.isValid && form.isSubmitting) {
      recaptchaRef.current.reset()
    }
  }, [form])


  return (
    <div name='recaptcha' tabIndex='0' className={classnames('captcha my-10 mx-0', className)}>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        ref={recaptchaRef} />
    </div>
  )
}

export default Captcha

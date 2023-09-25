import React, { createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
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

Captcha.propTypes = {
  className: PropTypes.string,
  form: PropTypes.object,
  handleCaptchaChange: PropTypes.func
}

export default Captcha

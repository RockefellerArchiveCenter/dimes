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
    <div name='recaptcha' tabIndex='0' className={classnames('captcha', className)}>
      <ReCAPTCHA
        sitekey='6LdQiSkTAAAAAPsOlHq_QmykPBEF9jdq3qQL_D9a'
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

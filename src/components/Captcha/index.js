import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";

// TODO: replace Captcha key
class Captcha extends Component {
  constructor(props) {
    super(props)
    this.recaptchaRef = React.createRef();
  }

  componentDidUpdate() {
    if (!this.props.form.isValid && this.props.form.isSubmitting) {
      this.recaptchaRef.current.reset()
    }
  }

  render() {
    return (
      <div name="recaptcha" tabIndex="0" className={`captcha ${this.props.className && this.props.className}`}>
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={this.props.handleCaptchaChange}
          ref={this.recaptchaRef} />
      </div>
    )
  }
}

Captcha.propTypes = {
  className: PropTypes.string,
  handleCaptchaChange: PropTypes.func
}

export default Captcha;

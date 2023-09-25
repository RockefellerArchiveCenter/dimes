import React, { useEffect } from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'

export const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext()

  /** If there are errors on form submission, focus on first input that has an error */
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const keys = Object.keys(errors)
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`
        const errorElement = document.querySelector(selector)
        if (errorElement) {
          errorElement.focus()
        }
      }
    }
  }, [errors, isSubmitting, isValidating])
  return null
}

export const FormGroup = (props) => {
  const { children, component, errors, helpText, maxLength, label, name, required, rows, touched, type } = props
  /** Return text for aria describedBy label */
  const describedBy = () => {
    if (helpText) {
      if (errors && errors[name] && touched[name]) {
        return `${name}-error desc-${name}`
      } else {
        return `desc-${name}`
      }
    } else {
      if (errors && errors[name] && touched[name]) {
        return `${name}-error`
      }
    }
  }
  return (
    <div className='form-group mx-0'>
      { type !== 'checkbox' && <label htmlFor={name}>{label}</label> }
      <Field
        tabIndex='0'
        className={classnames({'is-invalid': errors && errors[name] && touched[name]})}
        type={type}
        name={name}
        id={name}
        component={component}
        rows={rows}
        children={children}
        maxLength={maxLength}
        aria-invalid={errors && errors[name] && touched[name] ? 'true' : null}
        aria-describedby={describedBy()}
        aria-required={required} />
      { type === 'checkbox' && <label htmlFor={name}>{label}</label> }
      { helpText && <p className='input__help-text' id={`desc-${name}`}>{helpText}</p> }
      <ErrorMessage id={`${name}-error`} name={name} component='div' className='input__error' />
    </div>
  )
}

FormGroup.propTypes = {
  children: PropTypes.array,
  component: PropTypes.string,
  hasErrorMsg: PropTypes.bool,
  errors: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rows: PropTypes.number,
  touched: PropTypes.object,
  type: PropTypes.string
}

export const FormButtons = ({ isSubmitting, submitText, toggleModal }) => (
  <div className='modal-form__buttons my-10 mx-0'>
    <button type='submit' disabled={isSubmitting} className='btn btn--orange btn--sm'>
      {submitText}
    </button>
    <button type='reset' className='btn btn--gray btn--sm' onClick={toggleModal}>
      <Trans comment='Reset/Cancel Button for Form'>
        Cancel
      </Trans>
    </button>
  </div>
)

FormButtons.propTypes = {
  isSubmitting: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
}

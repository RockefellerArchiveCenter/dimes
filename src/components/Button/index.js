import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '../MaterialIcon'
import classnames from 'classnames'
import './styles.scss'

const Button = props => (
  <button
    type={props.type}
    className={classnames('btn', props.className)}
    onClick={props.handleClick}
    aria-label={props.ariaLabel}
    aria-haspopup={props.ariaHasPopup}
    aria-expanded={props.ariaExpanded}
    aria-pressed={props.ariaPressed}
    disabled={props.disabled} >
    { props.iconBefore &&
      <MaterialIcon icon={props.iconBefore} className='material-icon--space-after' />} {props.label} {props.iconAfter && <MaterialIcon icon={props.iconAfter} className='material-icon--space-before' />}
  </button>)

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  handleClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button

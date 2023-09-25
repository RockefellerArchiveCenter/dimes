import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export const Badge = ({ className, text }) => (
  <span className={classnames('badge', className)}>
    {text}
  </span>
)

Badge.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import classnames from 'classnames'
import { t, select } from '@lingui/macro'
import './styles.scss'

const ContextSwitcher = ({isContentShown, toggleIsContentShown}) => (
  <div className='toggle-wrapper'>
    <Button
      className={classnames('btn--lg', 'btn--orange', 'toggle-context', 'mb-0')}
      iconBefore={isContentShown ? 'west' : null}
      iconAfter={isContentShown ? null : 'east'}
      label={t({
        comment: 'Label for Context Switcher',
        message: select(isContentShown, {
          true: 'Collection Details',
          other: 'Collection Content'
        })
      })}
      handleClick={toggleIsContentShown} />
  </div>
)

ContextSwitcher.propTypes = {
  isContentShown: PropTypes.bool.isRequired,
  toggleIsContentShown: PropTypes.func.isRequired
}

export default ContextSwitcher

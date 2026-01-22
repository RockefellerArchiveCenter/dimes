import classnames from 'classnames'

export const Badge = ({ className, text }) => (
  <span className={classnames('badge', className)}>
    {text}
  </span>
)
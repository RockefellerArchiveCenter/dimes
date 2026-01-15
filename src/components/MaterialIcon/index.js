import classnames from 'classnames'

const MaterialIcon = ({ className, icon }) => {
  return <span className={classnames('material-icon', className)} aria-hidden='true'>{icon}</span>
}

export default MaterialIcon

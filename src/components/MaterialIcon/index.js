import {ReactComponent as ArchiveBox} from './assets/archive_box.svg'
import classnames from 'classnames'

const MaterialIcon = ({ className, icon }) => {
  if (icon === 'archive_box') {
    return <span aria-hidden='true'><ArchiveBox /></span>
  } else {
    return <span className={classnames('material-icon', className)} aria-hidden='true'>{icon}</span>
  }
}

export default MaterialIcon

import MaterialIcon from '../MaterialIcon'
import classnames from 'classnames'
import './styles.scss'

const Button = props => (
  <button
    type={props.type}
    id={props.id}
    className={classnames('btn', props.className)}
    onClick={props.handleClick}
    aria-label={props.ariaLabel}
    aria-labelledby={props.ariaLabelledBy}
    aria-haspopup={props.ariaHasPopup}
    aria-expanded={props.ariaExpanded}
    aria-pressed={props.ariaPressed}
    disabled={props.disabled} >
    { props.iconBefore &&
      <MaterialIcon icon={props.iconBefore} className='material-icon--space-after' />} {props.label} {props.iconAfter && <MaterialIcon icon={props.iconAfter} className='material-icon--space-before' />}
  </button>)

export default Button

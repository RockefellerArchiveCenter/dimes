import minimapIcon from '../../assets/minimap.png'
import { Trans } from '@lingui/macro'
import './styles.scss'

const MinimapButton = ({ toggleMinimapModal }) => (
  <button onClick={() => toggleMinimapModal()} type='button' className='btn btn--sm btn--minimap'>
    <span aria-hidden='true'>
      <img className='btn--minimap__icon' alt='' src={minimapIcon} />
    </span>
    <div className='btn--minimap__text ml-10'>
      <Trans comment='Button to view minimap'>
        View minimap
      </Trans>
    </div>
  </button>
)

export default MinimapButton

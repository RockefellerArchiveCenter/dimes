import Modal from 'react-modal'
import MaterialIcon from '../MaterialIcon'
import { t } from '@lingui/core/macro'
import './styles.scss'

const ModalConfirm = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    aria={{ labelledby: 'modal-confirm-title' }}
    className='modal modal--confirm'
    overlayClassName='modal__overlay'>
    <div className='modal__header'>
      <h2 id='modal-confirm-title' className='modal__header-title'>{props.title}</h2>
      <button className='modal__header-button' aria-label={t({
        message: 'Close'
      })} onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-message px-40 py-40'>
      {props.message}
    </div>
  </Modal>
)

export default ModalConfirm

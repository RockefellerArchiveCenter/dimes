import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import MaterialIcon from '../MaterialIcon'
import { t } from '@lingui/macro'
import './styles.scss'

const ModalConfirm = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal modal--confirm'
    overlayClassName='modal__overlay'>
    <div className='modal__header'>
      <h2 className='modal__header-title'>{props.title}</h2>
      <button className='modal__header-button' aria-label={t({
        message: 'Close'
      })} onClick={props.toggleModal}>
        <MaterialIcon icon='close' />
      </button>
    </div>
    <div className='modal-body--confirm'>
      <div className='modal-message px-40 py-40'>
        {props.message}
      </div>
    </div>
  </Modal>
)

ModalConfirm.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default ModalConfirm

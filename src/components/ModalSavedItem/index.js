import React from 'react'
import PropTypes from 'prop-types'
import { CheckBoxInput } from '../Inputs'
import { RestrictionsSkeleton } from '../LoadingSkeleton'
import './styles.scss'

const ModalSavedItemsRestrictions = ({submit, submitReason}) => (
  typeof submit === 'undefined' ?
    (<RestrictionsSkeleton />) :
    (submitReason ? (<div className='modal-form__error'>{submitReason}</div>) : (null))
)

const ModalSavedItem = props => {
  const { ignoreRestrictions, handleChange, isChecked, submitReason, title, submit, uri } = props

  return (
    <li className='modal-saved-item'>
      <CheckBoxInput
        className='checkbox--orange'
        id={uri}
        checked={isChecked || false}
        label={title}
        handleChange={handleChange}
        disabled={!ignoreRestrictions && !submit} />
      {ignoreRestrictions ?
        (null) :
        (<ModalSavedItemsRestrictions
          submit={submit}
          submitReason={submitReason} />)
      }
    </li>
  )
}

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  isChecked: PropTypes.bool,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired
}

const ModalSavedItemGroup = props => {
  const listItems = props.items.map((item, index) =>
    <ModalSavedItem
      handleChange={props.handleChange}
      ignoreRestrictions={props.ignoreRestrictions}
      key={index}
      {...item} />
  )
  return (
    <div className='modal-saved-items__item-group'>
      <h3 className='modal-item-group__title'>{props.title}</h3>
      <ul className='modal-item-group__items'>
        {listItems}
      </ul>
    </div>
  )
}

ModalSavedItemGroup.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export const ModalSavedItemList = props => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        ignoreRestrictions={props.ignoreRestrictions}
        handleChange={props.handleChange} />
    )) : (<p className='saved-items__empty'>No saved items.</p>)
  }
  return (
    <div className='modal-saved-items'>
      {groupItems(props.items)}
    </div>
  )
}

ModalSavedItemList.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  items: PropTypes.array.isRequired,
}

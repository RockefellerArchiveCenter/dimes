import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook'
import MaterialIcon from '../MaterialIcon'
import { t } from '@lingui/macro'
import '../Button/styles.scss'
import classnames from 'classnames'
import './styles.scss'

const DropdownItem = (props) => (
  <a
    key={props.order}
    id={`menu-item-${props.order}`}
    className={classnames('btn', props.className)}
    onClick={props.handleClick}
    href={props.href}
    role={props.role}
    title={props.title}>
    {props.iconBefore && <MaterialIcon icon={props.iconBefore} />}
    {props.label}{props.iconAfter && <MaterialIcon icon={props.iconAfter} />}
  </a>
)

const Dropdown = (props) => {
  const [className] = useState(props.className)
  const [iconBefore] = useState(props.iconBefore)
  const [iconBeforeOpen] = useState(props.iconBeforeOpen)
  const [label] = useState(props.label)
  const [listClassName] = useState(props.listClassName)
  const [role] = useState(props.role)
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(props.children && props.children.length)
  const openIcon = iconBeforeOpen ? iconBeforeOpen : iconBefore

  return (
    <div className={classnames('dropdown', className)}>
      <button
        className={classnames(props.buttonClassName, { 'open': isOpen, 'closed': !isOpen })}
        {...buttonProps} >
        {isOpen ? (<MaterialIcon icon={openIcon} className='material-icon--space-after' />) : (iconBefore && <MaterialIcon icon={iconBefore} className='material-icon--space-after' />)}
        {label}
      </button>
      <div
        className={classnames('dropdown__list', listClassName, { 'open': isOpen, 'closed': !isOpen})}
        role={role} >
        {props.children}
      </div>
    </div>
  )
}

export const MyListDropdown = ({ downloadCsv, duplicationRequest, emailList, readingRoomRequest, removeAllItems }) => (
  <Dropdown
    label={t({
      comment: 'Message shown on Dropdown button',
      message: 'Actions'
    })}
    iconBefore='settings'
    className='mylist__actions hide-on-lg-up mt-40 mr-30 mb-30'
    buttonClassName='btn btn--orange btn--md'
    listClassName='dropdown__list--orange dropdown__list--slide-down mylist__actions--dropdown'
    role='menu'>
      <DropdownItem
        order={1}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Schedule a Visit'
        })}
        iconBefore='account_balance'
        href='mailto:archive@rockarch.org?subject=Scheduling a research appointment'
        role='menuitem'
        title={t({
          comment: 'Tooltip for button',
          message: 'opens email'
        })} />
      <DropdownItem
        order={2}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Request in Reading Room'
        })}
        iconBefore='local_library'
        handleClick={readingRoomRequest}
        role='menuitem'/>
      <DropdownItem
        order={3}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Request Copies'
        })}
        iconBefore='content_copy'
        handleClick={duplicationRequest}
        role='menuitem'/>
      <DropdownItem
        order={4}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          message: 'Email List'
        })}
        iconBefore='email'
        handleClick={emailList}
        role='menuitem'/>
      <DropdownItem
        order={5}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Download as .csv'
        })}
        iconBefore='get_app'
        handleClick={downloadCsv}
        role='menuitem'/>
      <DropdownItem
        order={6}
        className='btn--orange dropdown__btn dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Remove All Items'
        })}
        iconBefore='delete'
        handleClick={removeAllItems}
        role='menuitem'/>
    </Dropdown>
  )

MyListDropdown.propTypes = {
  downloadCsv: PropTypes.func.isRequired,
  duplicationRequest: PropTypes.func.isRequired,
  emailList: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired
}

export const NavDropdown = () => (
  <Dropdown
    iconBefore='menu'
    iconBeforeOpen='close'
    className='hide-on-lg-up'
    buttonClassName='btn btn--navy nav__btn--mobile'
    listClassName='dropdown__list--mobile dropdown__list--navy dropdown__list--slide-left'>
      <DropdownItem
      order={1}
      className='btn--navy dropdown__btn dropdown__btn--mobile'
      label={t({
        comment: 'Message shown on sign-in button',
        message: 'Sign in to RACcess'
      })}
      iconAfter='east'
      href={t({
        comment: 'Link used for sign-in within Dropdown list',
        message: 'https://raccess.rockarch.org'
      })} />
      <DropdownItem
        order={2}
        className='btn--navy dropdown__btn dropdown__btn--mobile'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'My List'
        })}
        iconAfter='east'
        href='/list' />
    </Dropdown>
)

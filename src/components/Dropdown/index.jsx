import { useState, useEffect, useRef, Children, cloneElement } from 'react'
import MaterialIcon from '../MaterialIcon'
import { t } from '@lingui/macro'
import '../Button/styles.scss'
import classnames from 'classnames'
import './styles.scss'

// Custom Disclosure Dropdown Hook
const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)

  const close = (returnFocus = true) => {
    setIsOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  const toggle = () => (isOpen ? close() : setIsOpen(true))

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleFocusOut = (e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      close(false)
    }
  }

  const triggerProps = {
    ref: triggerRef,
    onClick: toggle,
    'aria-expanded': isOpen,
  }

  return { isOpen, triggerProps, containerRef, handleFocusOut, close }
}

// DropdownItem
export const DropdownItem = ({ className, href, handleClick, iconBefore, iconAfter, label, title, close }) => {
  const Tag = href ? 'a' : 'button'

  const handleItemClick = () => {
    handleClick?.()
    close?.()
  }

  return (
    <li>
      <Tag
        className={classnames('btn', className)}
        onClick={handleItemClick}
        href={Tag === 'a' ? href : undefined}
        type={Tag === 'button' ? 'button' : undefined}
        title={title}>
        {iconBefore && <MaterialIcon icon={iconBefore} />}
        {label}
        {iconAfter && <MaterialIcon icon={iconAfter} />}
      </Tag>
    </li>
  )
}

// Dropdown
export const Dropdown = ({ className, buttonClassName, listClassName, iconBefore, iconBeforeOpen, label, ariaLabel, children }) => {
  const { isOpen, triggerProps, containerRef, handleFocusOut, close } = useDropdown()
  const openIcon = iconBeforeOpen ?? iconBefore

  return (
    <div className={classnames('dropdown', className)} ref={containerRef} onBlur={handleFocusOut}>
      <button
        className={classnames(buttonClassName, { open: isOpen, closed: !isOpen })}
        aria-label={ariaLabel}
        {...triggerProps}>
        {isOpen
          ? openIcon && <MaterialIcon icon={openIcon} className='material-icon--space-after' />
          : iconBefore && <MaterialIcon icon={iconBefore} className='material-icon--space-after' />}
        {label}
      </button>
      <ul
        className={classnames('list--unstyled dropdown__list', listClassName, { open: isOpen, closed: !isOpen })}>
        {Children.map(children, child => cloneElement(child, { close }))}
      </ul>
    </div>
  )
}

// My List Dropdown
export const MyListDropdown = ({ downloadCsv, duplicationRequest, emailList, readingRoomRequest, removeAllItems }) => (
  <Dropdown
    label={t({
      comment: 'Message shown on Dropdown button',
      message: 'Actions'
    })}
    iconBefore='settings'
    className='mylist__actions hide-on-lg-up mt-40 mr-30 mb-30'
    buttonClassName='btn btn--orange btn--md'
    listClassName='dropdown__list--orange dropdown__list--slide-down mylist__actions--dropdown'>
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Schedule a Visit'
      })}
      iconBefore='account_balance'
      href='mailto:archive@rockarch.org?subject=Scheduling a research appointment'
      title={t({
        comment: 'Tooltip for button',
        message: 'opens email'
      })} />
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Request in Reading Room'
      })}
      iconBefore='local_library'
      handleClick={readingRoomRequest} />
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Request Copies'
      })}
      iconBefore='content_copy'
      handleClick={duplicationRequest} />
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        message: 'Email List'
      })}
      iconBefore='email'
      handleClick={emailList} />
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Download as .csv'
      })}
      iconBefore='get_app'
      handleClick={downloadCsv} />
    <DropdownItem
      className='btn--orange dropdown__btn dropdown__item--orange'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Remove All Items'
      })}
      iconBefore='delete'
      handleClick={removeAllItems} />
  </Dropdown>
)

// Nav DropdownDor
export const NavDropdown = () => (
  <Dropdown
    ariaLabel={t({
      message: 'Menu'
    })}
    iconBefore='menu'
    iconBeforeOpen='close'
    className='hide-on-lg-up'
    buttonClassName='btn btn--navy nav__btn--mobile'
    listClassName='dropdown__list--mobile dropdown__list--navy dropdown__list--slide-left'>
    <DropdownItem
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
      className='btn--navy dropdown__btn dropdown__btn--mobile'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'My List'
      })}
      iconAfter='east'
      href='/list' />
  </Dropdown>
)

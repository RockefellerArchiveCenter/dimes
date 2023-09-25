import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '../MaterialIcon'
import {NavDropdown} from '../Dropdown'
import classnames from 'classnames'

export const NavItem = ({ className, href, icon, id, label}) => (
  <li className={classnames('nav__item btn--navy', className)}>
    <a className={classnames('nav__link', className)} href={href} id={id}>{label} {icon && <MaterialIcon icon={icon} />}</a>
  </li>)

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired
}

export const Nav = ({ ariaLabel, children, className}) => (
  <nav className={classnames('nav-right', className)} aria-label={ariaLabel}>
    <ul className='nav__list show-on-lg-up'>
      {children}
    </ul>
    <NavDropdown />
  </nav>)

Nav.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string
}

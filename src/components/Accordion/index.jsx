import React, { useEffect, useState } from 'react'
import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf
} from './helpers/focus'
import keycodes from './helpers/keycodes'

/** Adds props to an array of children */
const addPropsToChildren = (children, props) => (
  React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props)
    }
    return child
  })
)

export const Accordion = ({ className, children, preExpanded}) => (
  <div data-accordion-component='Accordion' className={className}>
    {addPropsToChildren(children, {preExpanded: preExpanded})}
  </div>
)

/* Main accordion component
* 1. Sets isExpanded when preExpanded array changes.
*/
export const AccordionItem = ({ className, children, onClick, preExpanded, uuid }) => {
  const [isExpanded, setIsExpanded] = useState(preExpanded.includes(uuid))

  useEffect(() => { /* 1 */
    setIsExpanded(preExpanded && preExpanded.includes(uuid) ? true : false)
  }, [preExpanded])

  return (
    <div data-accordion-component='AccordionItem' className={className}>
      {addPropsToChildren(children, {uuid: uuid, isExpanded: isExpanded, setIsExpanded: setIsExpanded})}
    </div>
  )
}

export const AccordionItemButton = ({ className, children, isExpanded, onClick, setIsExpanded, uuid }) => {
  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onClick && onClick()
  }

  /** Handles keyboard events for WCAG compliance */
  const handleKeyPress = evt => {
    const keyCode = evt.which.toString()

    if (keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) {
      evt.preventDefault()
      handleClick()
    }

    if (evt.target instanceof HTMLElement) {
      switch (keyCode) {
        case keycodes.HOME: {
          evt.preventDefault()
          focusFirstSiblingOf(evt.target)
          break
        }
        case keycodes.END: {
          evt.preventDefault()
          focusLastSiblingOf(evt.target)
          break
        }
        case keycodes.LEFT:
        case keycodes.UP: {
          evt.preventDefault()
          focusPreviousSiblingOf(evt.target)
          break
        }
        case keycodes.RIGHT:
        case keycodes.DOWN: {
          evt.preventDefault()
          focusNextSiblingOf(evt.target)
          break
        }
        default: {
            //
        }
      }
    }
  }

  return (
    <div data-accordion-component='AccordionItemButton'
      className={className}
      id={`accordion__heading-${uuid}`}
      aria-expanded={isExpanded}
      role='button'
      tabIndex='0'
      onClick={handleClick}
      onKeyDown={handleKeyPress} >
      {children}
    </div>
  )
}

export const AccordionItemHeading = ({ ariaLevel, className, children, isExpanded, setIsExpanded, uuid }) => (
  <div data-accordion-component='AccordionItemHeading'
    aria-level={ariaLevel}
    className={className}
    role='heading' >
    {addPropsToChildren(children, { uuid: uuid, isExpanded: isExpanded, setIsExpanded: setIsExpanded })}
  </div>
)

export const AccordionItemPanel = ({ className, children, isExpanded, uuid }) => (
  <div data-accordion-component='AccordionItemPanel'
    className={className}
    aria-hidden={!isExpanded}
    aria-labelledby={`accordion__heading-${uuid}`}
    id={`accordion__panel-${uuid}`}
    hidden={!isExpanded} >
    {children}
  </div>
)

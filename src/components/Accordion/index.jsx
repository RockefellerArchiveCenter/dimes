import React, { createContext, useContext, useEffect, useState } from 'react'
import MaterialIcon from '../MaterialIcon'

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

const AccordionItemContext = createContext({})

/** Merges item state from context with any props passed directly */
const useItem = props => ({ ...useContext(AccordionItemContext), ...props })

/* Main accordion component
* 1. Sets isExpanded when preExpanded array changes.
*/
export const AccordionItem = ({ className, children, onClick, preExpanded, uuid }) => {
  const [isExpanded, setIsExpanded] = useState(preExpanded.includes(uuid))

  useEffect(() => { /* 1 */
    setIsExpanded(preExpanded && preExpanded.includes(uuid) ? true : false)
  }, [preExpanded])

  return (
    <AccordionItemContext.Provider value={{ uuid, isExpanded, setIsExpanded }}>
      <div data-accordion-component='AccordionItem' className={className}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export const AccordionItemButton = props => {
  const { ariaCurrent, ariaDescribedBy, className, children, isExpanded,
          onClick, setIsExpanded, uuid } = useItem(props)
  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onClick && onClick()
  }

  return (
    <button data-accordion-component='AccordionItemButton'
      type='button'
      className={className}
      id={`accordion__heading-${uuid}`}
      aria-controls={`accordion__panel-${uuid}`}
      aria-current={ariaCurrent}
      aria-describedby={ariaDescribedBy}
      aria-expanded={isExpanded}
      onClick={handleClick} >
      {children}
      <MaterialIcon icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
    </button>
  )
}

export const AccordionItemHeading = ({ ariaLevel, className, children }) => (
  <div data-accordion-component='AccordionItemHeading'
    aria-level={ariaLevel}
    className={className}
    role='heading' >
    {children}
  </div>
)

export const AccordionItemPanel = props => {
  const { className, children, isExpanded, isGroup, uuid } = useItem(props)
  return (
    <div data-accordion-component='AccordionItemPanel'
      className={className}
      id={`accordion__panel-${uuid}`}
      role={isGroup ? 'group' : undefined}
      aria-labelledby={isGroup ? `accordion__heading-${uuid}` : undefined}
      hidden={!isExpanded} >
      {children}
    </div>
  )
}

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { CheckBoxInput } from '../Inputs'
import classnames from 'classnames'
import { t } from '@lingui/macro'
import './styles.scss'

const ShowHideMore = ({id, isOpen, toggleOpen}) => {
  return (
    <Button
      ariaLabel={t({
        comment: 'Aria label for Show|Hide More Button',
        message: 'Show all values'
      })}
      ariaPressed={isOpen}
      className='facet__show-hide mt-3 pl-0'
      label={
        isOpen
        ? 
        t({
          comment: 'Message shown when list is opened',
          message: 'show less'
        })
        :
        t({
          comment: 'Message shown when list is closed',
          message: 'show all'
        })
      }
      handleClick={() => toggleOpen(isOpen)} />
  )
}

const FacetItem = ({ checked, count, handleChange, label, paramKey }) => (
  <div className='input-group'>
    <CheckBoxInput
      className='checkbox--blue'
      id={label}
      label={`${label} (${count})`}
      checked={checked}
      handleChange={e => handleChange(e, paramKey)} />
  </div>
)

const Facet = ({ children, handleChange, items, paramKey, params, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = isOpen => {
    setIsOpen(!isOpen)
  }
  const facetValues = items ? isOpen ? items : items.slice(0, 5) : []
  const isChecked = key => { return params && params.includes(key) }
  const facetItems = facetValues.map((v) =>
    <FacetItem
      key={v.key}
      label={v.key}
      checked={isChecked(v.key)}
      count={v.doc_count}
      paramKey={paramKey}
      handleChange={handleChange} />
  )
  return (
    facetItems.length || children ?
    (
      <fieldset className='facet pt-44 pb-30 px-40 ml-0'>
        {title && <legend id={title}><h3 className='facet__title p-0 m-0'>{title}</h3></legend>}
        {children && children}
        {facetItems && <div className={classnames('facet__items', {'open': isOpen})}>{facetItems}</div>}
        {items && items.length > 5 && <ShowHideMore id={paramKey} isOpen={isOpen} toggleOpen={toggleOpen} />}
      </fieldset>
    ) : null
  )
}

Facet.propTypes = {
  children: PropTypes.node,
  handleChange: PropTypes.func,
  items: PropTypes.array,
  paramKey: PropTypes.string,
  params: PropTypes.array,
  title: PropTypes.string.isRequired
}

export default Facet

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import {useSelect} from 'downshift'
import MaterialIcon from '../MaterialIcon'
import classnames from 'classnames'
import './styles.scss'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'


const InputLabel = ({className, id, label, required}) => (
  <label htmlFor={id} className={className}>
    {label}{required && ' *'}
  </label>)

InputLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  required: PropTypes.bool
}


export const CheckBoxInput = props => (
  <>
    <input
      type='checkbox'
      className={classnames('checkbox', props.className)}
      id={props.id}
      name={props.name ? props.name : props.id}
      onChange={props.handleChange}
      checked={props.checked}
      value={props.checked}
      required={props.required}
      disabled={props.disabled} />
    <InputLabel {...props} />
  </>
)

CheckBoxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  name: PropTypes.string,
  required: PropTypes.bool
};

CheckBoxInput.defaultProps = {
  checked: true,
}

export const DateInput = ({className, defaultDate, handleChange, helpText, id, label, ...props}) => {
  const [startDate, setStartDate] = useState(defaultDate || new Date())
  
  useEffect(() => {
    handleChange(startDate)
  }, [startDate, setStartDate])
  
  return(
  <>
  <label htmlFor={id}>{label}</label>
  <DatePicker
      className={className || 'dp__wrapper'}
      selected={startDate}
      showTimeSelect='true'
      onChange={(date:Date) => setStartDate(date)}
      dateFormat="yyyy-MM-dd h:mm aa"
      {...props}>
  </DatePicker>
  {helpText && <p className='help-text' aria-describedby={`desc-${id}`}>{helpText}</p>}
  </>
)}

DateInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultDate: PropTypes.instanceOf(Date)
};


export const SelectInput = props => {
  const selectedItem = props.options.find(i => i.value === props.selectedItem)
  const {
    highlightedIndex,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: props.options,
    selectedItem: props.selectedItem,
    onSelectedItemChange: props.onChange,
   })

  return (
    <div className={classnames('select__wrapper', `${props.className}__wrapper`, {'hide-label': props.hideLabel})} required={props.required}>
      <input type='hidden' name={props.name} value={selectedItem && selectedItem.value} />
      <label {...getLabelProps()}>{props.label}</label>
      <button className={classnames('select__control', `${props.className}__control`)} type='button' {...getToggleButtonProps()}>
        {selectedItem && selectedItem.label}
        <MaterialIcon icon={props.iconAfter ? props.iconAfter : 'unfold_more'} />
      </button>
      <ul className={classnames('select__menu', 'm-0', `${props.className}__menu`, {'open': isOpen})} {...getMenuProps()}>
        {isOpen &&
          props.options.map((option, index) => (
            <li className={classnames(
                'select__option',
                `${props.className}__option`,
                {'is-focused': index === highlightedIndex},
                {'is-selected': option === selectedItem}
              )}
              key={index}
              {...getItemProps({ option: option.value, index })} >
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  )
}

SelectInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool
}

export const TextInput = props => (
  <div className={props.className}>
    <InputLabel {...props} />
    <input
      type={props.type}
      id={props.id}
      name={props.id}
      placeholder={props.placeholder}
      minLength={props.minLength}
      maxLength={props.maxLength}
      size={props.size}
      required={props.required}
      onChange={props.handleChange}
      defaultValue={props.defaultValue}
      value={props.value} />
   </div>
)

TextInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['text', 'search']).isRequired,
  value: PropTypes.string
};

TextInput.defaultProps = {
  maxLength: 255,
  size: 10
}

export const YearInput = props => (
  <div className={props.className} >
    <InputLabel {...props} />
    <input
      type='number'
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.name ? props.name : props.id}
      onChange={props.handleChange}
      value={props.value}
      defaultValue={props.defaultValue}
      required={props.required} />
  </div>
)

YearInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

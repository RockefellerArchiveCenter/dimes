import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import {useSelect} from 'downshift'
import MaterialIcon from '../MaterialIcon'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'
import "react-datepicker/dist/react-datepicker.css"
import './styles.scss'


const InputLabel = ({className, id, label, required, showRequiredIndicator = true}) => (
  <label htmlFor={id} className={className}>
    {label}{required && showRequiredIndicator && <>{' '}<Trans comment='Indicates a required form field'>(required)</Trans></>}
  </label>)


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
      aria-describedby={props.ariaDescribedBy}
      disabled={props.disabled} />
    <InputLabel {...props} />
  </>
)

CheckBoxInput.defaultProps = {
  checked: true,
}

export const DateInput = ({ariaDescribedBy, ariaInvalid, className, defaultDate, handleChange, helpText, id, label, required, ...props}) => {
  const [startDate, setStartDate] = useState(defaultDate || new Date())

  useEffect(() => {
    handleChange(startDate)
  }, [startDate, setStartDate])

  const describedBy = [helpText && `desc-${id}`, ariaDescribedBy].filter(Boolean).join(' ') || undefined

  return (
  <div className={classnames('input')}>
    <InputLabel id={id} label={label} required={required} />
    <DatePicker
        ariaDescribedBy={describedBy}
        ariaInvalid={ariaInvalid}
        ariaRequired={required}
        className={className || 'dp__wrapper'}
        selected={startDate}
        showTimeSelect='true'
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd h:mm aa"
        id={id}
        {...props}>
    </DatePicker>
    {helpText && <p className='input__help-text' id={`desc-${id}`}>{helpText}</p>}
  </div>
)}


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
    toggleButtonId: props.id,
   })

  return (
    <div className={classnames('select__wrapper', `select`, `${props.className}__wrapper`, {'hide-label': props.hideLabel})}>
      <input type='hidden' name={props.name} value={selectedItem && selectedItem.value} />
      <label {...getLabelProps()}>{props.label}{props.required && <>{' '}<Trans comment='Indicates a required form field'>(required)</Trans></>}</label>
      <button className={classnames('select__control', `${props.className}__control`)} 
        type='button' {...getToggleButtonProps()} 
        aria-describedby={props.ariaDescribedBy} 
        aria-invalid={props.ariaInvalid} 
        aria-required={props.required}>
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

export const TextInput = props => {
  const maxLength = props.maxLength === undefined ? 255 : props.maxLength
  const size = props.size === undefined ? 10 : props.size
  
  return (
    <div className={classnames('input', props.className)}>
      <InputLabel {...props} />
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={maxLength}
        size={size}
        required={props.required}
        onChange={props.handleChange}
        defaultValue={props.defaultValue}
        value={props.value} />
    </div>
   )
}

TextInput.defaultProps = {
  maxLength: 255,
  size: 10
}

export const YearInput = props => (
  <div className={classnames('input', props.className)}>
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
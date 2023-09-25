import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { t } from '@lingui/macro'
import { I18nApp } from '../../i18n'
import {
  CheckBoxInput,
  DateInput,
  SelectInput,
  TextInput,
  YearInput } from '..'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders checkbox props correctly', () => {
  const handleChange = jest.fn()
  act(() => {
    render(<I18nApp ReactComponent={<CheckBoxInput
      label='Do you want to proceed?'
      id='1' checked
      handleChange={handleChange} />} />, container)
  })

  const input = document.querySelector('[type=checkbox]')
  expect(input.checked).toBe(true)
  expect(input.id).toBe('1')
  expect(input.name).toBe('1')
  const label = document.querySelector('label')
  expect(label.textContent).toBe('Do you want to proceed?')
  expect(label.htmlFor).toBe('1')

  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(handleChange).toHaveBeenCalledTimes(1)
})

it('renders date props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<DateInput label='Select a date' id='1' handleChange={jest.fn()} />} />, container)
  })

  const label = document.querySelector('label')
  expect(label.textContent).toBe('Select a date')
})

it('renders select props correctly', () => {
  const options = [
    {value: '', label: 'select a value'},
    {value: 'foo', label: 'Foo'},
    {value: 'bar', label: 'Bar'}
  ]
  const onChange = jest.fn()

  act(() => {
    render(
      <SelectInput
        className='foo'
        id='1'
        label='Select an option'
        name='bar'
        onChange={onChange}
        options={options} />, container)
  })

  const label = document.querySelector('label')
  expect(label.textContent).toBe('Select an option')
  const hidden = document.querySelector('[type=hidden]')
  expect(hidden.name).toBe('bar')
})

it('renders text input props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<TextInput label='Foo' id='1' type='text' />} />, container)
  })

  const label = document.querySelector('label')
  expect(label.textContent).toBe('Foo')
  const input = document.querySelector('[type=text]')
  expect(input.id).toBe('1')
  expect(input.name).toBe('1')
  expect(input.maxLength).toBe(255)
  expect(input.size).toBe(10)
})

it('renders year input props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<YearInput label='Enter a year' id='1' />} />, container)
  })

  const label = document.querySelector('label')
  expect(label.textContent).toBe('Enter a year')
  const input = document.querySelector('[type=number]')
  expect(input.id).toBe('1')
  expect(input.name).toBe('1')
})

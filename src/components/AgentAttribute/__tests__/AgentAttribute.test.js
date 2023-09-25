import React from 'react'
import { render } from 'react-dom'
import { I18nApp } from '../../i18n'
import AgentAttributeList from '..'

const items = {'Positions Held': 'foo', 'Date of Birth': 'bar', 'Date of Dath': 'baz'}

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<AgentAttributeList items={items} />} />, div)
})

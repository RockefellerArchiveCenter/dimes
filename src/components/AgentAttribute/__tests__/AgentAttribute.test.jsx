import { render } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import AgentAttributeList from '..'

const items = {'Positions Held': 'foo', 'Date of Birth': 'bar', 'Date of Dath': 'baz'}

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AgentAttributeList items={items} />} />)
})

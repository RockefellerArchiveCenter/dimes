import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import SearchForm from '..'

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<SearchForm className='foo' />} />)
  })

  const wrapper = document.querySelector('form > .wrapper > div')
  expect(wrapper.className).toBe('foo')
})

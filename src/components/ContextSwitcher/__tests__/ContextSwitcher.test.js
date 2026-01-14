import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import { t } from '@lingui/macro'
import ContextSwitcher from '..'

it('renders collection content props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ContextSwitcher
      isContentShown={false}
      toggleIsContentShown={jest.fn()} />} />)
  })

  const switcher = document.querySelector('.toggle-wrapper > button')
  expect(switcher.className).toBe('btn btn--lg btn--orange toggle-context mb-0')
  expect(switcher.textContent).toContain(t({
    comment: 'switcher label text content',
    message: 'Collection Content'
  }))
})

it('renders collection details props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<ContextSwitcher
      isContentShown
      toggleIsContentShown={jest.fn()} />} />)
  })

  const switcher = document.querySelector('.toggle-wrapper > button')
  expect(switcher.className).toBe('btn btn--lg btn--orange toggle-context mb-0')
  expect(switcher.textContent).toContain(t({
    comment: 'switcher label text content',
    message: 'Collection Details'
  }))
})

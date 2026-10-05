import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from '..'

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<Accordion />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItem preExpanded={[]} />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItemHeading />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AccordionItemButton />} />)
})

it('handles clicks', () => {
  const onClick = vi.fn()
  const setIsExpanded = vi.fn()

  act(() => {
    render(<I18nApp ReactComponent={<AccordionItemButton setIsExpanded={setIsExpanded} onClick={onClick} />} />)
  })

  const button = document.querySelector('[data-accordion-component=AccordionItemButton]')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(onClick).toHaveBeenCalledTimes(1)
  expect(setIsExpanded).toHaveBeenCalledTimes(1)
})

it('renders a button with accordion attributes', () => {
  render(<I18nApp ReactComponent={<AccordionItemButton uuid='summary' isExpanded={false} />} />)
  const button = document.querySelector('[data-accordion-component=AccordionItemButton]')
  expect(button.tagName).toBe('BUTTON')
  expect(button).toHaveAttribute('type', 'button')
  expect(button).toHaveAttribute('aria-expanded', 'false')
  expect(button).toHaveAttribute('aria-controls', 'accordion__panel-summary')
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<AccordionItemPanel />} />)
})

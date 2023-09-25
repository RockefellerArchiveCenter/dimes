import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { SavedItemList } from '..'
import { t } from '@lingui/macro'
import { resolvedList } from '../../../__fixtures__/resolvedList'
import { I18nApp } from '../../i18n'

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

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<SavedItemList
      items={resolvedList}
      isLoading={false}
      removeFromList={jest.fn()} />} />, container)
  })

  const list = document.querySelector('.saved-items')
  expect(list.children.length).toBe(resolvedList.length)
  const groupTitle = document.querySelector('h2.item-group__title')
  expect(groupTitle.textContent).toBe('Cary Reich papers')
  const itemDescription = document.querySelector('.saved-item')
  expect(itemDescription.querySelector('.saved-item__title').textContent).toBe('Abramovitz, Max')
  expect(itemDescription.querySelector('.saved-item__date').textContent).toBe('1982 September 28')
  // Update once Argo has been updated
  // expect(itemDescription.querySelector(".saved-item__description").textContent).toBe("Abramovitz, Max")
  expect(itemDescription.querySelector('.saved-item__found-in').textContent).toBe(t({
    comment: 'Found In Test',
    message: 'Found in:'
  }) + ' A-B')
  expect(itemDescription).not.toContain('.saved-item__last-requested')
  expect(itemDescription).not.toContain('.btn .btn--blue .btn--sm')

  act(() => {
    render(<I18nApp ReactComponent={<SavedItemList
      items={[]}
      isLoading={false}
      removeFromList={jest.fn()} />} />, container)
  })

  expect(list.textContent).toBe(t({
    comment: 'Empty Saved Items Test',
    message: 'No saved items.'
  }))
})

it('handles clicks', () => {
  const handleClick = jest.fn()

  act(() => {
    render(<I18nApp ReactComponent={<SavedItemList
      items={resolvedList}
      isLoading={false}
      removeFromList={handleClick} />
    } />, container)
  })

  const button = document.querySelector('.btn.btn--gray.btn--sm')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(handleClick).toHaveBeenCalledTimes(1)
})

import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import Facet from '..'

const facetItems = [
  {
    'key': 'documents',
    'doc_count': 605529
  },
  {
    'key': 'photographs',
    'doc_count': 29756
  },
  {
    'key': 'moving image',
    'doc_count': 7181
  },
  {
    'key': 'audio',
    'doc_count': 5722
  }
]

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<Facet handleChange={jest.fn()} title='foo' items={facetItems} />} />, div)
  })

  const title = document.querySelector('legend > h3')
  expect(title.textContent).toBe('foo')
  const list = document.querySelector('.facet > .facet__items')
  expect(list.children.length).toBe(facetItems.length)
})

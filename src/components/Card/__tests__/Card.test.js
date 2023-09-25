import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import CardList from '..'

import { cardItems } from '../../../__fixtures__/cardItems'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<CardList items={cardItems} />} />, div)
  })

  const card = document.querySelector('.card')
  expect(card.querySelector('.card__title').textContent).toBe('Rockefeller Foundation records')
  expect(card.querySelector('.card__type-label').textContent).toBe('archive_box.svgcollection')
  expect(card.querySelector('.card__date').textContent).toBe('1910-2000 (Bulk: 1924-1990), 1924-1990')
})

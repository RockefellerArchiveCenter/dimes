import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { I18nApp } from '../../i18n'
import {
  AgentAttributeSkeleton,
  DetailSkeleton,
  FoundInItemSkeleton,
  MinimapSkeleton,
  RecordsChildSkeleton,
  SearchSkeleton,
  MyListSkeleton
} from '..'

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

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<SearchSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<MyListSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AgentAttributeSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<DetailSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<FoundInItemSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<RecordsChildSkeleton />} />, container)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<MinimapSkeleton totalBoxes={184} />} />, container)
})

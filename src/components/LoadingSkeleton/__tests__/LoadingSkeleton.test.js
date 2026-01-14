import { render } from '@testing-library/react'
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

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<SearchSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<MyListSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<AgentAttributeSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<DetailSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<FoundInItemSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<RecordsChildSkeleton />} />)
})

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<MinimapSkeleton totalBoxes={184} />} />)
})

import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import MyListExportActions from '..'

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={
    <MyListExportActions
      confirmDeleteAll={vi.fn()}
      downloadCsv={vi.fn()}
      emailList={vi.fn()}
    />} 
  />)
})

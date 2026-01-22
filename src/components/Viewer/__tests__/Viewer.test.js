import { render, act } from '@testing-library/react'
import { I18nApp } from '../../i18n'
import Viewer from '..'

it('renders props correctly', () => {
  act(() => {
    render(<I18nApp ReactComponent={<Viewer config={{id: 'foo'}}/>} />)
  })

})

import { render } from '@testing-library/react'
import MyListSidebar from '..'
import { I18nApp } from '../../i18n'

it('renders without crashing', () => {
  render(<I18nApp ReactComponent={<MyListSidebar
    duplicationRequest={jest.fn()}
    readingRoomRequest={jest.fn()}
    sendEmail={jest.fn()} />
  } />)
})

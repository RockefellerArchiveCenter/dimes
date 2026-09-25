import MaterialIcon from '../MaterialIcon'
import Button from '../Button'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

const MyListSidebar = ({ duplicationRequest, readingRoomRequest }) => (
  <div className='mylist__sidebar py-60 pr-0 pl-40 mr--15'>
    <a
      className='btn btn--orange btn--lg'
      href='https://raccess.rockarch.org/aeon.dll?Action=10&Form=94'>
      <MaterialIcon icon='account_balance' className='material-icon--space-after' />
      {t({
        comment: 'Schedule a visit link in Sidebar',
        message: 'Schedule a Visit'
      })}
    </a>
    <Button
      className='btn--orange btn--lg'
      label={t({
        comment: 'Request in Reading Room button in Sidebar',
        message: 'Request in Reading Room'
      })}
      iconBefore='local_library'
      handleClick={() => readingRoomRequest()} />
    <Button
      className='btn--orange btn--lg'
      label={t({
        comment: 'Request copies button in Sidebar',
        message: 'Request Copies'
      })}
      iconBefore='content_copy'
      handleClick={() => duplicationRequest()} />
  </div>)

export default MyListSidebar

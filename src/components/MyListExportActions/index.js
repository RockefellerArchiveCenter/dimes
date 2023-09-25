import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import classnames from 'classnames'
import { select, t } from '@lingui/macro'

const MyListExportActions = ({ confirmDeleteAll, downloadCsv, emailList, isDownloading }) => (
  <div className='mylist__export-actions pb-30'>
    <Button
      className='btn--orange btn--sm'
      label={t({
        comment: 'Email list label',
        message: 'Email List'
      })}
      iconBefore='email'
      handleClick={emailList} />
    <Button
      className={classnames('btn--orange', 'btn--sm', {'loading-dots': isDownloading})}
      label={t({
        comment: 'Downloading label',
        message: select(isDownloading, {
          true: 'Downloading',
          other: 'Download as .CSV'
        })
      })}
      handleClick={downloadCsv}
      disabled={isDownloading} />
    <Button
      className='btn--gray btn--sm'
      label={t({
        comment: 'Remove all items label',
        message: 'Remove All Items'
      })}
      iconBefore='delete'
      handleClick={() => confirmDeleteAll()} />
  </div>)

MyListExportActions.propTypes = {
  confirmDeleteAll: PropTypes.func.isRequired,
  downloadCsv: PropTypes.func.isRequired,
  emailList: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool
}

export default MyListExportActions

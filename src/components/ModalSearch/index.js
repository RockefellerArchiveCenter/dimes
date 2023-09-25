import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Button from '../Button'
import Facet from '../Facet'
import { YearInput } from '../Inputs'
import './styles.scss'
import { Plural, Trans, t } from '@lingui/macro'

export const FacetModal = props => {
  var [startYear, setStartYear] = useState(0)
  var [endYear, setEndYear] = useState(0)

  const toArray = value => {
    if (Array.isArray(value)) {
      return value
    } else {
      return [value]
    }
  }

  /** Sets start and end year values */
  useEffect(() => {
    const startDate = (props.params.start_date__gte ? props.params.start_date__gte : (props.data.min_date && props.data.min_date.value)) || ''
    const endDate = (props.params.end_date__lte ? props.params.end_date__lte : (props.data.max_date && props.data.max_date.value)) || ''
    setStartYear(startDate)
    setEndYear(endDate)
  }, [props.params.start_date__gte, props.params.end_date__lte, props.data.min_date, props.data.max_date])

  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className='modal modal--facet'
      overlayClassName={{
        base: 'modal__overlay slide--right',
        afterOpen: 'slide--right--after-open',
        beforeClose: 'slide--right--before-close'
      }}
      closeTimeoutMS={200} >
      <div className='modal__header modal__header--search pt-30 px-30 pb-20'>
        <h2 className='modal__header-title' aria-live='polite' aria-atomic='true'>
          <Trans comment='Filter results message'>
            <Plural value={props.resultsCount} one="Filter # Search Result" other="Filter # Search Results"/>
          </Trans>
        </h2>
        <Button
          className='btn--blue btn--sm'
          aria-label={t({
            comment: 'Aria label for close.',
            message: 'Close'
          })}
          label={t({
            comment: 'Shown for the user to save and close the filter',
            message:'Save & Close'
          })}
          handleClick={props.toggleModal} />
      </div>
      <div className='modal__body--search'>
        <Facet title={t({
          comment: 'title for Date Range',
          message: 'Date Range'})}>
          <YearInput
            id='startYear'
            label={t({
              comment: 'Label for the start year input',
              message: 'Start Year'})}
            className='hide-label'
            handleChange={e => { setStartYear(e.target.value) }}
            value={startYear} />
          <YearInput
            id='endYear'
            label={t({
              comment: 'Label for the end year input',
              message: 'End Year'})}
            className='hide-label'
            handleChange={e => { setEndYear(e.target.value) }}
            value={endYear} />
          <Button className='btn--sm btn--gray' label={t({ comment: 'Label to apply dates shown from date range', message: 'apply dates' })} handleClick={() => { props.handleDateChange(startYear, endYear) }} />
        </Facet>
        <Facet
          handleChange={props.handleChange}
          items={props.data.format}
          paramKey='genre'
          params={toArray(props.params.genre)}
          title={t({ comment: 'Title for Format filter', message: 'Format' })} />
        <Facet
          handleChange={props.handleChange}
          items={props.data.creator}
          paramKey='creator'
          params={toArray(props.params.creator)}
          title={t({ comment: 'Title for Creator filter', message: 'Creator' })} />
        <Facet
          handleChange={props.handleChange}
          items={props.data.subject}
          paramKey='subject'
          params={toArray(props.params.subject)}
          title={t({ comment: 'Title for Subject filter', message: 'Subject' })} />
      </div>
    </Modal>
  )
}

FacetModal.propTypes = {
  appElement: PropTypes.object,
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  resultsCount: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired
}

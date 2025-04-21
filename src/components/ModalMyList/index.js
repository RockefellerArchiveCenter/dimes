import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import Button from '../Button'
import Modal from 'react-modal'
import Captcha from '../Captcha'
import { FocusError, FormButtons, FormGroup } from '../Form'
import { DateInput, SelectInput } from '../Inputs'
import MaterialIcon from '../MaterialIcon'
import { ModalSavedItemList } from '../ModalSavedItem'
import { getFormattedDate } from '../Helpers'
import './styles.scss'
import { Plural, Trans, select, t } from '@lingui/macro'
import axios from 'axios'
import { addBusinessDays, parse, parseISO, startOfDay, isWithinInterval } from 'date-fns'


const SubmitListInput = ({ submitList }) => {

  const { setFieldValue } = useFormikContext();

  /** Sets value of hidden items input */
  useEffect(() => {
    setFieldValue('items', submitList)
  }, [setFieldValue, submitList])

  return (
    <Field
      type='hidden'
      name={t({
        message: 'items'
      })} />
  )
}


export const ModalToggleListButton = ({ ignoreRestrictions, items, toggleList }) => {

  /** Returns false if any items are unchecked */
  const allSelected = useCallback(
    () => {
      if (ignoreRestrictions) {
        return items.filter(g => g.items.filter(i => !i.isChecked).length).length ? false : true
      } else {
        return items.filter(g => g.items.filter(i => i.submit && !i.isChecked).length).length ? false : true
      }
    },
    [ignoreRestrictions, items]
  )

  const [deselect, setDeselect] = useState(allSelected());

  useEffect(() => {
    setDeselect(allSelected())
  }, [allSelected, items])

  return (
    <Button
      className='btn--sm btn--gray'
      handleClick={() => toggleList(!deselect, ignoreRestrictions)}
      label={t({
        comment: 'Label for item (de)selection',
        message: select(
          deselect, {
            true: 'Deselect all items',
            other: 'Select all items'
          }
        )
      })}
      ariaLabel={t({
        message: select(
          deselect, {
            true: 'Deselect all items',
            other: 'Select all items'
          }
        )
      })}
      ariaPressed={deselect}
      iconBefore={deselect ? 'check_box_outline_blank' : 'check_box'} />
  )
}

/** Calculates total extent of selected items
* Only checked items are included in this calculation. A default of '1 item' is
* provided for items with no extents (which usually means no instance).
*/
export const SelectedTotals = ({ items }) => {
  const selectedExtents = items.map(
    g => g.items.filter(i => i.isChecked).map(
      i => i.extents ? i.extents: {'type': 'item', 'value': 1} )).flat(2)
  const totals = selectedExtents.reduce((total, current) => (
    total[current.type] ?
      {...total, [current.type]: total[current.type] + parseFloat(current.value)} :
      {...total, [current.type]: parseFloat(current.value)}
  ), {})
  const extents = Object.entries(totals).map(e => pluralize(e[0], e[1], true))
  return <p className='selected-totals mt-10'><Trans comment='Message returned dependent on how many items selected' ><Plural value={extents.length} _0="selected: 0 items" other={`selected: ${extents.join(', ')}`} /></Trans></p>
}


export const ModalMyList = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal'
    overlayClassName='modal__overlay'>
    <div className='modal__header'>
      <h2 className='modal__header-title'>{props.title}</h2>
      <button className='modal__header-button' aria-label={t({ message: 'Close' })} onClick={props.toggleModal}>
        <MaterialIcon icon='close'/>
      </button>
    </div>
    {props.list.every(listGroup => (listGroup.items.every(item => item.submit !== undefined))) ? (
    <div className='modal__body p-0'>
      <div className='modal-list py-30 px-20'>
        <ModalToggleListButton
          ignoreRestrictions={props.ignoreRestrictions}
          items={props.list}
          toggleList={props.toggleList} />
        <SelectedTotals items={props.list} />
        <ModalSavedItemList
          ignoreRestrictions={props.ignoreRestrictions}
          items={props.list}
          handleChange={props.handleChange} />
        <SelectedTotals items={props.list} />
        <ModalToggleListButton
          ignoreRestrictions={props.ignoreRestrictions}
          items={props.list}
          toggleList={props.toggleList} />
      </div>
      <div className='modal-form pt-30 px-20 pb-18'>
        {props.form}
      </div>
    </div>) :
    (<div className='modal__body'>
      <p className='loading-dots modal-loading__text'>
        <Trans comment='Message while MyList modal loads items'>Preparing items</Trans>
      </p>
    </div>)}
  </Modal>
)

ModalMyList.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

ModalMyList.defaultProps = {
  ignoreRestrictions: false,
}


export const EmailModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title='Email List'
    handleChange={props.handleChange}
    ignoreRestrictions={true}
    isOpen={props.isOpen}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <>
        <div className='mb-20'>
            <Trans comment='Note to user about including name and email address'>
              <strong>Please note:</strong> if are emailing your list to an archivist at <a href={t({message: 'mailto:archive@rockarch.org'})}>archive@rockarch.org</a>, please include your name and email address in the Message field, otherwise we will have no means of contacting you to follow-up.
            </Trans>
          </div>
        <Formik
          initialValues={{email: '', subject: '', message: '', items: props.submitList, recaptcha: ''}}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = t({
                comment: 'Missing email address error',
                message: 'An email address is required.'
              });
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = t({
                comment: 'Invalid email error',
                message: 'Invalid email address provided.'
              });
            }
            if (!values.recaptcha) errors.recaptcha = t({
              comment: 'Captcha not completed error',
              message: 'Please complete this field.'
            });
            if (!values.items.length) errors.items = t({
              comment: 'No selected items error',
              message: 'No items have been selected to submit.'
            })
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.toggleModal()
            props.handleFormSubmit(
              `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/email`,
              values);
            setSubmitting(false);
          }}
        >
        {({ errors, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <SubmitListInput submitList={props.submitList} />
            <ErrorMessage
              id='items-error'
                name={t({
                  comment: 'Name of items error message',
                  message: 'items'
                })}
              component='div'
              className='input__error' />
            <FormGroup
              label={t({
                comment: 'Label of Email Form',
                message: 'Email *'
              })}
              name={t({
                comment: 'Name of email form',
                message: 'email'
              })}
              type='email'
              required={true}
              errors={errors}
              touched={touched} />
            <FormGroup
              label={t({
                comment: 'Label of Subject Form',
                message: 'Subject'
              })}
              name={t({
                comment: 'Name of subject form',
                message: 'subject'
              })}
              type='text' />
            <FormGroup
              label={t({
                comment: 'Label of Message Form',
                message: 'Message'
              })}
              name={t({
                comment: 'Name of message form',
                message: 'message'
              })}
              component='textarea'
              rows={5} />
            <div className='form-group mx-0'>
              <Field
                component={Captcha}
                name={t({
                  comment: 'Name of recaptcha element',
                  message: 'recaptcha'
                })}
                handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
              <ErrorMessage
                id='recaptcha-error'
                name={t({
                  comment: 'Name of recaptcha error message',
                  message: 'recaptcha'
                })}
                component='div'
                className='input__error' />
            </div>
            <FormButtons
              submitText={t({
                comment: 'Send List sumbit message',
                message: 'Send List'
              })}
              toggleModal={props.toggleModal}
              isSubmitting={isSubmitting} />
            <FocusError />
          </Form>
        )}
        </Formik>
      </>
    }
  />
)

EmailModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

const ReadingRoomSelect = ({ readingRooms }) => {
  const { setFieldValue } = useFormikContext();
  const [site, setSite] = useState('');

  const ReadingRoomLocations = readingRooms.map(readingRoom => ({
    value: readingRoom.sites[0],
    label: readingRoom.name,
  }));
  ReadingRoomLocations.unshift({
    value: "",
    label: t({message: "Please select a reading room"}),
  });

  useEffect(() => {
    setFieldValue('site', site);
  }, [site, setFieldValue]);

  return (
    <div className='form-group'>
      <SelectInput
        className='select__modal'
        id='site'
        label={t({message: 'Select Reading Room Location'})}
        name='site'
        onChange={({ selectedItem }) => setSite(selectedItem.value)}
        options={ReadingRoomLocations}
        required={true}
        selectedItem={site || ''} />
      <ErrorMessage
        id='site-error'
        name='site'
        component='div'
        className='modal-form__error' />
    </div>
  )
}

const ReadingRoomDateInput = ({ readingRoom }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className='form-group'>
      <Field
        component={DateInput}
        handleChange={date => setFieldValue('scheduledDate', date)}
        helpText={t({
          comment: 'Helptext for scheduling date.',
          message: 'Enter the date of your research visit (mm/dd/yyyy)'
        })}
        id='scheduledDate'
        label={t({
          comment: 'Label for scheduling date',
          message: 'Scheduled Date *'
        })}
        type='date'
        defaultDate={addBusinessDays(new Date(), readingRoom?.policies[0]?.appointmentMinLeadDays || 1)}
        minDate={addBusinessDays(new Date(), readingRoom?.policies[0]?.appointmentMinLeadDays || 1)}
        filterDate={!!process.env.REACT_APP_ENABLE_READING_ROOM_SELECT ? date => readingRoom?.openHours.some(x => x.dayOfWeek === date.getDay()) : null}
        filterTime={!!process.env.REACT_APP_ENABLE_READING_ROOM_SELECT ? date => {
          if (readingRoom === undefined) return false;
          const hours = readingRoom.openHours.find(x => x.dayOfWeek === date.getDay());
          return isWithinInterval(date, {
            start: parse(hours.openTime, "HH:mm:ss", date),
            end: parse(hours.closeTime, "HH:mm:ss", date),
          });
        } : null}
        excludeDateIntervals={readingRoom?.closures.map(closure => ({
          start: startOfDay(parseISO(closure.startDate)),
          end: startOfDay(parseISO(closure.endDate)),
        }))} />
      <ErrorMessage
        id='scheduledDate-error'
        name='scheduledDate'
        component='div'
        className='modal-form__error' />
    </div>
  )
}

export const ReadingRoomRequestModal = props => { 
  const [aeonReadingRooms, setAeonReadingRooms] = useState([]);

  useEffect(() => {
    if (!!process.env.REACT_APP_ENABLE_READING_ROOM_SELECT) {
      axios.get(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/reading-rooms`).then(response => {
        setAeonReadingRooms(response.data);
      });
    }
  }, []); // empty deps array means it runs once

  return (
  <ModalMyList
    appElement={props.appElement}
    title='Request in Reading Room'
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        initialValues={{scheduledDate: new Date(), questions: '', notes: '', items: props.submitList, recaptcha: ''}}
        validate={values => {
          const errors = {};
          if (!values.scheduledDate) errors.scheduledDate = t({
            comment: 'Missing Scheduled Date error',
            message: 'Please provide the date of your research visit.'
          });
          if (!!process.env.REACT_APP_ENABLE_READING_ROOM_SELECT && !values.site) errors.site = t({
            message: 'Please select a location of a reading room.'
          })
          if (!values.recaptcha) errors.recaptcha = t({
            message: 'Please complete this field.'
          });
          if (!values.items.length) errors.items = t({
            message: 'No items have been selected to submit.'
          })
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.toggleModal()
          /* In order for Aeon to accept requests, dates need to be formatted as MM/DD/YYYY */
          values.scheduledDate = getFormattedDate(values.scheduledDate)
          props.handleFormSubmit(
            `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/reading-room`,
            values);
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched, values }) => (
        <Form>
          <SubmitListInput submitList={props.submitList} />
          <ErrorMessage
            id='items-error'
            name='items'
            component='div'
            className='input__error' />
          {!!process.env.REACT_APP_ENABLE_READING_ROOM_SELECT && <ReadingRoomSelect readingRooms={aeonReadingRooms} />}
          <ReadingRoomDateInput
            readingRoom={aeonReadingRooms.find(room => room.sites[0] === values.site)} />
          <FormGroup
            label={t({
              comment: 'Label for RAC staff message Form',
              message: 'Message for RAC staff'
            })}
            helpText={t({
              comment: 'helptext for RAC staff message',
              message: '255 characters maximum'
            })}
            name='questions'
            maxLength={255}
            component='textarea'
            rows={5} />
          <div className='form-group mx-0'>
            <Field
              component={Captcha}
              name='recaptcha'
              handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
            <ErrorMessage
              id='recaptcha-error'
              name='recaptcha'
              component='div'
              className='input__error' />
          </div>
          <FormButtons
              submitText={t({
                comment: 'Text for submiting item(s) request',
                message: select(
                  props.submitList.length !== 1, {
                    true: `Request ${props.submitList.length} Items`,
                    other: `Request ${props.submitList.length} Item`
                  }
                )
              })}
            toggleModal={props.toggleModal}
            isSubmitting={isSubmitting} />
          <FocusError />
        </Form>
      )}
      </Formik>
    }
  />
)}

ReadingRoomRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}


export const DuplicationRequestModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title='Request Copies'
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <>
        <div className='mb-20'>
          <Trans comment='Limitations and fees title'>
            <h3 className='mt-0'>Limitations and fees</h3>
          </Trans>
          <Trans comment='Limitations and fees information'>
            <div className='mb-20'>
              We limit users to <strong>20 requests per calendar year</strong>.
            </div>
            <div className='mb-20'>
              We do not charge for reference PDFs. There is a <strong>$25 flat fee per item</strong> for publication-quality scans.
            </div>
            <div className='mb-20'>
              For more details, including exceptions for audiovisual and oversized materials, read about our 
              <a target='_blank'
                  rel='noopener noreferrer'
                    title={t({
                      comment: 'Title for duplication services link',
                      message: 'opens in a new window'
                    })}
                    href={t({
                      comment: 'Link for duplication request services',
                      message: 'https://rockarch.org/collections/access-and-request-materials/#duplication-services'
                    })}>
                  duplication services
                </a>.
            </div>
            <div>
              For help or to request a publication-quality scan, email an archivist at 
              <a href={t({message: 'mailto:archive@rockarch.org'})}>archive@rockarch.org</a>.
            </div>
          </Trans>
        </div>
        <Trans comment='Submit Request title'>
          <h3 className='mt-0'>Submit request</h3>
        </Trans>
        <Formik
          initialValues={{
            costs: false,
            items: props.submitList,
            recaptcha: ''}}
          validate={values => {
            const errors = {};
            if (!values.recaptcha) errors.recaptcha = t({
              message: 'Please complete this field.'
            });
            if (!values.costs) errors.costs = t({
              comment: 'Costs not agreed to error',
              message: 'We cannot process your request unless you agree to pay the costs of reproduction.'
            });
            if (!values.items.length) errors.items = t({
              message: 'No items have been selected to submit.'
            })
            if (!!process.env.REACT_APP_DUPLICATION_REQUEST_LIMIT & values.items.length > Number(process.env.REACT_APP_DUPLICATION_REQUEST_LIMIT)) errors.items = t({
              message: `Please limit your request to ${process.env.REACT_APP_DUPLICATION_REQUEST_LIMIT} items.`
            })
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.toggleModal()
            props.handleFormSubmit(
              `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/duplication`,
              values);
            setSubmitting(false);
          }}
        >
        {({ errors, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <SubmitListInput submitList={props.submitList} />
            <ErrorMessage
              id='items-error'
              name='items'
              component='div'
              className='input__error' />
            <FormGroup
              label={
              <Trans comment='Label for duplication request form'>
                I understand that I may need to work with an archivist to identify the resources most 
                relevant to my research, and that, in some cases, it is not possible to digitize material 
                due to its extent or physical condition. 
              </Trans>}
              name='costs'
              type='checkbox'
              required={true}
              errors={errors}
              touched={touched} />
            <div className='form-group mx-0'>
              <Field
                component={Captcha}
                  name={t({
                    message: 'recaptcha'
                  })}
                handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
              <ErrorMessage
                id='captcha-error'
                name='recaptcha'
                component='div'
                className='input__error' />
            </div>
            <FormButtons
              submitText={t({
                message: select(
                  props.submitList.length !== 1, {
                    true: `Request ${props.submitList.length} Items`,
                    other: `Request ${props.submitList.length} Item`
                  }
                )
              })}
              toggleModal={props.toggleModal}
              isSubmitting={isSubmitting} />
            <FocusError />
          </Form>
        )}
        </Formik>
      </>
    }
  />
)

DuplicationRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

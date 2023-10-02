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
import { addBusinessDays, parse, parseISO, startOfDay, isWithinInterval } from 'date-fns'
import './styles.scss'
import axios from 'axios'
import { Plural, Trans, select, t } from '@lingui/macro'


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


const FormatSelectInput = () => {
  const { setFieldValue } = useFormikContext();
  const [format, setFormat] = useState('')

  const formatOptions = [
    {
      value: '', label: t({
        comment: 'label for selecting format labels',
        message: 'Select a format'
      })
    },
    {
      value: 'MP3', label: t({
        comment: 'Label for MP3',
        message: 'Audio (MP3)'
      })
    },
    {value: 'JPEG', label: 'JPEG'},
    {
      value: 'MP4', label: t({
        comment: 'Label for MP4',
        message: 'Moving image (MP4)'
      })
    },
    {value: 'PDF', label: 'PDF'},
    {value: 'TIFF', label: 'TIFF'}
  ]

  useEffect(() => {
    setFieldValue('format', format)
  }, [format, setFieldValue])

  return (
    <div className='form-group mx-0'>
      <SelectInput
        className='select__modal'
        id='format'
        label={t({
          comment: 'Label for format input',
          message: 'Format'
        })}
        name={t({
          comment: 'Name for format input',
          message: 'format'
        })}
        onChange={({selectedItem}) => setFormat(selectedItem.value)}
        options={formatOptions}
        required={true}
        selectedItem={format || ''} />
      <ErrorMessage
        id='format-error'
        name={t({ message: 'format' })}
        component='div'
        className='input__error' />
    </div>
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
    label: "Please select a reading room",
  });

  useEffect(() => {
    setFieldValue('site', site);
  }, [site, setFieldValue]);

  return (
    <div className='form-group'>
      <SelectInput
        className='select__modal'
        id='site'
        label='Select Reading Room Location'
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
        // TODO: this handleChange alters the UI, but not the form submission ?!
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
        defaultDate={addBusinessDays(new Date(), 2)}
        minDate={addBusinessDays(new Date(), readingRoom?.policies[0]?.appointmentMinLeadDays ?? 1)}
        filterDate={date => readingRoom?.openHours.some(x => x.dayOfWeek === date.getDay())}
        filterTime={date => {
          if (readingRoom === undefined) return false;
          const hours = readingRoom.openHours.find(x => x.dayOfWeek === date.getDay());
          return isWithinInterval(date, {
            start: parse(hours.openTime, "HH:mm:ss", date),
            end: parse(hours.closeTime, "HH:mm:ss", date),
          });
        }}
        excludeDateIntervals={readingRoom?.closures.map(closure => ({
          start: startOfDay(parseISO(closure.startDate)),
          end: startOfDay(parseISO(closure.endDate)),
        }))} />
      <ErrorMessage
        id='scheduledDate-error'
        name={t({
          comment: 'Name for scheduling date error',
          message: 'scheduledDate'
        })}
        component='div'
        className='modal-form__error' />
    </div>
  )
}

export const ReadingRoomRequestModal = props => {
  const [aeonReadingRooms, setAeonReadingRooms] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/reading-rooms`).then(response => {
      setAeonReadingRooms(response.data);
    });
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
      form={<Formik
        initialValues={{ scheduledDate: new Date(), questions: '', notes: '', readingRoomID: '', site: '', items: props.submitList, recaptcha: '' }}
        validate={values => {
          const errors = {};
          if (!values.scheduledDate) errors.scheduledDate = t({
            comment: 'Missing Scheduled Date error',
            message: 'Please provide the date of your research visit.'
          });
          if (!values.site) errors.site = t({
            comment: 'No Reading Room Selected error',
            message: 'Please select a location of a reading room.'
          });
          if (!values.recaptcha) errors.recaptcha = t({
            message: 'Please complete this field.'
          });
          if (!values.items.length) errors.items = t({
            message: 'No items have been selected to submit.'
          })
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.toggleModal();
          /* In order for Aeon to accept requests, dates need to be formatted as MM/DD/YYYY */
          values.scheduledDate = getFormattedDate(values.scheduledDate);
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
              name={t({
                message: 'items'
              })}
              component='div'
              className='modal-form__error' />
            <ReadingRoomSelect readingRooms={aeonReadingRooms} />
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
              name={t({
                comment: 'Name for RAC staff message Form',
                message: 'questions'
              })}
              maxLength={255}
              component='textarea'
              rows={5} />
            <div className='form-group'>
              <Field
                component={Captcha}
                name={t({
                  message: 'recaptcha'
                })}
                handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
              <ErrorMessage
                id='recaptcha-error'
                name={t({
                  message: 'recaptcha'
                })}
                component='div'
                className='modal-form__error' />
            </div>
            <FormButtons
              submitText={`Request ${props.submitList.length ? (props.submitList.length) : '0'} ${props.submitList.length !== 1 ? 'Items' : 'Item'}`}
              toggleModal={props.toggleModal}
              isSubmitting={isSubmitting} />
            <FocusError />
          </Form>
        )}
      </Formik>} />
  )
}

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
          <Trans comment='Note to user about a cost estimate'>
            <strong>Please note:</strong> if you want a cost estimate for your order, email an archivist at <a href={t({message: 'mailto:archive@rockarch.org'})}>archive@rockarch.org</a>.
          </Trans>
        </div>
        <Formik
          initialValues={{
            format: '',
            description: t({
              comment: 'Initial description',
              message: 'Entire folder'
            }),
            questions: '',
            notes: '',
            costs: false,
            items: props.submitList,
            recaptcha: ''}}
          validate={values => {
            const errors = {};
            if (!values.format) errors.format = t({
              comment: 'No Format selected error',
              message: 'Please select your desired duplication format.'
            });
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
                name={t({
                  message: 'items'
                })}
              component='div'
              className='input__error' />
            <FormatSelectInput />
            <FormGroup
                label={t({
                  comment: 'Label for Description of Materials Form',
                  message: 'Description of Materials'
                })}
                helpText={t({
                  comment: 'Helptext for description of materials Form',
                  message: 'Please describe the materials you want reproduced. 255 characters maximum.'
                })}
                name={t({
                  message: 'description'
                })}
              maxLength={255}
              component='textarea'
              rows={5} />
            <FormGroup
                label={t({
                  message: 'Message for RAC staff'
                })}
                helpText={t({
                  comment: 'Helptext for RAC staff message',
                  message: '255 characters maximum.'
                })}
              maxLength={255}
                name={t({
                  message: 'questions'
                })}
              component='textarea'
              rows={5} />
            <FormGroup
              label={<Trans comment='Label for duplicate request form'>
                I agree to pay the duplication costs for this request. See our&nbsp;
                <a target='_blank'
                  rel='noopener noreferrer'
                    title={t({
                      comment: 'Title for duplicate request',
                      message: 'opens in a new window'
                    })}
                    href={t({
                      comment: 'Link for duplicate request services',
                      message: 'https://rockarch.org/collections/access-and-request-materials/#duplication-services-and-fee-schedule'
                    })}>
                  fee schedule
                </a>.</Trans>}
                name={t({
                  comment: 'Name for duplicate request form costs',
                  message: 'costs'
                })}
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
                  name={t({
                    message: 'recaptcha'
                  })}
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

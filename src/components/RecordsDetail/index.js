import React, { useEffect, useState } from 'react'
import { LiveMessage } from 'react-aria-live'
import pluralize from 'pluralize'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from '../Accordion'
import Button from '../Button'
import ListToggleButton from '../ListToggleButton'
import MaterialIcon from '../MaterialIcon'
import QueryHighlighter from '../QueryHighlighter'
import { Trans, t } from '@lingui/macro'
import { DetailSkeleton, FoundInItemSkeleton } from '../LoadingSkeleton'
import { appendParams, dateString, hasAccessOrUse, noteText, noteTextByType } from '../Helpers'
import { isItemSaved } from '../MyListHelpers'
import './styles.scss'

const flattenObject = (obj, flattened = []) => {
  flattened.push(obj.title);
  if (obj.child) {
    flattenObject(obj.child, flattened)
  }
  return flattened
}

const FoundInItem = ({ className, item, params, topLevel }) => (
  <>
    <li className={className}>
      <MaterialIcon icon={topLevel ? 'archive_box' : 'subdirectory_arrow_right'} />
      <a className='found-in__link' href={appendParams(item.uri, params)}>{item.title}</a>
    </li>
    {item.child ?
      (<FoundInItem
        item={item.child}
        className='found-in__subcollection'
        params={params} />) :
      (null)}
  </>
)

const PanelExtentSection = ({ extents }) => (
  extents ? (
  <div className='mr-15'>
    <h3 className='panel__heading mt-10 mb-5'><Trans comment='Panel Extent Size message'>Size</Trans></h3>
    <ul className='panel__list--unstyled pl-0 mt-0'>
      {extents.map((e, index) => {
        const extentArray = e.type.replace('_', ' ').split(' ').map((ext, i, arr) => (
          arr.length - 1 === i ? pluralize(ext, e.value) : ext
        ))
        return (
      <li key={index} className='panel__text'>{`${e.value} ${extentArray.join(' ')}`}</li>)})}
    </ul>
  </div>) :
  (null)
)

const PanelFormatSection = ({ formats, notes }) => {
  const displayFormats = formats.filter(f => f !== 'documents')
  var formatText = []
  formatText.push(noteTextByType(notes, "physdesc"))
  formatText.push(noteTextByType(notes, "materialspec"))
  const filteredFormatText = formatText.filter(i => i != null).filter(i => i !== '')
  return (
    displayFormats.length ? (
      <div className='mr-15'>
        <h3 className='panel__heading mt-10 mb-5'><Trans comment='Panel Format message'>Formats</Trans></h3>
        <ul className='panel__list--unstyled pl-0 mt-0'>
          {filteredFormatText.length ?
            (<li className='panel__text'>{filteredFormatText.join('\n')}</li>) :
            (displayFormats.map((format, index) => (
              <li key={index} className='panel__text'>{format}</li>))
            )
          }
        </ul>
      </div>) :
    (null)
  )
}

const PanelFoundInSection = ({ ancestors, isItemLoading, params }) => (
  ancestors.title ?
    (<div className='mr-15'>
      <h3 className='panel__heading mt-10 mb-5'><Trans comment='Panel Found In message'>Found In</Trans></h3>
      <ul className='found-in list--unstyled mt-0'>
      {isItemLoading ?
        (<FoundInItemSkeleton/>) :
        (<FoundInItem
            item={ancestors}
            className='found-in__collection'
            params={params}
            topLevel={true} />)}
      </ul>
    </div>) :
    (null)
)

const PanelLinkedListSection = ({ listData, params, title }) =>  (
  listData ?
    (<div className='mr-15'>
      <h3 className='panel__heading mt-10 mb-5'>{title}</h3>
      <ul className='panel__list--unstyled pl-0 mt-0'>
        {listData.map((item, index) => (
        <li key={index} className='panel__text'><a href={appendParams(item.uri, params)}>{item.title}</a></li>))}
      </ul>
    </div>) :
    (null)
)

const PanelListSection = ({ listData, title }) =>  (
  listData ?
    (<div className='mr-15'>
      <h3 className='panel__heading mt-10 mb-5'>{title}</h3>
      <ul className='panel__list--unstyled pl-0 mt-0'>
        {listData.map((item, index) => (
        <li key={index} className='panel__text'>{item.title}</li>))}
      </ul>
    </div>) :
    (null)
)

const PanelTextSection = ({ params, text, title }) => {
  const parsedQuery = params && params.query ? (params.query) : ('')
  return (
  text ?
    (<div className='mr-15'>
      <h3 className='panel__heading mt-10 mb-5'>{title}</h3>
      <p className='panel__text--narrative'>
        <QueryHighlighter query={parsedQuery} text={text} />
      </p>
    </div>) :
    (null)
)}

const RecordsDetail = props => {

  var [isSaved, setIsSaved] = useState(() => {
    return !props.isItemLoading && isItemSaved(props.item)
  })

  var [citationCopied, setCitationCopied] = useState(false)

  /** Set isSaved in state after item finishes loading */
  useEffect(() => {
    const saved = !props.isItemLoading && isItemSaved(props.item)
    setIsSaved(saved)
  }, [props.isItemLoading, props.item, props.myListCount])

  /** Constructs the URL for the 'Back to Search' button */
  const searchUrl = (
    props.params && props.params.query ? appendParams('/search/', props.params) : '/'
  )
  
  /** Parses an item's identifier from its URI */
  const identifier = (
    props.item.uri && props.item.uri.split('/')[props.item.uri.split('/').length - 1]
  )

  /** Returns a citation string */
  const dates = props.item.dates && props.item.dates.map(d => d.expression).join(', ')
  const citation = (
    [...new Set([props.item.title, dates])]
      .concat(flattenObject(props.ancestors))
      .concat(t({ comment: 'Institution name for citation', message: 'Rockefeller Archive Center' }))
      .concat(window.location.origin + window.location.pathname)
      .filter(n => n)
      .join('; ')
  )

  const handleCitationButtonClick = () => {
    setCitationCopied(true)
    setTimeout(() => {setCitationCopied(false)}, '6000')
  }

  const [SearchMessage, setSearchMessage] = useState('')
  const [refinedVal, setRefinedVal] = useState({
    query: new URLSearchParams(window.location.search).get('query') || '',
    category: new URLSearchParams(window.location.search).get('category') || '',
    limit: new URLSearchParams(window.location.search).get('limit') || '40',
  });
  
  const handleChange = (e) => {
    setRefinedVal({ ...refinedVal, [e.target.name]: e.target.value });
    setSearchMessage(t({
      comment: 'Message for search refinement',
      message: `Map navigation links have been updated to reflect new search results for ${refinedVal.query}`
    }));
  };

  return (
  <div className={classnames('records__detail', {'hidden': props.isContentShown})}>
    {props.isDesktop ? <Button
      type='button'
      className='btn--sm btn--transparent btn--minimap-info mt-22 mr-0 p-0'
      handleClick={props.toggleMinimapModal}
      iconAfter='info'
      label={t({ comment: 'About minimap message', message: 'about minimap' })}
    /> : null
    }
    { process.env.REACT_APP_REFINE_SEARCH && 
      process.env.REACT_APP_REFINE_SEARCH.toLowerCase() === 'true' ?
      ( <div>
        <form className='refine-search__form' >
        <input type='hidden' name='category' value={props.params.category} />
        <input type='hidden' name='limit' value={props.params.limit || '40'}/>
        <Trans comment='Label for search refinement textbox'>
            <label htmlFor='query' className='refine-search__label'>Refining Search...</label>
        </Trans>
        <input 
          className='refine-search__input'
          type='search' 
          name='query'
          placeholder={props.params.query} 
          value={refinedVal.query}
          onChange={handleChange}/>
        <Button
          className='btn btn--orange refine-search__btn'
          type='submit'
          iconAfter='search'
          ariaLabel={t({
            comment: 'Aria Label for search submission button',
            message: 'Submit search'
          })}
        />
        </form> 
        <LiveMessage message={SearchMessage} aria-live='polite' />
      </div>
      ) : null 
    }
    <nav className='records__nav'>
      <a href={searchUrl} className='btn btn--sm btn--gray'>
        <Trans comment='Message to go back to previous search'>  
          <MaterialIcon icon='keyboard_arrow_left' className='material-icon--space-after'/>Back to Search
        </Trans>
      </a>
    </nav>
    <h1 className='records__title'>{props.isItemLoading ? <Skeleton /> : props.item.title }</h1>
    {props.item.type === 'object' &&
      <>
      <ListToggleButton
        className='btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
        isSaved={isSaved}
        item={props.item}
        toggleSaved={props.toggleInList} />
      
        <div className='tooltip__wrapper btn--detail'>
        {citationCopied ? 
          (<Trans comment='Confirmation message when citation copied'>
              <div className='tooltip tooltip--top' role='alert'>
                Citation information copied to clipboard.
              </div>
            </Trans>) : 
        null }
        <Trans comment='Button to copy citation text'>
        <button className='btn btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
          onClick={() => {navigator.clipboard.writeText(citation); handleCitationButtonClick()}}>
          Cite<MaterialIcon icon='edit' className='material-icon--space-before'/>
        </button>
        </Trans>
      </div>
      {props.item.online &&
        <Trans comment='Buttons for online records'>
        <a className='btn btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
          href={`${props.item.uri}/view`}>View Online<MaterialIcon icon='visibility' className='material-icon--space-before'/></a>
        <a className='btn btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
          href={`${process.env.REACT_APP_S3_BASEURL}/pdfs/${identifier}`}
          target='_blank'
          title={t({ comment: 'Title message for opening an online item', message: 'opens in a new window' })}
          rel='noopener noreferrer'
          >Download <MaterialIcon icon='get_app' className='material-icon--space-before' /></a>
          { props.downloadSize ?
            <p className='panel__text'>{`Acrobat PDF, ${props.downloadSize}`}</p> :
            <p className='panel__text'><Skeleton/></p> }
        </Trans>
      }
      </>
    }
    <Accordion className='accordion mt-20' preExpanded={['summary']} allowZeroExpanded={true}>
      <AccordionItem className='accordion__item' uuid='summary'>
        <AccordionItemHeading ariaLevel={2}>
          <AccordionItemButton className='accordion__button py-12 px-0'>Summary</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className='accordion__panel'>
          {props.isItemLoading ?
            (<DetailSkeleton />) :
            (<>
              <div className='panel__section--flex'>
                <PanelLinkedListSection
                  title='Creators'
                  params={props.params}
                  listData={props.item.creators} />
                <PanelTextSection
                  title='Dates'
                  text={dateString(props.item.dates)} />
                { (props.item.extents && props.item.extents[0].value) ?
                  (<PanelExtentSection
                    extents={props.item.extents} /> ) :
                    (null)
                }
                <PanelFormatSection
                  formats={props.item.formats}
                  notes={props.item.notes} />
              </div>
              <PanelFoundInSection
                ancestors={props.ancestors}
                isItemLoading={props.isAncestorsLoading}
                params={props.params} />
              <PanelTextSection
                params={props.params}
                title='Description'
                text={props.item.description} />
              <PanelTextSection
                params={props.params}
                title='Biographical/Historical Note'
                text={noteTextByType(props.item.notes, 'bioghist')} />
              { props.item.notes && props.item.notes.filter(n => n.type === 'odd').map(n => (
                <PanelTextSection
                params={props.params}
                title={n.title}
                text={noteText(n)}
                />
              ))}
              { noteTextByType(props.item.notes, 'processinfo') ?
                (<PanelTextSection
                  params={props.params}
                  title='Processing Information'
                  text={noteTextByType(props.item.notes, 'processinfo')} />) :
                (null)
              }
                <PanelTextSection
                  title='Immediate Source of Acquisition'
                  text={noteTextByType(props.item.notes, 'acqinfo')} />
                <PanelTextSection
                  title='Custodial History'
                  text={noteTextByType(props.item.notes, 'custodhist')} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessOrUse(props.item.notes) ?
        (<AccordionItem className='accordion__item' uuid='accessAndUse'>
          <AccordionItemHeading ariaLevel={2}>
            <AccordionItemButton className='accordion__button py-12 px-0'>Access and Use</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className='accordion__panel'>
            <PanelTextSection
              title='Access'
              text={noteTextByType(props.item.notes, 'accessrestrict')} />
            <PanelTextSection
              title='Reproduction and Duplication'
              text={noteTextByType(props.item.notes, 'userestrict')} />
            <PanelTextSection
              title='Technical Access'
              text={noteTextByType(props.item.notes, 'phystech')} />
            <PanelTextSection
              title='Existence and Location of Copies'
              text={noteTextByType(props.item.notes, 'altformavail')} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { props.item.terms && props.item.terms.length ?
        (<AccordionItem className='accordion__item' uuid='relatedTerms'>
            <AccordionItemHeading ariaLevel={2}>
              <AccordionItemButton className='accordion__button py-12 px-0'>Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion__panel'>
              <PanelListSection
                title='Subjects'
                listData={props.item.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
)}

RecordsDetail.propTypes = {
  ancestors: PropTypes.object.isRequired,
  downloadSize: PropTypes.string,
  isAncestorsLoading: PropTypes.bool.isRequired,
  isContentShown: PropTypes.bool,
  isItemLoading: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  myListCount: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
  toggleMinimapModal: PropTypes.func.isRequired,
}

export default RecordsDetail;

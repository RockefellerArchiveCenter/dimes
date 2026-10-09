import { useEffect, useState } from 'react'
import pluralize from 'pluralize'
import classnames from 'classnames'
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
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { DetailSkeleton, FoundInItemSkeleton } from '../LoadingSkeleton'
import { buildHref, DESCR_LANG, dateString, hasAccessOrUse, noteText, noteTextByType } from '../Helpers'
import { isItemSaved } from '../MyListHelpers'
import './styles.scss'

const FoundInItem = ({ className, item, params, topLevel }) => (
  <>
    <li className={className}>
      <MaterialIcon icon={topLevel ? 'inventory2' : 'subdirectory_arrow_right'} />
      <a className='found-in__link' href={buildHref(item.uri, params)} lang={DESCR_LANG}>{item.title}</a>
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
      <li key={index} className='panel__text' lang={DESCR_LANG}>{`${e.value} ${extentArray.join(' ')}`}</li>)})}
    </ul>
  </div>) :
  (null)
)

const PanelFormatSection = ({ formats, notes }) => {
  var formatText = []
  formatText.push(noteTextByType(notes, "physdesc"))
  formatText.push(noteTextByType(notes, "materialspec"))
  const filteredFormatText = formatText.filter(i => i != null).filter(i => i !== '')
  return (
    formats.length ? (
      <div className='mr-15'>
        <h3 className='panel__heading mt-10 mb-5'><Trans comment='Panel Format message'>Formats</Trans></h3>
        <ul className='panel__list--unstyled pl-0 mt-0'>
          {filteredFormatText.length ?
            (<li className='panel__text' lang={DESCR_LANG}>{filteredFormatText.join('\n')}</li>) :
            (formats.map((format, index) => (
              <li key={index} className='panel__text' lang={DESCR_LANG}>{format}</li>))
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
        <li key={index} className='panel__text'><a href={buildHref(item.uri, params)} lang={DESCR_LANG}>{item.title}</a></li>))}
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
        <li key={index} className='panel__text' lang={DESCR_LANG}>{item.title}</li>))}
      </ul>
    </div>) :
    (null)
)

/** Text is always API content. Pass titleLang when the heading comes from the API too. */
const PanelTextSection = ({ params, text, title, titleLang }) => {
  const parsedQuery = params && params.query ? (params.query) : ('')
  return (
  text ?
    (<div className='mr-15'>
      <h3 className='panel__heading mt-10 mb-5' lang={titleLang}>{title}</h3>
      <p className='panel__text--narrative' lang={DESCR_LANG}>
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
    props.params && props.params.query ? buildHref('/search/', props.params) : '/'
  )

  const handleCitationButtonClick = () => {
    setCitationCopied(true)
    setTimeout(() => {setCitationCopied(false)}, '6000')
  }
  

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
    <nav className='records__nav' aria-label={t({ comment: 'Label for back to search navigation', message: 'Back to search' })}>
      <a href={searchUrl} className='btn btn--sm btn--gray'>
        <Trans comment='Message to go back to previous search'>  
          <MaterialIcon icon='keyboard_arrow_left' className='material-icon--space-after'/>Back to Search
        </Trans>
      </a>
    </nav>
    <h1 className='records__title' lang={DESCR_LANG}>{props.isItemLoading ? <Skeleton /> : props.item.title }</h1>
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
          onClick={() => {navigator.clipboard.writeText(props.citation); handleCitationButtonClick()}}>
          Cite<MaterialIcon icon='edit' className='material-icon--space-before'/>
        </button>
        </Trans>
      </div>
      {props.item.online && props.item.files.some(f => f.manifest) ? (
        <Trans comment='Button for digital object viewer'>
        <a className='btn btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
          href={`${props.item.uri}/view`}>View Online<MaterialIcon icon='visibility' className='material-icon--space-before'/></a>
        </Trans>
      ) : null }
      {props.item.online && props.item.files.some(f => f.download) ?
        (
        <>
          <a className='btn btn--sm btn--orange btn--detail mr-10 mb-10 p-8'
            href={props.item.files[0].download}
            target='_blank'
            rel='noopener noreferrer'
            >{t({ comment: 'Button to download an online record', message: 'Download' })}<span className='visually-hidden'> ({t({ comment: 'Screen reader text for opening an online item', message: 'opens in a new window' })})</span> <MaterialIcon icon='get_app' className='material-icon--space-before' /></a>
            { props.downloadSize ?
              <p className='panel__text'>{`Acrobat PDF, ${props.downloadSize}`}</p> :
              <p className='panel__text'><Skeleton/></p> }
        </>
      ) : null }
      </>
    }
    <Accordion className='accordion mt-20' preExpanded={['summary']}>
      <AccordionItem className='accordion__item' uuid='summary'>
        <AccordionItemHeading ariaLevel={2}>
          <AccordionItemButton className='accordion__button py-12 px-0'>{t({ comment: 'Record detail accordion heading', message: 'Summary' })}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className='accordion__panel'>
          {props.isItemLoading ?
            (<DetailSkeleton />) :
            (<>
              <div className='panel__section--flex'>
                <PanelLinkedListSection
                  title={t({ comment: 'Record detail section title', message: 'Creators' })}
                  params={props.params}
                  listData={props.item.creators} />
                <PanelTextSection
                  title={t({ comment: 'Record detail section title', message: 'Dates' })}
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
                title={t({ comment: 'Record detail section title', message: 'Description' })}
                text={props.item.description} />
              <PanelTextSection
                params={props.params}
                title={t({ comment: 'Record detail section title', message: 'Biographical/Historical Note' })}
                text={noteTextByType(props.item.notes, 'bioghist')} />
              { props.item.notes && props.item.notes.filter(n => ['relatedmaterial', 'odd'].includes(n.type)).map(n => (
                <PanelTextSection
                params={props.params}
                title={n.title}
                titleLang={DESCR_LANG}
                text={noteText(n)}
                />
              ))}
              { noteTextByType(props.item.notes, 'processinfo') ?
                (<PanelTextSection
                  params={props.params}
                  title={t({ comment: 'Record detail section title', message: 'Processing Information' })}
                  text={noteTextByType(props.item.notes, 'processinfo')} />) :
                (null)
              }
                <PanelTextSection
                  title={t({ comment: 'Record detail section title', message: 'Immediate Source of Acquisition' })}
                  text={noteTextByType(props.item.notes, 'acqinfo')} />
                <PanelTextSection
                  title={t({ comment: 'Record detail section title', message: 'Custodial History' })}
                  text={noteTextByType(props.item.notes, 'custodhist')} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessOrUse(props.item.notes) ?
        (<AccordionItem className='accordion__item' uuid='accessAndUse'>
          <AccordionItemHeading ariaLevel={2}>
            <AccordionItemButton className='accordion__button py-12 px-0'>{t({ comment: 'Record detail accordion heading', message: 'Access and Use' })}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className='accordion__panel'>
            <PanelTextSection
              title={t({ comment: 'Record detail section title', message: 'Access' })}
              text={noteTextByType(props.item.notes, 'accessrestrict')} />
            <PanelTextSection
              title={t({ comment: 'Record detail section title', message: 'Reproduction and Duplication' })}
              text={noteTextByType(props.item.notes, 'userestrict')} />
            <PanelTextSection
              title={t({ comment: 'Record detail section title', message: 'Technical Access' })}
              text={noteTextByType(props.item.notes, 'phystech')} />
            <PanelTextSection
              title={t({ comment: 'Record detail section title', message: 'Existence and Location of Copies' })}
              text={noteTextByType(props.item.notes, 'altformavail')} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { props.item.terms && props.item.terms.length ?
        (<AccordionItem className='accordion__item' uuid='relatedTerms'>
            <AccordionItemHeading ariaLevel={2}>
              <AccordionItemButton className='accordion__button py-12 px-0'>{t({ comment: 'Record detail accordion heading', message: 'Related Terms' })}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion__panel'>
              <PanelListSection
                title={t({ comment: 'Record detail section title', message: 'Subjects' })}
                listData={props.item.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
)}

export default RecordsDetail;

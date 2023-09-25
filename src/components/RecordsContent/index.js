import React, { useEffect, createRef, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from '../Accordion';
import { Badge } from '../Badge'
import ListToggleButton from '../ListToggleButton'
import MaterialIcon from '../MaterialIcon'
import QueryHighlighter from '../QueryHighlighter'
import { appendParams, dateString, formatMatchString, truncateString} from '../Helpers'
import { useOnScreen } from '../Hooks'
import { isItemSaved } from '../MyListHelpers'
import { RecordsChildSkeleton } from '../LoadingSkeleton'
import { Trans, t, select } from '@lingui/macro';
import classnames from 'classnames'
import './styles.scss'

export const RecordsChild = props => {
  /* Individual item in the RecordsContentList.
  * Contains the most complex logic for loading components and their children.
  * 1. Determines if the current item is a parent of the target object or collection.
  * 2. Determines if the target is an object that is a direct descendant of the current item.
  * 3. Determines whether the current item's first child is a collection or object.
  * 4. Create refs which are used to trigger lazy loading.
  * 5. Observe when the refs created in 4 are visible.
  * 6. Determines if the target object or collection has been loaded.
  */
  const { ariaLevel, isScrolled, item, myListCount, params, preExpanded, setActiveRecords,
          setIsLoading, setIsScrolled, toggleInList } = props
  const [children, setChildren] = useState([])
  const [childCount, setChildCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoadingBefore, setIsLoadingBefore] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [offsetAfter, setOffsetAfter] = useState(props.offsetAfter)
  const [offsetBefore, setOffsetBefore] = useState(props.offsetBefore)
  const currentUrl = window.location.pathname
  const itemUri = `${process.env.REACT_APP_ARGO_BASEURL}${item.uri}/children`
  const query = item.hit_count ? params.query : null
  const pageSize = 5
  const targetElementLoaded = item.uri === currentUrl /* 6 */
  const isParentCollection = preExpanded.includes(item.uri) && item.uri.includes('collections') /* 1 */
  const targetIsDirectDescendant = currentUrl.includes('objects') && item.uri === preExpanded.slice(-1)[0] /* 2 */
  const firstChildType = children.length && children[0].type /* 3 */
  const refBefore = createRef() /* 4 */
  const refAfter = createRef() /* 4 */
  const isBeforeVisible = useOnScreen(refBefore) /* 5 */
  const isAfterVisible = useOnScreen(refAfter) /* 5 */

  /* Loads all pages of paginated content */
  const getPages = uri => {
    axios
        .get(uri)
        .then(res => {
          setChildCount(res.data.count)
          setChildren(children => children.concat(res.data.results))
          res.data.next && getPages(res.data.next)
        }
      )
      .catch(err => console.log(err))
  }

  /* Fetches the page previous to a given offset
  * 1. If there are fewer preceding items than the size of the page, set the
  *   offset to zero, otherwise subtract from the page size. On initial load,
  *   include the offset is adjusted by one to include the target object.
  * 2. If there are fewer preceding items than the size of the page, fetch all
  *   of the preceding items, otherwise get the full page.
  * 3. If the offset is zero, account for the height of the loading skeleton,
  *    which will disappear after state is updated.
  * 4. Update the HTML element's scrollTop so that the list stays in the same
  *    location. Temporarily override 'smooth' scroll behavior (set in CSS) so
  *    that the html element's scrollTop is set instantaneously.
  */
  const getPageBefore = (uri, params) => {
    if (!offsetBefore) { return }
    setIsLoadingBefore(true)
    const updatedParams = {
      ...params,
      offset: offsetBefore >= pageSize ? offsetBefore - pageSize : 0, /* 1 */
      limit: offsetBefore >= pageSize ? pageSize : offsetBefore > 0 ? offsetBefore : 0 /* 2 */
    }
    const wrapperElement = document.getElementsByClassName('container--full-width')[0]
    const loadingSkeletonHeight = refBefore.current.scrollHeight
    const pastScroll = updatedParams.offset === 0 ? wrapperElement.scrollHeight + loadingSkeletonHeight : wrapperElement.scrollHeight /* 3 */
    axios
        .get(appendParams(uri, updatedParams))
        .then(res => {
          setChildren(children => res.data.results.concat(children))
          const currentScroll = wrapperElement.scrollHeight - pastScroll /* 4 */
          document.documentElement.style.scrollBehavior = 'auto' /* 4 */
          document.documentElement.scrollTop = document.documentElement.scrollTop + currentScroll /* 4 */
          document.documentElement.style.scrollBehavior = '' /* 4 */
          setOffsetBefore(updatedParams.offset)
        }
      )
      .catch(err => console.log(err))
      .then(res => setIsLoadingBefore(false))
  }

  /* Fetches the siblings surrounding the target object */
  const getInitialSiblings = (uri, params) => {
    const offset = offsetBefore >= pageSize ? offsetBefore - pageSize : 0
    const limit = pageSize * 2
    const updatedParams = { ...params, offset: offset, limit: limit }
    axios
        .get(appendParams(uri, updatedParams))
        .then(res => {
          setChildCount(res.data.count)
          setChildren(res.data.results)
          setOffsetAfter(offset + limit)
          setOffsetBefore(offset)
        })
        .catch(err => console.log(err))
  }

  /* Fetches the next page after a given offset */
  const getPageAfter = (uri, params) => {
    const updatedParams = {
      ...params,
      offset: offsetAfter,
      limit: pageSize,
    }
    axios
        .get(appendParams(uri, updatedParams))
        .then(res => {
          setChildren(children => children.concat(res.data.results))
          setOffsetAfter(offsetAfter + pageSize)
        }
      )
      .catch(err => console.log(err))
  }

  /** Loads all children of a collection */
  const handleCollectionClick = uri => {
    setIsExpanded(!isExpanded)
    props.setActiveRecords(uri)
    if (!children.length) {
      getPages(
        appendParams(
          `${process.env.REACT_APP_ARGO_BASEURL}${uri}/children`,
          {...props.params, limit: pageSize}
        )
      )
    }
  }

  /** Calls the setActiveRecords callback function */
  const handleItemClick = uri => {
    props.setActiveRecords(uri)
  }

  /** Add or remove an item from MyList */
  const toggleSaved = item => {
    props.toggleInList(item)
    setIsSaved(!isSaved)
    props.setActiveRecords(item.uri)
  }

  /* Set isLoading to false once loading has completed */
  useEffect(() => {
    if (targetElementLoaded || preExpanded.length === 1) {
      setIsLoading(false)
    }
  }, [targetElementLoaded, setIsLoading, setIsScrolled, preExpanded])

  /* Loads children of current item
  * 1. Execute alternate loading strategy on parents of target object. This is only
  *    used when loading an object, which can be a long ways down a list.
  * 2. If targeting a collection, fetch all its children and save to state
  */
  useEffect(() => {
    if (isParentCollection) {
      if (targetIsDirectDescendant) { /* 1 */
        getInitialSiblings(itemUri, params)
      } else { /* 2 */
        getPages(appendParams(itemUri, {...params, limit: pageSize}))
      }
    }
  }, [isParentCollection, itemUri, params, targetIsDirectDescendant])

  /* Load previous page if available when loading trigger is visible */
  useEffect(() => {
    isScrolled && isBeforeVisible && !isLoadingBefore && getPageBefore(itemUri, params)
  }, [isBeforeVisible, isLoadingBefore, isScrolled, itemUri, offsetBefore, params])

  /* Load next page if available when loading trigger is visible */
  useEffect(() => {
    isScrolled && isAfterVisible && getPageAfter(itemUri, params)
  }, [childCount, isAfterVisible, isScrolled, itemUri, offsetAfter, params])

  /** Sets isItemSaved state when myListCount changes */
  useEffect(() => {
    setIsSaved(isItemSaved(item))
  }, [item, myListCount])

  /* Scroll item matching currentUrl into view and focus on it
  * 1. The dependency array is empty so this will only execute once.
  * 2. setTimeout is used so the loading skeleton does not cause scroll position
  *    to be incorrectly calculated.
  */
  useEffect(() => {
    if (targetElementLoaded) {
      setTimeout(() => {
        const targetElement = document.getElementById(`accordion__heading-${currentUrl}`)
        targetElement.focus()
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 500) /* 2 */
      setTimeout(() => setIsScrolled(true), 3000)
    }
  }, []) /* 1 */

  return (item.type === 'object' ?
    (<div className={classnames('child__list-item', `child__list-item--${item.type}`)} >
      <div className='child__description'>
        <button id={`accordion__heading-${item.uri}`}
                className={classnames('child__title', `child__title--${item.type}`)}
                onClick={() => handleItemClick(item.uri)}>
          <QueryHighlighter query={query} text={item.title} />
        </button>
        {item.dates === item.title ? (null) : (<p className='child__text'>{item.dates}</p>)}
      </div>
      <div className='child__buttons'>
        {item.online ? (
          <a className='btn btn--sm btn--blue btn-launch--content mr-10 p-8'
            href={`${item.uri}/view`}>{
              t({
                message: select(props.isMobile, {
                  true: 'View',
                  other: 'View Online'
                })
              })
            }
             <MaterialIcon icon='visibility' className='material-icon--space-before' /></a>) :
          (null)
        }
        <ListToggleButton
          className='btn--sm btn--orange btn-add--content mr-10 p-8'
          isMobile={props.isMobile}
          isSaved={isSaved}
          item={props.item}
          toggleSaved={toggleSaved} />
      </div>
      <p className='child__text text--truncate'>
        <QueryHighlighter query={query} text={truncateString(item.description, 200)} />
      </p>
      {item.hit_count ?
        <div className="child__badges">
          <Badge className='badge--orange' text={formatMatchString(item.hit_count)} />
          {item.online_hit_count ? <Badge className='badge--blue' text={formatMatchString(item.online_hit_count, true)} /> : null}
        </div>
        : null}
    </div>) :
    (<AccordionItem
      preExpanded={preExpanded}
      uuid={item.uri}
      className={classnames(
        'child__list-accordion',
        {'child__list-accordion--bottom-level': firstChildType === 'object'}
      )} >
      <AccordionItemHeading
        ariaLevel={ariaLevel}
        className={classnames(
          'child__list-item',
          `child__list-item--${item.type}`,
          {'child__list-item--bottom-level': firstChildType === 'object'},
        )} >
        <AccordionItemButton
            className={`child__title child__title--${item.type}`}
            onClick={() => handleCollectionClick(item.uri)} >
          <QueryHighlighter query={query} text={item.title} />
          {item.title === item.dates ? (null) : (<p className='child__text'>{item.dates}</p>)}
          <p className='child__text text--truncate'>
            <QueryHighlighter query={query} text={truncateString(item.description, 200)} />
          </p>
          {item.hit_count ?
            <div className="child__badges">
              <Badge className='badge--orange' text={formatMatchString(item.hit_count)} />
              {item.online_hit_count ? <Badge className='badge--blue' text={formatMatchString(item.online_hit_count, true)} /> : null}
            </div>
            : null}
          <MaterialIcon icon={isExpanded ? 'expand_less' : 'expand_more'} />
        </AccordionItemButton>
      </AccordionItemHeading>
      {(children.length) ?
        (<AccordionItemPanel>
          {targetIsDirectDescendant && offsetBefore > 0 ? <RecordsChildSkeleton ref={refBefore} /> : null}
          <RecordsContentList
            ariaLevel={ariaLevel+1}
            children={children}
            className={classnames({'child__list--bottom-level': firstChildType === 'object'})}
            isScrolled={isScrolled}
            myListCount={myListCount}
            offsetAfter={offsetAfter}
            offsetBefore={offsetBefore}
            params={params}
            preExpanded={preExpanded}
            setActiveRecords={setActiveRecords}
            setIsLoading={setIsLoading}
            setIsScrolled={setIsScrolled}
            toggleInList={toggleInList} />
          {targetIsDirectDescendant && offsetAfter < childCount ? <RecordsChildSkeleton ref={refAfter} /> : null}
        </AccordionItemPanel>
        ) :
        (null)}
    </AccordionItem>)
  )
}

RecordsChild.propTypes = {
    isScrolled: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    myListCount: PropTypes.number.isRequired,
    offsetAfter: PropTypes.number,
    offsetBefore: PropTypes.number,
    params: PropTypes.object.isRequired,
    preExpanded: PropTypes.array.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setIsScrolled: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
}

export const RecordsContentList = props => {

  const { ariaLevel, isScrolled, myListCount, offsetAfter, offsetBefore, params, preExpanded,
          setActiveRecords, setIsLoading, setIsScrolled, toggleInList } = props;

  const childList = children => {
    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          ariaLevel={ariaLevel}
          isScrolled={isScrolled}
          item={child}
          myListCount={myListCount}
          offsetAfter={offsetAfter}
          offsetBefore={offsetBefore}
          params={params}
          preExpanded={preExpanded}
          setActiveRecords={setActiveRecords}
          setIsLoading={setIsLoading}
          setIsScrolled={setIsScrolled}
          toggleInList={toggleInList} />
        )
      )
    )
  }

  return (
    <Accordion
      className={classnames('child__list', props.className)}
      preExpanded={props.preExpanded} >
      {childList(props.children)}
    </Accordion>
  )
}

RecordsContentList.propTypes = {
  ariaLevel: PropTypes.number.isRequired,
  children: PropTypes.array,
  className: PropTypes.string,
  isScrolled: PropTypes.bool.isRequired,
  myListCount: PropTypes.number.isRequired,
  offsetAfter: PropTypes.number,
  offsetBefore: PropTypes.number,
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsScrolled: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}


const RecordsContent = props => {
  const { children, collection, isContentShown, myListCount, offsetAfter,
          offsetBefore, params, preExpanded, setActiveRecords, toggleInList } = props;
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  /** Focus on loading overlay when page is loading */
  useEffect(() => {
    if (isLoading) {
      const overlay = document.getElementById('content-loading')
      overlay && overlay.focus()
    }
  }, [isLoading, preExpanded])

  return (
  children ?
    (<div className={classnames('records__content', 'py-40', 'px-30', {'hidden': !isContentShown})}>
      {isLoading ? (
        <div className='loading'>
            <Trans comment='Records content is loading'>
              <p id='content-loading' className='records-loading__text loading-dots'>Loading</p>
            </Trans>
        </div>) : (null)}
      <h2 className='content__title mt-0 pb-0'><Trans comment='Collection Content title'>Collection Content</Trans></h2>
      <h3 className='collection__title mb-0'>{collection.title}</h3>
      <p className='collection__date'>{dateString(collection.dates)}</p>
      <p className='collection__text text--truncate'>
        {truncateString(collection.description, 180)}
      </p>
      <RecordsContentList
        ariaLevel={3}
        className='child__list--top-level'
        children={children}
        isScrolled={isScrolled}
        myListCount={myListCount}
        offsetAfter={offsetAfter}
        offsetBefore={offsetBefore}
        params={params}
        preExpanded={preExpanded}
        setActiveRecords={setActiveRecords}
        setIsLoading={setIsLoading}
        setIsScrolled={setIsScrolled}
        toggleInList={toggleInList} />
    </div>) :
    (null)
  )
}

RecordsContent.propTypes = {
  children: PropTypes.array.isRequired,
  collection: PropTypes.object.isRequired,
  isContentShown: PropTypes.bool.isRequired,
  myListCount: PropTypes.number.isRequired,
  offsetAfter: PropTypes.number,
  offsetBefore: PropTypes.number,
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsContent;

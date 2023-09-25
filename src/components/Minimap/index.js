import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { appendParams } from '../Helpers'
import { useResizeObserver } from '../Hooks'
import { t, Trans, plural  } from '@lingui/macro'
import './styles.scss'

/**
* Minimap component
* 1. Uses a callback component so container height and width are set once ref resolves.
* 2. Create the correct number of blank boxes with start and end indexes.
* 3. Map hits onto blankBoxes array.
**/
const Minimap = ({ data, isLoading, params, rowCount=4 }) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const minimapContainer = useRef(null)

  const setDimensions = () => {
    if (minimapContainer.current !== null) {
      setContainerHeight(minimapContainer.current.getBoundingClientRect().height)
      setContainerWidth(minimapContainer.current.getBoundingClientRect().width)
    }
  }

  useResizeObserver({ callback: setDimensions, element: minimapContainer })

  const boxWidthHeight = containerWidth / rowCount
  const totalBoxes = containerHeight && boxWidthHeight ? parseInt(parseInt(containerHeight) / boxWidthHeight) * rowCount : 0
  const hitsPerBox = data.total / totalBoxes

  const blankBoxes = Array(totalBoxes).fill().map((b, idx) => { /* 2 */
    const startIndex = hitsPerBox * idx
    const endIndex = hitsPerBox * (idx + 1)
    return ({start: startIndex, end: endIndex})
  })

  const minimapBoxes = () => blankBoxes.map((b, idx) => {  /* 3 */
    const areaHits = data.hits && data.hits.filter(h => (h.index <= b.end && b.start < h.index))
                                           .filter(h => h.uri.includes('objects'))
                                           .sort((a, b) => a.index - b.index)
    const hitClass = areaHits.filter(h => h.online).length ? 'minimap__digital-hit' : 'minimap__record-hit'
    const hitTitles = areaHits.map(h => h.title).join('\n')
    const currentUrl = window.location.pathname
    const areaUrl = areaHits.length && areaHits[0].uri
    const isAreaActive = areaUrl === currentUrl
    const hitPlural = t({
      comment: "Pluralization of hit(s) for minimap boxes",
      message: plural(areaHits.length, {one: "hit", other: "hits"})
    })
    const message = t({
      comment: "Message displayed to jump to specific section within minimap",
      message: `Jump to ${areaHits.length} ${hitPlural} in this area: ${hitTitles}`
    })
    return (
      areaHits.length ?
      <a
          key={idx}
          href={appendParams(areaUrl, params)}
          className={classnames('minimap__box', hitClass, { [`${hitClass}--active`]: isAreaActive })}
          title={message} >
        <span className='visually-hidden'>{message}</span>
        <span className="material-icon" aria-hidden="true">check</span>
      </a>
      :
      <div
        key={idx}
        className='minimap__box'>
    </div>
    )
  })
  const loadedBoxes = minimapBoxes()

  return (
    <>
      <h2 className="visually-hidden">
        <Trans comment="Header for minimap">
          Minimap
        </Trans>
      </h2>
      <nav className={classnames('minimap', `minimap--${rowCount}-across`)} ref={minimapContainer} aria-label={t({
        comment: "Aria label for Minimap nav",
        message: "Minimap"
      })}>
        {loadedBoxes}
      </nav>
    </>
)}

Minimap.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  rowCount: PropTypes.number,
}

export default Minimap

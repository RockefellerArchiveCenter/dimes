import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SearchSkeleton = () => (
  <ul className='card-list list--unstyled mt-40 mb-32'>
    {Array(8)
      .fill()
      .map((item, index) => (
        <li className='card' key={index}>
          <Skeleton />
          <h2 className='card__title'>
            <Skeleton count={3}/>
          </h2>
          <p className='card__date'>
            <Skeleton />
          </p>
        </li>
      )
    )}
  </ul>
)

export const MyListSkeleton = () => (
  <React.Fragment>
    {Array(3)
    .fill()
    .map((item, index) => (
      <div key={index} className='saved-items__item-group'>
        <h2 className='item-group__title mt-24 mb-30 p-0'>
          <Skeleton />
        </h2>
        <div className='item-group__items'>
          <div className='saved-item mb-40 py-0 pr-22 pl-15'>
            <div className='saved-item__item-description pr-20'>
              <h3 className='saved-item__title mt-0 mx-0 mb-5'>
                <Skeleton />
              </h3>
              <p className='saved-item__date'>
                <Skeleton />
              </p>
              <p className='saved-item__description'>
                <Skeleton />
              </p>
              <p className='saved-item__found-in'>
                <Skeleton />
              </p>
              <div className='saved-item__buttons'>
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )}
  </React.Fragment>
)

export const AgentAttributeSkeleton = () => (
  <div className='agent__attributes'>
    {Array(4)
      .fill()
      .map((item, index) => (
        <div key={index} className='agent-attribute'>
          <p className='agent-attribute__label m-0'>
            <Skeleton />
          </p>
          <p className='agent-attribute__value'>
            <Skeleton />
          </p>
        </div>
      ))}
  </div>
)

export const AgentRelatedCollectionsSkeleton = () => (
  <div className='agent__related'>
    <h2 className='agent__section-title pb-12'>
      <Skeleton />
    </h2>
    <ul className='card-list list--unstyled card--related-collections mt-40 mb-32'>
      {Array(6)
        .fill()
        .map((item, index) => (
          <li className='card' key={index}>
            <Skeleton />
            <h2 className='card__title'>
              <Skeleton count={3}/>
            </h2>
            <p className='card__date'>
              <Skeleton />
            </p>
          </li>
        )
      )}
    </ul>
  </div>
)

export const DetailSkeleton = () => (
  <>
    <h3 className='panel__heading'><Skeleton /></h3>
    <ul className='panel__list--unstyled pl-0 mt-0'>
      <li><Skeleton /></li>
    </ul>
  </>
)

export const FoundInItemSkeleton = () => (
  <>
    {Array(3)
      .fill()
      .map((item, index) => (
        <p key={index} className='found-in__link'><Skeleton /></p>
      ))}
  </>
)

export const RecordsChildSkeleton = React.forwardRef((props, ref) => (
  <div className='child__list child__list--bottom-level' ref={ref}>
    {Array(5)
      .fill()
      .map((item, index) => (
        <div key={index}>
          <div className='child__list-item child__list-item--object'>
            <button className='child__title child__title--object'></button>
            <p className='child__text' style={{width: '100%'}}><Skeleton /></p>
            <p className='child__text child__description'><Skeleton /></p>
          </div>
        </div>
      ))}
  </div>
))

export const MinimapSkeleton = ({totalBoxes}) => {
  return (
  <>
    {Array(totalBoxes)
      .fill()
      .map((item, index) => (
        <div key={index} className='minimap__box'>
          <Skeleton delay={.2} />
        </div>
      ))}
  </>
)}

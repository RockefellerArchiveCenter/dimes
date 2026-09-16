import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Trans } from '@lingui/macro'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingMessage = () => (
  <Trans comment='Loading message'>
    <p className='visually-hidden'>Loading</p>
  </Trans>
)

export const SearchSkeleton = () => (
  <>
    <LoadingMessage />
    <ul className='card-list mt-40 mb-32' aria-hidden='true'>
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
  </>
)

export const MyListSkeleton = () => (
  <>
    <LoadingMessage />
    {Array(3)
    .fill()
    .map((item, index) => (
      <div key={index} className='saved-items__item-group' aria-hidden='true'>
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
  </>
)

export const AgentAttributeSkeleton = () => (
  <>
    <LoadingMessage />
    <div className='agent__attributes' aria-hidden='true'>
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
  </>
)

export const AgentRelatedCollectionsSkeleton = () => (
  <>
    <LoadingMessage />
    <div className='agent__related' aria-hidden='true'>
      <h2 className='agent__section-title pb-12'>
        <Skeleton />
      </h2>
      <ul className='card-list card--related-collections mt-40 mb-32'>
        {Array(6)
          .fill()
          .map((item, index) => (
            <li className='card' key={index}>
              <Skeleton />
              <h3 className='card__title'>
                <Skeleton count={3}/>
              </h3>
              <p className='card__date'>
                <Skeleton />
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  </>
)

export const DetailSkeleton = () => (
  <>
    <LoadingMessage />
    <h3 className='panel__heading' aria-hidden='true'><Skeleton /></h3>
    <ul className='panel__list--unstyled pl-0 mt-0' aria-hidden='true'>
      <li><Skeleton /></li>
    </ul>
  </>
)

export const FoundInItemSkeleton = () => (
  <>
    <LoadingMessage />
    {Array(3)
      .fill()
      .map((item, index) => (
        <p key={index} className='found-in__link' aria-hidden='true'><Skeleton /></p>
      ))}
  </>
)

export const RecordsChildSkeleton = React.forwardRef((props, ref) => (
  <>
    <LoadingMessage />
    <div className='child__list child__list--bottom-level' ref={ref} aria-hidden='true'>
      {Array(5)
        .fill()
        .map((item, index) => (
          <div key={index}>
            <div className='child__list-item child__list-item--object'>
              <button className='child__title child__title--object' tabIndex={-1}></button>
              <p className='child__text' style={{width: '100%'}}><Skeleton /></p>
              <p className='child__text child__description'><Skeleton /></p>
            </div>
          </div>
        ))}
    </div>
  </>
))

export const MinimapSkeleton = ({totalBoxes}) => {
  return (
  <>
    <LoadingMessage />
    {Array(totalBoxes)
      .fill()
      .map((item, index) => (
        <div key={index} className='minimap__box' aria-hidden='true'>
          <Skeleton delay={.2} />
        </div>
      ))}
  </>
)}

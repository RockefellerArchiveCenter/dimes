import React from "react";
import Skeleton from "react-loading-skeleton";

export const SearchSkeleton = () => (
  <ul className="tile-list">
    {Array(8)
      .fill()
      .map((item, index) => (
        <li className="tile" key={index}>
          <Skeleton />
          <h2 className="tile__title">
            <Skeleton count={3}/>
          </h2>
          <p className="tile__date">
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
      <div key={index} className="saved-items__item-group">
        <h2 className="item-group__title">
          <Skeleton />
        </h2>
        <div className="item-group__items">
          <div className="saved-item">
            <div className="saved-item__item-description">
              <h3 className="saved-item__title">
                <Skeleton />
              </h3>
              <p className="saved-item__date">
                <Skeleton />
              </p>
              <p className="saved-item__description">
                <Skeleton />
              </p>
              <p className="saved-item__found-in">
                <Skeleton />
              </p>
              <div className="saved-item__buttons">
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
  <div className="agent__attributes">
    {Array(4)
      .fill()
      .map((item, index) => (
        <div key={index} className="agent-attribute">
          <p className="agent-attribute__label">
            <Skeleton />
          </p>
          <p className="agent-attribute__value">
            <Skeleton />
          </p>
        </div>
      ))}
  </div>
)


export const DetailSkeleton = () => (
  <>
    <h3 className="panel__heading"><Skeleton /></h3>
    <ul className="panel__list--unstyled">
      <li><Skeleton /></li>
    </ul>
  </>
)

export const FoundInItemSkeleton = () => (
  <>
    {Array(3)
      .fill()
      .map((item, index) => (
        <p key={index} className="found-in__link"><Skeleton /></p>
      ))}
  </>
)

export const CollectionHitsCollectionSkeleton = () => (
  <div className="collection-hits__info">
    {Array(3)
      .fill()
      .map((item, index) => (
        <React.Fragment key={index}>
          <h3 className="collection-hits__title"><Skeleton /></h3>
          <p className="collection-hits__text"><Skeleton /></p>
        </React.Fragment>
      ))}
  </div>
)


export const CollectionHitsChildrenSkeleton = () => (
  Array(4)
  .fill()
  .map((item, index) => (
    <div key={index} className="collection-child">
      <p className="collection-child__title">
        <Skeleton />
      </p>
    </div>
  ))
)


export const RecordsChildSkeleton = () => (
  <ul className="child__list">
    {Array(4)
      .fill()
      .map((item, index) => (
        <li key={index}>
          <div className="child__list-item child__list-item--collection">
            <button className="child__title child__title--collection"><Skeleton /></button>
            <p className="child__text"><Skeleton /></p>
            <p className="child__text child__description"><Skeleton /></p>
          </div>
        </li>
      ))}
  </ul>
)

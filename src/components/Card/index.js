import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from '../Badge'
import MaterialIcon from '../MaterialIcon'
import { appendParams, formatMatchString } from '../Helpers'
import classnames from 'classnames'
import './styles.scss'

const CategoryLabel = ({ category }) => {
  var icon = ''
  switch (category) {
    case 'person':
      icon = 'person'
      break
    case 'organization':
      icon = 'account_balance'
      break
    default:
      icon = 'archive_box'
  }
  return (
    <div className={classnames('card__body-text', 'card__type-label m-0', category)}><MaterialIcon icon={icon} />{category}</div>
  )
}

const Card = ({ category, className, date, hit_count, online_hit_count, params, title, uri }) => (
  <li className={classnames('card', className)}>
    <a className='card__title' href={appendParams(uri, params)}>{title}</a>
    {category ? (<CategoryLabel category={category} />) : null }
    <p className='card__body-text card__date'>{date}</p>
    <div className='card__footer'>
      <Badge className='badge--orange' text={formatMatchString(hit_count)} />
      {online_hit_count ? <Badge className='badge--blue' text={formatMatchString(online_hit_count, true)} /> : null}
    </div>
  </li>)

const CardList = ({ items, params, cardClassName, className }) => {
  const listItems = items.map(item =>
    <Card
      key={item.uri}
      {...item}
      params={params}
      className={cardClassName}
      date={item.dates?.length ? item.dates.map(d => d.expression).join(', ') : null} />
  )
  return (
    <ul className={classnames('card-list list--unstyled mt-40 mb-32', className)}>
      {listItems}
    </ul>
  )
}

CardList.propTypes = {
  items: PropTypes.array.isRequired,
  params: PropTypes.object,
  cardClassName: PropTypes.string,
}

export default CardList

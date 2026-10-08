import { Badge } from '../Badge'
import MaterialIcon from '../MaterialIcon'
import { buildHref, DESCR_LANG, formatMatchString } from '../Helpers'
import classnames from 'classnames'
import { t } from '@lingui/core/macro'
import './styles.scss'

const CategoryLabel = ({ category }) => {
  var icon = ''
  var label = category
  switch (category) {
    case 'person':
      icon = 'person'
      label = t({ comment: 'Search result category label', message: 'Person' })
      break
    case 'organization':
      icon = 'account_balance'
      label = t({ comment: 'Search result category label', message: 'Organization' })
      break
    case 'collection':
      icon = 'inventory2'
      label = t({ comment: 'Search result category label', message: 'Collection' })
      break
    default:
      icon = 'inventory2'
  }
  return (
    <div className={classnames('card__body-text', 'card__type-label m-0', category)}><MaterialIcon icon={icon} />{label}</div>
  )
}

const Card = ({ category, className, date, headingLevel, hit_count, online_hit_count, params, title, uri }) => {
  const CardHeading = `h${headingLevel}`
  return (
  <li className={classnames('card', className)}>
    <CardHeading className='card__title'>
      <a href={buildHref(uri, params)} lang={DESCR_LANG}>{title}</a>
    </CardHeading>
    {category ? (<CategoryLabel category={category} />) : null }
    <p className='card__body-text card__date' lang={DESCR_LANG}>{date}</p>
    <div className='card__footer'>
      <Badge className='badge--orange' text={formatMatchString(hit_count)} />
      {online_hit_count ? <Badge className='badge--blue' text={formatMatchString(online_hit_count, true)} /> : null}
    </div>
  </li>)
}

const CardList = ({ items, params, cardClassName, className, headingLevel = 2 }) => {
  const listItems = items.map(item =>
    <Card
      key={item.uri}
      {...item}
      params={params}
      className={cardClassName}
      headingLevel={headingLevel}
      date={item.dates?.length ? item.dates.map(d => d.expression).join(', ') : null} />
  )
  return (
    <ul className={classnames('card-list mt-40 mb-32', className)}>
      {listItems}
    </ul>
  )
}

export default CardList

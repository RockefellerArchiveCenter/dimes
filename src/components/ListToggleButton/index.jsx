import Button from '../Button'
import { t, select } from '@lingui/macro'
import classnames from 'classnames'

const ListToggleButton = ({ className, isMobile, isSaved, item, titleId, toggleSaved }) => {
  const buttonId = `toggle-${item.uri}`
  const ariaLabelledBy = titleId ? `${buttonId} ${titleId}` : undefined

  return (
  isSaved ? (
    <Button
      id={buttonId}
      ariaLabelledBy={ariaLabelledBy}
      ariaPressed
      className={classnames('saved', className)}
      label={
        t({
          comment: 'Label for Remove List Toggle button',
          message: select(isMobile, {
            true: 'Remove',
            other: 'Remove from List'
          })
        })
      }
      iconAfter='remove_circle_outline'
      handleClick={() => toggleSaved(item)} />
  ) : (
    <Button
      id={buttonId}
      ariaLabelledBy={ariaLabelledBy}
      ariaPressed={false}
      className={className}
      label={
        t({
          comment: 'Label for Add List Toggle button',
          message: select(isMobile, {
            true: 'Add',
            other: 'Add to List'
          })
        })
      }
      iconAfter='add_circle_outline'
      handleClick={() => toggleSaved(item)} />
  ))
}

export default ListToggleButton

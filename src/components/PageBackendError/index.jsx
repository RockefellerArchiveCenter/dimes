import MaterialIcon from '../MaterialIcon'
import { withSiteTitle } from '../Helpers'
import { usePageView } from '../Hooks'
import './styles.scss'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

const PageBackendError = ({error}) => {

  usePageView(withSiteTitle(t({
    comment: 'Page Backend Error title',
    message: 'Error'
  })))

  return (
    <Trans comment='Page Backend Error'>
      <main id='main' className='backend-error mt-60'>
        <span className='not-found__icon'><MaterialIcon icon='error_outline' /></span>
        <h1 className='backend-error__title'>There was an error fetching data.</h1>
        <p className='backend-error__text'>The request to {error.config.url} failed.</p>
        <p className='backend-error__text'>To report this problem, send us an email at <a href={t({
          message: 'mailto:archive@rockarch.org'
        })}>archive@rockarch.org</a>.</p>
        <p className='backend-error__header mt-18'>Error message:</p>
        <p className='backend-error__message'>{error.code}: {error.message}</p>
        {error.response.data ? <p className='backend-error__message'>{JSON.stringify(error.response.data)}</p> : null}
        {error.config.data ?
          <>
            <p className='backend-error__header mt-18'>Request data:</p>
            <p className='backend-error__message'>{error.config.data}</p>
          </> : null}
      </main>
    </Trans>
  )
}

export default PageBackendError

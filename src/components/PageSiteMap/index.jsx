import { withSiteTitle } from '../Helpers'
import { usePageView } from '../Hooks'
import './styles.scss'
import { t } from '@lingui/core/macro'

const PageSiteMap = () => {

  usePageView(withSiteTitle(t({
    comment: 'Site map page title',
    message: 'Site map'
  })))

  return (
    <div className='container--full-width'>
      <main id='main' className='sitemap mt-60'>
        <h1>{t({
          comment: 'Site map page heading',
          message: 'Site map'
        })}</h1>
        <ul>
          <li><a href='/'>{t({ comment: 'Site map link to home page', message: 'Home' })}</a></li>
          <li><a href='/search'>{t({ comment: 'Site map link to search page', message: 'Search' })}</a></li>
          <li><a href='/list'>{t({ comment: 'Site map link to My List page', message: 'My List' })}</a></li>
        </ul>
        <h2>{t({
          comment: 'Site map heading for links to related websites',
          message: 'Related sites'
        })}</h2>
        <ul>
          <li>
            <a href={t({ comment: 'Site map link to Rockefeller Archive Center website', message: 'https://rockarch.org/' })}>
              {t({ comment: 'Site map label for Rockefeller Archive Center website', message: 'Rockefeller Archive Center' })}
            </a>
          </li>
          <li>
            <a href={t({ comment: 'Link used for sign-in within the Header', message: 'https://raccess.rockarch.org' })}>
              {t({ message: 'Sign in to RACcess' })}
            </a>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default PageSiteMap

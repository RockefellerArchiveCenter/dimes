import Hero from '../Hero';
import SearchForm from '../SearchForm';
import { SITE_TITLE } from '../Helpers';
import { usePageView } from '../Hooks';
import './styles.scss';
import { t } from '@lingui/core/macro'

const PageHome = ({isMobile}) => {

  usePageView(`${SITE_TITLE} - ${t({
    comment: 'Page Home title',
    message: 'Online Collections and Catalog of Rockefeller Archive Center'
  })}`)

  return (
    <main id='main' className='home'>
      <Hero />
      <SearchForm className='search search-form--home' isMobile={isMobile}/>
    </main>
  )
}

export default PageHome

import Hero from '../Hero';
import SearchForm from '../SearchForm';
import { usePageView } from '../Hooks';
import './styles.scss';
import { t } from '@lingui/core/macro'

const PageHome = ({isMobile}) => {

  usePageView(t({
    comment: 'Page Home',
    message: 'DIMES: Online Collections and Catalog of Rockefeller Archive Center'
  }))

  return (
    <main id='main' className='home'>
      <Hero />
      <SearchForm className='search search-form--home' isMobile={isMobile}/>
    </main>
  )
}

export default PageHome

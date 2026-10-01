import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useMatch } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import SkipLink from './components/SkipLink';
import PageAgent from './components/PageAgent';
import PageRecords from './components/PageRecords';
import PageDigitalObject from './components/PageDigitalObject';
import PageHome from './components/PageHome';
import PageMyList from './components/PageMyList';
import PageSearch from './components/PageSearch';
import PageSiteMap from './components/PageSiteMap';
import PageNotFound from './components/PageNotFound';
import { fetchMyList, isItemSaved, removeItem, saveItem, saveMyList } from './components/MyListHelpers';
import { announce } from '@react-aria/live-announcer'
import { t } from '@lingui/core/macro'
import { useResizeObserver } from './components/Hooks';

const AppFooter = () => useMatch('/:type/:id/view') ? null : <Footer />

const App = () => {
  const desktopSize = 1024
  const mobileSize = 580
  const [myListCount, setMyListCount] = useState(0)
  const [isDesktop, setIsDesktop] = useState()
  const [isMobile, setIsMobile] = useState()
  const mainWrapper = useRef(null)

  const updateSizes = () => {
    setTimeout(() => {
      setIsDesktop(window.innerWidth >= desktopSize)
      setIsMobile(window.innerWidth < mobileSize)
    })
  }

  useResizeObserver({ callback: updateSizes, element: mainWrapper })

  const countMyList = data => {
    var list = data ? data : fetchMyList()
    return list.length
  }

  const removeAllListItems = () => {
    saveMyList([]);
    setMyListCount(0)
    announce(t({
      comment: 'Announced after removing all items from My List',
      message: 'All items removed from list'
    }), 'polite')
  }

  const toggleInList = item => {
    const saved = isItemSaved(item)
    saved ? removeItem(item) : saveItem(item)
    setMyListCount(countMyList())
    announce(saved
      ? t({
        comment: 'Announced after removing an item from My List',
        message: 'Item removed from list'
      })
      : t({
        comment: 'Announced after adding an item to My List',
        message: 'Item added to list'
      }), 'polite')
    return !saved
  }

  useEffect(() => {
    setMyListCount(countMyList())
  }, [])

  return (<>
    <SkipLink />
    <Header myListCount={myListCount} />
      <BrowserRouter>
        <div className='wrapper' ref={mainWrapper}>
          <Routes>
            <Route path='/list' element={<PageMyList removeAllListItems={removeAllListItems} toggleInList={toggleInList} />} />
            <Route path='/search' element={<PageSearch />} />
            <Route path='/:type/:id/view' element={<PageDigitalObject />} />
            <Route path='/:type/:id' element={<PageRecords myListCount={myListCount} toggleInList={toggleInList} isDesktop={isDesktop} isMobile={isMobile} />} />
            <Route path='/agents/:id' element={<PageAgent />} />
            <Route path='/sitemap' element={<PageSiteMap />} />
            <Route path='/' element={<PageHome isMobile={isMobile} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <AppFooter />
      </BrowserRouter>
  </>)
}

export default App;

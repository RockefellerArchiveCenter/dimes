import React, { useEffect, useRef, useState } from 'react';
import { LiveAnnouncer } from 'react-aria-live';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import SkipLink from './components/SkipLink';
import PageAgent from './components/PageAgent';
import PageRecords from './components/PageRecords';
import PageDigitalObject from './components/PageDigitalObject';
import PageHome from './components/PageHome';
import PageMyList from './components/PageMyList';
import PageSearch from './components/PageSearch';
import PageNotFound from './components/PageNotFound';
import { fetchMyList, isItemSaved, removeItem, saveItem, saveMyList } from './components/MyListHelpers';
import { useResizeObserver } from './components/Hooks';

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
  }

  const toggleInList = item => {
    const saved = isItemSaved(item)
    saved ? removeItem(item) : saveItem(item)
    setMyListCount(countMyList())
    return !saved
  }

  useEffect(() => {
    setMyListCount(countMyList())
  }, [])

  return (<LiveAnnouncer>
    <SkipLink />
    <Header myListCount={myListCount} />
      <div className='wrapper' ref={mainWrapper}>
        <BrowserRouter>
          <Routes>
            <Route path='/list' element={<PageMyList removeAllListItems={removeAllListItems} toggleInList={toggleInList} />} />
            <Route path='/search' element={<PageSearch />} />
            <Route path='/:type/:id/view' element={<PageDigitalObject />} />
            <Route path='/:type/:id' element={<PageRecords myListCount={myListCount} toggleInList={toggleInList} isDesktop={isDesktop} isMobile={isMobile} />} />
            <Route path='/agents/:id' element={<PageAgent />} />
            <Route exact path='/' element={<PageHome isMobile={isMobile} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  <Footer/>
  </LiveAnnouncer>)
}

export default App;

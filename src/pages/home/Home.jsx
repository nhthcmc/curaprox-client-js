import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Category from './pages/categories/Category'
import Ads from './pages/ads/Ads'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import images from '@/images'
import './home.scss'
import { Flex } from 'antd'

export default function Home() {
  const location = useLocation();
  // const categoryStore = useSelector(store => store.categoryStore)
  const toHomePage = location.pathname === '/';
  return (
    <div className='homePage'>
      <div>
        <Header />
      </div>
      <div style={{ display: "flex", justifyContent: "center", zIndex:"-1" }}>
        {toHomePage && <Ads />}
      </div>
      <div className='homePageBody'>

        {/* {toHomePage && <Category categoryStore={categoryStore} />} */}
        <div className='body_content'>
          <img className='banner' src={images.banner} />
          {/* <Ads /> */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

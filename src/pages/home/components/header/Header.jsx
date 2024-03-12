import React from 'react'
import './header.scss'
import images from '@/images'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap';
import { userAction } from '@slices/user.slice'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom'
// import MutilpleLanguage from '../../../../components/multiLang/MultiLang';

export default function Header() {
  const textStyle = {
    textTransform: 'uppercase',
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userStore = useSelector(store => store.userStore)
  const categoryStore = useSelector(store => store.categoryStore)
  const orderStore = useSelector(store => store.orderStore)
  const menu = [
    {
      title: "toothbrushes",
      link: "category",
      children: null
    },
    {
      title: "sonic toothbrush",
      link: "category",
      children: null
    },
    {
      title: "toothpaste",
      link: "category",
      children: null
    },
    {
      title: "interdental",
      link: "category",
      children: null
    }
  ]
    .map(item => {
      if (item.title == "toothbrushes") {
        return {
          ...item,
          children: item.children ? [...item.children, { title: "toothbrushes" }] : [{ title: "toothbrushes " }]
        };
      }
      return item;
    })

  return (
    <header>
      {/* nav */}
      <nav className='nav-container'>
        <div className="left">
          <div className="slogan">
            <img src={images.navSW} alt='sw' />
            <span>
              SWISS PREMIUM ORAL CARE
            </span>
          </div>
        </div>
        <div className='center'>
          {/* <MutilpleLanguage /> */}
        </div>
        <div className="right">
          <div className="lang">
            <span className="active">
              <img src={images.langEN} alt="en" />
            </span>
            <span style={{ paddingLeft: '5px' }}>
              <img src={images.langVI} alt="vi" />
            </span>
          </div>
        </div>
      </nav>
      {/* header */}
      <div className='header_container'>
        <div className='left'>
          <div className='logo'>
            <img onClick={() => {
              window.location.href = '/'
            }} src={images.logo} alt='logo' />
          </div>
        </div>
        <div className='categ'>
          {
            menu.map(item => (
              <div onClick={() => {
                if (item.link) {
                  navigate(`/${item.link}/${item.title}`)
                }
              }} style={textStyle} className={`item ${item.children && "sub"}`} key={Date.now() * Math.random()}>
                {item.title}
              </div>
            ))
          }
        </div>
        <div className='right'>
          <span className="material-symbols-outlined">search</span>
          <span className='cart-container' onClick={() => {
            navigate("/cart")
          }}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className='item cartCount'>
              ({
                orderStore.cart?.detail?.reduce((total, cur) => {
                  return total + cur.quantity
                }, 0) || 0
              })
            </span>
          </span>
          {
            userStore.data ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <div className='user'>
                    <span> Hi {isNaN(Number(userStore.data.userName)) ? userStore.data.userName : userStore.data.email.split('@')[0]}!</span>
                    <img src={userStore.data.avatar} />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ zIndex: '9999' }}
                >
                  <Dropdown.Item onClick={() => {
                    window.location.href = "/admin"
                  }}>Admin</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    window.location.href = "/profile"
                  }}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    Modal.confirm({
                      title: "Logout",
                      content: "Confirm logout?",
                      onOk: () => {
                        localStorage.removeItem("token")
                        dispatch(userAction.setData(null))
                      }
                    })
                  }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div onClick={() => {
                window.location.href = '/authen';
              }} className='user_authen'>
                <span className="material-symbols-outlined" id="login-button">account_circle</span>
              </div>
            )
          }
        </div>
      </div>
    </header>
  )
}

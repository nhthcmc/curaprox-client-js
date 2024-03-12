import React, { useState } from 'react'
import images from '@/images'
import { Dropdown } from 'react-bootstrap';
import MenuBtn from '@components/menu_btn/MenuBtn.jsx'
import { useDispatch } from 'react-redux';
import { userAction } from '@slices/user.slice'
import { Modal } from 'antd';

export default function Navbar({ userStore, menuState, setMenuState }) {
  const dispatch = useDispatch()
  return (
    <nav>
      <div className='logo'>
        <img src={images.logoAd} />
        <MenuBtn onClickFn={setMenuState} open={menuState} />
      </div>
      <div className='user'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <span>Welcome, Admin</span>
            <img src={userStore.data?.avatar} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              window.location.href = "/"
            }}>Homepage</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              Modal.confirm({
                title: "Logout",
                content: "Confirm logout?",
                onOk: () => {
                  dispatch(userAction.setData(null))
                  localStorage.removeItem("token")
                  window.location.href = "/"
                }
              })
            }}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  )
}

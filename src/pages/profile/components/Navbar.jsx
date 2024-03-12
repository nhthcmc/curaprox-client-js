import React from "react";
import images from '@/images'
import { Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAction } from '@slices/userSlice'
import { Modal } from 'antd';

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)
    const orderStore = useSelector(store => store.orderStore)
    return (
        <div className='header_container'>
            <div className='left'>
                <div className='logo'>
                    <img onClick={() => {
                        window.location.href = '/'
                    }} src={images.logo} alt='logo' />
                </div>
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
                            <Dropdown.Menu>
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
    )
}
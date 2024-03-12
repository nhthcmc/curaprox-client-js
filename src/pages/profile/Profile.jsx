import React, { useEffect, useState } from 'react'
import './profile.scss'
import Navbar from './components/Navbar'
import Container from './components/Container';
import Info from './pages/info/Info';
import Order from './pages/orders/Order';
// import AddressCreateForm from './pages/address/AddressCreateForm';
// import List from './pages/address/List';

import { useSelector } from 'react-redux';

export default function Profile() {
    const [menuState, setMenuState] = useState(false);
    const userStore = useSelector(store => store.userStore)

    return (
        <div className='profile'>
            <Navbar />
            <Container />
            <div className='body'>
                <Info />
                <Order />
                {/* <List /> */}
                {/* <AddressCreateForm /> */}
                {/* <div className='name'>Username</div> */}
                {/* <ul>
                    <li>Info</li>
                    <li>Address</li>
                    <li>Orders</li>
                </ul> */}
            </div>
        </div>
    )
}

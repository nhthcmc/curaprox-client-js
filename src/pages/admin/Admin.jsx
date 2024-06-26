import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import './admin.scss'
import Container from './components/Container'
export default function Admin() {
    const [menuState, setMenuState] = useState(false);
    const userStore = useSelector(store => store.userStore)

    useEffect(() => {
        if (!userStore.data) {
            alert("Permission Denined")
            window.location.href = "/"
            return
        }
        if (userStore.data.role != "admin") {
            alert("Permission Denined")
            window.location.href = "/"
            return
        }
    }, [userStore.data])
    return (
        <>
            {
                userStore.data?.role == "admin" && (
                    <div style={{ color: 'black' }} className='adminPage'>
                        <Navbar menuState={menuState} setMenuState={setMenuState} userStore={userStore} />
                        <Container menuState={menuState} />
                    </div>
                )
            }
        </>
    )
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '@slices/user.slice'
import { useNavigate } from 'react-router-dom'

export default function Info() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)
    return (
        < div className='info' >
            {
                userStore.data ? (
                    <>
                        <span className='title'>Info</span>
                        <div className='content'>
                            <div className='avatar'>
                                <img src={userStore.data.avatar} />
                                <input type='file'>
                                </input>
                            </div>
                            <div className='name'>
                                <label>Name</label>
                                <span>{isNaN(Number(userStore.data.userName)) ? userStore.data.userName : userStore.data.email.split('@')[0]}</span>
                            </div>
                            <div className='email'>
                                <label>Email</label>
                                <span>{userStore.data.email}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div onClick={() => {
                        window.location.href = '/info'
                    }} className='profile-info'>
                    </div>
                )
            }
        </div >
    )
}

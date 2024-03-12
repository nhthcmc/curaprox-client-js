import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AddressCreateForm from './AddressCreateForm';

export default function List() {
    const dispatch = useDispatch()
    const addressStore = useSelector(store => store.addressStore)
    return (
        <div className='address'>
            <span className='title'>Address Book</span>
            {
                addressStore.addModal && <AddressCreateForm dispatch={dispatch} />
            }
            <button className='new-btn'>Add new address</button>
            <div className='content'>
                {/* {
                    addressStore.data?.map((address, index) => {
                return ( */}
                <div className='line'>
                    <div className='name'>HT</div>
                    <div className='add'>
                        <label>Address: </label>
                        <span>HCM</span>
                    </div>
                    <div className='tel'>
                        <label>Tel: </label>
                        <span>09000</span>
                    </div>
                    <div className='actions'>
                        <button className='edit-btn'>Edit</button>
                        <button className='del-btn'>Delete</button>
                    </div>


                </div>
                {/* )
                })
                } */}
            </div>
        </div>
    )
}
import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

export default function Container() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const menu = [
        {
            title: 'Info',
        },
        {
            title: 'Address',
        },
        {
            title: 'Orders',
        }
    ]
    return (
        <div className="profile_container">
            <div className="menuBar"></div>
            <div className="content">
                {/* <div className='breadcrumb'>Home/ Profile</div> */}
                <div className="body">
                    <Outlet />
                </div>
            </div>
        </div>
    )

}
import React from 'react'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { productAction } from '@slices/productSlice'
import { useDispatch } from 'react-redux'

export default function Container({ menuState }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const menus = [{
        title: 'Products',
        child: [
            {
                title: "Add",
                link: null,
                fn: () => {
                    dispatch(productAction.loadModal())
                    navigate("product/list")
                }
            },
            {
                title: "List",
                link: "product/list",
                fn: null
            },
            {
                title: "Deleted",
                link: "product/deleted",
                fn: null
            }
        ]
    }]
    return (
        <div className='admin_container'>
            <div className={`${menuState && "hidden"} menuBar`}>
                {
                    menus.map(item => (
                        <div key={Date.now() * Math.random()} className='menuItem'>
                            <button onClick={(e) => {
                                let targetEl = e.target.parentNode.querySelector('.menuItemSub');
                                if (targetEl.classList.length > 1) {
                                    targetEl.classList.remove("hidden")
                                } else {
                                    targetEl.classList.add("hidden")
                                }
                            }}
                                className='menu_item_main btn btn-dark'
                            >
                                {item.title}
                            </button>
                            <ul className='menu_item_sub'>
                                {
                                    item.child?.map(subItem => (<li onClick={() => {
                                        if (subItem.fn) {
                                            subItem.fn()
                                        } else {
                                            navigate(subItem.link)
                                        }
                                    }} key={Date.now() * Math.random()}>{subItem.title}</li>))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
            <div className='content'>
                <div className='history'>
                    <span>Home</span>
                    <span>Admin</span>
                    <span>Products</span>
                </div>
                <div className='content_body'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

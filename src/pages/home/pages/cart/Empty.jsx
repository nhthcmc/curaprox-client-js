import React from 'react'
import './cart.scss'
import images from '@/images'

export default function Empty() {
    return (
        <div className='empty'>
            <img src={images.empty} />
        </div>
    )
}

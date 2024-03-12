import React from 'react'
import "./cart.scss"
import images from '@/images'

export default function Done() {
    return (
        <div className='done'>
            <img src={images.done} />
            <span className='title'>Order placed</span>
            <span className='text'>Thank you for shopping with us</span>
        </div>
    )
}

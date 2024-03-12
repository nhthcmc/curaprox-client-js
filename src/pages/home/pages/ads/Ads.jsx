import React from 'react'
import './ads.scss'
import images from '@/images'

export default function Ads() {
    return (
        <div className='ads'>
            <video autoPlay muted loop id="ads-video">
                <source src={images.video} type="video/mp4" />
            </video>
            <div className='banners'>
                <img src={images.ban1} />
                <img src={images.ban2} />
            </div>
        </div>
    )
}

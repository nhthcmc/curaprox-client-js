import React from 'react'
import './footer.scss'
import images from '@/images'

export default function Footer() {
  return (
    <footer>
      <div className='subscribe'>
        <div className='news'>
          <h1>JOIN OUR NEWSLETTER</h1>
          <p>Get a code for 5% off your first order when you sign up for our newsletter. You'll receive the latest offers, oral care tips, and more straight to your inbox.</p>
          <p>By subscribing, you confirm you have read and agree to our Privacy Policy.</p>
        </div>
        <div className='join'>
          <form>
            <label className='email'>
              <input placeholder='Email' />
            </label>
            <label className='name'>
              <input placeholder='First name' />
              <input placeholder='Last name' />
            </label>
            <button type='submit'>Submit</button>
          </form>

        </div>

      </div>
      <div className='info'>
        <div className='contact'>
          <ul className='help'>
            <span>Help</span>
            <li>Helpcenter</li>
            <li>Contact us</li>
            <li>Payment & delivery</li>
            <li>Warranty & Returns</li>
            <li>How do I redeem a voucher?</li>
          </ul>

          <ul className='account'>
            <span>Your account</span>
            <li>Personal info</li>
            <li>Orders</li>
            <li>Addresses</li>
            <li>Vouchers</li>
            <li>Register product</li>
          </ul>

          <ul className='about'>
            <span>About CURAPROX</span>
            <li>Curaprox Shops Worldwide</li>
            <li>About us</li>
            <li>Access B2B Shop</li>
          </ul>
        </div>
        <div className='cards'>
          {/* <img src={images.mc} /> */}
        </div>
      </div>
      <div className='bottom'>
        <div className="left">
          <span className="credit">© CURADEN AG  All rights reserved</span>
        </div>
        <div className="right">
          <ul className="social">
            <li>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </li>
            <li>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="left">
                <h1>RESTaurant</h1>
               <p>Bold flavors. Fresh vibes.
A modern dining experience for the flavor-obsessed.
Eat well. Chill hard. Come again.

</p>
               <div className="social-icons">
                    <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className="center">
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </div>
            <div className="right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-222-456-7890</li>
                    <li>contact@RESTaurant.com</li>
                </ul>
            </div>
        </div>
         <hr />
         <p className="copyright">
             Copyright 2025 © RESTaurant.com - All Right Reserved.          
         </p>
    </div>
  )
}

export default Footer

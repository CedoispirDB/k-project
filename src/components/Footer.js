import React from 'react'
import "./css/Footer.css"
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer_container'>
            <div className='site_name'>K-Project</div>
            <div className='social_container'>
                <a href='https://www.facebook.com/marco.dato.92/' className='social_icon' target="_blank" >
                    <i className='fab fa-facebook'></i>
                </a>
                <a href='https://www.instagram.com/marcodato1/' className='social_icon' target="_blank" >
                    <i className='fab fa-instagram'></i>
                </a>
                <a href='https://twitter.com/Bolodecenoura8' className='social_icon' target="_blank" >
                    <i className='fab fa-twitter'></i>
                </a>
            </div>
        </div>
    )
}

export default Footer

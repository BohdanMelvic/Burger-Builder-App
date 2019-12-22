import React from 'react'
import './Logo.scss'
import burgerLogo from '../../assets/img/burger-logo.png'

export default function Logo(props) {
    return (
        <div className='Logo'> 
            <img src={burgerLogo} alt="Logo"/>
        </div>
    )
}

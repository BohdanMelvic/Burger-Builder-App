import React from 'react'
import './Modal.scss'

export default function Backdrop(props) {
    return (
        <div className='Modal'>
            {props.children}
        </div>
    )
}

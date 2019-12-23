import React from 'react';
import './DrawerToggle.scss'

export default function DrawerToggle(props) {
    return (
        <div 
            onClick={props.clicked}
            className='DrawerToggle'
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

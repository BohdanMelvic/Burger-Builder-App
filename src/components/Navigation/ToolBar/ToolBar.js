import React from 'react';
import './ToolBar.scss'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export default function ToolBar(props) {
    return (
        <header className='ToolBar'>
            <div>MENU</div> 
            <div className='ToolBarLogo'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems />
            </nav>     
        </header>
    )
}

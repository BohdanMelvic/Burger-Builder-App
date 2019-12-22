import React from 'react';
import './ToolBar.scss'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

export default function ToolBar(props) {
    return (
        <header className='ToolBar'>
            <div>MENU</div>
            <Logo />
            <NavigationItems />
        </header>
    )
}

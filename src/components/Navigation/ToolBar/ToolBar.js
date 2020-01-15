import React from 'react';
import './ToolBar.scss'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

export default function ToolBar(props) {
    return (
        <header className='ToolBar'>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className='ToolBarLogo'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>     
        </header>
    )
}

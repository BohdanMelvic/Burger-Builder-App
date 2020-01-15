import React from 'react';
import './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem';

export default function NavigationItems(props) {
    return (
       <ul className='NavigationItems'>
           <NavigationItem link='/' exact>Burger Builder</NavigationItem>
           { props.isAuthenticated ? <NavigationItem  link='/orders'>Orders</NavigationItem> : null}
           { !props.isAuthenticated 
            ? <NavigationItem  link='/auth'>Authenticate</NavigationItem> 
            :  <NavigationItem  link='/logout'>Log Out</NavigationItem>}
       </ul>
    )
}

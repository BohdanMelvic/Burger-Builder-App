import React from 'react';
import './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem';

export default function NavigationItems(props) {
    return (
       <ul className='NavigationItems'>
           <NavigationItem link='/' active>Burger Builder</NavigationItem>
           <NavigationItem  link='/'>Checkout</NavigationItem>
       </ul>
    )
}

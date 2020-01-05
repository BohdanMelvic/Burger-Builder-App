import React from 'react';
import './NavigationItem.scss';
import { NavLink } from 'react-router-dom';

export default function NavigationItem(props) {
    return (
       <li className='NavigationItem'>
           <NavLink 
            to={props.link}
            activeClassName='active'
            exact={props.exact}
           >
               {props.children}
            </NavLink>
        </li>
    )
}

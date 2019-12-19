import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import './Layout.scss'

export default function Layout(props) {
    return (
        <Auxiliary>
            <div>
                Toolbar, Sidebar, Backdrop
            </div>
            <main className='Content'>
                {props.children}
            </main>
        </Auxiliary>
    )
}

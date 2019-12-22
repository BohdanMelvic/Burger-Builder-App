import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import './Layout.scss'
import ToolBar from '../Navigation/ToolBar/ToolBar';

export default function Layout(props) {
    return (
        <Auxiliary>
            <ToolBar />
            <main className='Content'>
                {props.children}
            </main>
        </Auxiliary>
    )
}

import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheeese'},
    {label: 'Meat', type: 'meat'}
]

export default function BuildControls(props) {
    return (
        <div className='BuildControls'>
            {controls.map( element => 
                <BuildControl 
                    label={element.label} 
                    type={element.type} 
                    key={element.type}
                />
            )}
        </div>
    )
}

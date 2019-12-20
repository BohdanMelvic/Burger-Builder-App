import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

export default function BuildControls(props) {
    return (
        <div className='BuildControls'>
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map( element => 
                <BuildControl 
                    label={element.label}  
                    key={element.type}
                    add={() => props.ingredientAdd(element.type)}
                    less={() => props.ingredientLess(element.type)}
                />
            )}
            <button 
                className='OrderButton'
                disabled={!props.purchaseAble}
            >Order Now</button>
        </div>
    )
}

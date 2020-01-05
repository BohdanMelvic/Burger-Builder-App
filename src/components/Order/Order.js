import React from 'react';
import './Order.scss'

export default function Order(props) {
    const ingredients = [];

    for ( let ingName in props.ingredients) {
        ingredients.push({ name: ingName, amount: props.ingredients[ingName]});
    }

    const ingredientsOutpput = ingredients.map( ing => {
        return (
            <span key={ing.name}>{ing.name}  {ing.amount} </span>
        )
    });

    return (
        <div className='Order'>
            <p>Ingredients: {ingredientsOutpput} </p>
            <p>Price: <strong>USD {props.price.toFixed(2)} </strong></p>
        </div>
    )
}

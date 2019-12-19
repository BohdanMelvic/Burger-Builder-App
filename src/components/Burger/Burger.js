import React from 'react'
import './Burger.scss'
import BurgerIgredient from './BurgerIgredient/BurgerIgredient'

export default function Burger(props) {
    
    const ingredientsList = Object.keys( props.ingredients );
    let transformedIngredients = ingredientsList.map( (igKey) => {
        return [ ...Array(props.ingredients[igKey] )].map( (_, i) => {
            return <BurgerIgredient key={igKey + i} type={igKey} />;
        });
    }).reduce( (arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className='Burger'>
            <BurgerIgredient type='bread-top'/>
            {transformedIngredients} 
            <BurgerIgredient type='bread-bottom'/>
        </div>
    )
}

import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ingredients: {
                 salad: 0,
                 bacon: 0,
                 cheese: 0,
                 meat: 0
             },
             totalPrice: 4
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;

        const priceAddition = ingredientPrices[type];
        const oldPrice = this.state.totalPrice;

        this.setState({
            ingredients: updateIngredients, 
            totalPrice: oldPrice + priceAddition
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount - 1 >= 0) {
            const updateCounted = oldCount - 1;
            const updateIngredients = {
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCounted;
    
            const priceAddition = ingredientPrices[type];
            const oldPrice = this.state.totalPrice;
    
            this.setState({
                ingredients: updateIngredients, 
                totalPrice: oldPrice - priceAddition
            });
        }
        
    }
    
    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler}
                    ingredientLess={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder

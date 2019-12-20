import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
             totalPrice: 4,
             purchaseAble: false,
             purchasing: false
        }
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce( (s, i) => s + i, 0);

        this.setState({purchaseAble: sum > 0})
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
        this.updatePurchaseState(updateIngredients);
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
            this.updatePurchaseState(updateIngredients);
        }  
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    
    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler}
                    ingredientLess={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchaseAble={this.state.purchaseAble}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder

import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             ingredients: {
             },
             totalPrice: 4,
             purchaseAble: false,
             purchasing: false,
             loading: false
        }
    };

    componentDidMount() {
        axios({
            method: 'get',
            url: '/ingredients.json',
            responseType: 'json',
            headers: {"Access-Control-Allow-Origin": "*"}
          }).then( res => {
            this.setState({ingredients: res.data});
        })
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    render() {
        let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
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

export default ErrorHandler(BurgerBuilder, axios);

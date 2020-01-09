import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             purchaseAble: false,
             purchasing: false,
             loading: false
        }
    };

    componentDidMount() {
        // axios({
        //     method: 'get',
        //     url: '/ingredients.json',
        //     responseType: 'json',
        //     headers: {"Access-Control-Allow-Origin": "*"}
        //   }).then( res => {
        //     this.setState({ingredients: res.data});
        // });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce( (s, i) => s + i, 0);

        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];

        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }

        // queryParams.push('price=' + this.props.price);

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
    }
    
    render() {
        let orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}
        />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdd={this.props.onIngredientAdd}
                    ingredientLess={this.props.onIngredientRemove}
                    price={this.props.price}
                    purchaseAble={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( ErrorHandler(BurgerBuilder, axios) );

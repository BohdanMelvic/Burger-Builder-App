import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             purchasing: false
        }
    };

    componentDidMount() {
        this.props.onInitIngridients();
        console.log(this.props)
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce( (s, i) => s + i, 0);

        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        // used code below before using redux

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

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render() {
        // let orderSummary = <OrderSummary 
        //     ingredients={this.props.ings}
        //     purchaseCancel={this.purchaseCancelHandler}
        //     purchaseContinue={this.purchaseContinueHandler}
        //     price={this.props.price}
        // />;

        // return (
        //     <Auxiliary>
        //         <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        //             {orderSummary}
        //         </Modal>
        //         <Burger ingredients={this.props.ings}/>
        //         <BuildControls 
        //             ingredientAdd={this.props.onIngredientAdd}
        //             ingredientLess={this.props.onIngredientRemove}
        //             price={this.props.price}
        //             purchaseAble={this.updatePurchaseState(this.props.ings)}
        //             ordered={this.purchaseHandler}
        //         />
        //     </Auxiliary>
        // )

        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdd={this.props.onIngredientAdd}
                        ingredientLess={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchaseAble={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />;
        }
       
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch( actions.addIngredient(ingName) ),
        onIngredientRemove: (ingName) => dispatch( actions.removeIngredient(ingName) ),
        onInitIngridients: () => dispatch( actions.initIngredients() ),
        onInitPurchase: () => dispatch( actions.purchaseInit() ),
        onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( ErrorHandler(BurgerBuilder, axios) );

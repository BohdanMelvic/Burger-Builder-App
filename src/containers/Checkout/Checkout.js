import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ingredients: {
                 salad: 2,
                 meat: 1,
                 cheese: 1,
                 bacon: 1
             }
        }
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout

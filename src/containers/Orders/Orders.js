import React, { Component } from 'react';
import './Orders.scss';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'

export class Orders extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             orders: [],
             loading: true
        }
    }
    

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                { this.state.orders.map( order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                )) }
            </div>
        )
    }
}

export default ErrorHandler(Orders, axios);

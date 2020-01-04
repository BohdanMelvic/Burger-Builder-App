import React, { Component } from 'react';
import './ContactData.scss'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             address: {
                 street: '',
                 postalCode: ''
             },
             loading: false
        }
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ioan',
                address: {
                    street: 'Tset 23',
                    zipCode: '42342',
                    country: 'Ukraine'
                },
                email: 'blalbal@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
        .then( response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch( error =>{ 
            console.log(error);
            this.setState({loading: false});
        });
    }
    
    render() {
        let form = (
            <form >
                <input type="text" name='name' placeholder='Your name'/>
                <input type="email" name='email' placeholder='Your email'/>
                <input type="text" name='street' placeholder='Your street'/>
                <input type="text" name='postalCode' placeholder='Your postal code'/>
                <Button 
                    btnType="Success" 
                    clicked={this.orderHandler}
                >Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className='ContactData'>  
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData

import React, { Component } from 'react';
import './ContactData.scss'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             orderForm: {
                name: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: ''
                },
                street: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your street'
                    },
                    value: ''
                },
                zipCode: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: ''
                },
                country: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your country'
                    },
                    value: ''
                },
                email: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    inputtype: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
             },
             loading: false
        }
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
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

    inputChangedHandler = (event, inputIdentif) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };

        const updatedFormElement = { ...updatedOrderForm[inputIdentif] };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentif] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    
    render() {
        const formElementsArr = [];

        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form >
                {formElementsArr.map(element => (
                    <Input 
                        key={element.id} 
                        elementType={element.config.inputtype} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                    />
                ))}

                {/* <Input inputtype='input' type="text" name='name' placeholder='Your name'/>
                <Input inputtype='input' type="email" name='email' placeholder='Your email'/>
                <Input inputtype='input' type="text" name='street' placeholder='Your street'/>
                <Input inputtype='input' type="text" name='postalCode' placeholder='Your postal code'/> */}

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

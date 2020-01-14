import React, { Component } from 'react';
import './ContactData.scss'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/indexActions';

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
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    inputtype: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
             },
             formValid: false
        }
    }

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};

        for (let formElemIndet in this.state.orderForm) {
            formData[formElemIndet] = this.state.orderForm[formElemIndet].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

       this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentif) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };

        const updatedFormElement = { ...updatedOrderForm[inputIdentif] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentif] = updatedFormElement;

        let formIsValid = true;

        for ( let inputElemIndet in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElemIndet].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
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
            <form onSubmit={this.orderHandler}>
                {formElementsArr.map(element => (
                    <Input 
                        key={element.id} 
                        elementType={element.config.inputtype} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        name={element.id}
                    />
                ))}

                {/* <Input inputtype='input' type="text" name='name' placeholder='Your name'/>
                <Input inputtype='input' type="email" name='email' placeholder='Your email'/>
                <Input inputtype='input' type="text" name='street' placeholder='Your street'/>
                <Input inputtype='input' type="text" name='postalCode' placeholder='Your postal code'/> */}

                <Button 
                    btnType="Success" 
                    disabled={!this.state.formValid}
                >Order</Button>
            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch( actions.purchaseBurger(orderData) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));

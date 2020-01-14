import React, { Component } from 'react';
import './Auth.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

export class Auth extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             controls: {
                email: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    inputtype: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                },
             }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
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

        return isValid;
    }
    

    render() {
        const formElementsArr = [];

        for (let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            formElementsArr.map(formElement => (
                <Input 
                    key={formElement.id} 
                    elementType={formElement.config.inputtype} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    name={formElement.id}
                />
            ))
        );
        return (
            <div className='Auth'>
                <form >
                    {form}
                    <Button 
                        btnType="Success" 
                       
                    >SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth

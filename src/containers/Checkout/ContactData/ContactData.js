import React, { Component } from 'react';
import './ContactData.scss'
import Button from '../../../components/UI/Button/Button';

export class ContactData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             address: {
                 street: '',
                 postalCode: ''
             }
        }
    }
    
    render() {
        return (
            <div className='ContactData'> 
                <h4>Enter your Contact Data</h4>
                <form >
                    <input type="text" name='name' placeholder='Your name'/>
                    <input type="email" name='email' placeholder='Your email'/>
                    <input type="text" name='street' placeholder='Your street'/>
                    <input type="text" name='postalCode' placeholder='Your postal code'/>
                    <Button btnType="Success" >Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData

import React from 'react';
import './CheckoutSummary.scss';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

export default function CheckoutSummary(props) {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div className='auxDiv'>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked >CANCEL</Button>
            <Button btnType="Success" clicked >CONTINUE</Button>
        </div>
    )
}

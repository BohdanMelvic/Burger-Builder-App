import React, { PureComponent } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';  

export class OrderSummary extends PureComponent {
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map( igKey => {
            return <li key={igKey}><span>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
             <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummary

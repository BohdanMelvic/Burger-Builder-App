import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Auxiliary>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder

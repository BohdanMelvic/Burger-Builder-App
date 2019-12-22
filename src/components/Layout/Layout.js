import React, { Component } from 'react';
import './Layout.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showSideDrawer: false
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    
    render() {
        return (
            <Auxiliary>
                <ToolBar />
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <main className='Content'>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;

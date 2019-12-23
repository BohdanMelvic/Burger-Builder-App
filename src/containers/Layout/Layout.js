import React, { Component } from 'react';
import './Layout.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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

    drawerToggleClickedHandler = () => {
        this.setState( (prevState) => {
           return { showSideDrawer: !prevState.showSideDrawer}
        });
    }
    
    render() {
        return (
            <Auxiliary>
                <ToolBar drawerToggleClicked={this.drawerToggleClickedHandler}/>
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

import React, { Component } from 'react';
import './Layout.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <ToolBar drawerToggleClicked={this.drawerToggleClickedHandler} isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

export default function ErrorHandler(WrappedComponent, axios) {

    return class extends Component {
        constructor(props) {
            super(props);
        
            this.state = {
                error: null 
            };

            this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
        }
        
        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use( (req) => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use( res => res, (error) => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.resInterceptors.request.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}
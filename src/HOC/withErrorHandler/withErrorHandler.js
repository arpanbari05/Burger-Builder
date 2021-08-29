import React, { Component } from 'react';
import Backdrop from '../../Components/Backdrop/Backdrop';
import Modal from '../../Containers/Burger/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error});
            })

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            }, 
            error => {
                this.setState({error: error})
            })

            // debugging purpose
            if (this.state.error) {
                console.log(this.state.error)
            }
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }

        errorComfiredHandler = () => {
            this.setState({ error: null });
        }

        render () {
            return (
                <Aux>
                    <Backdrop show={this.state.error} hide={this.errorComfiredHandler} />
                    <Modal purchasing={this.state.error} >
                        <p style={{color: "red"}}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
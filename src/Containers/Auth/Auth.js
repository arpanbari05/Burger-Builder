import React, { Component } from 'react';
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: true,
                        email: true
                    },
                    isValid: false,
                    touched: false
                }
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: true,
                        password: true
                    },
                    isValid: false,
                    touched: false
                }
            }
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = { ...this.state.authForm };
        const updatedFormElement = { ...updatedAuthForm[inputIdentifier] };
        updatedFormElement.elementValue = event.target.value;

        // validating
        const valid = this.isValid(updatedFormElement.elementValue, updatedFormElement.validation.required)
        updatedFormElement.validation.isValid = valid;

        // validating touched
        updatedFormElement.validation.touched = true;

        updatedAuthForm[inputIdentifier] = updatedFormElement;
        this.setState({ authForm: updatedAuthForm });
    }

    isValid = (value, required) => {
        let isValid = true;

        if (required.text) {
            isValid = value.trim() !== '';
        }

        if (required.email) {
            const emailValues = value.trim().split('@');
            isValid = (emailValues.length > 1) && value.trim().endsWith('.com');
        }

        if (required.password) {
            isValid = value.length >= 7;
        }

        return isValid;
    }

    onAuthHandler = (event, isSignUp) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.elementValue, this.state.authForm.password.elementValue, isSignUp);
    }

    errorMessageFormatter = (errorMessage) => {
        const errorValues = errorMessage.split('_');
        return errorValues.join(' ');
    }

    render() {

        const inputElements = [];

        for (let element in this.state.authForm) {
            inputElements.push({
                id: element,
                config: this.state.authForm[element]
            })
        };

        let form = inputElements.map(input => {

            return <Input key={input.id}
                inputtype={input.config.elementType}
                elementConfig={input.config.elementConfig}
                value={input.config.elementValue}
                changed={(event) => this.inputChangedHandler(event, input.id)}
                invalid={!input.config.validation.isValid}
                touched={input.config.validation.touched}
            />
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let error = null;

        if (this.props.error) {
            console.log(this.errorMessageFormatter(this.props.error));
            error = <p>{this.errorMessageFormatter(this.props.error)}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            let redirectPath = '/';
            redirectPath = this.props.isBuilding ? '/checkout' : '/';
            authRedirect = <Redirect to={redirectPath} />;
        }

        return (
            <div className={classes.Authentication}>
                {authRedirect}
                {error}
                <form>
                    {form}
                    <Button clicked={(event) => this.onAuthHandler(event, true)} type='continue'>Sign Up</Button>
                    <Button clicked={(event) => this.onAuthHandler(event, false)} type='cancel'>Sign in</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.tokenId !== null,
        isBuilding: state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
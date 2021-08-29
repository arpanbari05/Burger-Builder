import React, { Component } from 'react';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../Button/Button';
import classes from './ContactData.css';
import Input from '../../Input/Input';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../store/utility';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: true,
                        email: false
                    },
                    isValid: false,
                    touched: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: false,
                        email: true
                    },
                    isValid: false,
                    touched: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: true,
                        email: false
                    },
                    isValid: false,
                    touched: false
                }
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                elementValue: '',
                validation: {
                    required: {
                        text: true,
                        email: false
                    },
                    isValid: false,
                    touched: false
                }
            },
            deliveryMode: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {
                    required: {
                        text: false,
                        email: false
                    },
                    isValid: true,
                    touched: true
                }
            }

        },
        isFormValid: false
    }


    orderHandler = (event) => {
        event.preventDefault();

        const orderDetails = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            customer: {
                name: "Arpan Bari",
                deliveryMode: "Faster"
            },
            userId: this.props.userId
        }

        this.props.onPurchase(orderDetails, this.props.tokenId);

    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.elementValue = event.target.value;

        // validating
        const valid = this.isValid(updatedFormElement.elementValue, updatedFormElement.validation.required)
        updatedFormElement.validation.isValid = valid;

        // validating touched
        updatedFormElement.validation.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({ orderForm: updatedOrderForm });

        // validating isFormValid
        const validities = [];
        for (let input in updatedOrderForm) {
            validities.push(updatedOrderForm[input].validation.isValid);
        }

        const isFormValid = validities.every(validity => validity);
        this.setState({ isFormValid: isFormValid });

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

        return isValid;
    }

    render() {

        const inputElements = [];

        for (let element in this.state.orderForm) {
            inputElements.push({
                id: element,
                config: this.state.orderForm[element]
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

        let contactData = (
            <div className={classes.ContactData}>
                <h3>Enter your credentials</h3>
                {form}
                <Button
                    type='continue'
                    clicked={this.orderHandler}
                    disabled={!this.state.isFormValid} >
                    ORDER
                </Button>
            </div>
        );

        if (this.props.purchased || !this.props.ings) {
            contactData = <Redirect to='/' />
        }

        return contactData;

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: (orderDetails, tokenId) => dispatch(actions.purchase(orderDetails, tokenId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
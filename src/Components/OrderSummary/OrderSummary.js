import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Burger from '../../Containers/Burger/Burger';
import Button from '../Button/Button';
import ContactData from './ContactData/ContactData';
import classes from './OrderSummary.css';
import * as actions from '../../store/actions/index';

class OrderSummary extends Component {


    componentDidMount() {
        this.props.initPurchase();
    }

    // componentWillMount() {

    //     const queryParams = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;

    //     for (let param of queryParams.entries()) {
    //         if (param[0] === 'totalPrice') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]; 
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

    orderContinueHandler = () => {
        this.props.history.push('/checkout/checkout-form');
    }

    orderCancelHandler = () => {
        this.props.history.goBack();
    }

    render () {

        let orderSummary = <Redirect to='/' />
        if (this.props.ings) {
            orderSummary = (
                <div className={classes.OrderSummary}>
                    <h1>Hope this burger will be taste you delicious</h1>
                    <Burger ingredients={this.props.ings} />
                    <Button clicked={this.orderContinueHandler} type={'continue'}>CONTINUE</Button>
                    <Button clicked={this.orderCancelHandler} type={'cancel'}>CANCLE</Button>
                    <Route path={this.props.match.path + "/checkout-form"} component={ContactData} />
                </div>
            );
        }

        return orderSummary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderSummary));
import React, { Component } from "react";
import Checkout from "../../Components/Checkout/Checkout";
import Aux from "../../HOC/Aux";
import BuildControls from "../BuildControls/BuildControls";
import Burger from "../Burger/Burger";
import axios from "../../Axios";
import Spinner from "../../UI/Spinner/Spinner";
import Backdrop from "../../Components/Backdrop/Backdrop";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

const INGREDIENTS_PRICES = {
    meat: 0.4,
    salad: 0.2,
    bacon: 1,
    cheese: 0.7,
};

const INITIAL_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    };

    componentDidMount() {
        this.props.initIngredientHandler();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.history.push('/authentication');
        }
        
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
        this.props.history.goBack();
    };

    puchaseContinueHandler = () => {
        // let queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }

        // queryParams.push('totalPrice=' + this.state.totalPrice);

        // const searchQuery = queryParams.join('&')

        this.props.history.push({
            pathname: "/checkout",
        });
    };

    // addIngredientHandler = ( type ) => {

    //     // changes to the ingredients
    //     const ingredient = this.state.ingredients[type] + 1;
    //     const newIngredients = this.state.ingredients;
    //     newIngredients[type] = ingredient;

    //     // changes to the total price
    //     let newPrice = this.state.totalPrice;
    //     newPrice += INGREDIENTS_PRICES[type];

    //     this.setState({
    //         ingredients: newIngredients,
    //         totalPrice: newPrice,
    //         purchasable: newPrice > INITIAL_PRICE
    //     });
    // }

    // removeIngredientHandler = ( type ) => {
    //     if (this.state.ingredients[type] > 0) {
    //         const ingredient = this.state.ingredients[type] - 1;
    //         const newIngredients = this.state.ingredients;
    //         newIngredients[type] = ingredient;

    //         let newPrice = this.state.totalPrice;
    //         newPrice -= INGREDIENTS_PRICES[type];

    //         this.setState({
    //             ingredients: newIngredients,
    //             totalPrice: newPrice,
    //             purchasable: newPrice > INITIAL_PRICE
    //         });
    //     }
    // }

    isPurchasable = (totalPrice) => {
        if (totalPrice > INITIAL_PRICE) return true;
        else return false;
    };

    render() {
        let burger = this.props.error ? (
            <p style={{ textAlign: "center", color: "#fff", fontSize: "2rem" }}>
                Ingredients can't be loaded!
            </p>
        ) : (
            <Spinner />
        );
        let checkout = null;

        if (this.props.ings) {
            burger = [
                <Burger key={"burger"} ingredients={this.props.ings} />,
                <BuildControls
                    key={"build-controls"}
                    purchase={this.purchaseHandler}
                    isPurchasable={this.isPurchasable(this.props.totalPrice)}
                    fullPrice={this.props.totalPrice.toFixed(2)}
                    addHandler={(ingredientName) =>
                        this.props.addIngredientHandler(
                            ingredientName,
                            INGREDIENTS_PRICES[ingredientName]
                        )
                    }
                    removeHandler={(ingredientName) =>
                        this.props.removeIngredientHandler(
                            ingredientName,
                            INGREDIENTS_PRICES[ingredientName]
                        )
                    }
                    isAuthenticated={this.props.isAuthenticated}
                />,
            ];

            checkout = (
                <Checkout
                    price={this.props.totalPrice}
                    continuePurchase={this.puchaseContinueHandler}
                    cancelPurchase={this.purchaseCancelHandler}
                    isPurchasing={this.state.purchasing}
                    ingredients={this.props.ings}
                />
            );
        }

        // if (this.state.loading) {
        //     checkout = <Spinner />
        // }

        return (
            <Aux>
                <Backdrop
                    show={this.state.purchasing}
                    hide={this.purchaseCancelHandler}
                />
                {checkout}
                {burger}
            </Aux>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.tokenId !== null
    };
};

const dispatchMapToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName, ingredientPrice) =>
            dispatch(
                burgerBuilderActions.addIngredient(ingredientName, ingredientPrice)
            ),
        removeIngredientHandler: (ingredientName, ingredientPrice) =>
            dispatch(
                burgerBuilderActions.removeIngredient(ingredientName, ingredientPrice)
            ),
        initIngredientHandler: () =>
            dispatch(burgerBuilderActions.initIngredients()),
    };
};

export default connect(
    mapPropsToState,
    dispatchMapToProps
)(withErrorHandler(BurgerBuilder, axios));

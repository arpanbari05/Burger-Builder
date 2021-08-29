import axios from '../../Axios';
import React, {Component} from 'react';
import Order from '../../Components/Order/Order';
import classes from './Orders.css';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        // axios.get('/orders.json')
        // .then(res => {
        //     const orders = [];
        //     for (let i in res.data) {
        //         orders.push({ id: i, ingredients: res.data[i].ingredients, price: res.data[i].totalPrice})
        //     }
            
        //     this.setState({ orders: orders, loading: false})

        // })
        // .catch(error => {
        //     this.setState({ loading: false });
        //     return error;
        // });
        this.props.fetchOrders(this.props.tokenId, this.props.userId);
    }

    render() {

        let orders = (
             this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            })
        );

        if (this.props.loading) {
            orders = <Spinner />
        }

        return (
            <div className={classes.Orders}>
                { orders }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (tokenId, userId) => dispatch(actions.fetchOrders(tokenId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
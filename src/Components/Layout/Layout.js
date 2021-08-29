import React, { Component } from 'react';
import BurgerBuilder from '../../Containers/BurgerBuilder/BurgerBuilder';
import Aux from '../../HOC/Aux';
import SideDrawer from '../SideDrawer/SideDrawer';
import Toolbar from '../Toolbar/Toolbar';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import Logout from '../../Containers/Logout/Logout';
import { Route, Switch } from 'react-router-dom';
import Orders from '../../Containers/Orders/Orders';
import Authentication from '../../Containers/Auth/Auth';
import { connect } from 'react-redux';
import asyncComponent from '../../HOC/asyncComponent';

// Lazy loading
const asyncAuthentication = asyncComponent(() => import('../../Containers/Auth/Auth'));
const asyncLogout = asyncComponent(() => import('../../Containers/Logout/Logout'));
const asyncOrderSummary = asyncComponent(() => import('../../Components/OrderSummary/OrderSummary'));
const asyncOrders = asyncComponent(() => import('../../Containers/Orders/Orders'));

class Layout extends Component {

    state = {
        toggleSideDrawer: false
    }


    hideSideDrawerHandler = () => {
        this.setState({
            toggleSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState(
            (prevState) => {
                return { toggleSideDrawer: !prevState.toggleSideDrawer }
            }
        )
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/' exact component={BurgerBuilder} />
                <Route path='/authentication' component={asyncAuthentication} />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/authentication' component={asyncAuthentication} />
                    <Route path='/checkout' component={asyncOrderSummary} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/logout' component={asyncLogout} />
                </Switch>
            )
        }
        return (
            <Aux>
                {/* <div>Toolbar, Sidebar, Backdrop</div> */}
                <Toolbar clicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer open={this.state.toggleSideDrawer}
                    hideSideDrawer={this.hideSideDrawerHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <main>
                    {routes}
                </main>
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.tokenId !== null
    }
}

export default connect(mapStateToProps)(Layout);
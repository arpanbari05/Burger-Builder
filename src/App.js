import './App.css';
import Aux from './HOC/Aux';
import Layout from './Components/Layout/Layout';
import { Component } from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.authAuthLoginHandler();
  }

  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Layout />
        </Aux>
      </BrowserRouter>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    authAuthLoginHandler: () => dispatch(actions.authAutoAuthenticate())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));

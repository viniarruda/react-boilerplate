import React from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {StateProvider} from '../state';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../state/auth/reducers'
import { INITIAL_STATE as PRODUCT_INITIAL_STATE } from '../state/product/reducers'
import reducers from "../state/reducers";
import BaseStyles from './base-styles';
import PrivateRoute from './private-route'
import Content from '../components/content'
import Header from '../components/header'
import Login from '../views/login'
import Home from '../views/home'

const Root = props => {
    const initialState = {
      auth: AUTH_INITIAL_STATE,
      product: PRODUCT_INITIAL_STATE
    }
    return (
      <StateProvider initialState={initialState} reducer={reducers}>
        <BaseStyles />
        <Router>
          <>
            <Header />
            <Content>
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/home" component={Home} />
              </Switch>
            </Content>
          </>
        </Router>
      </StateProvider>
    )
};

export default Root

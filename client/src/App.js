//React and ReactRouter imports
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//Redux Imports
import {Provider} from 'react-redux'
import store from "./store"
import {loadUser} from './actions/auth'

//Component Imports
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/profile/Profile'
import CreateProfile from './components/profile/CreateProfile'
import Dashboard from './components/dashboard/Dashboard'
import Logout from './components/auth/Logout'
import NotFound from './components/routing/NotFound'

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store} >
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path = '/' component = {Landing} />
          <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/register' component = {Register} />
            <Route exact path = '/dashboard' component = {Dashboard} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/create-profile' component = {CreateProfile} />
            <Route exact path = '/logout' component = {Logout} />
            <Route component = {NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

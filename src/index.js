import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import './index.css'
import './config'
import reducers from './redux/reducer'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
import Register from './page/Register/Register'
import AuthorRouter from './page/AuthorRouter/AuthorRouter'
import Login from './page/Login/Login'
import Dashboard from './page/Dashboard/Dashboard'
import GeniusInfo from './page/GeniusInfo/GeniusInfo'
import BossInfo from './page/BossInfo/BossInfo'


/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
)

function render () {
  ReactDOM.render(
    (<Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthorRouter></AuthorRouter>
          <Switch>
            <Route path='/bossInfo' component={BossInfo}></Route>
            <Route path='/geniusInfo' component={GeniusInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>)
    , document.getElementById('root'));
}

render()
registerServiceWorker();

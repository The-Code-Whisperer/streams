import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Provider is a component from react redux that already comes with a store property that recognizes redux stores. This will allow us to use redux stores by using the special createStore function and storing it in a variable, and setting it to the Provider component's store property
import { createStore, applyMiddleware, compose } from 'redux'; // don't really need the applyMiddleware and compose modules from the redux library just yet, but we're importing it because it's necessary for redux devtools(?) and we're going to have middleware eventually anyway, so might as well wire it up now.
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
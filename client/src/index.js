import React from 'react'; // this is required to make React components
import ReactDOM from 'react-dom'; // this is required for the index.html file to understand react components when we render it to the #root div
import { Provider } from 'react-redux'; // Provider is something necessary to wrap the store inside, then we put our usual starting App component inside that
import { createStore, applyMiddleware, compose } from 'redux'; // this is for creating a store instead of using state, stores are better because they are server side instead of managing a bunch of state code in here, instead of a state which I think can be seen by a savvy client user because all this code is sent to the user
import reduxThunk from 'redux-thunk'; // this is the name of a middleware package, which is used for something I forgot, too bad this documentation was written only after initial coding xd. No wait it's just necessary to use a store instead of a state. Probably can learn more through redux store documentation.

import App from './components/App'; // by convention just call the first component App and put it in index.html's div with id root
import reducers from './reducers'; // react uses reducers and actions, that's what it's all about in order to make components function, rather than a bunch of procedural stuff which is hard to reuse and is easy to bug out. Kinda like procedural vs OO.

// documentation straight ripped from the redux devtools github, but replace reducer with reducers because we imported reducers above
// we don't have a preloaded state, so omit that documentation.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
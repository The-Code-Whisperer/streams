import React from 'react'; // this is required to make React components
import ReactDOM from 'react-dom'; // this is required for the index.html file to understand react components when we render it to the #root div
import { Provider } from 'react-redux'; // Provider is something necessary to wrap the store inside, then we put our usual starting App component inside that
import { createStore, applyMiddleware, compose } from 'redux'; // this is for creating a store instead of using state, stores are better because they are server side instead of managing a bunch of state code in here, instead of a state which I think can be seen by a savvy client user because all this code is sent to the user
import reduxThunk from 'redux-thunk'; // this is the name of a middleware package, which is used for something I forgot, too bad this documentation was written only after initial coding xd. No wait it's just necessary to use a store instead of a state. Probably can learn more through redux store documentation. No wait, it's not necessary for a store. It's LITERALLY just so action creators have the ability to return a function instead of just a action (action-formatted state object). Why can't they do that without it? Probably takes more memory.

import App from './components/App'; // by convention just call the first component App and put it in index.html's div with id root
import reducers from './reducers'; // react uses reducers and actions, that's what it's all about in order to make components function, rather than a bunch of procedural stuff which is hard to reuse and is easy to bug out. Kinda like procedural vs OO.

// this is slightly changed, we don't normally need "composeEnhancers" here because this app technically only needs the store using the createStore function, with the reducers wired, and no middleware (perhaps the middleware will be needed later). But this composeEnhancers is currently being introduced because redux devtools allows us to 1. inspect the state at any point between server requests 2. save the state data even when refreshing the page or navigating to a different url, as long as you use a debug session url when seeing the state and its changes for that debug session. It also possibly saves with entirely turning off the server by saving it in server state, as long as you retype the same debug session url (although that would be hard to remember!). 
// documentation straight ripped from the redux devtools github, but replace reducer with reducers because we imported reducers above
// we don't have a preloaded state, so omit that documentation (this will only come up if you look at the documentation).
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, 
  composeEnhancers(applyMiddleware(reduxThunk))
  ); // when creating the store, documentation shows that the first argument shows what affects the store (ie the reducers) which we need wired above imported from files, in the typical React format. The second is only here because of redux dev tools, or to apply middleware. Middleware is applied by the applyMiddleware function in the redux library (must be imported above) using an extra function to modify it (compose, also from the redux library). We add an option gained by the redux devtools google chrome extension accessible here by using window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ to alternately also apply a different middleware, that allows the extension's middleware to do some functions to the store (by the extension's use, it seems it is able to see and temporarily modify). We can also call applyMiddleware without any arguments (no reduxThunk)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
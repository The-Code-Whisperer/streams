// this is just where all those reducers were put into one name called combineReducers

import { combineReducers } from 'redux'; // need this to combine reducers and export all as one export
import { reducer as formReducer } from 'redux-form'; // see the documentation and cool stuff like wizard (though not used here I think) so we can have a form module (see how to use inside StreamForm.js and where that form template component gets placed) inside this reducer, and name it formReducer so we know it comes from redux-form library within this page. 
// also apparently it wraps the coding for response to onChange parts of the DOM, the action creator, and reducer, into one somehow??
// also we got this initially because we wanted to put in synchronous validation from redux-form.com


import authReducer from './authReducer'; // get these reducers from other pages where they have been pre-written. Could have written them here but convention is to put them in separate pages.
import streamReducer from './streamReducer';

export default combineReducers({ 
  auth: authReducer, // name them so we don't say "what in the world is this reducer?" So for example this one comes from authReducer.js
  form: formReducer,
  streams: streamReducer
});
import streams from '../apis/streams';


// for some history thingy, to be explained more later
import history from '../history';

// these are all just variables set so there are no typos on this page. Kinda dumb if you ask me but I guess it's a thing. when you see these variables down in the code just know that they are literally just the string of the variable name.
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

// NO IDEA WHAT THIS IS
import { Fragment } from 'react';




// ACTION CREATORS BABY THEY RETURN A TYPE! But how are they used again? Make an action creator. Wire them to the component using the connect helper. Call the action creator in the onSubmit helper function in StreamCreate.js or whereever else needed. Then the action creator will use axios to make a network request to the api. These are going to be asynchronous because they don't only happen the moment we load the page (in fact it will never happen only when we load the page).
export const signIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};


// when the user calls createStream it's going to be at the form creating a stream at localhost:3000/streams/create and clicking submit, so the input argument is formValues. This action creator has to be asynchronous, since the user does not submit the form the moment the page loads. This means that in the action creator, we have to return a function with "dispatch" as its argument, where the dispatch will act as the action creator in the sub function. Redux thunk is required to allow returning functions in action creators. Also since the entire content of the function returns another function, we can use a quick format. After making this action creator we'll go to the StreamCreate.js component and call it.

// dispatch and getState are returned from the outer function.
export const createStream = (formValues) => async (dispatch, getState) => {
  // make a request to the streams endpoint at localhost:3001, inputting formValues, and the currently signed in userId. This will create a stream because the restful convention on our API is that a post request to streams is to create a stream. How does the API know that though?
  // let's create a saved handler of the stream we just created. The response variable in this case will just contain an object with the formValues.
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  // as we've seen before, when using redux thunk and returning a function within a function so the action creator can be asynchronous, the inner function sends the final action creator using the dispatch function. So what's the purpose of the action creator dispatched when we already created the stream in the database? Simple, this dispatch will be used for modifying the page, using the response variable we attained as the result of the request. Also data is the only part of response we are interested in (can console.log it to see), so might as well specify right here.
  dispatch({ type: CREATE_STREAM, payload: response.data })
  history.push('/');
}

// task: make all the action creators. createStream has already been done, but we also need to list all records, get one particular record, update a record, and delete a record.
// if no argument info needed, just put empty brackets for the argument.
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = (id) => async (dispatch) => {
  // to put a variable in a URL you can use ES2015 syntax
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const editStream = (id, formValues) => async (dispatch, getState) => {
  // instead of using a put request which replaces the whole stream data object, use a patch request which only modifies the gives values.
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
}

// this was previously named deleteRecord. Now that this variable name has been changed, what might need to be changed in other pages? This is an action. A stream component would be calling this action creator. The reducer will probably not need it, but let's see anyway.
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`); // this is how you do a delete request in axios
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
}
















// export const createStream = (formValues) => async (dispatch, getState) => {
//   const { userId } = getState().auth
//   const response = await streams.post('/streams', { ...formValues, userId });
//   dispatch({ type: CREATE_STREAM, payload: response.data });
//   // Do some programmatic navigation to get the user back to the root route
//   history.push('/');
// }

// export const fetchStreams = () => async dispatch => {
//   const response = await streams.get('/streams');
//   dispatch({ type: FETCH_STREAMS, payload: response.data });
// }

// export const fetchStream = (id) => async dispatch => {
//   const response = await streams.get(`/streams/${id}`);
//   dispatch({ type: FETCH_STREAM, payload: response.data })
// }

// export const deleteStream = (id) => async dispatch => {
//   await streams.delete(`/streams/${id}`);
//   dispatch({ type: DELETE_STREAM, payload: id });
// }

// export const editStream = (id, formValues) => async dispatch => {
//   const response = await streams.patch(`/streams/${id}`, formValues)
//   dispatch({ type: EDIT_STREAM, payload: response.data })
//   history.push('/');
// }

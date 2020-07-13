// need this for some functions like omit and mapKeys
import _ from 'lodash';

// import {
//   CREATE_STREAM,
//   FETCH_STREAMS,
//   FETCH_STREAM,
//   DELETE_STREAM,
//   EDIT_STREAM
// } from '../actions/types';

// all this stuff will be imported into each action creator page to be used.
// based on the action, this reducer will return a new state.
export default (state = {}, action) => {
  switch (action.type) {
    case 'LIST_STREAMS':
      // returns a new object, first takes all the records in the old state and adds them in, then the second part takes the list of streams we just got back from our API, and creates a dictionary-style object out of it using mapKeys, with the keys inside the object being the ids of each stream. The ... adds each key-value pair into the new object.
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case 'GET_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'UPDATE_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_STREAM':
      // omit removes the 2nd argument from the first, returns as object, so no need to wrap it in curly braces.
      return _.omit(state, action.payload);
    default:
      return state;
  }
};


const colors = [
  { hue: 'green' },
  { hue: 'yellow' },
  { hue: 'blue' }
]

// takes an array and returns a similar object that looks like a python dictionary. They keys of the object will be the value paired to whatever key is the same as the second argument of mapKeys. Note that that will result in the value parts of the data!
_.mapKeys(colors, 'hue')
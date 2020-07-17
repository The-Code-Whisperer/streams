// Sample code!!
// Array based approach, meaning the state starts as an empty array, although usually it will already be full of previously made streams

// 
const streamReducer = (state=[], action) => {
  switch (action.type) {
    // if the action type sent by the action creator is EDIT_STREAM, the idea would be to return the state the same except for the one stream that was edited.
    case EDIT_STREAM:
      // return the result of this mapping function, where I go through each stream in the current state.
      return state.map(stream => {
        // if the currently mapped stream has an id similar to the one inside the action.payload stream data, return action.payload stream (by itself). This is the edited stream.
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          // if the id's do not match, then return the current stream by itself, untouched.
          return stream;
        }
        // this loop continues for each stream, returning a stream every time.
      });
      default:
        return state;
  }
};

// Object-based approach, meaning the state is initialized as an empty object
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      // use the json-server autogenerated id. This happened when the streams.create request was made. Need bracket to show that it is a new key. It's just shorthand for:
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

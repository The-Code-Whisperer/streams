import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default: // this case might happen just once as the application starts because... even though an action isn't sent, one starting one with INITIAL_STATE might get sent anyway? I forget.
      // don't put brackets around this, since it will return an empty object which is not the initial state.
      return state;
  }
};
import { UserData, setCurrentUser } from './actions';
import { ActionTypes } from './types';

const INITIAL_STATE = { currentUser: null };

export default function auth(
  state: UserData = INITIAL_STATE,
  action: setCurrentUser,
) {
  switch (action.type) {
    case ActionTypes.auth_SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}

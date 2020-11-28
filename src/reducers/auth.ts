import { SetAuthenticatedAction } from "../actions";

export interface AuthState {
  authenticated: boolean;
  payload: any;
}

export const initialAuthState: AuthState = {
  authenticated: false,
  payload: null,
};

type AcceptedAction = SetAuthenticatedAction;

export default (
  state: AuthState = initialAuthState,
  action: AcceptedAction
) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      console.log("setting action: ", action);
      return {
        ...state,
        authenticated: action.authenticated,
        payload: action.payload,
      };
    default:
      return state;
  }
};

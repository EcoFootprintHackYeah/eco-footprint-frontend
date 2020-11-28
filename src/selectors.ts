import { State } from "./reducers/stateTypes";

export const Selectors = {
  isAuthenticated: (state: State) => state.auth.authenticated,
};

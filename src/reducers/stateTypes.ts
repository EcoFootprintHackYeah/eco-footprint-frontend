import { AuthState, initialAuthState } from "./auth";

export type State = {
  auth: AuthState;
};

export const initialState: State = {
  auth: initialAuthState,
};

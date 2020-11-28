import { Action } from "redux";

export interface SetAuthenticatedAction extends Action {
    type: 'SET_AUTHENTICATED'
    authenticated: boolean
    payload: any
}

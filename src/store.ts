import { compose, createStore } from "redux";

import createRootReducer from "./reducers";

import { devToolsEnhancer } from "redux-devtools-extension";

export default createStore(createRootReducer(), devToolsEnhancer({}));

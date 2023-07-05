import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repoSlices from "./repoSlices"

const reducer = combineReducers({
    repoReducer: repoSlices
})

const store = configureStore({
    reducer,
})

export default store;
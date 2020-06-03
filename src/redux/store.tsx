import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import userReducer from "./user.reducer";

function loadFromLocalStorage(): undefined {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);

        return undefined;
    }
}

function saveToLocalStorage(state: any): void {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState)
    } catch (e) {
        console.log(e);
    }
}

const loggerMiddleware = createLogger();

const store = createStore(
    combineReducers({
        userReducer,
    }),
    loadFromLocalStorage(), // Preloaded state
    applyMiddleware(
        thunkMiddleware, // Makes it possible to dispatch
        loggerMiddleware, // Logs actions
    )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
import { todos as todosReducer } from "./reducers/index.js";

export function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(todosReducer);

export const dispatch = store.dispatch;
export const subscribe = store.subscribe;
export const getState = store.getState;

import { GET_TODOS } from "../actions/index.js";
import { initialState } from "../utils/data.js";

export function todos(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat(action.todo);
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { completed: !todo.completed })
      );
    case "CLEAR_COMPLETED":
      return state.filter((todo) => todo.completed !== true);
    case GET_TODOS:
    default:
      return state;
  }
}

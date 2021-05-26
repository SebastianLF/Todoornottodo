import { generateId } from "../utils/index.js";
import { dispatch } from "../createStore.js";
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOOGLE_TODO = "TOGGLE_TODO";

// declare dispatch action when user press 'Enter' on input focus.
export function addTodo(name) {
  dispatch(
    addTodoAction({
      id: generateId(),
      name,
      completed: false,
    })
  );
}

export function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

export function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

export function toggleTodoAction(id) {
  return {
    type: TOOGLE_TODO,
    id,
  };
}

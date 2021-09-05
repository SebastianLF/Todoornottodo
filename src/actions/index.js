import { generateId } from "../utils/index.js";
import { dispatch } from "../createStore.js";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOOGLE_TODO = "TOGGLE_TODO";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const GET_TODOS = "GET_TODOS";

function getTodosAction() {
  return {
    type: GET_TODOS,
  };
}

function clearCompletedAction() {
  return {
    type: CLEAR_COMPLETED,
  };
}

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOOGLE_TODO,
    id,
  };
}

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

export function getTodos() {
  dispatch(getTodosAction());
}

export function clearCompleted() {
  dispatch(clearCompletedAction());
}

export function toggleTodo(id) {
  dispatch(toggleTodoAction(id));
}

export function removeTodo(id) {
  dispatch(removeTodoAction(id));
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOOGLE_TODO = "TOGGLE_TODO";

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

import { subscribe, getState } from "/src/createStore.js";
import { addTodo } from "./actions/index.js";
import { addTodoToDom } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".todos__form-input")
    .addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        addTodo(event.target.value);
        event.target.value = "";
      }
    });

  subscribe(function getTodosSubscribe() {
    const todos = getState();
    const todosList = document.querySelector(".list");

    todosList.innerHTML = "";
    todos.forEach(addTodoToDom);
  });
});

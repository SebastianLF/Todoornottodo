import { subscribe, getState } from "./createStore.js";
import { addTodo, clearCompleted, getTodos } from "./actions/index.js";
import { addTodoToDom } from "./dom.js";
import { dispatch } from "./createStore.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".todos__form-input")
    .addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        addTodo(event.target.value);
        event.target.value = "";
      }
    });

  let filterChosen = "All";

  const allTodosButton = document.querySelector(".filters__item-all");
  const activeTodosButton = document.querySelector(".filters__item-active");
  const completedTodosButton = document.querySelector(
    ".filters__item-completed"
  );

  allTodosButton.addEventListener("click", () => {
    filterChosen = "all";
    getTodos();
  });
  activeTodosButton.addEventListener("click", () => {
    filterChosen = "active";
    getTodos();
  });
  completedTodosButton.addEventListener("click", () => {
    filterChosen = "completed";
    getTodos();
  });

  subscribe(function getTodosSubscribe() {
    const todos = getState();
    function filter(todos) {
      switch (filterChosen) {
        case "active":
          return todos.filter((todo) => todo.completed !== true);
        case "completed":
          return todos.filter((todo) => todo.completed === true);
        case "All":
        default:
          return todos;
      }
    }
    const todosFiltered = filter(todos);

    const todosList = document.querySelector(".list");
    const itemsLeft = document.querySelector(".list__items-left");
    const itemsLeftNumber = document.createElement("span");
    const itemsLeftLabel = document.createTextNode(
      todos.length === 1 ? " item left" : " items left"
    );
    const clearCompletedButton = document.querySelector(".list__items-clear");

    clearCompletedButton.addEventListener("click", () => {
      clearCompleted();
    });

    itemsLeft.innerHTML = "";
    itemsLeft.append(itemsLeftNumber);
    itemsLeft.append(itemsLeftLabel);
    itemsLeftNumber.textContent = todos.length;
    todosList.innerHTML = "";

    todosFiltered.forEach(addTodoToDom);
  });

  // dispatch initial state
  getTodos();
});

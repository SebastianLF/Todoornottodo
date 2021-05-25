import { createStore } from "/src/createStore.js";
import { todos as todosReducer } from "/src/reducers/index.js";
import {
  addTodoAction,
  removeTodoAction,
  toggleTodoAction,
} from "./actions/index.js";

const store = createStore(todosReducer);

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function removeTodoFromDom(node, id) {
  node.addEventListener("click", () => {
    store.dispatch(removeTodoAction(id));
  });
}

function toggleTodoToDom(node, todo) {
  node.addEventListener("click", () => {
    store.dispatch(toggleTodoAction(todo.id));
    console.log("node:", node);
  });
}

function addTodoToDom(todo) {
  const parent = document.querySelector(".list");
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  const listItemCompletable = document.createElement("div");
  listItemCompletable.classList.add("list-item__completable");
  listItem.appendChild(listItemCompletable);

  const selectBox = document.createElement("div");
  selectBox.classList.add("list-item__select-box");
  listItemCompletable.appendChild(selectBox);

  const select = document.createElement("div");
  select.classList.add("list-item__select");
  selectBox.appendChild(select);

  const text = document.createElement("div");
  text.classList.add("list-item__text");
  listItemCompletable.appendChild(text);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("list-item__cross");
  listItem.appendChild(removeBtn);

  const removeIcon = document.createElement("img");
  removeIcon.src = "./src/images/icon-cross.svg";
  removeIcon.classList.add("list-item__icon-cross");
  removeBtn.appendChild(removeIcon);

  text.innerHTML = todo.name;
  listItemCompletable.style.textDecoration = todo.completed
    ? "line-through"
    : "none";
  parent.appendChild(listItem);

  removeTodoFromDom(removeBtn, todo.id);
  toggleTodoToDom(listItemCompletable, todo);
}

function addTodo(event) {
  console.log(event);
  if (event.keyCode === 13) {
    store.dispatch(
      addTodoAction({
        id: generateId(),
        name: event.target.value,
        completed: false,
      })
    );
    event.target.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".todos__form-input")
    .addEventListener("keyup", addTodo);

  store.subscribe(function getTodosSubscribe() {
    const todos = store.getState();
    const todosList = document.querySelector(".list");

    console.log("todos:", todos);

    todosList.innerHTML = "";
    todos.forEach(addTodoToDom);
  });
});

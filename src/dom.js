import { handleAnimations } from "./animations.js";
import { dispatch } from "./createStore.js";
import { toggleTodoAction, removeTodoAction } from "./actions/index.js";

export function removeTodoFromDom(node, id) {
  node.addEventListener("click", (e) => {
    e.stopPropagation();
    dispatch(removeTodoAction(id));
  });
}

export function toggleTodoToDom(node, todo) {
  node.addEventListener("click", () => {
    dispatch(toggleTodoAction(todo.id));
  });
}

export function addTodoToDom(todo) {
  const parent = document.querySelector(".list");
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  const listItemCompletable = document.createElement("div");
  listItemCompletable.classList.add("list-item__completable");
  listItem.appendChild(listItemCompletable);

  const selectBox = document.createElement("div");
  selectBox.classList.add("list-item__select-box");
  listItemCompletable.appendChild(selectBox);

  const selectWrapper = document.createElement("div");
  selectWrapper.classList.add("list-item__select-wrapper");
  selectBox.appendChild(selectWrapper);

  const select = document.createElement("div");
  select.classList.add("list-item__select");
  selectWrapper.appendChild(select);

  const selectIcon = document.createElement("img");
  selectIcon.src = "./src/images/icon-check.svg";
  selectIcon.classList.add("list-item__icon-check");
  select.appendChild(selectIcon);

  const text = document.createElement("div");
  text.classList.add("list-item__text");
  listItemCompletable.appendChild(text);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("list-item__cross");
  listItem.appendChild(removeBtn);

  const removeIcon = document.createElement("img");
  removeIcon.src = "./src/images/icon-cross.svg";
  removeIcon.classList.add("list-item__icon-cross", "hidden");
  removeBtn.appendChild(removeIcon);

  text.innerHTML = todo.name;
  parent.appendChild(listItem);

  removeTodoFromDom(removeBtn, todo.id);
  toggleTodoToDom(listItemCompletable, todo);
  handleAnimations(
    listItem,
    listItemCompletable,
    select,
    selectWrapper,
    removeIcon,
    todo
  );
}

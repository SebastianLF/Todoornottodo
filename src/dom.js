import { handleAnimations } from "./animations.js";
import { toggleTodo, removeTodo } from "./actions/index.js";
import iconCheck from "./images/icon-check.svg";
import iconCross from "./images/icon-cross.svg";

export function removeTodoFromDom(node, id) {
  node.addEventListener("click", (e) => {
    e.stopPropagation();
    removeTodo(id);
  });
}

export function toggleTodoToDom(node, todo) {
  node.addEventListener("click", () => {
    toggleTodo(todo.id);
  });
}

function appendTo(parent, classes, tag, src) {
  let tagName = tag || "div";
  const child = document.createElement(tagName);

  if (src) child.src = src;
  if (Array.isArray(classes)) {
    classes.forEach((classString) => {
      child.classList.add(classString);
    });
  } else {
    child.classList.add(classes || "");
  }

  parent.appendChild(child);

  return child;
}

export function addTodoToDom(todo) {
  const parent = document.querySelector(".list");
  const listItem = appendTo(parent, "list-item", "li");
  const listItemCompletable = appendTo(listItem, "list-item__completable");
  const selectBox = appendTo(listItemCompletable, "list-item__select-box");
  const selectWrapper = appendTo(selectBox, "list-item__select-wrapper");
  const select = appendTo(selectWrapper, "list-item__select");
  const selectIcon = appendTo(
    select,
    "list-item__icon-check",
    "img",
    iconCheck
  );
  const text = appendTo(listItemCompletable, "list-item__text");
  const removeBtn = appendTo(listItem, "list-item__cross", "button");
  const removeIconClasses = ["list-item__icon-cross", "hidden"];
  const removeIcon = appendTo(removeBtn, removeIconClasses, "img", iconCross);

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

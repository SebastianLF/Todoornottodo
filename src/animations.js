export function handleAnimations(
  listItem,
  listItemCompletable,
  select,
  iconCheckWrapper,
  removeBtn,
  todo
) {
  listItem.addEventListener("mouseover", () => {
    iconCheckWrapper.classList.add("list-item__select-wrapper--active");
    removeBtn.classList.remove("hidden");
  });
  listItem.addEventListener("mouseleave", (event) => {
    iconCheckWrapper.classList.remove("list-item__select-wrapper--active");
    removeBtn.classList.add("hidden");
  });
  if (todo.completed) {
    listItemCompletable.classList.add("list-item__completable--completed");
    select.classList.add("list-item__select--completed");
    iconCheckWrapper.classList.add("list-item__select-wrapper--completed");
  }
}

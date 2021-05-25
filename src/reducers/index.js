export function todos(state = [], action) {
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
    default:
      return state;
  }
}

/*
{
  type: '...',
  todo: {
    id: 1,
    name: '...',
    completed: true
  }
}
*/

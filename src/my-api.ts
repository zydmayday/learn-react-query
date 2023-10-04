type Todo = {
  id: number;
  title: string;
};

const todos: Todo[] = [{ id: 1, title: "init" }];

export const getTodos = async () => {
  console.log('getTodos', todos);
  throw new Error("sorry");
  return todos;
};

export const postTodo = async (todo: Todo) => {
  todos.push(todo);
  return todos;
};

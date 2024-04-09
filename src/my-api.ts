import axios, { AxiosResponse } from "axios";

type Todo = {
  id: number;
  title: string;
};

export const getTodos = async (): Promise<Todo[]> => {
  const res: AxiosResponse<Todo[]> = await axios.get(
    "http://localhost:3000/todos"
  );
  return res.data;
};

export const postTodo = async (todo: Todo): Promise<Todo[]> => {
  await axios.post("http://localhost:3000/todos", todo);
  return await getTodos();
};

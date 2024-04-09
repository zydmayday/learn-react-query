import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getTodos, postTodo } from "./my-api";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isFetched, isFetching, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      console.log("added new todo");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isError) {
    return <div>Oh no!</div>;
  }

  if (isFetching) {
    return <div>Still fetching</div>;
  }

  if (isFetched) {
    return (
      <div>
        <ul>
          {data &&
            data.map((todo) => (
              <li key={todo.id}>
                {todo.id} - {todo.title}
              </li>
            ))}
        </ul>

        <button
          onClick={() => {
            mutation.mutate({
              id: Date.now(),
              title: "Do Laundry",
            });
          }}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

export default App;

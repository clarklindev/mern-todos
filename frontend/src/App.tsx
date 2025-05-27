import { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;
const API_URL = `${baseURL}/api/todos`;

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    const res = await fetch(API_URL);
    const data: Todo[] = await res.json();
    setTodos(data);
  };

  const addTodo = async (): Promise<void> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data: Todo = await res.json();
    setTodos([...todos, data]);
    setText("");
  };

  const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const data: Todo = await res.json();
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>TODOs</h1>
      <p>
        mern-todos NOTE: the backend is running on Render (free plan) - it spins
        down after 15 minutes of inactivity. each time the service starts again,
        it can take up to a minute it to get back online.
      </p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

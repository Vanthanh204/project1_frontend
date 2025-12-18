import { useEffect, useState, useCallback } from "react";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // 👉 1. loadTodos
  const loadTodos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // 👉 2. addTodo
  const addTodo = async () => {
    if (!title.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    setTitle("");
    loadTodos();
  };

  // 👉 3. deleteTodo (THÊM NGAY DƯỚI addTodo)
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    loadTodos();
  };

  // 👉 JSX RETURN
  return (
    <div className="app">
      <div className="card">
        <h1>📝 Todo App</h1>
        <h1>Bai Ktra _ DH52201450 _ ca</h1>

        <div className="input-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập công việc..."
          />
          <button onClick={addTodo}>Thêm</button>
        </div>

        {loading && <p>Đang tải...</p>}

        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t._id} className="todo-item">
              <span>{t.title}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(t._id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

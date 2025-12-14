import { useEffect, useState, useCallback } from "react";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTodos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

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

  return (
    <div className="app">
      <div className="card">
        <h1>📝 Todo App</h1>
        <p className="subtitle">Project 0 – React + Node + MongoDB</p>

        <div className="input-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập công việc..."
          />
          <button onClick={addTodo}>Thêm</button>
        </div>

        {loading && <p className="status">Đang tải dữ liệu...</p>}

        {!loading && todos.length === 0 && (
          <p className="status empty">Chưa có công việc nào 🚀</p>
        )}

        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t._id}>{t.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

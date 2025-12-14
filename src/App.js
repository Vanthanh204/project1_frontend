import { useEffect, useState, useCallback } from "react";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTodos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos([]);
      }
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
    loadTodos(); // reload sau khi thêm
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Todo App (Project 0)</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập công việc..."
      />
      <button onClick={addTodo} style={{ marginLeft: 10 }}>
        Thêm
      </button>

      {loading && <p>Đang tải...</p>}

      {!loading && todos.length === 0 && (
        <p>Chưa có công việc nào</p>
      )}

      <ul>
        {todos.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

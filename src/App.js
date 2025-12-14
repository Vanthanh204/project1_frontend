import { useEffect, useState } from "react";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
  setLoading(true);
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // 🔥 FIX QUAN TRỌNG
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      setTodos([]); // fallback an toàn
      console.error("API did not return array:", data);
    }
  } catch (err) {
    console.error(err);
    setTodos([]);
  }
  setLoading(false);
};
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

      <ul>
        {todos.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

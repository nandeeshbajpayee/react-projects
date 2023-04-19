import React, { useState } from 'react'
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId)
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      )
      setTodos(updatedTodos);
      setEditId(0)
      setTodo("")
      return;
    }




    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos])
      setTodo("")
    }
  }


  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id)
    setTodos([...delTodo])
  }
  const handleedit = (id) => {
    const editTodo = todos.find((i) => i.id === id)
    setTodo(editTodo.todo)
    setEditId(id);
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>TO DO LIST</h1>
        <form className='todoform' onSubmit={handleSubmit}>
          <input value={todo} type='text' onChange={(e) => setTodo(e.target.value)} />
          <button type='submit'>{editId ? "edit" : "go"}</button>
        </form>
        <ul>
          {todos.map((t) => (
            <li>
              <span className='todo' key={t.id}>{t.todo}</span>
              <button onClick={() => handleedit(t.id)}>edit</button>
              <button onClick={() => handleDelete(t.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App

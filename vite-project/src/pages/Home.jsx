import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection, getDocs, addDoc, deleteDoc, doc
} from "firebase/firestore";
import dayjs from "dayjs";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", detail: "", dueDate: "" });

  const todosRef = collection(db, "todos");

  const fetchTodos = async () => {
    const snapshot = await getDocs(todosRef);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodos(list);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTodo.title || !newTodo.dueDate) return;
    await addDoc(todosRef, {
      ...newTodo,
      dueDate: new Date(newTodo.dueDate),
      createdAt: new Date()
    });
    setNewTodo({ title: "", detail: "", dueDate: "" });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  const dDayText = (dueDate) => {
    const now = dayjs();
    const target = dayjs(dueDate.toDate());
    const diff = target.diff(now, "day");
    if (diff === 0) return "D-Day";
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  return (
    <div className="flex gap-10 p-10 bg-pink-100 min-h-screen">
      {/* To-do 리스트 */}
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">To-Do List</h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => handleDelete(todo.id)}
              dDayText={dDayText(todo.dueDate)}
            />
          ))}
        </ul>
      </div>

      {/* 추가 폼 */}
      <div className="w-1/2 bg-pink-200 p-6 rounded">
        <h2 className="text-lg font-semibold mb-2">할 일 추가</h2>
        <input
          className="block w-full p-2 mb-2 border rounded"
          placeholder="제목"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          className="block w-full p-2 mb-2 border rounded"
          placeholder="내용"
          value={newTodo.detail}
          onChange={(e) => setNewTodo({ ...newTodo, detail: e.target.value })}
        />
        <input
          type="datetime-local"
          className="block w-full p-2 mb-4 border rounded"
          value={newTodo.dueDate}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </div>
    </div>
  );
}
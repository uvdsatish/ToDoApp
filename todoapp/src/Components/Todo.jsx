import { useState, useEffect } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Form from "./Form";
import TodoList from "./TodoList";
import Footer from "./Footer";
export default function Todo() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage when component mounts
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Function to reset/clear all todos
  const resetTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };
  
  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;
  return (
    <div>
      <Form todos={todos} setTodos={setTodos} />
      <DndProvider backend={HTML5Backend}>
        <TodoList todos={todos} setTodos={setTodos} />
      </DndProvider>
      <Footer 
        completedTodos={completedTodos} 
        totalTodos={totalTodos} 
        resetTodos={resetTodos}
      />
    </div>
  );
}

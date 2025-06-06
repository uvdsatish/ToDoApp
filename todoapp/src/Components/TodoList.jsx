import TodoItem from "./TodoItem";
import styles from "./todoList.module.css";
export default function TodoList({ todos, setTodos }) {
  const sortedTodos = todos.slice().sort((a, b) => a.done - b.done);
  
  const moveTodo = (dragIndex, hoverIndex) => {
    const newTodos = [...todos];
    const draggedItem = newTodos[dragIndex];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, draggedItem);
    setTodos(newTodos);
  };
  
  return (
    <div className={styles.list}>
      {sortedTodos.map((item, index) => (
        <TodoItem
          key={item.name}
          item={item}
          index={index}
          todos={todos}
          setTodos={setTodos}
          moveTodo={moveTodo}
        />
      ))}
    </div>
  );
}

import styles from "./todoItem.module.css";
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export default function TodoItem({ item, index, todos, setTodos, moveTodo }) {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TODO_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  function handleDelete(item) {
    setTodos(todos.filter((todo) => todo !== item));
  }
  
  function handleClick(name) {
    setTodos(
      todos.map((todo) =>
        todo.name === name ? { ...todo, done: !todo.done } : todo
      )
    );
  }
  
  const classComplete = item.done ? styles.completed : "";
  
  return (
    <div 
      ref={ref}
      className={styles.item} 
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <div className={styles.itemName}>
        <span className={classComplete} onClick={() => handleClick(item.name)}>
          {item.name}
        </span>
        <span>
          <button
            onClick={() => handleDelete(item)}
            className={styles.deleteButton}
          >
            x
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}

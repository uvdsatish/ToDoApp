import styles from "./footer.module.css";
export default function Footer({ completedTodos, totalTodos, resetTodos }) {
  return (
    <div className={styles.footer}>
      <span className={styles.item}>Completed Todos: {completedTodos}</span>
      <span className={styles.item}>Total Todos: {totalTodos}</span>
      <button 
        className={styles.resetButton} 
        onClick={resetTodos}
      >
        Reset All
      </button>
    </div>
  );
}

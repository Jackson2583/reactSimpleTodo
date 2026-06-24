import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";

function TodoWrapper() {
  // 1. 初始化 State：先嘗試從 LocalStorage 讀取資料
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("shengjie_todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      // 如果沒有儲存過的資料，給予預設值 (展示你客製化的屬性)
      return [
        {
          content: "購買晚餐",
          id: crypto.randomUUID(),
          createdAt: new Date().toLocaleString("zh-TW", { hour12: false }),
          isCompleted: false,
          isEditing: false,
        },
      ];
    }
  });

  // 2. 資料持久化：只要 todos 發生改變，就同步寫入 LocalStorage
  useEffect(() => {
    localStorage.setItem("shengjie_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content) => {
    setTodos([
      ...todos,
      {
        content,
        // 全面改用 UUID，避免 ID 重複的 Bug
        id: crypto.randomUUID(),
        // 動態產生當下的時間
        createdAt: new Date().toLocaleString("zh-TW", { hour12: false }),
        isCompleted: false,
        isEditing: false,
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
  };

  const toggleIsEditing = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo;
      })
    );
  };

  const editTodo = (id, newContent) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, content: newContent, isEditing: false }
          : todo;
      })
    );
  };

  return (
    <div className="wrapper">
      <h1>聖傑的待辦事項</h1>
      <CreateForm addTodo={addTodo} />
      {todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
            toggleIsEditing={toggleIsEditing}
            editTodo={editTodo}
          />
        );
      })}
    </div>
  );
}

export default TodoWrapper;
import { useState, useRef, useEffect } from "react";

function EditForm({ todo, editTodo }) {
  const [content, setContent] = useState(todo.content);
  // 使用 useRef 來選取 input 元素
  const inputRef = useRef(null);

  // 自動聚焦功能：當進入編輯模式 (元件掛載) 時，讓游標自動跳到輸入框
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 防呆機制：防止將待辦事項修改為空字串
    if (content.trim() === "") return;
    editTodo(todo.id, content);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        placeholder="修改待辦事項"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button type="submit">完成</button>
    </form>
  );
}

export default EditForm;
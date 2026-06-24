import { useState } from "react";

function CreateForm({ addTodo }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 防呆機制：如果只輸入空白字元，則不執行加入動作
    if (content.trim() === "") return;

    addTodo(content);
    setContent("");
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="今天想完成什麼挑戰？"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button type="submit">加入</button>
    </form>
  );
}

export default CreateForm;
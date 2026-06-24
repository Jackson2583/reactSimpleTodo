import React, { useState } from "react";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
// 請確保你的履歷元件有正確匯入，檔名與路徑請依照你實際的設定
import Resume from "./components/Resume"; 

function App() {
  // 建立一個狀態來控制目前的畫面，預設顯示 'todo'
  const [currentView, setCurrentView] = useState("todo");

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      
      {/* 頂部切換選單 */}
      <div style={{ 
        textAlign: "center", 
        padding: "20px", 
        background: "#1a1a40", 
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <button
          onClick={() => setCurrentView("todo")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            fontWeight: "bold",
            background: currentView === "todo" ? "#3b36cc" : "#f1f2f6",
            color: currentView === "todo" ? "white" : "#333",
            transition: "all 0.3s"
          }}
        >
          待辦事項 (Todo List)
        </button>
        <button
          onClick={() => setCurrentView("resume")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            fontWeight: "bold",
            background: currentView === "resume" ? "#3b36cc" : "#f1f2f6",
            color: currentView === "resume" ? "white" : "#333",
            transition: "all 0.3s"
          }}
        >
          個人履歷 (Resume)
        </button>
      </div>

      {/* 根據按鈕點擊的狀態，決定要渲染哪個元件 */}
      <div>
        {currentView === "todo" && (
           /* 這裡套用剛剛在 App.css 寫好的專屬背景與排版 class */
           <div className="todo-container">
             <TodoWrapper />
           </div>
        )}
        
        {currentView === "resume" && (
           <div style={{ padding: "20px" }}>
             <Resume />
           </div>
        )}
      </div>

    </div>
  );
}

export default App;
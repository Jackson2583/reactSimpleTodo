import React, { useState } from "react";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import Resume from "./components/Resume"; 

function App() {
  // 預設改為顯示 'resume'，讓履歷成為首頁
  const [currentView, setCurrentView] = useState("resume");

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      
      {currentView === "todo" && (
         <div className="todo-container" style={{ position: "relative" }}>
           {/* 在 Todo 畫面的左上角加一個返回按鈕 */}
           <button 
             onClick={() => setCurrentView("resume")}
             style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                padding: "10px 20px",
                background: "white",
                color: "#3b36cc",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
             }}
           >
             ⬅ 返回個人履歷
           </button>
           <TodoWrapper />
         </div>
      )}
      
      {currentView === "resume" && (
         // 將 setCurrentView 當作 props 傳遞給 Resume 元件，讓履歷裡面的選單可以控制切換
         <Resume setCurrentView={setCurrentView} />
      )}

    </div>
  );
}

export default App;
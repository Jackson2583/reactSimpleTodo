import React, { useState } from "react";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import Resume from "./components/Resume"; 
// 👇 第一步：確保有把剛剛做好的 Explore 元件匯入進來！
import Explore from "./components/Explore"; 

function App() {
  // 預設顯示 'resume' (履歷首頁)
  const [currentView, setCurrentView] = useState("resume");

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      
      {/* 1. 待辦事項畫面 */}
      {currentView === "todo" && (
         <div className="todo-container" style={{ position: "relative" }}>
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
      
      {/* 2. 個人履歷畫面 */}
      {currentView === "resume" && (
         <Resume setCurrentView={setCurrentView} />
      )}

      {/* 👇 第二步：新增這段判斷式！當點擊探索小工具時，顯示 Explore 畫面 */}
      {currentView === "explore" && (
         <Explore setCurrentView={setCurrentView} />
      )}

    </div>
  );
}

export default App;
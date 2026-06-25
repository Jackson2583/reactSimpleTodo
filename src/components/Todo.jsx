import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditForm from "./EditForm";

function Todo({
  todo,
  deleteTodo,
  toggleCompleted,
  toggleIsEditing,
  editTodo,
}) {
  // === 番茄鐘專用狀態 ===
  const [showTimer, setShowTimer] = useState(false); // 控制計時器面板是否展開
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 預設 25 分鐘 (1500 秒)
  const [isRunning, setIsRunning] = useState(false); // 控制計時器是否正在跑

  // === 番茄鐘倒數邏輯 ===
  useEffect(() => {
    let timer;
    // 如果正在運行且時間大於 0，每秒扣 1 秒
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } 
    // 如果時間歸零
    else if (timeLeft === 0) {
      setIsRunning(false);
      alert(`恭喜！任務「${todo.content}」的 25 分鐘專注已完成！🍅`);
      // 可選：如果你希望時間到自動把任務打勾，可以解開下方註解
      // toggleCompleted(todo.id);
    }
    
    // 清理函數：元件卸載或重新渲染時清除計時器，避免記憶體流失
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, todo.content, toggleCompleted, todo.id]);

  // === 將秒數轉換為 MM:SS 的格式 ===
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 如果正在編輯模式，渲染編輯表單
  return todo.isEditing ? (
    <EditForm todo={todo} editTodo={editTodo} />
  ) : (
    // 如果是非編輯模式，渲染待辦事項與番茄鐘
    <div style={{ marginTop: "10px" }}>
      
      {/* 待辦事項主體 */}
      <div className={`todo ${todo.isCompleted ? "completed" : ""}`} style={{ marginTop: 0 }}>
        <p
          style={{ cursor: "pointer", margin: 0, flex: 1, textAlign: "left" }}
          onClick={() => {
            toggleCompleted(todo.id);
          }}
        >
          {todo.content}
        </p>
        
        {/* 右側按鈕區塊 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          
          {/* 🍅 番茄鐘開關按鈕 */}
          <span 
            onClick={() => setShowTimer(!showTimer)} 
            style={{ cursor: "pointer", marginRight: "10px", fontSize: "1.1rem" }}
            title="開啟/關閉番茄鐘"
          >
            🍅
          </span>
          
          <MdEdit
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleIsEditing(todo.id);
            }}
          />
          <MdDelete
            style={{ cursor: "pointer", marginLeft: "5px" }}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
        </div>
      </div>

      {/* 番茄鐘展開面板 */}
      {showTimer && (
        <div style={{
          backgroundColor: '#2a2a5a',
          padding: '12px 15px',
          borderRadius: '0 0 5px 5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px dashed #3b36cc'
        }}>
          <div style={{ 
            color: '#f1c40f', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'monospace',
            letterSpacing: '2px'
          }}>
            {formatTime(timeLeft)}
          </div>
          <div>
            <button 
              onClick={() => setIsRunning(!isRunning)}
              style={{
                backgroundColor: isRunning ? '#e74c3c' : '#2ecc71',
                color: 'white', border: 'none', padding: '6px 15px', 
                borderRadius: '4px', cursor: 'pointer', marginRight: '8px', 
                fontWeight: 'bold', transition: '0.3s'
              }}
            >
              {isRunning ? '暫停' : '開始專注'}
            </button>
            <button 
              onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }}
              style={{
                backgroundColor: '#95a5a6', color: 'white', border: 'none', 
                padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', 
                fontWeight: 'bold', transition: '0.3s'
              }}
            >
              重置
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Todo;
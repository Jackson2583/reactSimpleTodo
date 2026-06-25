import React, { useState, useEffect } from 'react';

export default function Todo({ task, toggleComplete, deleteTodo, editTodo }) {
    // === 番茄鐘專用狀態 ===
    const [showTimer, setShowTimer] = useState(false); // 控制計時器面板是否展開
    const [timeLeft, setTimeLeft] = useState(25); // 預設 25 分鐘 (1500 秒)
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
            alert(`恭喜！任務「${task.task}」的 25 分鐘專注已完成！🍅`);
            // 若想讓時間到自動把任務打勾，可以解開下方註解：
            // toggleComplete(task.id);
        }
        
        // 清理函數：元件卸載或重新渲染時清除計時器，避免記憶體流失
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, task.task]);

    // === 將秒數轉換為 MM:SS 的格式 ===
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div style={{ marginTop: '10px' }}>
            {/* 原本的 Todo 項目區塊 */}
            <div className={`todo ${task.completed ? 'completed' : ''}`} style={{ marginTop: 0 }}>
                <div className="todo-text" onClick={() => toggleComplete(task.id)}>
                    <p>{task.task}</p>
                </div>
                
                <div className="todo-icons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* 新增：番茄鐘開關按鈕 */}
                    <span 
                        onClick={() => setShowTimer(!showTimer)} 
                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                        title="開啟番茄鐘"
                    >
                        🍅
                    </span>
                    
                    {/* 原本的編輯與刪除按鈕 */}
                    <span onClick={() => editTodo(task.id)} style={{ cursor: 'pointer' }}>✏️</span>
                    <span onClick={() => deleteTodo(task.id)} style={{ cursor: 'pointer' }}>🗑️</span>
                </div>
            </div>

            {/* 新增：番茄鐘展開面板 */}
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
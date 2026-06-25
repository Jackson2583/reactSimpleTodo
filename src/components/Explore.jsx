import React, { useState } from 'react';

// === 資料庫：語錄與幸運色陣列 ===
const quotes = [
    "每完成一小步，都是進步。",
    "先全力以赴做該做的事，再做想做的事。",
    "不要害怕犯錯，那是學習的必經之路。",
    "今天的努力，是為了明天的游刃全面有餘。",
    "專注於你可以控制的事物上。",
    "寫下每一行程式碼，都是在建構你的世界。",
    "休息是為了走更長遠的路，別忘了喝水！"
];

const colors = [
    { name: "晨光黃", hex: "#f1c40f", text: "適合主動嘗試", textColor: "#333" },
    { name: "湖水綠", hex: "#1abc9c", text: "保持平靜與專注", textColor: "#fff" },
    { name: "珊瑚橘", hex: "#ff7f50", text: "充滿活力的一天", textColor: "#fff" },
    { name: "天空藍", hex: "#3498db", text: "適合冷靜思考", textColor: "#fff" },
    { name: "丁香紫", hex: "#9b59b6", text: "激發無限創意", textColor: "#fff" },
    { name: "玫瑰粉", hex: "#ffb6c1", text: "溫和待人，收穫好運", textColor: "#333" }
];

export default function Explore({ setCurrentView }) {
    // === 狀態管理 ===
    const [currentQuote, setCurrentQuote] = useState("點擊按鈕，隨機產生一句給自己的提醒。");
    const [luckyColor, setLuckyColor] = useState(null);

    // === 隨機抽取邏輯 ===
    const handleGenerateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    };

    const handleGenerateColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        setLuckyColor(colors[randomIndex]);
    };

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4f7f6", // 對齊履歷的 --bg-color
            color: "#333", // 對齊履歷的 --text-color
            padding: "40px 20px",
            fontFamily: "'Segoe UI', 'Microsoft JhengHei', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            {/* 返回按鈕 */}
            <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "20px" }}>
                <button 
                    onClick={() => setCurrentView("resume")}
                    style={{
                        padding: "10px 20px",
                        background: "#2c3e50", // 對齊履歷的 --primary-color
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "0.3s"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#3498db"}
                    onMouseOut={(e) => e.target.style.background = "#2c3e50"}
                >
                    ⬅ 返回個人履歷
                </button>
            </div>

            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
                
                {/* 模組 1：今日一句鼓勵 */}
                <div style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)" // 對齊履歷的卡片陰影
                }}>
                    <div style={{ color: "#3498db", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "5px" }}>Explore</div>
                    <h2 style={{ 
                        margin: "0 0 15px 0", 
                        fontSize: "2rem", 
                        color: "#2c3e50", 
                        borderBottom: "3px solid #3498db", 
                        display: "inline-block",
                        paddingBottom: "10px"
                    }}>
                        今日一句鼓勵
                    </h2>
                    <p style={{ color: "#7f8c8d", marginBottom: "25px", fontSize: "1.1rem" }}>
                        無論進度如何，每天都給自己一點正能量吧！
                    </p>
                    
                    <button 
                        onClick={handleGenerateQuote}
                        style={{
                            backgroundColor: "#3498db", // 對齊履歷的 --accent-color
                            color: "white",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "30px",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            marginBottom: "25px",
                            boxShadow: "0 4px 6px rgba(52, 152, 219, 0.3)",
                            transition: "transform 0.1s, background-color 0.3s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
                        onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
                        onMouseUp={(e) => e.target.style.transform = "scale(1)"}
                    >
                        ✨ 產生一句話
                    </button>

                    <div style={{
                        backgroundColor: "#f1f2f6", // 對齊履歷的標籤底色
                        borderLeft: "4px solid #3498db",
                        padding: "20px 25px",
                        borderRadius: "0 8px 8px 0",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        {currentQuote}
                    </div>
                </div>

                {/* 模組 2：今日幸運色 */}
                <div style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}>
                    <div style={{ color: "#3498db", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "5px" }}>Lucky Color</div>
                    <h2 style={{ 
                        margin: "0 0 15px 0", 
                        fontSize: "2rem", 
                        color: "#2c3e50", 
                        borderBottom: "3px solid #3498db", 
                        display: "inline-block",
                        paddingBottom: "10px"
                    }}>
                        今日幸運色
                    </h2>
                    <p style={{ color: "#7f8c8d", marginBottom: "25px", fontSize: "1.1rem" }}>
                        一個簡單的互動小工具，隨機抽出今日色彩與專屬小提醒。
                    </p>
                    
                    <button 
                        onClick={handleGenerateColor}
                        style={{
                            backgroundColor: "#2c3e50", // 使用深藍色做區隔
                            color: "white",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "30px",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            marginBottom: "25px",
                            boxShadow: "0 4px 6px rgba(44, 62, 80, 0.3)",
                            transition: "transform 0.1s, background-color 0.3s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#1a252f"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#2c3e50"}
                        onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
                        onMouseUp={(e) => e.target.style.transform = "scale(1)"}
                    >
                        🎨 抽取幸運色
                    </button>

                    {/* 幸運色結果顯示區塊 */}
                    {luckyColor ? (
                        <div style={{
                            backgroundColor: luckyColor.hex,
                            color: luckyColor.textColor,
                            padding: "25px",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            transition: "background-color 0.3s ease"
                        }}>
                            {luckyColor.name} | {luckyColor.text}
                        </div>
                    ) : (
                        <div style={{
                            backgroundColor: "#f9f9f9",
                            border: "2px dashed #bdc3c7",
                            color: "#95a5a6",
                            padding: "25px",
                            borderRadius: "10px",
                            fontSize: "1.1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "30px"
                        }}>
                            尚未抽取
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
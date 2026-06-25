import React, { useState, useEffect } from 'react';

// 將陣列移到元件外部，避免 React 重新渲染時重複建立（效能優化）
const texts = ["具備實作能力的理工人", "IoT 物聯網系統開發者", "活動統籌與執行能手", "跨領域溝通者"];

// 這裡加上 { setCurrentView } 來接收 App.jsx 傳遞過來的切換功能
export default function Resume({ setCurrentView }) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % texts.length;
            const fullText = texts[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 120);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        let timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        const nav = document.getElementById('resume-nav');
        if (element && nav) {
            window.scrollTo({
                top: element.offsetTop - nav.offsetHeight - 20,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="resume-page">
            <style>{`
                .resume-page {
                    --primary-color: #2c3e50;
                    --accent-color: #3498db;
                    --bg-color: #f4f7f6;
                    --text-color: #333;
                    --light-text: #7f8c8d;
                    font-family: 'Segoe UI', 'Microsoft JhengHei', Tahoma, Geneva, Verdana, sans-serif;
                    color: var(--text-color);
                    background-color: var(--bg-color);
                    text-align: left;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
                .resume-page * {
                    box-sizing: border-box;
                }
                .resume-page nav {
                    background: var(--primary-color);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .resume-page nav ul {
                    list-style: none;
                    display: flex;
                    justify-content: center;
                    padding: 15px 0;
                    margin: 0;
                    flex-wrap: wrap;
                }
                .resume-page nav ul li { margin: 0 15px; }
                .resume-page nav ul li a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 1.1rem;
                    transition: color 0.3s;
                    cursor: pointer;
                }
                .resume-page nav ul li a:hover { color: var(--accent-color); }

                .resume-page header {
                    min-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
                    text-align: center;
                    padding: 40px 20px;
                }
                .resume-page .profile-pic {
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 6px solid white;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                    margin-bottom: 20px;
                    transition: transform 0.3s ease;
                }
                .resume-page .profile-pic:hover { transform: scale(1.05); }
                .resume-page h1 {
                    font-size: 2.8rem;
                    margin-bottom: 5px;
                    color: var(--primary-color);
                    letter-spacing: 2px;
                    margin-top: 0;
                }
                .resume-page .motto {
                    font-size: 1.5rem;
                    font-style: italic;
                    color: var(--primary-color);
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .resume-page .subtitle {
                    font-size: 1.8rem;
                    color: #222;
                    background: white;
                    padding: 15px 30px;
                    border-radius: 35px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    font-weight: bold;
                    margin: 0;
                }
                .resume-page .subtitle span {
                    color: var(--accent-color);
                    border-right: 3px solid var(--accent-color);
                    padding-right: 5px;
                    animation: blink 0.75s step-end infinite;
                }

                @keyframes blink {
                    from, to { border-color: transparent }
                    50% { border-color: var(--accent-color); }
                }

                .resume-page main {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                .resume-page section {
                    margin: 60px 0;
                    padding: 40px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease;
                }
                .resume-page section:hover { transform: translateY(-5px); }
                .resume-page h2 {
                    font-size: 2rem;
                    border-bottom: 3px solid var(--accent-color);
                    padding-bottom: 10px;
                    margin-top: 0;
                    color: var(--primary-color);
                    display: inline-block;
                }

                .resume-page .skills-category {
                    margin-bottom: 15px;
                    font-weight: bold;
                    color: var(--primary-color);
                    font-size: 1.1rem;
                }
                .resume-page .skills-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-bottom: 25px;
                }
                .resume-page .skill-box {
                    background: #f1f2f6;
                    padding: 12px 24px;
                    border-radius: 30px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    color: var(--primary-color);
                    font-weight: 500;
                    border: 1px solid #e1e5ea;
                }
                .resume-page .skill-box:hover {
                    background: var(--accent-color);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
                }

                .resume-page .timeline {
                    list-style: none;
                    padding-left: 30px;
                    border-left: 4px solid #e0eafc;
                    margin: 0;
                }
                .resume-page .timeline > li {
                    margin-bottom: 40px;
                    padding-left: 25px;
                    position: relative;
                }
                .resume-page .timeline > li::before {
                    content: '';
                    position: absolute;
                    left: -38px;
                    top: 5px;
                    width: 20px;
                    height: 20px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    border: 4px solid white;
                    box-shadow: 0 0 0 3px #e0eafc;
                }
                .resume-page .timeline h3 {
                    margin: 0 0 5px 0;
                    color: var(--primary-color);
                    font-size: 1.4rem;
                }
                .resume-page .timeline p.date-role {
                    margin: 0 0 15px 0;
                    color: var(--light-text);
                    font-weight: 500;
                    font-size: 1.05rem;
                }
                .resume-page .timeline ul {
                    padding-left: 20px;
                    color: #555;
                }

                .resume-page footer {
                    text-align: center;
                    padding: 50px 20px;
                    background: var(--primary-color);
                    color: white;
                    margin-top: 60px;
                }
                .resume-page .contact-grid {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 30px;
                    margin-bottom: 30px;
                }
                .resume-page .contact-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    min-width: 200px;
                }
                .resume-page .contact-item span {
                    font-size: 0.9rem;
                    color: #bdc3c7;
                    margin-bottom: 5px;
                }
                .resume-page .contact-item strong, .resume-page .contact-item a {
                    font-size: 1.1rem;
                    color: white;
                    text-decoration: none;
                }
                .resume-page .contact-item a:hover { color: var(--accent-color); }
            `}</style>

            <nav id="resume-nav">
                <ul>
                    <li><a onClick={(e) => scrollToSection(e, 'about')}>關於我</a></li>
                    <li><a onClick={(e) => scrollToSection(e, 'education')}>學歷</a></li>
                    <li><a onClick={(e) => scrollToSection(e, 'skills')}>專業技能</a></li>
                    <li><a onClick={(e) => scrollToSection(e, 'experience')}>領導與經歷</a></li>
                    {/* 新增跳轉至專案的按鈕，加上亮黃色點綴 */}
                    <li>
                        <a 
                            onClick={() => setCurrentView('todo')}
                            style={{ color: '#f1c40f' }}
                        >
                            ✨ 待辦事項
                        </a>
                    </li>
                </ul>
            </nav>

            <header>
                <img 
                    src="/profile.jpg" 
                    alt="王聖傑" 
                    className="profile-pic" 
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://ui-avatars.com/api/?name=傑&background=3498db&color=fff&size=200&font-size=0.4';
                    }}
                />
                
                <h1>王聖傑 WANG SHENG-JIE</h1>
                <p className="motto">「先全力以赴做該做的事，再做想做的事。」</p>
                <p className="subtitle">我是 <span>{text}</span></p>
            </header>

            <main>
                <section id="about">
                    <h2>關於我 About Me</h2>
                    <p className="about-text">
                        「具備實作能力的理工人」結合智動系 IoT 硬實力與活動統籌軟實力。<br/><br/>
                        具備基礎硬體設備與機具認知，能快速熟悉並協助創客空間設備之基本維護。期待能發揮跨領域溝通熱忱，協助<strong>智慧臺中創客基地</strong>的空間營運、活動支援，並推廣創客實作精神。
                    </p>
                </section>

                <section id="education">
                    <h2>教育背景 Education</h2>
                    <ul className="timeline">
                        <li>
                            <h3>國立勤益科技大學</h3>
                            <p className="date-role">智慧自動化工程系 | 四技日間部三年級 (2023 - Present)</p>
                        </li>
                        <li>
                            <h3>新北市立新北高級工業職業學校</h3>
                            <p className="date-role">電機科 | 日間部 (2020 - 2023)</p>
                        </li>
                    </ul>
                </section>

                <section id="skills">
                    <h2>專業技能 Skills</h2>
                    
                    <div className="skills-category">專業技術與實作</div>
                    <div className="skills-container">
                        <div className="skill-box">IoT 物聯網系統整合</div>
                        <div className="skill-box">電力電子與工業配線</div>
                        <div className="skill-box">硬體設備與機具認知</div>
                    </div>

                    <div className="skills-category">活動統籌與軟實力</div>
                    <div className="skills-container">
                        <div className="skill-box">活動現場支援與紀錄</div>
                        <div className="skill-box">現場動線規劃與執行</div>
                        <div className="skill-box">臨機應變處理與溝通</div>
                    </div>

                    <div className="skills-category">語言能力</div>
                    <div className="skills-container">
                        <div className="skill-box">English (PVQC Certified)</div>
                        <div className="skill-box">Mandarin (Native)</div>
                    </div>
                </section>

                <section id="experience">
                    <h2>領導與專案經歷 Experience</h2>
                    <ul className="timeline">
                        <li>
                            <h3>活動助手 (Event Coordinator)</h3>
                            <p className="date-role">鴻海 iPEBG 勤益校園徵才專場 | 2025.12</p>
                            <ul>
                                <li><strong>社群轉化策略：</strong>建立活動專屬 Line 社群，以高互動文案成功將線上流量導引至線下參與。</li>
                                <li><strong>現場執行與溝通：</strong>擔任企業與學生間單一窗口，即時解決獎勵異動等突發狀況，確保活動高滿意度順利完成。</li>
                            </ul>
                        </li>
                        <li>
                            <h3>專題組長 (Project Lead)</h3>
                            <p className="date-role">物聯網系統實作專題 | 2023</p>
                            <ul>
                                <li><strong>技術統籌領導：</strong>主導團隊進行 IoT 系統開發，負責關鍵硬體線路規劃與系統整合，作品榮獲全國專題競賽佳作。</li>
                                <li><strong>技術轉譯能力：</strong>負責對評審進行專案演示，成功將複雜技術原理轉化為易懂的簡報語言，展現跨領域溝通力。</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </main>

            <footer>
                <div className="contact-grid">
                    <div className="contact-item">
                        <span>Phone</span>
                        <strong>0986-853-270</strong>
                    </div>
                    <div className="contact-item">
                        <span>Email</span>
                        <a href="mailto:jackson94830@gmail.com">jackson94830@gmail.com</a>
                    </div>
                    <div className="contact-item">
                        <span>Line ID</span>
                        <strong>jackson94830</strong>
                    </div>
                </div>
                <p style={{fontSize: '0.9rem', color: '#95a5a6', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px'}}>© 2026 WANG SHENG-JIE. All rights reserved.</p>
            </footer>
        </div>
    );
}
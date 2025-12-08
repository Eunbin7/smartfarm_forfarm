import React, { useState } from "react";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
        {isOpen && (
          <>
            {/* 🔥 로고 클릭 → 홈 이동 */}
            <div 
              className="logo-box"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img src="/images/green.png" alt="logo" className="logo-img" />
              <h1 className="logo">forfarm</h1>
            </div>

            <button className="sidebar-btn">생육 진단하기</button>
            <button className="sidebar-btn">샘플 파일 테스트 하기</button>
            <button className="sidebar-btn">작물 관리하기</button>
          </>
        )}
      </aside>

      <button
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "◀" : "▶"}
      </button>
    </>
  );
}

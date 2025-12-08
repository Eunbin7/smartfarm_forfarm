import React, { useState } from "react";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sensorUrl, setSensorUrl] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!sensorUrl.trim()) {
      alert("센서 주소를 입력해주세요!");
      return;
    }

    alert(`센서가 등록되었습니다!\n주소: ${sensorUrl}`);
    setShowModal(false);
    setSensorUrl("");
  };

  return (
    <>
      <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
        {isOpen && (
          <>
            {/* 홈 이동 */}
            <div 
              className="logo-box"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img src="/images/green.png" alt="logo" className="logo-img" />
              <h1 className="logo">forfarm</h1>
            </div>

            {/* ✔ 센서 등록하기 → 모달 열기 */}
            <button
              className="sidebar-btn"
              onClick={() => setShowModal(true)}
            >
              센서 등록하기
            </button>

            {/* ✔ 등록된 센서 가져오기 */}
            <button
              className="sidebar-btn"
              onClick={() => navigate("/input")}
            >
              등록된 센서 가져오기
            </button>

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

      {/* 🔥 모든 페이지에서 사용할 수 있는 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <h2 className="modal-title">센서 주소 등록</h2>
            <p className="modal-desc">
              데이터베이스 관리자가 제공한 센서 주소(URL)를 입력해주세요.
            </p>

            <input
              type="text"
              className="modal-input"
              placeholder="예: https://sensor-data.com/device/1234"
              value={sensorUrl}
              onChange={(e) => setSensorUrl(e.target.value)}
            />

            <button className="modal-submit" onClick={handleRegister}>
              등록하기
            </button>

            <p className="modal-help">
              센서 주소는 관리자가 생성한 고유 링크입니다.<br />
              이 주소를 통해 센서가 수집한 생육 데이터를 조회할 수 있습니다.<br />
              올바른 주소를 입력해야 정확한 생육 진단을 받을 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

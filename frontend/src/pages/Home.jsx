import React, { useState } from "react";
import "../css/Home.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [sensorUrl, setSensorUrl] = useState("");

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
    <div className="home-container">
      <Sidebar onOpenSensorModal={setShowModal} />

      {/* 메인 화면 */}
      <main className="home-main">
        <div className="home-content">
          <h2 className="home-title">스마트 생육 관리 시스템</h2>
          <p className="home-desc">
            AI 기반 생육 진단, 작물 분석, 생육 데이터 시각화를 제공합니다.
          </p>

          <div className="choice-row">

            {/* 센서 등록하기 */}
            <div className="choice-card">
              <img src="/images/start1.png" alt="sensor" className="choice-img" />
              <button 
                className="choice-btn sensor-btn"
                onClick={() => setShowModal(true)}
              >
                센서 등록하기
              </button>
            </div>

            {/* 등록된 센서 가져오기 */}
            <div className="choice-card">
              <img src="/images/start2.png" alt="input" className="choice-img" />
              <button 
                className="choice-btn input-btn"
                onClick={() => navigate("/input")}
              >
                등록된 센서 가져오기
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* 🔥 팝업 모달 */}
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

    </div>
  );
}

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../css/InputSelect.css";
import { useNavigate } from "react-router-dom";

export default function SensorList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // 📌 현재 날짜/시간 가져오는 함수
  const getCurrentDateTime = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  };

  // 센서 실측 데이터 (추후 DB에서 가져올 예정)
  const sensorData = {
    온도: "26.4°C",
    습도: "61%",
    조도: "820 lux",
    토양수분: "48%",
  };

  // 🔥 결과보기 버튼 클릭 → 로딩 → 팝업
  const handleResultClick = () => {
    setLoading(true);

    setTimeout(() => {
      setCurrentTime(getCurrentDateTime()); // 팝업 열리는 순간 시간 저장
      setLoading(false);
      setShowPopup(true);
    }, 3000);
  };

  // 🔥 팝업 안의 결과보기 → 로딩 → result 페이지 이동
  const goToFinalResult = () => {
    setShowPopup(false);
    setLoading(true);

    setTimeout(() => {
      navigate("/result");
    }, 3000);
  };

  // 등록된 센서 리스트 (나중엔 DB에서 불러오는 값)
  const sensors = [
    { crop: "토마토", url: "sensor://tomato_1234" },
    { crop: "오이", url: "sensor://cucumber_4553" },
    { crop: "딸기", url: "sensor://strawberry_8282" },
    { crop: "비정상 센서", url: "sensor://error_001" },
  ];

  return (
    <div className="input-container">
      <Sidebar />

      <main className="input-main">
        <h2 className="input-title">등록된 센서 가져오기</h2>

        {/* 🔥 로딩 화면 */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-box">불러오는 중...</div>
          </div>
        )}

        {/* 🔥 실시간 측정 팝업 */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              
              {/* 실시간 측정 시간 */}
              <p className="popup-time">
                <strong>실시간 측정값</strong>
                <br />
                <span style={{ fontSize: "14px", color: "#777" }}>
                  {currentTime}
                </span>
              </p>

              {/* 측정된 센서 데이터 */}
              <ul className="popup-list">
                {Object.entries(sensorData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong> : {value}
                  </li>
                ))}
              </ul>

              {/* 버튼들 */}
              <button className="popup-btn" onClick={goToFinalResult}>
                결과 보기
              </button>

              <button className="popup-close" onClick={() => setShowPopup(false)}>
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 🔥 센서 리스트 GRID */}
        <div className="crop-grid">
          {sensors.map((sensor, idx) => (
            <div className="crop-card" key={idx}>
              <p className="crop-name">{sensor.crop}</p>
              <p className="sensor-url">{sensor.url}</p>

              <button className="copy-btn" onClick={handleResultClick}>
                결과보기
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

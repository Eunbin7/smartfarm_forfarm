import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../css/InputSelect.css";
import { useNavigate } from "react-router-dom";

export default function SensorList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const [sensors, setSensors] = useState([]);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState(null);

  // 날짜/시간 생성
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

  // 센서 목록 가져오기
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoadingSensors(true);
        const res = await fetch("http://localhost:3001/sensors");
        const data = await res.json();

        if (data.success) {
          setSensors(data.sensors);
        } else {
          alert(data.message || "센서 목록을 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("센서 목록 가져오기 에러:", err);
        alert("센서 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoadingSensors(false);
      }
    };

    fetchSensors();
  }, []);

  // 결과보기 클릭 → 측정 로딩 → 팝업
  const handleResultClick = (sensor) => {
    setSelectedSensor(sensor);
    setLoading(true);

    setTimeout(() => {
      setCurrentTime(getCurrentDateTime());
      setLoading(false);
      setShowPopup(true);
    }, 1000);
  };

  // 팝업 → 최종 결과 페이지 이동
  const goToFinalResult = () => {
    setShowPopup(false);
    setLoading(true);

    setTimeout(() => {
      navigate("/result", {
        state: {
          sensor: sensorData,
          date: currentTime,
          crop: selectedSensor.crops_name,
        },
      });
    }, 800);
  };

  // 센서 데이터 정리
  const sensorData = selectedSensor
    ? {
        온도: selectedSensor.tmp,
        습도: selectedSensor.humidity,
        조도: selectedSensor.lux,
        토양수분: selectedSensor.soil_water,
      }
    : {};

  // 🔥 작물 이미지 자동 매핑
  const cropImageMap = {
    "토마토": "/images/tomato.jpg",
    "오이": "/images/oi.png",
    "딸기": "/images/straw.jpg",
  };

  return (
    <div className="input-container">
      <Sidebar />

      <main className="input-main">
        <h2 className="input-title">등록된 센서 가져오기</h2>

        {/* 센서 목록 로딩 */}
        {loadingSensors && (
          <div className="loading-overlay">
            <div className="loading-box">센서 목록 불러오는 중...</div>
          </div>
        )}

        {/* 측정 로딩 */}
        {loading && !loadingSensors && (
          <div className="loading-overlay">
            <div className="loading-box">불러오는 중...</div>
          </div>
        )}

        {/* 팝업 */}
        {showPopup && selectedSensor && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p className="popup-time">
                <strong>실시간 측정값</strong>
                <br />
                <span style={{ fontSize: "14px", color: "#777" }}>{currentTime}</span>
                <br />
                <span style={{ fontSize: "13px", color: "#999" }}>
                  ({selectedSensor.crops_name} / {selectedSensor.sensor_name})
                </span>
              </p>

              <ul className="popup-list">
                {Object.entries(sensorData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong> : {value}
                  </li>
                ))}
              </ul>

              <button className="popup-btn" onClick={goToFinalResult}>
                결과 보기
              </button>
              <button className="popup-close" onClick={() => setShowPopup(false)}>
                닫기
              </button>
            </div>
          </div>
        )}

        {/* ⭐ 센서 리스트 리뉴얼 UI ⭐ */}
        <div className="sensor-grid">
          {sensors.map((sensor, idx) => (
            <div className="sensor-card" key={idx}>
              {/* 이미지 */}
              <img
                className="sensor-img"
                src={cropImageMap[sensor.crops_name] || "/images/default.png"}
                alt={sensor.crops_name}
              />

              <div className="sensor-info">
                <h3>{sensor.crops_name}</h3>
                <p className="sensor-id">{sensor.sensor_name}</p>

                {/* 센서 값 요약 */}
<div className="sensor-summary">
  <span>🌡 {sensor.tmp}°C</span>
  <span>💧 {sensor.humidity}%</span>
  <span>🔆 {sensor.lux} lux</span>
  <span>🌱 {sensor.soil_water}%</span>
</div>


                <button className="sensor-btn" onClick={() => handleResultClick(sensor)}>
                  결과보기
                </button>
              </div>
            </div>
          ))}

          {!loadingSensors && sensors.length === 0 && (
            <p style={{ marginTop: 20, color: "#777" }}>등록된 센서가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}

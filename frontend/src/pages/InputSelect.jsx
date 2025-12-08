import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../css/InputSelect.css";
import { useNavigate } from "react-router-dom";

export default function SensorList() { // 파일 이름이 InputSelect여도 상관 없음
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);          // 측정 로딩
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const [sensors, setSensors] = useState([]);             // 🔥 DB에서 가져온 센서 리스트
  const [loadingSensors, setLoadingSensors] = useState(true); // 센서 목록 로딩 상태
  const [selectedSensor, setSelectedSensor] = useState(null); // 🔥 팝업에서 보여줄 센서

  // 📌 현재 날짜/시간
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

  // 🔹 페이지 로드 시 DB에서 센서 목록 가져오기
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoadingSensors(true);
        const res = await fetch("http://localhost:3001/sensors");
        const data = await res.json();

        if (data.success) {
          // [{ sensor_name, user_id, crops_name, tmp, humidity, lux, soil_water }, ...]
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

  // 🔥 결과보기 버튼 클릭 → 로딩 → 팝업
  const handleResultClick = (sensor) => {
    setSelectedSensor(sensor);        // 어떤 센서인지 저장
    setLoading(true);

    setTimeout(() => {
      setCurrentTime(getCurrentDateTime());
      setLoading(false);
      setShowPopup(true);
    }, 1000); // 1초 정도만 줄게. 원하면 3000으로
  };

  // 🔥 팝업 안의 결과보기 → result 페이지 이동
  const goToFinalResult = () => {
    setShowPopup(false);
    setLoading(true);

    // 필요하면 여기서 센서 정보 넘길 수도 있음
    // navigate("/result", { state: { sensor: selectedSensor } });

    setTimeout(() => {
      navigate("/result");
    }, 1000);
  };

  // 선택된 센서의 실측 데이터 매핑
  const sensorData = selectedSensor
    ? {
        온도: selectedSensor.tmp,
        습도: selectedSensor.humidity,
        조도: selectedSensor.lux,
        토양수분: selectedSensor.soil_water,
      }
    : {};

  return (
    <div className="input-container">
      <Sidebar />

      <main className="input-main">
        <h2 className="input-title">등록된 센서 가져오기</h2>

        {/* 센서 목록 불러오는 중 */}
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

        {/* 실시간 측정 팝업 */}
        {showPopup && selectedSensor && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p className="popup-time">
                <strong>실시간 측정값</strong>
                <br />
                <span style={{ fontSize: "14px", color: "#777" }}>
                  {currentTime}
                </span>
                <br />
                <span style={{ fontSize: "13px", color: "#999" }}>
                  ({selectedSensor.crops_name} / {selectedSensor.sensor_name})
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

              <button className="popup-btn" onClick={goToFinalResult}>
                결과 보기
              </button>

              <button
                className="popup-close"
                onClick={() => setShowPopup(false)}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 센서 리스트 GRID */}
        <div className="crop-grid">
          {sensors.map((sensor, idx) => (
            <div className="crop-card" key={idx}>
              <p className="crop-name">{sensor.crops_name}</p>
              <p className="sensor-url">{sensor.sensor_name}</p>

              <button
                className="copy-btn"
                onClick={() => handleResultClick(sensor)}
              >
                결과보기
              </button>
            </div>
          ))}

          {!loadingSensors && sensors.length === 0 && (
            <p style={{ marginTop: 20, color: "#777" }}>
              등록된 센서가 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

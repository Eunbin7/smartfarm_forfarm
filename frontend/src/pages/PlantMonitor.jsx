import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../css/PlantMonitor.css";
import { useNavigate } from "react-router-dom";

export default function PlantMonitor() {
  const navigate = useNavigate();

  // 🔥 개별 카드 로딩 상태
  const [loadingIndex, setLoadingIndex] = useState(null);

  // 🔥 아직 백엔드 없으니까 임시 더미데이터
  const allPlants = [
    {
      name: "토마토",
      sensorUrl: "sensor://001",
      sensor: { 온도: 38, 습도: 41, 조도: 820, 토양수분: 12 }
    },
    {
      name: "딸기",
      sensorUrl: "sensor://002",
      sensor: { 온도: 23, 습도: 35, 조도: 700, 토양수분: 18 }
    },
    {
      name: "오이",
      sensorUrl: "sensor://003",
      sensor: { 온도: 29, 습도: 19, 조도: 950, 토양수분: 40 }
    },
    {
      name: "상추",
      sensorUrl: "sensor://004",
      sensor: { 온도: 25, 습도: 55, 조도: 600, 토양수분: 32 }
    }
  ];

  // 🔥 상태 평가 함수 (Result 페이지와 동일 로직)
  const getStatus = (key, value) => {
    if (key === "토양수분") {
      if (value < 20) return "위험";
      if (value < 40) return "주의";
      return "정상";
    }
    if (key === "온도") {
      if (value < 15 || value > 35) return "위험";
      if (value > 30) return "주의";
      return "정상";
    }
    if (key === "습도") {
      if (value < 20) return "위험";
      if (value < 40) return "주의";
      return "정상";
    }
    if (key === "조도") {
      if (value < 500) return "주의";
      if (value > 1200) return "위험";
      return "정상";
    }
  };

  // 🔥 주의·위험만 모아서 배열 생성
  const [alertPlants, setAlertPlants] = useState([]);

  useEffect(() => {
    const result = [];

    allPlants.forEach((plant) => {
      const alerts = [];

      Object.entries(plant.sensor).forEach(([key, value]) => {
        const status = getStatus(key, value);
        if (status === "주의" || status === "위험") {
          alerts.push({ key, value, status });
        }
      });

      if (alerts.length > 0) {
        result.push({ ...plant, alerts });
      }
    });

    setAlertPlants(result);
  }, []);

  // 🔥 상세보기 클릭 → 카드별 로딩 → 3초 후 result 이동
  const handleDetailClick = (index) => {
    setLoadingIndex(index);

    setTimeout(() => {
      setLoadingIndex(null);
      navigate("/result");
    }, 3000);
  };

  return (
    <div className="monitor-container">
      <Sidebar />

      <main className="monitor-main">
        <h1 className="monitor-title">🌱 작물 상태 모니터링</h1>
        <p className="monitor-desc">
          주의 또는 위험 상태에 있는 작물만 모아서 보여줍니다.
        </p>

        {alertPlants.length === 0 ? (
          <p className="monitor-empty">모든 작물이 정상 상태입니다! 🌿</p>
        ) : (
          <div className="plant-grid">
            {alertPlants.map((plant, idx) => (
              <div className="plant-card" key={idx}>
                <div className="plant-header">
                  <h2>{plant.name}</h2>
                  <p className="sensor-url">{plant.sensorUrl}</p>
                </div>

                <ul className="alert-list">
                  {plant.alerts.map((a, i) => (
                    <li key={i} className={`alert-item ${a.status}`}>
                      <strong>{a.key}</strong> : {a.value}
                      <span className="badge">{a.status}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="detail-btn"
                  disabled={loadingIndex === idx}
                  onClick={() => handleDetailClick(idx)}
                >
                  {loadingIndex === idx ? "로딩중..." : "상세보기 →"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

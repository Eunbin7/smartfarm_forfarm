import React from "react";
import Sidebar from "./Sidebar";
import "../css/InputSelect.css";
import { useNavigate } from "react-router-dom";

export default function SensorList() {
  const navigate = useNavigate();

  // 🔥 여기에서 나중에 DB에서 불러오는 센서 목록이라고 생각하면 됨
  const sensors = [
    { crop: "토마토", url: "sensor://tomato_1234" },
    { crop: "오이", url: "sensor://cucumber_4553" },
    { crop: "딸기", url: "sensor://strawberry_8282" },
    { crop: "비정상센서", url: "sensor://error_001" },
  ];

  return (
    <div className="input-container">
      <Sidebar />

      <main className="input-main">
        <h2 className="input-title">등록된 센서 가져오기</h2>

        <div className="crop-grid">
          {sensors.map((sensor, idx) => (
            <div
              className="crop-card"
              key={idx}
              onClick={() => navigate("/result")}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <p className="crop-name">{sensor.crop}</p>
              <p className="sensor-url">{sensor.url}</p>

              {/* 복사하기 버튼 */}
              <button
                className="copy-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 방지
                  navigator.clipboard.writeText(sensor.url);
                  alert("센서 주소가 복사되었습니다!");
                }}
              >
                결과보기
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

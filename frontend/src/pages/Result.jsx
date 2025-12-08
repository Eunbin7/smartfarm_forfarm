import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../css/Result.css";
import { PieChart, Pie, Cell, Customized } from "recharts";

export default function Result() {
  // ---- 최근 기록 ---- //
  const historyRecords = [
    {
      date: "2025-02-03 16:22",
      sensor: { 온도: 26.4, 습도: 41, 조도: 820, 토양수분: 12 },
      score: 72,
    },
    {
      date: "2025-02-02 11:10",
      sensor: { 온도: 28.1, 습도: 35, 조도: 760, 토양수분: 20 },
      score: 61,
    },
    {
      date: "2025-02-01 18:05",
      sensor: { 온도: 22.0, 습도: 30, 조도: 600, 토양수분: 15 },
      score: 55,
    },
    {
      date: "2025-01-30 14:45",
      sensor: { 온도: 30.5, 습도: 25, 조도: 900, 토양수분: 10 },
      score: 35,
    },
    {
      date: "2025-01-28 17:20",
      sensor: { 온도: 24.0, 습도: 45, 조도: 840, 토양수분: 40 },
      score: 82,
    },
  ];

  const [currentData, setCurrentData] = useState(historyRecords[0]);

  // ⭐ 선택된 센서 항목
  const [selectedKey, setSelectedKey] = useState("온도");

  // ⭐ 정상 범위표
  const ranges = {
    온도: { min: 15, max: 35 },
    습도: { min: 20, max: 60 },
    조도: { min: 500, max: 1000 },
    토양수분: { min: 25, max: 40 },
  };

  // ⭐ 선택된 값
  const selectedValue = currentData.sensor[selectedKey];
  const { min, max } = ranges[selectedKey];

  // ⭐ 정상범위 → 퍼센트 변환 함수
  const calcPercent = (value) => {
    if (value <= min) return 0;
    if (value >= max) return 100;
    return ((value - min) / (max - min)) * 100;
  };

  const percent = calcPercent(selectedValue);

  // ⭐ 상태 판별
  const getStatus = (key, value) => {
    if (key === "토양수분") {
      if (value < 20) return { text: "위험", color: "red" };
      if (value < 40) return { text: "주의", color: "orange" };
      return { text: "정상", color: "green" };
    }
    if (key === "온도") {
      if (value < 15 || value > 35) return { text: "위험", color: "red" };
      if (value > 30) return { text: "주의", color: "orange" };
      return { text: "정상", color: "green" };
    }
    if (key === "습도") {
      if (value < 20) return { text: "위험", color: "red" };
      if (value < 40) return { text: "주의", color: "orange" };
      return { text: "정상", color: "green" };
    }
    if (key === "조도") {
      if (value < 500) return { text: "주의", color: "orange" };
      if (value > 1200) return { text: "위험", color: "red" };
      return { text: "정상", color: "green" };
    }
  };

  const status = getStatus(selectedKey, selectedValue);

  // ⭐ 색상 매핑
  const COLOR_MAP = {
    green: "#4caf50",
    orange: "#ffb300",
    red: "#e53935",
  };

  const ACTIVE_COLOR = COLOR_MAP[status.color];

  // ⭐ 반원그래프에 넣을 데이터
  const gaugeData = [
    { value: percent },
    { value: 100 - percent },
  ];

  // ⭐ 반원 그래프 기준선 렌더링
  const renderIdealLine = ({ cx, cy, innerRadius, outerRadius }) => {
    const idealValue = (min + max) / 2;
    const idealPercent = calcPercent(idealValue);
    const angle = 180 - (idealPercent / 100) * 180;

    const radius = (innerRadius + outerRadius) / 2;
    const rad = (Math.PI / 180) * angle;

    const x = cx + radius * Math.cos(rad);
    const y = cy - radius * Math.sin(rad);

    return (
      <line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke="red"
        strokeWidth={2}
        strokeDasharray="4 2"
      />
    );
  };

  // ---- 보고서 ---- //
  const generateReport = () => {
    const { sensor } = currentData;
    const soil = sensor["토양수분"];
    const temp = sensor["온도"];
    const hum = sensor["습도"];

    let messages = [];

    if (soil < 20) messages.push("토양수분이 매우 낮아 긴급하게 물 공급이 필요합니다.");
    else if (soil < 40) messages.push("토양수분이 부족하여 주의가 필요합니다.");
    else messages.push("토양수분은 안정적인 범위입니다.");

    if (temp < 15 || temp > 35) messages.push("온도가 적정 범위를 벗어나 위험합니다.");
    else if (temp > 30) messages.push("온도가 높아 환기가 필요합니다.");
    else messages.push("온도는 정상 범위입니다.");

    if (hum < 20) messages.push("습도가 매우 낮아 증산작용이 과도할 수 있습니다.");
    else if (hum < 40) messages.push("습도가 조금 낮아 관리가 필요합니다.");
    else messages.push("습도는 적정 수준입니다.");

    return messages.join(" ");
  };

  const plantGuide = `
📌 토마토 기본 재배 가이드
- 적정 온도: 20~30°C
- 적정 습도: 40~60%
- 적정 토양수분: 25~40%
- 햇빛은 하루 최소 6시간 필요
- 물은 깊게 주고 천천히 말리는 패턴이 좋음
`;

  return (
    <div className="result-container">
      <Sidebar />

      <main className="result-main">

        <p className="result-time">
          실시간 진단 결과 <span>({currentData.date})</span>
        </p>

        <div className="crop-header">
          <img src="/images/tomato.jpg" className="crop-detail-img" alt="토마토 이미지" />

          <h3 className="crop-detail-name">적홍 토마토</h3>
        </div>

        <div className="result-grid">

          {/* ---- 센서 박스 ---- */}
          <div className="sensor-box">
            <h4>센서 실측 데이터</h4>

            <ul className="sensor-list">
              {Object.entries(currentData.sensor).map(([key, value]) => {
                const status = getStatus(key, value);

                return (
                  <li
                    key={key}
                    className="sensor-item"
                    onClick={() => setSelectedKey(key)}
                  >
                    <span className="sensor-key">{key}</span>
                    <span className="sensor-value">{value}</span>
                    <span className={`sensor-status ${status.color}`}>
                      {status.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---- 반원그래프 ---- */}
          <div className="chart-box">
            <h4>{selectedKey} 변화 그래프</h4>

            <div className="gauge-wrapper">
              <PieChart width={260} height={160}>
                <Pie
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill={ACTIVE_COLOR} />
                  <Cell fill="#ddd" />
                </Pie>

                {/* 🔥 기준선 추가 */}
                <Customized component={renderIdealLine} />
              </PieChart>

              <div className="gauge-center">
                <h2>{selectedValue}</h2>
                <p>{selectedKey}</p>
              </div>
            </div>

            <div className="range-box">
              <p>
                <strong>적정 범위:</strong> {min} ~ {max}
                {selectedKey === "온도"
                  ? "°C"
                  : selectedKey === "습도"
                  ? "%"
                  : selectedKey === "토양수분"
                  ? "%"
                  : " lux"}
              </p>
              <p className={`range-status ${status.color}`}>
                현재 상태: {status.text}
              </p>
            </div>
          </div>

        </div>

        {/* ---- 보고서 ---- */}
        <div className="report-box">
          <h4>📄 진단 결과 보고서</h4>
          <p className="report-text">{generateReport()}</p>
        </div>

        {/* ---- 가이드 ---- */}
        <div className="guide-box">
          <h4>🌱 작물 재배 가이드</h4>
          <pre className="guide-text">{plantGuide}</pre>
        </div>

        {/* ---- 최근 기록 ---- */}
        <div className="history-box">
          <h4>최근 진단 기록</h4>

          <div className="history-list">
            {historyRecords.map((record, idx) => (
              <div
                key={idx}
                className="history-item"
                onClick={() => {
                  setCurrentData(record);
                  setSelectedKey("온도");
                }}
              >
                <span className="history-date">{record.date}</span>
                <div
                  className="history-bar"
                  style={{
                    width: `${record.score}%`,
                    background:
                      record.score < 40 ? "red" :
                      record.score < 60 ? "orange" : "green",
                  }}
                ></div>
                <span className="history-score">{record.score}%</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

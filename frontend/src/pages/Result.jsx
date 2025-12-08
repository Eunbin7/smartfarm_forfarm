import React from "react";
import Sidebar from "./Sidebar";
import "../css/Result.css";

export default function Result() {
  return (
    <div className="result-container">
      <Sidebar />

      <main className="result-main">
        
        {/* 상단 타이틀 */}
        <h2 className="result-title">생육 진단 결과</h2>

        {/* 작물 이미지 + 이름 */}
        <div className="crop-header">
          <img src="/images/tomato.jpg" alt="적홍 토마토" className="crop-detail-img" />
          <h3 className="crop-detail-name">적홍 토마토</h3>
        </div>

        {/* 그래프 & 차트 레이아웃 */}
        <div className="result-grid">
          <div className="chart-box">
            <h4>환경 변화 그래프</h4>
            {/* 나중에 그래프 추가 */}
          </div>

          <div className="gauge-box">
            <h4>성장 지수</h4>
            {/* 나중 게이지 차트 추가 */}
          </div>
        </div>

        {/* 프로젝트 테이블 */}
        <div className="table-box">
          <h4>진단 요약</h4>
          {/* 나중 표 작성 */}
        </div>

      </main>
    </div>
  );
}

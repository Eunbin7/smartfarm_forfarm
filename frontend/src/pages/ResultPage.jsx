import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 전달받은 값
  const cropId = state?.cropId;
  const growthData = state?.growthData;

  return (
    <div className="result-page">
      <h1>📊 AI 분석 결과</h1>
      <p className="crop-label">작물: {cropId}</p>

      {/* 입력된 생육 값 요약 */}
      <div className="data-box">
        <h2>입력한 생육 데이터</h2>
        <ul>
          <li>온도: {growthData.temperature} ℃</li>
          <li>습도: {growthData.humidity} %</li>
          <li>토양 수분: {growthData.soil} %</li>
          <li>조도: {growthData.light} lux</li>
        </ul>
      </div>

      {/* AI 결과 영역 — 지금은 더미 텍스트 */}
      <div className="ai-box">
        <h2>AI 분석 요약</h2>
        <p>
          ⚠️ *현재는 샘플 분석 결과입니다.  
          이후 OpenAI GPT API 연결하면 실제 진단 결과가 표시됩니다.*
        </p>
        <p>
          현재 입력된 생육 환경은 작물 성장에 약간의 개선이 필요합니다.  
          온도는 적정 수준보다 낮을 가능성이 있으며, 습도 또한 개선이 필요할 수 있습니다.  
          토양 수분 및 조도는 안정적인 편으로 보입니다.
        </p>
        <p>
          👉 세부 관리 방안은 AI 모델 연동 후 더 정확하게 제공될 예정입니다.
        </p>
      </div>

      <button className="back-btn" onClick={() => navigate("/select")}>
        다시 분석하기
      </button>
    </div>
  );
}

export default ResultPage;

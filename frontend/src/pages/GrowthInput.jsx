import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./GrowthInput.css";

function GrowthInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const cropId = location.state?.cropId; // CropSelect에서 전달된 작물 ID

  const [data, setData] = useState({
    temperature: "",
    humidity: "",
    soil: "",
    light: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    navigate("/result", {
      state: {
        cropId,
        growthData: data,
      },
    });
  };

  return (
    <div className="input-page">
      <h1>🌡 생육 데이터 입력</h1>
      <p className="crop-label">선택한 작물: {cropId}</p>

      <div className="input-box">
        <label>온도 (℃)</label>
        <input name="temperature" type="number" onChange={handleChange} />

        <label>습도 (%)</label>
        <input name="humidity" type="number" onChange={handleChange} />

        <label>토양 수분 (%)</label>
        <input name="soil" type="number" onChange={handleChange} />

        <label>조도 (lux)</label>
        <input name="light" type="number" onChange={handleChange} />

        <button className="submit-btn" onClick={handleSubmit}>
          AI 분석 요청하기
        </button>
      </div>
    </div>
  );
}

export default GrowthInput;

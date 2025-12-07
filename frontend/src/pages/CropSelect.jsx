import { useNavigate } from "react-router-dom";
import "./CropSelect.css";

function CropSelect() {
  const navigate = useNavigate();

  const crops = [
    { name: "토마토", id: "tomato" },
    { name: "상추", id: "lettuce" },
    { name: "오이", id: "cucumber" },
    { name: "딸기", id: "strawberry" }
  ];

  const handleSelect = (cropId) => {
    navigate("/input", { state: { cropId } });
  };

  return (
    <div className="crop-page">
      <h1>🌱 작물 선택</h1>
      <p>분석할 작물을 선택하세요.</p>

      <div className="crop-list">
        {crops.map((crop) => (
          <button
            key={crop.id}
            className="crop-button"
            onClick={() => handleSelect(crop.id)}
          >
            {crop.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CropSelect;

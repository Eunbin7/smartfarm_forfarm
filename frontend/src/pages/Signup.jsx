import React, { useState } from "react";
import "../css/Home.css"; // 기존 디자인 그대로 사용
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css"; // 기존 디자인 그대로 사용

export default function Signup() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPw2, setUserPw2] = useState("");
  const [userName, setUserName] = useState(""); // 지금은 DB에 안 넣지만, 나중 확장용
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!userId.trim() || !userPw.trim() || !userPw2.trim() || !userName.trim()) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (userPw !== userPw2) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 백엔드 회원가입 API 호출 (POST /signup)
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userPw: userPw,
          // userName은 지금 users 테이블에 없으니 백엔드에 안 보내도 되고,
          // 보내더라도 백엔드에서 안 쓸 수 있음.
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        // 백엔드에서 실패 이유를 message로 내려줬다면 사용 가능
        alert(data.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* 사이드바 유지 */}
      <Sidebar />

      {/* 회원가입 메인 */}
      <main className="home-main">
        <div className="signup-card">
          <h2 className="signup-title">회원가입</h2>
          <p className="signup-desc">아래 정보를 입력하여 계정을 생성하세요.</p>

          {/* 이름 */}
          <input
            type="text"
            className="signup-input"
            placeholder="이름을 입력하세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* 아이디 */}
          <input
            type="text"
            className="signup-input"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          {/* 비밀번호 */}
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호를 입력하세요"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />

          {/* 비밀번호 확인 */}
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호를 다시 입력하세요"
            value={userPw2}
            onChange={(e) => setUserPw2(e.target.value)}
          />

          <button
            className="signup-submit"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>

          <p className="signup-help">
            이미 계정이 있나요?{" "}
            <span className="signup-link" onClick={() => navigate("/login")}>
              로그인하기
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

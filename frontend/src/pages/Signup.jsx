import React, { useState } from "react";
import "../css/Home.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPw2, setUserPw2] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // 입력값 체크
    if (!userName.trim() || !userId.trim() || !userPw.trim() || !userPw2.trim()) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (userPw !== userPw2) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // 🔥 서버에서 req.body.userId, userPw, userName 으로 받음
          userId,
          userPw,
          userName,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
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
      <Sidebar />

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

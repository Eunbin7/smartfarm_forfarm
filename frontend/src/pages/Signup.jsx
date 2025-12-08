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
  const [userName, setUserName] = useState("");

  const handleSignup = () => {
    if (!userId.trim() || !userPw.trim() || !userPw2.trim() || !userName.trim()) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (userPw !== userPw2) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    alert("회원가입이 완료되었습니다!");
    navigate("/login");
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

          <button className="signup-submit" onClick={handleSignup}>
            회원가입
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

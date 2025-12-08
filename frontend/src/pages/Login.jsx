import React, { useState } from "react";
import "../css/Home.css";   // 기존 디자인 스타일 그대로 사용
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 (선택)

  const handleLogin = async () => {
    if (!userId.trim() || !userPw.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 백엔드 로그인 API 호출 (POST /login)
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userPw: userPw,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("로그인 성공!");
        localStorage.setItem("userName", data.userName);
        navigate("/"); // 메인으로 이동
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* 사이드바 그대로 적용 */}
      <Sidebar />

      {/* 로그인 메인 화면 */}
      <main className="home-main">
        <div className="login-card">

          <h2 className="login-title">로그인</h2>
          <p className="login-desc">서비스 이용을 위해 로그인해주세요.</p>

          {/* 아이디 입력 */}
          <input
            type="text"
            className="login-input"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호를 입력하세요"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />

          {/* 로그인 버튼 */}
          <button
            className="login-submit"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          {/* 회원가입 링크 */}
          <p className="login-help">
            계정이 없나요?{" "}
            <span className="login-link" onClick={() => navigate("/signup")}>
              회원가입
            </span>
          </p>

        </div>
      </main>
    </div>
  );
}

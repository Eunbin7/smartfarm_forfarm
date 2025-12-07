import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CropSelect from "./pages/CropSelect";
import GrowthInput from "./pages/GrowthInput";
import ResultPage from "./pages/ResultPage";


function App() {
  return (
    <Router>
      <div className="app">

        {/* 상단 공통 메뉴 */}
        <nav className="top-menu">
          <Link to="/">소개</Link>
          <Link to="/select">작물 선택</Link>
        </nav>

        <Routes>

          {/* 소개 페이지 */}
          <Route
            path="/"
            element={
              <>
                <header className="app-header">
                  <h1>생성형 AI를 활용한 작물 생육 진단 및 스마트팜 관리 플랫폼 개발</h1>
                  <p>스마트팜 생육 진단 & 관리 웹 시스템 소개</p>
                </header>

                <main className="app-main">
                  <section className="card">
                    <h2>1. 개발 목적</h2>
                    <p>
                      본 프로젝트의 개발 목적은 스마트팜 환경에서 발생하는 주요 생육 데이터를
                      효과적으로 분석하고, 생성형 AI 기반의 자동 진단 기능을 통해
                      사용자(농업 관리자)가 작물의 생육 상태를 쉽고 직관적으로 파악할 수
                      있도록 지원하는 웹 기반 관리 시스템을 구축하는 데 있다.
                    </p>
                    <p>
                      스마트팜 환경에서는 온도, 습도, 토양 수분, 조도 등 다양한 센서 데이터가
                      지속적으로 생성되나, 이러한 데이터를 활용한 상태 분석 및 문제 파악은
                      전문 지식이 없으면 이해하기 어렵다는 한계가 존재한다.
                    </p>
                    <p>
                      따라서 본 웹서비스는 작물 선택 시 자동으로 적정 생육 범위를 제공하고,
                      사용자가 직접 입력한 값 또는 센서로부터 수집된 데이터를 기반으로
                      생성형 AI가 현재 작물의 상태를 분석하여 문제 원인과 해결 방안을
                      제시하는 기능을 제공한다.
                    </p>
                  </section>

                  <section className="card">
                    <h2>2. 개발 방법</h2>
                    <p>
                      본 프로젝트는 스마트팜 환경에서 생성되는 생육 데이터를 웹 기반으로
                      관리하고, 생성형 AI를 활용하여 작물 상태를 자동으로 분석·진단하는
                      시스템을 구축하는 방식으로 개발한다.
                    </p>
                    <p>
                      작물별 적정 생육 조건(온도, 습도, 토양 수분, 조도 등)을 데이터베이스에
                      저장하여 사용자가 작물을 선택할 때 자동으로 참조할 수 있도록 구성한다.
                    </p>
                  </section>

                  <section className="card">
                    <h2>3. HW 구성도</h2>
                    <p>
                      온도·습도·토양 수분·조도 센서 → 라즈베리파이(데이터 수집) → Wi-Fi 통신 →
                      웹서버 → 웹 UI
                    </p>
                  </section>

                  <section className="card">
                    <h2>4. SW 구성도</h2>
                    <ul>
                      <li>프론트엔드: React 기반 웹 클라이언트</li>
                      <li>백엔드: Node.js 또는 Python 기반 REST API 서버</li>
                      <li>AI 분석 모듈: GPT 기반 생성형 AI</li>
                      <li>DB: 작물 정보 및 사용자 입력 로그 저장</li>
                    </ul>
                  </section>

                  <section className="card">
                    <h2>5. 구현 방법</h2>
                    <p>
                      프론트엔드는 React 기반으로 작물 선택, 데이터 입력, 분석 결과 UI 제공.
                    </p>
                    <p>
                      백엔드는 적정 생육 범위와 비교 분석 후 AI 모듈에 전달하여 결과 생성.
                    </p>
                  </section>

                  <section className="card">
                    <h2>6. 사용 기술</h2>
                    <ul>
                      <li>Frontend: React, HTML/CSS</li>
                      <li>Backend: Node.js 또는 Python</li>
                      <li>DB: MySQL 또는 SQLite</li>
                      <li>AI: OpenAI GPT API</li>
                    </ul>
                  </section>
                </main>
              </>
            }
          />

          {/* 작물 선택 페이지 */}
          <Route path="/select" element={<CropSelect />} />
          <Route path="/input" element={<GrowthInput />} />
          <Route path="/result" element={<ResultPage />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;

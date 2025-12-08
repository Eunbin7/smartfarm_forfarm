// server.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 🔹 MySQL 연결 (네 환경에 맞게 수정!)
const db = mysql.createConnection({
  host: "192.168.1.119",
  user: "root",        // ✅ 네 MySQL 아이디
  password: "1234", // ✅ 네 MySQL 비밀번호
  database: "forfarm", // ✅ users 테이블이 들어있는 DB 이름
});

// 연결 테스트
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL 연결 실패:", err);
  } else {
    console.log("✅ MySQL 연결 성공!");
  }
});

// 🔹 테스트용 기본 라우트
app.get("/", (req, res) => {
  res.send("백엔드 서버 잘 돌아가는 중!");
});

// 🔹 회원가입 API
app.post("/signup", (req, res) => {
  const { userId, userPw, userName } = req.body;

  if (!userId || !userPw || !userName) {
    return res
      .status(400)
      .json({ success: false, message: "필수 값 없음" });
  }

  const sql =
    "INSERT INTO users (user_id, passwd, user_name) VALUES (?, ?, ?)";

  db.query(sql, [userId, userPw, userName], (err) => {
    if (err) {
      console.error("회원가입 에러:", err);
      return res
        .status(500)
        .json({ success: false, message: "DB 에러" });
    }

    return res.json({ success: true });
  });
});


// 🔹 로그인 API
app.post("/login", (req, res) => {
  const { userId, userPw } = req.body;

  const sql = "SELECT * FROM users WHERE user_id = ? AND passwd = ?";
  db.query(sql, [userId, userPw], (err, results) => {
    if (err) {
      console.error("로그인 에러:", err);
      return res.status(500).json({ success: false, message: "DB 에러" });
    }
    

if (results.length > 0) {
  return res.json({
    success: true,
    userName: results[0].user_name   // ⭐ 추가됨
  });
} else {
  return res.json({ success: false });
}
  });
});

// 서버 실행
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});

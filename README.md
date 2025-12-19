# 🌱 SmartFarm_ForFarm

IoT 기반 스마트팜 관리 시스템  
농작물 생육 환경을 자동으로 제어하고 모니터링하는 웹 기반 스마트팜 플랫폼

---

## 💡 Description | 설명
- 농작물 재배 환경을 효율적으로 관리하기 위한 스마트팜 시스템  
- 센서 데이터를 기반으로 온도·습도 등 생육 환경을 모니터링  
- 웹을 통해 실시간 상태 확인 및 제어 기능 제공  
- 농업 자동화를 통해 생산성 향상과 관리 효율 증대를 목표로 함  

---

## 📱 Features | 기능
- 실시간 온도·습도 등 환경 데이터 수집 및 시각화  
- 웹 대시보드를 통한 스마트팜 상태 모니터링  
- 자동/수동 환경 제어 기능 제공  
- 농장 관리 효율을 고려한 사용자 중심 UI 설계  

---

## 💻 Stack | 기술 스택
- Frontend: HTML, CSS, JavaScript  
- Backend: Java, Spring  
- Database: MySQL  
- IoT / Sensor: 환경 센서 연동 (온도·습도 등)  
- Environment: Web-based Monitoring System  

---

## ⚙️ Structure | 구조
1. 센서에서 환경 데이터 수집  
2. 수집된 데이터를 서버로 전송 및 DB 저장  
3. 웹 서버에서 데이터 처리 및 가공  
4. 사용자 화면에서 실시간 데이터 시각화 및 제어 기능 제공  

---

## 🛠 Installation | 설치 및 실행 방법

### 1️⃣ 프로젝트 클론
```bash
git clone https://github.com/your-repo/smartfarm_forfarm.git
cd smartfarm_forfarm
```
### 2️⃣ Backend 설정 및 실행
```bash
cd backend
./gradlew bootRun # 또는 사용하는 실행 명령어로 변경
```
### 3️⃣ Database 설정
```bash
DB_URL=jdbc:mysql://localhost:3306/smartfarm
DB_USERNAME=your_username
DB_PASSWORD=your_password
```
### 4️⃣ Frontend 실행
```bash
cd frontend
```

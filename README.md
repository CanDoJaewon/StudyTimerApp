# 📚 Study Timer App

간단한 포모도로/집중 타이머 애플리케이션입니다. 공부 시간을 추적하고 날짜별로 누적 기록을 관리할 수 있습니다.

## ✨ 주요 기능

- 🕐 실시간 타이머 (시작/정지/저장/초기화)
- 📊 날짜별 누적 시간 기록
- 🌍 한국어/영어 다국어 지원
- 💾 브라우저 로컬 스토리지에 데이터 저장
- 📱 반응형 디자인

## 🚀 배포 방법

### 1. GitHub 저장소 생성
- GitHub에서 새 저장소를 생성합니다
- 저장소 이름을 기억해두세요 (예: `timer-app`)

### 2. 로컬 저장소 초기화 및 푸시
```bash
# Git 저장소 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit"

# 원격 저장소 추가 (YOUR_USERNAME과 REPOSITORY_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. package.json 수정
`package.json` 파일의 `homepage` 필드를 실제 GitHub 사용자명과 저장소명으로 수정하세요:

```json
"homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME"
```

### 4. 의존성 설치 및 빌드
```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# GitHub Pages에 배포
npm run deploy
```

### 5. GitHub Pages 설정
- GitHub 저장소 설정 → Pages
- Source를 "Deploy from a branch"로 설정
- Branch를 "gh-pages"로 설정
- Save 클릭

## 🛠️ 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
TimerApp/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # 메인 타이머 컴포넌트
│   ├── App.css         # Tailwind CSS
│   ├── index.js        # 앱 진입점
│   └── index.css       # 기본 스타일
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 기술 스택

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## �� 라이선스

MIT License

# 📚 Study Timer App

A simple Pomodoro/focus timer application for tracking study time and managing cumulative records by date.

## ✨ Features

- 🕐 Real-time timer (Start/Stop/Save/Reset)
- 📊 Daily cumulative time tracking
- 🌍 Korean/English multilingual support
- 💾 Data stored in browser localStorage
- 📱 Responsive design

## 🚀 Deployment Guide

### 1. Create GitHub Repository
- Create a new repository on GitHub
- Remember the repository name (e.g., `StudyTimerApp`)

### 2. Initialize Local Repository and Push
```bash
# Initialize Git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit"

# Add remote repository (replace YOUR_USERNAME and REPOSITORY_NAME with actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Update package.json
Modify the `homepage` field in `package.json` with your actual GitHub username and repository name:

```json
"homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME"
```

### 4. Install Dependencies and Deploy
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### 5. GitHub Pages Settings
- Go to GitHub repository → Settings → Pages
- Set Source to "Deploy from a branch"
- Set Branch to "gh-pages"
- Click Save

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Project Structure

```
TimerApp/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main timer component
│   ├── App.css         # Tailwind CSS
│   ├── index.js        # App entry point
│   └── index.css       # Base styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 📝 License

MIT License

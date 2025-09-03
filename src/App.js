import React, { useEffect, useRef, useState } from "react";

// ---- i18n ----
const TEXT = {
  ko: {
    title: "📚 공부 전용 타이머",
    subtitle:
      "간단한 포모도로/집중 타이머. 저장하면 날짜별로 누적 기록됩니다 (브라우저 로컬 저장).",
    start: "시작",
    stop: "끝(일시정지)",
    save: "저장 (오늘에 합산)",
    reset: "초기화(이번 세션)",
    todayAccum: "오늘 누적:",
    sessions: "세션",
    historyTitle: "📆 날짜별 기록",
    deleteAll: "모든 기록 삭제",
    noHistory:
      "아직 저장된 기록이 없어요. 타이머를 시작하고, 멈춘 뒤 ",
    pressSave: "저장",
    noHistoryTail: "을 눌러보세요.",
    date: "날짜",
    total: "총 시간",
    sessionCount: "세션 수",
    sessionList: "세션 목록",
    localNote: "* 데이터는 이 브라우저의 로컬 저장소(localStorage)에만 저장됩니다.",
    tips:
      "사용 팁: 집중 시작 → 시작 · 잠깐 쉬기 → 끝(일시정지) · 오늘 합산하려면 저장을 누르세요. 저장 후 타이머는 0으로 초기화됩니다.",
    confirmClear: "정말로 모든 기록을 삭제할까요? 되돌릴 수 없습니다.",
    langKo: "한국어",
    langEn: "English",
    today: "오늘",
  },
  en: {
    title: "📚 Study Timer",
    subtitle:
      "A simple focus/Pomodoro timer. When you save, it accumulates by date (stored in browser localStorage).",
    start: "Start",
    stop: "Stop (Pause)",
    save: "Save (Add to Today)",
    reset: "Reset (This Session)",
    todayAccum: "Today's total:",
    sessions: "session(s)",
    historyTitle: "📆 Daily History",
    deleteAll: "Delete All",
    noHistory:
      "No records yet. Start the timer, pause, then press ",
    pressSave: "Save",
    noHistoryTail: ".",
    date: "Date",
    total: "Total Time",
    sessionCount: "# Sessions",
    sessionList: "Sessions",
    localNote:
      "* Data is saved only in this browser's localStorage.",
    tips:
      "Tip: Start focusing → Start · Take a break → Stop (Pause) · To add to today's total, press Save. After saving, the timer resets to 0.",
    confirmClear:
      "Delete ALL history? This cannot be undone.",
    langKo: "한국어",
    langEn: "English",
    today: "Today",
  },
};

// ---- Utility helpers ----
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const fmt = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const todayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const STORAGE_KEY = "studyTimerHistory";
const LANG_KEY = "studyTimerLang";

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Failed to parse history, resetting.");
    return {};
  }
}

function saveHistory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    return raw === "en" || raw === "ko" ? raw : (navigator.language || "ko").startsWith("ko") ? "ko" : "en";
  } catch {
    return "ko";
  }
}

function App() {
  const [elapsed, setElapsed] = useState(0); // seconds in current session
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState(loadHistory());
  const [lang, setLang] = useState(loadLang());
  const tickRef = useRef(null);

  const t = (k) => TEXT[lang][k];

  // start timer
  const handleStart = () => {
    if (running) return;
    setRunning(true);
  };

  // stop/pause timer
  const handleStop = () => {
    if (!running) return;
    setRunning(false);
  };

  // save current session into today's total
  const handleSave = () => {
    if (elapsed <= 0) return; // ignore empty sessions
    const key = todayKey();
    const next = { ...history };
    if (!next[key]) next[key] = { totalSeconds: 0, sessions: [] };
    next[key].totalSeconds += elapsed;
    next[key].sessions.push({ seconds: elapsed, at: Date.now() });
    setHistory(next);
    saveHistory(next);

    // reset current session
    setElapsed(0);
    setRunning(false);
  };

  // clear just today's current session (not saved)
  const handleResetSession = () => {
    setElapsed(0);
    setRunning(false);
  };

  // optional: clear all history
  const handleClearAll = () => {
    if (!confirm(TEXT[lang].confirmClear)) return;
    const empty = {};
    setHistory(empty);
    saveHistory(empty);
    setElapsed(0);
    setRunning(false);
  };

  // ticking effect
  useEffect(() => {
    if (running) {
      tickRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [running]);

  // persist language choice
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  // derived: today's total
  const today = todayKey();
  const todayTotal = history[today]?.totalSeconds ?? 0;
  const todaySessions = history[today]?.sessions?.length ?? 0;

  // build sorted history rows (latest first)
  const rows = Object.entries(history)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, info]) => ({ date, ...info }));

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 p-6">
      <div className="max-w-2xl mx-auto relative">
        {/* Lang Switcher */}
        <div className="absolute right-0 -top-2 flex items-center gap-2">
          <button
            onClick={() => setLang("ko")}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              lang === "ko" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:bg-slate-100"
            }`}
            aria-pressed={lang === "ko"}
          >
            {TEXT[lang].langKo}
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              lang === "en" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:bg-slate-100"
            }`}
            aria-pressed={lang === "en"}
          >
            {TEXT[lang].langEn}
          </button>
        </div>

        <header className="mb-6 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-slate-600 mt-1">{t("subtitle")}</p>
        </header>

        {/* Timer Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-slate-100">
          <div className="flex items-center justify-center">
            <div className="text-6xl font-mono tabular-nums select-none" aria-live="polite" aria-atomic>
              {fmt(elapsed)}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <button
              onClick={handleStart}
              className={`px-4 py-2 rounded-xl shadow text-sm font-medium border transition ${
                running ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700"
              }`}
              disabled={running}
            >
              {t("start")}
            </button>
            <button
              onClick={handleStop}
              className={`px-4 py-2 rounded-xl shadow text-sm font-medium border transition ${
                !running ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-amber-500 text-white border-amber-600 hover:bg-amber-600"
              }`}
            >
              {t("stop")}
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl shadow text-sm font-medium border transition ${
                elapsed <= 0 ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700"
              }`}
              disabled={elapsed <= 0}
            >
              {t("save")}
            </button>
            <button
              onClick={handleResetSession}
              className="px-4 py-2 rounded-xl shadow text-sm font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              {t("reset")}
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <p>
              {t("todayAccum")} <span className="font-semibold text-slate-900">{fmt(todayTotal)}</span> ({todaySessions} {t("sessions")})
            </p>
          </div>
        </div>

        {/* History */}
        <section className="bg-white rounded-2xl shadow p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("historyTitle")}</h2>
            <button onClick={handleClearAll} className="text-xs px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50">
              {t("deleteAll")}
            </button>
          </div>

          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">
              {t("noHistory")}<span className="font-medium text-slate-700">{t("pressSave")}</span>{t("noHistoryTail")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b">
                    <th className="py-2 pr-4">{t("date")}</th>
                    <th className="py-2 pr-4">{t("total")}</th>
                    <th className="py-2 pr-4">{t("sessionCount")}</th>
                    <th className="py-2 pr-4">{t("sessionList")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.date} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium">{r.date}</td>
                      <td className="py-2 pr-4">{fmt(r.totalSeconds)}</td>
                      <td className="py-2 pr-4">{r.sessions.length}</td>
                      <td className="py-2 pr-4 text-slate-600">
                        {r.sessions
                          .slice()
                          .reverse()
                          .map((s, i) => (
                            <span key={i} className="inline-block mr-2 mb-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {fmt(s.seconds)}
                            </span>
                          ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-500">{t("localNote")}</p>
        </section>

        {/* Tips */}
        <div className="mt-6 text-xs text-slate-500 leading-relaxed">
          <p>{t("tips")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

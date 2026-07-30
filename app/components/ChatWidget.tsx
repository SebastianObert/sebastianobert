"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { api, MessageDto, SessionDto } from "../../lib/api";
import ChatMessage from "./ChatMessage";
import PhoneHomeScreen from "./PhoneHomeScreen";
import PhoneSettingsScreen from "./PhoneSettingsScreen";
import LuckyBoxScreen from "./LuckyBoxScreen";
import StoreScreen from "./StoreScreen";
import LoginModal from "./LoginModal";
import { useAuth } from "../../lib/auth";
import { useTheme } from "../../lib/theme";
import { getEnergy, useEnergy } from "../../lib/store";
import { CHAT_BASE_LIMIT } from "../../lib/defaults";

type Screen = "home" | "chat" | "luckybox" | "store" | "settings";

function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }));
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);

  const { sunset } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-1 text-[11px]" style={{ color: sunset ? "var(--text-secondary)" : "#cbd5e1", backgroundColor: sunset ? "var(--phone-bg)" : "black" }}>
      <span className="font-medium">{time}</span>
      <div className="flex items-center gap-1.5" style={{ color: sunset ? "var(--text-secondary)" : "#cbd5e1" }}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
      </div>
    </div>
  );
}

function NavBar({ onBack, onHome, onFullscreen, isFullscreen }: { onBack: () => void; onHome: () => void; onFullscreen: () => void; isFullscreen: boolean }) {
  const { sunset } = useTheme();
  return (
    <div className="flex items-center justify-around px-6 py-2 border-t" style={{ backgroundColor: sunset ? "var(--phone-bg)" : "black", borderColor: "var(--phone-border)" }}>
      <button onClick={onBack} className="p-1.5 rounded-full hover:bg-slate-800 transition" aria-label="Back">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={onHome} className="p-1.5 rounded-full hover:bg-slate-800 transition" aria-label="Home">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2" /></svg>
      </button>
      <button onClick={onFullscreen} className="p-1.5 rounded-full hover:bg-slate-800 transition" aria-label="Fullscreen">
        {isFullscreen ? (
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        )}
      </button>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [sessions, setSessions] = useState<SessionDto[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [greetingLoaded, setGreetingLoaded] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const [quota, setQuota] = useState({ used: 0, limit: 3, remaining: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [bgColor, setBgColor] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBgColor(localStorage.getItem("phoneBg") || "");
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      goChat();
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, [user]);

  // Re-fetch greeting when user changes (login/logout)
  useEffect(() => {
    setMessages([]);
    setSessionId(undefined);
    setGreetingLoaded(false);
    if (screen === "chat") {
      loadQuota();
      const name = user?.email?.split("@")[0] || null;
      const nameParam = name ? `?name=${encodeURIComponent(name)}` : "";
      fetch(`/api/chat${nameParam}`).then(r => r.json()).then(data => {
        setMessages([{ id: crypto.randomUUID(), role: "assistant", content: data.reply, createdAt: new Date().toISOString() }]);
      }).catch(() => {});
    }
  }, [user]);

  const goChatIfAuth = () => {
    goChat();
  };

  const goLuckyBoxIfAuth = () => {
    goLuckyBox();
  };

  const goStoreIfAuth = () => {
    goStore();
  };

  const loadSessions = useCallback(async () => {
    const s = await api.getSessions(user?.id);
    setSessions(s);
  }, [user]);

  const loadQuota = useCallback(async () => {
    if (!user) {
      setQuota({ used: 0, limit: 0, remaining: 0 });
      setQuotaExhausted(true);
      return;
    }
    const q = await api.fetchQuota(user?.id);
    let dynamicLimit = CHAT_BASE_LIMIT;
    let userUsed = q.used;
    if (user) {
      dynamicLimit = CHAT_BASE_LIMIT + getEnergy(user.id);
      const today = new Date().toISOString().slice(0, 10);
      const stored = localStorage.getItem(`chat_usage_${user.id}_${today}`);
      if (stored) userUsed = parseInt(stored, 10) || 0;
    }
    const remaining = Math.max(0, dynamicLimit - userUsed);
    setQuota({ used: userUsed, limit: dynamicLimit, remaining });
    if (remaining <= 0) setQuotaExhausted(true);
    else setQuotaExhausted(false);
  }, [user]);

  useEffect(() => {
    if (isOpen) { loadSessions(); loadQuota(); }
  }, [isOpen, loadSessions, loadQuota]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const goHome = () => setScreen("home");
  const goChat = async () => {
    setScreen("chat");
    loadQuota();
    if (messages.length === 0 && !greetingLoaded) {
      setGreetingLoaded(true);
      const name =
        user?.user_metadata?.username ||
        user?.email?.split("@")[0] ||
        null;
      const nameParam = name ? `?name=${encodeURIComponent(name)}` : "";
      try {
        const res = await fetch(`/api/chat${nameParam}`);
        const data = await res.json();
        const greetMsg: MessageDto = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          createdAt: new Date().toISOString(),
        };
        setMessages([greetMsg]);
      } catch {
        // fallback biar ga error
      }
    }
  };
  const goLuckyBox = () => setScreen("luckybox");
  const goStore = () => setScreen("store");
  const goSettings = () => setScreen("settings");
  const goBack = () => { if (screen === "chat" || screen === "luckybox" || screen === "store" || screen === "settings") goHome(); };

  const newChat = () => {
    setMessages([]);
    setSessionId(undefined);
    setSidebarOpen(false);
    setGreetingLoaded(false);
    setQuotaExhausted(false);
  };

  const loadSession = async (id: string) => {
    setSessionId(id);
    const history = await api.getChatHistory(id);
    setMessages(history);
    setSidebarOpen(false);
  };

  const deleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await api.deleteSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (sessionId === id) newChat();
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading || !user) return;

    const userMsg: MessageDto = { id: crypto.randomUUID(), role: "user", content: text, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
      const res = await api.sendChat(chatHistory, sessionId, user?.id);
      if (res.limitReached) {
        setQuotaExhausted(true);
      }
      if (res.sessionId && !sessionId) {
        setSessionId(res.sessionId);
        loadSessions();
      }
      const botMsg: MessageDto = { id: crypto.randomUUID(), role: "assistant", content: res.reply, createdAt: new Date().toISOString() };
      setMessages((prev) => [...prev, botMsg]);
      if (user) {
        const today = new Date().toISOString().slice(0, 10);
        const stored = parseInt(localStorage.getItem(`chat_usage_${user.id}_${today}`) || "0", 10);
        localStorage.setItem(`chat_usage_${user.id}_${today}`, String(stored + 1));
        if (stored + 1 > CHAT_BASE_LIMIT) {
          useEnergy(user.id, 1);
        }
      }
      loadQuota();
    } catch {
      const errMsg: MessageDto = { id: crypto.randomUUID(), role: "assistant", content: "Terjadi kesalahan. Coba lagi nanti.", createdAt: new Date().toISOString() };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Toggle phone"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        )}
      </button>

      {/* Phone mockup */}
      <div
        className={`fixed z-40 rounded-[2rem] shadow-2xl border-2 overflow-hidden transition-all duration-300 overscroll-contain ${
          isFullscreen
            ? "inset-x-2 top-16 bottom-2 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[calc(100vw-6rem)] md:h-[calc(100vh-8rem)] md:max-w-[800px] md:max-h-[700px]"
            : "bottom-20 right-6 w-[290px] max-w-[calc(100vw-3rem)] origin-bottom-right"
        } ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--phone-bg)",
          borderColor: "var(--phone-border)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Bezel inner padding */}
        <div className={`flex flex-col overscroll-contain ${isFullscreen ? "h-full" : "h-[40rem]"}`}>
          {/* Status bar */}
          <StatusBar />

          {/* Screen */}
          <div className="flex-1 flex flex-col overflow-hidden relative" style={{ backgroundColor: "var(--phone-screen)" }}>
            <div key={screen} className="flex-1 flex flex-col animate-screenIn min-h-0">
              {screen === "home" && (
                <PhoneHomeScreen onOpenChat={goChatIfAuth} onOpenLuckyBox={goLuckyBoxIfAuth} onOpenStore={goStoreIfAuth} onOpenSettings={goSettings} bgColor={bgColor} />
              )}

              {screen === "settings" && (
                <PhoneSettingsScreen onBack={goHome} onBgChange={(bg) => setBgColor(bg)} bgColor={bgColor} />
              )}

              {screen === "luckybox" && (
                <LuckyBoxScreen onBack={goHome} isFullscreen={isFullscreen} />
              )}

              {screen === "store" && (
                <StoreScreen onBack={goHome} />
              )}

              {screen === "chat" && (
              <>
                {/* Chat header */}
                <div className="bg-slate-800 px-3 py-2 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSidebarOpen(!sidebarOpen); loadSessions(); }}
                      className="w-6 h-6 flex flex-col items-center justify-center gap-[2.5px] rounded hover:bg-slate-700 transition flex-shrink-0"
                      aria-label="Chat sessions"
                    >
                      <span className="w-3 h-[1.5px] bg-slate-400 rounded-full" />
                      <span className="w-3 h-[1.5px] bg-slate-400 rounded-full" />
                      <span className="w-3 h-[1.5px] bg-slate-400 rounded-full" />
                    </button>

                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-500/50 flex-shrink-0">
                      <Image src="/profil_sebastian.jpeg" alt="Sebastian Obert" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-[11px] truncate">Sebastian Obert</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-emerald-400 text-[9px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                          Online
                        </p>
                        {user && (
                          <p className="text-[9px] flex items-center gap-1 text-slate-400">
                            <svg className="w-2.5 h-2.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            <span>{quota.remaining}/{quota.limit}</span>
                            <span className="text-slate-600">AI Credit</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex relative overflow-hidden min-h-0">
                  {/* Sessions sidebar */}
                  <div className={`absolute inset-y-0 left-0 w-44 bg-slate-800 border-r border-slate-700 z-20 flex flex-col transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`}>
                    <div className="p-2 border-b border-slate-700">
                      <button
                        onClick={newChat}
                        className="w-full flex items-center gap-1.5 px-2 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-medium rounded transition"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Chat Baru
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin">
                      {sessions.length === 0 && (
                        <p className="text-slate-600 text-[10px] text-center mt-6">Belum ada sesi</p>
                      )}
                      {sessions.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => loadSession(s.id)}
                          className={`w-full text-left px-2 py-1.5 rounded text-[11px] transition group flex items-start gap-1.5 ${
                            sessionId === s.id ? "bg-slate-700 text-white" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                          }`}
                        >
                          <svg className="w-3 h-3 mt-0.5 flex-shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{s.title}</p>
                            <p className="text-[9px] text-slate-600 mt-0.5">{formatTime(s.createdAt)}</p>
                          </div>
                          <span
                            onClick={(e) => deleteSession(s.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-600 transition flex-shrink-0 cursor-pointer"
                            aria-label="Hapus sesi"
                          >
                            <svg className="w-2.5 h-2.5 text-slate-500 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar overlay */}
                  {sidebarOpen && (
                    <div className="absolute inset-0 z-10" onClick={() => setSidebarOpen(false)} />
                  )}

                  {/* Messages + Input */}
                  <div className="flex-1 flex flex-col min-w-0 min-h-0">
                    <div className="flex-1 overflow-y-auto px-2.5 py-2.5 space-y-2.5 scrollbar-thin overscroll-contain">
                      {messages.length === 0 && (
                        <div className="text-center text-slate-500 text-[10px] mt-14">
                          <p className="mb-1">Halo! Ada yang bisa saya bantu?</p>
                          <p className="text-[9px] text-slate-600">Tanya seputar profil, skill, atau proyek saya.</p>
                        </div>
                      )}
                      {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                      ))}
                      {isLoading && (
                        <div className="flex gap-1 justify-start">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-slate-700 px-2 py-1.5">
                      <div className="flex gap-1.5">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && send()}
                          placeholder={!user ? "Login untuk chat" : quotaExhausted ? "Batas chat hari ini habis" : "Ketik pesan..."}
                          className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-2.5 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                          disabled={isLoading || quotaExhausted || !user}
                        />
                        <button
                          onClick={send}
                          disabled={isLoading || !input.trim() || quotaExhausted || !user}
                          className="w-7 h-7 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div></div>

          {/* Navigation bar */}
          <NavBar onBack={goBack} onHome={goHome} onFullscreen={() => setIsFullscreen(!isFullscreen)} isFullscreen={isFullscreen} />
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

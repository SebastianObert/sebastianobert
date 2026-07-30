"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth";

type Mode = "login" | "register";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) return setError("Username minimal 3 karakter");
    if (password.length < 6) return setError("Password minimal 6 karakter");
    if (mode === "register" && password !== confirmPassword) return setError("Password tidak cocok");

    setLoading(true);
    const err = mode === "login"
      ? await login(username.trim(), password)
      : await register(username.trim(), password);
    setLoading(false);

    if (err) setError(err);
    else onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm mx-4 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">
            {mode === "login" ? "Login" : "Register"}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 transition" aria-label="Close">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-slate-400 text-[11px] font-medium mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-[13px] placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              placeholder="Masukkan username"
              autoFocus
            />
          </div>

          <div>
            <label className="text-slate-400 text-[11px] font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-[13px] placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              placeholder="Masukkan password"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="text-slate-400 text-[11px] font-medium mb-1 block">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-[13px] placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                placeholder="Ulangi password"
              />
            </div>
          )}

          {error && <p className="text-red-400 text-[11px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-[13px] font-semibold rounded-lg transition active:scale-[0.98]"
          >
            {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <div className="mt-4 text-center text-[11px]">
          {mode === "login" ? (
            <p className="text-slate-500">
              Belum punya akun?{" "}
              <button onClick={() => { setMode("register"); setError(""); }} className="text-cyan-400 hover:underline font-medium">
                Daftar
              </button>
            </p>
          ) : (
            <p className="text-slate-500">
              Sudah punya akun?{" "}
              <button onClick={() => { setMode("login"); setError(""); }} className="text-cyan-400 hover:underline font-medium">
                Masuk
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

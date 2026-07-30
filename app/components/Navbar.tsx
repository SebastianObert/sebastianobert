"use client";

import { useState, useEffect } from "react";
import ScrollElement from "./ScrollElement";
import LoginModal from "./LoginModal";
import { useAuth } from "../../lib/auth";
import { useTheme } from "../../lib/theme";
import { api, NavLink } from "../../lib/api";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const { user, profile, logout } = useAuth();
  const { sunset, toggle: toggleSunset } = useTheme();

  useEffect(() => {
    api.getNavLinks().then(setNavLinks);
  }, []);

  const handleNavClick = (link: NavLink, e: React.MouseEvent) => {
    if (link.label === "Ask AI") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-chat"));
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full site-header z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tighter cursor-pointer z-50" style={{ color: "var(--fg-color)" }} onClick={() => window.scrollTo(0,0)}>
              So<span className="text-cyan-400 animate-subtle-glow">C</span>
            </h1>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(link, e)} className="px-4 py-2 text-sm font-medium transition-colors duration-200 relative group" style={{ color: "var(--text-secondary)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-color)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-3/4 transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Sunset toggle */}
              <button onClick={toggleSunset} className="p-1.5 rounded-lg hover:bg-slate-700/50 transition text-slate-400 hover:text-amber-400" aria-label="Toggle warm mode">
                {sunset ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
              </button>

              {/* Desktop auth */}
              <div className="hidden md:flex items-center gap-2">
                {user && profile ? (
                  <span className="text-slate-300 text-sm font-medium">{profile.username}</span>
                ) : null}
                {user ? (
                  <button onClick={logout} className="text-xs text-slate-500 hover:text-red-400 transition font-medium">
                    Logout
                  </button>
                ) : (
                  <button onClick={() => setShowLogin(true)} className="px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                    Login
                  </button>
                )}
              </div>

              {/* Hamburger */}
              <button
                className="md:hidden text-slate-300 focus:outline-none z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className={`md:hidden absolute top-full left-0 w-full site-header border-b border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-4 flex flex-col items-center gap-4">
              {/* Mobile auth */}
              {user && profile ? (
                <div className="flex items-center gap-2 pb-2 border-b border-slate-700 w-full justify-center">
                  <span className="text-slate-300 text-sm">{profile.username}</span>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-xs text-red-400 hover:text-red-300 transition font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false); }}
                  className="w-full py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
                >
                  Login
                </button>
              )}
              <button onClick={() => { toggleSunset(); }} className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
                {sunset ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
                <span className="text-sm">{sunset ? "Cold" : "Warm"}</span>
              </button>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => { handleNavClick(link, e); setIsMobileMenuOpen(false); }} className="text-slate-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

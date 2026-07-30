"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  register: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase().replace(/\s+/g, "");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const login = useCallback(async (rawUsername: string, password: string): Promise<string | null> => {
    if (!supabase) return "Koneksi database tidak tersedia";
    const username = normalizeUsername(rawUsername);
    if (!username) return "Username tidak valid";

    const { error } = await supabase.auth.signInWithPassword({
      email: `${username}@app.local`,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) return "Username atau password salah";
      return error.message;
    }
    return null;
  }, []);

  const register = useCallback(async (rawUsername: string, password: string): Promise<string | null> => {
    if (!supabase) return "Koneksi database tidak tersedia";
    const username = normalizeUsername(rawUsername);
    if (!username) return "Username tidak valid";
    if (username.length < 3) return "Username minimal 3 karakter";
    if (username.includes("@")) return "Username tidak boleh mengandung @";

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();
    if (existing) return "Username sudah digunakan";

    const { data, error } = await supabase.auth.signUp({
      email: `${username}@app.local`,
      password,
      options: { data: { username } },
    });

    if (error) {
      if (error.message.includes("already registered")) return "Username sudah digunakan";
      return error.message;
    }

    if (!data.session) {
      const err = await login(username, password);
      if (err) return err;
    }
    return null;
  }, []);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

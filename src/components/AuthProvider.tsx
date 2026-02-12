"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Session = { isAuth: boolean; userId: string; role: string } | null;

type AuthContextValue = {
  session: Session;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        setSession(data ?? null);
      } else {
        setSession(null);
      }
    } catch (e) {
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const logout = async () => {
    await fetch("/api/session/logout", { method: "POST" });
    setSession(null);
    // redirect to login
    if (typeof window !== "undefined") window.location.assign("/login");
  };

  const value: AuthContextValue = {
    session,
    isLoading,
    refresh: fetchSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

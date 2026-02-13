"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Session = {
  isAuth: boolean;
  userId: string;
  role: string;
} | null;

const SessionContext = createContext<Session>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    fetch("/api/session")
      .then(r => r.json())
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

"use client";

import { SessionProvider } from "next-auth/react";

export default function NextAuthSessionProvider({ children }) {
  // You can pass `refetchInterval` or `refetchOnWindowFocus` if desired.
  // For now keep defaults; they are fine for most apps.
  return <SessionProvider>{children}</SessionProvider>;
}

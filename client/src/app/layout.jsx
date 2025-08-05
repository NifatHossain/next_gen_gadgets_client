import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/_providers/StoreProvider";
import NextAuthSessionProvider from "@/_providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// You can optionally remove this if you're not using `metadata` in JS
export const metadata = {
  title: "A E-commerce Platform",
  description:
    "Hello, this is a simple e-commerce platform built with Next.js, Redux, and NextAuth for authentication. It features a product catalog, user authentication, and a shopping cart.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthSessionProvider>
          <StoreProvider>
            {children}
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                },
              }}
            />
          </StoreProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

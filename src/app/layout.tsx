import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRIK — Find Cricket Games Near You",
  description:
    "Join pickup cricket matches, meet players, and play anytime — no teams required. Find a game near you in minutes.",
  keywords: ["cricket", "pickup games", "sports", "matchmaking", "local cricket"],
  openGraph: {
    title: "CRIK — Find Cricket Games Near You",
    description:
      "Join pickup cricket matches, meet players, and play anytime — no teams required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

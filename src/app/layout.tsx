import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "madmachines // digital thoughts",
  description: "Random intellectual musings from the digital void - a place where thoughts collide with code, algorithms dance with philosophy, and the terminal never sleeps.",
  keywords: ["blog", "programming", "philosophy", "technology", "digital", "thoughts", "code", "ascii"],
  authors: [{ name: "madmachines" }],
  creator: "madmachines",
  publisher: "madmachines",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "madmachines // digital thoughts",
    description: "Random intellectual musings from the digital void",
    siteName: "madmachines",
  },
  twitter: {
    card: "summary_large_image",
    title: "madmachines // digital thoughts",
    description: "Random intellectual musings from the digital void",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

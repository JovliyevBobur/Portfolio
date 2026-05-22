import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/CustomCursor";
import { PersistentPortrait } from "@/components/PersistentPortrait";
import { LanguageSelector } from "@/components/LanguageSelector";
import Preloader from "@/components/Preloader";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jovliyev Bobur Nuriddin o'g'li",
  description: "Senior Software Engineer Portfolio",
  icons: {
    icon: '/brand-logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <Preloader />
          <CustomCursor />
          <PersistentPortrait />
          <LanguageSelector />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}

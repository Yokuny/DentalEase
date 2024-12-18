import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/helpers/cn.util";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DetalEase",
  description: "DetalEase - A melhor plataforma de gestão de clínicas odontológicas",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">{children}</div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

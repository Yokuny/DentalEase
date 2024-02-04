import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import cn from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DetalEase",
  description: "DetalEase - A melhor plataforma de gestão de clínicas odontológicas",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

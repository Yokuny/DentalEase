import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { GlobalProvider } from "./context";
import { Providers } from "./providers";
import type { ChildrenProps } from "@/types";

import Navbar from "@/components/navbar/navbar";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-3 flex-grow">
              <GlobalProvider>{children}</GlobalProvider>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

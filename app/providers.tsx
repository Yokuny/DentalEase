"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";
import type { ProvidersProps } from "@/types";

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeProvider {...themeProps}>{children}</ThemeProvider>
    </NextUIProvider>
  );
}

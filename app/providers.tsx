"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: Session | null;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        {/* <NextThemesProvider
          defaultTheme="light"
          attribute="class"
          {...themeProps}
        > */}
        <NextTopLoader
          color="#05549F"
          height={5}
          zIndex={1000000}
          showSpinner={false}
        />
        <Toaster />
        {children}
        {/* </NextThemesProvider> */}
      </NextUIProvider>
    </SessionProvider>
  );
}

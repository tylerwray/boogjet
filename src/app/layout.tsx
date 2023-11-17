import "~/styles/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/app/components/theme-provider";
import { Shell } from "./shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Boojet",
  description: "My Budget",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.variable,
            "min-h-screen bg-background font-sans antialiased",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Shell>{children}</Shell>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

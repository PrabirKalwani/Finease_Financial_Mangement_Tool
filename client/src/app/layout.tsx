import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UserProvider } from "@/context/UserContext";
import { AssetsProvider } from '@/context/AssetsContext';
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACE - Your Financial Assistant",
  description: "Track transactions, manage portfolio, and get AI-powered financial advice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <AssetsProvider>
              <Navbar />
              {children}
              <Toaster position="top-right" />
            </AssetsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Bot from "@/components/bot";
import { BotContextProvider } from "@/context/botContext";

import { Toaster } from "sonner";

import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FINDR - JUSTPAID",
  description: "Find financial experts. ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Toaster position="top-center" richColors />
          <Navbar />
          {children}
          <BotContextProvider>
            <Bot />
          </BotContextProvider>
        </body>
      </UserProvider>
    </html>
  );
}

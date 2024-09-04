"use client"; // Add this to make sure this component is a Client Component

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react"; // Import useState for client-side state
import SideNav from "@/components/tasks/sidenav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <SideNav />
            <div className="lg:pl-72">
              {children}
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

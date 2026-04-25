import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LiveFeed from "@/components/LiveFeed";

import { BlockchainProvider } from "@/context/BlockchainContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraSwap | Decentralized Exchange",
  description: "Experience the pulse of the blockchain with AuraSwap—advanced institutional-grade DeFi.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BlockchainProvider>
          {children}
          <LiveFeed />
          <Toaster richColors position="top-right" />
        </BlockchainProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { BlockchainProvider } from "@/context/BlockchainContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "METAL_TERMINAL | INDUSTRIAL_LIQUIDITY",
  description: "Experience the pulse of the blockchain with Metal-Swap—advanced institutional-grade DeFi.",
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
          <Toaster richColors position="top-right" />
        </BlockchainProvider>
      </body>
    </html>
  );
}

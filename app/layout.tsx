'use client';

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SelectedPokemonsProvider } from "@/context/selectedPokemonContext";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SelectedPokemonsProvider>
          {children}
        </SelectedPokemonsProvider>
      </body>
    </html>
  );
}

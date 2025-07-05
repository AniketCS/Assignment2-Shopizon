import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Shopizon",
  description: "Shopizon - Your Online Shopping Destination",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <main className={`container mx-auto p-4 ${inter.className} antialiased`}>
          {children}
        </main>
      </body>
    </html>
  );
}

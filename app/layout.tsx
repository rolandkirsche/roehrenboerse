// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Röhrenbörse",
  description: "Marktplatz für Röhren & Vintage Audio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="page">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

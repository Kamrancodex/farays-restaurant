import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FA-RAYS FAMILY",
  description:
    "FA-RAYS FAMILY Restaurant 70+ YEARS 3 GENERATIONS 1 GREAT RESTAURANT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

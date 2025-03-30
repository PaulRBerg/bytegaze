import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ByteGaze | Ethereum ABI Visualizer",
  description: "Visualize Ethereum ABI-encoded data in a human-readable format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

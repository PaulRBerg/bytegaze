import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ByteGaze | Ethereum ABI Visualizer",
  description:
    "Visualize Ethereum ABI-encoded data in a human-readable format. Debug smart contract interactions and inspect transaction data.",

  // Basic metadata
  keywords: [
    "abi",
    "blockchain",
    "bytes",
    "bytecode",
    "decoder",
    "ethereum",
    "evm",
    "smart contract",
    "visualizer",
    "web3",
  ],
  authors: [{ name: "Paul Berg" }],

  // Canonical URL
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL("https://bytegaze.vercel.app"),

  // Icons
  icons: {
    icon: "/favicon.ico",
  },

  // Open Graph protocol for social media
  openGraph: {
    title: "ByteGaze | Ethereum ABI Visualizer",
    description: "Visualize Ethereum ABI-encoded data in a human-readable format",
    locale: "en_US",
    siteName: "ByteGaze",
    type: "website",
    url: "https://bytegaze.vercel.app",
  },

  // Robots
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    index: true,
  },

  // Twitter card
  twitter: {
    card: "summary_large_image",
    creator: "@PaulRBerg",
    description: "Visualize Ethereum ABI-encoded data in a human-readable format",
    title: "ByteGaze | Ethereum ABI Visualizer",
  },
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

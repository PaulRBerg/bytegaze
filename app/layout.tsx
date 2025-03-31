import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://bytegaze.vercel.app";

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
  metadataBase: new URL(BASE_URL),

  // Icons
  icons: {
    icon: "/favicon.ico",
  },

  // Open Graph protocol for social media
  openGraph: {
    title: "ByteGaze | Ethereum ABI Visualizer",
    description: "Visualize Ethereum ABI-encoded data in a human-readable format",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1600,
        height: 840,
        alt: "ByteGaze - Ethereum ABI Visualizer",
      },
    ],
    locale: "en_US",
    siteName: "ByteGaze",
    type: "website",
    url: BASE_URL,
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
    images: [`${BASE_URL}/twitter-image.png`],
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

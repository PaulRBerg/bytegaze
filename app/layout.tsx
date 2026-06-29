import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://bytegaze.vercel.app";

export const metadata: Metadata = {
  authors: [{ name: "Paul Berg" }],
  description:
    "Visualize Ethereum ABI-encoded data in a human-readable format. Debug smart contract interactions and inspect transaction data.",
  metadataBase: new URL(BASE_URL),
  title: "ByteGaze | Ethereum ABI Visualizer",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
  openGraph: {
    description: "Visualize Ethereum ABI-encoded data in a human-readable format",
    locale: "en_US",
    siteName: "ByteGaze",
    title: "ByteGaze | Ethereum ABI Visualizer",
    type: "website",
    url: BASE_URL,
    images: [
      {
        alt: "ByteGaze - Ethereum ABI Visualizer",
        height: 840,
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1600,
      },
    ],
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

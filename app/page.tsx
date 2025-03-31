"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Chunk from "./components/Chunk";
import ErrorCard from "./components/ErrorCard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Selector from "./components/Selector";
import { useDataParser } from "./hooks/useDataParser";

// Default sample data only used in non-production environments
const SAMPLE_INPUT =
  "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000023ffec2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [processedInput, setProcessedInput] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isProd = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
      process.env.NEXT_PUBLIC_VERCEL_TARGET_ENV === "production"
    );
  }, []);

  // Set initial input based on environment
  useEffect(() => {
    if (!isProd) {
      setInput(SAMPLE_INPUT);
      setProcessedInput(SAMPLE_INPUT);
    }
  }, [isProd]);

  // Parse calldata using the hook
  const { chunks, selector, error } = useDataParser(processedInput);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setInput(newValue);
    setProcessedInput(newValue); // Update processed input immediately when input changes
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container flex-grow max-w-4xl mx-auto px-4 py-16">
        <Header showExtendedDescription={true} />

        <div className="mb-8">
          <input
            className="dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 focus:border-blue-300 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono p-3 rounded-lg shadow-sm transition-all w-full"
            onChange={handleInputChange}
            placeholder="Enter ABI-encoded data (0x...)"
            type="text"
            value={input}
          />
        </div>

        <ErrorCard error={error} />

        <div className="space-y-2">
          {/* No data message */}
          {!error && selector === null && chunks.length === 0 && processedInput && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-gray">Invalid ABI data</div>
          )}

          <AnimatePresence>
            <Selector selector={selector} copiedIndex={copiedIndex} setCopiedIndex={setCopiedIndex} />
            {chunks.map((chunk, index) => (
              <Chunk
                chunk={chunk}
                copiedIndex={copiedIndex}
                index={index}
                // biome-ignore lint/suspicious/noArrayIndexKey: key is unique
                key={`${chunk}-${index}`}
                setCopiedIndex={setCopiedIndex}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

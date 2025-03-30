"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Clipboard, Check, Copy } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState<string>('0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000023ffec2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000');
  const [processedInput, setProcessedInput] = useState<string>('');
  const [functionSelector, setFunctionSelector] = useState<string | null>(null);
  const [chunks, setChunks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Set mounted to true once component mounts on client and initialize with example data
  useEffect(() => {
    setMounted(true);
    document.body.className = 'font-[family-name:var(--font-geist-sans)]';
    // Set the initial processed input to match the default value
    setProcessedInput(input);
  }, []);

  useEffect(() => {
    if (!processedInput) {
      setChunks([]);
      setFunctionSelector(null);
      setError(null);
      return;
    }

    // Remove 0x prefix if present
    const hasPrefix = processedInput.startsWith('0x');
    const cleaned = hasPrefix ? processedInput.substring(2) : processedInput;

    // Check if we have at least 4 bytes (8 hex chars) for a function selector
    if (cleaned.length >= 8) {
      // Extract potential function selector
      const potentialSelector = cleaned.substring(0, 8);
      // Rest of the data after selector
      const restOfData = cleaned.substring(8);

      // Check if the rest of data's length is a multiple of 64 (32 bytes)
      if (restOfData.length % 64 === 0 || restOfData.length === 0) {
        // Valid function selector case
        setFunctionSelector(potentialSelector);

        // Split the rest into 64-character chunks (32-byte words)
        const newChunks = [];
        for (let i = 0; i < restOfData.length; i += 64) {
          newChunks.push(restOfData.substring(i, i + 64));
        }
        setChunks(newChunks);
        setError(null);
      } else {
        // No valid function selector, check if entire cleaned input is valid
        if (cleaned.length % 64 === 0) {
          // Valid without function selector
          setFunctionSelector(null);
          // Split into 64-character chunks
          const newChunks = [];
          for (let i = 0; i < cleaned.length; i += 64) {
            newChunks.push(cleaned.substring(i, i + 64));
          }
          setChunks(newChunks);
          setError(null);
        } else {
          // Invalid format
          setFunctionSelector(null);
          setChunks([]);
          setError(`Input length after 0x prefix must be either:
                   1) 4 bytes (8 hex chars) for just a function selector, or
                   2) 4 bytes + multiple of 32 bytes (64 hex chars) for selector + parameters, or
                   3) multiple of 32 bytes for raw EVM words.
                   Current length: ${cleaned.length} characters`);
        }
      }
    } else if (cleaned.length === 0 && hasPrefix) {
      // Just 0x prefix
      setFunctionSelector(null);
      setChunks([]);
      setError(null);
    } else if (cleaned.length > 0 && cleaned.length < 8) {
      // Too short for a function selector
      setFunctionSelector(null);
      setChunks([]);
      setError(`Input too short. Ethereum calldata should be at least 4 bytes (8 hex chars) for a function selector.`);
    } else if (cleaned.length % 64 === 0) {
      // Valid raw EVM words without function selector
      setFunctionSelector(null);
      // Split into 64-character chunks
      const newChunks = [];
      for (let i = 0; i < cleaned.length; i += 64) {
        newChunks.push(cleaned.substring(i, i + 64));
      }
      setChunks(newChunks);
      setError(null);
    } else {
      // Invalid format
      setFunctionSelector(null);
      setChunks([]);
      setError(`Input length must be a multiple of 64 characters (32 bytes) for raw EVM words. Current length: ${cleaned.length}`);
    }
  }, [processedInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setInput(newValue);
    setProcessedInput(newValue); // Update processed input immediately when input changes
  };

  // Return a static version before client-side hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
        <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              ByteGaze
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Ethereum ABI Data Visualizer</p>
          </header>
          <div className="flex justify-center py-8">Loading...</div>
        </main>
        <footer className="py-6 border-t border-gray-200 dark:border-gray-800 w-full">
          <div className="container mx-auto px-4 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <div>Created by Paul Berg</div>
            <a href="https://github.com/PaulRBerg/bytegaze" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">GitHub</a>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4 max-w-4xl relative pt-4">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            ByteGaze
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-3 font-medium">Ethereum ABI Data Visualizer</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Paste any Ethereum transaction data or method call payload to analyze it. ByteGaze detects 4-byte function selectors
            and splits the rest into 32-byte chunks for easier analysis.
            Useful for debugging smart contract interactions and inspecting transaction data.
          </p>
        </header>

        <div className="mb-8">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter ABI-encoded data (0x...)"
            className="w-full p-3 rounded-lg bg-card-bg dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 dark:focus:border-blue-500 transition-all font-[family-name:var(--font-geist-mono)] shadow-sm"
          />
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <AnimatePresence>
            {/* Function Selector if present */}
            {functionSelector && (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-violet-100/90 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40 rounded-lg font-[family-name:var(--font-geist-mono)] text-sm break-all shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(functionSelector);
                  setCopiedIndex(-1); // Special index for selector
                  setTimeout(() => {
                    setCopiedIndex(null);
                  }, 2000);
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 dark:text-gray-300 shrink-0">
                    Function Selector:
                  </span>
                  <div className="flex-grow relative flex items-start">
                    <span className="text-violet-700 dark:text-violet-400 font-mono pr-8">{functionSelector}</span>
                    <div className="absolute right-0 top-[-2px] p-1 text-gray-500 hover:text-primary">
                      {copiedIndex === -1 ? (
                        <Check size={18} className="text-black dark:text-white" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 32-byte chunks */}
            {chunks.map((chunk, index) => (
              <motion.div
                key={`chunk-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-3 bg-card-bg border border-gray-200 rounded-lg font-[family-name:var(--font-geist-mono)] text-sm break-all shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(chunk);
                  setCopiedIndex(index);
                  setTimeout(() => {
                    setCopiedIndex(null);
                  }, 2000);
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 dark:text-gray-400 shrink-0 w-16">
                    Chunk {index}:
                  </span>
                  <div className="flex-grow relative flex items-start">
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono pr-8 break-all">{chunk}</span>
                    <div className="absolute right-0 top-[-2px] p-1 text-gray-500 hover:text-primary">
                      {copiedIndex === index ? (
                        <Check size={18} className="text-black dark:text-white" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No data message */}
          {!error && functionSelector === null && chunks.length === 0 && processedInput && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No valid Ethereum calldata to display
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200 dark:border-gray-700 w-full">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
          <div>
            Created by Paul Berg
          </div>
          <div className="flex space-x-6">
            <a
              href="https://docs.soliditylang.org/en/develop/abi-spec.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover hover:underline transition-colors"
            >
              ABI Spec
            </a>
            <a
              href="https://github.com/PaulRBerg/bytegaze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ErrorType } from "../components/ErrorCard";

interface ErrorData {
  type: ErrorType;
  message?: string;
  currentLength?: number;
}

interface CalldataParserResult {
  chunks: string[];
  error: ErrorData | null;
  selector: string | null;
}

export function useDataParser(processedInput: string): CalldataParserResult {
  const [selector, setSelector] = useState<string | null>(null);
  const [chunks, setChunks] = useState<string[]>([]);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    if (!processedInput) {
      setChunks([]);
      setSelector(null);
      setError(null);
      return;
    }

    // Remove 0x prefix if present
    const hasPrefix = processedInput.startsWith("0x");
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
        setSelector(potentialSelector);

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
          setSelector(null);
          // Split into 64-character chunks
          const newChunks = [];
          for (let i = 0; i < cleaned.length; i += 64) {
            newChunks.push(cleaned.substring(i, i + 64));
          }
          setChunks(newChunks);
          setError(null);
        } else {
          // Invalid format
          setSelector(null);
          setChunks([]);
          setError({
            type: ErrorType.FORMAT_ERROR,
            currentLength: cleaned.length / 2,
          });
        }
      }
    } else if (cleaned.length === 0 && hasPrefix) {
      // Just 0x prefix
      setSelector(null);
      setChunks([]);
      setError(null);
    } else if (cleaned.length > 0 && cleaned.length < 8) {
      // Too short for a function selector
      setSelector(null);
      setChunks([]);
      setError({
        type: ErrorType.TOO_SHORT,
        message: "Input too short. Ethereum calldata should be at least 4 bytes (8 hex chars) for a selector.",
      });
    } else if (cleaned.length % 64 === 0) {
      // Valid raw EVM words without function selector
      setSelector(null);
      // Split into 64-character chunks
      const newChunks = [];
      for (let i = 0; i < cleaned.length; i += 64) {
        newChunks.push(cleaned.substring(i, i + 64));
      }
      setChunks(newChunks);
      setError(null);
    } else {
      // Invalid format
      setSelector(null);
      setChunks([]);
      setError({
        type: ErrorType.INVALID_LENGTH,
        message: `Input length must be a multiple of 64 characters (32 bytes) for raw EVM words. Current length: ${cleaned.length}`,
      });
    }
  }, [processedInput]);

  return { selector, chunks, error };
}

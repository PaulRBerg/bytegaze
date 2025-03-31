export enum ErrorType {
  FORMAT_ERROR = "FORMAT_ERROR",
  TOO_SHORT = "TOO_SHORT",
  INVALID_LENGTH = "INVALID_LENGTH",
  NONE = "NONE",
}

interface ErrorData {
  type: ErrorType;
  message?: string;
  currentLength?: number;
}

interface ErrorProps {
  error: ErrorData | null;
}

export default function ErrorCard({ error }: ErrorProps) {
  if (!error || error.type === ErrorType.NONE) return null;

  return (
    <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 mb-6 p-4 rounded-lg text-red-800 dark:text-red-300">
      {error.type !== ErrorType.FORMAT_ERROR ? (
        error.message
      ) : (
        <>
          <p className="mb-2">Input length after 0x prefix must be one of the following:</p>
          <ul className="list-disc pl-6 mb-2">
            <li>4 bytes (just a function selector)</li>
            <li>4 + 32 * n bytes (function selector + parameters)</li>
            <li>32 * n bytes (raw EVM words)</li>
          </ul>
          <p>Your input's length: {error.currentLength} bytes</p>
        </>
      )}
    </div>
  );
}

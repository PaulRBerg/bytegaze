interface HeaderProps {
  showExtendedDescription?: boolean;
}

export default function Header({
  showExtendedDescription = false,
}: HeaderProps) {
  return (
    <header className="mb-12 text-center">
      <div className="flex items-center justify-center mb-2">
        <img
          alt="ByteGaze Logo"
          className="h-9 mr-2 mt-1 inline-block w-9"
          src="/icon.svg"
        />
        <h1 className="bg-clip-text bg-gradient-to-r font-bold from-purple-600 text-4xl text-transparent to-blue-600 inline-flex items-center">
          ByteGaze
        </h1>
      </div>
      <p className="font-medium mb-3 text-gray-600 dark:text-gray-400">
        Ethereum ABI Data Visualizer
      </p>
      {showExtendedDescription && (
        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm">
          Paste any Ethereum transaction data or method call payload to analyze
          it. ByteGaze detects 4-byte function selectors and splits the rest
          into 32-byte chunks for easier analysis. Useful for debugging smart
          contract interactions and inspecting transaction data.
        </p>
      )}
    </header>
  );
}

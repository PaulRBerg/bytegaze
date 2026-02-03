import Image from "next/image";

type HeaderProps = {
  showExtendedDescription?: boolean;
};

export default function Header({ showExtendedDescription = false }: HeaderProps) {
  return (
    <header className="mb-12 text-center">
      <div className="mb-2 flex items-center justify-center">
        <Image
          alt="ByteGaze Logo"
          className="mt-1 mr-2 inline-block h-9 w-9"
          height={36}
          src="/icon.svg"
          width={36}
        />
        <h1 className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-bold text-4xl text-transparent">
          ByteGaze
        </h1>
      </div>
      <p className="mb-3 font-medium text-gray-600 dark:text-gray-400">
        Ethereum ABI Data Visualizer
      </p>
      {showExtendedDescription && (
        <p className="mx-auto max-w-2xl text-gray-500 text-sm dark:text-gray-400">
          Paste any Ethereum transaction data or method call payload to analyze it. ByteGaze detects
          4-byte function selectors and splits the rest into 32-byte chunks for easier analysis.
          Useful for debugging smart contract interactions and inspecting transaction data.
        </p>
      )}
    </header>
  );
}

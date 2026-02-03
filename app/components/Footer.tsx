import type React from "react";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

function Link({ href, children }: LinkProps) {
  return (
    <a
      className="text-primary transition-colors hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-gray-200 border-t py-6 dark:border-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 text-gray-500 text-sm md:flex-row md:justify-between dark:text-gray-400">
        <div className="hidden md:block">
          Created by <Link href="https://x.com/PaulRBerg">Paul Berg</Link>
        </div>
        <div className="flex w-full justify-center space-x-6 md:w-auto">
          <Link href="https://github.com/PaulRBerg/bytegaze">Source Code</Link>
          <span className="hidden md:block">
            <Link href="https://bia.is/tools/abi-decoder/">ABI Decoder</Link>
          </span>
          <span className="hidden md:block">
            <Link href="https://docs.soliditylang.org/en/develop/abi-spec.html">ABI Spec</Link>
          </span>
          <Link href="https://buymeacoffee.com/prberg">Buy Me a Coffee</Link>
        </div>
      </div>
    </footer>
  );
}

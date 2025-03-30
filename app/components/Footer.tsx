interface LinkProps {
  href: string;
  children: React.ReactNode;
}

function Link({ href, children }: LinkProps) {
  return (
    <a
      className="hover:underline text-primary transition-colors"
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
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 w-full">
      <div className="container flex items-center justify-between mx-auto px-4 text-gray-500 dark:text-gray-400 text-sm">
        <div>
          Created by <Link href="https://x.com/PaulRBerg">Paul Berg</Link>
        </div>
        <div className="flex space-x-6">
          <Link href="https://github.com/PaulRBerg/bytegaze">Source Code</Link>
          <Link href="https://bia.is/tools/abi-decoder/">ABI Decoder</Link>
          <Link href="https://docs.soliditylang.org/en/develop/abi-spec.html">
            ABI Spec
          </Link>
          <Link href="https://buymeacoffee.com/prberg">Buy Me a Coffee</Link>
        </div>
      </div>
    </footer>
  );
}

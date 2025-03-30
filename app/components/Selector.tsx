import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface SelectorProps {
  selector: string | null;
  copiedIndex: number | null;
  setCopiedIndex: (index: number | null) => void;
}

export default function Selector({
  selector,
  copiedIndex,
  setCopiedIndex,
}: SelectorProps) {
  if (!selector) {
    return null;
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="bg-violet-100/90 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40 break-all cursor-pointer hover:shadow p-3 rounded-lg shadow-sm text-sm transition-shadow"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      key="selector"
      onClick={() => {
        navigator.clipboard.writeText(selector);
        setCopiedIndex(-1); // Special index for selector
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2 items-start">
        <span className="shrink-0 text-gray-700 dark:text-gray-300">
          Selector:
        </span>
        <div className="flex flex-grow items-start relative">
          <span className="font-mono pr-8 text-violet-700 dark:text-violet-400">
            {selector}
          </span>
          <div className="absolute p-1 right-0 text-gray-500 top-[-2px]">
            {copiedIndex === -1 ? (
              <Check size={18} className="text-black dark:text-white" />
            ) : (
              <Copy size={18} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

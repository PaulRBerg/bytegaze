import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

type SelectorProps = {
  selector: string | null;
  copiedIndex: number | null;
  setCopiedIndex: (index: number | null) => void;
};

export default function Selector({ selector, copiedIndex, setCopiedIndex }: SelectorProps) {
  if (!selector) {
    return null;
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="cursor-pointer break-all rounded-lg border border-violet-200 bg-violet-100/90 p-3 text-sm shadow-sm transition-shadow hover:shadow dark:border-violet-800/40 dark:bg-violet-900/20"
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
      <div className="flex items-start gap-2">
        <span className="shrink-0 text-gray-700 dark:text-gray-300">Selector:</span>
        <div className="relative flex flex-grow items-start">
          <span className="pr-8 font-mono text-violet-700 dark:text-violet-400">{selector}</span>
          <div className="absolute top-[-2px] right-0 p-1 text-gray-500">
            {copiedIndex === -1 ? (
              <Check className="text-black dark:text-white" size={18} />
            ) : (
              <Copy size={18} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

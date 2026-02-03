import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

type ChunkProps = {
  chunk: string;
  copiedIndex: number | null;
  index: number;
  setCopiedIndex: (index: number | null) => void;
};

export default function Chunk({ chunk, copiedIndex, index, setCopiedIndex }: ChunkProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="cursor-pointer break-all rounded-lg border border-gray-300 p-3 text-sm shadow-sm transition-shadow hover:shadow dark:border-gray-700 dark:bg-emerald-950"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      onClick={() => {
        navigator.clipboard.writeText(chunk);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className="flex items-start gap-2">
        <span className="w-20 shrink-0 whitespace-nowrap text-gray-500 dark:text-gray-400">
          Chunk {index}:
        </span>
        <div className="relative flex flex-grow items-start">
          <span className="break-all pr-8 font-mono text-emerald-600 dark:text-emerald-400">
            {chunk}
          </span>
          <div className="absolute top-[-2px] right-0 p-1 text-gray-500">
            {copiedIndex === index ? (
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

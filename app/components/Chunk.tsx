import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface ChunkProps {
  chunk: string;
  copiedIndex: number | null;
  index: number;
  setCopiedIndex: (index: number | null) => void;
}

export default function Chunk({ chunk, copiedIndex, index, setCopiedIndex }: ChunkProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="dark:bg-emerald-950 border border-gray-300 dark:border-gray-700 break-all cursor-pointer hover:shadow p-3 rounded-lg shadow-sm text-sm transition-shadow"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      onClick={() => {
        navigator.clipboard.writeText(chunk);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex gap-2 items-start">
        <span className="shrink-0 text-gray-500 dark:text-gray-400 w-16">Chunk {index}:</span>
        <div className="flex flex-grow items-start relative">
          <span className="break-all font-mono pr-8 text-emerald-600 dark:text-emerald-400">{chunk}</span>
          <div className="absolute p-1 right-0 text-gray-500 top-[-2px]">
            {copiedIndex === index ? <Check size={18} className="text-black dark:text-white" /> : <Copy size={18} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

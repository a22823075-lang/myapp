import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Tag, Share2 } from "lucide-react";
import SafeImage from "./SafeImage";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    source: string;
    date: string;
    category: string;
    image: string;
    content: string[];
  } | null;
}

export default function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header / Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={onClose}
                className="p-3 bg-white/90 backdrop-blur-md text-ink rounded-2xl hover:bg-brand hover:text-white transition-all shadow-lg active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 scrollbar-hide">
              {/* Hero Image */}
              <div className="h-64 md:h-96 w-full relative">
                <SafeImage src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <div className="flex gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-ink leading-tight tracking-tight">
                    {article.title}
                  </h2>
                </div>
              </div>

              {/* Meta Info */}
              <div className="px-8 md:px-12 py-6 border-b border-sky-50 flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-brand" />
                  <span>{article.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-brand" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-brand" />
                  <span>{article.category}</span>
                </div>
                <button className="ml-auto p-2 hover:text-brand transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Body Text */}
              <div className="px-8 md:px-12 py-12 space-y-8">
                {article.content.map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-slate-600 leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
                
              </div>
            </div>

            {/* Bottom Sticky Action */}
            <div className="p-8 pb-16 md:pb-12 bg-sky-50 border-t border-sky-100 flex justify-center">
              <button 
                onClick={onClose}
                className="bg-brand text-white px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand/20"
              >
                我知道了
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

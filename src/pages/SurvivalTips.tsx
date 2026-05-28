import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Newspaper, ChevronRight } from "lucide-react";
import SafeImage from "../components/SafeImage";
import ArticleModal from "../components/ArticleModal";
import { ARTICLES, Article } from "../data/articles";

export default function SurvivalTips() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam) {
      const artId = parseInt(idParam, 10);
      const article = ARTICLES.find((a) => a.id === artId);
      if (article) {
        setSelectedArticle(article);
        setIsModalOpen(true);
      }
    }
  }, []);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-6 max-w-5xl mx-auto pb-64"
    >
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-10 bg-brand rounded-full" />
          <h1 className="text-ink text-5xl font-black tracking-tight uppercase">生存指南</h1>
        </div>
        <p className="text-slate-500 text-xl font-bold max-w-2xl leading-relaxed">
          收集了網路上最專業的食記、最新的美食新聞，讓你不再踩雷，成為真正的美食專家。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ARTICLES.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 border border-sky-50 flex flex-col group"
          >
            <div className="h-64 relative overflow-hidden">
              <SafeImage 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black text-brand uppercase tracking-widest shadow-sm">
                {article.category}
              </div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 mb-6 uppercase tracking-widest">
                  <Newspaper size={14} className="text-brand" />
                  <span>{article.source}</span>
                  <span className="opacity-30">•</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-black mb-8 md:mb-10 leading-snug group-hover:text-brand transition-colors">
                  {article.title}
                </h3>
              </div>
              <button 
                onClick={() => openArticle(article)}
                className="bg-sky-50 text-brand px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-between group/link hover:bg-brand hover:text-white transition-all shadow-sm shadow-sky-50 cursor-pointer mt-4"
              >
                查看全文 
                <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ArticleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        article={selectedArticle} 
      />

    </motion.div>
  );
}

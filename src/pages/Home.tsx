import { Swords, ChevronRight, BookOpen, Utensils, Zap } from "lucide-react";
import SafeImage from "../components/SafeImage";
import { ARTICLES } from "../data/articles";

export default function Home() {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto space-y-24 pb-32">
      
      {/* 第二層：情緒過濾區 */}
      <section className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-brand rounded-full" />
          <h2 className="text-2xl font-black text-ink tracking-tight uppercase">選個心情吧：</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="vibe-check.html" 
            className="group relative h-48 bg-red-500 rounded-[2.5rem] overflow-hidden flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-200"
          >
            <span className="relative z-10 text-white text-3xl font-black tracking-widest">壓力山大</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="vibe-check.html" 
            className="group relative h-48 bg-[#B8860B] rounded-[2.5rem] overflow-hidden flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-amber-200"
          >
            <span className="relative z-10 text-white text-3xl font-black tracking-widest">月底吃土</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="vibe-check.html" 
            className="group relative h-48 bg-[#9333EA] rounded-[2.5rem] overflow-hidden flex items-center justify-center transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-purple-200"
          >
            <span className="relative z-10 text-white text-3xl font-black tracking-widest">剛被稱讚</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </section>

      {/* 第三層：文章推薦區 */}
      <section className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-brand rounded-full" />
          <h2 className="text-2xl font-black text-ink tracking-tight">不知道吃什麼？先看點文章</h2>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x -mx-6 px-6">
          {ARTICLES.map((art) => (
            <a 
              key={art.id} 
              href={`survival-tips.html?id=${art.id}`}
              className="snap-start min-w-[300px] md:min-w-[400px] bg-white rounded-[3.5rem] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 group"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 relative">
                <SafeImage src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-brand px-4 py-1.5 rounded-full text-[10px] font-black text-white tracking-widest uppercase">
                  {art.category}
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-2xl font-black leading-tight text-ink group-hover:text-brand transition-colors line-clamp-2">{art.title}</h3>
                <div className="mt-6 flex items-center gap-2 text-brand font-black text-xs tracking-widest uppercase">
                  閱讀更多 <ChevronRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

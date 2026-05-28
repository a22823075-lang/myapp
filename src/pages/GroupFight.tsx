import { useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { Swords, RotateCw, Plus, Trash2, Trophy, ChevronRight } from "lucide-react";

const INITIAL_OPTIONS = ["火鍋", "拉麵", "披薩", "壽司", "炸雞", "滷肉飯"];

const SEGMENT_COLORS = [
  "#FFE4E6", // Rose 100
  "#E0F2FE", // Sky 100
  "#DCFCE7", // Green 100
  "#FEF3C7", // Amber 100
  "#F3E8FF", // Purple 100
  "#FFEDD5", // Orange 100
  "#CFFAFE", // Cyan 100
  "#FCE7F3", // Pink 100
  "#E0E7FF", // Indigo 100
  "#CCFBF1", // Teal 100
  "#F3F4F6", // Gray 100
  "#FEF9C3"  // Yellow 100
];

export default function GroupFight() {
  const [options, setOptions] = useState<string[]>(INITIAL_OPTIONS);
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);
  const lastWinnerRef = useRef<string | null>(null);

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const spin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Choose a target winner index that does not match lastWinnerRef.current
    const lastWinner = lastWinnerRef.current;
    const validIndices: number[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i] !== lastWinner) {
        validIndices.push(i);
      }
    }
    
    const targetIndex = validIndices.length > 0 
      ? validIndices[Math.floor(Math.random() * validIndices.length)]
      : Math.floor(Math.random() * options.length);
      
    const segmentSize = 360 / options.length;
    const randomOffset = (Math.random() - 0.5) * (segmentSize * 0.8);
    const finalRotation = (360 - targetIndex * segmentSize + randomOffset + 360) % 360;
    
    // Spin 5 to 10 full rotations
    const fullSpins = 5 + Math.floor(Math.random() * 5);
    const rotation = fullSpins * 360 + finalRotation;
    const duration = 4;
    
    await controls.start({
      rotate: rotation,
      transition: { duration, ease: [0.15, 0, 0.15, 1] }
    });
    
    const selectedWinner = options[targetIndex];
    
    setWinner(selectedWinner);
    lastWinnerRef.current = selectedWinner;
    setIsSpinning(false);
    
    // Reset to normalized rotation to avoid massive degree values over time
    controls.set({ rotate: finalRotation });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-6 max-w-6xl mx-auto pb-32"
    >
      <div className="text-center mb-16 space-y-4">
         <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand/10 text-brand rounded-full text-sm font-black tracking-widest uppercase mb-4">
          <Swords size={16} /> 多人挑戰模式
        </div>
        <h1 className="text-5xl font-black text-ink tracking-tight">命運之輪</h1>
        <p className="text-slate-500 text-xl font-bold">猶豫不決？讓轉盤為你做出最終裁決！</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] md:max-w-[500px] mb-12 flex items-center justify-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="w-10 h-14 md:w-12 md:h-16 bg-brand rounded-b-full shadow-[0_10px_20px_rgba(14,165,233,0.4)] flex items-center justify-center text-white">
                <ChevronRight size={24} className="rotate-90" strokeWidth={5} />
              </div>
            </div>

            <motion.div
              ref={wheelRef}
              initial={{ rotate: 0 }}
              animate={controls}
              className="w-full h-full rounded-full border-[10px] md:border-[16px] border-white bg-white relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)] ring-1 ring-slate-100/50"
            >
              {/* Wheel Color Segments */}
              {options.map((option, i) => {
                const angle = 360 / options.length;
                const rotation = i * angle - 90;
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-5 sm:pr-10 md:pr-16"
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                      clipPath: `polygon(0 50%, 100% ${50 - Math.tan((angle / 2) * (Math.PI / 180)) * 50}%, 100% ${50 + Math.tan((angle / 2) * (Math.PI / 180)) * 50}%)`
                    }}
                  >
                    <span className="text-ink font-black text-xs sm:text-lg md:text-2xl whitespace-nowrap tracking-tight">
                      {option}
                    </span>
                  </div>
                );
              })}

            </motion.div>

            <button
              onClick={spin}
              disabled={isSpinning}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-ink text-white rounded-full shadow-2xl z-30 flex items-center justify-center border-4 md:border-8 border-white hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
            >
              <RotateCw className={`${isSpinning ? 'animate-spin' : ''} md:w-10 md:h-10`} size={24} strokeWidth={3} />
            </button>
          </div>

          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-brand text-white p-10 rounded-[3.5rem] shadow-2xl shadow-brand/30 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <Trophy className="mx-auto mb-4" size={48} strokeWidth={3} />
                <p className="text-xl font-black opacity-80 uppercase tracking-widest mb-2">最終贏家是...</p>
                <h2 className="text-6xl font-black tracking-tighter">{winner}！</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-sky-100/20 border border-sky-50">
          <h2 className="text-3xl font-black text-ink mb-10 flex items-center gap-4">
            <Plus className="text-brand" /> 編輯候選名單 
            <span className="text-sm font-bold text-slate-300 ml-auto">{options.length}/12</span>
          </h2>
          
          <div className="flex gap-4 mb-12">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addOption()}
              placeholder="新增一個選項..."
              className="flex-1 bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-brand/20 focus:bg-white transition-all font-bold placeholder:text-slate-300"
            />
            <button
              onClick={addOption}
              className="bg-brand text-white p-5 rounded-[1.5rem] hover:shadow-lg hover:shadow-brand/30 transition-all active:scale-95 shadow-xl"
            >
              <Plus size={32} strokeWidth={3} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option, i) => (
              <motion.div
                layout
                key={option + i}
                className="flex items-center justify-between bg-slate-50 px-6 py-5 rounded-[1.5rem] group border border-transparent hover:border-sky-100 hover:bg-white transition-all"
              >
                <span className="font-black text-ink text-lg tracking-tight">{option}</span>
                <button
                  onClick={() => removeOption(i)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

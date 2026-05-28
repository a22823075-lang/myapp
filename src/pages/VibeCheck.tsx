import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import SafeImage from "../components/SafeImage";

import hotPotImg from "../assets/images/taiwanese_hot_pot_1776927837119.png";
import luRouFanImg from "../assets/images/braised_pork_rice_1776927855441.png";
import scallionPancakeImg from "../assets/images/scallion_pancake_1779851283850.png";
import stinkyTofuImg from "../assets/images/stinky_tofu_1779851647157.png";
import taiwaneseDanbingImg from "../assets/images/taiwanese_danbing_1779851666863.png";
import porkChopBentoImg from "../assets/images/pork_chop_bento_1779851689830.png";
import taiwaneseMochiImg from "../assets/images/taiwanese_mochi_1779851711907.png";
import koreanFriedChickenImg from "../assets/images/korean_fried_chicken_1779851730399.png";
import taiwaneseOdenImg from "../assets/images/taiwanese_oden_1779852852566.png";
import taiwaneseMangoShavedIceImg from "../assets/images/taiwanese_mango_shaved_ice_1779853695102.png";
import basilFreshCrabImg from "../assets/images/basil_fresh_crab_1779853868590.png";
import strawberryHoneyToastImg from "../assets/images/strawberry_honey_toast_1779854190634.png";
import cherryRoastDuckImg from "../assets/images/cherry_roast_duck_1779854210710.png";
import sichuanMalatangImg from "../assets/images/sichuan_malatang_1779948361973.png";
import griddlePorkRibsImg from "../assets/images/griddle_pork_ribs_1779948503854.png";
import wagyuYakinikuImg from "../assets/images/wagyu_yakiniku_1779948520581.png";
import charcoalChickenCutletImg from "../assets/images/charcoal_chicken_cutlet_1779948541544.png";
import taiwaneseSausageRiceImg from "../assets/images/taiwanese_sausage_rice_1779948560397.png";

const MEALS = {
  stress: [
    { name: "正宗麻辣火鍋", img: hotPotImg, desc: "重口味釋放壓力，讓麻辣刺激你的汗腺與心情" },
    { name: "韓式炸雞", img: koreanFriedChickenImg, desc: "酥脆外皮與多汁肉質，多重醬汁超療癒" },
    { name: "川味麻辣燙", img: sichuanMalatangImg, desc: "辛辣過癮、熱氣騰騰，把壓力一掃而空" },
    { name: "日式濃厚拉麵", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=ramen", desc: "濃醇豚骨高湯與勁道麵條，暖意直達肚子裡" },
    { name: "雙倍起司美式漢堡", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80&sig=hamburger", desc: "香濃熔岩起司，大口咬下的純粹罪惡幸福感" },
    { name: "泰式冬蔭功酸辣湯", img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80&sig=tomyum", desc: "酸辣鮮香完美平衡，瞬間喚醒疲憊的靈魂" },
    { name: "炭烤大雞排", img: charcoalChickenCutletImg, desc: "熱油酥炸後浸入香濃蜜汁炭烤，肉汁飽滿的大滿足" },
    { name: "爆汁乾鍋排骨", img: griddlePorkRibsImg, desc: "椒香四溢、酥脆乾香，辣麻交織在舌尖的痛快體驗" },
    { name: "熔岩巧克力蛋糕", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80&sig=lava-cake", desc: "切開後熱巧克力如熔岩般流出，甜蜜多巴胺瞬間擊碎壓力" },
    { name: "超濃重乳酪蛋糕", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80&sig=cheesecake", desc: "綿密紮實、乾酪香氣醇厚，高熱量的靈魂慰藉" },
    { name: "爆漿起司香雞排", img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80&sig=cheesechicken", desc: "金黃香酥，一咬下濃孕起司牽絲湧出，極度邪惡！" },
    { name: "激辛地獄麻辣麵", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80&sig=spicynoodles", desc: "特製辛香料，挑戰你的辣度極限，冒汗排毒超爽快" }
  ],
  broke: [
    { name: "極致滷肉飯", img: luRouFanImg, desc: "銅板價的極致美味，飽含台灣靈魂的膠質滷汁" },
    { name: "巷口乾麵", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80&sig=drynoodles", desc: "簡單卻不平凡的古早好味道，拌上香噴噴的豬油" },
    { name: "古早味蔥油餅", img: scallionPancakeImg, desc: "千層香酥、外脆內Q，加蛋九層塔銅板價爽吃" },
    { name: "手工水餃與酸辣湯", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80&sig=dumplings", desc: "皮薄餡滿的高CP值組合，溫飽首選" },
    { name: "老街生煎包", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80&sig=shengjian", desc: "底部微焦酥脆、湯汁溢出，三顆就有大滿足" },
    { name: "暖心關東煮", img: taiwaneseOdenImg, desc: "鮮甜柴魚湯頭配上豐富關東煮串，便宜又溫暖" },
    { name: "酥炸大臭豆腐", img: stinkyTofuImg, desc: "酥脆多汁，配上滿滿台式酸甜泡菜，銅板平民滋味" },
    { name: "古早味蛋餅", img: taiwaneseDanbingImg, desc: "香Q手工粉漿蛋餅，加上起司、醬油膏，極致省錢早餐" },
    { name: "飽足排骨便當", img: porkChopBentoImg, desc: "超大塊炸排骨搭配三樣經典台式配菜，百元出頭吃兩餐" },
    { name: "花生黑糖燒麻糬", img: taiwaneseMochiImg, desc: "軟糯香Q，熱騰騰拌上濃香花生粉與芝麻，平價大幸福" },
    { name: "國民神飲珍珠奶茶", img: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80&sig=milktea-cheap", desc: "香醇奶茶配Q彈黑糖珍珠，月底也能有些許甜味" },
    { name: "香脆雞排配大腸包小腸", img: taiwaneseSausageRiceImg, desc: "台式夜市雙強，不用兩百元就有的豪邁大飽足" }
  ],
  praised: [
    { name: "法式舒芙蕾", img: "https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?auto=format&fit=crop&w=800&q=80", desc: "慶祝此刻的甜蜜，雲朵般綿密的空氣口感" },
    { name: "頂級肋眼牛排", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80", desc: "犒賞優秀的自己，極致油花與多汁肉質的交織" },
    { name: "鮮極豪華生魚片", img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80&sig=sashimi", desc: "入口即化的當季現切海鮮，豪奢盛宴的慶祝" },
    { name: "精緻雙人下午茶", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80&sig=hightea", desc: "優雅的三層塔點心盤，享受被眾人稱讚的悠閒片刻" },
    { name: "極奢和牛燒肉", img: wagyuYakinikuImg, desc: "炭火燒烤的頂級和牛，每一口都是對味蕾的加冕" },
    { name: "精緻手作芒果冰", img: taiwaneseMangoShavedIceImg, desc: "鋪滿新鮮甜美芒果與香草冰淇淋，分享勝利的喜悅" },
    { name: "熟成龍蝦海鮮濃湯", img: "https://images.unsplash.com/photo-1559742811-82428b5911b8?auto=format&fit=crop&w=800&q=80&sig=lobster", desc: "頂級波士頓龍蝦精心熬煮，海味鮮甜爆棚，儀式感滿分" },
    { name: "豪華九層塔鮮蟹宴", img: basilFreshCrabImg, desc: "多汁肥美蟹肉，加上滿滿海味高湯鮮甜，犒賞卓越的自己" },
    { name: "法國頂級松露義大利麵", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80&sig=truffle", desc: "濃郁黑松露與野菇奶油醬汁，高雅細緻，舌尖的奢華交響樂" },
    { name: "當季限定草莓蜜糖吐司", img: strawberryHoneyToastImg, desc: "華麗外觀與層層驚喜，撒上金箔與卡士達醬，奢華慶祝" },
    { name: "高奢日式雙人無菜單料理", img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80&sig=omakase", desc: "主廚現做刺身與炙燒握壽司，極致匠心對待你的完美時刻" },
    { name: "極品櫻桃鴨五吃", img: cherryRoastDuckImg, desc: "金黃香脆的外皮與多汁鴨肉，奢華掛爐香烤打造聚餐盛宴" }
  ]
};

const getSearchTerm = (name: string): string => {
  if (name.includes("火鍋") || name.includes("麻辣燙")) return "火鍋";
  if (name.includes("炸雞") || name.includes("漢堡") || name.includes("雞排")) return "炸雞";
  if (name.includes("拉麵") || name.includes("麵")) return "拉麵";
  if (name.includes("酸辣")) return "小吃";
  if (name.includes("滷肉飯")) return "滷肉飯";
  if (name.includes("乾麵") || name.includes("便當")) return "小吃";
  if (name.includes("蔥油餅") || name.includes("蛋餅")) return "蔥油餅";
  if (name.includes("水餃") || name.includes("生煎包") || name.includes("臭豆腐")) return "小吃";
  if (name.includes("舒芙蕾") || name.includes("下午茶") || name.includes("芒果冰") || name.includes("關東煮") || name.includes("巧克力") || name.includes("乳酪") || name.includes("蜜糖吐司") || name.includes("麻糬")) return "甜點";
  if (name.includes("牛排") || name.includes("和牛") || name.includes("燒肉") || name.includes("乾鍋排骨") || name.includes("櫻桃櫻") || name.includes("鴨") || name.includes("烤鴨")) return "燒肉";
  if (name.includes("生魚片") || name.includes("刺身") || name.includes("龍蝦") || name.includes("鮮蟹") || name.includes("海鮮") || name.includes("料理") || name.includes("壽司")) return "海鮮";
  return name;
};

export default function VibeCheck() {
  const [mood, setMood] = useState<keyof typeof MEALS | null>(null);

  const moodLabels: Record<keyof typeof MEALS, { label: string, color: string, activeClass: string }> = {
    stress: { label: "壓力山大", color: "red", activeClass: "bg-red-500 border-red-500 text-white shadow-red-200" },
    broke: { label: "月底吃土", color: "amber", activeClass: "bg-amber-600 border-amber-600 text-white shadow-amber-200" },
    praised: { label: "剛被稱讚", color: "brand", activeClass: "bg-brand border-brand text-white shadow-brand/20" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-6 max-w-7xl mx-auto space-y-16 pb-32"
    >
      <section className="relative z-20 space-y-8 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-ink tracking-tight uppercase">心情探測器</h1>
        <p className="text-slate-500 text-xl font-bold">根據您的當下心情，我們準備了全方位的推薦名單。</p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <button 
            onClick={() => setMood(null)}
            className={`px-8 py-4 rounded-2xl font-black transition-all border-2 ${!mood ? 'bg-ink border-ink text-white shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
          >
            全部顯示
          </button>
          {(Object.keys(MEALS) as Array<keyof typeof MEALS>).map((m) => (
            <button 
              key={m}
              onClick={() => setMood(m)}
              className={`px-8 py-4 rounded-2xl font-black transition-all border-2 ${mood === m ? moodLabels[m].activeClass + ' shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-sky-100'}`}
            >
              {moodLabels[m].label}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-24">
        {(Object.keys(MEALS) as Array<keyof typeof MEALS>).map((key) => {
          if (mood && mood !== key) return null;
          return (
            <motion.section 
              key={key}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-8 rounded-full ${moodLabels[key].color === 'red' ? 'bg-red-500' : moodLabels[key].color === 'amber' ? 'bg-amber-600' : 'bg-brand'}`} />
                <h2 className="text-3xl font-black text-ink tracking-tight">{moodLabels[key].label}選單</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MEALS[key].map((meal, i) => (
                  <motion.div 
                    key={i} 
                    layout
                    className="bg-white rounded-[3rem] overflow-hidden border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-100/30 transition-all duration-500 group"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <SafeImage src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-black mb-2 text-ink">{meal.name}</h3>
                        <p className="text-slate-400 font-bold">{meal.desc}</p>
                      </div>
                      <a 
                        href={`/the-truth.html?search=${encodeURIComponent(getSearchTerm(meal.name))}`} 
                        className="bg-sky-50 text-brand p-5 rounded-2xl hover:bg-brand hover:text-white transition-all shadow-sm shadow-sky-100 self-stretch sm:self-auto flex items-center justify-center"
                      >
                        <ChevronRight size={24} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </motion.div>
  );
}

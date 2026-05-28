import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, ExternalLink, Navigation, Star, Filter, Search } from "lucide-react";
import SafeImage from "../components/SafeImage";

// Food image imports
import hotPotImg from "../assets/images/taiwanese_hot_pot_1776927837119.png";
import luRouFanImg from "../assets/images/braised_pork_rice_1776927855441.png";
import scallionPancakeImg from "../assets/images/scallion_pancake_1779851283850.png";
import radishPieImg from "../assets/images/radish_pie_1779851346213.png";
import ayChungNoodlesImg from "../assets/images/ay_chung_noodles_1779851530862.png";
import herbalPorkRibSoupImg from "../assets/images/herbal_pork_rib_soup_1779851548758.png";
import redBeanWheelCakeImg from "../assets/images/red_bean_wheel_cake_1779851568372.png";
import pigsBloodCakeImg from "../assets/images/pigs_blood_cake_1779851587389.png";
import taiwaneseRiceCakeImg from "../assets/images/taiwanese_rice_cake_1779851606752.png";
import pineappleCakeImg from "../assets/images/pineapple_cake_1779851627011.png";
import shuangyueSoupImg from "../assets/images/shuangyue_soup_1779851747956.png";
import fishBallSoupImg from "../assets/images/fish_ball_soup_1779851767084.png";
import twinsDoughnutImg from "../assets/images/twins_doughnut_1779851786533.png";
import koreanFriedChickenImg from "../assets/images/korean_fried_chicken_1779851730399.png";
import fuhangSoyMilkImg from "../assets/images/fuhang_soy_milk_1779853147675.png";
import pepperFlatbreadImg from "../assets/images/pepper_flatbread_1779853539004.png";
import porkRibNoodlesImg from "../assets/images/pork_rib_noodles_1779948696433.png";
import cabbageRiceSoupImg from "../assets/images/cabbage_rice_soup_1779948833019.png";
import guaBaoImg from "../assets/images/taiwanese_gua_bao_1779949423875.png";
import cherryRoastDuckImg from "../assets/images/cherry_roast_duck_1779854210710.png";
import petitDouxWapaImg from "../assets/images/petit_doux_wapa_1779949711394.png";
import belleEpoquePancakeImg from "../assets/images/belle_epoque_bubble_pancake_1779949730990.png";
import shanweiDouhuaImg from "../assets/images/shanwei_douhua_1779949909925.png";
import yixingDouhuaImg from "../assets/images/yixing_douhua_1779949938342.png";
import sheziDouhuaImg from "../assets/images/shezi_douhua_1779950439199.png";
import charcoalChickenCutletImg from "../assets/images/charcoal_chicken_cutlet_1779948541544.png";
import wagyuYakinikuImg from "../assets/images/wagyu_yakiniku_1779948520581.png";

const RESTAURANTS = [
  // --- 中正區 (5 家) ---
  {
    id: 15,
    name: "金峰滷肉飯",
    address: "台北市中正區羅斯福路一段 10-1 號",
    distance: "2.1km",
    distanceVal: 2100,
    time: "25 min",
    phone: "02-2396-1133",
    delivery: "https://www.ubereats.com",
    image: luRouFanImg,
    tags: ["中正區", "台式", "滷肉飯", "平價", "小吃"],
    rating: 4.6
  },
  {
    id: 102,
    name: "雙月食品社 (青島店)",
    address: "台北市中正區青島東路 8 號",
    distance: "1.5km",
    distanceVal: 1500,
    time: "18 min",
    phone: "02-3393-8953",
    delivery: "https://www.ubereats.com",
    image: shuangyueSoupImg,
    tags: ["中正區", "台式", "雞湯", "米其林", "養生"],
    rating: 4.8
  },
  {
    id: 23,
    name: "阜杭豆漿",
    address: "台北市中正區忠孝東路一段 108 號 (華山市場 2 樓)",
    distance: "1.2km",
    distanceVal: 1200,
    time: "15 min",
    phone: "02-2392-2175",
    delivery: "#",
    image: fuhangSoyMilkImg,
    tags: ["中正區", "台式", "早餐", "燒餅", "排隊美食"],
    rating: 4.7
  },
  {
    id: 131,
    name: "晴光紅豆餅 (公館店)",
    address: "台北市中正區羅斯福路三段 316 巷 8 弄 14 號",
    distance: "3.2km",
    distanceVal: 3200,
    time: "22 min",
    phone: "0921-123456",
    delivery: "#",
    image: redBeanWheelCakeImg,
    tags: ["中正區", "甜點", "小吃", "平價"],
    rating: 4.5
  },
  {
    id: 170,
    name: "藍家割包",
    address: "台北市中正區羅斯福路三段 316 巷 8 弄 3 號",
    distance: "3.1km",
    distanceVal: 3100,
    time: "20 min",
    phone: "02-2368-2060",
    delivery: "https://www.ubereats.com",
    image: guaBaoImg,
    tags: ["中正區", "台式", "割包", "平價", "小吃", "米其林"],
    rating: 4.5
  },
  {
    id: 171,
    name: "公館陳三鼎粉圓 (原店址青蛙撞奶)",
    address: "台北市中正區羅斯福路三段 316 巷 8 弄",
    distance: "3.2km",
    distanceVal: 3200,
    time: "22 min",
    phone: "#",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80&sig=boba",
    tags: ["中正區", "飲品", "黑糖鮮奶", "排隊美食", "公館商圈"],
    rating: 4.4
  },

  // --- 大同區 (5 家) ---
  {
    id: 21,
    name: "Twin Brothers Coffee",
    address: "台北市大同區華陰街 77 號",
    distance: "1.5km",
    distanceVal: 1500,
    time: "20 min",
    phone: "02-2550-9298",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    tags: ["大同區", "甜點", "肉桂捲", "咖啡"],
    rating: 4.9
  },
  {
    id: 132,
    name: "大橋頭老牌筒仔米糕",
    address: "台北市大同區延平北路三段 41 號",
    distance: "3.8km",
    distanceVal: 3800,
    time: "28 min",
    phone: "02-2594-4685",
    delivery: "#",
    image: taiwaneseRiceCakeImg,
    tags: ["大同區", "台式", "小吃", "米其林", "平價"],
    rating: 4.6
  },
  {
    id: 133,
    name: "灶頂原汁排骨湯高麗菜飯",
    address: "台北市大同區延平北路三段 17 巷 2 號",
    distance: "3.6km",
    distanceVal: 3600,
    time: "26 min",
    phone: "#",
    delivery: "#",
    image: cabbageRiceSoupImg,
    tags: ["大同區", "台式", "小吃", "米其林", "平價"],
    rating: 4.7
  },
  {
    id: 172,
    name: "杉味古早味豆花",
    address: "台北市大同區延平北路三段 56 號",
    distance: "3.8km",
    distanceVal: 3800,
    time: "25 min",
    phone: "02-2587-3758",
    delivery: "https://www.foodpanda.com.tw",
    image: shanweiDouhuaImg,
    tags: ["大同區", "甜點", "冰品", "豆花", "古早味"],
    rating: 4.4
  },
  {
    id: 173,
    name: "佳興魚丸店",
    address: "台北市大同區延平北路二段 210 巷 21 號",
    distance: "3.0km",
    distanceVal: 3000,
    time: "22 min",
    phone: "02-2553-6470",
    delivery: "https://www.ubereats.com",
    image: fishBallSoupImg,
    tags: ["大同區", "台式", "小吃", "魚丸湯", "福州魚丸"],
    rating: 4.3
  },

  // --- 中山區 (5 家) ---
  {
    id: 105,
    name: "上引水產 立吞區",
    address: "台北市中山區民族東路 410 巷 2 弄 18 號",
    distance: "2.8km",
    distanceVal: 2800,
    time: "30 min",
    phone: "02-2508-1268",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80&sig=seafood",
    tags: ["中山區", "海鮮", "日式", "生魚片"],
    rating: 4.6
  },
  {
    id: 120,
    name: "三五水餃",
    address: "台北市中山區民生西路 17 號",
    distance: "2.1km",
    distanceVal: 2100,
    time: "15 min",
    phone: "02-2511-6338",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80&sig=35dumplings",
    tags: ["中山區", "台式", "水餃", "平價", "排隊美食"],
    rating: 4.5
  },
  {
    id: 134,
    name: "肥前屋",
    address: "台北市中山區中山北路一段 121 巷 13 號",
    distance: "1.8km",
    distanceVal: 1800,
    time: "14 min",
    phone: "02-2561-7859",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80&sig=unagi",
    tags: ["中山區", "日式", "鰻魚飯", "排隊美食"],
    rating: 4.4
  },
  {
    id: 135,
    name: "養心茶樓 蔬食飲茶",
    address: "台北市中山區松江路 128 號 2 樓",
    distance: "1.6km",
    distanceVal: 1600,
    time: "12 min",
    phone: "02-2542-8828",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=yangxin",
    tags: ["中山區", "港式", "素食", "點心", "聚餐"],
    rating: 4.7
  },
  {
    id: 174,
    name: "晴光意麵",
    address: "台北市中山區雙城街 12 巷 1-1 號",
    distance: "2.3km",
    distanceVal: 2300,
    time: "16 min",
    phone: "02-2594-9895",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80&sig=qgimen",
    tags: ["中山區", "台式", "小吃", "乾意麵", "平價"],
    rating: 4.3
  },

  // --- 松山區 (5 家) ---
  {
    id: 13,
    name: "辛殿。麻辣鍋",
    address: "台北市松山區南京東路三段 123 號",
    distance: "650m",
    distanceVal: 650,
    time: "9 min",
    phone: "02-2771-1188",
    delivery: "https://www.ubereats.com",
    image: hotPotImg,
    tags: ["松山區", "火鍋", "麻辣", "聚餐"],
    rating: 4.8
  },
  {
    id: 136,
    name: "微熱山丘 SunnyHills (台北民生公園店)",
    address: "台北市松山區民生東路五段 36 巷 4 弄 1 號",
    distance: "3.2km",
    distanceVal: 3200,
    time: "24 min",
    phone: "02-2760-0508",
    delivery: "#",
    image: pineappleCakeImg,
    tags: ["松山區", "甜點", "下午茶", "伴手禮"],
    rating: 4.7
  },
  {
    id: 137,
    name: "司機俱樂部",
    address: "台北市松山區南京東路五段 399 巷 2 號",
    distance: "3.5km",
    distanceVal: 3500,
    time: "25 min",
    phone: "02-2749-3971",
    delivery: "https://www.ubereats.com",
    image: luRouFanImg,
    tags: ["松山區", "台式", "滷肉飯", "平價", "宵夜"],
    rating: 4.4
  },
  {
    id: 175,
    name: "亓家蒸餃",
    address: "台北市松山區南京東路五段 123 巷 4 弄 1.5 號",
    distance: "3.0km",
    distanceVal: 3000,
    time: "20 min",
    phone: "02-2760-1935",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80&sig=qijia-dumplings",
    tags: ["松山區", "台式", "蒸餃", "平價", "排隊美食"],
    rating: 4.5
  },
  {
    id: 176,
    name: "佳德鳳梨酥",
    address: "台北市松山區南京東路五段 88 號",
    distance: "2.5km",
    distanceVal: 2500,
    time: "18 min",
    phone: "02-8787-8186",
    delivery: "#",
    image: pineappleCakeImg,
    tags: ["松山區", "甜點", "鳳梨酥", "伴手禮", "老字號"],
    rating: 4.6
  },

  // --- 大安區 (5 家) ---
  {
    id: 14,
    name: "起家雞 Cheogajip",
    address: "台北市大安區光復南路 280 巷 25 號",
    distance: "400m",
    distanceVal: 400,
    time: "6 min",
    phone: "02-2773-0737",
    delivery: "https://www.foodpanda.com.tw",
    image: koreanFriedChickenImg,
    tags: ["大安區", "韓式", "炸雞", "快速"],
    rating: 4.5
  },
  {
    id: 16,
    name: "法式甜點 Le Ruban",
    address: "台北市大安區仁愛路四段 300 巷 20 弄 11 號",
    distance: "550m",
    distanceVal: 550,
    time: "8 min",
    phone: "02-2700-3501",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?auto=format&fit=crop&w=800&q=80",
    tags: ["大安區", "甜點", "法式", "下午茶"],
    rating: 4.9
  },
  {
    id: 138,
    name: "鼎泰豐 (新生店)",
    address: "台北市大安區信義路二段 277 號",
    distance: "1.8km",
    distanceVal: 1800,
    time: "15 min",
    phone: "02-2395-2395",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=dintaifung",
    tags: ["大安區", "台式", "點心", "米其林", "排隊美食"],
    rating: 4.8
  },
  {
    id: 139,
    name: "東區粉圓",
    address: "台北市大安區忠孝東路四段 216 巷 38 號",
    distance: "750m",
    distanceVal: 750,
    time: "9 min",
    phone: "02-2777-2057",
    delivery: "https://www.foodpanda.com.tw",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80&sig=dessert-taro",
    tags: ["大安區", "甜點", "冰品", "傳統", "平價"],
    rating: 4.6
  },
  {
    id: 177,
    name: "永康牛肉麵",
    address: "台北市大安區金山南路二段 31 巷 17 號",
    distance: "1.9km",
    distanceVal: 1900,
    time: "16 min",
    phone: "02-2351-1051",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=yongkang-beef-noodles",
    tags: ["大安區", "台式", "牛肉麵", "老字號", "排隊美食"],
    rating: 4.3
  },

  // --- 萬華區 (5 家) ---
  {
    id: 152,
    name: "金獅樓 (金獅大酒樓)",
    address: "台北市萬華區西寧南路 36 號 10 樓 (西門町獅子林大樓)",
    distance: "2.4km",
    distanceVal: 2400,
    time: "20 min",
    phone: "02-2312-2004",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=jinshilou",
    tags: ["萬華區", "港式", "飲茶", "推車飲茶", "老字號", "聚餐"],
    rating: 4.3
  },
  {
    id: 22,
    name: "小王煮瓜",
    address: "台北市萬華區華西街 174 號 (攤位 153)",
    distance: "2.8km",
    distanceVal: 2800,
    time: "35 min",
    phone: "02-2370-0268",
    delivery: "https://www.ubereats.com",
    image: luRouFanImg,
    tags: ["萬華區", "台式", "滷肉飯", "米其林"],
    rating: 4.8
  },
  {
    id: 140,
    name: "天天利美食坊",
    address: "台北市萬華區漢中街 32 巷 1 號",
    distance: "2.5km",
    distanceVal: 2500,
    time: "30 min",
    phone: "02-2375-6299",
    delivery: "https://www.ubereats.com",
    image: luRouFanImg,
    tags: ["萬華區", "台式", "蚵仔煎", "滷肉飯", "平價"],
    rating: 4.6
  },
  {
    id: 141,
    name: "三味食堂",
    address: "台北市萬華區貴陽街二段 116 號",
    distance: "2.7km",
    distanceVal: 2700,
    time: "32 min",
    phone: "02-2389-2211",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80&sig=sanwei",
    tags: ["萬華區", "日式", "生魚片", "排隊美食"],
    rating: 4.5
  },
  {
    id: 178,
    name: "阿宗麵線",
    address: "台北市萬華區峨眉街 8-1 號",
    distance: "2.4km",
    distanceVal: 2400,
    time: "15 min",
    phone: "02-2388-8808",
    delivery: "#",
    image: ayChungNoodlesImg,
    tags: ["萬華區", "台式", "小吃", "大腸麵線", "西門町"],
    rating: 4.2
  },

  // --- 信義區 (5 家) ---
  {
    id: 106,
    name: "一蘭拉麵 台北台灣本店",
    address: "台北市信義區松仁路 97 號",
    distance: "1.0km",
    distanceVal: 1000,
    time: "12 min",
    phone: "02-2758-2801",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=ichiran",
    tags: ["信義區", "日式", "拉麵", "24小時"],
    rating: 4.7
  },
  {
    id: 142,
    name: "竹村居酒屋",
    address: "台北市信義區松仁路 253 巷 1 弄 2 號",
    distance: "1.5km",
    distanceVal: 1500,
    time: "18 min",
    phone: "02-2720-9305",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80&sig=takemura",
    tags: ["信義區", "日式", "居屋", "居酒屋", "串燒", "台北101"],
    rating: 4.6
  },
  {
    id: 143,
    name: "宋廚菜館",
    address: "台北市信義區忠孝東路五段 15 巷 14 號",
    distance: "800m",
    distanceVal: 800,
    time: "10 min",
    phone: "02-2764-4788",
    delivery: "#",
    image: cherryRoastDuckImg,
    tags: ["信義區", "台式", "烤鴨", "聚餐"],
    rating: 4.7
  },
  {
    id: 179,
    name: "陳董藥燉排骨",
    address: "台北市信義區八德路四段 739 號 (饒河夜市內)",
    distance: "4.5km",
    distanceVal: 4500,
    time: "30 min",
    phone: "0910-901063",
    delivery: "https://www.ubereats.com",
    image: herbalPorkRibSoupImg,
    tags: ["信義區", "台式", "藥燉排骨", "米其林", "饒河夜市"],
    rating: 4.3
  },
  {
    id: 180,
    name: "佳佳甜品 (基隆路店)",
    address: "台北市信義區基隆路一段 147 巷 5 弄 4 號",
    distance: "1.2km",
    distanceVal: 1200,
    time: "10 min",
    phone: "02-2769-7998",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80&sig=kai-kai",
    tags: ["信義區", "港式", "甜點", "芝麻糊", "米其林"],
    rating: 4.5
  },

  // --- 士林區 (8 家) ---
  {
    id: 230,
    name: "社子古早味豆花",
    address: "台北市士林區社正路 45 巷口",
    distance: "5.2km",
    distanceVal: 5200,
    time: "15 min",
    phone: "0916-123456",
    delivery: "#",
    image: sheziDouhuaImg,
    tags: ["士林區", "甜點", "豆花", "冰品", "平價", "小吃"],
    rating: 4.8
  },
  {
    id: 26,
    name: "海友十全排骨",
    address: "台北市士林區大東路 49 號",
    distance: "3.3km",
    distanceVal: 3300,
    time: "42 min",
    phone: "02-2888-1959",
    delivery: "#",
    image: herbalPorkRibSoupImg,
    tags: ["士林區", "小吃", "藥燉排骨", "米其林"],
    rating: 4.7
  },
  {
    id: 19,
    name: "士林宣原蛋糕專賣店",
    address: "台北市士林區前港街 70 號",
    distance: "3.5km",
    distanceVal: 3500,
    time: "45 min",
    phone: "02-2881-9256",
    delivery: "https://www.facebook.com/sypastry/",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    tags: ["士林區", "甜點", "蛋糕", "排隊美食"],
    rating: 4.6
  },
  {
    id: 25,
    name: "阿輝麵線",
    address: "台北市士林區大南路 84 號",
    distance: "3.2km",
    distanceVal: 3200,
    time: "40 min",
    phone: "02-2883-1566",
    delivery: "#",
    image: ayChungNoodlesImg,
    tags: ["士林區", "小吃", "麵線", "米其林"],
    rating: 4.5
  },
  {
    id: 160,
    name: "豐盛號 (士林店)",
    address: "台北市士林區中正路 223 巷 4 號",
    distance: "3.4km",
    distanceVal: 3400,
    time: "18 min",
    phone: "02-2880-1388",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800&q=80&sig=fengsheng",
    tags: ["士林區", "台式", "早餐", "炭烤土司", "紅茶"],
    rating: 4.6
  },
  {
    id: 161,
    name: "忠誠山東蔥油餅",
    address: "台北市士林區忠誠路二段 132 號",
    distance: "4.5km",
    distanceVal: 4500,
    time: "25 min",
    phone: "02-2875-6552",
    delivery: "#",
    image: scallionPancakeImg,
    tags: ["士林區", "天母", "小吃", "蔥油餅", "平價"],
    rating: 4.8
  },
  {
    id: 162,
    name: "家鄉碳烤香雞排 (士林店)",
    address: "台北市士林區基河路 1 號 (士林夜市)",
    distance: "3.1km",
    distanceVal: 3100,
    time: "15 min",
    phone: "0956-123456",
    delivery: "https://www.ubereats.com",
    image: charcoalChickenCutletImg,
    tags: ["士林區", "小吃", "炸雞", "烤雞排", "夜市必吃"],
    rating: 4.5
  },
  {
    id: 163,
    name: "鍾記原上海生煎包",
    address: "台北市士林區小東街 38 號",
    distance: "3.3km",
    distanceVal: 3300,
    time: "16 min",
    phone: "02-2882-9146",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80&sig=shengjianbao",
    tags: ["士林區", "小吃", "生煎包", "米其林", "排隊美食"],
    rating: 4.7
  },

  // --- 北投區 (5 家) ---
  {
    id: 113,
    name: "滿客屋拉麵",
    address: "台北市北投區溫泉路 110 號",
    distance: "7.2km",
    distanceVal: 7200,
    time: "30 min",
    phone: "02-2893-7958",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=beitou",
    tags: ["北投區", "日式", "拉麵", "小吃"],
    rating: 4.4
  },
  {
    id: 144,
    name: "簡記排骨酥麵",
    address: "台北市北投區新市街 47 號 (北投市場)",
    distance: "7.0km",
    distanceVal: 7000,
    time: "28 min",
    phone: "02-2896-1119",
    delivery: "#",
    image: porkRibNoodlesImg,
    tags: ["北投區", "台式", "小吃", "排骨酥麵", "平價"],
    rating: 4.5
  },
  {
    id: 145,
    name: "高記茶莊",
    address: "台北市北投區新市街 30 號 (北投市場)",
    distance: "7.0km",
    distanceVal: 7000,
    time: "25 min",
    phone: "02-2896-3568",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80&sig=gaojitea",
    tags: ["北投區", "飲品", "茶飲", "平價"],
    rating: 4.7
  },
  {
    id: 181,
    name: "阿財鍋貼水餃專賣店",
    address: "台北市北投區新市街 47 號 (北投市場旁)",
    distance: "7.0km",
    distanceVal: 7000,
    time: "24 min",
    phone: "02-2892-9267",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80&sig=acai-dumplings",
    tags: ["北投區", "台式", "鍋貼", "水餃", "平價"],
    rating: 4.3
  },
  {
    id: 182,
    name: "矮仔財滷肉飯",
    address: "台北市北投區新市街 30 號 2 樓 (北投市場 436 號攤位)",
    distance: "7.0km",
    distanceVal: 7000,
    time: "32 min",
    phone: "#",
    delivery: "#",
    image: luRouFanImg,
    tags: ["北投區", "台式", "滷肉飯", "平價", "排隊美食"],
    rating: 4.6
  },

  // --- 內湖區 (5 家) ---
  {
    id: 107,
    name: "覺旅咖啡 Journey Kaffe",
    address: "台北市內湖區陽光街 273 號",
    distance: "3.5km",
    distanceVal: 3500,
    time: "18 min",
    phone: "02-8751-3227",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80&sig=neihu",
    tags: ["內湖區", "咖啡", "義大利麵", "不限時"],
    rating: 4.6
  },
  {
    id: 146,
    name: "金泰日式料理",
    address: "台北市內湖區舊宗路二段 121 巷 34 號",
    distance: "4.2km",
    distanceVal: 4200,
    time: "20 min",
    phone: "02-8792-8167",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80&sig=jintai",
    tags: ["內湖區", "海鮮", "日式", "海鮮蓋飯"],
    rating: 4.5
  },
  {
    id: 147,
    name: "象園咖啡 Elephant Garden",
    address: "台北市內湖區內湖路二段 192 號",
    distance: "4.0km",
    distanceVal: 4000,
    time: "22 min",
    phone: "02-2792-6002",
    delivery: "https://www.foodpanda.com.tw",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80&sig=elephant",
    tags: ["內湖區", "咖啡", "親子餐廳", "下午茶"],
    rating: 4.4
  },
  {
    id: 183,
    name: "內湖 737 巷 豬大郎豬血糕",
    address: "台北市內湖區內湖路一段 737 巷 30 號",
    distance: "4.0km",
    distanceVal: 4000,
    time: "15 min",
    phone: "0968-123456",
    delivery: "#",
    image: pigsBloodCakeImg,
    tags: ["內湖區", "台式", "小吃", "豬血糕", "夜市必吃"],
    rating: 4.5
  },
  {
    id: 184,
    name: "亞坤海南雞飯",
    address: "台北市內湖區瑞光路 478 巷 18-3 號",
    distance: "3.8km",
    distanceVal: 3800,
    time: "18 min",
    phone: "02-2656-1181",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1591814468923-accb5d2d624a?auto=format&fit=crop&w=800&q=80&sig=yakun-chicken",
    tags: ["內湖區", "台式", "東南亞", "海南雞飯", "平價"],
    rating: 4.3
  },

  // --- 南港區 (5 家) ---
  {
    id: 109,
    name: "點點心 台北南港店",
    address: "台北市南港區忠孝東路七段 369 號 (CITYLINK 南港店)",
    distance: "5.8km",
    distanceVal: 5800,
    time: "25 min",
    phone: "02-2652-9980",
    delivery: "https://www.foodpanda.com.tw",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=dimsum",
    tags: ["南港區", "港式", "點心", "聚餐"],
    rating: 4.5
  },
  {
    id: 148,
    name: "老張炭烤燒餅店",
    address: "台北市南港區忠孝東路七段 602 號",
    distance: "6.2km",
    distanceVal: 6200,
    time: "28 min",
    phone: "02-2783-5591",
    delivery: "#",
    image: pepperFlatbreadImg,
    tags: ["南港區", "台式", "小吃", "胡椒餅", "排隊美食"],
    rating: 4.6
  },
  {
    id: 149,
    name: "高家雙胞胎",
    address: "台北市南港區聯成路 5 號",
    distance: "5.5km",
    distanceVal: 5500,
    time: "24 min",
    phone: "0912-123456",
    delivery: "#",
    image: twinsDoughnutImg,
    tags: ["南港區", "台式", "小吃", "傳統", "平價"],
    rating: 4.5
  },
  {
    id: 185,
    name: "北大荒水餃店",
    address: "台北市南港區南港路一段 201 號",
    distance: "5.8km",
    distanceVal: 5800,
    time: "20 min",
    phone: "02-2788-0455",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80&sig=beidahuang",
    tags: ["南港區", "台式", "水餃", "平價", "大份量", "排隊美食"],
    rating: 4.1
  },
  {
    id: 186,
    name: "餡老滿 (南港旗艦店)",
    address: "台北市南港區園區街 58 號 2 樓 (南港軟體園區)",
    distance: "6.0km",
    distanceVal: 6000,
    time: "26 min",
    phone: "02-2789-3423",
    delivery: "https://www.foodpanda.com.tw",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=xianlaoman",
    tags: ["南港區", "中式", "餃子", "宮廷菜", "聚餐"],
    rating: 4.3
  },

  // --- 文山區 (5 家) ---
  {
    id: 111,
    name: "楊家手工水餃",
    address: "台北市文山區興隆路三段 112 巷 2 弄 2 號",
    distance: "4.2km",
    distanceVal: 4200,
    time: "20 min",
    phone: "02-2930-5635",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80&sig=yandumpling",
    tags: ["文山區", "台式", "水餃", "平價"],
    rating: 4.6
  },
  {
    id: 150,
    name: "阿義師大茶壺茶餐廳",
    address: "台北市文山區指南路三段 38 巷 37之1 號 (貓空)",
    distance: "6.5km",
    distanceVal: 6500,
    time: "32 min",
    phone: "02-2939-5615",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80&sig=ayishi",
    tags: ["文山區", "台式", "茶料理", "景觀餐廳", "聚餐"],
    rating: 4.7
  },
  {
    id: 151,
    name: "Mint Pasta 綠薄荷麵食館",
    address: "台北市文山區景興路 274-2 號 (世新大學旁)",
    distance: "4.5km",
    distanceVal: 4500,
    time: "22 min",
    phone: "02-2933-2111",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80&sig=mintpasta",
    tags: ["文山區", "義式", "義大利麵", "平價", "熱門"],
    rating: 4.5
  },
  {
    id: 187,
    name: "景美上海生煎包",
    address: "台北市文山區景文街 141 號 (景美夜市)",
    distance: "4.3km",
    distanceVal: 4300,
    time: "18 min",
    phone: "0935-123456",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80&sig=jingmei-shengjian",
    tags: ["文山區", "小吃", "生煎包", "夜市必吃", "平價"],
    rating: 4.5
  },
  {
    id: 188,
    name: "貓空 邀月茶坊",
    address: "台北市文山區指南路三段 40 巷 6 號",
    distance: "6.8km",
    distanceVal: 6800,
    time: "35 min",
    phone: "02-2939-2025",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80&sig=yaoyue",
    tags: ["文山區", "台式", "泡茶", "景觀餐廳", "不限時"],
    rating: 4.4
  },
  // --- 擴增：人氣美食與各區推薦 (22 家) ---
  {
    id: 201,
    name: "詹記麻辣火鍋 (敦南店)",
    address: "台北市大安區和平東路三段 60 號",
    distance: "1.2km",
    distanceVal: 1200,
    time: "10 min",
    phone: "02-2377-0955",
    delivery: "#",
    image: hotPotImg,
    tags: ["大安區", "火鍋", "麻辣", "老字號", "聚餐"],
    rating: 4.8
  },
  {
    id: 202,
    name: "橘色涮涮屋 (一館)",
    address: "台北市大安區大安路一段 135 號 B1",
    distance: "850m",
    distanceVal: 850,
    time: "8 min",
    phone: "02-2776-1658",
    delivery: "#",
    image: hotPotImg,
    tags: ["大安區", "火鍋", "高檔", "聚餐", "海鮮"],
    rating: 4.9
  },
  {
    id: 203,
    name: "海底撈火鍋 (信義店)",
    address: "台北市信義區松壽路 12 號 (ATT 4 FUN 6 樓)",
    distance: "900m",
    distanceVal: 900,
    time: "8 min",
    phone: "02-7743-1855",
    delivery: "https://www.ubereats.com",
    image: hotPotImg,
    tags: ["信義區", "火鍋", "麻辣", "川味", "聚餐"],
    rating: 4.7
  },
  {
    id: 204,
    name: "鼎王麻辣鍋 (長安店)",
    address: "台北市中山區長安東路二段 131-1 號",
    distance: "1.9km",
    distanceVal: 1900,
    time: "15 min",
    phone: "02-2507-8018",
    delivery: "https://www.foodpanda.com.tw",
    image: hotPotImg,
    tags: ["中山區", "火鍋", "麻辣", "聚餐"],
    rating: 4.6
  },
  {
    id: 205,
    name: "Nene Chicken (信義店)",
    address: "台北市信義區松高路 11 號 (信義誠品)",
    distance: "1.1km",
    distanceVal: 1100,
    time: "9 min",
    phone: "02-2723-6658",
    delivery: "https://www.ubereats.com",
    image: koreanFriedChickenImg,
    tags: ["信義區", "韓式", "炸雞", "快速", "小吃"],
    rating: 4.5
  },
  {
    id: 206,
    name: "胖老爹美式炸雞 (大安店)",
    address: "台北市大安區通化街 38 巷 14 號",
    distance: "950m",
    distanceVal: 950,
    time: "10 min",
    phone: "02-2708-3168",
    delivery: "https://www.foodpanda.com.tw",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80&sig=fatpaddy",
    tags: ["大安區", "美式", "炸雞", "快速", "平價"],
    rating: 4.4
  },
  {
    id: 207,
    name: "bb.q CHICKEN (南西店)",
    address: "台北市中山區南京西路 15 號 (新光三越 3 樓)",
    distance: "1.9km",
    distanceVal: 1900,
    time: "16 min",
    phone: "02-2567-9358",
    delivery: "https://www.ubereats.com",
    image: koreanFriedChickenImg,
    tags: ["中山區", "韓式", "炸雞", "快速", "小吃"],
    rating: 4.5
  },
  {
    id: 208,
    name: "隱家拉麵 (赤峰店)",
    address: "台北市大同區南京西路 25 巷 28 號",
    distance: "2.0km",
    distanceVal: 2000,
    time: "15 min",
    phone: "02-2559-5970",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=yinjia-ramen",
    tags: ["大同區", "日式", "拉麵", "排隊美食"],
    rating: 4.8
  },
  {
    id: 209,
    name: "鬼金棒 辣麻味噌拉麵 (長安店)",
    address: "台北市中山區長安西路 19 巷 2 弄 35-1 號",
    distance: "2.1km",
    distanceVal: 2100,
    time: "16 min",
    phone: "#",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=kikanbo",
    tags: ["中山區", "日式", "拉麵", "地獄麻辣", "排隊美食"],
    rating: 4.7
  },
  {
    id: 210,
    name: "拉麵公子",
    address: "台北市中山區八德路二段 279 號",
    distance: "1.2km",
    distanceVal: 1200,
    time: "10 min",
    phone: "#",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80&sig=ramengongzi",
    tags: ["中山區", "日式", "拉麵", "網美", "排隊美食"],
    rating: 4.6
  },
  {
    id: 211,
    name: "乾杯燒肉居酒屋 (敦南店)",
    address: "台北市大安區敦化南路一段 169 巷 5 號",
    distance: "500m",
    distanceVal: 500,
    time: "6 min",
    phone: "02-2776-3468",
    delivery: "https://www.foodpanda.com.tw",
    image: wagyuYakinikuImg,
    tags: ["大安區", "燒肉", "日式", "聚餐", "居酒屋"],
    rating: 4.7
  },
  {
    id: 212,
    name: "胡同燒肉 (1號店)",
    address: "台北市大安區敦化南路一段 161 巷 17 號",
    distance: "600m",
    distanceVal: 600,
    time: "7 min",
    phone: "02-2776-1575",
    delivery: "#",
    image: wagyuYakinikuImg,
    tags: ["大安區", "燒肉", "高檔", "日式", "聚餐"],
    rating: 4.8
  },
  {
    id: 213,
    name: "新村站著吃烤肉",
    address: "台北市信義區忠孝東路五段 159 號",
    distance: "1.3km",
    distanceVal: 1300,
    time: "10 min",
    phone: "02-4012-3456",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80&sig=shincun-bbq",
    tags: ["信義區", "燒肉", "韓式", "聚餐", "排隊美食"],
    rating: 4.6
  },
  {
    id: 214,
    name: "溫州街蘿蔔絲餅達人",
    address: "台北市大安區和平東路一段 186-1 號",
    distance: "1.8km",
    distanceVal: 1800,
    time: "15 min",
    phone: "02-2369-5649",
    delivery: "#",
    image: radishPieImg,
    tags: ["大安區", "台式", "小吃", "蔥油餅", "平價", "排隊美食"],
    rating: 4.7
  },
  {
    id: 215,
    name: "天母蔥油餅 (此燈亮有餅)",
    address: "台北市士林區克強路 3 號",
    distance: "4.8km",
    distanceVal: 4800,
    time: "24 min",
    phone: "02-2831-0000",
    delivery: "#",
    image: scallionPancakeImg,
    tags: ["士林區", "天母", "小吃", "蔥油餅", "平價"],
    rating: 4.6
  },
  {
    id: 216,
    name: "微兜 Petit Doux (光復店)",
    address: "台北市大安區光復南路 280 巷 40 號",
    distance: "450m",
    distanceVal: 450,
    time: "6 min",
    phone: "02-2721-3008",
    delivery: "https://www.ubereats.com",
    image: petitDouxWapaImg,
    tags: ["大安區", "甜點", "下午茶", "舒芙蕾", "約會"],
    rating: 4.7
  },
  {
    id: 217,
    name: "美好年代 Belle Époque (東區總店)",
    address: "台北市大安區大安路一段 52 巷 23 號",
    distance: "700m",
    distanceVal: 700,
    time: "9 min",
    phone: "02-2775-3393",
    delivery: "https://www.ubereats.com",
    image: belleEpoquePancakeImg,
    tags: ["大安區", "甜點", "下午茶", "舒芙蕾", "珍珠奶茶"],
    rating: 4.6
  },
  {
    id: 218,
    name: "三井日本料理 (本館)",
    address: "台北市中山區農安街 30 號",
    distance: "2.5km",
    distanceVal: 2500,
    time: "18 min",
    phone: "02-2594-3399",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80&sig=mitsui",
    tags: ["中山區", "日式", "海鮮", "高檔", "聚餐"],
    rating: 4.8
  },
  {
    id: 219,
    name: "小六食堂",
    address: "台北市中山區錦州街 252 號",
    distance: "1.4km",
    distanceVal: 1400,
    time: "11 min",
    phone: "02-2506-0065",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80&sig=xiaoliu-sashimi",
    tags: ["中山區", "日式", "生魚片", "海鮮", "丼飯", "平價"],
    rating: 4.7
  },
  {
    id: 220,
    name: "游壽司 (金華店)",
    address: "台北市大安區金華街 201 號",
    distance: "1.9km",
    distanceVal: 1900,
    time: "15 min",
    phone: "02-2322-5531",
    delivery: "#",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80&sig=yusushi",
    tags: ["大安區", "日式", "生魚片", "海鮮", "壽司", "高檔"],
    rating: 4.8
  },
  {
    id: 221,
    name: "八一八客堂燒肉 (長安店)",
    address: "台北市松山區市民大道四段 143 號",
    distance: "550m",
    distanceVal: 550,
    time: "7 min",
    phone: "02-2577-1818",
    delivery: "https://www.ubereats.com",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80&sig=yaky-eight",
    tags: ["松山區", "燒肉", "日式", "聚餐"],
    rating: 4.5
  },
  {
    id: 222,
    name: "一星豆花 (中正新生店)",
    address: "台北市中正區新生南路一段 102 號",
    distance: "1.2km",
    distanceVal: 1200,
    time: "10 min",
    phone: "0932-123456",
    delivery: "https://www.foodpanda.com.tw",
    image: yixingDouhuaImg,
    tags: ["中正區", "甜點", "豆花", "冰品", "平價"],
    rating: 4.6
  }
];

export default function TheTruth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterNearby, setFilterNearby] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("全部");

  useEffect(() => {
    setSearchTerm(initialSearch);
    // If the initial search matches a district abbreviation, select it
    const districts = ["中正", "大同", "中山", "松山", "大安", "萬華", "信義", "士林", "北投", "內湖", "南港", "文山"];
    const matched = districts.find(d => initialSearch.includes(d));
    if (matched) {
      setSelectedDistrict(matched + "區");
    } else {
      setSelectedDistrict("全部");
    }
  }, [initialSearch]);

  const displayedRestaurants = RESTAURANTS.filter(r => {
    const matchesSearch = searchTerm === "" || 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesNearby = !filterNearby || r.distanceVal <= 500;
    
    // Support matching district by tags or address
    const matchesDistrict = selectedDistrict === "全部" || 
      r.tags.some(tag => tag.includes(selectedDistrict)) ||
      r.address.includes(selectedDistrict.replace("區", ""));
    
    return matchesSearch && matchesNearby && matchesDistrict;
  }).sort((a, b) => filterNearby ? a.distanceVal - b.distanceVal : 0);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="pt-24 px-6 max-w-5xl mx-auto pb-32"
    >
      <div className="mb-16 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-10 bg-brand rounded-full" />
            <h1 className="text-5xl font-black text-ink tracking-tight">美食真相</h1>
          </div>
          {searchTerm && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 inline-block bg-brand/10 text-brand px-4 py-2 rounded-xl font-bold border border-brand/20"
            >
              ✨ 根據您的「心情」推薦：{searchTerm}
            </motion.div>
          )}
          <p className="text-slate-500 text-xl font-bold italic">「有些餐廳，去了才知道是真的好吃。」</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="搜尋餐廳、特色分類..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-sky-50 rounded-[2rem] py-4 pl-14 pr-6 font-bold text-ink focus:border-brand focus:outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setFilterNearby(!filterNearby)}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-[2rem] font-black transition-all duration-300 ${
              filterNearby 
              ? 'bg-brand text-white shadow-2xl shadow-brand/40 scale-105' 
              : 'bg-white text-slate-400 border-2 border-sky-50 shadow-sm hover:border-brand/20 hover:text-brand'
            }`}
          >
            <Filter size={22} strokeWidth={3} />
            <span className="tracking-tight whitespace-nowrap">{filterNearby ? '顯示全部' : '只看 500m 內'}</span>
          </button>
        </div>

        {/* 台北市 12 行政區快捷選單 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-black text-xs tracking-wider uppercase">依行政區快速篩選（已涵蓋台北 12 行政區）</span>
            {selectedDistrict !== "全部" && (
              <button 
                onClick={() => setSelectedDistrict("全部")} 
                className="text-brand text-xs font-black hover:underline"
              >
                清除篩選
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-6 px-6 md:flex-wrap md:overflow-visible">
            {["全部", "中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"].map((dist) => (
              <button
                key={dist}
                onClick={() => {
                  setSelectedDistrict(dist);
                  // Optional: clear search text if it targets an unrelated query to avoid empty state confusion
                  if (dist !== "全部") {
                    setSearchTerm("");
                  }
                }}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all duration-300 cursor-pointer snap-start ${
                  selectedDistrict === dist
                  ? 'bg-brand text-white shadow-md shadow-brand/20 scale-105'
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-brand hover:text-brand'
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12 min-h-[40vh]">
        <AnimatePresence mode="popLayout">
          {displayedRestaurants.length > 0 ? (
            displayedRestaurants.map((shop, idx) => (
              <motion.div
                key={shop.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 border border-sky-50 flex flex-col lg:flex-row group"
              >
                <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                  <SafeImage 
                    src={shop.image} 
                    alt={shop.name}
                    fallbackSrc={`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=20&sig=${shop.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white shadow-xl px-4 py-2 rounded-2xl text-lg font-black text-brand flex items-center gap-1.5">
                    <Star size={18} fill="currentColor" /> {shop.rating}
                  </div>
                </div>

                <div className="p-8 md:p-10 lg:w-3/5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-ink group-hover:text-brand transition-colors mb-4">{shop.name}</h2>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {shop.tags.map(tag => (
                        <span key={tag} className="bg-sky-50 px-3 py-1 rounded-full text-[10px] font-black text-brand border border-sky-100/50 uppercase tracking-widest cursor-pointer hover:bg-brand hover:text-white transition-colors" onClick={() => setSearchTerm(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3 text-slate-500 font-bold mb-8">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[1.2rem] border border-slate-100/50">
                        <MapPin size={18} className="text-brand shrink-0" />
                        <span className="text-slate-700 text-sm line-clamp-1">{shop.address}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-sky-50/50 rounded-[1.2rem] border border-sky-100/50">
                          <Navigation size={18} className="text-brand shrink-0" />
                          <span className="text-brand text-sm">{shop.distance}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[1.2rem] border border-slate-100/50">
                          <Clock size={18} className="text-brand/60 shrink-0" />
                          <span className="text-sm">{shop.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-ink text-white py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-ink/20 transition-all active:scale-95 text-sm"
                    >
                      <Navigation size={18} /> 導航
                    </a>
                    <a 
                      href={shop.delivery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-brand text-white py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 shadow-xl shadow-brand/30 hover:brightness-110 hover:-translate-y-1 transition-all active:translate-y-0 text-sm"
                    >
                      <ExternalLink size={18} /> 外送
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-sky-200">
              <p className="text-slate-400 font-black text-xl">此行政區目前沒有相關餐廳，換個關鍵字或選其他行政區試試？</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

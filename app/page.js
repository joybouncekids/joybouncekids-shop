'use client';
import { useState, useEffect } from 'react';
 
const STORE_INFO = {
  name: 'JoyBounce Kids', nameChinese: '躍木親子',
  tagline: '親子選物｜為每個家庭時刻精選',
  phone: '0910-504-781', email: 'hctonylee@gmail.com',
  line: '@joybouncekids', instagram: '@joybouncekids',
  address: '臺中市西區精誠16街39號3樓之一',
};
 
const SUBCATS = {
  '靜': ['全部','立體拼圖','形狀認知','空間邏輯','數字啟蒙','字母學習','邏輯益智','積木套柱'],
  '動': ['全部','磁吸火車','扮家家酒','體能玩具'],
  '節日': ['全部','生日慶典','抓周儀式','戶外野餐','畢業季','中秋手作','聖誕親子'],
};
 
const SCENES = [
  { key:'靜', title:'靜', sub:'Quiet Time',   desc:'培養專注與創造力的靜心時光，讓孩子在安靜中發現無限可能', color:'var(--quiet)', img:'https://images.pexels.com/photos/4908525/pexels-photo-4908525.jpeg?auto=compress&cs=tinysrgb&w=700' },
  { key:'動', title:'動', sub:'Active Play',  desc:'讓孩子盡情跑跳、探索世界，為每一個活力瞬間精選安全好物', color:'var(--active)', img:'https://images.pexels.com/photos/4543646/pexels-photo-4543646.jpeg?auto=compress&cs=tinysrgb&w=700' },
  { key:'節日', title:'節日', sub:'Celebrations', desc:'讓每個節慶都成為家人共同珍藏的美好記憶，從禮物到佈置一次到位', color:'var(--fest)', img:'https://images.pexels.com/photos/6299265/pexels-photo-6299265.jpeg?auto=compress&cs=tinysrgb&w=700' },
];
 
const PRODUCTS = [
  { id:1,  scene:'靜', subcat:'立體拼圖', name:'動物款 木製3D拼圖',      desc:'野生動物造型・形狀配對・手眼協調',          price:380,  tag:'熱銷',   age:'18個月+', imgs:['/products/p01_animal_puzzle.jpg'],          why:'讓孩子用雙手觸碰動物世界，形狀配對在遊戲中自然發生。',          detail:'野生動物造型的加厚木製拼圖，讓寶寶用雙手「摸到」獅子和大象的樣子。每塊拼片厚度友善小手抓握，反覆拼入取出的過程中，自然建立形狀配對與手眼協調能力。\n\n適合放在睡前的靜心時光，或作為認識動物繪本的延伸玩具，邊講故事邊拼，孩子的記憶力會出乎你意料地好。', specs:['木質・安全無毒','18個月以上','尺寸約30cm','1套3D拼圖'] },
  { id:2,  scene:'靜', subcat:'立體拼圖', name:'海洋款 木製3D拼圖',      desc:'海洋生物認知・藍綠色系・精細動作',          price:380,  tag:'',       age:'18個月+', imgs:['/products/p02_ocean_puzzle.jpg'],          why:'藍綠色系視覺溫和，海洋生物認知在把玩中自然發生。',                detail:'藍綠色系的海洋世界讓孩子一眼就被吸引。每塊拼片都是一個海洋生物，海豚、章魚、鯨魚各就各位，拼完還能獨立站立展示。\n\n浴室洗澡時間、海洋主題繪本課後，都是拿出這套玩具的好時機。孩子在玩耍中不知不覺認識了深海裡的好朋友。', specs:['木質・安全無毒','18個月以上','尺寸約30cm','1套3D拼圖'] },
  { id:3,  scene:'靜', subcat:'立體拼圖', name:'農場款 木製3D拼圖',      desc:'農場動物認知・暖色木質・場景連結',          price:380,  tag:'',       age:'18個月+', imgs:['/products/p03_farm_puzzle.jpg'],          why:'把農場探索的記憶帶回家，暖色木質調讓睡前遊戲更舒緩。',          detail:'帶孩子去農場玩了一趟，回家就忘光了？這套農場主題拼圖讓孩子把「農場記憶」帶回家。牛、豬、雞、馬，每次把玩就是一次複習，不知不覺建立起對農業生活與動物的連結。\n\n暖橘木質調讓這套玩具特別適合作為睡前靜態遊戲，溫和不刺激，幫助孩子安靜下來。', specs:['木質・安全無毒','18個月以上','尺寸約30cm','1套3D拼圖'] },
  { id:4,  scene:'靜', subcat:'形狀認知', name:'基礎圖形配對板',          desc:'幾何形狀×色彩辨識・入門益智首選',          price:420,  tag:'',       age:'18個月+', imgs:['/products/p04_basic_shape_board.jpg'],    why:'最直覺的嵌入動作，讓形狀和色彩認知同時發生，零挫折感。',        detail:'孩子連基本形狀都還分不清楚？這款配對板用最直覺的「嵌入」動作，讓孩子在反覆對齊中自然記住圓形、三角形、正方形，完全不需要任何說明，玩著玩著就學會了。\n\n色彩搭配設計讓每個形狀都有自己的顏色，顏色和形狀同時被記憶，是啟蒙認知效率最高的玩具之一。', specs:['木質','18個月以上','尺寸約30cm','1套拼板'] },
  { id:5,  scene:'靜', subcat:'形狀認知', name:'進階圖形配對板',          desc:'更多邊形・空間邏輯・銜接幼稚園數學',        price:480,  tag:'',       age:'2歲+',    imgs:['/products/p05_advanced_shape_board.jpg'], why:'升級難度剛剛好，讓已掌握基礎的孩子繼續被挑戰持續成長。',        detail:'孩子已經掌握基本形狀，卻開始對簡單玩具失去興趣？這款進階配對板包含更多邊形與不規則形狀，讓已經「升級」的孩子持續被挑戰，維持對學習的好奇心。\n\n難度剛好介於「有挑戰性」和「還辦得到」之間，孩子完成後的成就感表情，是爸媽最開心看到的畫面。', specs:['木質','2歲以上','尺寸約30cm','1套拼板'] },
  { id:6,  scene:'靜', subcat:'空間邏輯', name:'基礎空間認知配對板',      desc:'波浪卡榫・色彩漸層・幾何分解組合',          price:450,  tag:'',       age:'18個月+', imgs:['/products/p06_basic_space_board.jpg'],    why:'幾何分解組合是數學直覺的起點，從遊戲中讓孩子愛上空間思考。',    detail:'空間邏輯是數學的基礎，這款配對板用最直覺的「分解與組合」，讓孩子在遊戲中建立幾何直覺。波浪卡榫設計讓對位更有挑戰性，豐富的色彩漸層讓視覺辨識與美感同時被啟蒙。\n\n比背乘法表早十年打好地基，就從這塊板子開始。', specs:['木質','18個月以上','尺寸約30cm','1套拼板'] },
  { id:7,  scene:'靜', subcat:'空間邏輯', name:'進階空間認知配對板',      desc:'平面×3D雙重挑戰・數學邏輯啟蒙',            price:520,  tag:'',       age:'2歲+',    imgs:['/products/p07_advanced_space_board.jpg'], why:'平面與3D雙重挑戰，培養立體空間感，為未來數學打好基礎。',        detail:'這款進階版結合了平面與3D結構的雙重挑戰，高彩度色塊讓視覺發育同步強化。抓握嵌入的精細操作訓練，讓手眼協調不知不覺提升。\n\n很多家長發現，孩子玩過這款之後，開始對積木和拼圖有了更強的空間直覺。', specs:['木質','2歲以上','尺寸約30cm','1套拼板'] },
  { id:8,  scene:'靜', subcat:'邏輯益智', name:'七巧板',                  desc:'千種變化・空間邏輯・全家一起玩',            price:320,  tag:'經典推薦',age:'3歲+',    imgs:['/products/p08_tangram.jpg'],              why:'一盒玩到大，千種變化永不膩，最值得投資的益智玩具之一。',        detail:'七塊幾何圖形，可以拼出上千種動物、人物、建築造型。這是人類歷史上少數「玩法無窮無盡」的玩具，從3歲玩到10歲，甚至讓大人也著迷。\n\n附題目卡設計讓全家可以一起挑戰，誰先完成誰就是當天的空間邏輯王。不用電、不用充電，一盒玩一輩子。', specs:['木質','3歲以上','尺寸約30cm','7塊拼片+題目卡'] },
  { id:9,  scene:'靜', subcat:'積木套柱', name:'九格幾何形狀套柱積木',    desc:'顏色・形狀・高低序列三合一訓練',            price:480,  tag:'',       age:'18個月+', imgs:['/products/p09_nine_peg_blocks.jpg'],      why:'三種認知訓練合而為一，重複把玩讓學習在不知不覺中深化。',        detail:'顏色辨識、形狀歸類、高低序列，這款九格套柱積木把三種認知訓練融入一個玩具裡。套進去、拔出來、再換個位置套，孩子可以反覆玩上很長時間，每次都有新發現。\n\n木質圓滑耐用，可以清潔消毒，是多孩家庭和托育環境的熱門首選。', specs:['木質','18個月以上','尺寸約30cm','1套'] },
  { id:10, scene:'靜', subcat:'數字啟蒙', name:'蒙特梭利數學教具',        desc:'數值視覺化・加減法啟蒙・英數雙向',          price:580,  tag:'教師推薦',age:'2歲+',    imgs:['/products/p10_montessori_math.jpg'],      why:'讓數字看得見摸得到，數學直覺從具體操作中自然建立。',            detail:'孩子背了1到10，卻不懂「3比2多」是什麼意思？蒙特梭利教學法的核心，就是讓抽象數字變得「看得見、摸得到」。這套數學棒透過長短比例，讓孩子真正理解數量概念。\n\n同時標示阿拉伯數字與英文單字，英數雙向認知一次完成。世界各地幼稚園採用的經典教法，現在可以帶回家用。', specs:['木質','2歲以上','尺寸約30cm','1套'] },
  { id:11, scene:'靜', subcat:'數字啟蒙', name:'數字手勢配對板',          desc:'數字×英文×手勢三合一認知',                 price:480,  tag:'',       age:'18個月+', imgs:['/products/p11_number_gesture_board.jpg'], why:'三種認知模式同時啟動，手勢記憶讓數字深刻留在孩子腦海裡。',      detail:'數字、英文單字、手勢計數，三種學習模式同時發生。手勢視覺化設計讓抽象數字變成具體的手部動作，記憶效果比單純背誦強得多。\n\n上下分塊的配對邏輯訓練孩子的拆解與組合思維，顏色區分讓視覺辨識更輕鬆。很多媽媽說這款是讓孩子最快記住數字的玩具。', specs:['木質','18個月以上','尺寸約30cm','1套拼板'] },
  { id:12, scene:'靜', subcat:'數字啟蒙', name:'數字動物立體拼圖',        desc:'0–9 動物聯想記憶・英文對照・嵌入訓練',     price:520,  tag:'',       age:'18個月+', imgs:['/products/p12_number_animal_puzzle.jpg'], why:'動物聯想記憶讓數字有了生命，孩子學得快也記得牢。',              detail:'如果1是長頸鹿、8是胖胖的大象，孩子就再也忘不了這些數字了。這套將數字融入動物造型的拼圖，讓學數字這件事變成一場動物冒險。\n\n加厚積木設計方便幼兒抓握，嵌入底板的操作同時培養空間辨識力。英文動物單字對照讓語言啟蒙也同步進行。', specs:['木質','18個月以上','尺寸約30cm','1套'] },
  { id:13, scene:'靜', subcat:'字母學習', name:'26字母動物拼圖板',        desc:'A–Z 雙重認知・視覺提示底圖・精細動作',     price:580,  tag:'',       age:'18個月+', imgs:['/products/p13_alphabet_puzzle.jpg'],      why:'零壓力的字母認識，動物聯想讓26個字母自然刻進記憶裡。',          detail:'太早逼孩子背英文字母，只會讓他們對英文產生恐懼。這款拼圖讓字母認識變得超自然，A是螞蟻Ant、B是熊Bear，孩子在把玩中不知不覺就記住了26個字母。\n\n凹槽內的視覺提示底圖降低挫折感，讓孩子可以獨立完成，建立對英文學習的正面感受。', specs:['木質','18個月以上','尺寸約35cm','1套拼板'] },
  { id:14, scene:'靜', subcat:'邏輯益智', name:'四色邏輯遊戲',            desc:'策略思考・顏色認知・精細動作三合一',        price:520,  tag:'',       age:'3歲+',    imgs:['/products/p14_four_color_logic.jpg'],     why:'真正訓練邏輯推理和步驟思考，是平板遊戲無法替代的益智體驗。',    detail:'孩子3歲後需要的不是更多玩具，而是更需要動腦的遊戲。這款四色邏輯棋盤讓孩子依照題目卡思考「先移哪個？後移哪個？」培養步驟思考與計畫能力。\n\n附多張難度漸進的題目卡，可以持續挑戰。很多爸媽說，玩這款的孩子專注力明顯提升。', specs:['木質','3歲以上','尺寸約30cm','1套+題目卡'] },
  { id:15, scene:'靜', subcat:'邏輯益智', name:'七彩夾珠益智玩具',        desc:'筷子・夾子・湯匙・顏色配對・專注力',        price:480,  tag:'',       age:'3歲+',    imgs:['/products/p15_colorful_bead_clamp.jpg'],  why:'把練習餐具變成孩子搶著玩的遊戲，最自然的生活技能訓練。',        detail:'孩子不肯學用筷子？比起苦口婆心，不如用遊戲解決。這套七彩夾珠包含筷子、夾子、勺子三種工具，讓練習使用餐具這件事變成孩子搶著要玩的益智遊戲。\n\n依照題目卡進行顏色配對的過程同時訓練專注力與視覺辨識，矽膠碗設計柔軟防滑，整套可以清洗消毒，非常適合托育環境使用。', specs:['木質+矽膠碗','3歲以上','尺寸約30cm','1套含三種工具'] },
  { id:16, scene:'動', subcat:'磁吸火車', name:'磁吸小火車・交通工具款',  desc:'磁力自由組合・認識交通工具・推拉體感',      price:680,  tag:'熱銷',   age:'3歲+',    imgs:['/products/p16_train_transport.jpg'],      why:'磁力自由組合讓每次玩都不一樣，滿足幼兒對移動和連結的天生渴望。', detail:'磁力連結哪邊都能接，讓孩子用雙手推著走，每節車廂都是一個交通工具，自己決定火車要多長。推著火車在地板上行駛，孩子一邊玩一邊認識汽車、巴士、飛機、船。\n\n可以與水果款、動物款混搭，延伸出無限組合，越玩越有創意。', specs:['木質・磁吸連結','36個月以上','尺寸約30cm','1套'] },
  { id:17, scene:'動', subcat:'磁吸火車', name:'磁吸小火車・水果款',      desc:'水果顏色認知・磁力混搭・角色扮演',          price:680,  tag:'',       age:'3歲+',    imgs:['/products/p17_train_fruit.jpg'],          why:'水果認知融入推車遊戲，三款火車互通混搭玩法無窮無盡。',          detail:'草莓節到西瓜站，帶孩子認識水果的最甜玩法。每節車廂都是一種水果，鮮艷配色讓視覺刺激適度充足。\n\n可以與交通工具款、動物款混搭，今天開水果列車，明天換動物快車，無限組合延伸玩法。也很適合廚房角色扮演場景的延伸道具。', specs:['木質・磁吸連結','36個月以上','尺寸約30cm','1套'] },
  { id:18, scene:'動', subcat:'磁吸火車', name:'磁吸小火車・動物款',      desc:'動物認知・故事情境・精細組合動作',          price:680,  tag:'',       age:'3歲+',    imgs:['/products/p18_train_animal.jpg'],         why:'動物認知加上角色扮演，讓孩子的想像力和語言能力一起發展。',      detail:'老虎上車、大象出發，這款動物火車讓孩子發展出各種故事情境——「動物園列車」、「叢林探險快車」，每次玩都有新劇本。\n\n磁力接頭對齊的精細動作訓練手眼協調，動物認知在遊戲過程中自然發生。', specs:['木質・磁吸連結','36個月以上','尺寸約30cm','1套'] },
  { id:19, scene:'動', subcat:'磁吸火車', name:'磁吸小火車・數字款',      desc:'27件組・數字語言認知・磁性接頭耐用',        price:720,  tag:'',       age:'3歲+',    imgs:['/products/p19_train_number.jpg'],         why:'27件豐富組件加上數字認知，推火車的同時也上了數學課。',          detail:'27件完整組件讓孩子可以排出超長列車，成就感爆棚。邊推火車邊學數字，語言認知與體感遊戲同時啟動，比單純的數字卡片有效太多。\n\n磁性接頭設計連結順暢，耐得住幼兒反覆拆裝。', specs:['木質・磁吸連結','36個月以上','尺寸約30cm','27件組'] },
  { id:20, scene:'動', subcat:'扮家家酒', name:'磁性木製切切樂・水果組',  desc:'磁力切割・仿真構造・廚房角色扮演',          price:580,  tag:'最療癒', age:'3歲+',    imgs:['/products/p20_cutting_fruit.jpg'],        why:'療癒的切割手感讓孩子愛不釋手，角色扮演中同時學到知識。',        detail:'孩子看大人切菜羨慕不已？這款木製切切樂讓孩子安全地「切水果」，磁性設計一刀下去的聲音和手感超療癒，重複幾百次都不膩。\n\n切開後可以看到仿真的果肉與種籽，孩子在玩扮家家酒的同時認識了水果內部構造，還自然理解了「整體」與「一半」的概念。', specs:['木質・磁吸切割','3歲以上','尺寸約30cm','1套含木製刀具'] },
  { id:21, scene:'動', subcat:'體能玩具', name:'充氣足球',                desc:'戶外親子對踢・輕盈好控・消耗體力',          price:280,  tag:'',       age:'2歲+',    imgs:['/products/p21_football.jpg'],             why:'最簡單的親子運動，一顆球讓孩子消耗能量爸媽也跟著放電。',        detail:'最簡單的親子戶外時光，一顆球就夠了。這款充氣足球輕盈好踢，2歲孩子也能輕鬆控制，是消耗孩子體力的最高效工具。\n\n公園、院子、客廳都能玩，不需要特定場地。週末帶孩子去公園，一顆球可以讓他們開心兩個小時，爸媽也運動到了。', specs:['充氣材質','2歲以上','標準兒童尺寸'] },
  { id:22, scene:'動', subcat:'體能玩具', name:'兒童滑步車',              desc:'平衡感訓練・無踏板設計・學騎車第一步',      price:1280, tag:'新品',   age:'2歲+',    imgs:['/products/p22_scooter_1.jpg','/products/p22_scooter_2.jpg','/products/p22_scooter_3.jpg','/products/p22_scooter_4.jpg','/products/p22_scooter_5.jpg'],         why:'平衡感訓練的最佳工具，比輔助輪更有效讓孩子真正學會騎車。',      detail:'滑步車是學騎腳踏車最聰明的第一步。無踏板設計讓孩子先用雙腳蹬地掌握平衡，等平衡感建立後，換有踏板的腳踏車幾乎不需要任何練習就能直接上手。\n\n比起有輔助輪的腳踏車，滑步車讓孩子更快真正學會騎車，且過程更有趣、更有成就感。2歲起就可以開始，是送給學步兒最有意義的禮物之一。', specs:['安全材質','2歲以上','適合身高90–110cm'] },
  { id:31, scene:'節日', subcat:'生日慶典', name:'生日慶典套組',          desc:'氣球・派對佈置・拍照背板・全套到位',        price:980,  tag:'熱銷',   age:'全齡',    imgs:['/products/p23_balloon.jpg'],              why:'一盒搞定生日派對所有佈置，讓爸媽省力孩子開心照片好看。',        detail:'孩子的生日只有一次，值得用心佈置。這款生日慶典套組包含彩色氣球、派對紙盤杯組、生日帽、年齡數字貼和拍照背板，讓爸媽不需要到處採購，一盒就能打造讓孩子記憶一輩子的生日派對。\n\n所有配件色彩協調，拍出來的照片美感有保證。適合家庭小派對和幼稚園慶生使用。', specs:['多材質組合','適合全年齡','完整套組'] },
  { id:32, scene:'節日', subcat:'抓周儀式', name:'抓周儀式套組',          desc:'抓周道具・珍珠氣球・紀念牌・拍照圍欄',      price:1480, tag:'精選',   age:'1歲',     imgs:['/products/p23_balloon.jpg'],              why:'寶寶一歲只有一次，讓這個儀式留下最美的紀念照片和溫暖記憶。',    detail:'寶寶一歲抓周是台灣家庭最重要的儀式之一，值得用最美的方式留下記念。這套抓周套組包含傳統道具組、珍珠氣球裝飾、月份紀念牌和拍照圍欄，讓這一刻的照片美到可以放大框起來。\n\n道具組包含書、算盤、印章等傳統物件，也加入了現代化的選項讓儀式更有趣。', specs:['多材質組合','1歲寶寶','完整套組'] },
  { id:33, scene:'節日', subcat:'戶外野餐', name:'戶外野餐套組',          desc:'野餐墊・復古提籃・紙盤杯組・花卉裝飾',      price:880,  tag:'',       age:'全齡',    imgs:['/products/p23_balloon.jpg'],              why:'把野餐佈置的繁瑣省掉，讓家庭戶外時光輕鬆開始美麗留念。',        detail:'週末帶孩子去公園野餐，不需要繁複的準備，這套套組幫你把所有配件搞定。野餐墊、復古提籃、協調色系的紙盤杯組和花卉裝飾，鋪開來就是一個讓孩子開心、讓爸媽拍出美照的野餐場景。\n\n特別設計的親子尺寸讓大人小孩都舒適，所有配件可重複使用，環保又實用。', specs:['多材質組合','適合全年齡','完整套組'] },
  { id:34, scene:'節日', subcat:'畢業季',  name:'畢業季紀念套組',         desc:'畢業氣球・拍照框・拉旗・花束包材',          price:780,  tag:'',       age:'全齡',    imgs:['/products/p23_balloon.jpg'],              why:'給孩子的每個重要里程碑一個值得記念的儀式，讓成長被好好看見。',  detail:'幼稚園畢業、小學畢業，每個人生的小小里程碑都值得好好慶祝。這套畢業紀念套組包含畢業主題氣球、拍照裝飾框、「畢業快樂」拉旗和花束包裝材料。\n\n讓孩子在最重要的節點感受到被重視，這份儀式感會成為他們成長記憶的一部分。', specs:['多材質組合','適合全年齡','完整套組'] },
  { id:35, scene:'節日', subcat:'中秋手作', name:'中秋手作套組',          desc:'燈籠材料・月餅禮盒・中秋裝飾・柚子帽',      price:680,  tag:'季節限定',age:'全齡',   imgs:['/products/p23_balloon.jpg'],              why:'傳承節慶文化的最美方式，親子手作讓中秋節更有溫度。',            detail:'中秋節不只是吃月餅，更是一年一度讓孩子感受傳統節慶氛圍的好時機。這套手作套組包含燈籠手作材料包、精選月餅禮盒、中秋裝飾品和可愛的柚子帽。\n\n親子一起動手做燈籠，是比任何玩具都更有溫度的節慶記憶。', specs:['多材質組合','適合全年齡','完整套組'] },
  { id:36, scene:'節日', subcat:'聖誕親子', name:'聖誕親子套組',          desc:'聖誕裝飾・交換禮物包裝・親子圍裙',          price:980,  tag:'',       age:'全齡',    imgs:['/products/p23_balloon.jpg'],              why:'溫暖整個冬天的親子節慶，從佈置到料理一起完成最美的聖誕記憶。',  detail:'聖誕節是一年最有魔法的時刻。這套親子套組包含聖誕裝飾組、交換禮物包裝材料、親子圍裙和薑餅材料組，讓全家從佈置到烘焙都充滿節慶感。\n\n穿上親子圍裙一起做薑餅，是很多孩子長大後還會記得的聖誕節記憶。', specs:['多材質組合','適合全年齡','完整套組'] },
];
 
export default function Home() {
  const [activeScene,  setActiveScene]  = useState('靜');
  const [activeSubcat, setActiveSubcat] = useState('全部');
  const [modalProduct, setModalProduct] = useState(null);
  const [activeImg,    setActiveImg]    = useState(0);
 
  const switchScene = (key) => { setActiveScene(key); setActiveSubcat('全部'); };
  const openModal   = (p)   => { setModalProduct(p); setActiveImg(0); document.body.style.overflow='hidden'; };
  const closeModal  = ()    => { setModalProduct(null); document.body.style.overflow=''; };
 
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);
 
  const filtered = PRODUCTS.filter(p =>
    p.scene === activeScene &&
    (activeSubcat === '全部' || p.subcat === activeSubcat)
  );
 
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  const goToScene = (key) => { switchScene(key); scrollTo('products'); };
 
  const tabClass = (key) => {
    const map = { '靜':'tab-quiet', '動':'tab-active', '節日':'tab-fest' };
    return activeScene === key ? `tab-btn active ${map[key]}` : 'tab-btn';
  };
 
  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <a href="/" className="logo">
            <div className="logo-row">
              <span className="logo-main">{STORE_INFO.name}</span>
              <span className="logo-zh">{STORE_INFO.nameChinese}</span>
            </div>
            <span className="logo-sub">{STORE_INFO.tagline}</span>
          </a>
          <div className="nav-links">
            <a href="#scenes">選物場景</a>
            <a href="#products">所有商品</a>
            <a href="#about">關於我們</a>
            <a href="#contact" className="nav-cta">聯絡我們</a>
          </div>
        </div>
      </nav>
 
      <main>
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage:`url('https://images.pexels.com/photos/18026388/pexels-photo-18026388.jpeg?auto=compress&cs=tinysrgb&w=1800')` }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Taiwan's Curated Parent &amp; Kids Store</p>
            <h1 className="hero-title">為每個<br />親子時刻<br /><em>精選好物</em></h1>
            <p className="hero-desc">動・靜・節日 — 三大生活場景，為台灣家庭嚴選最安全、最有質感的親子好物。</p>
            <div className="hero-btns">
              <button className="btn-light"   onClick={() => scrollTo('products')}>探索商品</button>
              <button className="btn-outline" onClick={() => scrollTo('scenes')}>了解選物理念</button>
            </div>
          </div>
        </section>
 
        <section id="scenes" className="scenes-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">選物場景</h2>
              <p className="section-sub">我們相信，好的玩具與用品能在對的時刻，為親子關係帶來更多連結與歡笑。</p>
            </div>
            <div className="scenes-grid">
              {SCENES.map(s => (
                <div key={s.key} className="scene-card" onClick={() => goToScene(s.key)}>
                  <div className="scene-img-wrap"><img src={s.img} alt={s.title} className="scene-img" loading="lazy" /></div>
                  <div className="scene-body">
                    <div className="scene-label">
                      <span className="scene-zh" style={{ color:s.color }}>{s.title}</span>
                      <span className="scene-en">{s.sub}</span>
                    </div>
                    <p className="scene-desc">{s.desc}</p>
                    <button className="scene-link" style={{ color:s.color }}>查看商品 →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        <section id="products" className="products-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">精選商品</h2>
              <div className="tab-row">
                {SCENES.map(s => (
                  <button key={s.key} className={tabClass(s.key)} onClick={() => switchScene(s.key)}>
                    {s.title}・{s.sub}
                  </button>
                ))}
              </div>
              <div className="subcat-row">
                {SUBCATS[activeScene].map(sc => (
                  <button key={sc} className={`subcat-btn ${activeSubcat===sc?'subcat-active':''}`} onClick={() => setActiveSubcat(sc)}>{sc}</button>
                ))}
              </div>
            </div>
            {filtered.length > 0 ? (
              <div className="products-grid">
                {filtered.map(p => (
                  <div key={p.id} className="product-card" onClick={() => openModal(p)}>
                    <div className="prod-img-wrap">
                      <img src={p.imgs[0]} alt={p.name} className="prod-img" loading="lazy" />
                      {p.tag && <span className="prod-tag">{p.tag}</span>}
                      <span className="prod-age">{p.age}</span>
                    </div>
                    <div className="prod-info">
                      <h3 className="prod-name">{p.name}</h3>
                      <p className="prod-desc">{p.desc}</p>
                      <div className="prod-footer">
                        <span className="prod-price">NT${p.price.toLocaleString()}</span>
                        <button className="prod-btn" onClick={e=>{e.stopPropagation();openModal(p);}}>查看詳情</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>此分類商品即將上架，敬請期待！</p>
                <button className="btn-light-dark" onClick={() => scrollTo('contact')}>我想了解上架時間</button>
              </div>
            )}
          </div>
        </section>
 
        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="about-img-wrap">
              <img src="https://images.pexels.com/photos/5692247/pexels-photo-5692247.jpeg?auto=compress&cs=tinysrgb&w=800" alt="親子生活" className="about-img" loading="lazy" />
            </div>
            <div>
              <span className="about-eyebrow">關於我們</span>
              <h2 className="about-title">選一個好物，<br />創造一段回憶</h2>
              <p className="about-text">躍木親子是一間專注於親子生活場景的台灣選物店。我們相信，每一件商品背後，都應該有一個讓家庭更美好的故事。</p>
              <p className="about-text">以「動」、「靜」、「節日」三大場景為出發點，嚴格篩選安全、有質感、真正適合台灣家庭的親子好物，讓爸媽挑選更輕鬆，讓孩子玩耍更快樂。</p>
              <div className="about-stats">
                <div><span className="stat-num">22+</span><span className="stat-label">精選商品</span></div>
                <div><span className="stat-num">3</span><span className="stat-label">生活場景</span></div>
                <div><span className="stat-num">台灣</span><span className="stat-label">在地嚴選</span></div>
              </div>
            </div>
          </div>
        </section>
 
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">聯絡我們</h2>
              <p className="section-sub">有任何問題，歡迎透過以下方式與我們聯絡，我們會盡快回覆。</p>
            </div>
            <div className="contact-grid">
              <div className="contact-card"><span className="contact-icon">📞</span><span className="contact-label">客服電話</span><span className="contact-value">{STORE_INFO.phone}</span><span className="contact-note">週一至週五 10:00–18:00</span></div>
              <div className="contact-card"><span className="contact-icon">📧</span><span className="contact-label">電子郵件</span><span className="contact-value">{STORE_INFO.email}</span><span className="contact-note">24小時內回覆</span></div>
              <div className="contact-card"><span className="contact-icon">💬</span><span className="contact-label">LINE 官方帳號</span><span className="contact-value">{STORE_INFO.line}</span><span className="contact-note">即時訊息回覆</span></div>
              <div className="contact-card"><span className="contact-icon">📷</span><span className="contact-label">Instagram</span><span className="contact-value">{STORE_INFO.instagram}</span><span className="contact-note">追蹤我們的生活選物</span></div>
            </div>
          </div>
        </section>
      </main>
 
      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">
            <div className="logo-row">
              <span className="logo-main">{STORE_INFO.name}</span>
              <span className="logo-zh">{STORE_INFO.nameChinese}</span>
            </div>
            <span className="logo-sub">{STORE_INFO.tagline}</span>
          </div>
          <div className="footer-links">
            <a href="#scenes">選物場景</a><a href="#products">所有商品</a>
            <a href="#about">關於我們</a><a href="#contact">聯絡我們</a>
          </div>
          <p className="footer-copy">© 2025 JoyBounce Kids 躍木親子. All rights reserved.｜台灣親子選物</p>
          <p className="footer-copy">📍 {STORE_INFO.address}</p>
        </div>
      </footer>
 
      {modalProduct && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-inner">
              <div className="modal-gallery">
                <div className="modal-main-img">
                  <img src={modalProduct.imgs[activeImg]} alt={modalProduct.name} />
                </div>
                {modalProduct.imgs.length > 1 && (
                  <div className="modal-thumbs">
                    {modalProduct.imgs.map((src,i) => (
                      <div key={i} className={`modal-thumb ${activeImg===i?'active':''}`} onClick={()=>setActiveImg(i)}>
                        <img src={src} alt="" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-info">
                <div className="modal-scene-badge">{modalProduct.scene}・{modalProduct.subcat}</div>
                <h2 className="modal-title">{modalProduct.name}</h2>
                <div className="modal-price">NT${modalProduct.price.toLocaleString()}</div>
                <div className="modal-why"><span className="modal-why-icon">✦</span>{modalProduct.why}</div>
                <div className="modal-detail">
                  {modalProduct.detail.split('\n\n').map((para,i) => <p key={i}>{para}</p>)}
                </div>
                <div className="modal-specs">
                  {modalProduct.specs.map((s,i) => <span key={i} className="modal-spec-chip">{s}</span>)}
                </div>
                <button className="modal-cart-btn">加入購物車</button>
                <button className="modal-inquiry-btn" onClick={()=>{closeModal();scrollTo('contact');}}>我有問題想詢問</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

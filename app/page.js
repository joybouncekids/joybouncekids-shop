'use client';
 
import { useState } from 'react';
 
/* ─── 聯絡資訊 ─────────────────────────────────────────── */
const STORE_INFO = {
  name:        'JoyBounce Kids',
  nameChinese: '躍木親子',
  tagline:     '親子選物｜為每個家庭時刻精選',
  phone:       '0910-504-781',
  email:       'hctonylee@gmail.com',
  line:        '@joybouncekids',
  instagram:   '@joybouncekids',
  address:     '臺中市西區精誠16街39號3樓之一',
};
 
/* ─── 場景設定 ─────────────────────────────────────────── */
const SCENES = [
  {
    key: '靜', title: '靜', sub: 'Quiet Time',
    desc: '培養專注與創造力的靜心時光，讓孩子在安靜中發現無限可能',
    color: 'var(--quiet)',
    img: 'https://images.pexels.com/photos/4908525/pexels-photo-4908525.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    key: '動', title: '動', sub: 'Active Play',
    desc: '讓孩子盡情跑跳、探索世界，為每一個活力瞬間精選安全好物',
    color: 'var(--active)',
    img: 'https://images.pexels.com/photos/4543646/pexels-photo-4543646.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    key: '節日', title: '節日', sub: 'Celebrations',
    desc: '讓每個節慶都成為家人共同珍藏的美好記憶，從禮物到佈置一次到位',
    color: 'var(--fest)',
    img: 'https://images.pexels.com/photos/6299265/pexels-photo-6299265.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
];
 
/* ─── 商品資料（使用真實商品圖片）────────────────────────── */
const PRODUCTS = [
  /* ── 靜 ── */
  { id:1,  scene:'靜', name:'動物款 木製3D拼圖',      desc:'野生動物造型・形狀配對・手眼協調', price:380,  tag:'熱銷',   age:'18個月+', img:'/products/p01_animal_puzzle.jpg' },
  { id:2,  scene:'靜', name:'海洋款 木製3D拼圖',      desc:'海洋生物認知・藍綠色系・精細動作', price:380,  tag:'',       age:'18個月+', img:'/products/p02_ocean_puzzle.jpg' },
  { id:3,  scene:'靜', name:'農場款 木製3D拼圖',      desc:'農場動物認知・暖色木質・場景連結', price:380,  tag:'',       age:'18個月+', img:'/products/p03_farm_puzzle.jpg' },
  { id:4,  scene:'靜', name:'基礎圖形配對板',          desc:'幾何形狀 × 色彩辨識・入門益智首選', price:420,  tag:'',       age:'18個月+', img:'/products/p04_basic_shape_board.jpg' },
  { id:5,  scene:'靜', name:'進階圖形配對板',          desc:'更多邊形・空間邏輯・銜接幼稚園數學', price:480,  tag:'',       age:'2歲+',   img:'/products/p05_advanced_shape_board.jpg' },
  { id:6,  scene:'靜', name:'基礎空間認知配對板',      desc:'波浪卡榫・色彩漸層・幾何分解組合', price:450,  tag:'',       age:'18個月+', img:'/products/p06_basic_space_board.jpg' },
  { id:7,  scene:'靜', name:'進階空間認知配對板',      desc:'平面 × 3D雙重挑戰・數學邏輯啟蒙', price:520,  tag:'',       age:'2歲+',   img:'/products/p07_advanced_space_board.jpg' },
  { id:8,  scene:'靜', name:'七巧板',                  desc:'千種變化・空間邏輯・幾何認知・全家玩', price:320,  tag:'經典推薦', age:'3歲+',  img:'/products/p08_tangram.jpg' },
  { id:9,  scene:'靜', name:'九格幾何形狀套柱積木',    desc:'顏色・形狀・高低序列三合一訓練',   price:480,  tag:'',       age:'18個月+', img:'/products/p09_nine_peg_blocks.jpg' },
  { id:10, scene:'靜', name:'蒙特梭利數學教具',        desc:'數值視覺化・加減法啟蒙・英數雙向', price:580,  tag:'教師推薦', age:'2歲+',  img:'/products/p10_montessori_math.jpg' },
  { id:11, scene:'靜', name:'數字手勢配對板',          desc:'數字 × 英文 × 手勢三合一認知',     price:480,  tag:'',       age:'18個月+', img:'/products/p11_number_gesture_board.jpg' },
  { id:12, scene:'靜', name:'數字動物立體拼圖',        desc:'0–9 動物聯想記憶・英文對照・嵌入訓練', price:520, tag:'',      age:'18個月+', img:'/products/p12_number_animal_puzzle.jpg' },
  { id:13, scene:'靜', name:'26字母動物拼圖板',        desc:'A–Z 雙重認知・視覺提示底圖・精細動作', price:580, tag:'',     age:'18個月+', img:'/products/p13_alphabet_puzzle.jpg' },
  { id:14, scene:'靜', name:'四色邏輯遊戲',            desc:'策略思考・顏色認知・精細動作三合一', price:520,  tag:'',       age:'3歲+',   img:'/products/p14_four_color_logic.jpg' },
  { id:15, scene:'靜', name:'七彩夾珠益智玩具',        desc:'筷子・夾子・湯匙・顏色配對・專注力', price:480,  tag:'',       age:'3歲+',   img:'/products/p15_colorful_bead_clamp.jpg' },
  /* ── 動 ── */
  { id:16, scene:'動', name:'木製磁吸小火車・交通工具', desc:'磁力自由組合・認識交通工具・推拉體感', price:680, tag:'熱銷',  age:'3歲+',   img:'/products/p16_train_transport.jpg' },
  { id:17, scene:'動', name:'木製磁吸小火車・水果款',  desc:'水果顏色認知・磁力混搭・角色扮演',   price:680,  tag:'',       age:'3歲+',   img:'/products/p17_train_fruit.jpg' },
  { id:18, scene:'動', name:'木製磁吸小火車・動物款',  desc:'動物認知・故事情境・精細組合動作',   price:680,  tag:'',       age:'3歲+',   img:'/products/p18_train_animal.jpg' },
  { id:19, scene:'動', name:'木製磁吸小火車・數字款',  desc:'27件組・數字語言認知・磁性接頭耐用', price:720,  tag:'',       age:'3歲+',   img:'/products/p19_train_number.jpg' },
  { id:20, scene:'動', name:'磁性木製切切樂・水果組',  desc:'磁力切割・仿真構造・廚房角色扮演',   price:580,  tag:'最療癒',  age:'3歲+',  img:'/products/p20_cutting_fruit.jpg' },
];
 
/* ─── 主元件 ─────────────────────────────────────────────── */
export default function Home() {
  const [activeScene, setActiveScene] = useState('靜');
  const filtered = PRODUCTS.filter(p => p.scene === activeScene);
 
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const goToScene = (key) => { setActiveScene(key); scrollTo('products'); };
  const tabClass = (key) => {
    const map = { '靜': 'tab-quiet', '動': 'tab-active', '節日': 'tab-fest' };
    return activeScene === key ? `tab-btn active ${map[key]}` : 'tab-btn';
  };
 
  return (
    <>
      {/* ── Navbar ── */}
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
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url('https://images.pexels.com/photos/18026388/pexels-photo-18026388.jpeg?auto=compress&cs=tinysrgb&w=1800')` }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Taiwan's Curated Parent &amp; Kids Store</p>
            <h1 className="hero-title">為每個<br />親子時刻<br /><em>精選好物</em></h1>
            <p className="hero-desc">動・靜・節日 — 三大生活場景，為台灣家庭嚴選最安全、最有質感的親子好物。</p>
            <div className="hero-btns">
              <button className="btn-light" onClick={() => scrollTo('products')}>探索商品</button>
              <button className="btn-outline" onClick={() => scrollTo('scenes')}>了解選物理念</button>
            </div>
          </div>
        </section>
 
        {/* ── Scenes ── */}
        <section id="scenes" className="scenes-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">選物場景</h2>
              <p className="section-sub">我們相信，好的玩具與用品能在對的時刻，為親子關係帶來更多連結與歡笑。</p>
            </div>
            <div className="scenes-grid">
              {SCENES.map(s => (
                <div key={s.key} className="scene-card" onClick={() => goToScene(s.key)}>
                  <div className="scene-img-wrap">
                    <img src={s.img} alt={s.title} className="scene-img" loading="lazy" />
                  </div>
                  <div className="scene-body">
                    <div className="scene-label">
                      <span className="scene-zh" style={{ color: s.color }}>{s.title}</span>
                      <span className="scene-en">{s.sub}</span>
                    </div>
                    <p className="scene-desc">{s.desc}</p>
                    <button className="scene-link" style={{ color: s.color }}>查看商品 →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── Products ── */}
        <section id="products" className="products-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">精選商品</h2>
              <div className="tab-row">
                {SCENES.map(s => (
                  <button key={s.key} className={tabClass(s.key)} onClick={() => setActiveScene(s.key)}>
                    {s.title}・{s.sub}
                  </button>
                ))}
              </div>
            </div>
            <div className="products-grid">
              {filtered.map(p => (
                <div key={p.id} className="product-card">
                  <div className="prod-img-wrap">
                    <img src={p.img} alt={p.name} className="prod-img" loading="lazy" />
                    {p.tag && <span className="prod-tag">{p.tag}</span>}
                    <span className="prod-age">{p.age}</span>
                  </div>
                  <div className="prod-info">
                    <h3 className="prod-name">{p.name}</h3>
                    <p className="prod-desc">{p.desc}</p>
                    <div className="prod-footer">
                      <span className="prod-price">NT${p.price.toLocaleString()}</span>
                      <button className="prod-btn">加入購物車</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── About ── */}
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
                <div><span className="stat-num">20+</span><span className="stat-label">精選商品</span></div>
                <div><span className="stat-num">3</span><span className="stat-label">生活場景</span></div>
                <div><span className="stat-num">台灣</span><span className="stat-label">在地嚴選</span></div>
              </div>
            </div>
          </div>
        </section>
 
        {/* ── Contact ── */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">聯絡我們</h2>
              <p className="section-sub">有任何問題，歡迎透過以下方式與我們聯絡，我們會盡快回覆。</p>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <span className="contact-icon">📞</span>
                <span className="contact-label">客服電話</span>
                <span className="contact-value">{STORE_INFO.phone}</span>
                <span className="contact-note">週一至週五 10:00–18:00</span>
              </div>
              <div className="contact-card">
                <span className="contact-icon">📧</span>
                <span className="contact-label">電子郵件</span>
                <span className="contact-value">{STORE_INFO.email}</span>
                <span className="contact-note">24 小時內回覆</span>
              </div>
              <div className="contact-card">
                <span className="contact-icon">💬</span>
                <span className="contact-label">LINE 官方帳號</span>
                <span className="contact-value">{STORE_INFO.line}</span>
                <span className="contact-note">即時訊息回覆</span>
              </div>
              <div className="contact-card">
                <span className="contact-icon">📷</span>
                <span className="contact-label">Instagram</span>
                <span className="contact-value">{STORE_INFO.instagram}</span>
                <span className="contact-note">追蹤我們的生活選物</span>
              </div>
            </div>
          </div>
        </section>
      </main>
 
      {/* ── Footer ── */}
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
            <a href="#scenes">選物場景</a>
            <a href="#products">所有商品</a>
            <a href="#about">關於我們</a>
            <a href="#contact">聯絡我們</a>
          </div>
          <p className="footer-copy">© 2025 JoyBounce Kids 躍木親子. All rights reserved.｜台灣親子選物</p>
          <p className="footer-copy">📍 {STORE_INFO.address}</p>
        </div>
      </footer>
    </>
  );
}

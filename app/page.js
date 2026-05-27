'use client';
 
/**
 * JoyBounce Kids — 主頁面
 *
 * ★ 你可以修改的地方：
 *   1. STORE_INFO  → 改成你的電話、Email、LINE 等聯絡資訊
 *   2. products    → 改成你真實的商品名稱、描述、售價
 *   3. 商品圖片     → 將 img 欄位換成你的商品照片網址
 */
 
import { useState } from 'react';
 
/* ─── 聯絡資訊（請填入真實資料）─────────────────────────── */
const STORE_INFO = {
  name:        'JoyBounce Kids',
  nameChinese: '快樂彈跳親子選物',
  phone:       '02-XXXX-XXXX',          // ← 請改成你的電話
  email:       'hello@joybouncekids.com', // ← 請改成你的 Email
  line:        '@joybouncekids',          // ← LINE 官方帳號 ID
  instagram:   '@joybouncekids',          // ← Instagram 帳號
};
 
/* ─── 場景設定 ────────────────────────────────────────────── */
const SCENES = [
  {
    key:    '動',
    title:  '動',
    sub:    'Active Play',
    desc:   '讓孩子盡情跑跳、探索世界，為每一個活力瞬間精選安全好物',
    color:  'var(--active)',
    img:    'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=700&q=80&auto=format&fit=crop',
  },
  {
    key:    '靜',
    title:  '靜',
    sub:    'Quiet Time',
    desc:   '培養專注與創造力的靜心時光，讓孩子在安靜中發現無限可能',
    color:  'var(--quiet)',
    img:    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80&auto=format&fit=crop',
  },
  {
    key:    '節日',
    title:  '節日',
    sub:    'Celebrations',
    desc:   '讓每個節慶都成為家人共同珍藏的美好記憶，從禮物到佈置一次到位',
    color:  'var(--fest)',
    img:    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&q=80&auto=format&fit=crop',
  },
];
 
/* ─── 商品資料（請替換成你的真實商品）─────────────────────── */
const PRODUCTS = [
  /* 動 */
  {
    id: 1, scene: '動',
    name: '戶外探索套裝',
    desc: '培養觀察力的自然探索工具組，適合 3 歲以上',
    price: 1280, tag: '熱銷',
    img: 'https://images.unsplash.com/photo-1526746323784-6bc814d79273?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 2, scene: '動',
    name: '彩虹平衡木組',
    desc: '鍛鍊平衡感與協調力的木質玩具，安全無毒',
    price: 2580, tag: '新品',
    img: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 3, scene: '動',
    name: '親子運動套組',
    desc: '一起動起來，增進親子互動的戶外運動組合',
    price: 980, tag: '',
    img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&q=80&auto=format&fit=crop',
  },
  /* 靜 */
  {
    id: 4, scene: '靜',
    name: '木質磁力積木',
    desc: '啟發無限創造力，榉木製、安全環保認證',
    price: 1580, tag: '熱銷',
    img: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 5, scene: '靜',
    name: '兒童水彩畫具組',
    desc: '可水洗顏料，適合 2 歲以上，台灣製造',
    price: 680, tag: '',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 6, scene: '靜',
    name: '親子桌遊禮盒',
    desc: '適合全家一起玩的策略合作桌遊，2–6 人',
    price: 1280, tag: '新品',
    img: 'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500&q=80&auto=format&fit=crop',
  },
  /* 節日 */
  {
    id: 7, scene: '節日',
    name: '生日派對禮盒',
    desc: '讓寶貝生日成為最難忘的節慶，全套派對佈置',
    price: 1980, tag: '熱銷',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 8, scene: '節日',
    name: '親子手作燈籠組',
    desc: '傳承節慶文化，親子同樂的手作體驗組合',
    price: 480, tag: '季節限定',
    img: 'https://images.unsplash.com/photo-1508963493744-76fce69379b0?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 9, scene: '節日',
    name: '聖誕親子禮盒',
    desc: '溫暖整個冬天的親子節慶套組，送禮自用兩相宜',
    price: 1580, tag: '預購中',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&q=80&auto=format&fit=crop',
  },
];
 
/* ─── 主元件 ──────────────────────────────────────────────── */
export default function Home() {
  const [activeScene, setActiveScene] = useState('動');
 
  const filtered = PRODUCTS.filter(p => p.scene === activeScene);
 
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
 
  const goToScene = (key) => {
    setActiveScene(key);
    scrollTo('products');
  };
 
  const tabClass = (key) => {
    const base = 'tab-btn';
    const map  = { '動': 'tab-active', '靜': 'tab-quiet', '節日': 'tab-fest' };
    return activeScene === key ? `${base} active ${map[key]}` : base;
  };
 
  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="/" className="logo">
            <span className="logo-main">{STORE_INFO.name}</span>
            <span className="logo-sub">{STORE_INFO.nameChinese}</span>
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
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1536337005238-94b997371b40?w=1800&q=85&auto=format&fit=crop')` }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Taiwan's Curated Parent &amp; Kids Store</p>
            <h1 className="hero-title">
              為每個<br />親子時刻<br /><em>精選好物</em>
            </h1>
            <p className="hero-desc">
              動・靜・節日 — 三大生活場景，為台灣家庭嚴選最安全、最有質感的親子好物。
            </p>
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
              <p className="section-sub">
                我們相信，好的玩具與用品能在對的時刻，為親子關係帶來更多連結與歡笑。
              </p>
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
                    <button className="scene-link" style={{ color: s.color }}>
                      查看商品 →
                    </button>
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
                  <button
                    key={s.key}
                    className={tabClass(s.key)}
                    onClick={() => setActiveScene(s.key)}
                  >
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
              <img
                src="https://images.unsplash.com/photo-1536773648834-5b87c8cac05f?w=800&q=80&auto=format&fit=crop"
                alt="親子生活"
                className="about-img"
                loading="lazy"
              />
            </div>
            <div>
              <span className="about-eyebrow">關於我們</span>
              <h2 className="about-title">選一個好物，<br />創造一段回憶</h2>
              <p className="about-text">
                JoyBounce Kids 是一間專注於親子生活場景的台灣選物店。我們相信，每一件商品背後，都應該有一個讓家庭更美好的故事。
              </p>
              <p className="about-text">
                以「動」、「靜」、「節日」三大場景為出發點，嚴格篩選安全、有質感、真正適合台灣家庭的親子好物，讓爸媽挑選更輕鬆，讓孩子玩耍更快樂。
              </p>
              <div className="about-stats">
                <div>
                  <span className="stat-num">100+</span>
                  <span className="stat-label">精選商品</span>
                </div>
                <div>
                  <span className="stat-num">3</span>
                  <span className="stat-label">生活場景</span>
                </div>
                <div>
                  <span className="stat-num">台灣</span>
                  <span className="stat-label">在地嚴選</span>
                </div>
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
            <span className="logo-main">{STORE_INFO.name}</span>
            <span className="logo-sub">{STORE_INFO.nameChinese}</span>
          </div>
          <div className="footer-links">
            <a href="#scenes">選物場景</a>
            <a href="#products">所有商品</a>
            <a href="#about">關於我們</a>
            <a href="#contact">聯絡我們</a>
          </div>
          <p className="footer-copy">
            © 2025 JoyBounce Kids. All rights reserved.｜台灣親子選物
          </p>
        </div>
      </footer>
    </>
  );
}

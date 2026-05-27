import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
 
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});
 
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});
 
export const metadata = {
  title: 'JoyBounce Kids | 快樂彈跳親子選物',
  description:
    '為親子生活每一個場景精選好物。動、靜、節日三大場景分類，台灣最溫暖的親子選物店。兒童玩具、服飾、節慶禮盒，嚴選安全有質感的親子好物。',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={`${fraunces.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}

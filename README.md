# Heartstrings — Romantic Digital Confession App

<details open>
<summary><h2>🇹🇭 ภาษาไทย</h2></summary>

เว็บแอปแบบ mobile-first สำหรับส่งจดหมายรัก ความทรงจำ และคำขอแต่งงานให้คนพิเศษ
ออกแบบตามสไตล์ "Soft Ethereal Glassmorphism" (ดูรายละเอียดใน `stitch_romantic_digital_confession_app.zip` → `heartstrings/DESIGN.md`)

### ฟีเจอร์

| หน้า (route) | รายละเอียด |
| --- | --- |
| `/envelope` | หน้าซองจดหมายที่ล็อกด้วยรหัส 4 หลัก ใส่รหัสถูกแล้วกด "Break Wax Seal & Open" เพื่อไปหน้าความทรงจำ |
| `/moments` | Timeline ความทรงจำ การ์ด polaroid พลิกเพื่อเปิดโน้ตลับ และปุ่มส่ง reaction |
| `/reasons` | เหตุผลที่ชอบอีกฝ่าย พร้อม voice memo player, การ์ดเลื่อนได้ และปุ่ม reaction |
| `/coupons` | Quiz สั้น ๆ และคูปองความรักที่กดใช้ (redeem) ได้ |
| `/the-question` | คำขอแต่งงาน ปุ่ม "No" หนีได้ และหน้าฉลองพร้อม confetti และ certificate |

### เทคโนโลยี

- [React](https://react.dev) 19
- [Vite](https://vite.dev) 8
- [Tailwind CSS](https://tailwindcss.com) v4 (ผ่าน `@tailwindcss/vite`)
- [React Router](https://reactrouter.com) v7 สำหรับ routing
- ฟอนต์: Plus Jakarta Sans, Nunito Sans และ Material Symbols (โหลดจาก Google Fonts)
- Lint ด้วย [oxlint](https://oxc.rs)

### เริ่มต้นใช้งาน

ต้องมี Node.js 20 ขึ้นไป

```bash
npm install
npm run dev
```

เปิด `http://localhost:5173` ในเบราว์เซอร์

### คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
| --- | --- |
| `npm run dev` | รัน dev server พร้อม hot reload |
| `npm run build` | build สำหรับ production ลงโฟลเดอร์ `dist/` |
| `npm run preview` | ดูผล build ใน local |
| `npm run lint` | ตรวจโค้ดด้วย oxlint |

### โครงสร้างโปรเจค

```
.
├── index.html              # โหลดฟอนต์และ title
├── public/
│   └── images/             # รูปที่ใช้ในแอป (โลโก้ avatar รูปความทรงจำ ฯลฯ)
├── src/
│   ├── main.jsx            # จุดเริ่มต้น + BrowserRouter
│   ├── App.jsx             # กำหนด route ทั้งหมด
│   ├── nav.js              # รายการ tab ใน bottom nav
│   ├── index.css           # Tailwind + design tokens (@theme) + keyframes
│   ├── components/
│   │   ├── AppShell.jsx    # header, layout และ bottom nav ร่วมทุกหน้า
│   │   └── Icon.jsx        # ไอคอน Material Symbols
│   └── pages/              # หนึ่งไฟล์ต่อหนึ่งหน้า
└── stitch_romantic_digital_confession_app.zip   # ต้นฉบับ design (HTML, screenshot, DESIGN.md)
```

#### Design tokens

สี ฟอนต์ ขนาดตัวอักษร radius และ spacing ทั้งหมดนิยามไว้ใน block `@theme` ของ `src/index.css`
ใช้เป็น utility class ของ Tailwind ได้ทันที เช่น `bg-primary`, `text-headline-sm`, `rounded-DEFAULT`, `px-margin`

### หมายเหตุ

- รหัสล็อกหน้าซองจดหมายและคำใบ้ถูกเก็บไว้ในฝั่ง client จึงเปิดดูได้จาก source ถ้าต้องการความปลอดภัยจริงต้องตรวจสอบรหัสที่ฝั่ง server
- ปุ่ม "Download Keepsake Pass", "Share to Instagram Story" และปุ่มเพลงบน header ยังเป็นเพียง placeholder ตาม design
- ต้องมีอินเทอร์เน็ตตอนโหลดหน้าเพื่อดึงฟอนต์และไอคอนจาก Google Fonts

</details>

---

<details open>
<summary><h2>🇬🇧 English</h2></summary>

A mobile-first web app for sending love letters, shared memories, and marriage proposals to someone special.
Designed in a "Soft Ethereal Glassmorphism" style (see `stitch_romantic_digital_confession_app.zip` → `heartstrings/DESIGN.md` for details).

### Features

| Page (route) | Description |
| --- | --- |
| `/envelope` | A letter envelope locked with a 4-digit passcode. Enter the right code and press "Break Wax Seal & Open" to go to the memories page. |
| `/moments` | Memory timeline with polaroid cards that flip to reveal a secret note, plus a reaction button. |
| `/reasons` | Reasons why I like you, with a voice memo player, swipeable cards, and reaction pills. |
| `/coupons` | A short quiz and redeemable love coupons. |
| `/the-question` | The proposal. The "No" button runs away, and the "Yes" page shows confetti and a certificate. |

### Tech stack

- [React](https://react.dev) 19
- [Vite](https://vite.dev) 8
- [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`)
- [React Router](https://reactrouter.com) v7 for routing
- Fonts: Plus Jakarta Sans, Nunito Sans, and Material Symbols (loaded from Google Fonts)
- Linting with [oxlint](https://oxc.rs)

### Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Common scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the code with oxlint |

### Project structure

```
.
├── index.html              # Font loading and page title
├── public/
│   └── images/             # App images (logo, avatar, memory photos, etc.)
├── src/
│   ├── main.jsx            # Entry point + BrowserRouter
│   ├── App.jsx             # Route definitions
│   ├── nav.js              # Tabs for the bottom nav
│   ├── index.css           # Tailwind + design tokens (@theme) + keyframes
│   ├── components/
│   │   ├── AppShell.jsx    # Header, layout, and bottom nav shared by all pages
│   │   └── Icon.jsx        # Material Symbols icon
│   └── pages/              # One file per page
└── stitch_romantic_digital_confession_app.zip   # Original design (HTML, screenshots, DESIGN.md)
```

#### Design tokens

All colors, fonts, font sizes, radii, and spacing are defined in the `@theme` block in `src/index.css`.
Use them directly as Tailwind utility classes, for example `bg-primary`, `text-headline-sm`, `rounded-DEFAULT`, and `px-margin`.

### Notes

- The envelope passcode and hint are stored on the client side, so anyone can read them in the source. For real security, the check has to happen on a server.
- The "Download Keepsake Pass", "Share to Instagram Story", and header music buttons are placeholders that match the design.
- An internet connection is needed to load fonts and icons from Google Fonts.

</details>

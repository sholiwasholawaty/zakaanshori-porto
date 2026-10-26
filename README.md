# zakaanshori.com

Next.js 14 (App Router) + Tailwind 3 + TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Edit konten
- Teks & link produk: `lib/content.ts`
- Foto about: ganti `public/zaka.png` (rasio ~ 325x286, atau sesuaikan `width`/`height` di `components/About.tsx`)

## Deploy
```bash
git init && git add . && git commit -m "init portfolio"
gh repo create zakaanshori --public --source=. --push
```
Lalu buka https://vercel.com/new, import repo, klik Deploy.
Domain: Project Settings > Domains > tambahkan `zakaanshori.com`.

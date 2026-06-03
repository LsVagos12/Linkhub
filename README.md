# YOHANES A P — Galaxy Planet Link Hub

Website link hub modern untuk sosial media dengan dynamic music theme dan background galaxy/planet interaktif. Project ini dibuat statis agar ringan, cepat, dan langsung bisa dipakai di GitHub Pages tanpa build step.

## Fitur Utama

- Mobile-first social media link hub
- Background galaxy/planet berbasis Canvas, bukan framework berat
- Dynamic music theme: setiap lagu mengubah warna, glow, gradient, planet, ring, particle, dan player accent
- Glassmorphism UI dengan card modern
- Dark/light mode toggle
- Music player dengan playlist, volume control, equalizer, dan mood label
- Copy page link button
- WhatsApp CTA dan QR code
- SEO meta dan Open Graph dasar
- Siap deploy ke GitHub Pages

## Struktur Folder

```text
.
├── index.html
├── style.css
├── java.js
├── assets/
│   ├── img/
│   │   ├── logo.jpg
│   │   ├── my_app_background.jpg
│   │   └── YT.png
│   └── audio/
│       └── music files
├── .gitignore
└── .nojekyll
```

## Cara Jalankan Lokal

Buka langsung file `index.html` di browser.

Untuk testing yang lebih aman, jalankan local server:

```bash
python -m http.server 5500
```

Lalu buka:

```text
http://localhost:5500
```

## Cara Push ke GitHub

```bash
git init
git add .
git commit -m "Create galaxy planet link hub"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME` dan `NAMA-REPO` sesuai akun GitHub kamu.

## Aktifkan GitHub Pages

Masuk ke repository GitHub, lalu buka:

```text
Settings → Pages → Deploy from branch → main → /root → Save
```

Setelah aktif, website biasanya bisa diakses dari:

```text
https://USERNAME.github.io/NAMA-REPO/
```

## Edit Link Sosial Media

Buka `index.html`, lalu cari bagian link seperti:

```html
<a class="social-card instagram" href="https://instagram.com/los.vagos_12">
```

Ganti URL sesuai akun sosial media yang ingin dipakai.

## Edit Tema Lagu

Buka `java.js`, lalu cari bagian `tracks`. Setiap lagu punya pengaturan warna seperti ini:

```js
colors: {
  primary: "#8b5cf6",
  secondary: "#22d3ee",
  accent: "#f97316",
  orbA: "rgba(139, 92, 246, .30)",
  orbB: "rgba(34, 211, 238, .23)"
}
```

Ubah warna tersebut jika ingin mood visual setiap lagu berbeda.

## Catatan Deploy

- Jangan hapus file `.nojekyll`, karena file ini membantu GitHub Pages membaca asset secara normal.
- Pastikan folder `assets/audio` dan `assets/img` ikut ter-upload.
- Karena file audio cukup besar, loading pertama bisa sedikit lebih lama tergantung koneksi pengguna.
- Untuk performa lebih cepat, gambar bisa dikompres ke format `.webp` dan audio bisa dikompres ulang.

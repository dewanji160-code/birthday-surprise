# Birthday Surprise ❤️

Website ucapan ulang tahun personal — dibuka lewat QR code, dikunci
dengan PIN rahasia, lalu membuka rangkaian kejutan: foto, surat,
kenangan, dan pesan terakhir.

Dibuat pakai **HTML + CSS + JavaScript murni** (tanpa build tool),
supaya gampang diedit dan gampang di-hosting.

---

## 1. Struktur folder

```
birthday-surprise/
├── index.html          ← halaman utama (PIN + semua section)
├── qrcode.html          ← tool untuk membuat QR Code
├── css/
│   └── style.css
├── js/
│   ├── config.js        ← SEMUA yang perlu kamu edit ada di sini
│   └── app.js            ← logika website (tidak perlu diedit)
├── images/                ← taruh foto-foto di sini
└── audio/                  ← taruh lagu di sini
```

## 2. Cara menjalankan di komputer

Karena tidak ada proses build, kamu tinggal buka `index.html` langsung
di browser, atau — lebih aman untuk urusan audio/gambar — jalankan
local server sederhana:

```bash
cd birthday-surprise
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080` di browser.

## 3. Cara mengganti nama

Buka `js/config.js`, ubah:

```js
name: "Sayang",     // nama pacarmu
myName: "Aku",       // namamu
```

## 4. Cara mengganti PIN

Masih di `js/config.js`:

```js
pin: "140826",
```

Ganti dengan PIN pilihanmu (boleh berapa digit saja, keypad menyesuaikan
otomatis).

## 5. Cara mengganti foto

Taruh foto-foto pacarmu di folder `images/` dengan nama:

- `profile.jpg` — foto utama di hero section
- `photo1.jpg` sampai `photo6.jpg` — galeri "Our Little Memories"
- `photo_surprise.jpg` — foto opsional di kejutan interaktif
- `photo_final.jpg` — foto di bagian paling akhir

Semua nama file **sudah otomatis terhubung** ke `config.js`.
Kalau mau pakai nama file lain, cukup ubah path-nya di `config.js`
bagian `photos`, `profilePhoto`, `surprisePhoto`, `finalPhoto`.

File placeholder yang sudah ada bertuliskan "GANTI FOTO INI" —
itu tandanya kamu perlu menggantinya dengan foto asli.

Untuk menambah/mengurangi jumlah foto galeri, tambah/kurangi array
`photos` di `config.js` — layout menyesuaikan otomatis.

## 6. Cara mengganti musik

Taruh file mp3 di `audio/birthday-song.mp3`
(atau ubah nama filenya di `config.js` → `music`).

Catatan: browser modern memblokir autoplay audio dengan suara.
Musik akan otomatis mulai begitu PIN benar dan halaman utama terbuka
(karena itu dihitung sebagai interaksi user). Kalau browser tetap
memblokirnya, pacarmu tinggal tap tombol 🎵 di pojok kanan bawah.

## 7. Cara mengganti teks ucapan

Semua teks — pesan hero, surat, timeline kenangan, pesan kejutan,
pesan final — ada di satu tempat: `js/config.js`. Tinggal edit
string-nya, tidak perlu sentuh HTML/CSS/JS lain.

## 8. Cara deploy / hosting website

Paling gampang pakai hosting statis gratis. Dua opsi termudah:

### Opsi A — Netlify (drag & drop)
1. Buka https://app.netlify.com/drop
2. Drag seluruh folder `birthday-surprise` ke halaman itu
3. Netlify akan kasih link seperti `https://nama-acak.netlify.app`
4. (Opsional) Ganti jadi subdomain custom lewat menu "Site settings"

### Opsi B — Vercel
1. Buat akun di https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Jalankan `vercel` di dalam folder project, ikuti instruksinya

### Opsi C — GitHub Pages
1. Push folder ini ke repo GitHub
2. Masuk ke *Settings → Pages*, pilih branch `main` dan folder root
3. Website akan online di `https://username.github.io/nama-repo`

Setelah online, catat URL-nya — dipakai di langkah berikutnya.

## 9. Cara membuat QR Code

1. Buka `qrcode.html` di browser (butuh koneksi internet, karena
   memuat library styling QR dari CDN)
2. Masukkan link website yang sudah online tadi
3. Klik "Buat QR Code"
4. Klik "Unduh QR Code (PNG)"

QR Code didesain dengan modul membulat, warna pink/burgundy, dan
bingkai berbentuk hati — tapi tetap pakai *error correction level*
tinggi supaya gampang dipindai kamera HP.

**Penting:** sebelum dicetak, selalu tes scan QR-nya dulu pakai
kamera HP (idealnya di beberapa HP berbeda) untuk memastikan
benar-benar terbaca.

Kamu juga bisa mengganti default link di `config.js` bagian
`websiteUrl` supaya `qrcode.html` otomatis terisi link yang benar.

## 10. Checklist sebelum dikasih ke pacarmu

- [ ] Ganti semua foto placeholder di `images/`
- [ ] Ganti PIN di `config.js`
- [ ] Ganti semua teks (surat, timeline, pesan kejutan, pesan final)
- [ ] Tambahkan file musik di `audio/`
- [ ] Deploy website, catat URL final
- [ ] Update `websiteUrl` di `config.js`
- [ ] Buat & tes scan QR Code dari `qrcode.html`
- [ ] Cek tampilan di HP asli (bukan cuma di komputer)
- [ ] Cetak / kirim QR Code-nya ❤️

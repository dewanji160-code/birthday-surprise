/* ============================================================
   BIRTHDAY SURPRISE — CONFIG
   Ganti semua isi di bawah ini sesuai kebutuhanmu.
   Ini SATU-SATUNYA file yang perlu kamu edit untuk mengubah
   nama, PIN, teks, foto, dan musik.
   ============================================================ */

const birthdayConfig = {
  // ------------------------------------------------------------
  // 1. NAMA
  // ------------------------------------------------------------
  name: "Sayang",        // nama pacarmu
  myName: "Aku",          // namamu

  // ------------------------------------------------------------
  // 2. PIN RAHASIA
  // Ubah hanya di sini — dipakai otomatis di seluruh website.
  // Gunakan angka, panjang bebas (disarankan 4-6 digit).
  // ------------------------------------------------------------
  pin: "260805",

  // ------------------------------------------------------------
  // 3. HALAMAN KUNCI (lock screen)
  // ------------------------------------------------------------
  lockTitle: "Sebelum masuk...",
  lockSubtitle: "Ada sesuatu yang khusus buat kamu ❤️",
  lockWrongMessage: "Hmm... bukan itu 😜 Coba lagi.",
  lockButtonText: "UNLOCK ❤️",

  // ------------------------------------------------------------
  // 4. HERO SECTION
  // ------------------------------------------------------------
  heroTitle: "Happy Birthday",
  heroSubtitle: "Hari ini adalah hari spesial seseorang yang sangat berarti buat aku...",
  profilePhoto: "images/profile.jpg", // GANTI dengan foto pacarmu

  // ------------------------------------------------------------
  // 5. SURAT / UCAPAN ("For You")
  // ------------------------------------------------------------
  forYouTitle: "Aku punya sesuatu buat kamu...",
  letter: `Happy birthday, sayang ❤️

Semoga di umur kamu yang baru ini, semua hal baik datang satu per satu.
Semoga kamu selalu dikelilingi orang-orang yang sayang sama kamu.

Dan semoga aku masih bisa menjadi salah satu orang yang selalu ada
di samping kamu.`,

  // ------------------------------------------------------------
  // 6. GALERI FOTO ("Our Little Memories")
  // Ganti path di bawah dengan foto kalian.
  // Tambah / kurangi jumlah foto sesuka hati.
  // ------------------------------------------------------------
  galleryTitle: "Our Little Memories",
  photos: [
    { src: "images/photo1.jpg", caption: "Momen pertama kita" },
    { src: "images/photo2.jpg", caption: "Liburan favorit" },
    { src: "images/photo3.jpg", caption: "Random tapi berkesan" },
    { src: "images/photo4.jpg", caption: "Ketawa bareng" },
    { src: "images/photo5.jpg", caption: "Malam yang manis" },
    { src: "images/photo6.jpg", caption: "Sampai sekarang" }
  ],

  // ------------------------------------------------------------
  // 7. TIMELINE ("Moments")
  // ------------------------------------------------------------
  momentsTitle: "Moments",
  moments: [
    {
      title: "The Beginning ❤️",
      text: "Tulis cerita pertama kita di sini."
    },
    {
      title: "Our Favorite Moment",
      text: "Tulis kenangan favorit di sini."
    },
    {
      title: "And Then...",
      text: "Tulis cerita berikutnya di sini."
    },
    {
      title: "Today",
      text: "Dan sekarang kita sampai di sini."
    }
  ],

  // ------------------------------------------------------------
  // 8. INTERACTIVE SURPRISE (wax seal card)
  // ------------------------------------------------------------
  surpriseButtonText: "Tap untuk membuka sesuatu...",
  surpriseMessage: "You are one of the best things that ever happened to me ❤️",
  surprisePhoto: "images/photo_surprise.jpg", // opsional, boleh dikosongkan ("")

  // ------------------------------------------------------------
  // 9. FINAL SURPRISE
  // ------------------------------------------------------------
  finalPreText: "One last thing...",
  finalMessage: "I hope you know how special you are to me.",
  finalPhoto: "images/photo_final.jpg",
  signature: "With love,", // baris di atas nama

  // ------------------------------------------------------------
  // 10. MUSIK
  // ------------------------------------------------------------
  music: "audio/birthday-song.mp3",

  // ------------------------------------------------------------
  // 11. QR CODE (dipakai oleh qrcode.html)
  // Ganti setelah website sudah online / di-hosting.
  // ------------------------------------------------------------
  websiteUrl: "https://dewanji160-code.github.io/birthday-surprise/"
};

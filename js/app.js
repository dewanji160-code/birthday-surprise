/* ============================================================
   BIRTHDAY SURPRISE — APP LOGIC
   Semua teks & data diambil dari js/config.js (birthdayConfig).
   Kamu TIDAK perlu mengedit file ini kecuali ingin mengubah
   perilaku/animasi.
   ============================================================ */

(() => {
  const cfg = birthdayConfig;

  /* ---------------------------------------------------------
     0. Populate content from config
     --------------------------------------------------------- */
  document.getElementById('lock-eyebrow').textContent = cfg.lockTitle;
  document.getElementById('lock-subtitle-main').textContent = cfg.lockSubtitle;

  document.getElementById('hero-name').textContent = `, ${cfg.name} ❤️`;
  document.getElementById('hero-subtitle').textContent = cfg.heroSubtitle;
  document.getElementById('profile-photo').src = cfg.profilePhoto;

  document.getElementById('for-you-title').textContent = cfg.forYouTitle;
  document.getElementById('letter-text').textContent = cfg.letter;

  document.getElementById('gallery-title').textContent = cfg.galleryTitle;
  document.getElementById('moments-title').textContent = cfg.momentsTitle;

  document.getElementById('seal-prompt').textContent = cfg.surpriseButtonText;
  document.getElementById('seal-reveal-text').textContent = cfg.surpriseMessage;
  if (cfg.surprisePhoto) {
    document.getElementById('seal-reveal-img').src = cfg.surprisePhoto;
  } else {
    document.getElementById('seal-reveal-img').style.display = 'none';
  }

  document.getElementById('final-pretext').textContent = cfg.finalPreText;
  document.getElementById('final-title').textContent = `Happy Birthday, ${cfg.name}. ❤️`;
  document.getElementById('final-message').textContent = cfg.finalMessage;
  document.getElementById('final-photo').src = cfg.finalPhoto;
  document.getElementById('final-signature').innerHTML = `${cfg.signature}<br>${cfg.myName} ❤️`;

  document.getElementById('bg-music').src = cfg.music;

  // Gallery
  const galleryGrid = document.getElementById('gallery-grid');
  cfg.photos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal-on-scroll';
    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption || ''}" loading="lazy" />
      <div class="gallery-caption">${photo.caption || ''}</div>
    `;
    item.addEventListener('click', () => openLightbox(photo.src, photo.caption));
    galleryGrid.appendChild(item);
  });

  // Timeline
  const timeline = document.getElementById('timeline');
  cfg.moments.forEach((m) => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal-on-scroll';
    item.innerHTML = `
      <h3 class="timeline-title">${m.title}</h3>
      <p class="timeline-text">${m.text}</p>
    `;
    timeline.appendChild(item);
  });

  /* ---------------------------------------------------------
     1. Ambient background — bokeh + floating hearts
     --------------------------------------------------------- */
  const ambient = document.getElementById('ambient');

  for (let i = 0; i < 6; i++) {
    const b = document.createElement('div');
    b.className = 'bokeh';
    const size = 80 + Math.random() * 160;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.top = `${Math.random() * 100}%`;
    b.style.animationDelay = `${Math.random() * 6}s`;
    b.style.animationDuration = `${14 + Math.random() * 10}s`;
    ambient.appendChild(b);
  }

  function spawnHeart() {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = '❤';
    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDuration = `${9 + Math.random() * 8}s`;
    h.style.fontSize = `${0.7 + Math.random() * 0.8}rem`;
    ambient.appendChild(h);
    setTimeout(() => h.remove(), 18000);
  }
  for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 1400);
  setInterval(spawnHeart, 2600);

  /* ---------------------------------------------------------
     2. PIN lock screen
     --------------------------------------------------------- */
  const PIN = String(cfg.pin);
  const pinDotsEl = document.getElementById('pin-dots');
  const keypadEl = document.getElementById('keypad');
  const lockMessageEl = document.getElementById('lock-message');
  const lockScreenEl = document.getElementById('lock-screen');
  const mainContentEl = document.getElementById('main-content');
  const sealBurstEl = document.getElementById('seal-burst');

  let entered = '';

  // build dots
  for (let i = 0; i < PIN.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'pin-dot';
    pinDotsEl.appendChild(dot);
  }

  // build keypad 1-9, blank, 0, delete
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
  keys.forEach((k) => {
    const btn = document.createElement('button');
    if (k === '') {
      btn.className = 'key key--ghost';
      btn.disabled = true;
    } else if (k === '⌫') {
      btn.className = 'key key--action';
      btn.textContent = k;
      btn.addEventListener('click', () => handleKey('back'));
    } else {
      btn.className = 'key';
      btn.textContent = k;
      btn.addEventListener('click', (e) => {
        e.currentTarget.classList.add('pressed');
        setTimeout(() => e.currentTarget.classList.remove('pressed'), 150);
        handleKey(k);
      });
    }
    keypadEl.appendChild(btn);
  });

  function updateDots() {
    const dots = pinDotsEl.querySelectorAll('.pin-dot');
    dots.forEach((d, i) => d.classList.toggle('filled', i < entered.length));
  }

  function handleKey(k) {
    if (k === 'back') {
      entered = entered.slice(0, -1);
      updateDots();
      return;
    }
    if (entered.length >= PIN.length) return;
    entered += k;
    updateDots();

    if (entered.length === PIN.length) {
      setTimeout(checkPin, 250);
    }
  }

  function checkPin() {
    if (entered === PIN) {
      pinDotsEl.classList.add('success');
      lockMessageEl.classList.remove('show');
      setTimeout(unlock, 550);
    } else {
      pinDotsEl.classList.add('shake');
      lockMessageEl.textContent = cfg.lockWrongMessage;
      lockMessageEl.classList.add('show');
      setTimeout(() => {
        pinDotsEl.classList.remove('shake');
        entered = '';
        updateDots();
      }, 500);
    }
  }

  function unlock() {
    sealBurstEl.classList.add('play');
    launchConfetti();
    setTimeout(() => {
      lockScreenEl.classList.add('unlocked');
      mainContentEl.classList.add('reveal');
      document.body.style.overflow = 'auto';
      tryPlayMusic();
    }, 350);
  }

  // lock initial scroll while pin screen shown
  document.body.style.overflow = 'hidden';

  /* ---------------------------------------------------------
     3. Confetti (lightweight canvas, no external library)
     --------------------------------------------------------- */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function launchConfetti() {
    const colors = ['#f3c9d4', '#d98da2', '#d8b784', '#fbeee7'];
    const pieces = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 9,
      vy: (Math.random() - 1.4) * 9,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      life: 0
    }));

    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach((p) => {
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        if (p.life < 90) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, 1 - p.life / 90);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });
      if (alive && frame < 140) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();
  }

  /* ---------------------------------------------------------
     4. Scroll reveal
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));

  /* ---------------------------------------------------------
     5. Lightbox
     --------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------------------------------------------------------
     6. Interactive surprise — wax seal card
     --------------------------------------------------------- */
  const sealButton = document.getElementById('seal-button');
  const sealReveal = document.getElementById('seal-reveal');
  const sealPrompt = document.getElementById('seal-prompt');

  sealButton.addEventListener('click', () => {
    if (sealButton.classList.contains('opened')) return;
    sealButton.classList.add('opened');
    sealPrompt.style.opacity = '0';
    launchConfetti();
    setTimeout(() => sealReveal.classList.add('show'), 300);
  });

  /* ---------------------------------------------------------
     7. Music control
     --------------------------------------------------------- */
  const musicToggle = document.getElementById('music-toggle');
  const music = document.getElementById('bg-music');
  let musicPlaying = false;

  function tryPlayMusic() {
    music.volume = 0.6;
    music.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.textContent = '🎵';
    }).catch(() => {
      // Autoplay blocked — user must tap the control manually
      musicPlaying = false;
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '🔇';
    });
  }

  musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '🔇';
    } else {
      music.play().then(() => {
        musicPlaying = true;
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎵';
      }).catch(() => {});
    }
  });
})();

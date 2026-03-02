(function () {

  // ── PLAYLIST ── swap these out for your own tracks ──────────────────
  // ────────────────────────────────────────────────────────────────────

  let current = 0;
  let isPlaying = false;
  const audio = new Audio();

  const songName  = document.querySelector('.mp-song-name');
  const artistEl  = document.querySelector('.mp-artist');
  const disc      = document.querySelector('.mp-disc');
  const playBtn   = document.querySelector('.mp-play-pause');
  const iconPlay  = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  const prevBtn   = document.querySelector('.mp-prev');
  const nextBtn   = document.querySelector('.mp-next');
  const barFill   = document.querySelector('.mp-bar-fill');
  const seekInput = document.querySelector('.mp-seek');
  const curTime   = document.querySelector('.mp-current');
  const durTime   = document.querySelector('.mp-duration');

  function fmt(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, '0');
    return `${m}:${sec}`;
  }

  function load(idx) {
    current = (idx + playlist.length) % playlist.length;
    const track = playlist[current];
    songName.textContent = track.title;
    artistEl.textContent = track.artist;
    audio.src = track.src;
    barFill.style.width = '0%';
    seekInput.value = 0;
    if (isPlaying) audio.play().catch(() => {});
  }

  function setPlaying(state) {
    isPlaying = state;
    iconPlay.style.display  = state ? 'none'  : 'block';
    iconPause.style.display = state ? 'block' : 'none';
    disc.classList.toggle('spinning', state);
  }

  playBtn.addEventListener('click', () => {
    if (!audio.src && playlist[current].src) audio.src = playlist[current].src;
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  });

  prevBtn.addEventListener('click', () => load(current - 1));
  nextBtn.addEventListener('click', () => load(current + 1));

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    barFill.style.width = pct + '%';
    seekInput.value = pct;
    curTime.textContent = fmt(audio.currentTime);
    durTime.textContent = fmt(audio.duration);
  });

  seekInput.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (seekInput.value / 100) * audio.duration;
  });

  audio.addEventListener('ended', () => load(current + 1));

  // Initialise
  load(0);
  setPlaying(false);

  // Pause music player when any other audio/video on the page starts playing
  document.addEventListener('play', function(e) {
    if (e.target !== audio && !e.target.muted) {
      audio.pause();
      setPlaying(false);
    }
  }, true);
  // Or when another player unmutes
  document.addEventListener('volumechange', function(e) {
    if (e.target !== audio && !e.target.muted && e.target.volume > 0 && !e.target.paused) {
      audio.pause();
      setPlaying(false);
    }
  }, true);

})();

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const playlist = document.getElementById("playlist");
const volumeSlider = document.getElementById("volumeSlider");
const equalizer = document.getElementById("equalizer");
const trackTitle = document.getElementById("trackTitle");
const lyricsText = document.getElementById("lyricsText");
const themeChip = document.getElementById("themeChip");
const themeMood = document.getElementById("themeMood");
const toast = document.getElementById("toast");
const copyLink = document.getElementById("copyLink");
const themeToggle = document.getElementById("themeToggle");
const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");

const audioPath = "assets/audio/";

const tracks = {
  "Ost. Intense Love - Waiting For Me [Monkey ft. Li RuoXi] 2020.mp3": {
    title: "Intense Love OST",
    lyric: "Soft cinematic mood for late-night scrolling.",
    chip: "Cinematic Violet",
    mood: "Soft cinematic mood",
    colors: {
      primary: "#8b5cf6",
      secondary: "#22d3ee",
      accent: "#f97316",
      orbA: "rgba(139, 92, 246, .30)",
      orbB: "rgba(34, 211, 238, .23)"
    }
  },
  "NUMERA UNO ANTHEM  - Prod. By KANG GAYANG (Official Music Video).mp3": {
    title: "NUMERA UNO ANTHEM",
    lyric: "High-energy anthem mode activated.",
    chip: "Champion Gold",
    mood: "Bold winning energy",
    colors: {
      primary: "#f59e0b",
      secondary: "#ef4444",
      accent: "#22c55e",
      orbA: "rgba(245, 158, 11, .32)",
      orbB: "rgba(239, 68, 68, .24)"
    }
  },
  "Tada Koe Hitotsu - the voice r#U1d07mix (1).mp3": {
    title: "Tada Koe Hitotsu",
    lyric: "Calm remix mode with clean atmosphere.",
    chip: "Anime Sky",
    mood: "Fresh calm remix",
    colors: {
      primary: "#38bdf8",
      secondary: "#a78bfa",
      accent: "#f9a8d4",
      orbA: "rgba(56, 189, 248, .30)",
      orbB: "rgba(167, 139, 250, .22)"
    }
  },
  "eminem - stan lofi remix (slowed  reverb).mp3": {
    title: "Eminem - Stan Lofi",
    lyric: "Slowed lofi ambience for deep focus.",
    chip: "Lofi Smoke",
    mood: "Dark focus ambience",
    colors: {
      primary: "#64748b",
      secondary: "#a855f7",
      accent: "#06b6d4",
      orbA: "rgba(100, 116, 139, .35)",
      orbB: "rgba(168, 85, 247, .20)"
    }
  },
  "Way Back Home.mp3": {
    title: "Way Back Home",
    lyric: "A smooth nostalgic track for the page.",
    chip: "Sunset Home",
    mood: "Warm nostalgic glow",
    colors: {
      primary: "#fb7185",
      secondary: "#f97316",
      accent: "#fde047",
      orbA: "rgba(251, 113, 133, .28)",
      orbB: "rgba(249, 115, 22, .22)"
    }
  },
  "#U300cAS ~ Nightcore#U300d~ That Girl ~.mp3": {
    title: "That Girl - Nightcore",
    lyric: "Bright nightcore energy with luxury glow.",
    chip: "Neon Pop",
    mood: "Fast bright nightcore",
    colors: {
      primary: "#ec4899",
      secondary: "#06b6d4",
      accent: "#84cc16",
      orbA: "rgba(236, 72, 153, .30)",
      orbB: "rgba(6, 182, 212, .25)"
    }
  }
};

let width = 0;
let height = 0;
let rafId;
let activeColors = tracks[playlist.value].colors;
let stars = [];
let galaxyDots = [];
let planets = [];
let pointer = { x: 0, y: 0 };
let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function rgbaFromHex(hex, alpha = 1) {
  const c = hexToRgb(hex);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

function applyTrackTheme(meta) {
  const colors = meta.colors;
  activeColors = colors;
  const target = document.body;
  target.style.setProperty("--primary", colors.primary);
  target.style.setProperty("--secondary", colors.secondary);
  target.style.setProperty("--accent", colors.accent);
  target.style.setProperty("--orb-a", colors.orbA);
  target.style.setProperty("--orb-b", colors.orbB);
  themeChip.textContent = meta.chip;
  themeMood.textContent = meta.mood;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", colors.primary);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function buildCosmicScene() {
  const starAmount = Math.min(190, Math.max(90, Math.floor(width / 7)));
  stars = Array.from({ length: starAmount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: random(.25, 1.15),
    r: random(.35, 1.85),
    a: random(.18, .9),
    tw: random(.006, .022),
    phase: random(0, Math.PI * 2)
  }));

  const galaxyAmount = Math.min(420, Math.max(180, Math.floor(width * .42)));
  galaxyDots = Array.from({ length: galaxyAmount }, (_, i) => {
    const arm = i % 4;
    const radius = Math.pow(Math.random(), .58) * Math.min(width, height) * .42;
    const angle = radius * .022 + arm * (Math.PI / 2) + random(-.42, .42);
    return {
      radius,
      angle,
      spin: random(.00012, .00042),
      size: random(.35, 1.65),
      a: random(.08, .42),
      huePick: Math.random() > .5 ? "primary" : "secondary"
    };
  });

  planets = [
    { x: width * .79, y: height * .18, r: Math.min(width, height) * .075, speed: .00055, ring: true, tilt: -.32, depth: .55 },
    { x: width * .18, y: height * .76, r: Math.min(width, height) * .052, speed: -.00042, ring: false, tilt: .18, depth: .34 },
    { x: width * .88, y: height * .72, r: Math.min(width, height) * .026, speed: .00074, ring: false, tilt: 0, depth: .22 }
  ];
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  buildCosmicScene();
}

function drawPlanet(planet, time, index) {
  const primary = activeColors.primary;
  const secondary = activeColors.secondary;
  const accent = activeColors.accent;
  const driftX = Math.cos(time * planet.speed + index) * 16;
  const driftY = Math.sin(time * planet.speed * .8 + index) * 10;
  const parallaxX = pointer.x * planet.depth;
  const parallaxY = pointer.y * planet.depth;
  const x = planet.x + driftX + parallaxX;
  const y = planet.y + driftY + parallaxY;

  ctx.save();
  const aura = ctx.createRadialGradient(x, y, planet.r * .2, x, y, planet.r * 3.1);
  aura.addColorStop(0, rgbaFromHex(index === 1 ? secondary : primary, .28));
  aura.addColorStop(1, rgbaFromHex(primary, 0));
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(x, y, planet.r * 3.1, 0, Math.PI * 2);
  ctx.fill();

  if (planet.ring) {
    ctx.translate(x, y);
    ctx.rotate(planet.tilt);
    ctx.strokeStyle = rgbaFromHex(accent, .38);
    ctx.lineWidth = Math.max(1, planet.r * .065);
    ctx.beginPath();
    ctx.ellipse(0, 0, planet.r * 1.88, planet.r * .48, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = rgbaFromHex(secondary, .23);
    ctx.lineWidth = Math.max(.8, planet.r * .035);
    ctx.beginPath();
    ctx.ellipse(0, 0, planet.r * 2.18, planet.r * .62, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setTransform(ctx.getTransform());
    ctx.rotate(-planet.tilt);
    ctx.translate(-x, -y);
  }

  const gradient = ctx.createRadialGradient(x - planet.r * .36, y - planet.r * .45, planet.r * .08, x, y, planet.r * 1.12);
  gradient.addColorStop(0, rgbaFromHex("#ffffff", .72));
  gradient.addColorStop(.22, rgbaFromHex(index === 1 ? secondary : primary, .88));
  gradient.addColorStop(.68, rgbaFromHex(index === 2 ? accent : secondary, .55));
  gradient.addColorStop(1, "rgba(0,0,0,.64)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, planet.r, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = rgbaFromHex("#ffffff", .12);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(x - planet.r * .12, y - planet.r * (.28 - i * .2), planet.r * .78, planet.r * .055, Math.sin(time * .0002 + i) * .22, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

function drawCosmicScene(time = 0) {
  ctx.clearRect(0, 0, width, height);
  const primary = hexToRgb(activeColors.primary);
  const secondary = hexToRgb(activeColors.secondary);
  const cx = width * .54 + pointer.x * .25;
  const cy = height * .38 + pointer.y * .2;

  const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * .68);
  bgGlow.addColorStop(0, `rgba(${primary.r}, ${primary.g}, ${primary.b}, .16)`);
  bgGlow.addColorStop(.35, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, .08)`);
  bgGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    const twinkle = reducedMotion ? 1 : .65 + Math.sin(time * star.tw + star.phase) * .35;
    const x = (star.x + pointer.x * star.z + width) % width;
    const y = (star.y + pointer.y * star.z + height) % height;
    ctx.fillStyle = `rgba(255,255,255,${star.a * twinkle})`;
    ctx.beginPath();
    ctx.arc(x, y, star.r * star.z, 0, Math.PI * 2);
    ctx.fill();
  });

  galaxyDots.forEach((dot) => {
    const angle = reducedMotion ? dot.angle : dot.angle + time * dot.spin;
    const stretch = 1.55;
    const x = cx + Math.cos(angle) * dot.radius * stretch + pointer.x * .16;
    const y = cy + Math.sin(angle) * dot.radius * .58 + pointer.y * .12;
    const color = dot.huePick === "primary" ? primary : secondary;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${dot.a})`;
    ctx.beginPath();
    ctx.arc(x, y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  });

  planets.forEach((planet, index) => drawPlanet(planet, time, index));
  rafId = requestAnimationFrame(drawCosmicScene);
}

function getSelectedMeta() {
  return tracks[playlist.value] || tracks[Object.keys(tracks)[0]];
}

function updateTrackMeta() {
  const meta = getSelectedMeta();
  trackTitle.textContent = meta.title;
  lyricsText.textContent = music.paused ? meta.lyric : "Music playing. Enjoy the vibe.";
  applyTrackTheme(meta);
}

function setPlayingState(isPlaying) {
  musicBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
  equalizer.classList.toggle("playing", isPlaying);
  if (!isPlaying) updateTrackMeta();
}

async function toggleMusic() {
  try {
    if (music.paused) {
      await music.play();
      setPlayingState(true);
      lyricsText.textContent = "Music playing. Enjoy the vibe.";
    } else {
      music.pause();
      setPlayingState(false);
    }
  } catch (error) {
    showToast("Browser blocked autoplay. Tap play again.");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

musicBtn.addEventListener("click", toggleMusic);

volumeSlider.addEventListener("input", () => {
  music.volume = Number(volumeSlider.value);
});
music.volume = Number(volumeSlider.value);

playlist.addEventListener("change", async () => {
  const wasPlaying = !music.paused;
  music.src = audioPath + playlist.value;
  updateTrackMeta();
  buildCosmicScene();
  showToast(`${getSelectedMeta().chip} galaxy theme applied.`);
  if (wasPlaying) {
    try {
      await music.play();
      setPlayingState(true);
      lyricsText.textContent = "Music playing. Enjoy the vibe.";
    } catch {
      setPlayingState(false);
    }
  } else {
    setPlayingState(false);
  }
});

music.addEventListener("ended", () => setPlayingState(false));

copyLink.addEventListener("click", async () => {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast("Page link copied.");
  } catch {
    showToast("Copy failed. Copy from address bar.");
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
  showToast(document.body.classList.contains("theme-light") ? "Light mode enabled." : "Dark mode enabled.");
});

document.querySelectorAll(".social-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });
});

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / width - .5) * 36;
  pointer.y = (event.clientY / height - .5) * 36;
});

updateTrackMeta();
resizeCanvas();
drawCosmicScene();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("beforeunload", () => cancelAnimationFrame(rafId));

// ----- Theme Toggle -----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const isLight = theme === 'light';
  themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

// ----- Avatar Image Fallback -----
const profileImage = document.getElementById('profileImage');
const avatarInitials = document.getElementById('avatarInitials');
const faviconLink = document.getElementById('siteFavicon');
const appleTouchIcon = document.getElementById('appleTouchIcon');

function setFavicon(url) {
  if (faviconLink) faviconLink.href = url;
  if (appleTouchIcon) appleTouchIcon.href = url;
}

function setInitialsFavicon() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 64, 64);
  gradient.addColorStop(0, '#3557cf');
  gradient.addColorStop(1, '#0f766e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 28px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HT', 32, 33);
  setFavicon(canvas.toDataURL('image/png'));
}

function setFaviconFromProfile(imgEl) {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const minSide = Math.min(imgEl.naturalWidth, imgEl.naturalHeight);
  const sx = (imgEl.naturalWidth - minSide) / 2;
  const sy = (imgEl.naturalHeight - minSide) / 2;
  ctx.drawImage(imgEl, sx, sy, minSide, minSide, 0, 0, size, size);
  setFavicon(canvas.toDataURL('image/png'));
}

function showAvatarImage() {
  profileImage.style.display = 'block';
  avatarInitials.style.display = 'none';
  setFaviconFromProfile(profileImage);
}

function showAvatarFallback() {
  profileImage.style.display = 'none';
  avatarInitials.style.display = 'flex';
  setInitialsFavicon();
}

let triedFallbackSrc = false;

function tryFallbackProfileSource() {
  const fallbackSrc = profileImage.dataset.fallbackSrc;
  if (!triedFallbackSrc && fallbackSrc) {
    triedFallbackSrc = true;
    profileImage.src = fallbackSrc;
    setFavicon(fallbackSrc);
    return true;
  }
  return false;
}

function handleProfileImageError() {
  if (!tryFallbackProfileSource()) {
    showAvatarFallback();
  }
}

if (profileImage && avatarInitials) {
  setInitialsFavicon();
  if (profileImage.complete) {
    if (profileImage.naturalWidth > 0) {
      showAvatarImage();
    } else {
      handleProfileImageError();
    }
  }
  profileImage.addEventListener('load', showAvatarImage);
  profileImage.addEventListener('error', handleProfileImageError);
}

// ----- Mobile Nav -----
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !ham.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ----- Scroll Reveal -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ----- Active Nav Link -----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 90) current = s.getAttribute('id');
  });
  navAnchors.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

window.dispatchEvent(new Event('scroll'));

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

// ----- Hero Name Landing Animation -----
const heroFirstName = document.getElementById('heroFirstName');
const heroTitle = heroFirstName ? heroFirstName.closest('.hero-title') : null;

function animateHeroFirstName() {
  if (!heroFirstName) return;

  const initialName = (heroFirstName.dataset.initialName || 'Himanshu').trim();
  const finalName = (heroFirstName.dataset.finalName || 'Heath').trim();
  if (!initialName || !finalName) return;

  heroFirstName.textContent = initialName;
  heroFirstName.style.minWidth = `${Math.max(initialName.length, finalName.length)}ch`;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroFirstName.textContent = finalName;
    heroFirstName.style.minWidth = '';
    if (heroTitle) heroTitle.classList.remove('name-transitioning');
    return;
  }

  if (heroTitle) heroTitle.classList.add('name-transitioning');
  heroFirstName.classList.add('name-cursor');

  const startDelayMs = 700;
  const deleteSpeedMs = 85;
  const holdBetweenMs = 180;
  const typeSpeedMs = 115;

  function startTyping() {
    let typeIndex = 0;
    const typeTimer = window.setInterval(() => {
      typeIndex += 1;
      heroFirstName.textContent = finalName.slice(0, typeIndex);

      if (typeIndex >= finalName.length) {
        window.clearInterval(typeTimer);
        heroFirstName.classList.remove('name-cursor');
        heroFirstName.style.minWidth = '';
        if (heroTitle) heroTitle.classList.remove('name-transitioning');
      }
    }, typeSpeedMs);
  }

  function startDeleting() {
    let deleteIndex = initialName.length;
    const deleteTimer = window.setInterval(() => {
      deleteIndex -= 1;
      heroFirstName.textContent = initialName.slice(0, Math.max(deleteIndex, 0));

      if (deleteIndex <= 0) {
        window.clearInterval(deleteTimer);
        window.setTimeout(startTyping, holdBetweenMs);
      }
    }, deleteSpeedMs);
  }

  window.setTimeout(startDeleting, startDelayMs);
}

animateHeroFirstName();

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

// ----- Professional Journey (JSON Data) -----
const professionalJourneyTimeline = document.getElementById('professionalJourneyTimeline');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderJourneyItem(item, index) {
  const delay = typeof item.delay === 'number' ? item.delay : index * 0.1;
  const delayStyle = delay > 0 ? ` style="transition-delay:${delay}s"` : '';
  const badgeClass = item.badgeType === 'green' ? 'badge-green' : 'badge-blue';
  const badgeMarkup = item.badgeText
    ? `<span class="badge ${badgeClass}">${escapeHtml(item.badgeText)}</span>`
    : '';
  const descriptionMarkup = item.description
    ? `<p class="tl-desc">${escapeHtml(item.description)}</p>`
    : '';
  const bullets = Array.isArray(item.bullets) ? item.bullets : [];
  const bulletMarkup = bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('');

  return `
    <div class="tl-item reveal"${delayStyle}>
      <div class="tl-dot"></div>
      <div class="tl-card">
        <div class="tl-company">${escapeHtml(item.company || '')}</div>
        <div class="tl-header">
          <div class="tl-title">${escapeHtml(item.title || '')}</div>
          <span class="tl-period">${escapeHtml(item.period || '')}</span>
        </div>
        ${badgeMarkup}
        ${descriptionMarkup}
        <ul class="tl-bullets">${bulletMarkup}</ul>
      </div>
    </div>
  `;
}

async function loadProfessionalJourney() {
  if (!professionalJourneyTimeline) return;

  try {
    const response = await fetch('data/professional-journey.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const entries = Array.isArray(payload) ? payload : payload.entries;
    if (!Array.isArray(entries) || entries.length === 0) return;

    professionalJourneyTimeline.innerHTML = entries
      .map((entry, index) => renderJourneyItem(entry, index))
      .join('');

    professionalJourneyTimeline
      .querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));
  } catch (error) {
    console.error('Unable to load professional journey data.', error);
  }
}

loadProfessionalJourney();

// ----- Featured Projects (JSON Data) -----
const featuredProjectsGrid = document.getElementById('featuredProjectsGrid');

function renderProjectLink(link) {
  const url = escapeHtml(link.url || '#');
  const title = escapeHtml(link.title || 'Project Link');
  const iconClass = escapeHtml(link.iconClass || 'fa-solid fa-link');
  return `<a href="${url}" class="proj-link" title="${title}" target="_blank" rel="noopener"><i class="${iconClass}"></i></a>`;
}

function renderProjectCard(project, index) {
  const delay = typeof project.delay === 'number' ? project.delay : (index % 3) * 0.1;
  const delayStyle = delay > 0 ? ` style="transition-delay:${delay}s"` : '';
  const iconClass = escapeHtml(project.iconClass || 'fa-solid fa-diagram-project');
  const links = Array.isArray(project.links) ? project.links : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];

  const linksMarkup = links.map((link) => renderProjectLink(link)).join('');
  const tagsMarkup = tags.map((tag) => `<span class="proj-tag">${escapeHtml(tag)}</span>`).join('');

  return `
    <div class="proj-card reveal"${delayStyle}>
      <div class="proj-header">
        <span class="proj-icon"><i class="${iconClass}"></i></span>
        <div class="proj-links">${linksMarkup}</div>
      </div>
      <h3>${escapeHtml(project.title || '')}</h3>
      <p>${escapeHtml(project.description || '')}</p>
      <div class="proj-tags">${tagsMarkup}</div>
    </div>
  `;
}

async function loadFeaturedProjects() {
  if (!featuredProjectsGrid) return;

  try {
    const response = await fetch('data/projects.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const entries = Array.isArray(payload) ? payload : payload.entries;
    if (!Array.isArray(entries) || entries.length === 0) return;

    featuredProjectsGrid.innerHTML = entries
      .map((entry, index) => renderProjectCard(entry, index))
      .join('');

    featuredProjectsGrid
      .querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));
  } catch (error) {
    console.error('Unable to load projects data.', error);
  }
}

loadFeaturedProjects();

// ----- Education (JSON Data) -----
const educationGrid = document.getElementById('educationGrid');

function renderEducationCard(item, index) {
  const delay = typeof item.delay === 'number' ? item.delay : index * 0.1;
  const delayStyle = delay > 0 ? ` style="transition-delay:${delay}s"` : '';
  const iconClass = escapeHtml(item.iconClass || 'fa-solid fa-graduation-cap');

  return `
    <div class="edu-card reveal"${delayStyle}>
      <div class="edu-icon"><i class="${iconClass}"></i></div>
      <div class="edu-deg">${escapeHtml(item.degree || '')}</div>
      <h3>${escapeHtml(item.title || '')}</h3>
      <div class="edu-school">${escapeHtml(item.school || '')}</div>
      <div class="edu-period">${escapeHtml(item.period || '')}</div>
      <p class="edu-note">${escapeHtml(item.note || '')}</p>
    </div>
  `;
}

async function loadEducation() {
  if (!educationGrid) return;

  try {
    const response = await fetch('data/education.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const entries = Array.isArray(payload) ? payload : payload.entries;
    if (!Array.isArray(entries) || entries.length === 0) return;

    educationGrid.innerHTML = entries
      .map((entry, index) => renderEducationCard(entry, index))
      .join('');

    educationGrid
      .querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));
  } catch (error) {
    console.error('Unable to load education data.', error);
  }
}

loadEducation();

// ----- Publications & Certifications (JSON Data) -----
const publicationsGrid = document.getElementById('publicationsGrid');
const certificationsGrid = document.getElementById('certificationsGrid');

function renderCredentialCard(item, index) {
  const delay = typeof item.delay === 'number' ? item.delay : index * 0.05;
  const delayStyle = delay > 0 ? ` style="transition-delay:${delay}s"` : '';
  const issuer = escapeHtml(item.issuer || '');
  const title = escapeHtml(item.title || '');
  const date = escapeHtml(item.date || '');
  const linkLabel = escapeHtml(item.linkLabel || 'View');
  const linkUrl = item.url ? escapeHtml(item.url) : '';
  const linkMarkup = linkUrl
    ? `<a href="${linkUrl}" class="cert-link" target="_blank" rel="noopener">${linkLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
    : '';

  return `
    <div class="cert-card reveal"${delayStyle}>
      <div class="cert-issuer">${issuer}</div>
      <h3>${title}</h3>
      <div class="cert-date">${date}</div>
      ${linkMarkup}
    </div>
  `;
}

function renderCredentialGroup(container, entries) {
  if (!container || !Array.isArray(entries) || entries.length === 0) return;

  container.innerHTML = entries
    .map((entry, index) => renderCredentialCard(entry, index))
    .join('');

  container
    .querySelectorAll('.reveal')
    .forEach((el) => observer.observe(el));
}

async function loadPublicationsAndCertifications() {
  if (!publicationsGrid && !certificationsGrid) return;

  try {
    const response = await fetch('data/publications-certifications.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const publications = Array.isArray(payload.publications) ? payload.publications : [];
    const certifications = Array.isArray(payload.certifications) ? payload.certifications : [];

    renderCredentialGroup(publicationsGrid, publications);
    renderCredentialGroup(certificationsGrid, certifications);
  } catch (error) {
    console.error('Unable to load publications and certifications data.', error);
  }
}

loadPublicationsAndCertifications();

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

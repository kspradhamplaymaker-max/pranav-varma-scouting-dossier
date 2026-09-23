/* ===========================
   PRANAV VARMA SCOUTING DOSSIER
   JavaScript — Interactions & Animations
   =========================== */

'use strict';

// ===========================
// NAVBAR
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle('active-nav', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));


// ===========================
// PERFORMANCE TABS
// ===========================
const perfTabs = document.querySelectorAll('.perf-tab');
const perfContents = document.querySelectorAll('.perf-content');

perfTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    perfTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetTab = tab.dataset.tab;
    perfContents.forEach(content => {
      const isTarget = content.id === `tab-${targetTab}`;
      content.classList.toggle('hidden', !isTarget);
      if (isTarget) {
        content.classList.add('animated');
      }
    });
  });
});


// ===========================
// PHOTO GALLERY TABS
// ===========================
const photoTabs = document.querySelectorAll('.photo-tab');
const photoGalleries = document.querySelectorAll('.photo-gallery');

photoTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    photoTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetTab = tab.dataset.ptab;
    photoGalleries.forEach(gallery => {
      const isTarget = gallery.id === `ptab-${targetTab}`;
      gallery.classList.toggle('active', isTarget);
      gallery.style.display = isTarget ? 'block' : 'none';
    });
  });
});

// Init gallery display
photoGalleries.forEach(g => {
  if (!g.classList.contains('active')) {
    g.style.display = 'none';
  }
});


// ===========================
// WATCH THE GAME - VIDEO CATEGORY DETAIL
// ===========================
const videoCatCards = document.querySelectorAll('.video-cat-card');
const videoDetail = document.getElementById('videoDetail');
const videoDetailBack = document.getElementById('videoDetailBack');
const videoDetailPanels = document.querySelectorAll('.video-detail-panel');

function openVideoDetail(category) {
  videoDetailPanels.forEach(p => p.classList.toggle('active', p.dataset.panel === category));
  videoDetail.classList.add('open');
  document.body.classList.add('no-scroll');
  videoDetail.scrollTop = 0;
}

function closeVideoDetail() {
  videoDetail.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

videoCatCards.forEach(card => {
  card.addEventListener('click', () => openVideoDetail(card.dataset.category));
});

videoDetailBack?.addEventListener('click', closeVideoDetail);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoDetail?.classList.contains('open')) closeVideoDetail();
});


// ===========================
// STAT COUNTER ANIMATION
// ===========================
function animateValue(el, start, end, duration, isDecimal) {
  const startTime = performance.now();
  const update = (time) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = start + (end - start) * eased;
    el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Animate hero stat numbers when they enter view
const heroStats = document.querySelectorAll('.hstat-val');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      const num = parseFloat(text);
      if (!isNaN(num) && !el.dataset.animated) {
        el.dataset.animated = 'true';
        const isDecimal = text.includes('.');
        animateValue(el, 0, num, 1200, isDecimal);
      }
    }
  });
}, { threshold: 0.5 });

heroStats.forEach(el => statObserver.observe(el));


// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ===========================
// IMAGE ERROR HANDLING
// ===========================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // If the onerror fallback also fails, show a placeholder
    if (!this.dataset.errored) {
      this.dataset.errored = 'true';
      this.style.display = 'none';
      const placeholder = document.createElement('div');
      if (this.closest('.gallery-item')) {
        placeholder.className = 'gallery-placeholder';
        placeholder.innerHTML = '🏏';
      } else {
        placeholder.style.cssText = `
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1A2A55 0%, #0D1630 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 40px;
        `;
        placeholder.innerHTML = '🏏';
      }
      this.parentElement.appendChild(placeholder);
    }
  });
});


// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Mark hero elements as immediately visible
  document.querySelectorAll('.hero-text > *, .hero-stats-bar .hstat, .hero-stats-bar .hstat-divider').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Log for developer reference
  console.log('%c🏏 Pranav Varma — IPL Scouting Dossier 2026', 'font-size:16px;font-weight:bold;color:#FFB800;');
  console.log('%cFor authorised IPL franchise personnel only', 'color:#666;');
});

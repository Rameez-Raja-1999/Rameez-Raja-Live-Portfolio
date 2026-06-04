/* ─────────────────────────────────────────
   RAMEEZ RAJA — PORTFOLIO JAVASCRIPT
───────────────────────────────────────── */

// ── Cursor Glow (desktop only)
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMobile();
  }
});

// ── Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 90);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Contact form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.btn-submit');
  const orig = btn.textContent;

  btn.textContent = '⏳ Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#1edc78,#00b4d8)';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  }, 1200);
}

// ── Typed text animation in hero tag
(function typedTag() {
  const tag   = document.querySelector('.hero-tag');
  if (!tag) return;
  const texts = [
    'Available for Internships 2026',
    'Open to Full Stack Roles',
    'Building the Web ✨'
  ];
  let ti = 0, ci = 0, deleting = false;
  const span = document.createElement('span');
  tag.appendChild(span);

  function tick() {
    const full = texts[ti];
    if (!deleting) {
      span.textContent = full.slice(0, ++ci);
      if (ci === full.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 55);
    } else {
      span.textContent = full.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 28);
    }
  }

  // Replace static text with typed version
  tag.innerHTML = '';
  tag.innerHTML = '<span class="hero-tag-dot"></span>';
  const typed = document.createElement('span');
  tag.appendChild(typed);

  let ti2 = 0, ci2 = 0, del2 = false;
  function tick2() {
    const full = texts[ti2];
    if (!del2) {
      typed.textContent = full.slice(0, ++ci2);
      if (ci2 === full.length) { del2 = true; setTimeout(tick2, 2200); return; }
      setTimeout(tick2, 55);
    } else {
      typed.textContent = full.slice(0, --ci2);
      if (ci2 === 0) { del2 = false; ti2 = (ti2 + 1) % texts.length; setTimeout(tick2, 400); return; }
      setTimeout(tick2, 28);
    }
  }
  setTimeout(tick2, 800);
})();

// ── Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Code card line highlight (subtle hover glow on lines)
document.querySelectorAll('.code-line').forEach(line => {
  line.addEventListener('mouseenter', () => {
    line.style.background = 'rgba(0,217,245,0.04)';
    line.style.borderRadius = '4px';
  });
  line.addEventListener('mouseleave', () => {
    line.style.background = '';
  });
});

// ── Skill tag ripple on click
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.style.transform = 'scale(0.92)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

// ── Lazy reveal stagger for skill categories
const skillCats = document.querySelectorAll('.skill-category');
skillCats.forEach((cat, i) => {
  cat.style.transitionDelay = `${i * 60}ms`;
});

// ── Year auto-update in footer
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.textContent = `Designed & built with ❤️ · ${new Date().getFullYear()}`;
}

// ── Back to top on logo click
document.querySelector('.nav-logo')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

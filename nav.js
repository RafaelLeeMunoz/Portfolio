/* ============================================================
   nav.js  —  Shared components + navigation for all pages
   ============================================================
   Load order (bottom of <body>, before page-specific scripts):
     <script src="nav.js"></script>

   Each page needs exactly two placeholder elements:
     <div id="site-nav"></div>      ← becomes <nav>
     <div id="site-footer"></div>   ← becomes <footer>
   ============================================================ */

/* ── SHARED NAV TEMPLATE ──────────────────────────────────── */
const _NAV_HTML = `
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">

      <a href="index.html" class="nav-logo display">Rafael<span>.</span></a>

      <!-- Desktop links -->
      <ul class="nav-links" role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="music.html">Music</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html" class="btn btn-primary nav-cta" style="color:#ffffff;">Hire Me</a></li>
      </ul>

      <!-- Hamburger (mobile) -->
      <button class="hamburger" id="hamburger"
              aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <ul class="nav-mobile" id="nav-mobile" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="music.html">Music</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="contact.html" class="nav-mobile-cta">Hire Me</a></li>
    </ul>
  </div>
</nav>
`;

/* ── SHARED FOOTER TEMPLATE ───────────────────────────────── */
const _FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-inner">

      <!-- Brand column -->
      <div class="footer-brand">
        <div class="footer-logo display">Rafael<span>.</span></div>
        <p class="footer-tagline">
          Product manager, game developer, creative director, and AI builder —
          building things that matter.
        </p>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="LinkedIn">💼</a>
          <a href="#" class="social-link" aria-label="GitHub">🐙</a>
          <a href="#" class="social-link" aria-label="Twitter / X">🐦</a>
          <a href="#" class="social-link" aria-label="Instagram">📸</a>
        </div>
      </div>

      <!-- Navigation column -->
      <div>
        <p class="footer-col-title">Navigation</p>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="music.html">My Music</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>

      <!-- Contact column -->
      <div>
        <p class="footer-col-title">Get in Touch</p>
        <a href="mailto:hello@rafaelm.com" class="footer-contact-item">
          <span class="icon">✉️</span>
          hello@rafaelm.com
        </a>
        <a href="tel:+14015550100" class="footer-contact-item">
          <span class="icon">📞</span>
          (401) 555-0100
        </a>
        <div class="footer-contact-item">
          <span class="icon">📍</span>
          East Greenwich, Rhode Island
        </div>
        <a href="contact.html" class="btn btn-primary footer-hire-btn">
          Hire Me ✦
        </a>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <span>© 2025 Rafael L. Muñoz. All rights reserved.</span>
      <span>Designed &amp; Built with ✦ by Rafael</span>
    </div>
  </div>
</footer>
`;


/* ============================================================
   INIT — runs once the DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. INJECT SHARED COMPONENTS ─────────────────────────── */
  const navSlot    = document.getElementById('site-nav');
  const footerSlot = document.getElementById('site-footer');
  if (navSlot)    navSlot.outerHTML    = _NAV_HTML;
  if (footerSlot) footerSlot.outerHTML = _FOOTER_HTML;


  /* ── 1. SCROLLED NAV BACKGROUND ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }


  /* ── 2. MOBILE HAMBURGER TOGGLE ──────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));

      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    // Close drawer when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(b => {
          b.style.transform = ''; b.style.opacity = '';
        });
      });
    });
  }


  /* ── 3. ACTIVE NAV LINK (by current page filename) ─────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    // Strip any hash from href before comparing
    const hrefBase = href ? href.split('#')[0] : '';
    if (
      hrefBase === currentPage ||
      (currentPage === '' && hrefBase === 'index.html')
    ) {
      link.classList.add('active');
      if (link.closest('.nav-links')) {
        link.setAttribute('aria-current', 'page');
      }
    }
  });


  /* ── 4. SMOOTH SCROLL FOR IN-PAGE ANCHORS ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const nav    = document.getElementById('navbar');
        const offset = nav ? nav.offsetHeight + 16 : 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. INTERSECTION OBSERVER — REVEAL ANIMATIONS ──────────── */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => revealObserver.observe(el));
  }


  /* ── 6. ROTATING TAGLINE (index.html only) ─────────────────── */
  const rotatingEl = document.querySelector('.rotating-text');
  if (rotatingEl) {
    const roles = [
      'Product Manager',
      'Game Developer',
      'Creative Director',
      'AI Builder',
      'Brand Strategist',
    ];
    let idx = 0;

    const typewrite = (text, el, cb) => {
      el.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        el.textContent += text[i++];
        if (i === text.length) { clearInterval(t); setTimeout(cb, 2000); }
      }, 60);
    };

    const erase = (el, cb) => {
      const t = setInterval(() => {
        el.textContent = el.textContent.slice(0, -1);
        if (!el.textContent.length) { clearInterval(t); cb(); }
      }, 35);
    };

    const cycle = () => {
      typewrite(roles[idx], rotatingEl, () => {
        erase(rotatingEl, () => {
          idx = (idx + 1) % roles.length;
          setTimeout(cycle, 300);
        });
      });
    };

    cycle();
  }

}); // end DOMContentLoaded

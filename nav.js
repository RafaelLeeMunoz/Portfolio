/* ============================================================
   nav.js — Navigation + global interactions for all pages
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLLED NAV BACKGROUND ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. MOBILE HAMBURGER TOGGLE ──────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Animate bars
      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => {
          b.style.transform = ''; b.style.opacity = '';
        });
      });
    });
  }

  /* ── 3. ACTIVE NAV LINK (by current page) ─────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. SMOOTH SCROLL FOR IN-PAGE ANCHORS ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 5. INTERSECTION OBSERVER — REVEAL ANIMATIONS ─────────── */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  }

  /* ── 6. ROTATING TAGLINE TEXT ─────────────────────────────── */
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
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i === text.length) { clearInterval(interval); setTimeout(cb, 2000); }
      }, 60);
    };

    const erase = (el, cb) => {
      const interval = setInterval(() => {
        el.textContent = el.textContent.slice(0, -1);
        if (!el.textContent.length) { clearInterval(interval); cb(); }
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

});

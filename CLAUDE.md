# Rafael L. Muñoz — Portfolio Site

Personal portfolio for Rafael L. Muñoz: product manager, game developer, creative director and AI builder, based in East Greenwich, Rhode Island.

- **Live site:** https://rafaelleemunoz.github.io/Portfolio/
- **Repo:** https://github.com/RafaelLeeMunoz/Portfolio
- **Hosting:** GitHub Pages, served straight from the `main` branch. There's no build step: **anything pushed to `main` is live within a minute or two.**

## Working rules

- **Always ask before `git push`.** A push publishes to the live site. Committing locally is fine once a change is done and checked.
- Work directly on `main` (that's how this repo has always worked). No feature branches unless Rafael asks for one.
- **Check every visual change in a browser before committing**, at desktop width and at phone width (~375px). Most past fixes were layout and spacing problems that only show up at a specific width.
- Keep it plain HTML, CSS and JavaScript. Don't add frameworks, build tools, npm or CDN libraries unless asked.
- **Never make up content.** Don't invent projects, stats, dates, quotes or links. Several placeholders are still on the site (see below), and the direction of the work has been to *replace* fake content with real content, not to add more.
- Prefer real assets (photos, logos, graphics) over emoji placeholders when Rafael supplies them.

### Commit messages

Follow the existing style: `Page or area: what changed` in plain words, present tense, no trailing period. Examples from the history:

- `About page: fix low-contrast location text on experience cards`
- `Blog listing: merge meta row and Read Article onto one line`
- `Music player: show real track duration immediately, not just while playing`

One focused change per commit.

### Code comments

Existing comments explain **why** something is done, especially workarounds (for example, why `.btn-outline` uses an inset box-shadow instead of a border, or why `.nav-mobile-cta` needs `!important`). Keep that habit: when a fix is non-obvious, leave a short comment saying what problem it solves.

## Running it locally

Opening the `.html` files directly works for most things. For a closer match to GitHub Pages, serve the folder (for example with VS Code's Live Server, or any static server) and open `index.html`.

## File structure

Everything sits flat in the repo root. There are no subfolders, and images, audio and pages all live side by side.

| Page | What it is |
|---|---|
| `index.html` | Home: hero with rotating tagline, stats and credential pills; Featured Projects; About preview; Skills cards; **Latest Tracks** music player |
| `about.html` | Full story: experience cards, certifications, tools grid, AI & Innovation bullets with promo thumbnails, core values |
| `projects.html` | Filterable project grid (All / Games / Apps / AI / Brands / Craft). Currently one real project: CCCRI |
| `cccri.html` | Long case study: Chinese Christian Church of Rhode Island website redesign. Uses `nav.js` but **not** `styles.css` (see below) |
| `blog.html` | Blog listing: featured post, post list, sidebar (newsletter, topics, popular posts, author) |
| `blog-ai-adoption-framework.html` | Article: *Beyond the Tool: Designing a Practical Framework for Responsible AI Adoption* |
| `blog-promotion-system.html` | Article: *Beyond AI-Generated Posts: Designing a Promotion System Around One Source of Truth* |
| `contact.html` | "Hire Me": service checkboxes, contact form, info cards, FAQ |

### Shared pieces

- **`styles.css`** is the single source of truth for design tokens and shared components (buttons, cards, nav, footer, hero, page-hero, reveal animations, breakpoints). It also loads the Google Fonts.
- **`cccri.html` doesn't load `styles.css`.** Its own hero and card classes share names with the homepage's (`.hero-eyebrow`, `.hero-visual`, …) and would clash. It has its own copy of the design tokens, plus nav and footer rules copied from `styles.css`. **If you change the shared nav or footer styling, copy the change into `cccri.html` too.** Future case-study pages should follow the same pattern.
- **`nav.js`** injects the shared nav and footer and runs the shared behavior. Every page, including `cccri.html`, needs:
  ```html
  <div id="site-nav"></div>      <!-- top of <body> -->
  <div id="site-footer"></div>   <!-- bottom of <body> -->
  <script src="nav.js"></script>  <!-- before any page-specific script -->
  ```
  A page that isn't in the menu can highlight its parent section with `<body data-nav-page="projects.html">` (`cccri.html` does this). `nav.js` also handles the scrolled-nav background, the mobile hamburger drawer, the active nav link (matched by filename), smooth scrolling for `#anchor` links, `data-reveal` scroll animations and the homepage typewriter tagline. **To change nav or footer links, edit `nav.js` once.** Don't edit them per page.
- **Page-specific CSS** lives in a `<style>` block in that page's `<head>`. Put a style in `styles.css` only if more than one page uses it.

### Adding a new page

Copy the head (charset, viewport, `<title>Page — Rafael L. Muñoz</title>`, font preconnects, `styles.css`) and the nav/footer placeholders from an existing page such as `projects.html`. Inner pages open with a `.page-hero` block. If it belongs in the menu, add it to **both** the desktop and mobile lists, and to the footer, in `nav.js`.

### Adding a blog post

1. Copy `blog-promotion-system.html` as the template (article hero, back link, meta row, hero image, `.prose-container.prose` body).
2. Name it `blog-<short-slug>.html`, and add a `<meta name="description">`.
3. Add a card for it to `blog.html`: the newest post becomes `.post-featured` and the previous featured one moves into `.post-list` as a `.post-row`.
4. Images go in the root as `<slug>-hero.jpg` / `<slug>-thumb.jpg`.

### Adding a project

Add an `<article class="p-card" data-cat="games|apps|ai|brands|craft">` to `projects.html`. `span2` makes a card double width. Long write-ups get their own case-study page like `cccri.html`.

## Design system

Dark "cosmic" theme: deep navy/violet gradient background with a noise overlay, glass cards, and pink → violet gradient buttons.

- **Colors** (CSS variables in `styles.css`): `--accent-pink #f0196e`, `--accent-cyan #00e5ff`, `--accent-violet #9b59fc`, `--accent-gold #ffd166`; text `--text-primary`, `--text-muted`, `--text-dim`. Always use the variables, never new hex values.
- **Fonts:** `Syne` for display text (headings, labels, buttons; class `.display`) and `DM Sans` for body text.
- **Spacing and shape:** `--sp-xs`…`--sp-xl`, `--radius-sm`…`--radius-xl`, `--transition`.
- **Category colors:** Games = pink, Apps = cyan, Brands = violet, AI = gold (`.tag-games`, `.tag-apps`, `.tag-brands`, `.tag-ai`).
- **Breakpoints:** `900px` (tablet: nav becomes the hamburger, grids drop to 2 columns) and `600px` (phone: single column).
- **Scroll animation:** add `data-reveal` (optionally `="left"` / `="right"`) and `data-delay="1"`–`"5"`.
- Respect `prefers-reduced-motion` for any new animation, the way the existing ones do.

## Music player (homepage)

The five `track-*.mp3` files are Rafael's own tracks made with Suno AI. They aren't on Spotify or any streaming service, so the site uses a native `<audio>` player on purpose. Each `.track-row` has a `data-src`, only one track plays at a time, durations load from metadata, and the wave bars animate only while something is playing. To add a track, add a `.track-row` with the same markup.

## Fix list

Problems found in the Nov 2026 review, in priority order. Work through them one at a time, one commit each, and tick them off here as they're done. Anything needing real content (links, emails, projects, wording) waits until Rafael supplies it. Never fill it in with made-up text.

- [ ] **2. Make the contact form actually send.** It validates, then shows "Message Sent!" without delivering anything. Needs a form service (Formspree, etc.) or a `mailto:` fallback. Rafael chooses which.
- [ ] **3. Replace the placeholder contact details** in the footer (`nav.js`) and `contact.html`: `hello@rafaelm.com`, the 555 phone number, the social links (`href="#"`) and the made-up handles. The only real link so far is LinkedIn: https://www.linkedin.com/in/rafaelleemunoz/ (used on `about.html`). Rafael supplies the rest.
- [ ] **4. Replace the homepage Featured Projects.** "Neon Frontier", "FlowTrack PM", "Lumière Studio" and "NarratorAI" are sample cards with emoji thumbnails. Swap in real projects (CCCRI, the blog work) or remove them.
- [ ] **5. Clean up the blog listing.** The last 5 rows in `.post-list` (2024 dates) and every "Popular Posts" link are placeholders with no article behind them.
- [ ] **6. Connect or remove the newsletter signup** on `blog.html`. It currently does nothing.
- [ ] **7. Update the contact page availability line:** "Taking on select engagements starting Q1 2025" is out of date. Needs Rafael's new wording.
- [ ] **8. (Tidy-up) Replace the inline `style` on the `<em>` accent** in each `.page-hero-title` with a shared class.

Done:
- [x] Footer copyright year: `nav.js` now prints the current year automatically.
- [x] **1. Broken links on `cccri.html`.** It now uses the shared `nav.js` nav and footer, the breadcrumb and call-to-action links point to the right pages, and the "Next Project: FlowTrack PM" strip (a placeholder project with no page) was removed.

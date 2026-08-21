# MEMEMAN.EXE — $MEMEMAN

Static site for the **Meme Man ($MEMEMAN)** launch on pump.fun.

**Concept:** Meme Man's origin genuinely has no recorded date — the only account of where
the model came from is "a wonky attempt at a human head posted on 4chan's 3DCG board long
ago." The first time anyone documented him was 9 August 2014. So the site is built on that
gap: there is no recorded day on which he wasn't already there, and he isn't going
anywhere. It's his desktop — boot screen, imageboard post, surveillance wall, uptime log.

**All dates on the site are sourced** from Meme Man's
[Know Your Meme entry](https://knowyourmeme.com/memes/meme-man) (and the linked
[Stonks](https://knowyourmeme.com/memes/stonks) entry). Where the record has no date, the
site says "unknown" rather than inventing one — including the 50 meme templates, which
carry no year labels because their first-appearance dates aren't verified here.

No build step, no dependencies, no framework. Open `index.html` and it runs.

---

## Fill this in at launch

Everything you need to update lives in **one object** at the top of `js/main.js`:

```js
const CONFIG = {
  ca:   "",   // contract address — appears in the hero + Properties, powers the COPY button
  pump: "",   // pump.fun coin URL — every "BUY" button opens it
  x:    "",   // X / Twitter
  tg:   "",   // Telegram
  dex:  ""    // chart (dexscreener etc.)
};
```

Leave a value empty and the site says *"goes live at launch"* instead of linking somewhere
broken. Fill it in and every button, footer link and start-menu entry wires itself up.

---

## The wallpaper

Bliss is the background for the **whole page**, not just the hero: `#desk` is
`position:fixed`, so the wallpaper stays put while every section scrolls over it — the XP
desktop metaphor, with each section as a window on top. (It deliberately avoids
`background-attachment: fixed`, which iOS Safari mishandles.)

It carries a **68% dim**, which is not arbitrary: it's the level at which every piece of
text sitting directly on the desktop clears WCAG AA against the brightest cloud in the
frame. Two places opt out — the footer paints its own darker plate so its small print can
stay recessive, and `#seen` / `#next` keep local overlays so the surveillance and forecast
sections stay dark. If you want more or less Bliss, the single knob is the `.68` in
`#desk`; anything past ~0.60 starts failing the section-header contrast.

## Structure

```
index.html                 the whole page
css/style.css              design system + all sections (numbered map at the top)
js/main.js                 CONFIG + boot, wall, wizard, taskbar, etc.
public/
  video.mp4                hero footage (yours)
  images/headnobg*.png     original head renders (yours, untouched)
  images/memes/*.jpg       50 meme templates (yours)
  images/opt/              generated: resized heads, video poster, tab icon
  favicon.png  og.jpg      generated: tab icon + social share card
```

The `public/images/opt/` files and `og.jpg` / `favicon.png` were generated from your
originals to cut the page weight (heads went 3.9 MB → 1.35 MB). Originals are untouched.

## Sections

| # | Section | What it is |
|---|---------|-----------|
| — | Boot | BIOS POST screen. Runs once per tab, click to skip. |
| 01 | Hero | The CRT feed in a Media Player window + supply/cashback/launchpad stats + CA copy. |
| 02 | The Origin | A 4chan `/mm/` thread. Greentext lore built on the real record — undated 3DCG-board origin, first sighting 09/08/14 — plus a `No.1000000000` GET. |
| 03 | I've Seen It All | All 50 templates as CCTV feeds on three scrolling rows, a joke counter (labelled as one), and an observation log of documented events only — the first line has no timestamp because the record has none. **His head follows your cursor.** |
| 04 | Uptime Log | The documented timeline: undated origin → 2014 → 2015 → 2016 → 2017 (STONKS) → 2018 → 2019 → 2026. Four head renders as evidence. |
| 05 | Properties | Tokenomics as a Windows Properties dialog: General / Distribution / Security tabs, disk-usage pie at 100% full. |
| 06 | Setup | How to buy, as a four-step install wizard with working Back/Next. |
| — | Forecast | The looming low-angle head, the empty `CAM 51` slot waiting for the next meme. |
| 07 | Help | FAQ as a Windows help dialog. |

Plus a persistent **taskbar**: Start menu, live window buttons that track your scroll
position, clock, and a CRT-filter toggle in the system tray.

### Easter eggs
- Every window's ✕ button refuses to close.
- Start → Shut Down… refuses too.
- Konami code (↑↑↓↓←→←→BA) makes him blink.
- The tray eye blinks on its own every few seconds.

## Deploying

It's a plain static site — serve the repo root.

```bash
npx serve .
```

- **Vercel / Netlify:** framework preset "Other", build command empty, output directory `.`
- **GitHub Pages:** push and serve from the branch root
- **Cloudflare Pages:** build command empty, output directory `/`

Update `og:image` / `twitter:image` in `index.html` to an absolute URL
(`https://yourdomain.com/public/og.jpg`) once the domain is live — some platforms won't
resolve the relative path when generating link previews.

## Notes
- Responsive down to 360px; the wall, wizard and taskbar all adapt.
- Respects `prefers-reduced-motion`: boot is skipped, marquees and parallax stop.
- On touch devices Meme Man scans the room by himself instead of following a cursor.
- Disclaimer copy in the footer and the Security tab is deliberate — it's a meme coin with
  no utility or roadmap, and the site says so.
- The footer credits Know Your Meme as the source and notes the site is an unaffiliated fan
  project. Keep that line if you fork the copy.

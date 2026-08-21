/* ============================================================
   MEMEMAN.EXE — main.js
   ------------------------------------------------------------
   >>> EDIT THIS BLOCK AT LAUNCH <<<
   Paste the contract address and links once the coin is live.
   Leave a value as "" and the site politely says "at launch".
   ============================================================ */
const CONFIG = {
  ca:   "",                                   // e.g. "7xKq...pump"
  pump: "",                                   // e.g. "https://pump.fun/coin/7xKq...pump"
  x:    "",                                   // e.g. "https://x.com/mememancoin"
  tg:   "",                                   // e.g. "https://t.me/mememan"
  dex:  ""                                    // e.g. "https://dexscreener.com/solana/..."
};

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = (n, l = 2) => String(n).padStart(l, "0");
const nfmt = n => n.toLocaleString("en-US");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- toast ---------- */
let toastT;
function toast(msg, title = "MEMEMAN.EXE", ico = "i") {
  const t = $("#toast");
  $("#toast-msg").textContent = msg;
  $("#toast-title").textContent = title;
  $("#toast-ico").textContent = ico;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 3600);
}

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
const BOOT = [
  ['<span class="hdr">MEMEMAN BIOS v1.00   (C) THE WATCHER</span>', 60],
  ["", 20],
  ["Main Processor .......... IMPACT FONT @ 486 MHz", 90],
  ["Memory Test ............. 1,000,000,000 MEMES <span class='ok'>OK</span>", 110],
  ["Detecting IDE drives .... C: ARCHIVE (0 gaps, no start date)", 110],
  ["", 20],
  ["Restoring previous session ...", 200],
  ['<span class="warn">WARNING: MEMEMAN.EXE has no recorded start time.</span>', 200],
  ['<span class="warn">WARNING: first log entry 09/08/2014. process predates its own log.</span>', 230],
  ["", 20],
  ["Loading observation log ..... <span class='ok'>DONE</span>", 130],
  ["Loading 50 camera feeds ..... <span class='ok'>DONE</span>", 130],
  ["Loading you ................. <span class='ok'>DONE</span>", 220],
  ["", 30],
  ['<b>he sees you.</b>', 340]
];

function boot() {
  const el = $("#boot"), out = $("#bootlines");
  const finish = () => {
    if (el.classList.contains("done")) return;
    el.classList.add("done");
    sessionStorage.setItem("mm_booted", "1");
    setTimeout(() => el.remove(), 700);
  };

  if (sessionStorage.getItem("mm_booted") || reduced) { el.remove(); return; }

  document.documentElement.style.overflow = "hidden";
  el.addEventListener("click", () => { document.documentElement.style.overflow = ""; finish(); });

  let i = 0;
  const step = () => {
    if (el.classList.contains("done")) return;
    if (i >= BOOT.length) {
      document.documentElement.style.overflow = "";
      setTimeout(finish, 320);
      return;
    }
    const [txt, d] = BOOT[i++];
    out.insertAdjacentHTML("beforeend", txt + '<span class="cur"></span>\n');
    const curs = $$(".cur", out);
    curs.slice(0, -1).forEach(c => c.remove());
    setTimeout(step, d);
  };
  step();
}

/* ============================================================
   TICKER
   ============================================================ */
function ticker() {
  const items = [
    "1,000,000,000 SUPPLY", "CASHBACK ENABLED", "LAUNCHING ON PUMP.FUN",
    "ORIGIN: 4CHAN /3/", "NO DATE ON RECORD", "FIRST LOGGED 09.08.2014",
    "STONKS SINCE 2017", "HE HAS SEEN IT ALL", "HE IS NOT GOING ANYWHERE",
    "NO ROADMAP", "NO UTILITY", "NO TEAM BAGS", "SOLANA", "THE OG HEAD"
  ];
  const set = items.map(t => `<b>◆ ${t} <i>·</i></b>`).join("");
  $("#ticker").innerHTML = set + set;
}

/* ============================================================
   THE WALL — 50 feeds
   ============================================================ */
/* 50 templates. Deliberately no dates: the exact first-appearance year of each
   of these is not something this page can verify, so it doesn't claim one. */
const MEMES = [
  "01_Drake_Hotline_Bling", "02_Two_Buttons", "03_Distracted_Boyfriend",
  "04_Bernie_Asking_For_Support", "05_UNO_Draw_25_Cards", "06_Left_Exit_12_Off_Ramp",
  "07_Always_Has_Been", "08_Anakin_Padme_4_Panel", "09_Epic_Handshake",
  "10_Running_Away_Balloon", "11_Sad_Pablo_Escobar", "12_Grus_Plan",
  "13_Waiting_Skeleton", "14_Change_My_Mind", "15_Disaster_Girl",
  "16_Trade_Offer", "17_Bernie_Once_Again_Asking", "18_Marked_Safe_From",
  "19_Yall_Got_Any_More_Of_That", "20_Ancient_Aliens", "21_X_X_Everywhere",
  "22_Batman_Slapping_Robin", "23_One_Does_Not_Simply", "24_Mocking_Spongebob",
  "25_Bike_Fall", "26_Woman_Yelling_At_Cat", "27_Is_This_A_Pigeon",
  "28_0_days_without", "29_You_Guys_are_Getting_Paid", "30_Theyre_The_Same_Picture",
  "31_Mother_Ignoring_Kid_Drowning", "32_Absolute_Cinema", "33_Expanding_Brain",
  "34_Squidward_window", "35_Tuxedo_Winnie_The_Pooh", "36_This_Is_Where_Id_Put_My_Trophy",
  "37_Megamind_peeking", "38_Buff_Doge_vs_Cheems", "39_Oprah_You_Get_A",
  "40_This_Is_Fine", "41_where_monkey", "42_Bell_Curve",
  "43_Hes_Thinking_About_Other_Women", "44_Pawn_Stars_Best_I_Can_Do", "45_Clown_Applying_Makeup",
  "46_Soldier_protecting_sleeping_child", "47_Spider_Man_Triple", "48_They_dont_know",
  "49_Monkey_Puppet", "50_Friendship_ended"
];

const pretty = f => f.replace(/^\d+_/, "").replace(/_/g, " ").replace(/\bId\b/, "I'd")
                     .replace(/\bTheyre\b/, "They're").replace(/\bYall\b/, "Y'all")
                     .replace(/\bHes\b/, "He's").replace(/\bdont\b/, "don't")
                     .replace(/\bGrus\b/, "Gru's").toUpperCase();

function wall() {
  const rows = $$(".wall__row");
  const chunk = Math.ceil(MEMES.length / rows.length);

  rows.forEach((row, ri) => {
    const slice = MEMES.slice(ri * chunk, (ri + 1) * chunk);
    const html = slice.map((file, i) => {
      const n = pad(ri * chunk + i + 1);
      return `<figure class="cam">
        <span class="cam__id">CAM ${n}</span>
        <img src="public/images/memes/${file}.jpg" alt="${pretty(file)} meme template" loading="lazy" decoding="async">
        <span class="cam__yr">◉ REC</span>
        <figcaption class="cam__tag">&gt; STILL WATCHING<br>${pretty(file)}</figcaption>
      </figure>`;
    }).join("");
    row.innerHTML = html + html;          // duplicated for a seamless loop
  });

  if (reduced) return;

  /* marquee driven by rAF, nudged by scroll velocity */
  const state = rows.map((row, i) => ({
    row,
    x: 0,
    dir: Number(row.dataset.dir),
    base: 0.30 + i * 0.06,
    w: 0
  }));
  const GAP = 12;
  const measure = () => state.forEach(s => {
    const prevW = s.w;
    s.w = (s.row.scrollWidth + GAP) / 2;      // one full set, gap included
    if (!prevW && s.dir < 0) s.x = -s.w;      // reversed rows start a set back
    else if (prevW) s.x = (s.x / prevW) * s.w; // keep relative position on resize
  });
  measure();
  addEventListener("resize", measure);
  // re-measure once images have decoded
  addEventListener("load", measure);
  setTimeout(measure, 1200);

  let boost = 0, lastY = scrollY, running = true;
  addEventListener("scroll", () => {
    boost = Math.min(6, boost + Math.abs(scrollY - lastY) * 0.055);
    lastY = scrollY;
  }, { passive: true });

  const wallEl = $("#wall");
  new IntersectionObserver(e => { running = e[0].isIntersecting; },
    { rootMargin: "200px" }).observe(wallEl);

  let prev = performance.now();
  (function tick(now) {
    const dt = Math.min(50, now - prev); prev = now;
    boost *= 0.94;
    if (running) {
      state.forEach(s => {
        if (!s.w) return;
        s.x -= s.dir * (s.base + boost) * (dt / 16.67);
        if (s.x <= -s.w) s.x += s.w;
        if (s.x >= 0) s.x -= s.w;
        s.row.style.transform = `translate3d(${s.x}px,0,0)`;
      });
    }
    requestAnimationFrame(tick);
  })(prev);
}

/* ---------- the watcher follows you ---------- */
function watcher() {
  const box = $("#watcher"), img = $("#head-a");
  const HEADS = {
    l: "public/images/opt/head-left.png",
    c: "public/images/opt/head-front.png",
    r: "public/images/opt/head-right.png"
  };
  Object.values(HEADS).forEach(src => { const p = new Image(); p.src = src; });

  let cur = "c";
  const set = k => { if (k !== cur) { cur = k; img.src = HEADS[k]; } };

  if (matchMedia("(hover: hover)").matches && !reduced) {
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    addEventListener("mousemove", e => {
      const nx = (e.clientX / innerWidth) * 2 - 1;   // -1 .. 1
      const ny = (e.clientY / innerHeight) * 2 - 1;
      set(nx < -0.22 ? "l" : nx > 0.22 ? "r" : "c");
      tx = nx * 26; ty = ny * 14;
      if (!raf) raf = requestAnimationFrame(function loop() {
        x += (tx - x) * 0.08; y += (ty - y) * 0.08;
        box.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        raf = (Math.abs(tx - x) > .3 || Math.abs(ty - y) > .3) ? requestAnimationFrame(loop) : 0;
      });
    }, { passive: true });
  } else if (!reduced) {
    /* touch: he scans the room by himself */
    const order = ["c", "r", "c", "l"];
    let i = 0;
    setInterval(() => set(order[i++ % order.length]), 2600);
  }
}

/* ---------- counter ---------- */
function counter() {
  const el = $("#counter"), START = 1842905331;
  let shown = 0, live = START, started = false;

  new IntersectionObserver((e, o) => {
    if (!e[0].isIntersecting || started) return;
    started = true; o.disconnect();
    const t0 = performance.now(), DUR = 2200;
    (function run(now) {
      const p = Math.min(1, (now - t0) / DUR);
      shown = Math.floor(START * (1 - Math.pow(1 - p, 3)));
      el.textContent = nfmt(shown);
      if (p < 1) requestAnimationFrame(run);
      else setInterval(() => {
        live += Math.floor(Math.random() * 9) + 2;
        el.textContent = nfmt(live);
      }, 700);
    })(t0);
  }, { threshold: .3 }).observe(el);
}

/* ---------- observation log ---------- */
/* Only events that are actually documented on Meme Man's Know Your Meme entry.
   The first line has no timestamp because the record genuinely has none. */
const LOG = [
  ["    ??  ??  ??    ", "4chan /3/ — \"a wonky attempt at a human head\"", 2],
  ["2014-08-09", "special_meme_fresh_profile.jpg — FIRST RECORD", 1],
  ["2015-10-24", "four_panel_comic.jpg — 2,000+ likes"],
  ["2016-03-04", "ukip_parody.jpg — r/Braveryjerk"],
  ["2016-09-17", "r/MemeMan — subreddit founded"],
  ["2017-06-05", "STONKS.jpg — 3,600+ likes", 1],
  ["2017-07-··", "r/Ooer repost — 400+ points"],
  ["2017-10-25", "urbandictionary.com/meme_man — defined"],
  ["2018-02-··", "hallucinatorymenu_audio.mp3 — 19,000+ views"],
  ["2018-03-··", "imgur_stonks_edit.jpg — 131,000+ views"],
  ["2019-06-··", "32_weird_stonks_memes_on_the_rise.html"],
  ["    ??  ??  ??    ", "shef.jpg / tehc.jpg / helth.jpg — vocabulary expands"],
  ["    ??  ??  ??    ", "enslaved_moisture.jpg — surreal memes"],
  ["2026-08-21", "$MEMEMAN — SELF DETECTED", 2]
];

function logstream() {
  const box = $("#log");
  let i = 0, timer;
  const push = () => {
    const [t, f, flag] = LOG[i++ % LOG.length];
    const cls = flag === 2 ? "w" : "";
    const verb = flag === 2 ? "&gt;&gt; " : "OBSERVED: ";
    box.insertAdjacentHTML("beforeend",
      `<div><span class="t">[${t}]</span> ${verb}<span class="${cls}">${f}</span></div>`);
    while (box.children.length > 9) box.firstElementChild.remove();
  };
  for (let k = 0; k < 8; k++) push();
  new IntersectionObserver(e => {
    clearInterval(timer);
    if (e[0].isIntersecting && !reduced) timer = setInterval(push, 1400);
  }, { rootMargin: "80px" }).observe(box);
}

/* ============================================================
   PROPERTIES — tabs + pie
   ============================================================ */
function tabs() {
  const list = $$(".tab");
  list.forEach(tab => tab.addEventListener("click", () => {
    list.forEach(t => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
  }));

  /* animate the "disk usage" pie to 100% */
  const pie = $("#pie");
  new IntersectionObserver((e, o) => {
    if (!e[0].isIntersecting) return;
    o.disconnect();
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + 3);
      pie.style.setProperty("--p", p + "%");
      if (p >= 100) clearInterval(id);
    }, 22);
  }, { threshold: .4 }).observe(pie);
}

/* ============================================================
   SETUP WIZARD
   ============================================================ */
const STEPS = [
  {
    h: "Step 1 — Install a wallet",
    body: `<p>You need a Solana wallet. He recommends nothing, he only observes — but everybody uses one of these:</p>
      <ul>
        <li><a href="https://phantom.app" target="_blank" rel="noopener noreferrer">Phantom</a> — browser extension or phone app</li>
        <li><a href="https://solflare.com" target="_blank" rel="noopener noreferrer">Solflare</a> — same idea, different logo</li>
      </ul>
      <p style="margin-top:10px">Write your seed phrase on paper. Never type it into anything. He has watched a lot of people learn this the hard way.</p>`
  },
  {
    h: "Step 2 — Put SOL in it",
    body: `<p>Buy SOL on any exchange and send it to your new wallet address, or use the wallet's built-in buy button.</p>
      <ul>
        <li>Keep a little extra for network fees — they are fractions of a cent</li>
        <li>Only send what you would be fine setting on fire</li>
      </ul>`
  },
  {
    h: "Step 3 — Find the real one",
    body: `<p>Open <b>pump.fun</b> and search <b>$MEMEMAN</b>, or use the official link below. Then check the contract address matches the one on this page and on the official X account.</p>
      <ul>
        <li>There will be fakes. There are always fakes.</li>
        <li>He has watched this happen to a lot of people. Verify the CA.</li>
      </ul>`
  },
  {
    h: "Step 4 — Swap",
    body: `<p>Connect your wallet, enter an amount, confirm the transaction. That's it — you're holding the oldest head on the internet.</p>
      <ul>
        <li>Supply: 1,000,000,000 · fixed</li>
        <li>Cashback: enabled on the pump.fun launch config</li>
        <li>Roadmap: none. Utility: none. Witness: permanent.</li>
      </ul>`
  },
  {
    h: "Setup complete.",
    done: true,
    body: `<div class="wiz__done">
        <img src="public/images/opt/head-front.png" alt="">
        <div>
          <p style="font-size:14px;line-height:1.6"><b>MEMEMAN.EXE has been installed on your wallet.</b><br>
          There is no uninstaller. There was never an installer either.</p>
        </div>
      </div>
      <div style="margin-top:6px"><a class="btn btn--go" href="#" data-buy>▶ OPEN PUMP.FUN</a></div>`
  }
];

function wizard() {
  const c = $("#wiz-content"), back = $("#wiz-back"), next = $("#wiz-next"),
        prog = $("#wiz-prog"), steps = $$("#wiz-steps li");
  let i = 0;

  const render = () => {
    const s = STEPS[i];
    c.innerHTML = `<h3 class="wiz__h">${s.h}</h3><div class="wiz__p">${s.body}</div>`;
    back.disabled = i === 0;
    next.disabled = i === STEPS.length - 1;
    next.textContent = i === STEPS.length - 2 ? "Finish" : "Next >";
    prog.textContent = s.done ? "Done" : `Step ${i + 1} of 4`;
    steps.forEach((li, n) => li.classList.toggle("on", n === Math.min(i, 3)));
  };

  next.addEventListener("click", () => { if (i < STEPS.length - 1) { i++; render(); } });
  back.addEventListener("click", () => { if (i > 0) { i--; render(); } });
  render();
}

/* ============================================================
   FAQ
   ============================================================ */
const FAQ = [
  ["Who is Meme Man, actually?",
   `A grey 3D rendering of a human head that became the mascot of the Facebook page
    <b>Special meme fresh</b>, and one of the defining characters of surreal memes.
    Per that page's own account, the model came from <i>"a wonky attempt at a human head
    posted on 4chan's 3DCG board long ago"</i> — no creator, no software, no date was ever
    recorded. The earliest known appearance of him anywhere is
    <b>9 August 2014</b>, as Special meme fresh's profile photo.
    <a href="https://knowyourmeme.com/memes/meme-man" target="_blank" rel="noopener noreferrer">Source: Know Your Meme</a>.`],
  ["So when was he actually made?",
   `Nobody knows, and that's the honest answer. The only origin account on record says
    "long ago" and stops there. Every other date on this site is documented — 2014, 2015,
    2016, 2017, 2018, 2019 — but the first one isn't, because it never was. That gap is
    the whole point: there is no recorded day on which Meme Man wasn't already there.`],
  ["What does &quot;he has seen it all&quot; mean?",
   `It's the narrative, built on the one real fact above. Since his origin has no date, there
    is no documented moment before him — so the conceit is that he has been watching the
    whole time, and isn't going anywhere. The wall of 50 templates is that idea rendered
    as 50 camera feeds. Note they carry no dates: this page doesn't claim first-appearance
    years it can't verify.`],
  ["Is he the OG?",
   `In surreal memes, yes — he's one of the genre's defining characters, alongside Mr. Orange
    and the "layers of irony" style. He's not older than the entire internet, and this site
    doesn't say he is. What he is: a head with no birthday who has been in the background
    of internet humour since before anyone bothered writing him down.`],
  ["What is STONKS?",
   `Him, standing in front of a rising stock chart, with one misspelled word underneath.
    Special meme fresh posted it on <b>5 June 2017</b>; it cleared 3,600 likes, spread
    through 2017–2019, and eventually became the way the internet talks about bad financial
    decisions — including on the meme-stock forums. It also spawned <b>Shef</b>, <b>Tehc</b>
    and <b>Helth</b>. He has been commenting on markets for nine years. This is just the
    first time he's had a ticker.`],
  ["What is $MEMEMAN?",
   `A community meme coin on Solana, launching on <b>pump.fun</b>. 1,000,000,000 supply,
    cashback enabled, no team allocation and no roadmap. It exists because the head that
    invented "STONKS" never had a token of his own.`],
  ["What is cashback?",
   `A pump.fun launch setting that routes a share of trading fees back rather than keeping
    all of them. It is enabled for this launch. The exact rate and mechanics are defined by
    pump.fun — check the live coin page for current terms.`],
  ["Is there a team allocation or presale?",
   `No. It's a standard pump.fun fair launch: the entire supply goes onto the bonding curve,
    there is no presale, no vesting, no unlock schedule and no team wallet to dump on you.`],
  ["How do I buy it?",
   `Get a Solana wallet, fund it with SOL, open the official pump.fun link, verify the
    contract address, and swap. The <a href="#buy">setup wizard</a> above walks through it
    in four steps.`],
  ["Where is the contract address?",
   `It appears at the top of this page and in Properties the moment the coin deploys. Until
    then it reads "not deployed yet". Never trust a CA from a DM, a reply guy, or a screenshot.`],
  ["Is this an investment?",
   `No. $MEMEMAN is a meme with no utility and no promise of return. Crypto is extremely
    volatile and you can lose 100% of what you put in. Nothing here is financial advice.`],
  ["Why does this website look like Windows XP?",
   `Because that's the era the internet was posting through when a head with no name started
    showing up on it — and because a machine left running is the right metaphor for something
    with no recorded start time. You can switch the CRT effect off in the system tray.`]
];

function faq() {
  $("#faq").innerHTML = FAQ.map(([q, a], i) => `
    <button class="faq__q" type="button" aria-expanded="false" aria-controls="fa${i}">
      <i>?</i>${q}<span>+</span>
    </button>
    <div class="faq__a" id="fa${i}" hidden>${a}</div>`).join("");

  $$(".faq__q").forEach(b => b.addEventListener("click", () => {
    const open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!open));
    b.querySelector("span").textContent = open ? "+" : "–";
    $("#" + b.getAttribute("aria-controls")).hidden = open;
  }));
}

/* ============================================================
   TASKBAR
   ============================================================ */
function taskbar() {
  const secs = $$("main section[data-task]");
  $("#tasks").innerHTML = secs.map(s =>
    `<button class="task" type="button" data-go="${s.id}"><i></i><span>${s.dataset.task}</span></button>`
  ).join("");

  const btns = $$(".task");
  $("#tasks").addEventListener("click", e => {
    const b = e.target.closest(".task");
    if (b) $("#" + b.dataset.go).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      btns.forEach(b => b.classList.toggle("on", b.dataset.go === en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(s => io.observe(s));

  /* clock */
  const clock = $("#clock");
  const tick = () => {
    const d = new Date();
    let h = d.getHours(); const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    clock.textContent = `${h}:${pad(d.getMinutes())} ${ap}`;
  };
  tick(); setInterval(tick, 15000);

  /* start menu */
  const start = $("#start"), menu = $("#startmenu");
  const setMenu = open => {
    menu.classList.toggle("open", open);
    start.classList.toggle("open", open);
    start.setAttribute("aria-expanded", String(open));
  };
  start.addEventListener("click", e => {
    e.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  });
  document.addEventListener("click", e => {
    if (!menu.contains(e.target)) setMenu(false);
  });
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  $("#sm-shutdown").addEventListener("click", e => {
    e.preventDefault(); setMenu(false);
    toast("He cannot be shut down. He has tried.", "Shut Down", "!");
  });

  /* CRT toggle */
  const crt = $("#crt"), key = "mm_crt";
  if (localStorage.getItem(key) === "off") crt.classList.add("off");
  $("#crt-toggle").addEventListener("click", () => {
    const off = crt.classList.toggle("off");
    localStorage.setItem(key, off ? "off" : "on");
    toast(off ? "CRT filter disabled. He can still see you." : "CRT filter enabled.", "Display Properties");
  });
}

/* ============================================================
   HERO VIDEO PLAYER CHROME
   ============================================================ */
function player() {
  const v = $("#hero-vid"), fill = $("#vid-fill"), time = $("#vid-time"),
        btn = $("#vid-toggle"), stamp = $("#vid-stamp");
  const mmss = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;

  v.addEventListener("timeupdate", () => {
    const d = v.duration || 5;
    fill.style.width = (v.currentTime / d * 100) + "%";
    time.textContent = `${mmss(v.currentTime)} / ${mmss(d)}`;
    const t = v.currentTime;
    stamp.textContent = `CAM 01 — ${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}:${pad(Math.floor((t % 1) * 100))}`;
  });
  btn.addEventListener("click", () => {
    if (v.paused) { v.play(); btn.textContent = "❚❚"; }
    else { v.pause(); btn.textContent = "▶"; }
  });
  v.play().catch(() => { btn.textContent = "▶"; });
}

/* ============================================================
   LINKS, CA, MISC
   ============================================================ */
function links() {
  /* contract address */
  if (CONFIG.ca) {
    $("#ca-text").textContent = CONFIG.ca;
    $("#ca-props").textContent = CONFIG.ca;
  }
  $("#ca-copy").addEventListener("click", async () => {
    if (!CONFIG.ca) return toast("Not deployed yet. The CA lands here the second it does.", "Clipboard", "!");
    try {
      await navigator.clipboard.writeText(CONFIG.ca);
      toast("Contract address copied. Verify it on pump.fun.", "Clipboard", "✓");
    } catch {
      toast("Copy failed — select the address manually.", "Clipboard", "!");
    }
  });

  /* external links */
  const NAMES = { pump: "pump.fun", x: "X / Twitter", tg: "Telegram", dex: "the chart" };
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-link]");
    if (!a) return;
    e.preventDefault();
    const k = a.dataset.link, url = CONFIG[k];
    if (url) window.open(url, "_blank", "noopener");
    else toast(`${NAMES[k]} goes live at launch.`, "MEMEMAN.EXE", "i");
  });

  /* buy buttons */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-buy]");
    if (!b) return;
    if (CONFIG.pump) { e.preventDefault(); window.open(CONFIG.pump, "_blank", "noopener"); return; }
    if (b.getAttribute("href") === "#") {
      e.preventDefault();
      toast("Not live yet. He's waited 29 years — a few more hours is nothing.", "pump.fun", "!");
    }
  });

  /* the close buttons don't close anything */
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-nope]")) return;
    toast("Nobody knows how long this window has been open. It does not close.", "MEMEMAN.EXE", "!");
  });
}

/* hit counter */
function hits() {
  const base = 419737;
  let n = Number(localStorage.getItem("mm_hits") || 0);
  if (!n) { n = base + Math.floor(Math.random() * 900); }
  n += 1;
  localStorage.setItem("mm_hits", String(n));
  $("#hits").innerHTML = pad(n, 8).split("").map(d => `<i>${d}</i>`).join("");
}

/* reveal on scroll */
function reveals() {
  const io = new IntersectionObserver((es, o) => {
    es.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("on");
      o.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
  $$(".rev:not(.on)").forEach(el => io.observe(el));
}

/* smooth in-page nav */
function nav() {
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id === "#" || a.hasAttribute("data-link")) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    $("#startmenu").classList.remove("open");
    $("#start").classList.remove("open");
  });
}

/* konami — he blinks */
function konami() {
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let i = 0;
  addEventListener("keydown", e => {
    i = (e.key === seq[i] || e.key.toLowerCase() === seq[i]) ? i + 1 : 0;
    if (i !== seq.length) return;
    i = 0;
    document.body.style.transition = "filter .12s";
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    setTimeout(() => { document.body.style.filter = ""; }, 420);
    toast("He blinked. That was the first time.", "MEMEMAN.EXE", "◉");
  });
}

/* ---------- go ---------- */
boot();
ticker();
wall();
watcher();
counter();
logstream();
tabs();
wizard();
faq();
taskbar();
player();
links();
hits();
reveals();
nav();
konami();

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Menu, Plus, Search, X, Leaf, Droplets, Sparkles, Snowflake, Truck, Palette } from "lucide-react";
import canMint from "@/assets/can-mint.png";
import canBerry from "@/assets/can-berry.png";
import canLemon from "@/assets/can-lemon.png";
import cliff from "@/assets/cliff.jpg";
import swing from "@/assets/swing.jpg";
import skaters from "@/assets/skaters.jpg";
import friends from "@/assets/friends.jpg";
import graffiti from "@/assets/graffiti.jpg";

const NAV = [
  { id: "why", label: "why to use" },
  { id: "products", label: "products" },
  { id: "how", label: "how to use" },
  { id: "reviews", label: "reviews" },
  { id: "faq", label: "faq" },
  { id: "articles", label: "articles" },
];

/* ---------- decorative svgs ---------- */
const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 5 L61 38 L95 38 L67 58 L78 92 L50 71 L22 92 L33 58 L5 38 L39 38 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);
const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 0 C54 40 60 46 100 50 C60 54 54 60 50 100 C46 60 40 54 0 50 C40 46 46 40 50 0Z" fill="none" stroke="var(--ink)" strokeWidth="3" />
  </svg>
);
const Flower = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
      <ellipse key={r} cx="50" cy="24" rx="11" ry="22" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" transform={`rotate(${r} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="13" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
  </svg>
);
const Eyes = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 70" className={className}>
    {[32, 88].map((x) => (
      <g key={x}>
        <ellipse cx={x} cy="35" rx="24" ry="30" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx={x + 6} cy="40" r="11" fill="var(--ink)" />
      </g>
    ))}
  </svg>
);
const Burst = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 2 L58 30 L84 16 L70 42 L98 50 L70 58 L84 84 L58 70 L50 98 L42 70 L16 84 L30 58 L2 50 L30 42 L16 16 L42 30Z" fill="var(--pink-deep)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

/* ---------- Nav ---------- */
function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:px-6">
      <nav className="pill mx-auto flex max-w-6xl items-center justify-between bg-paper/90 px-3 py-1.5 backdrop-blur">
        <a href="#top" className="flex items-center gap-2 text-sm font-bold">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] text-paper">W</span>
          WOW FUN
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-wide transition-all duration-300 ${
                  active === n.id ? "pill bg-mint-deep" : "border-[1.5px] border-transparent hover:bg-muted"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button aria-label="Search" className="pill grid h-7 w-7 place-items-center transition-transform hover:rotate-12">
            <Search className="h-3.5 w-3.5" />
          </button>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="pill grid h-7 w-7 place-items-center md:hidden">
            <Menu className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-pink p-6 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-8 opacity-0"
        }`}
      >
        <button aria-label="Close" onClick={() => setOpen(false)} className="pill ml-auto grid h-10 w-10 place-items-center">
          <X className="h-5 w-5" />
        </button>
        <ul className="mt-10 space-y-3">
          {NAV.map((n, i) => (
            <li key={n.id} style={{ transitionDelay: `${open ? i * 60 : 0}ms` }} className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="display text-5xl">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <Flower className="spin-slow mt-auto h-24 w-24 self-end" />
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-bg", { opacity: 0, duration: 0.6 })
        .from(".h-word", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.2")
        .from(".h-can", { scale: 0.6, rotate: -30, opacity: 0, duration: 1.2, ease: "back.out(1.4)" }, "-=0.7")
        .from(".h-deco", { scale: 0, rotate: -90, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="top" ref={ref} className="h-bg relative flex min-h-screen items-center overflow-hidden bg-pink pt-20">
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="overflow-hidden">
          <h1 className="h-word display text-[24vw] md:text-[17vw] lg:text-[15rem]">chill</h1>
        </div>
        <div className="flex items-end justify-end gap-6 overflow-hidden">
          <span className="h-word display text-[24vw] text-coral md:text-[17vw] lg:text-[15rem]">&amp;</span>
          <h1 className="h-word display text-[24vw] md:text-[17vw] lg:text-[15rem]">fun</h1>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-can">
            <img src={canBerry} alt="WOW FUN Blueberry can" width={576} height={1152} className="float-slow h-[55vh] w-auto drop-shadow-[var(--shadow-can)]" />
          </div>
        </div>
        <Star className="h-deco wobble absolute right-[18%] top-[2%] h-16 w-16 md:h-24 md:w-24" />
        <Sparkle className="h-deco absolute left-[48%] top-[-6%] h-10 w-10" />
        <Eyes className="h-deco absolute bottom-[12%] left-[6%] h-14 w-24 md:h-20 md:w-36" />
        <Flower className="h-deco spin-slow absolute bottom-[-4%] right-[44%] h-16 w-16" />
        <p className="absolute bottom-[-8%] left-6 max-w-xs text-sm text-muted-foreground md:bottom-auto md:left-auto md:right-6 md:top-[42%]">
          Sparkling botanical drinks for slow afternoons and loud weekends.
        </p>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
function Why() {
  const tags = [
    { t: "relieves stress", c: "bg-coral/60", r: "-rotate-6" },
    { t: "better sleep", c: "bg-mint-deep", r: "rotate-3" },
    { t: "natural flavours", c: "bg-paper", r: "-rotate-3" },
    { t: "improves mood", c: "bg-sun", r: "rotate-6", sq: true },
    { t: "zero sugar", c: "bg-pink-deep", r: "-rotate-2" },
  ];
  return (
    <section id="why" className="relative overflow-hidden bg-paper pt-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="reveal display text-6xl md:text-7xl" style={{ lineHeight: 1 }}>
            Why do people love WOW FUN?
          </h2>
          <p className="reveal mt-6 max-w-md text-muted-foreground">
            Because a drink should feel like a small celebration. We blend real fruit, calming botanicals and a fizz that makes you grin — then wrap it in a can you'll want to keep.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {tags.map((g) => (
              <span key={g.t} className={`reveal pill px-5 py-3 text-xs font-medium ${g.c} ${g.r} ${g.sq ? "rounded-none" : ""}`}>
                {g.t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={cliff} alt="Jumping into the sea at sunset" loading="lazy" width={768} height={960} className="reveal-img ml-auto aspect-[4/5] w-4/5 object-cover" />
          <Flower className="spin-slow absolute -bottom-6 right-[-10px] h-20 w-20" />
        </div>
      </div>
      <div className="mt-20 overflow-hidden border-y-[1.5px] border-ink bg-pink py-4">
        <div className="marquee flex w-max gap-12">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {[
                [Leaf, "Organic ingredients"],
                [Palette, "Stylish design"],
                [Truck, "Free worldwide shipping"],
                [Sparkles, "Zero sugar"],
                [Droplets, "Real fruit"],
              ].map(([I, t], i) => {
                const Icon = I as typeof Leaf;
                return (
                  <span key={i} className="flex items-center gap-3 text-lg font-semibold whitespace-nowrap">
                    <span className="pill grid h-9 w-9 place-items-center bg-coral/60"><Icon className="h-4 w-4" /></span>
                    {t as string}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
const PRODUCTS = [
  { name: "Blueberry Dream", img: canBerry, size: "330 ml", cal: "12 kcal", desc: "Juicy blueberry, a whisper of lavender and soft bubbles that slow the world down.", glow: "var(--pink-deep)" },
  { name: "Mint Lime", img: canMint, size: "330 ml", cal: "9 kcal", desc: "Garden mint and squeezed lime. Cool, bright and dangerously refreshing.", glow: "var(--mint-deep)" },
  { name: "Lemon Zest", img: canLemon, size: "330 ml", cal: "11 kcal", desc: "Sun-ripened lemon with a ginger kick. Like summer in a can.", glow: "var(--sun)" },
];
function Products() {
  const [i, setI] = useState(0);
  const n = PRODUCTS.length;
  const touch = useRef<number | null>(null);
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const p = PRODUCTS[i]!;
  return (
    <section id="products" className="relative overflow-hidden bg-charcoal py-28 text-paper">
      <h2 aria-label="Our products" className="display pointer-events-none select-none text-center text-[17vw] text-charcoal-soft">
        our products
      </h2>
      <div
        className="absolute inset-x-0 top-1/2 mx-auto h-[70vh] w-[70vh] -translate-y-1/3 rounded-full opacity-25 blur-3xl transition-colors duration-700"
        style={{ background: p.glow }}
      />
      <div
        className="relative mx-auto -mt-[8vw] h-[62vh] max-w-6xl"
        onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {PRODUCTS.map((pr, k) => {
          let off = k - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const center = off === 0;
          return (
            <img
              key={pr.name}
              src={pr.img}
              alt={pr.name}
              loading="lazy"
              width={576}
              height={1152}
              onClick={() => !center && go(off)}
              className="absolute left-1/2 top-0 h-full w-auto cursor-pointer drop-shadow-[var(--shadow-can)] transition-all duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)]"
              style={{
                transform: `translateX(calc(-50% + ${off * 46}vw)) rotate(${off * 14}deg) scale(${center ? 1 : 0.8})`,
                opacity: Math.abs(off) > 1 ? 0 : center ? 1 : 0.7,
                zIndex: center ? 2 : 1,
              }}
            />
          );
        })}
        <div key={p.name} className="pointer-events-none absolute inset-0 hidden items-center justify-between md:flex">
          <div className="max-w-[14rem] animate-in fade-in slide-in-from-left-6 duration-700">
            <p className="text-xs uppercase tracking-widest opacity-60">Serving size</p>
            <p className="mt-2 text-2xl font-semibold">{p.size}</p>
            <p className="text-sm opacity-70">{p.cal} · zero sugar</p>
          </div>
          <div className="max-w-[16rem] text-right animate-in fade-in slide-in-from-right-6 duration-700">
            <p className="text-xs uppercase tracking-widest opacity-60">Description</p>
            <p className="mt-2 text-sm opacity-80">{p.desc}</p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center gap-5 px-6">
        <h3 key={p.name} className="display text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">{p.name}</h3>
        <p className="max-w-sm text-center text-sm opacity-70 md:hidden">{p.desc}</p>
        <div className="flex items-center gap-4">
          <button aria-label="Previous" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-paper transition hover:bg-paper hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-paper px-7 py-3 text-sm font-semibold text-ink transition hover:scale-105">Shop now</button>
          <button aria-label="Next" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-paper transition hover:bg-paper hover:text-ink">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2">
          {PRODUCTS.map((pr, k) => (
            <button key={pr.name} aria-label={pr.name} onClick={() => setI(k)} className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-paper" : "w-2 bg-paper/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How ---------- */
function How() {
  const steps = [
    { I: Snowflake, t: "Chill it", d: "Fridge for 2 hours or pour over ice." },
    { I: Sparkles, t: "Crack it", d: "Listen for that happy fizz." },
    { I: Droplets, t: "Sip slowly", d: "Let the botanicals unwind you." },
    { I: Leaf, t: "Share it", d: "Better with friends outside." },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-paper pt-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1.1fr]">
        <div className="relative z-10">
          <h2 className="reveal display relative z-10 text-7xl md:whitespace-nowrap md:text-[8rem]">how to use</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {steps.map(({ I, t, d }) => (
              <div key={t} className="step">
                <div className="flex items-center gap-3">
                  <span className="pill grid h-9 w-9 place-items-center"><I className="h-4 w-4" /></span>
                  <span className="font-semibold">{t}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <img src={skaters} alt="Friends roller skating" loading="lazy" width={960} height={768} className="reveal-img mt-12 aspect-[4/3] w-full object-cover" />
        </div>
        <div className="relative md:-mt-28">
          <img src={swing} alt="Relaxing on a swing by a lake" loading="lazy" width={960} height={1024} className="reveal-img h-full min-h-[60vh] w-full object-cover" />
          <Burst className="spin-slow absolute -bottom-8 -left-8 h-24 w-24" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const R = [
    { q: "This is the most refreshing drink I've tried yet. One can on the balcony and the whole week melts away — just fantastic!", a: "Patrick Lubin, 34 years old" },
    { q: "My go-to after climbing. Light, not sweet, and the cans look so good my friends keep stealing them.", a: "Maya Ortega, 27 years old" },
    { q: "Mint Lime replaced my afternoon coffee. Calm focus, zero crash. I'm a convert.", a: "Jonas Weber, 41 years old" },
  ];
  const [i, setI] = useState(0);
  return (
    <section id="reviews" className="relative overflow-hidden bg-mint py-28">
      <div className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-mint-deep/40" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative">
          <img src={friends} alt="Friends laughing" loading="lazy" width={960} height={768} className="reveal-img aspect-[5/4] w-full object-cover" />
          <Flower className="spin-slow absolute -left-6 -top-6 h-20 w-20" />
        </div>
        <div>
          <Sparkle className="mb-6 h-8 w-8" />
          <blockquote key={i} className="text-xl leading-relaxed animate-in fade-in slide-in-from-right-4 duration-500 md:text-2xl">“{R[i]!.q}”</blockquote>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{R[i]!.a}</p>
            <button aria-label="Next review" onClick={() => setI((i + 1) % R.length)} className="pill grid h-11 w-11 place-items-center bg-paper transition hover:rotate-[-20deg]">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <Burst className="wobble h-20 w-20" />
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  ["What's inside a WOW FUN can?", "Sparkling water, real fruit juice, natural botanicals like lavender and mint, and a touch of stevia. No artificial colours, no added sugar."],
  ["How many flavours are there?", "Three core flavours — Blueberry Dream, Mint Lime and Lemon Zest — plus seasonal drops announced on our newsletter."],
  ["Do you ship internationally?", "Yes! Shipping is free worldwide on orders of 12 cans or more. Most orders arrive within 3–7 business days."],
  ["Where can I buy WOW FUN in stores?", "We're stocked in selected cafés, concept stores and grocers. Use the store finder in our shop or order directly online."],
  ["Is it suitable for vegans?", "Absolutely. Every WOW FUN drink is 100% vegan, gluten-free and made with organic ingredients."],
];
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative overflow-hidden bg-mint py-28">
      <Flower className="spin-slow absolute left-[12%] top-10 h-14 w-14" />
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative">
          <img src={graffiti} alt="Laughing in front of a yellow mural" loading="lazy" width={768} height={960} className="reveal-img aspect-[4/5] w-full object-cover" />
        </div>
        <div className="relative">
          <Sparkle className="absolute right-[20%] top-0 h-10 w-10" />
          <h2 className="reveal display text-center text-8xl md:text-9xl">FAQ</h2>
          <div className="mt-10 space-y-3">
            {FAQS.map(([q, a], k) => {
              const isOpen = open === k;
              return (
                <div key={q} className={`pill overflow-hidden transition-colors duration-300 ${isOpen ? "rounded-3xl bg-paper" : "bg-mint-deep/40"}`}>
                  <button onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm font-medium">
                    {q}
                    <span className={`pill grid h-6 w-6 shrink-0 place-items-center transition-transform duration-300 ${isOpen ? "rotate-45 bg-sun" : ""}`}>
                      <Plus className="h-3 w-3" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden px-5 text-sm text-muted-foreground">
                      <span className="block pb-4">{a}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Articles ---------- */
const ARTICLES = [
  { cat: "Wellness", date: "June 21, 2026", read: "4 min", title: "Everything You Need to Know Before Choosing a Botanical Soda", img: cliff,
    body: ["Botanical sodas are everywhere, but not all fizz is created equal. Look for real fruit, short ingredient lists and no added sugar.", "At WOW FUN, every flavour starts with a botanical base — lavender, mint or ginger — chosen for taste first and calm second.", "Our tip: read the label like a recipe. If you can't picture the ingredient, you probably don't need it."] },
  { cat: "Recipes", date: "June 17, 2026", read: "3 min", title: "Combining WOW FUN with Superfoods", img: friends,
    body: ["Pour Blueberry Dream over frozen açaí cubes for a fizzy smoothie bowl topping.", "Mint Lime + cucumber ribbons + chia makes the greenest spritz of summer.", "Lemon Zest with turmeric ice is sunshine you can drink. Experiment and tag us!"] },
  { cat: "Lifestyle", date: "June 9, 2026", read: "5 min", title: "Ten Slow Weekend Rituals Worth Stealing", img: swing,
    body: ["Leave your phone in a drawer until noon. Walk somewhere green without headphones.", "Pack a picnic with one ridiculous snack. Find a swing, a lake or a rooftop.", "And of course: an ice-cold can, cracked open at exactly the right moment."] },
  { cat: "Recipes", date: "May 30, 2026", read: "2 min", title: "Three Mocktails for Your Next Rooftop Party", img: skaters,
    body: ["The Pink Fizz: Blueberry Dream, lemon wedge, crushed ice.", "The Garden Party: Mint Lime, basil, a splash of elderflower.", "The Golden Hour: Lemon Zest, orange bitters (alcohol-free), rosemary sprig."] },
];
function Articles() {
  const cats = ["All", "Wellness", "Recipes", "Lifestyle"];
  const [cat, setCat] = useState("All");
  const [openA, setOpenA] = useState<(typeof ARTICLES)[number] | null>(null);
  const list = ARTICLES.filter((a) => cat === "All" || a.cat === cat);
  useEffect(() => {
    document.body.style.overflow = openA ? "hidden" : "";
  }, [openA]);
  return (
    <section id="articles" className="relative overflow-hidden bg-pink py-28">
      <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-pink-deep/50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="reveal display text-[22vw] md:text-[11rem]">articles</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`pill px-4 py-1.5 text-xs transition-all ${cat === c ? "bg-ink text-paper" : "hover:bg-paper"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {list.map((a, k) => (
            <article key={a.title} className={`group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500 ${k % 2 ? "md:mt-20" : ""}`} onClick={() => setOpenA(a)}>
              <div className="flex gap-2">
                <span className="pill px-3 py-1 text-[10px]">{a.date}</span>
                <span className="pill px-3 py-1 text-[10px]">{a.read}</span>
                <span className="pill bg-paper px-3 py-1 text-[10px]">{a.cat}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight transition-colors group-hover:text-coral">{a.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.body[0]}</p>
              <span className="mt-3 inline-block text-sm font-semibold underline-offset-4 group-hover:underline">Read more</span>
              <div className={`mt-5 overflow-hidden ${k % 2 ? "" : "rounded-full"}`}>
                <img src={a.img} alt={a.title} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {openA && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setOpenA(null)}>
          <div className="mx-auto my-10 max-w-2xl overflow-hidden rounded-3xl bg-paper animate-in slide-in-from-bottom-8 duration-500" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={openA.img} alt={openA.title} className="aspect-[16/9] w-full object-cover" />
              <button aria-label="Close article" onClick={() => setOpenA(null)} className="pill absolute right-4 top-4 grid h-10 w-10 place-items-center bg-paper">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-8">
              <span className="pill bg-pink px-3 py-1 text-xs">{openA.cat} · {openA.date}</span>
              <h3 className="display mt-5 text-4xl" style={{ lineHeight: 1 }}>{openA.title}</h3>
              <div className="mt-6 space-y-4 text-muted-foreground">
                {openA.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-16 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="display text-[18vw] md:text-[10rem]">wow fun</p>
        <div className="text-sm opacity-70">
          <p>hello@wowfun.co</p>
          <p className="mt-1">© 2026 WOW FUN Beverages</p>
        </div>
      </div>
    </footer>
  );
}

export function WowSite() {
  const [active, setActive] = useState("");
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }),
      );
      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) =>
        gsap.from(el, { clipPath: "inset(100% 0 0 0)", scale: 1.1, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
      );
      gsap.from(".step", { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "#how", start: "top 60%" } });
    });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { ctx.revert(); obs.disconnect(); };
  }, []);
  return (
    <main className="overflow-x-hidden">
      <Nav active={active} />
      <Hero />
      <Why />
      <Products />
      <How />
      <Reviews />
      <Faq />
      <Articles />
      <Footer />
    </main>
  );
}

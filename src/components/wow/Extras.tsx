import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search, X } from "lucide-react";
import { ARTICLES, FAQS, NAV, PRODUCTS, Burst, Eyes, Flower, Sparkle, Star } from "./WowSite";
import skaters from "@/assets/skaters.jpg";
import friends from "@/assets/friends.jpg";
import canBerry from "@/assets/can-berry.png";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= SEARCH ================= */
type Result = { type: string; title: string; sub: string; go: () => void };

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const index = useMemo<Result[]>(() => [
    ...NAV.map((n) => ({ type: "Section", title: n.label, sub: "Jump to section", go: () => scrollTo(n.id) })),
    { type: "Section", title: "The Flavor Lab", sub: "Find your flavor", go: () => scrollTo("flavor-lab") },
    { type: "Section", title: "The WOW Club", sub: "Good moments, great flavors", go: () => scrollTo("wow-club") },
    ...PRODUCTS.map((p, k) => ({ type: "Product", title: p.name, sub: p.desc, go: () => { window.dispatchEvent(new CustomEvent("wow:product", { detail: k })); scrollTo("products"); } })),
    ...ARTICLES.map((a) => ({ type: "Article", title: a.title, sub: a.cat, go: () => { scrollTo("articles"); setTimeout(() => window.dispatchEvent(new CustomEvent("wow:article", { detail: a.title })), 500); } })),
    ...FAQS.map(([qq, a]) => ({ type: "FAQ", title: qq, sub: a, go: () => { window.dispatchEvent(new CustomEvent("wow:faq", { detail: qq })); scrollTo("faq"); } })),
  ], []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return index.filter((r) => `${r.title} ${r.sub} ${r.type}`.toLowerCase().includes(t)).slice(0, 8);
  }, [q, index]);

  useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => input.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  const pick = (r: Result) => { onClose(); setTimeout(r.go, 50); };

  return (
    <div
      aria-hidden={!open}
      onClick={onClose}
      className={`fixed inset-0 z-[70] flex items-start justify-center bg-ink/50 px-4 pt-24 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search WOW FUN"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl overflow-hidden rounded-3xl border-[1.5px] border-ink bg-paper transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "translate-y-0 scale-100" : "-translate-y-6 scale-95"}`}
      >
        <div className="flex items-center gap-3 border-b-[1.5px] border-ink bg-pink px-5 py-4">
          <Search className="h-5 w-5 shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === "Enter" && results[sel]) pick(results[sel]!);
            }}
            placeholder="Search flavours, articles, FAQ…"
            aria-label="Search query"
            className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Close search" onClick={onClose} className="pill grid h-8 w-8 shrink-0 place-items-center bg-paper transition hover:rotate-90">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!q.trim() && (
            <div className="flex flex-wrap gap-2 p-2">
              <p className="w-full text-xs uppercase tracking-widest text-muted-foreground">Try</p>
              {["Mint", "Lemon", "Recipes", "shipping", "vegan"].map((s) => (
                <button key={s} onClick={() => setQ(s)} className="pill px-3 py-1 text-xs transition hover:bg-mint-deep">{s}</button>
              ))}
            </div>
          )}
          {q.trim() && results.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Eyes className="h-12 w-20" />
              <p className="display text-3xl">no wow found</p>
              <p className="text-sm text-muted-foreground">Nothing matches “{q}”. Try a flavour like “berry”.</p>
            </div>
          )}
          <ul role="listbox">
            {results.map((r, k) => (
              <li key={r.type + r.title} role="option" aria-selected={k === sel}>
                <button
                  onMouseEnter={() => setSel(k)}
                  onClick={() => pick(r)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${k === sel ? "bg-mint" : ""}`}
                >
                  <span className="pill shrink-0 bg-paper px-2 py-0.5 text-[10px] uppercase">{r.type}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.sub}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ================= FLAVOR LAB ================= */
const LAB = [
  { notes: ["blueberry", "lavender", "vanilla bean"], bg: "oklch(0.94 0.035 345)", fruit: "oklch(0.72 0.11 270)", soft: "oklch(0.86 0.06 300)", shapes: ["●", "✿", "◍"] },
  { notes: ["garden mint", "lime", "cucumber"], bg: "oklch(0.95 0.04 165)", fruit: "var(--mint-deep)", soft: "oklch(0.9 0.09 135)", shapes: ["◐", "❦", "◐"] },
  { notes: ["lemon", "ginger", "honeysuckle"], bg: "oklch(0.96 0.045 90)", fruit: "var(--sun)", soft: "oklch(0.9 0.07 80)", shapes: ["◑", "✺", "◑"] },
];

export function FlavorLab() {
  const ref = useRef<HTMLElement>(null);
  const [sel, setSel] = useState(0); // immediate selection (buttons)
  const [i, setI] = useState(0); // displayed content, single source for can/text/notes
  const [busy, setBusy] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const dir = useRef(1);
  const first = useRef(true);
  const p = PRODUCTS[i]!;
  const lab = LAB[i]!;
  const accent = LAB[sel]!;

  useEffect(() => {
    if (reduced()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 65%" } });
      t.from(".fl-word", { yPercent: 110, rotate: 4, duration: 1, stagger: 0.08, ease: "power4.out" })
        .from(".fl-can", { scale: 0.75, rotate: -18, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.7")
        .from(".fl-ctrl", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.8");
      gsap.utils.toArray<HTMLElement>(".fl-par").forEach((el) => {
        const speed = Number(el.dataset["speed"] || 1);
        gsap.to(el, { yPercent: -40 * speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, ref);
    return () => { ctx.revert(); tl.current?.kill(); };
  }, []);

  const choose = (k: number) => {
    if (k === sel) return;
    dir.current = k > sel ? 1 : -1;
    setSel(k);
    if (reduced() || !ref.current) { setI(k); return; }
    tl.current?.kill();
    setBusy(true);
    const q = gsap.utils.selector(ref);
    const d = dir.current;
    tl.current = gsap.timeline({ onComplete: () => setI(k) })
      .to(q(".fl-img"), { x: -18 * d, scale: 0.9, rotate: -3 * d, opacity: 0, duration: 0.28, ease: "power2.in" }, 0)
      .to(q(".fl-shadow"), { opacity: 0, scaleX: 0.6, duration: 0.28 }, 0)
      .to(q(".fl-title"), { y: -18, opacity: 0, duration: 0.24, ease: "power2.in" }, 0)
      .to(q(".fl-txt"), { y: -8, opacity: 0, duration: 0.22, stagger: 0.03, ease: "power2.in" }, 0.02)
      .to(q(".fl-note"), { y: -6, opacity: 0, duration: 0.2, stagger: 0.03 }, 0);
  };

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced() || !ref.current) { setBusy(false); return; }
    const q = gsap.utils.selector(ref);
    const d = dir.current;
    tl.current?.kill();
    tl.current = gsap.timeline({ onComplete: () => setBusy(false) })
      .fromTo(q(".fl-img"), { x: 22 * d, scale: 0.88, rotate: 4 * d, opacity: 0 }, { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0)
      .fromTo(q(".fl-shadow"), { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" }, 0.1)
      .fromTo(q(".fl-title"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.04)
      .fromTo(q(".fl-txt"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }, 0.1)
      .fromTo(q(".fl-note"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power3.out" }, 0.12)
      .fromTo(q(".fl-dot"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.07, ease: "back.out(2)" }, 0.12);
  }, [i]);

  return (
    <section id="flavor-lab" ref={ref} className="relative overflow-hidden py-28 motion-safe:transition-[background-color] motion-safe:duration-[800ms] motion-safe:ease-[cubic-bezier(.4,0,.2,1)]" style={{ background: accent.bg }}>
      <style>{`@keyframes flStar{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(18deg)}}@keyframes flFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@media (prefers-reduced-motion:reduce){.fl-anim{animation:none!important}}`}</style>
      <div className="fl-par pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full opacity-60 transition-colors duration-700" data-speed="0.6" style={{ background: accent.fruit }} />
      <div className="fl-par pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full opacity-50 transition-colors duration-700" data-speed="1.4" style={{ background: accent.soft }} />
      <Sparkle className="fl-par absolute right-[12%] top-16 h-12 w-12" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[15vw] md:text-[9rem]" aria-label="The Flavor Lab">
            {["the", "flavor", "lab"].map((w) => (
              <span key={w} className="mr-[0.2em] inline-block overflow-hidden align-bottom"><span className="fl-word inline-block">{w}</span></span>
            ))}
          </h2>
          <p className="max-w-xs pb-4 text-lg font-medium">Find your flavor. Discover your WOW.</p>
        </div>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]" aria-live="polite">
          <div className="order-2 min-h-[16rem] md:order-1">
            <span className="fl-txt pill inline-block bg-paper px-3 py-1 text-[10px] uppercase tracking-widest">Experiment No. 0{i + 1}</span>
            <h3 className="fl-title display mt-5 text-5xl md:text-6xl" style={{ lineHeight: 1 }}>{p.name}</h3>
            <p className="fl-txt mt-4 max-w-sm text-muted-foreground">{p.desc}</p>
            <div className="fl-txt mt-6 flex gap-6 text-sm">
              <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Size</p><p className="font-semibold">{p.size}</p></div>
              <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Energy</p><p className="font-semibold">{p.cal}</p></div>
              <div><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sugar</p><p className="font-semibold">0 g</p></div>
            </div>
          </div>

          <div className="fl-can relative order-1 mx-auto md:order-2">
            <div className="fl-shadow absolute inset-x-0 bottom-2 mx-auto h-10 w-40 rounded-full bg-ink/20 blur-xl" />
            <div className="fl-anim" style={{ animation: "flFloat 5s ease-in-out infinite", animationPlayState: busy ? "paused" : "running" }}>
              <img src={p.img} alt={p.name} width={576} height={1152} className="fl-img relative h-[52vh] w-auto object-contain drop-shadow-[var(--shadow-can)]" />
            </div>
            <span className="fl-par absolute -right-10 top-6" data-speed="1.8">
              <span className="fl-anim block" style={{ animation: "flStar 7s ease-in-out infinite" }}><Star className="h-14 w-14" /></span>
            </span>
          </div>

          <div className="order-3 min-h-[13rem]">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Flavor notes</p>
            <ul className="mt-4 space-y-3">
              {lab.notes.map((n, k) => (
                <li key={i + n} className="fl-note group flex cursor-default items-center gap-4">
                  <span className="fl-dot pill grid h-12 w-12 place-items-center text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ background: k === 0 ? lab.fruit : lab.soft }}>{lab.shapes[k]}</span>
                  <span className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Choose a flavor">
          {PRODUCTS.map((pr, k) => (
            <button
              key={pr.name}
              role="tab"
              aria-selected={k === sel}
              onClick={() => choose(k)}
              className={`fl-ctrl pill group flex cursor-pointer items-center gap-3 py-2 pl-2 pr-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${k === sel ? "bg-ink text-paper" : "bg-paper"}`}
            >
              <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full ring-0 ring-ink transition-all duration-300 group-hover:scale-110 group-hover:ring-2" style={{ background: LAB[k]!.fruit }}>
                <img src={pr.img} alt="" className="h-12 w-auto transition-transform duration-300 group-hover:rotate-12" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">{pr.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= WOW CLUB ================= */
export function WowClub() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduced()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".wc-line", { yPercent: 110, duration: 1.1, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 65%" } });
      gsap.utils.toArray<HTMLElement>(".wc-img").forEach((el, k) => {
        gsap.from(el, { clipPath: "inset(0 0 100% 0)", duration: 1.3, delay: k * 0.15, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray<HTMLElement>(".wc-par").forEach((el) => {
        gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.from(".wc-fade", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".wc-fade", start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="wow-club" ref={ref} className="relative overflow-hidden bg-paper py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="display text-[13vw] md:text-[8rem]" aria-label="Welcome to the WOW Club">
          <span className="block overflow-hidden"><span className="wc-line block">welcome to</span></span>
          <span className="block overflow-hidden"><span className="wc-line block">the <span className="text-coral">wow</span> club</span></span>
        </h2>

        <div className="relative mt-14 grid gap-8 md:grid-cols-12">
          <div className="wc-img group relative overflow-hidden rounded-[2.5rem] md:col-span-7">
            <img src={skaters} alt="Friends skating together" loading="lazy" width={960} height={768} className="wc-par aspect-[4/3] w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-[1.15]" />
            <span className="pill absolute left-5 top-5 bg-sun px-3 py-1 text-xs font-semibold">sunday crew</span>
          </div>

          <div className="flex flex-col justify-between gap-8 md:col-span-5">
            <div className="relative self-end">
              <div className="wc-img group relative w-56 overflow-hidden rounded-full border-[1.5px] border-ink bg-pink md:w-64">
                <img src={canBerry} alt="Blueberry Dream can" loading="lazy" width={576} height={1152} className="mx-auto h-72 w-auto py-4 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
              </div>
              <Flower className="spin-slow absolute -left-8 -top-4 h-16 w-16" />
              <Burst className="wobble absolute -bottom-4 -right-4 h-14 w-14" />
            </div>
            <div>
              <p className="wc-fade text-2xl font-semibold leading-snug">Good moments. Great flavors. A little extra WOW.</p>
              <p className="wc-fade mt-4 text-muted-foreground">
                The WOW Club is every picnic, rooftop and road trip where someone cracks open a can and the day gets a little louder. Grab your flavour and bring your people.
              </p>
              <a
                href="#products"
                className="wc-fade group mt-8 inline-flex items-center gap-3 rounded-full border-[1.5px] border-ink bg-ink py-2 pl-6 pr-2 font-semibold text-paper transition-all duration-300 hover:bg-coral hover:text-ink"
              >
                Pick your flavour
                <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          <div className="wc-img group relative overflow-hidden rounded-[2.5rem] md:col-span-5 md:col-start-2 md:-mt-10">
            <img src={friends} alt="Friends in front of a colorful wall" loading="lazy" width={960} height={768} className="wc-par aspect-[5/4] w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-[1.15]" />
          </div>
          <div className="flex items-center md:col-span-5">
            <p className="display text-[14vw] text-pink-deep md:text-[7rem]">#wowfun</p>
          </div>
          <Eyes className="pointer-events-none absolute bottom-[30%] right-[45%] hidden h-14 w-24 md:block" />
        </div>
      </div>
    </section>
  );
}

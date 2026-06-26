import { useState, useEffect, useRef } from "react";
import "./AdviceOnlyConference.css";

// ─── Color & Type Tokens ───────────────────────────────────────────────────
const C = {
  navy: "#0B1F3A",
  navyDark: "#071428",
  teal: "#18B9C5",
  tealDark: "#0E9FAA",
  amber: "#9F8C49",
  amberDark: "#8A7A3E",
  cream: "#F6F1E8",
  creamLight: "#FBF8F3",
  white: "#FFFFFF",
  grayLight: "#E8E3D8",
  grayMid: "#9A9286",
  bodyText: "#2C3E50",
};

// ─── Google Fonts ──────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

// ─── Global Styles ─────────────────────────────────────────────────────────
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Outfit', sans-serif; background: ${C.creamLight}; color: ${C.bodyText}; max-width: 100%; overflow-x: hidden; }

  @media (max-width: 768px) {
    /* Nav */
    .nav-desktop { display: none !important; }
    .nav-mobile { display: flex !important; }
    .nav-dropdown { display: block !important; }
    .section-heading { font-size: 1.8rem !important; }

    /* Buttons — full width, large tap targets */
    .cta-primary, .cta-secondary {
      width: 100%;
      text-align: center;
      padding: 16px 20px !important;
      font-size: 1rem !important;
      display: block !important;
    }

    /* Section padding */
    section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 56px !important; padding-bottom: 56px !important; }

    /* Hero pills — stack vertically */
    .hero-pills { flex-direction: column !important; width: 100%; }
    .hero-pill { width: 100% !important; justify-content: center !important; padding: 13px 20px !important; font-size: 0.95rem !important; }
    .hero-ctas { flex-direction: column !important; width: 100%; gap: 12px !important; }

    /* Agenda — hide desktop timeline line */
    .agenda-timeline-line { display: none !important; }
    .agenda-tab { padding: 10px 14px; font-size: 0.82rem; }

    /* Speaker grid — single column */
    .speakers-grid { grid-template-columns: 1fr !important; }

    /* Venue grid — single column */
    .venue-grid { grid-template-columns: 1fr !important; }

    /* Hotel grid — single column */
    .hotel-grid { grid-template-columns: 1fr !important; }
    .hotel-btns { flex-direction: column !important; }
    .hotel-card-header { padding: 20px !important; }
    .hotel-card-body { padding: 20px !important; }

    /* About section */
    .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
    .about-ctas { flex-direction: column !important; }
    .stats-cell { padding: 20px 12px !important; }
    .stats-value { font-size: 2.4rem !important; }

    /* Why Attend */
    .why-grid { grid-template-columns: 1fr !important; }
    .why-item { border-right: none !important; padding: 20px 18px !important; }

    /* Footer */
    .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }

    /* Press strip */
    .press-strip-inner { flex-direction: column !important; gap: 16px !important; }

    /* Map overlay pill — hide on mobile to prevent overflow */
    .map-overlay { display: none !important; }

    /* Countdown units — smaller */
    .countdown-unit { min-width: 58px !important; }
    .countdown-value { font-size: 2rem !important; padding: 8px 10px !important; min-width: 58px !important; }
  }

  ::selection { background: ${C.amber}; color: ${C.navy}; }
  a { text-decoration: none; color: inherit; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(159,140,73,0.4); }
    50%       { box-shadow: 0 0 0 12px rgba(159,140,73,0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes drawLine {
    from { width: 0; }
    to   { width: 100%; }
  }
  .fade-up { animation: fadeUp 0.7s ease both; }
  .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.7s 0.4s ease both; }

  .hover-lift {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(11,31,58,0.14);
  }
  .nav-link {
    position: relative;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    font-size: 0.88rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${C.white};
    opacity: 0.85;
    transition: opacity 0.2s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 2px;
    background: ${C.amber};
    transition: width 0.25s ease;
  }
  .nav-link:hover { opacity: 1; }
  .nav-link:hover::after { width: 100%; }

  .ticket-btn {
    background: ${C.amber};
    color: ${C.navy};
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    animation: pulse 2.5s infinite;
  }
  .ticket-btn:hover {
    background: ${C.amberDark};
    transform: translateY(-1px);
  }
  .cta-primary {
    display: inline-block;
    background: ${C.amber};
    color: ${C.navy};
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 16px 40px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    border: none;
  }
  .cta-primary:hover {
    background: ${C.amberDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(159,140,73,0.4);
  }
  .cta-secondary {
    display: inline-block;
    background: transparent;
    color: ${C.white};
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 15px 38px;
    border-radius: 4px;
    border: 2px solid rgba(255,255,255,0.6);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
  }
  .cta-secondary:hover {
    border-color: ${C.white};
    background: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }
  .section-label {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${C.teal};
  }
  .section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    line-height: 1.1;
    color: ${C.navy};
  }
  .divider {
    width: 56px; height: 3px;
    background: ${C.amber};
    margin: 14px 0 24px;
    border-radius: 2px;
  }
  .divider-center {
    margin: 14px auto 24px;
  }
  .faq-item {
    border-bottom: 1px solid ${C.grayLight};
    transition: background 0.2s;
  }
  .faq-item:hover { background: rgba(24,185,197,0.04); }
  .faq-question {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: ${C.navy};
  }
  .faq-chevron {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    color: ${C.teal};
    flex-shrink: 0;
  }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-answer {
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.3s ease;
    opacity: 0;
    max-height: 0;
  }
  .faq-answer.open {
    opacity: 1;
  }
  .ticker-wrap {
    overflow: hidden;
    background: ${C.teal};
    padding: 11px 0;
    white-space: nowrap;
  }
  .ticker-inner {
    display: inline-block;
    animation: ticker 30s linear infinite;
    white-space: nowrap;
  }
  .ticker-inner span {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${C.navy};
    padding: 0 32px;
  }
  .ticker-inner span::after {
    content: '✦';
    margin-left: 32px;
  }
  .speaker-card {
    background: ${C.white};
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    border: 1px solid ${C.grayLight};
  }
  .speaker-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(11,31,58,0.12);
  }
  .agenda-tab {
    padding: 12px 28px;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .agenda-tab.active {
    background: ${C.navy};
    color: ${C.white};
    border-color: ${C.navy};
  }
  .agenda-tab.inactive {
    background: transparent;
    color: ${C.grayMid};
    border-color: ${C.grayLight};
  }
  .agenda-tab.inactive:hover {
    border-color: ${C.navy};
    color: ${C.navy};
  }
  .venue-card {
    background: ${C.white};
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${C.grayLight};
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .venue-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(11,31,58,0.1);
  }
`;
document.head.appendChild(globalStyle);

// ─── Mobile Hook ───────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
}

// ─── Scroll Reveal ─────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["About", "Agenda", "Tickets", "FAQ"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled || mobileOpen ? C.navyDark : "transparent",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.08)` : "none",
        transition: "background 0.35s ease",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ display: "flex", flexDirection: "column", lineHeight: 1, textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.35rem", color: C.white, letterSpacing: "0.02em" }}>
            Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "1.2rem" }}>-</span>Only
          </span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.65rem", color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Conference · Minneapolis 2026
          </span>
        </a>

        {/* Desktop nav — hidden on mobile via CSS */}
        <nav className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.slice(0, -1).map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); }}>
              {l}
            </a>
          ))}
          <a href="#tickets" className="ticket-btn" style={{ textDecoration: "none" }}
            onClick={(e) => { e.preventDefault(); document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" }); }}>
            Denver 2027
          </a>
        </nav>

        {/* Mobile controls — hidden on desktop via CSS */}
        <div className="nav-mobile" style={{ display: "none", alignItems: "center", gap: 12 }}>
          <a href="#tickets" className="ticket-btn" style={{ textDecoration: "none", fontSize: "0.78rem", padding: "8px 14px" }}
            onClick={(e) => { e.preventDefault(); document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" }); }}>
            Denver 2027
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Toggle menu">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 24, height: 2,
                background: C.white,
                borderRadius: 2,
                transition: "all 0.25s ease",
                transform: mobileOpen
                  ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(5px, -5px)"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="nav-dropdown" style={{
        maxHeight: mobileOpen ? 420 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease",
        background: C.navyDark,
        borderTop: mobileOpen ? `1px solid rgba(255,255,255,0.08)` : "none",
        display: "none",
      }}>
        <div style={{ padding: "12px 24px 24px" }}>
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none",
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                padding: "14px 0",
                fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                fontSize: "1rem", letterSpacing: "0.04em",
                color: C.white, cursor: "pointer", opacity: 0.85,
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Ticker ────────────────────────────────────────────────────────────────
function Ticker() {
  const msgs = ["Thank You Minneapolis!", "Denver, CO · 2027", "Early Bird Tickets from $399", "Advice-Only Network", "Pure Advice · No Commissions · No AUM", "The Industry's Premier Advice-Only Conference", "Pre-Register for 2027"];
  const doubled = [...msgs, ...msgs];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const isMobile = useIsMobile();
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse at 20% 60%, rgba(24,185,197,0.18) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, rgba(159,140,73,0.12) 0%, transparent 50%),
          linear-gradient(160deg, ${C.navyDark} 0%, #0F2847 55%, #0A3D62 100%)
        `,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: isMobile ? "100px 20px 60px" : "120px 32px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "80px 80px", pointerEvents: "none" }} />

      {/* Badge */}
      <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(24,185,197,0.12)", border: `1px solid rgba(24,185,197,0.3)`, borderRadius: 100, padding: "7px 18px", marginBottom: 28 }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal }}>
          The Advice-Only Network Presents
        </span>
      </div>

      <h1 className="fade-up-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(3.2rem, 8vw, 7rem)", lineHeight: 0.95, color: C.white, marginBottom: 20, letterSpacing: "-0.01em" }}>
        The Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.75em", verticalAlign: "0.12em" }}>-</span>Only<br />
        <em style={{ color: C.amber }}>Conference</em>
      </h1>

      <p className="fade-up-2" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.72)", maxWidth: 620, lineHeight: 1.6, marginBottom: 32 }}>
        Thank you to everyone who joined us in Minneapolis for an unforgettable two days. We're already planning something even bigger — see you in Denver in 2027.
      </p>

      <div className="fade-up-3 hero-pills" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginBottom: 40, width: isMobile ? "100%" : "auto" }}>
        {[
          { icon: "✅", text: "Minneapolis 2026 — Thank You!", href: null },
          { icon: "📍", text: "Denver, CO · 2027", href: null },
          { icon: "🎟️", text: "Early Bird from $399", href: "#tickets" },
        ].map(({ icon, text, href }) => {
          const inner = (
            <>
              <span>{icon}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? "0.95rem" : "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{text}</span>
            </>
          );
          const sharedStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: isMobile ? "12px 20px" : "8px 16px", textDecoration: "none", transition: "background 0.2s", width: isMobile ? "100%" : "auto" };
          return href ? (
            <a key={text} href={href} className="hero-pill" onClick={(e) => { e.preventDefault(); document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" }); }} style={{ ...sharedStyle, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
            >{inner}</a>
          ) : (
            <div key={text} className="hero-pill" style={sharedStyle}>{inner}</div>
          );
        })}
      </div>

      <div className="fade-up-4 hero-ctas" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", marginBottom: 48, width: isMobile ? "100%" : "auto" }}>
        <a href="#tickets" className="cta-primary" onClick={(e) => { e.preventDefault(); document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" }); }}>Pre-Register for Denver 2027</a>
      </div>

      {/* 2027 Denver teaser */}
      <div className="fade-up-4" style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
          Next Conference
        </div>
        <div style={{ display: "inline-flex", flexDirection: isMobile ? "column" : "row", gap: 0, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden" }}>
          {[
            { label: "Location", value: "Denver, CO" },
            { label: "Year", value: "2027" },
            { label: "Early Bird", value: "$399" },
          ].map(({ label, value }, i) => (
            <div key={label} style={{ padding: isMobile ? "16px 24px" : "18px 32px", borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: C.white, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ padding: isMobile ? "60px 20px" : "96px 32px", background: C.creamLight }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal>
          <div>
            <div className="section-label">About the Conference</div>
            <div className="divider" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: 24 }}>
              Where the Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.9em" }}>-</span>Only Movement Comes Alive
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: C.bodyText, marginBottom: 20 }}>
              The Advice-Only Conference is the first of its kind gathering exclusively for Advice-Only financial planners. Hosted by The Advice-Only Network in the heart of downtown Minneapolis, this is your chance to connect with the most forward-thinking minds in Advice-Only financial planning.
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: C.bodyText, marginBottom: 32 }}>
              No product pitches. No commission-hungry sales reps. Just real advisors doing real work for real people — and two days to celebrate what makes our model the future of financial planning.
            </p>
            <div className="about-ctas" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, flexWrap: "wrap" }}>
              <a href="#agenda" className="cta-primary" style={{ background: C.navy, color: C.white }} onClick={(e) => { e.preventDefault(); document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" }); }}>View the Agenda</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Why Attend ────────────────────────────────────────────────────────────
function WhyAttend() {
  const reasons = [
    { title: "Real Community", desc: "Connect face-to-face with advisors who share your values. Build partnerships, referral relationships, and lifelong friendships with those who get it." },
    { title: "Actionable Education", desc: "Deep-dive sessions on building and scaling an Advice-Only practice, compliance, marketing, pricing strategies, and the business of serving clients on your terms." },
    { title: "Fresh Inspiration", desc: "Reignite your passion for the work. Leave Minneapolis buzzing with new ideas, renewed energy, and a clear vision for where your practice is headed." },
    { title: "Shape the Movement", desc: "Be part of defining what Advice-Only means for the next decade. Your voice and your presence help build the future of fiduciary planning." },
    { title: "Beautiful Venue", desc: "Hosted at the iconic Open Book space in downtown Minneapolis — natural light and a literary creative energy that inspires greatness." },
    { title: "Celebrate the Win", desc: "You chose the hardest, most principled path in financial planning. Come celebrate that with people who understand exactly what you've built." },
  ];
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "60px 20px" : "96px 32px", background: C.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">Why You Should Be There</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Two Days That Could Change Everything
            </h2>
          </div>
        </Reveal>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(440px, 1fr))", gap: 0, border: `1px solid ${C.grayLight}`, borderRadius: 12, overflow: "hidden", background: C.white }}>
          {reasons.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div style={{
                padding: isMobile ? "24px 20px" : "32px 36px",
                borderRight: !isMobile && i % 2 === 0 ? `1px solid ${C.grayLight}` : "none",
                borderBottom: isMobile ? (i < reasons.length - 1 ? `1px solid ${C.grayLight}` : "none") : (i < 4 ? `1px solid ${C.grayLight}` : "none"),
                display: "flex", gap: 20, alignItems: "flex-start"
              }}>
                <div style={{ width: 3, flexShrink: 0, alignSelf: "stretch", background: C.amber, borderRadius: 2, marginTop: 2 }} />
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.navy, marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.93rem", color: C.grayMid, lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Agenda ────────────────────────────────────────────────────────────────
function Agenda() {
  const [day, setDay] = useState(1);
  const isMobile = useIsMobile();
  const agenda = {
    1: [
      { time: "8:00 AM", title: "Registration & Morning Coffee", type: "break", note: "Performance Hall Lobby" },
      { time: "9:00 AM", title: "Opening Keynote", type: "keynote", note: "Performance Hall · Welcome to the Advice-Only Conference — Setting the stage for two transformative days" },
      { time: "10:00 AM", type: "concurrent", sessions: [
        { title: "Mixer 1: Starting as Advice-Only", room: "Performance Hall", type: "session", speaker: "A networking session to connect with others who are just getting started on their Advice-Only journey" },
        { title: "Mixer 2: Established Advice-Only Practitioners", room: "Breakout Room", type: "session", speaker: "A networking session to connect with fellow experienced Advice-Only advisors" },
      ]},
      { time: "11:15 AM", title: "How to Attract New Clients as an Advice-Only Advisor", type: "session", note: "Performance Hall · Eryn Schultz · Her Personal Finance" },
      { time: "12:30 PM", title: "Lunch & Networking", type: "break", note: "Catered lunch · Open networking with all attendees" },
      { time: "1:30 PM", title: "The Intersection of Advice-Only and the FIRE Movement", type: "keynote", note: "Performance Hall · Chris Mamula · Author: Choose FI" },
      { time: "2:45 PM", title: "The Business Case for Advice-Only", type: "session", note: "Performance Hall · Steven Fox · AdviceOnly" },
      { time: "4:00 PM", title: "Optimizing Your Website for SEO & AEO", type: "session", note: "Performance Hall · Alex Ammar · Paradox Financial" },
      { time: "5:30 PM", title: "Evening Event & Networking 🎉", type: "break", note: "Minneapolis Pickleball Club · Food, drink, and pickleball!" },
    ],
    2: [
      { time: "8:30 AM", title: "Morning Coffee", type: "break", note: "Come early, connect deeply" },
      { time: "9:00 AM", title: "Death and Money Make People Funny: Supporting Clients Facing Mortality", type: "keynote", note: "Performance Hall · Rose Zealand · Golden Thread Collaborative" },
      { time: "10:00 AM", title: "Compliance for Advice-Only Advisors", type: "session", note: "Performance Hall · Kingston Hollman · Just Compliance" },
      { time: "11:15 AM", type: "concurrent", sessions: [
        { title: "Delivering Ongoing Financial Planning", room: "Performance Hall", type: "session", speaker: "Sarah Sprague Gerber · Momentum Financial Planning LLC" },
        { title: "Delivering Hourly or Project Based Financial Planning", room: "Breakout Room", type: "session", speaker: "Holly Donaldson · Holly Donaldson Financial Planning" },
      ]},
      { time: "12:15 PM", title: "Lunch & Networking", type: "break", note: "Catered lunch · Open networking with all attendees" },
      { time: "1:30 PM", title: "Reframing the Retirement Premise", type: "keynote", note: "Performance Hall · Barb Clemons · Clemons Financial Education Company" },
      { time: "2:45 PM", title: "How to use AI in your practice in 2026 and beyond", type: "session", note: "Performance Hall" },
      { time: "4:00 PM", title: "Closing Keynote", type: "keynote", note: "Performance Hall · Closing of the Advice-Only Conference and Looking Toward the Future" },
      { time: "5:00 PM", title: "Farewells & Departures", type: "break", note: "Celebrating two great days together" },
    ],
  };
  const typeColors = {
    keynote: { bg: `rgba(11,31,58,0.06)`, border: C.navy, dot: C.navy },
    session: { bg: `rgba(24,185,197,0.07)`, border: C.teal, dot: C.teal },
    workshop: { bg: `rgba(159,140,73,0.08)`, border: C.amber, dot: C.amber },
    break: { bg: `rgba(154,146,134,0.06)`, border: C.grayMid, dot: C.grayMid },
  };
  return (
    <section id="agenda" style={{ padding: isMobile ? "60px 20px" : "96px 32px", background: C.creamLight }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Conference Schedule</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 12 }}>Agenda</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
            {[1, 2].map((d) => (
              <button key={d} onClick={() => setDay(d)} className={`agenda-tab ${day === d ? "active" : "inactive"}`}>
                Day {d} · June {22 + d}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            {[
              { color: C.navy, label: "Keynote" },
              { color: C.teal, label: "Breakout Session" },
              { color: C.grayMid, label: "Break / Networking" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: C.grayMid }}>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Timeline line - hidden on mobile */}
          {!isMobile && <div style={{ position: "absolute", left: 78, top: 0, bottom: 0, width: 2, background: C.grayLight }} />}

          {agenda[day].map((item, i) => {
            // ── Concurrent / parallel sessions ──
            if (item.type === "concurrent") {
              return (
                <Reveal key={i} delay={i * 0.05}>
                  {isMobile ? (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: C.grayMid, marginBottom: 6, letterSpacing: "0.03em" }}>{item.time}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {item.sessions.map((s, si) => {
                          const col = typeColors[s.type];
                          return (
                            <div key={si} style={{ background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.navy, marginBottom: 5 }}>{s.title}</div>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(11,31,58,0.06)", borderRadius: 100, padding: "3px 10px" }}>
                                <span style={{ fontSize: "0.7rem" }}>📍</span>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.grayMid }}>{s.room}</span>
                              </div>
                              {s.speaker && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: C.grayMid, marginTop: 5 }}>{s.speaker}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 24, marginBottom: 10, alignItems: "flex-start" }}>
                      <div style={{ minWidth: 68, textAlign: "right", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: C.grayMid, paddingTop: 14, letterSpacing: "0.03em", flexShrink: 0 }}>{item.time}</div>
                      <div style={{ position: "relative", zIndex: 1, marginTop: 16, flexShrink: 0 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.teal, border: `3px solid ${C.creamLight}` }} />
                      </div>
                      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {item.sessions.map((s, si) => {
                          const col = typeColors[s.type];
                          return (
                            <div key={si} style={{ background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.92rem", color: C.navy, marginBottom: 5 }}>{s.title}</div>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(11,31,58,0.06)", borderRadius: 100, padding: "3px 10px" }}>
                                <span style={{ fontSize: "0.65rem" }}>📍</span>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.grayMid, letterSpacing: "0.04em" }}>{s.room}</span>
                              </div>
                              {s.speaker && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: C.grayMid, marginTop: 5 }}>{s.speaker}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            }

            // ── Single session ──
            const col = typeColors[item.type];
            return (
              <Reveal key={i} delay={i * 0.05}>
                {isMobile ? (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: C.grayMid, marginBottom: 6, letterSpacing: "0.03em" }}>{item.time}</div>
                    <div style={{ background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.navy }}>{item.title}</div>
                      {item.note && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: C.grayMid, marginTop: 3 }}>{item.note}</div>}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 24, marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 68, textAlign: "right", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: C.grayMid, paddingTop: 14, letterSpacing: "0.03em" }}>{item.time}</div>
                    <div style={{ position: "relative", zIndex: 1, marginTop: 16 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: col.dot, border: `3px solid ${C.creamLight}`, flexShrink: 0 }} />
                    </div>
                    <div style={{ flex: 1, background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 18px", marginBottom: 4 }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem", color: C.navy }}>{item.title}</div>
                      {item.note && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: C.grayMid, marginTop: 3 }}>{item.note}</div>}
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 40, padding: "24px", background: `rgba(24,185,197,0.06)`, borderRadius: 10, border: `1px dashed ${C.teal}` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: C.grayMid }}>
              Schedule subject to change. Questions? Email us at{" "}
              <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>info@adviceonlynetwork.com</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Speakers ──────────────────────────────────────────────────────────────


// ─── Tickets ───────────────────────────────────────────────────────────────
function Tickets() {
  const isMobile = useIsMobile();
  const perks = [
    "Full 2-day conference access",
    "All keynotes & breakout sessions",
    "Lunch both days",
    "Evening networking event",
    "Peer connections & community",
    "Early Bird pricing — locked in now",
  ];
  return (
    <section id="tickets" style={{ padding: isMobile ? "60px 20px" : "96px 32px", background: `linear-gradient(160deg, ${C.navyDark} 0%, #0F2847 60%, #0A3D62 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(24,185,197,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(159,140,73,0.08) 0%, transparent 40%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal }}>
              Coming to Denver, CO
            </div>
            <div style={{ width: 56, height: 3, background: C.amber, margin: "14px auto 24px", borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white, marginBottom: 12 }}>
              Be First for 2027
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto" }}>
              We're bringing the Advice-Only Conference to Denver in 2027. Pre-register now to lock in our Early Bird rate — the lowest price we'll ever offer.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <Reveal style={{ width: "100%", maxWidth: 480 }}>
            <div style={{
              background: C.white,
              border: `2px solid ${C.amber}`,
              borderRadius: 12,
              padding: "36px 28px",
              position: "relative",
              textAlign: "center",
            }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: C.teal, color: C.white, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap" }}>
                Early Bird · Limited Spots
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.navy, marginBottom: 12 }}>Early Bird — Denver 2027</h3>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "3.4rem", color: C.navy, lineHeight: 1, marginBottom: 4 }}>$399</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: C.teal, marginBottom: 4 }}>Early Bird Pre-Registration</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: C.grayMid, marginBottom: 28 }}>Price will increase as the date approaches</div>
              <ul style={{ listStyle: "none", marginBottom: 32, textAlign: "left" }}>
                {perks.map((p) => (
                  <li key={p} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: C.bodyText, padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: `1px solid ${C.grayLight}` }}>
                    <span style={{ color: C.teal, fontWeight: 700, marginTop: 1 }}>✓</span>{p}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:info@adviceonlynetwork.com?subject=2027 Early Bird Pre-Registration"
                className="cta-primary"
                style={{ display: "block", background: C.navy, color: C.white, fontSize: "0.88rem", textAlign: "center" }}
              >
                Pre-Register Now →
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ textAlign: "center", padding: "28px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>
              Questions about the 2027 conference? Email us at{" "}
              <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>info@adviceonlynetwork.com</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const isMobile = useIsMobile();
  const items = [
    { q: "Who is this conference for?", a: "The Advice-Only Conference is designed for Advice-Only financial planners, advisors considering making the switch to an Advice-Only model, and anyone who believes in the future of real financial planning with reduced conflicts of interest." },
    { q: "What does 'Advice-Only' mean?", a: "Advice-Only financial planners charge solely for their advice — no commissions, no assets under management fees, and no product sales. They provide pure, fiduciary guidance with reduced conflicts of interest." },
    { q: "What's the dress code?", a: "Come as you are! We want you to be comfortable, so wear whatever you feel good in. This is a welcoming, relaxed environment — there's no need to dress up." },
    { q: "What is your inclusion & harassment policy?", a: "The Advice-Only Conference is committed to being a safe, welcoming, and harassment-free experience for everyone, regardless of gender, gender identity, age, sexual orientation, disability, physical appearance, race, ethnicity, religion, or any other characteristic. We do not tolerate harassment of any kind. All attendees, speakers, sponsors, and staff are expected to treat one another with respect and kindness. Anyone asked to stop harassing behavior is expected to comply immediately. If you experience or witness harassment, please report it to a conference organizer right away. We are here to support you." },
    { q: "Will sessions be recorded?", a: "The 2026 conference will not be recorded. This first year is all about being in the room — the conversations, connections, and energy that can only happen in person. That said, we hope to have recordings available for future conferences, so stay tuned as the event grows." },
    { q: "Is there a refund policy?", a: "Yes. We want to be fair and transparent — just like our advisors. If you cancel more than 60 days before the conference (before April 24, 2026), you'll receive a full refund. Cancellations between 30 and 60 days out (April 24 – May 24, 2026) are eligible for a 50% refund. Cancellations within 30 days of the conference (after May 24, 2026) are non-refundable, as costs are locked in by that point. However, ticket transfers are always welcome — if you can't make it, you're free to send a colleague in your place at no charge. Just email us at info@adviceonlynetwork.com to arrange a transfer." },
    { q: "How can I become a sponsor?", a: "We're actively seeking sponsors who align with the Advice-Only philosophy. Reach out to us at info@adviceonlynetwork.com to discuss sponsorship opportunities." },
    { q: "Is this event open to press and media?", a: "Yes! We welcome journalists, industry observers, and curious members of the financial media community. If you're interested in attending as a member of the press or covering the Advice-Only movement, please reach out to us at info@adviceonlynetwork.com with a brief note about your outlet or interest. We'll be happy to discuss press access and credentials." },
  ];
  return (
    <section id="faq" style={{ padding: isMobile ? "60px 20px" : "96px 32px", background: C.cream }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">Got Questions?</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="faq-item" style={{ borderTop: i === 0 ? `1px solid ${C.grayLight}` : "none" }}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={`faq-chevron ${open === i ? "open" : ""}`}>▾</span>
              </button>
              <div
                className={`faq-answer ${open === i ? "open" : ""}`}
                style={{ maxHeight: open === i ? 300 : 0 }}
              >
                <div style={{ paddingBottom: 20, fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: C.grayMid, lineHeight: 1.75 }}>
                  {item.a}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Press Strip ───────────────────────────────────────────────────────────
function PressStrip() {
  return (
    <section style={{ background: C.cream, borderTop: `1px solid ${C.grayLight}`, borderBottom: `1px solid ${C.grayLight}`, padding: "40px 20px" }}>
      <div className="press-strip-inner" style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 4 }}>
              Press & Media Inquiries
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: C.grayMid, lineHeight: 1.6, maxWidth: 520 }}>
              Journalists and industry observers are welcome. We'd love to have curious voices in the room as the Advice-Only movement grows. Reach out to discuss press credentials.
            </p>
          </div>
        </div>
        <a
          href="mailto:info@adviceonlynetwork.com?subject=Press Inquiry - Advice-Only Conference 2026"
          style={{
            display: "inline-block",
            border: `2px solid ${C.navy}`,
            color: C.navy,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "12px 26px",
            borderRadius: 4,
            flexShrink: 0,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = C.navy; e.target.style.color = C.white; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.navy; }}
        >
          Request Press Access →
        </a>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ padding: "60px 20px", background: C.navy }}>
      <Reveal>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", color: C.white, lineHeight: 1.05, marginBottom: 20 }}>
            See You in<br /><em style={{ color: C.amber }}>Denver · 2027</em>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            The Advice-Only Conference is coming to Denver, CO in 2027.<br />
            Pre-register now to lock in our Early Bird rate of $399.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@adviceonlynetwork.com?subject=2027 Early Bird Pre-Registration" className="cta-primary">Pre-Register for $399</a>
            <a href="https://www.adviceonlynetwork.com" target="_blank" rel="noopener noreferrer" className="cta-secondary">
              Visit Advice-Only Network
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: C.navyDark, borderTop: "1px solid rgba(255,255,255,0.06)", padding: isMobile ? "40px 20px 24px" : "48px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 32 : 48, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: C.white, marginBottom: 4 }}>Advice-Only Conference</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.amber, marginBottom: 16 }}>Minneapolis 2026 · Denver 2027</div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 320 }}>
              Hosted by The Advice-Only Network — the premier directory for Advice-Only financial planners across the country.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Quick Links</div>
            {["About", "Agenda", "Tickets", "FAQ"].map((l) => (
              <div key={l} style={{ marginBottom: 8 }}>
                <a href={`#${l.toLowerCase()}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = C.white}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</a>
              </div>
            ))}
            <div style={{ marginBottom: 8 }}>
              <a href="/terms" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.white}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>Terms & Conditions</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Contact</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              <span style={{ display: "block", marginBottom: 6 }}>📧 <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal }}>info@adviceonlynetwork.com</a></span>
              <span style={{ display: "block" }}>🌐 <a href="https://www.adviceonlynetwork.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>adviceonlynetwork.com</a></span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 12 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            © 2026 The Advice-Only Network. All rights reserved.
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            adviceonlyconference.com
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function AdviceOnlyConference() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <Ticker />
      <About />
      <WhyAttend />
      <Agenda />
      <Tickets />
      <FAQ />
      <PressStrip />
      <FinalCTA />
      <Footer />
    </div>
  );
}
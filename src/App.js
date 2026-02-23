import { useState, useEffect, useRef } from "react";

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
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: ${C.creamLight}; color: ${C.bodyText}; }
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── Countdown Hook ────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
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
  const isMobile = useIsMobile();
  const links = ["About", "Agenda", "Speakers", "Venue", "Hotels", "Tickets", "FAQ"];

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
        <a href="#" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.35rem", color: C.white, letterSpacing: "0.02em" }}>
            Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "1.2rem" }}>-</span>Only
          </span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.65rem", color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Conference 2026
          </span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {links.slice(0, -1).map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); }}
              >
                {l}
              </a>
            ))}
            <a
              href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a"
              target="_blank"
              rel="noopener noreferrer"
              className="ticket-btn"
              style={{ textDecoration: "none" }}
            >
              Get Tickets
            </a>
          </nav>
        )}

        {/* Mobile: ticket button + hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a"
              target="_blank"
              rel="noopener noreferrer"
              className="ticket-btn"
              style={{ textDecoration: "none", fontSize: "0.78rem", padding: "8px 14px" }}
            >
              Tickets
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}
              aria-label="Toggle menu"
            >
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
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          maxHeight: mobileOpen ? 420 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          background: C.navyDark,
          borderTop: mobileOpen ? `1px solid rgba(255,255,255,0.08)` : "none",
        }}>
          <div style={{ padding: "12px 24px 24px" }}>
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid rgba(255,255,255,0.06)`,
                  padding: "14px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.04em",
                  color: C.white,
                  cursor: "pointer",
                  opacity: 0.85,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Ticker ────────────────────────────────────────────────────────────────
function Ticker() {
  const msgs = ["June 23–24, 2026", "Minneapolis, MN", "Open Book Space", "Advice-Only Network", "Pure Advice · No Commissions · No AUM", "The Industry's First Advice-Only Conference", "Early Bird Pricing Now Available"];
  const doubled = [...msgs, ...msgs];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );
}

// ─── Countdown Block ───────────────────────────────────────────────────────
function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: "center", minWidth: 70 }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
        fontWeight: 700,
        color: C.white,
        lineHeight: 1,
        background: "rgba(255,255,255,0.07)",
        borderRadius: 6,
        padding: "10px 18px",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.12)",
        minWidth: 82,
      }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const { d, h, m, s } = useCountdown("2026-06-23T08:00:00");
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
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal }}>
          The Advice-Only Network Presents
        </span>
      </div>

      <h1 className="fade-up-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(3.2rem, 8vw, 7rem)", lineHeight: 0.95, color: C.white, marginBottom: 20, letterSpacing: "-0.01em" }}>
        The Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.75em", verticalAlign: "0.12em" }}>-</span>Only<br />
        <em style={{ color: C.amber }}>Conference</em>
      </h1>

      <p className="fade-up-2" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.72)", maxWidth: 620, lineHeight: 1.6, marginBottom: 32 }}>
        Two days. One movement. The only conference built exclusively for advice-only financial planners — where pure advice meets real community.
      </p>

      <div className="fade-up-3" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginBottom: 48 }}>
        {[
          { icon: "📅", text: "June 23–24, 2026" },
          { icon: "📍", text: "Open Book Space · Minneapolis, MN" },
          { icon: "🎟️", text: "Limited Seats Available" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "8px 16px" }}>
            <span>{icon}</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{text}</span>
          </div>
        ))}
      </div>

      <div className="fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
        <a href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a" target="_blank" rel="noopener noreferrer" className="cta-primary">Secure Your Spot</a>
        <a href="#about" className="cta-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>Learn More</a>
      </div>

      {/* Countdown */}
      <div className="fade-up-4" style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
          Conference begins in
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <CountdownUnit value={d} label="Days" />
          <CountdownUnit value={h} label="Hours" />
          <CountdownUnit value={m} label="Minutes" />
          <CountdownUnit value={s} label="Seconds" />
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", opacity: 0.5 }} onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.white }}>Scroll</span>
        <div style={{ width: 24, height: 36, border: `2px solid rgba(255,255,255,0.4)`, borderRadius: 100, display: "flex", justifyContent: "center", paddingTop: 6 }}>
          <div style={{ width: 4, height: 8, background: C.white, borderRadius: 2, animation: "fadeUp 1.5s infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  const isMobile = useIsMobile();
  const stats = [
    { value: "2", label: "Full Days" },
    { value: "3", label: "Unique Spaces" },
    { value: "75+", label: "Attendees" },
    { value: "10+", label: "Expert Speakers" },
  ];
  return (
    <section id="about" style={{ padding: "96px 32px", background: C.creamLight }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <div className="section-label">About the Conference</div>
              <div className="divider" />
              <h2 className="section-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: 24 }}>
                Where the Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.9em" }}>-</span>Only Movement Comes Alive
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: C.bodyText, marginBottom: 20 }}>
                The Advice-Only Conference is the first-of-its-kind gathering exclusively for advice-only financial planners. Hosted by The Advice-Only Network in the heart of downtown Minneapolis, this is your chance to connect with the most forward-thinking minds in advice-only financial planning.
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", lineHeight: 1.75, color: C.bodyText, marginBottom: 32 }}>
                No product pitches. No commission-hungry sales reps. Just real advisors doing real work for real people — and two days to celebrate what makes our model the future of financial planning.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#agenda" className="cta-primary" style={{ background: C.navy, color: C.white }} onClick={(e) => { e.preventDefault(); document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" }); }}>View the Agenda</a>
                <a href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a" target="_blank" rel="noopener noreferrer" className="cta-primary">Get Your Ticket</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.grayLight, borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 40px rgba(11,31,58,0.08)", marginBottom: 28 }}>
                {stats.map(({ value, label }, i) => (
                  <div key={label} style={{
                    background: i % 2 === 0 ? C.navy : C.navyDark,
                    padding: "36px 28px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "3.2rem", color: C.amber, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 8 }}>{label}</div>
                  </div>
                ))}
              </div>
              {/* Quote */}
              <div style={{ background: C.white, borderLeft: `4px solid ${C.teal}`, borderRadius: "0 8px 8px 0", padding: "20px 24px", boxShadow: "0 4px 20px rgba(11,31,58,0.06)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.15rem", color: C.navy, lineHeight: 1.55 }}>
                  "Advice-only is not just a business model — it's a commitment to the client. Come celebrate it with us."
                </p>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: C.teal, marginTop: 10, letterSpacing: "0.06em" }}>
                  — The Advice-Only Network Team
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Why Attend ────────────────────────────────────────────────────────────
function WhyAttend() {
  const reasons = [
    { icon: "🤝", title: "Real Community", desc: "Connect face-to-face with advisors who share your values. Build partnerships, referral relationships, and lifelong friendships with those who get it." },
    { icon: "🎓", title: "Actionable Education", desc: "Deep-dive sessions on building and scaling an advice-only practice, compliance, marketing, pricing strategies, and the business of serving clients on your terms." },
    { icon: "💡", title: "Fresh Inspiration", desc: "Reignite your passion for the work. Leave Minneapolis buzzing with new ideas, renewed energy, and a clear vision for where your practice is headed." },
    { icon: "📢", title: "Shape the Movement", desc: "Be part of defining what advice-only means for the next decade. Your voice and your presence help build the future of fiduciary planning." },
    { icon: "🏙️", title: "Beautiful Venue", desc: "Hosted at the iconic Open Book space in downtown Minneapolis — exposed brick, natural light, and a literary creative energy that inspires greatness." },
    { icon: "🎉", title: "Celebrate the Win", desc: "You chose the hardest, most principled path in financial planning. Come celebrate that with people who understand exactly what you've built." },
  ];
  return (
    <section style={{ padding: "96px 32px", background: C.cream }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {reasons.map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="hover-lift" style={{ background: C.white, borderRadius: 10, padding: "32px 28px", border: `1px solid ${C.grayLight}`, height: "100%" }}>
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: C.navy, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: C.grayMid, lineHeight: 1.7 }}>{desc}</p>
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
      { time: "8:00 AM", title: "Registration & Morning Coffee", type: "break", note: "Registration open until 2:00 PM · Performance Hall Lobby" },
      { time: "9:00 AM", title: "Opening Keynote", type: "keynote", note: "Welcome to the Advice-Only Conference — Setting the stage for two transformative days" },
      { time: "10:00 AM", type: "concurrent", sessions: [
        { title: "Pricing Strategy for Advice-Only Advisors", room: "Performance Hall", type: "session" },
        { title: "Building Your Advice-Only Practice From Scratch", room: "Breakout Room", type: "session" },
      ]},
      { time: "11:15 AM", type: "concurrent", sessions: [
        { title: "Breakout Session · Topic TBD", room: "Performance Hall", type: "session" },
        { title: "Breakout Session · Topic TBD", room: "Breakout Room", type: "session" },
      ]},
      { time: "12:30 PM", title: "Lunch & Networking", type: "break", note: "Catered lunch · Open networking with all attendees" },
      { time: "1:30 PM", title: "Keynote Presentation", type: "keynote", note: "Performance Hall · Speaker TBD" },
      { time: "2:45 PM", type: "concurrent", sessions: [
        { title: "Breakout Session · Topic TBD", room: "Performance Hall", type: "session" },
        { title: "Breakout Session · Topic TBD", room: "Breakout Room", type: "session" },
      ]},
      { time: "4:00 PM", title: "Panel: The Future of Advice-Only Planning", type: "keynote", note: "Moderated panel with industry leaders" },
      { time: "5:30 PM", title: "Evening Event & Networking 🎉", type: "break", note: "Celebrate Day 1 with your fellow attendees" },
    ],
    2: [
      { time: "8:30 AM", title: "Registration & Morning Coffee", type: "break", note: "Come early, connect deeply" },
      { time: "9:00 AM", title: "Day 2 Keynote", type: "keynote", note: "Speaker & topic TBD" },
      { time: "10:00 AM", type: "concurrent", sessions: [
        { title: "Compliance for Advice-Only Advisors", room: "Performance Hall", type: "session" },
        { title: "Tech Stack Deep Dive: What You Do (and Don't) Need as Advice-Only", room: "Breakout Room", type: "session" },
      ]},
      { time: "11:15 AM", type: "concurrent", sessions: [
        { title: "Breakout Session · Topic TBD", room: "Performance Hall", type: "session" },
        { title: "Breakout Session · Topic TBD", room: "Breakout Room", type: "session" },
      ]},
      { time: "12:15 PM", title: "Lunch & Networking", type: "break", note: "Catered lunch · Open networking with all attendees" },
      { time: "1:30 PM", title: "Marketing an Advice-Only Practice in 2026", type: "session", note: "Performance Hall" },
      { time: "2:45 PM", type: "concurrent", sessions: [
        { title: "Breakout Session · Topic TBD", room: "Performance Hall", type: "session" },
        { title: "Breakout Session · Topic TBD", room: "Breakout Room", type: "session" },
      ]},
      { time: "4:00 PM", title: "Closing Keynote", type: "keynote", note: "Speaker & topic TBD" },
      { time: "5:00 PM", title: "Farewells & Departures 🥂", type: "break", note: "Celebrating two great days together" },
    ],
  };
  const typeColors = {
    keynote: { bg: `rgba(11,31,58,0.06)`, border: C.navy, dot: C.navy },
    session: { bg: `rgba(24,185,197,0.07)`, border: C.teal, dot: C.teal },
    workshop: { bg: `rgba(159,140,73,0.08)`, border: C.amber, dot: C.amber },
    break: { bg: `rgba(154,146,134,0.06)`, border: C.grayMid, dot: C.grayMid },
  };
  return (
    <section id="agenda" style={{ padding: "96px 32px", background: C.creamLight }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Conference Schedule</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 12 }}>Agenda</h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: C.grayMid, fontSize: "0.95rem" }}>
              Full speaker lineup and session details coming soon. Schedule subject to change.
            </p>
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
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 78, top: 0, bottom: 0, width: 2, background: C.grayLight }} />

          {agenda[day].map((item, i) => {
            // ── Concurrent / parallel sessions ──
            if (item.type === "concurrent") {
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div style={{ display: "flex", gap: 24, marginBottom: 10, alignItems: "flex-start" }}>
                    {/* Time */}
                    <div style={{ minWidth: 68, textAlign: "right", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: C.grayMid, paddingTop: 14, letterSpacing: "0.03em", flexShrink: 0 }}>
                      {item.time}
                    </div>
                    {/* Dot */}
                    <div style={{ position: "relative", zIndex: 1, marginTop: 16, flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.teal, border: `3px solid ${C.creamLight}` }} />
                    </div>
                    {/* Side-by-side session cards */}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                      {item.sessions.map((s, si) => {
                        const col = typeColors[s.type];
                        return (
                          <div key={si} style={{ background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.92rem", color: C.navy, marginBottom: 5 }}>{s.title}</div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(11,31,58,0.06)", borderRadius: 100, padding: "3px 10px" }}>
                              <span style={{ fontSize: "0.65rem" }}>📍</span>
                              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.grayMid, letterSpacing: "0.04em" }}>{s.room}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            }

            // ── Single session ──
            const col = typeColors[item.type];
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ display: "flex", gap: 24, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 68, textAlign: "right", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: C.grayMid, paddingTop: 14, letterSpacing: "0.03em" }}>
                    {item.time}
                  </div>
                  <div style={{ position: "relative", zIndex: 1, marginTop: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: col.dot, border: `3px solid ${C.creamLight}`, flexShrink: 0 }} />
                  </div>
                  <div style={{ flex: 1, background: col.bg, borderLeft: `3px solid ${col.border}`, borderRadius: "0 8px 8px 0", padding: "12px 18px", marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem", color: C.navy }}>{item.title}</div>
                    {item.note && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: C.grayMid, marginTop: 3 }}>{item.note}</div>}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 40, padding: "24px", background: `rgba(24,185,197,0.06)`, borderRadius: 10, border: `1px dashed ${C.teal}` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: C.grayMid }}>
              📬 Want to be notified when the full speaker lineup drops?{" "}
              <a href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, fontWeight: 600 }}>Grab your ticket</a> and you'll be the first to know.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Speakers ──────────────────────────────────────────────────────────────
function Speakers() {
  return (
    <section id="speakers" style={{ padding: "96px 32px", background: C.navy }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal }}>
              Industry Leaders & Visionaries
            </div>
            <div style={{ width: 56, height: 3, background: C.amber, margin: "14px auto 24px", borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white, lineHeight: 1.1 }}>
              Meet the Speakers
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginTop: 12 }}>
              Speaker announcements coming very soon. Follow us to stay in the loop.
            </p>
          </div>
        </Reveal>

        {/* Placeholder speaker cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
          {[1, 2, 3, 4].map((n) => (
            <Reveal key={n} delay={n * 0.08}>
              <div className="speaker-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: `rgba(24,185,197,0.15)`, border: `2px dashed rgba(24,185,197,0.3)`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.8rem" }}>🎙️</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1rem", color: C.white, marginBottom: 4 }}>
                  Speaker {n}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                  Announcement Coming Soon
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 20 }}>
              Interested in speaking at the Advice-Only Conference?
            </p>
            <a
              href="mailto:info@adviceonlynetwork.com?subject=Speaking Interest - Advice-Only Conference 2026"
              style={{ display: "inline-block", border: `1px solid rgba(24,185,197,0.5)`, color: C.teal, padding: "12px 28px", borderRadius: 4, fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s" }}
            >
              Apply to Speak →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Venue ─────────────────────────────────────────────────────────────────
function Venue() {
  const spaces = [
    {
      name: "Performance Hall",
      role: "Main Conference Space",
      sqft: "1,701",
      capacity: "150",
      emoji: "🎭",
      desc: "Our primary gathering space — a dramatic performance hall with exposed brick walls, flexible seating, and full AV capabilities. This is where the magic happens: keynotes, panels, and plenary sessions.",
      link: "https://www.peerspace.com/pages/listings/61f3120bbdb172000d3c7d71",
    },
    {
      name: "Breakout Room",
      role: "Breakout Space",
      sqft: "816",
      capacity: "36",
      emoji: "📚",
      desc: "A beautifully lit meeting room with exposed brick, natural light, and movable furniture. Perfect for intimate breakout sessions, workshops, and afternoon roundtable discussions.",
      link: "https://www.peerspace.com/pages/listings/61f30706bdb172000d3c7797",
    },
    {
      name: "Meeting Room",
      role: "Networking Space",
      sqft: "300",
      capacity: "10",
      emoji: "☀️",
      desc: "A cozy, light-filled room with a private outdoor patio overlooking downtown Minneapolis. Ideal for intimate sessions, one-on-ones, and peer networking.",
      link: "https://www.peerspace.com/pages/listings/641ca432464ca6000e035350",
    },
  ];
  return (
    <section id="venue" style={{ padding: "96px 32px", background: C.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">Where We're Gathering</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 12 }}>
              Open Book Space · Minneapolis
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: C.grayMid, fontSize: "0.98rem", maxWidth: 560, margin: "0 auto" }}>
              Nestled in the heart of downtown Minneapolis, Open Book is a stunning literary and creative center with exposed brick, soaring ceilings, and a warm, inspiring atmosphere.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48, alignItems: "stretch" }}>
          {spaces.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1} style={{ height: "100%" }}>
              <div className="venue-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ background: i === 0 ? C.navy : i === 1 ? C.tealDark : C.amberDark, padding: "28px 24px 20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>{s.role}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.5rem", color: C.white }}>{s.name}</h3>
                  </div>
                  <span style={{ fontSize: "2.4rem" }}>{s.emoji}</span>
                </div>
                <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div style={{ textAlign: "center", background: C.creamLight, borderRadius: 6, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: C.navy }}>{s.sqft}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.grayMid }}>sq ft</div>
                    </div>
                    <div style={{ textAlign: "center", background: C.creamLight, borderRadius: 6, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: C.navy }}>{s.capacity}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.grayMid }}>capacity</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: C.grayMid, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{s.desc}</p>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: C.teal, letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, transition: "gap 0.2s", marginTop: "auto" }}>
                    View Space →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Google Maps Embed */}
        <Reveal>
          <div style={{ borderRadius: 12, overflow: "hidden", height: 380, position: "relative", border: `1px solid ${C.grayLight}`, boxShadow: "0 8px 32px rgba(11,31,58,0.08)" }}>
            <iframe
              title="Open Book Space - Minneapolis"
              src="https://www.google.com/maps?q=1011+Washington+Ave+S,+Minneapolis,+MN+55415&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay pill with address + directions button */}
            <div style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(8px)",
              borderRadius: 100,
              padding: "10px 10px 10px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 4px 24px rgba(11,31,58,0.15)",
              whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: "1rem" }}>📍</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.88rem", color: C.navy }}>
                1011 Washington Ave S, Minneapolis, MN 55415
              </span>
              <a
                href="https://maps.google.com/?q=Open+Book+Minneapolis+1011+Washington+Ave+S"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
                style={{ background: C.navy, color: C.white, padding: "8px 18px", fontSize: "0.78rem", borderRadius: 100, letterSpacing: "0.04em" }}
              >
                Get Directions →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Hotels ────────────────────────────────────────────────────────────────
function Hotels() {
  const amenities = [
    { icon: "🍹", label: "Check in at the bar", desc: "Receive your room key and a complimentary handcrafted cocktail at Bar Moxy" },
    { icon: "📶", label: "Free Wi-Fi", desc: "Complimentary high-speed Wi-Fi for all guests" },
    { icon: "💪", label: "24/7 Fitness Center", desc: "Round-the-clock gym with cardio, free weights, and a Moxy bike" },
    { icon: "🚇", label: "Light Rail Access", desc: "Steps from the Light Rail — easy access to the venue, airport, and all of downtown" },
    { icon: "🐾", label: "Pet Friendly", desc: "Pets welcome (1 pet, up to 30 lbs, $35/night fee)" },
    { icon: "🅿️", label: "On-Site Parking", desc: "Self-parking with in/out privileges available at $40/day" },
  ];

  return (
    <section id="hotels" style={{ padding: "96px 32px", background: C.creamLight }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">Where to Stay</div>
            <div className="divider divider-center" />
            <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 12 }}>
              Our Official Conference Hotel
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: C.grayMid, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              We've secured a special block rate exclusively for Advice-Only Conference attendees. Book early — rooms at this rate are limited.
            </p>
          </div>
        </Reveal>

        {/* Main Hotel Card */}
        <Reveal delay={0.1}>
          <div style={{ background: C.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.grayLight}`, boxShadow: "0 12px 48px rgba(11,31,58,0.1)", marginBottom: 32 }}>

            {/* Top banner */}
            <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0F2847 60%, #0A3D62 100%)`, padding: "36px 40px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
              <div>
                {/* Official block badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(159,140,73,0.15)", border: `1px solid rgba(159,140,73,0.4)`, borderRadius: 100, padding: "5px 14px", marginBottom: 14 }}>
                  <span style={{ fontSize: "0.75rem" }}>🏨</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.amber }}>
                    Official Conference Hotel · Block Rate
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: C.white, lineHeight: 1.05, marginBottom: 8 }}>
                  Moxy Minneapolis Downtown
                </h3>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>📍</span>
                  <span>247 Chicago Avenue South, Minneapolis, MN 55415</span>
                </div>
              </div>

              {/* Price callout */}
              <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "20px 28px", textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  Conference Rate
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "3rem", color: C.amber, lineHeight: 1 }}>
                  $199
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                  per night
                </div>
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.1)", margin: "12px 0" }} />
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                  Limited rooms available<br />at this rate
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "32px 40px" }}>

              {/* Description */}
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: C.bodyText, lineHeight: 1.75, marginBottom: 32, maxWidth: 720 }}>
                Moxy Minneapolis is a hip, modern hotel right in the heart of Downtown East — within short walking distance from the conference venue. Known for its playful energy, it's the perfect place to unwind after a full day of sessions. Check in at Bar Moxy, cocktail in hand, and connect with fellow attendees in the lobby's communal gathering spaces.
              </p>

              {/* Amenities grid */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.grayMid, marginBottom: 16 }}>
                  Hotel Highlights
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                  {amenities.map(({ icon, label, desc }) => (
                    <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: C.creamLight, borderRadius: 8, padding: "14px 16px" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>{icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: C.navy, marginBottom: 2 }}>{label}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: C.grayMid, lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check-in details + CTA row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", borderTop: `1px solid ${C.grayLight}`, paddingTop: 24 }}>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {[
                    { label: "Check-in", value: "4:00 PM" },
                    { label: "Check-out", value: "11:00 AM" },
                    { label: "Phone", value: "+1 612-400-1810" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.grayMid, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: C.navy }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href="https://www.marriott.com/en-us/hotels/mspod-moxy-minneapolis-downtown/overview/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary"
                    style={{ background: C.navy, color: C.white, fontSize: "0.85rem", padding: "12px 24px" }}
                  >
                    Book at $199/night →
                  </a>
                  <a
                    href="https://maps.google.com/?q=Moxy+Minneapolis+Downtown+247+Chicago+Avenue+South"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", border: `2px solid ${C.grayLight}`, color: C.grayMid, fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.04em", padding: "10px 22px", borderRadius: 4, transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.navy; e.currentTarget.style.color = C.navy; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.color = C.grayMid; }}
                  >
                    📍 Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Marriott Bonvoy note */}
        <Reveal delay={0.15}>
          <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.grayLight}`, padding: "20px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: C.grayMid, lineHeight: 1.65, flex: 1 }}>
              <strong style={{ color: C.navy }}>Marriott Bonvoy members</strong> receive complimentary Wi-Fi when booking direct. Use the conference block code at checkout to unlock the $199/night rate. Questions about the hotel block? Email us at{" "}
              <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>info@adviceonlynetwork.com</a>.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ─── Tickets ───────────────────────────────────────────────────────────────
function Tickets() {
  const tiers = [
    {
      name: "General Admission",
      price: "$299",
      priceSub: "Early Bird — ends April 15th",
      priceRegular: "$399 after April 15th",
      perks: [
        "Full 2-day access (June 23–24)",
        "All keynotes & breakout sessions",
        "Lunch both days",
        "Evening event — Night of June 23rd",
        "Networking & peer connections",
        "Access to all three Open Book spaces",
      ],
      highlight: true,
      cta: "Register Now",
    },
  ];
  return (
    <section id="tickets" style={{ padding: "96px 32px", background: `linear-gradient(160deg, ${C.navyDark} 0%, #0F2847 60%, #0A3D62 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(24,185,197,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(159,140,73,0.08) 0%, transparent 40%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal }}>
              Join Us in Minneapolis
            </div>
            <div style={{ width: 56, height: 3, background: C.amber, margin: "14px auto 24px", borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white, marginBottom: 12 }}>
              Get Your Ticket
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem" }}>
              Early bird tickets are $299 through April 15th — then $399. Seats are limited.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} style={{ width: "100%", maxWidth: 480 }}>
              <div style={{
                background: t.highlight ? C.white : "rgba(255,255,255,0.05)",
                border: t.highlight ? `2px solid ${C.amber}` : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "36px 28px",
                position: "relative",
                textAlign: "center",
              }}>
                {t.highlight && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: C.teal, color: C.white, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    🐦 Early Bird Pricing
                  </div>
                )}
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: t.highlight ? C.navy : C.white, marginBottom: 12 }}>{t.name}</h3>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "3.4rem", color: t.highlight ? C.navy : C.amber, lineHeight: 1, marginBottom: 4 }}>{t.price}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: C.teal, marginBottom: 4 }}>{t.priceSub}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: C.grayMid, marginBottom: 28 }}>{t.priceRegular}</div>
                <ul style={{ listStyle: "none", marginBottom: 32, textAlign: "left" }}>
                  {t.perks.map((p) => (
                    <li key={p} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: t.highlight ? C.bodyText : "rgba(255,255,255,0.7)", padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: `1px solid ${t.highlight ? C.grayLight : "rgba(255,255,255,0.06)"}` }}>
                      <span style={{ color: C.teal, fontWeight: 700, marginTop: 1 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
                <button
                  className="cta-primary"
                  style={{ width: "100%", background: t.highlight ? C.navy : C.amber, color: t.highlight ? C.white : C.navy, fontSize: "0.88rem" }}
                  onClick={() => window.open("https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a", "_blank")}
                >
                  {t.cta} →
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: "center", padding: "28px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>
              Questions about tickets or group rates? Email us at{" "}
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
  const items = [
    { q: "Who is this conference for?", a: "The Advice-Only Conference is designed for advice-only financial planners, advisors considering making the switch to an advice-only model, and anyone who believes in the future of real financial planning with reduced conflicts of interest." },
    { q: "What does 'advice-only' mean?", a: "Advice-only financial planners charge solely for their advice — no commissions, no assets under management fees, no product sales. They provide pure, fiduciary guidance with reduced conflicts of interest." },
    { q: "Where exactly is the venue?", a: "The conference is held at Open Book Space in downtown Minneapolis, Minnesota. Open Book is a celebrated literary and creative center with beautiful event spaces featuring exposed brick, natural light, and a warm, inspiring atmosphere." },
    { q: "What's the dress code?", a: "Come as you are! We want you to be comfortable, so wear whatever you feel good in. This is a welcoming, relaxed environment — there's no need to dress up." },
    { q: "What is your inclusion & harassment policy?", a: "The Advice-Only Conference is committed to being a safe, welcoming, and harassment-free experience for everyone — regardless of gender, gender identity, age, sexual orientation, disability, physical appearance, race, ethnicity, religion, or any other characteristic. We do not tolerate harassment of any kind. All attendees, speakers, sponsors, and staff are expected to treat one another with respect and kindness. Anyone asked to stop harassing behavior is expected to comply immediately. If you experience or witness harassment, please report it to a conference organizer right away. We are here to support you." },
    { q: "Will sessions be recorded?", a: "The 2026 conference will not be recorded. This first year is all about being in the room — the conversations, connections, and energy that can only happen in person. That said, we hope to have recordings available for future conferences, so stay tuned as the event grows." },
    { q: "Is there a refund policy?", a: "Yes. We want to be fair and transparent — just like our advisors. If you cancel more than 60 days before the conference (before April 24, 2026), you'll receive a full refund. Cancellations between 30 and 60 days out (April 24 – May 24, 2026) are eligible for a 50% refund. Cancellations within 30 days of the conference (after May 24, 2026) are non-refundable, as costs are locked in by that point. However, ticket transfers are always welcome — if you can't make it, you're free to send a colleague in your place at no charge. Just email us at info@adviceonlynetwork.com to arrange a transfer." },
    { q: "How can I become a sponsor?", a: "We're actively seeking sponsors who align with the advice-only philosophy. Reach out to us at info@adviceonlynetwork.com to discuss sponsorship opportunities." },
    { q: "Is this event open to press and media?", a: "Yes! We welcome journalists, industry observers, and curious members of the financial media community. If you're interested in attending as a member of the press or covering the advice-only movement, please reach out to us at info@adviceonlynetwork.com with a brief note about your outlet or interest. We'll be happy to discuss press access and credentials." },
  ];
  return (
    <section id="faq" style={{ padding: "96px 32px", background: C.cream }}>
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
    <section style={{ background: C.cream, borderTop: `1px solid ${C.grayLight}`, borderBottom: `1px solid ${C.grayLight}`, padding: "40px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: "2rem", flexShrink: 0 }}>📰</div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 4 }}>
              Press & Media Inquiries
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: C.grayMid, lineHeight: 1.6, maxWidth: 520 }}>
              Journalists and industry observers are welcome. We'd love to have curious voices in the room as the advice-only movement grows. Reach out to discuss press credentials.
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
    <section style={{ padding: "80px 32px", background: C.navy }}>
      <Reveal>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", color: C.white, lineHeight: 1.05, marginBottom: 20 }}>
            Don't Miss the First-Ever<br /><em style={{ color: C.amber }}>Advice-Only Conference</em>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            June 23–24, 2026 · Open Book Space · Minneapolis, MN<br />
            Seats are limited. Don't wait.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://buy.stripe.com/9B600k2EVdeS8To4ja4Vy0a" target="_blank" rel="noopener noreferrer" className="cta-primary">Secure Your Spot Today</a>
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
    <footer style={{ background: C.navyDark, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 32 : 48, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: C.white, marginBottom: 4 }}>Advice-Only Conference</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.amber, marginBottom: 16 }}>June 23–24, 2026 · Minneapolis</div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 320 }}>
              Hosted by The Advice-Only Network — the premier directory for advice-only financial planners across the country.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Quick Links</div>
            {["About", "Agenda", "Speakers", "Venue", "Hotels", "Tickets", "FAQ"].map((l) => (
              <div key={l} style={{ marginBottom: 8 }}>
                <a href={`#${l.toLowerCase()}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = C.white}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Contact</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              <span style={{ display: "block", marginBottom: 6 }}>📧 <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal }}>info@adviceonlynetwork.com</a></span>
              <span style={{ display: "block", marginBottom: 6 }}>🌐 <a href="https://www.adviceonlynetwork.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>adviceonlynetwork.com</a></span>
              <span style={{ display: "block" }}>📍 Minneapolis, MN</span>
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
export default function App() {
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
      <Speakers />
      <Venue />
      <Hotels />
      <Tickets />
      <FAQ />
      <PressStrip />
      <FinalCTA />
      <Footer />
    </div>
  );
}
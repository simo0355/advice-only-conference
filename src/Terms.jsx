import { useEffect } from "react";

const C = {
  navy: "#0B1F3A",
  navyDark: "#071428",
  teal: "#18B9C5",
  amber: "#9F8C49",
  cream: "#F6F1E8",
  creamLight: "#FBF8F3",
  white: "#FFFFFF",
  grayLight: "#E8E3D8",
  grayMid: "#9A9286",
  bodyText: "#2C3E50",
};

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap";
if (!document.head.querySelector('link[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

function Section({ number, title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.7rem",
          letterSpacing: "0.18em", textTransform: "uppercase", color: C.amber,
          background: `rgba(159,140,73,0.1)`, border: `1px solid rgba(159,140,73,0.3)`,
          borderRadius: 100, padding: "3px 10px", flexShrink: 0
        }}>
          {number}
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
          fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", color: C.navy, margin: 0, lineHeight: 1.2
        }}>
          {title}
        </h2>
      </div>
      <div style={{ paddingLeft: 0 }}>{children}</div>
    </div>
  );
}

function P({ children, bold }) {
  return (
    <p style={{
      fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: C.bodyText,
      lineHeight: 1.8, marginBottom: 14, fontWeight: bold ? 600 : 400
    }}>
      {children}
    </p>
  );
}

function SubHeading({ children }) {
  return (
    <p style={{
      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.88rem",
      color: C.navy, letterSpacing: "0.04em", marginTop: 20, marginBottom: 8,
      textTransform: "uppercase"
    }}>
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul style={{ margin: "10px 0 16px 0", paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ color: C.amber, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>—</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.92rem", color: C.bodyText, lineHeight: 1.7 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.grayLight, margin: "40px 0" }} />;
}

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions — The Advice-Only Conference 2026";
  }, []);

  return (
    <div style={{ background: C.creamLight, minHeight: "100vh" }}>

      {/* Nav bar */}
      <header style={{ background: C.navyDark, borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.25rem", color: C.white }}>
              Advice<span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>-</span>Only
            </span>
            <span style={{ display: "block", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.6rem", color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Conference 2026
            </span>
          </a>
          <a href="/" style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.82rem",
            color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.04em",
            display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.color = C.white}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          >
            ← Back to Conference
          </a>
        </div>
      </header>

      {/* Hero band */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, #0F2847 100%)`,
        padding: "56px 24px 48px",
        textAlign: "center"
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.72rem",
          letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal, marginBottom: 14
        }}>
          The Advice-Only Conference 2026
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: C.white, margin: "0 0 14px",
          lineHeight: 1.1
        }}>
          Terms & Conditions
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem",
          color: "rgba(255,255,255,0.5)", margin: 0
        }}>
          June 23–24, 2026 · Open Book Space · Minneapolis, MN · Last updated February 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px 96px" }}>

        {/* Intro */}
        <div style={{
          background: C.white, border: `1px solid ${C.grayLight}`,
          borderLeft: `4px solid ${C.teal}`,
          borderRadius: "0 8px 8px 0", padding: "20px 24px", marginBottom: 48
        }}>
          <P>
            By purchasing a ticket to the Advice-Only Conference 2026 ("the Conference"), you ("Attendee")
            agree to be bound by these Terms & Conditions. These terms apply to all attendees, speakers,
            sponsors, and guests. Questions can be directed to{" "}
            <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>
              info@adviceonlynetwork.com
            </a>.
          </P>
        </div>

        <Section number="01" title="Registration & Tickets">
          <P>
            Ticket purchases are subject to availability. Your registration is confirmed upon receipt
            of full payment. A confirmation email will be sent to the address provided at checkout.
          </P>
          <P>
            Tickets are personal and non-transferable except as described in the Refund & Cancellation
            Policy below. Attendees must present valid photo ID and their confirmation email at check-in.
            The Organizer reserves the right to refuse entry to any attendee who cannot verify their
            registration.
          </P>
        </Section>

        <Divider />

        <Section number="02" title="Refund & Cancellation Policy">
          <P>The Organizer understands that plans change. The following refund schedule applies:</P>
          <BulletList items={[
            "Cancellations more than 60 days before the Conference (before April 24, 2026): Full refund.",
            "Cancellations between 30 and 60 days before the Conference (April 24 – May 24, 2026): 50% refund.",
            "Cancellations within 30 days of the Conference (after May 24, 2026): No refund.",
          ]} />
          <P>
            Ticket transfers are permitted at any time at no charge. To transfer your ticket, email{" "}
            <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>
              info@adviceonlynetwork.com
            </a>{" "}
            with the name and contact information of the person who will attend in your place.
          </P>
          <P>
            In the unlikely event the Conference is cancelled by the Organizer, all registered
            attendees will receive a full refund. The Organizer is not responsible for any travel,
            accommodation, or other costs incurred by attendees.
          </P>
        </Section>

        <Divider />

        <Section number="03" title="Photography, Video & Marketing Materials">
          <P>
            By attending the Conference, you grant The Advice-Only Network and its authorized
            representatives the right to photograph, film, and record your likeness, voice, and
            image during the event.
          </P>
          <P>You agree that such content may be used for promotional and marketing purposes, including:</P>
          <BulletList items={[
            "The Advice-Only Network website and social media channels",
            "Email newsletters and marketing communications",
            "Future conference promotion materials",
            "Press releases and media coverage",
          ]} />
          <P>
            No compensation will be provided for such use. If you have specific concerns about being
            photographed or recorded, please notify the Organizer at check-in and every reasonable
            effort will be made to accommodate your request.
          </P>
        </Section>

        <Divider />

        <Section number="04" title="Anti-Harassment & Code of Conduct">
          <P>
            The Advice-Only Conference is committed to providing a safe, welcoming, and
            harassment-free experience for everyone, regardless of gender, gender identity, age,
            sexual orientation, disability, physical appearance, race, ethnicity, religion, or any
            other characteristic. We do not tolerate harassment of any kind.
          </P>
          <SubHeading>Unacceptable Behavior</SubHeading>
          <BulletList items={[
            "Offensive verbal or written comments related to personal characteristics",
            "Deliberate intimidation, stalking, or unwanted following",
            "Unwanted photography or recording of other attendees",
            "Sustained disruption of sessions or other conference events",
            "Inappropriate physical contact or unwelcome sexual attention",
            "Advocating for or encouraging any of the above behaviors",
          ]} />
          <SubHeading>Reporting</SubHeading>
          <P>
            If you experience or witness unacceptable behavior, please report it to a conference
            organizer immediately or email{" "}
            <a href="mailto:info@adviceonlynetwork.com" style={{ color: C.teal, fontWeight: 600 }}>
              info@adviceonlynetwork.com
            </a>.
            All reports will be handled with discretion and taken seriously. Anyone asked to stop
            harassing behavior is expected to comply immediately. The Organizer reserves the right
            to remove any attendee who violates this policy from the Conference without refund.
          </P>
        </Section>

        <Divider />

        <Section number="05" title="Liability & Disclaimer">
          <P>
            Attendance at the Conference is at your own risk. The Organizer, its employees, and
            representatives shall not be liable for any loss, damage, injury, or expense suffered
            by any attendee in connection with the Conference.
          </P>
          <P>
            The Organizer reserves the right to modify the Conference program, including speakers
            and session content, at any time. Every effort will be made to communicate significant
            changes to registered attendees in advance.
          </P>
        </Section>

        <Divider />

        <Section number="06" title="Governing Law">
          <P>
            These Terms & Conditions shall be governed by and construed in accordance with the laws
            of the State of Minnesota. Any disputes arising under these terms shall be subject to
            the exclusive jurisdiction of the courts located in Hennepin County, Minnesota.
          </P>
        </Section>

        <Divider />

        {/* Contact card */}
        <div style={{
          background: C.navy, borderRadius: 12, padding: "32px 36px",
          display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 8 }}>
              Questions about these terms?
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: C.white }}>
              The Advice-Only Network
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
              info@adviceonlynetwork.com · adviceonlynetwork.com
            </div>
          </div>
          <a
            href="mailto:info@adviceonlynetwork.com?subject=Terms%20%26%20Conditions%20Question"
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.82rem",
              letterSpacing: "0.08em", textTransform: "uppercase", color: C.navy,
              background: C.amber, padding: "12px 24px", borderRadius: 4,
              textDecoration: "none", flexShrink: 0
            }}
          >
            Contact Us →
          </a>
        </div>

      </div>

      {/* Footer */}
      <div style={{ background: C.navyDark, borderTop: `1px solid rgba(255,255,255,0.06)`, padding: "20px 24px", textAlign: "center" }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
          © 2026 The Advice-Only Network. All rights reserved.
        </span>
      </div>
    </div>
  );
}
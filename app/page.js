"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "62811980282"; // REPLACE with your actual WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to request a free demo of AutoServiceFlow.");

const bots = [
  {
    id: "vet",
    icon: "🐾",
    label: "Vet Clinic",
    title: "AI Vet Consult Assistant",
    description:
      "Handles pet symptom questions, appointment booking, and follow-ups — 24/7, without tying up your receptionist.",
    features: [
      "Answer common pet symptom questions",
      "Auto-book appointments via WhatsApp",
      "Send reminders & follow-ups",
      "Capture new patient leads 24/7",
    ],
    color: "#0f766e",
    bg: "#f0fdfa",
    chat: [
      { from: "user", text: "Hi, my dog has been vomiting since this morning 😟" },
      { from: "bot", text: "I'm sorry to hear that! How old is your dog, and has he eaten anything unusual?" },
      { from: "user", text: "He's 3 years old. He ate some grass earlier." },
      { from: "bot", text: "Grass-eating and vomiting is common. Has it happened more than 3 times? Any blood?" },
      { from: "user", text: "About 2 times. No blood." },
      { from: "bot", text: "Understood. I'd recommend a check-up to be safe. Can I book you in for today at 3pm or tomorrow at 10am?" },
    ],
  },
  {
    id: "machine",
    icon: "⚙️",
    label: "Machine Service",
    title: "AI Machine Troubleshoot Assistant",
    description:
      "Guides customers through step-by-step troubleshooting before dispatching a technician — saving time and service cost.",
    features: [
      "Remote symptom diagnosis",
      "Step-by-step fix guidance",
      "Auto-escalate to technician",
      "Log issues for service history",
    ],
    color: "#1e40af",
    bg: "#eff6ff",
    chat: [
      { from: "user", text: "My compressor keeps shutting down after 10 minutes." },
      { from: "bot", text: "Understood. Is the motor getting hot before it shuts off, or does it stop cold?" },
      { from: "user", text: "Yes, it's hot. The overload light comes on." },
      { from: "bot", text: "That points to thermal overload — likely from airflow blockage or high ambient temp. Is the air filter clean?" },
      { from: "user", text: "I haven't checked it in a while." },
      { from: "bot", text: "Let's start there. Clean the filter and run again. If it still shuts off, I'll schedule a technician visit for you." },
    ],
  },
  {
    id: "consultant",
    icon: "📅",
    label: "Consultant",
    title: "AI Consultant Booking Assistant",
    description:
      "Qualifies leads, answers FAQs, and books discovery calls automatically — so you focus on high-value sessions.",
    features: [
      "Qualify leads before booking",
      "Answer service & pricing FAQs",
      "Auto-schedule discovery calls",
      "Send calendar confirmations",
    ],
    color: "#7c3aed",
    bg: "#f5f3ff",
    chat: [
      { from: "user", text: "Hi, I need help scaling my business. Are you available?" },
      { from: "bot", text: "Welcome! I'd love to connect you. What kind of business are you running — product, service, or ecommerce?" },
      { from: "user", text: "Service business. I do interior design." },
      { from: "bot", text: "Great niche! What's your biggest challenge right now — getting clients, managing projects, or pricing?" },
      { from: "user", text: "Getting clients consistently." },
      { from: "bot", text: "That's exactly what we help with. Can I book you for a free 30-minute strategy call? I have slots Tuesday and Thursday." },
    ],
  },
  {
    id: "hotel",
    icon: "🏨",
    label: "Hotel",
    title: "AI Hotel Booking Assistant",
    description:
      "Handles room inquiries, availability checks, and booking confirmations directly via WhatsApp — no website needed.",
    features: [
      "Check room availability instantly",
      "Handle booking & confirmation",
      "Answer amenity FAQs",
      "Upsell packages & add-ons",
    ],
    color: "#b45309",
    bg: "#fffbeb",
    chat: [
      { from: "user", text: "Do you have rooms available for 2 nights from July 20?" },
      { from: "bot", text: "Yes! How many guests, and would you prefer a standard room or a deluxe suite?" },
      { from: "user", text: "2 adults. Deluxe if possible." },
      { from: "bot", text: "Our Deluxe Sea View Suite is available July 20–22 at Rp950,000/night. Includes breakfast for 2. Interested?" },
      { from: "user", text: "Yes, let's book it!" },
      { from: "bot", text: "Perfect! I just need your name and a contact number to confirm the reservation. Shall I also add airport pickup?" },
    ],
  },
];

const industries = [
  { icon: "🐾", name: "Vet Clinics" },
  { icon: "⚙️", name: "Machine Service" },
  { icon: "📅", name: "Consultants" },
  { icon: "🏨", name: "Hotels" },
  { icon: "🛒", name: "Ecommerce" },
  { icon: "🏥", name: "Clinics" },
];

const outcomes = [
  { stat: "24/7", label: "Customer replies — no staff needed after hours" },
  { stat: "< 5s", label: "Response time on WhatsApp — instant every time" },
  { stat: "3×", label: "More leads captured vs manual WhatsApp handling" },
  { stat: "0", label: "Missed bookings while your team is busy" },
];

export default function Home() {
  const [activeBot, setActiveBot] = useState("vet");
  const bot = bots.find((b) => b.id === activeBot);

  return (
    <main style={{ fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", color: "#0f172a", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "1px solid #e2e8f0", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.5px", color: "#0f172a" }}>
          Auto<span style={{ color: "#0d9488" }}>Service</span>Flow
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="#demos" style={{ fontSize: "0.9rem", color: "#475569", textDecoration: "none" }}>Demos</a>
          <a href="#pricing" style={{ fontSize: "0.9rem", color: "#475569", textDecoration: "none" }}>Pricing</a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#25D366", color: "#fff", padding: "0.5rem 1.1rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
          >
            WhatsApp Us
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #134e4a 100%)", color: "#fff", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(13,148,136,0.25)", color: "#5eead4", padding: "0.35rem 1rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
          AI WhatsApp Automation for Service Businesses
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, margin: "0 auto 1.2rem", maxWidth: "720px", letterSpacing: "-1px" }}>
          Your Business, Answering Customers{" "}
          <span style={{ color: "#2dd4bf" }}>24/7 on WhatsApp</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          We build AI assistants that handle bookings, answer questions, troubleshoot problems, and capture leads — automatically, on WhatsApp.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#25D366", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            💬 Book Free Demo
          </a>
          <a
            href="#demos"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            See Live Demos ↓
          </a>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section style={{ background: "#f8fafc", padding: "3.5rem 2rem", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {outcomes.map((o) => (
            <div key={o.stat} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0d9488", letterSpacing: "-1px" }}>{o.stat}</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.4rem", lineHeight: 1.5 }}>{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ padding: "3rem 2rem", textAlign: "center", background: "#fff" }}>
        <p style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
          BUILT FOR THESE INDUSTRIES
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          {industries.map((i) => (
            <span key={i.name} style={{ background: "#f1f5f9", padding: "0.5rem 1.1rem", borderRadius: "999px", fontSize: "0.9rem", color: "#334155", fontWeight: 500 }}>
              {i.icon} {i.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── DEMO SECTION ── */}
      <section id="demos" style={{ padding: "4rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
              See It In Action
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem" }}>Pick an industry to see how the AI assistant handles a real conversation.</p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {bots.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBot(b.id)}
                style={{
                  padding: "0.55rem 1.2rem",
                  borderRadius: "999px",
                  border: activeBot === b.id ? `2px solid ${b.color}` : "1.5px solid #e2e8f0",
                  background: activeBot === b.id ? b.bg : "#fff",
                  color: activeBot === b.id ? b.color : "#64748b",
                  fontWeight: activeBot === b.id ? 700 : 500,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {b.icon} {b.label}
              </button>
            ))}
          </div>

          {/* Demo card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

            {/* Chat preview */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Chat header */}
              <div style={{ background: bot.color, padding: "1rem 1.2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                  {bot.icon}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{bot.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem" }}>● Online — powered by AutoServiceFlow</div>
                </div>
              </div>
              {/* Messages */}
              <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.7rem", minHeight: "320px" }}>
                {bot.chat.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "0.6rem 0.9rem",
                        borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.from === "user" ? "#dcfce7" : "#f1f5f9",
                        color: "#1e293b",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div>
              <div style={{ display: "inline-block", background: bot.bg, color: bot.color, padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "0.04em" }}>
                {bot.icon} {bot.label.toUpperCase()}
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.3px" }}>{bot.title}</h3>
              <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>{bot.description}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {bot.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "#334155" }}>
                    <span style={{ color: bot.color, fontWeight: 700, marginTop: "1px" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the ${bot.title} for my business. Can we chat?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#25D366", color: "#fff", padding: "0.8rem 1.6rem", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}
              >
                💬 Request This Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "4rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
            How It Works
          </h2>
          <p style={{ color: "#64748b", marginBottom: "3rem" }}>From request to live assistant in days — not months.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.5rem" }}>
            {[
              { step: "01", title: "Free Consultation", desc: "We learn your business and biggest pain points." },
              { step: "02", title: "We Build It", desc: "Custom AI assistant built for your exact workflows." },
              { step: "03", title: "You Test It", desc: "Free pilot period — you see it working before paying." },
              { step: "04", title: "Go Live", desc: "Connected to your WhatsApp. Customers start getting replies." },
            ].map((s) => (
              <div key={s.step} style={{ background: "#f8fafc", borderRadius: "14px", padding: "1.5rem 1.2rem", textAlign: "left", border: "1px solid #e2e8f0" }}>
                <div style={{ color: "#0d9488", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.5rem" }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "4rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
            Simple, Honest Pricing
          </h2>
          <p style={{ color: "#64748b", marginBottom: "3rem" }}>Start with a free pilot. Pay only when you see results.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                name: "Pilot",
                price: "Free",
                sub: "For selected businesses",
                features: ["1 AI assistant", "WhatsApp connected", "Up to 2 weeks free", "Feedback only"],
                cta: "Apply for Pilot",
                highlight: false,
              },
              {
                name: "Starter",
                price: "Rp1.000.000",
                sub: "setup + Rp500k/month",
                features: ["1 AI assistant", "WhatsApp connected", "Lead capture", "Email support"],
                cta: "Get Started",
                highlight: true,
              },
              {
                name: "Pro",
                price: "Rp3.000.000",
                sub: "setup + Rp1.5M/month",
                features: ["Up to 3 assistants", "Custom flows", "Priority support", "Monthly updates"],
                cta: "Talk to Us",
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  background: p.highlight ? "#0f172a" : "#fff",
                  color: p.highlight ? "#fff" : "#0f172a",
                  borderRadius: "16px",
                  padding: "2rem 1.5rem",
                  border: p.highlight ? "none" : "1px solid #e2e8f0",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {p.highlight && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#0d9488", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "0.3rem 0.9rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: p.highlight ? "#94a3b8" : "#64748b", marginBottom: "0.5rem" }}>{p.name}</div>
                <div style={{ fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>{p.price}</div>
                <div style={{ fontSize: "0.8rem", color: p.highlight ? "#94a3b8" : "#64748b", marginBottom: "1.5rem" }}>{p.sub}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ fontSize: "0.88rem", display: "flex", gap: "0.5rem", alignItems: "flex-start", color: p.highlight ? "#e2e8f0" : "#475569" }}>
                      <span style={{ color: "#0d9488", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the ${p.name} plan for AutoServiceFlow.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", padding: "0.75rem", borderRadius: "10px", background: p.highlight ? "#0d9488" : "#f1f5f9", color: p.highlight ? "#fff" : "#0f172a", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: "linear-gradient(135deg, #134e4a, #0f172a)", padding: "4rem 2rem", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>
          Ready to Automate Your Customer Service?
        </h2>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1rem" }}>
          Book a free demo. No commitment. We build it, you test it first.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#25D366", color: "#fff", padding: "1rem 2.5rem", borderRadius: "12px", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          💬 WhatsApp Us Now
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f172a", color: "#475569", padding: "2rem", textAlign: "center", fontSize: "0.85rem" }}>
        <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
          Auto<span style={{ color: "#0d9488" }}>Service</span>Flow
        </div>
        <div>AI Automation for Service Businesses · autoserviceflow.com</div>
        <div style={{ marginTop: "0.5rem" }}>
          <a href={`mailto:helloautoserviceflow@gmail.com`} style={{ color: "#64748b", textDecoration: "none" }}>helloautoserviceflow@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}
"use client";
import { useState } from "react";

// ─── CONFIGURATION — update these before deploying ───────────────────────────
const CALENDLY_URL = "https://calendly.com/YOUR_LINK"; // replace with your Calendly link
const CONTACT_EMAIL = "hello@autoserviceflow.com";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const industries = [
  { icon: "🏥", name: "Clinics & Healthcare" },
  { icon: "💼", name: "Consultants & Agencies" },
  { icon: "🏨", name: "Hotels & Hospitality" },
  { icon: "⚙️", name: "Repair & Field Service" },
  { icon: "🛒", name: "Ecommerce Brands" },
  { icon: "📅", name: "Appointment Businesses" },
];

const painPoints = [
  { icon: "⏱", text: "Slow replies lose leads before staff even see the message" },
  { icon: "📵", text: "Missed calls mean missed bookings — every single day" },
  { icon: "🔁", text: "Staff waste hours answering the same questions repeatedly" },
  { icon: "📋", text: "Manual scheduling creates friction and double-bookings" },
  { icon: "📉", text: "Support teams get overloaded during peak hours" },
  { icon: "⚡", text: "Customers expect instant responses — not next-day replies" },
];

const whatWeBuild = [
  { icon: "💬", title: "AI Chat Assistant", desc: "Handle inquiries instantly on chat channels — WhatsApp, web widget, and more." },
  { icon: "📞", title: "AI Call Assistant", desc: "Answer incoming calls, qualify requests, and route to staff automatically." },
  { icon: "📆", title: "Appointment Booking", desc: "Let customers book without back-and-forth emails or phone tag." },
  { icon: "🎯", title: "Lead Qualification", desc: "Collect names, needs, urgency, and intent — before you even reply." },
  { icon: "🔧", title: "Troubleshooting Support", desc: "Resolve common issues automatically before escalating to your team." },
  { icon: "🤝", title: "Human Handover", desc: "Route complex or urgent conversations to your staff instantly." },
];

const useCases = [
  {
    id: "clinic", label: "Clinic Reception", title: "Clinic Reception Assistant",
    desc: "Books appointments and handles common patient inquiries around the clock — no receptionist required after hours.",
    color: "#0f766e", bg: "#f0fdfa",
    chat: [
      { from: "user", text: "Hi, I'd like to book an appointment. My child has a fever." },
      { from: "bot", text: "Of course. How old is she, and how long has the fever been going on?" },
      { from: "user", text: "She's 4. Fever since last night, around 38.5°C." },
      { from: "bot", text: "Thank you. Any other symptoms — cough, rash, or vomiting?" },
      { from: "user", text: "Just a mild cough." },
      { from: "bot", text: "Understood. I have slots today at 2pm and 4pm. Which works better for you?" },
    ],
  },
  {
    id: "technician", label: "Field Service", title: "Service Technician Assistant",
    desc: "Guides customers through remote troubleshooting and schedules technician visits — before any human is needed.",
    color: "#1e40af", bg: "#eff6ff",
    chat: [
      { from: "user", text: "Our industrial chiller stopped cooling. Temperature is rising." },
      { from: "bot", text: "Let's diagnose this quickly. Is the compressor running or completely silent?" },
      { from: "user", text: "Compressor is running but no cold air." },
      { from: "bot", text: "That suggests a refrigerant or expansion valve issue. Any error codes on the display?" },
      { from: "user", text: "It shows E-04." },
      { from: "bot", text: "E-04 is low refrigerant pressure. I'll schedule a technician — what's your earliest availability?" },
    ],
  },
  {
    id: "consultant", label: "Consultant", title: "Consultant Lead Assistant",
    desc: "Qualifies prospects, answers service questions, and books discovery calls — so you only spend time on serious leads.",
    color: "#7c3aed", bg: "#f5f3ff",
    chat: [
      { from: "user", text: "Hi, I'm looking for help with marketing. Do you work with small businesses?" },
      { from: "bot", text: "Yes, absolutely. What type of business, and what's your biggest challenge?" },
      { from: "user", text: "I run a physio clinic. Struggling to get new patients consistently." },
      { from: "bot", text: "Common pain point in healthcare. Have you tried any digital channels yet?" },
      { from: "user", text: "Not really. Don't know where to start." },
      { from: "bot", text: "Perfect starting point. Can I book you for a free 30-min strategy call? Tuesday 10am or Thursday 3pm?" },
    ],
  },
  {
    id: "hotel", label: "Hotel", title: "Hotel Booking Assistant",
    desc: "Handles room inquiries, availability checks, and reservation confirmations — directly in the guest's preferred channel.",
    color: "#b45309", bg: "#fffbeb",
    chat: [
      { from: "user", text: "Do you have a deluxe room available Aug 10 to 13?" },
      { from: "bot", text: "Yes! How many guests will be staying?" },
      { from: "user", text: "2 adults and 1 child." },
      { from: "bot", text: "Our Deluxe Family Room fits perfectly — $185/night, breakfast for 3 included. 3 nights = $555. Shall I hold it?" },
      { from: "user", text: "Yes. Does it have a sea view?" },
      { from: "bot", text: "Upper floor, partial sea view. I'll reserve it now — may I have your name and email?" },
    ],
  },
  {
    id: "ecommerce", label: "Ecommerce", title: "Ecommerce Support Assistant",
    desc: "Answers product questions, handles order inquiries, and captures new purchase requests — automatically, 24/7.",
    color: "#be123c", bg: "#fff1f2",
    chat: [
      { from: "user", text: "Do you have replacement filters for the Daikin FTK25?" },
      { from: "bot", text: "Yes. Are you looking for the pre-filter, HEPA, or the full filter set?" },
      { from: "user", text: "Full filter set. How much?" },
      { from: "bot", text: "Complete filter set for FTK25 is $42, free shipping. We have 8 in stock." },
      { from: "user", text: "Can I order 2 sets?" },
      { from: "bot", text: "Absolutely — 2 sets at $84 total. May I get your name and delivery address?" },
    ],
  },
];

const pricing = [
  {
    name: "Pilot Launch",
    tag: "Best for businesses testing AI automation",
    setup: "$299",
    monthly: "$150/mo",
    features: ["1 channel (WhatsApp or web widget)", "Up to 200 conversations/month", "Basic conversation flow", "FAQ up to 10 questions", "Email support"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Growth Automation",
    tag: "For active businesses managing regular inquiries",
    setup: "$799",
    monthly: "$299/mo",
    features: ["2 channels (WhatsApp + web widget)", "Up to 600 conversations/month", "Booking flow + FAQ up to 20 questions", "3 flow updates/month", "Priority email support"],
    cta: "Get Started", highlight: true,
  },
  {
    name: "Full Suite",
    tag: "Multi-channel automation with advanced workflows",
    setup: "Custom",
    monthly: "From $500/mo",
    features: ["Multi-channel setup", "Unlimited conversations (fair use)", "Custom integrations", "Dedicated support", "Weekly check-in call"],
    cta: "Get a Quote", highlight: false,
  },
];

const whyUs = [
  { icon: "🚀", title: "No bloated enterprise software", desc: "Lean, purpose-built tools that do exactly what your business needs." },
  { icon: "⚡", title: "Faster launch than in-house builds", desc: "Live in 8–13 business days — not months of internal build time." },
  { icon: "🎯", title: "Tailored to your workflow", desc: "Not templates. Built around how your business actually operates." },
  { icon: "👤", title: "Founder-led execution", desc: "You work directly with the person building your system." },
  { icon: "📡", title: "Flexible channels and tools", desc: "WhatsApp, web widget, voice — we choose what fits your customers." },
  { icon: "📈", title: "Scales as you grow", desc: "Start with one assistant. Expand when revenue justifies it." },
];

const faqs = [
  { q: "Can this work with WhatsApp?", a: "Yes — WhatsApp is one of our primary channels, especially for businesses in Asia. Your customers message your WhatsApp number and the AI handles replies automatically. We manage the full backend setup." },
  { q: "Can it answer phone calls?", a: "Yes. Voice assistants are available on Full Suite and as an add-on for Growth clients. The AI picks up inbound calls, handles common questions, and books appointments." },
  { q: "Do I need technical knowledge?", a: "None at all. We handle everything — setup, integration, testing, and ongoing maintenance. You just tell us how your business works." },
  { q: "How fast can we launch?", a: "Pilot builds typically go live in 8–13 business days after your 50% deposit is received." },
  { q: "Why is there a mandatory monthly plan?", a: "Your AI assistant runs 24/7 on our infrastructure — API costs, hosting, and monitoring never stop. The monthly plan keeps your bot online, just like hosting keeps a website live. Without it, the bot goes offline. Cancel anytime with 30 days notice." },
  { q: "Is this custom or template-based?", a: "Both — we start from proven flow templates for speed, then customise entirely around your business, your FAQ, and your customer language." },
];

// ─── LEAD FORM ─────────────────────────────────────────────────────────────────
function LeadForm({ onClose }) {
  const [form, setForm] = useState({ full_name: "", company_name: "", email: "", country: "", message: "" });
  const [status, setStatus] = useState("idle");

  const countries = ["Indonesia", "Singapore", "Malaysia", "Australia", "United States", "United Kingdom", "United Arab Emirates", "Philippines", "Thailand", "Other"];

  const handleSubmit = async () => {
    if (!form.full_name || !form.company_name || !form.email) { setStatus("error"); return; }
    setStatus("submitting");
    try {
      await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } catch (_) {}
    setStatus("success");
  };

  const input = { width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1.5px solid #cbd5e1", fontSize: "0.88rem", fontFamily: "inherit", boxSizing: "border-box", color: "#0f172a", outline: "none" };

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Request received — thank you!</h3>
      <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
        We will review your requirements and send a personalised proposal to <strong>{form.email}</strong> within 1 business day.
      </p>
      {onClose && <button onClick={onClose} style={{ background: "#14B8A6", color: "#fff", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", fontFamily: "inherit" }}>Close</button>}
    </div>
  );

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>Full Name *</label>
          <input style={input} placeholder="Jane Smith" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>Company Name *</label>
          <input style={input} placeholder="Acme Clinic" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>Business Email *</label>
          <input style={input} type="email" placeholder="jane@acmeclinic.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>Country</label>
          <select style={{ ...input, background: "#fff" }} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
            <option value="">Select country…</option>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "1.1rem" }}>
        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>What do you need help with? (optional)</label>
        <textarea style={{ ...input, minHeight: "85px", resize: "vertical" }} placeholder="Tell us about your business and the main challenge you're facing…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      {status === "error" && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.8rem" }}>Please fill in Full Name, Company Name, and Business Email.</p>}
      <button onClick={handleSubmit} disabled={status === "submitting"}
        style={{ width: "100%", background: "#0F2D52", color: "#fff", border: "none", padding: "0.85rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "inherit" }}>
        {status === "submitting" ? "Sending…" : "Send Request — We Reply Within 1 Business Day"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.73rem", color: "#94a3b8", marginTop: "0.7rem" }}>No phone number needed. No spam. Email replies only.</p>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCase, setActiveCase] = useState("clinic");
  const [openFaq, setOpenFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const activeUseCase = useCases.find((u) => u.id === activeCase);
  const navy = "#0F2D52";
  const teal = "#14B8A6";

  return (
    <main style={{ fontFamily: "Inter, 'Segoe UI', sans-serif", color: "#0f172a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        h1,h2,h3,h4{font-family:'Manrope',sans-serif;}
        a{text-decoration:none;}
        button,input,select,textarea{font-family:'Inter',sans-serif;}
        input:focus,select:focus,textarea:focus{border-color:#14B8A6!important;outline:none;}
      `}</style>

      {/* MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,45,82,0.65)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", padding: "2rem", maxWidth: "560px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.4rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: navy, marginBottom: "0.25rem" }}>Request a Demo Proposal</h3>
                <p style={{ fontSize: "0.82rem", color: "#64748b" }}>We'll send a personalised proposal within 1 business day.</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#94a3b8" }}>✕</button>
            </div>
            <LeadForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2.5rem", borderBottom: "1px solid #e2e8f0", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "1.1rem", color: navy }}>
          Auto<span style={{ color: teal }}>Service</span>Flow
        </div>
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          <a href="#solutions" style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}>Solutions</a>
          <a href="#use-cases" style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}>Use Cases</a>
          <a href="#pricing" style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}>Pricing</a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: navy, fontWeight: 600, border: `1.5px solid ${navy}`, padding: "0.45rem 1rem", borderRadius: "7px" }}>Book a Call</a>
          <button onClick={() => setShowModal(true)} style={{ background: teal, color: "#fff", border: "none", padding: "0.5rem 1.1rem", borderRadius: "7px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Request Demo</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(145deg,${navy} 0%,#0d3d6e 55%,#0a4a47 100%)`, color: "#fff", padding: "6rem 2.5rem 5rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.3)", color: "#5eead4", padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "0.08em" }}>
          AI ASSISTANTS FOR SERVICE BUSINESSES
        </div>
        <h1 style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)", fontWeight: 800, lineHeight: 1.12, margin: "0 auto 1.3rem", maxWidth: "760px", letterSpacing: "-1.5px" }}>
          AI Assistants for Service Businesses
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 2.8rem", lineHeight: 1.75 }}>
          Automate chats, answer calls, book appointments, and support customers 24/7 — so your team can focus on real work.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ background: teal, color: "#fff", padding: "0.9rem 2rem", borderRadius: "9px", fontWeight: 700, fontSize: "1rem" }}>
            Book Free Strategy Call
          </a>
          <button onClick={() => setShowModal(true)} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "0.9rem 2rem", borderRadius: "9px", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
            Request Demo
          </button>
        </div>
        <p style={{ marginTop: "2rem", color: "#64748b", fontSize: "0.8rem" }}>
          Fast setup &nbsp;·&nbsp; Custom built &nbsp;·&nbsp; Global support &nbsp;·&nbsp; No bloated software
        </p>
      </section>

      {/* WHO WE HELP */}
      <section style={{ background: "#fff", padding: "2.8rem 2.5rem", borderBottom: "1px solid #f1f5f9" }}>
        <p style={{ textAlign: "center", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", marginBottom: "1.4rem" }}>BUILT FOR BUSINESSES WHERE SPEED MATTERS</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.7rem" }}>
          {industries.map((i) => (
            <span key={i.name} style={{ background: "#f1f5f9", padding: "0.5rem 1.1rem", borderRadius: "999px", fontSize: "0.875rem", color: "#334155", fontWeight: 500 }}>{i.icon} {i.name}</span>
          ))}
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ background: "#fafafa", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.6rem" }}>Every Missed Message Can Cost Revenue</h2>
            <p style={{ color: "#64748b" }}>These are the exact problems we eliminate for our clients.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
            {painPoints.map((p) => (
              <div key={p.text} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.1rem 1.3rem", display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{p.icon}</span>
                <span style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="solutions" style={{ background: "#fff", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.6rem" }}>AI Systems That Actually Reduce Work</h2>
            <p style={{ color: "#64748b" }}>We build the systems, connect the channels, and maintain everything for you.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.2rem" }}>
            {whatWeBuild.map((f) => (
              <div key={f.title} style={{ background: "#f8fafc", borderRadius: "14px", padding: "1.5rem 1.3rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", color: navy }}>{f.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" style={{ background: "#f8fafc", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.6rem" }}>Built Around Real Business Workflows</h2>
            <p style={{ color: "#64748b" }}>Select an industry to see how the AI assistant handles a real conversation.</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {useCases.map((u) => (
              <button key={u.id} onClick={() => setActiveCase(u.id)}
                style={{ padding: "0.5rem 1.15rem", borderRadius: "999px", border: activeCase === u.id ? `2px solid ${u.color}` : "1.5px solid #e2e8f0", background: activeCase === u.id ? u.bg : "#fff", color: activeCase === u.id ? u.color : "#64748b", fontWeight: activeCase === u.id ? 700 : 500, fontSize: "0.875rem", cursor: "pointer" }}>
                {u.label}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ background: activeUseCase.color, padding: "1rem 1.3rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{activeUseCase.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem" }}>● Online · powered by AutoServiceFlow</div>
                </div>
              </div>
              <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.65rem", minHeight: "280px" }}>
                {activeUseCase.chat.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "82%", padding: "0.55rem 0.9rem", borderRadius: msg.from === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: msg.from === "user" ? "#dbeafe" : "#f1f5f9", fontSize: "0.82rem", lineHeight: 1.55, color: "#1e293b" }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <span style={{ background: activeUseCase.bg, color: activeUseCase.color, padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.05em" }}>{activeUseCase.label.toUpperCase()}</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0.9rem 0 0.65rem", color: navy, letterSpacing: "-0.3px" }}>{activeUseCase.title}</h3>
              <p style={{ color: "#475569", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: "2rem" }}>{activeUseCase.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <button onClick={() => setShowModal(true)} style={{ background: teal, color: "#fff", border: "none", padding: "0.8rem 1.6rem", borderRadius: "9px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", textAlign: "left" }}>Request Demo →</button>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ background: "#f1f5f9", color: navy, padding: "0.8rem 1.6rem", borderRadius: "9px", fontWeight: 600, fontSize: "0.92rem", display: "inline-block" }}>Book Free Strategy Call →</a>
              </div>
              <p style={{ fontSize: "0.77rem", color: "#94a3b8" }}>We reply within 1 business day · {CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#fff", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.6rem" }}>Launch in 3 Simple Steps</h2>
          <p style={{ color: "#64748b", marginBottom: "3rem" }}>From first conversation to live AI assistant — usually under 2 weeks.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {[
              { n: "01", title: "Tell us how your business handles inquiries today.", desc: "We learn your workflow, your customers, and where you lose the most time." },
              { n: "02", title: "We design and build your AI assistant workflow.", desc: "Custom flows, your FAQ, your channels — tested before touching a real customer." },
              { n: "03", title: "Go live and start converting more leads with less admin.", desc: "Your assistant is live. We monitor, update, and support it every month." },
            ].map((s) => (
              <div key={s.n} style={{ background: "#f8fafc", borderRadius: "14px", padding: "1.6rem 1.3rem", textAlign: "left", border: "1px solid #e2e8f0" }}>
                <div style={{ color: teal, fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.65rem" }}>{s.n}</div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem", color: navy, lineHeight: 1.45 }}>{s.title}</p>
                <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: "#f8fafc", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.6rem" }}>Custom Solutions for Serious Businesses</h2>
            <p style={{ color: "#64748b", maxWidth: "520px", margin: "0 auto" }}>Every business is different. Pricing depends on workflows, channels, integrations, and support needs.</p>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "0.85rem 1.2rem", maxWidth: "680px", margin: "1.8rem auto 2.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: "0.82rem", color: "#92400e", lineHeight: 1.65 }}>
              <strong>Monthly plan is required</strong> — your assistant runs 24/7 on our AI infrastructure, API keys, and hosting. Think of it like website hosting: without it, the bot goes offline. Cancel anytime with 30 days notice.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.5rem" }}>
            {pricing.map((p) => (
              <div key={p.name} style={{ background: p.highlight ? navy : "#fff", borderRadius: "16px", padding: "2rem 1.6rem", border: p.highlight ? "none" : "1px solid #e2e8f0", position: "relative", display: "flex", flexDirection: "column" }}>
                {p.highlight && <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: teal, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "0.3rem 1rem", borderRadius: "999px", whiteSpace: "nowrap", letterSpacing: "0.06em" }}>MOST POPULAR</div>}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem", color: p.highlight ? "#fff" : navy }}>{p.name}</div>
                  <div style={{ fontSize: "0.8rem", color: p.highlight ? "#94a3b8" : "#64748b", marginBottom: "1.2rem" }}>{p.tag}</div>
                  <div style={{ marginBottom: "0.3rem" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>ONE-TIME SETUP FEE</div>
                    <div style={{ fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.5px", color: p.highlight ? "#fff" : navy, lineHeight: 1 }}>{p.setup}</div>
                  </div>
                  <div style={{ background: p.highlight ? "rgba(20,184,166,0.15)" : "#f0fdfa", borderRadius: "8px", padding: "0.7rem 0.9rem", marginTop: "0.9rem", border: `1px solid ${p.highlight ? "rgba(20,184,166,0.3)" : "#99f6e4"}` }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: teal, letterSpacing: "0.07em", marginBottom: "0.15rem" }}>MONTHLY PLAN (MANDATORY)</div>
                    <div style={{ fontWeight: 800, fontSize: "1.15rem", color: p.highlight ? "#5eead4" : "#0d9488" }}>{p.monthly}</div>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.8rem", display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ fontSize: "0.85rem", display: "flex", gap: "0.55rem", alignItems: "flex-start", color: p.highlight ? "#cbd5e1" : "#475569" }}>
                      <span style={{ color: teal, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowModal(true)} style={{ width: "100%", padding: "0.78rem", borderRadius: "9px", background: p.highlight ? teal : "#f1f5f9", color: p.highlight ? "#fff" : navy, fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer" }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#94a3b8", marginTop: "1.5rem", lineHeight: 1.7 }}>
            Secure payment via Stripe · All major cards accepted · Bank transfer available for Indonesia clients<br />
            Setup fee: 50% deposit to begin · 50% on delivery · Cancel anytime with 30 days notice
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: "#fff", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", textAlign: "center", marginBottom: "3rem" }}>Lean, Practical, Results-Focused</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.2rem" }}>
            {whyUs.map((w) => (
              <div key={w.title} style={{ padding: "1.3rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>{w.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: navy, marginBottom: "0.35rem" }}>{w.title}</div>
                <div style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.65 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f8fafc", padding: "4.5rem 2.5rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800, letterSpacing: "-0.5px", textAlign: "center", marginBottom: "2.5rem" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "1.1rem 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "0.93rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{f.q}</span>
                <span style={{ color: teal, fontSize: "1.2rem", flexShrink: 0, display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && <div style={{ paddingBottom: "1.1rem", fontSize: "0.87rem", color: "#475569", lineHeight: 1.75 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(145deg,${navy} 0%,#0d3d6e 55%,#0a4a47 100%)`, padding: "5rem 2.5rem", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>Ready to Stop Losing Leads to Slow Response?</h2>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Let AI assistants handle inquiries, bookings, and calls while your team focuses on growth.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ background: teal, color: "#fff", padding: "0.95rem 2.2rem", borderRadius: "10px", fontWeight: 700, fontSize: "1rem" }}>Book Free Strategy Call</a>
          <button onClick={() => setShowModal(true)} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "0.95rem 2.2rem", borderRadius: "10px", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>Request Demo</button>
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "#64748b" }}>We reply to all enquiries within 1 business day · {CONTACT_EMAIL}</p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1628", padding: "2.5rem", textAlign: "center" }}>
        <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: "0.5rem" }}>Auto<span style={{ color: teal }}>Service</span>Flow</div>
        <p style={{ color: "#475569", fontSize: "0.82rem", marginBottom: "1rem" }}>AI Automation for Service Businesses · autoserviceflow.com</p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#64748b", fontSize: "0.82rem" }}>{CONTACT_EMAIL}</a>
          <a href="/privacy" style={{ color: "#64748b", fontSize: "0.82rem" }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "#64748b", fontSize: "0.82rem" }}>Terms of Service</a>
        </div>
        <p style={{ color: "#334155", fontSize: "0.74rem", marginTop: "1.2rem" }}>© 2025 AutoServiceFlow. All rights reserved.</p>
      </footer>
    </main>
  );
}
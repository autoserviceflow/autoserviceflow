"use client";
import { useState } from "react";
import Image from "next/image";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/YOUR_LINK"; // replace with your Calendly link
const CONTACT_EMAIL = "hello@autoserviceflow.com";
const TEMP_EMAIL = "helloautoserviceflow@gmail.com"; // temporary until domain email is ready

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = {
  navy:      "#0F2D52",
  cyan:      "#00C8D4",
  cyanLight: "#CCFBF1",
  white:     "#FFFFFF",
  gray:      "#374151",
  grayLight: "#F9FAFB",
  grayBorder:"#E5E7EB",
  grayMid:   "#64748b",
  grayDim:   "#94a3b8",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const industries = [
  { icon: "🏥", name: "Clinics & Healthcare",        desc: "Appointment booking and patient inquiry automation." },
  { icon: "💼", name: "Consultants & Agencies",      desc: "Lead qualification and discovery call scheduling." },
  { icon: "🏨", name: "Hotels & Hospitality",        desc: "Reservation handling and guest question support." },
  { icon: "⚙️", name: "Repair & Field Service",      desc: "Troubleshooting intake and technician scheduling." },
  { icon: "🛒", name: "Ecommerce Brands",            desc: "Order support and product inquiry automation." },
  { icon: "📅", name: "Appointment Businesses",      desc: "Self-scheduling without back-and-forth messaging." },
];

const painPoints = [
  { icon: "⏱", text: "Slow replies lose leads before you even know they enquired" },
  { icon: "📵", text: "Missed calls mean missed bookings — and they rarely call back" },
  { icon: "🔁", text: "Staff spend hours answering the same questions every day" },
  { icon: "📋", text: "Manual scheduling creates friction that turns customers away" },
  { icon: "⭐", text: "One bad review sits on Google forever if nobody's watching" },
  { icon: "⚡", text: "Customers expect instant responses — even at midnight" },
];

// ─── SOLUTIONS (replaces old bot-type grid) ──────────────────────────────────
const solutions = [
  {
    icon: "💬",
    title: "AI Chat & Support Assistants",
    desc: "Handles customer chats, bookings, troubleshooting, and lead capture — around the clock, on whatever channel your customers already use.",
    linkLabel: "See a Live Example →",
    linkHref: "/demo",
    linkNote: "Built for a machine-service client — imagine this same logic trained on your business.",
    external: false,
  },
  {
    icon: "⭐",
    title: "Reputation Protection — AutoReview",
    desc: "We make sure only your 5-star reviews go public. Every other review gets captured privately so you can make it right — and every review on Google gets a warm, automatic reply.",
    linkLabel: "Talk to Us About This →",
    linkHref: null,
    linkNote: "Our newest offering — ask us about early access.",
    external: false,
    isCTA: true,
  },
];

const useCases = [
  {
    id: "clinic", label: "Clinic Reception", title: "Clinic Reception Assistant",
    desc: "Books appointments and handles common patient inquiries around the clock — no receptionist required after hours.",
    color: "#0f766e", bg: "#f0fdfa",
    chat: [
      { from: "user", text: "Hi, I'd like to book an appointment. My child has a fever." },
      { from: "bot",  text: "Of course. How old is she, and how long has the fever been going on?" },
      { from: "user", text: "She's 4. Fever since last night, around 38.5°C." },
      { from: "bot",  text: "Thank you. Any other symptoms — cough, rash, or vomiting?" },
      { from: "user", text: "Just a mild cough." },
      { from: "bot",  text: "Understood. I have slots today at 2pm and 4pm. Which works better for you?" },
    ],
  },
  {
    id: "technician", label: "Field Service", title: "Service Technician Assistant",
    desc: "Guides customers through remote troubleshooting and schedules technician visits — before any human is needed.",
    color: "#1e40af", bg: "#eff6ff",
    chat: [
      { from: "user", text: "Our industrial chiller stopped cooling. Temperature is rising." },
      { from: "bot",  text: "Let's diagnose this quickly. Is the compressor running or completely silent?" },
      { from: "user", text: "Compressor is running but no cold air." },
      { from: "bot",  text: "That points to a pressure or valve issue. Any error codes on the panel?" },
      { from: "user", text: "It shows E-04." },
      { from: "bot",  text: "E-04 means low pressure. I'll schedule a technician — what's your earliest slot?" },
    ],
  },
  {
    id: "consultant", label: "Consultant", title: "Consultant Lead Assistant",
    desc: "Qualifies prospects, answers service questions, and books discovery calls — so you only spend time on serious leads.",
    color: "#7c3aed", bg: "#f5f3ff",
    chat: [
      { from: "user", text: "Hi, I need help scaling my business. Do you work with small teams?" },
      { from: "bot",  text: "Yes, absolutely. What type of business, and what's your biggest challenge right now?" },
      { from: "user", text: "I run a physio clinic. Struggling to get new patients consistently." },
      { from: "bot",  text: "Common pain point. Have you tried any digital channels yet?" },
      { from: "user", text: "Not really. Don't know where to start." },
      { from: "bot",  text: "Perfect starting point. Can I book you for a free 30-min call? Tuesday or Thursday?" },
    ],
  },
  {
    id: "hotel", label: "Hotel", title: "Hotel Booking Assistant",
    desc: "Handles room inquiries, availability checks, and booking confirmations — in the guest's preferred channel.",
    color: "#b45309", bg: "#fffbeb",
    chat: [
      { from: "user", text: "Do you have a deluxe room from Aug 10 to 13?" },
      { from: "bot",  text: "Yes! How many guests will be staying?" },
      { from: "user", text: "2 adults and 1 child." },
      { from: "bot",  text: "Deluxe Family Room — $185/night, breakfast included. 3 nights = $555. Hold it?" },
      { from: "user", text: "Yes. Does it have a sea view?" },
      { from: "bot",  text: "Upper floor, partial sea view. I'll reserve it — may I have your name and email?" },
    ],
  },
  {
    id: "ecommerce", label: "Ecommerce", title: "Ecommerce Support Assistant",
    desc: "Answers product questions, handles order inquiries, and captures purchase requests — automatically, 24/7.",
    color: "#be123c", bg: "#fff1f2",
    chat: [
      { from: "user", text: "Do you have replacement filters for the Daikin FTK25?" },
      { from: "bot",  text: "Yes. Pre-filter, HEPA, or the full filter set?" },
      { from: "user", text: "Full set. How much?" },
      { from: "bot",  text: "Complete set for FTK25 — $42, free shipping. 8 in stock." },
      { from: "user", text: "Can I order 2 sets?" },
      { from: "bot",  text: "Absolutely — 2 sets at $84 total. Name and delivery address?" },
    ],
  },
];

// ─── WHY US & FAQS ────────────────────────────────────────────────────────────
const whyUs = [
  { icon: "🚀", title: "No bloated enterprise software",       desc: "Purpose-built tools that do exactly what your business needs — nothing more." },
  { icon: "⚡", title: "Faster launch than building in-house", desc: "Live in 9–16 business days. Not months of internal planning and build time." },
  { icon: "🎯", title: "Tailored to your specific workflow",   desc: "Not templates. Built around how your business actually handles customers." },
  { icon: "👤", title: "Founder-led — you talk to the builder",desc: "You work directly with the person who designs and builds your system." },
  { icon: "📡", title: "Flexible channels and tools",          desc: "Chat, voice, review management, web widget — we choose what fits your business." },
  { icon: "📈", title: "Runs 24/7, always reporting",          desc: "Your system never sleeps, and a monthly summary shows exactly what it's doing." },
];

const faqs = [
  {
    q: "What exactly can you automate for my business?",
    a: "It depends on where you're losing the most time or the most revenue — customer chats, appointment booking, troubleshooting support, or your Google review management. We start with a conversation about your business, then recommend the right starting point.",
  },
  {
    q: "What is AutoReview?",
    a: "AutoReview protects your Google rating. Customers are guided so only 5-star ratings go public — anything lower is captured privately so you can make it right before it ever reaches Google. On top of that, every review that appears on your Google Business Profile gets a warm, automatic reply, so you're never leaving customers unanswered.",
  },
  {
    q: "Can this work with messaging apps like WhatsApp?",
    a: "Yes. Chat channels are one of our primary deployment options, especially for businesses in Asia. Your customers message your business number and the AI handles replies automatically. We manage the full backend setup and ongoing maintenance.",
  },
  {
    q: "Can it answer phone calls?",
    a: "Voice assistants are available for businesses that handle high volumes of inbound calls. Ask us during your first conversation and we'll let you know if it's the right fit for your business yet.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. We handle setup, integration, testing, and ongoing maintenance. You provide information about your business — we handle everything else.",
  },
  {
    q: "How fast can we launch?",
    a: "Most builds go live in 9 to 16 business days after your deposit is received. We confirm your exact start date after our first conversation about what you need.",
  },
  {
    q: "How does pricing work?",
    a: "Every business is different — pricing depends on what you need automated, your volume, and your channels. Rather than guess with a generic price list, we quote individually after a short conversation about your business.",
  },
  {
    q: "What if I want to cancel?",
    a: "No minimum term. Cancel anytime with 30 days written notice to hello@autoserviceflow.com. Your assistant goes offline after the notice period ends. All your data is exported to you before cancellation.",
  },
];

const countries = [
  "Indonesia","Singapore","Malaysia","Australia","United States",
  "United Kingdom","United Arab Emirates","Philippines","Thailand","Other",
];

const leadMgmtOptions = [
  { value: "",            label: "Select an option…" },
  { value: "crm",        label: "Yes — CRM (HubSpot, Zoho, Salesforce, or similar)" },
  { value: "spreadsheet",label: "Yes — Spreadsheet (Google Sheets or Airtable)" },
  { value: "manual",     label: "No — we manage manually" },
  { value: "not_sure",   label: "Not sure" },
];

// ─── SHARED CTA BUTTON ────────────────────────────────────────────────────────
// Single source of truth for the repeated call to action — change copy here,
// it changes everywhere the button appears on the site.
function CTAButton({ compact, onClick, href, variant = "primary" }) {
  const isPrimary = variant === "primary";
  const style = {
    background: isPrimary ? C.cyan : "rgba(255,255,255,0.08)",
    color: "#fff",
    border: isPrimary ? "none" : "1px solid rgba(255,255,255,0.22)",
    padding: compact ? "0.5rem 1.2rem" : "0.9rem 2rem",
    borderRadius: compact ? "8px" : "9px",
    fontWeight: compact ? 700 : 700,
    fontSize: compact ? "0.875rem" : "1rem",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "inherit",
  };
  const label = compact ? "Talk to Us" : "Talk to Us About Your Business";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {label}
      </a>
    );
  }
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
}

// ─── LEAD FORM ────────────────────────────────────────────────────────────────
function LeadForm({ onClose }) {
  const [form, setForm] = useState({
    full_name: "", company_name: "", email: "",
    country: "", lead_management_status: "", message: "",
  });
  const [status, setStatus] = useState("idle");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.full_name || !form.company_name || !form.email || !form.country || !form.lead_management_status) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setStatus("success");
  };

  const inp = {
    width: "100%", padding: "0.68rem 0.9rem", borderRadius: "8px",
    border: `1.5px solid ${C.grayBorder}`, fontSize: "0.88rem",
    fontFamily: "inherit", boxSizing: "border-box", color: C.gray, outline: "none",
    background: "#fff",
  };

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: C.navy }}>
        Request received — thank you!
      </h3>
      <p style={{ color: C.grayMid, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        We will review your requirements and reply to{" "}
        <strong style={{ color: C.navy }}>{form.email}</strong> within 1 business day.
      </p>
      {onClose && (
        <button onClick={onClose}
          style={{ background: C.cyan, color: "#fff", border: "none", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", fontFamily: "inherit" }}>
          Close
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>Full Name *</label>
          <input style={inp} placeholder="Jane Smith" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>Company Name *</label>
          <input style={inp} placeholder="Acme Clinic" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
        </div>
      </div>
      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
        <div>
          <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>Business Email *</label>
          <input style={inp} type="email" placeholder="jane@acmeclinic.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>Country *</label>
          <select style={inp} value={form.country} onChange={(e) => set("country", e.target.value)}>
            <option value="">Select country…</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {/* Lead management dropdown */}
      <div style={{ marginBottom: "0.85rem" }}>
        <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>
          Do you currently manage customer leads in any system? *
        </label>
        <select style={inp} value={form.lead_management_status} onChange={(e) => set("lead_management_status", e.target.value)}>
          {leadMgmtOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      {/* Message */}
      <div style={{ marginBottom: "1.1rem" }}>
        <label style={{ fontSize: "0.77rem", fontWeight: 600, color: C.gray, display: "block", marginBottom: "0.3rem" }}>
          What do you need? (optional)
        </label>
        <textarea style={{ ...inp, minHeight: "85px", resize: "vertical" }}
          placeholder="Tell us about your business and the main challenge you're facing…"
          value={form.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      {status === "error" && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          Please fill in all required fields marked with *.
        </p>
      )}
      <button onClick={handleSubmit} disabled={status === "submitting"}
        style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "0.85rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "inherit" }}>
        {status === "submitting" ? "Sending…" : "Send My Request — We Reply Within 1 Business Day"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.73rem", color: C.grayDim, marginTop: "0.7rem" }}>
        No phone number needed. No spam. Email replies only.
      </p>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCase, setActiveCase]   = useState("clinic");
  const [openFaq, setOpenFaq]         = useState(null);
  const [showModal, setShowModal]     = useState(false);

  const activeUseCase = useCases.find((u) => u.id === activeCase);

  const openLeadModal = () => setShowModal(true);

  return (
    <main style={{ fontFamily: "Inter, 'Segoe UI', sans-serif", color: C.gray, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        h1,h2,h3,h4{font-family:'Manrope',sans-serif;color:${C.navy};}
        a{text-decoration:none;}
        button,input,select,textarea{font-family:'Inter',sans-serif;}
        input:focus,select:focus,textarea:focus{border-color:${C.cyan}!important;outline:none;}
        ::placeholder{color:#9ca3af;}
      `}</style>

      {/* ── MODAL ── */}
      {showModal && (
        <div onClick={() => setShowModal(false)}
          style={{ position:"fixed", inset:0, background:"rgba(15,45,82,0.65)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background:"#fff", borderRadius:"16px", padding:"2rem", maxWidth:"580px", width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.4rem" }}>
              <div>
                <h3 style={{ fontSize:"1.15rem", fontWeight:800, color:C.navy, marginBottom:"0.25rem" }}>Talk to Us About Your Business</h3>
                <p style={{ fontSize:"0.82rem", color:C.grayMid }}>No pricing pressure — just a conversation about what's slowing your team down. We'll reply within 1 business day.</p>
              </div>
              <button onClick={() => setShowModal(false)}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.2rem", color:C.grayDim, lineHeight:1 }}>✕</button>
            </div>
            <LeadForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ background:C.navy, position:"sticky", top:0, zIndex:100, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", height:"64px" }}>
          <Image
            src="/logos/logo-white.png"
            alt="AutoServiceFlow"
            height={40}
            width={220}
            style={{ objectFit: "contain" }}
            priority
          />
          {/* Desktop nav */}
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            <a href="#how-it-works" style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.8)", fontWeight:500 }}>How it Works</a>
            <a href="#about"        style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.8)", fontWeight:500 }}>About</a>
            <a href="/contact"      style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.8)", fontWeight:500 }}>Contact</a>
            <CTAButton compact onClick={openLeadModal} />
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background:`linear-gradient(145deg, ${C.navy} 0%, #0d3d6e 55%, #0a4a47 100%)`, color:"#fff", padding:"6.5rem 2rem 5.5rem", textAlign:"center" }}>
        <div style={{ maxWidth:"780px", margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(0,200,212,0.15)", border:"1px solid rgba(0,200,212,0.35)", color:"#67e8f9", padding:"0.38rem 1rem", borderRadius:"999px", fontSize:"0.75rem", fontWeight:700, marginBottom:"2rem", letterSpacing:"0.08em" }}>
            AI AUTOMATION FOR SERVICE BUSINESSES
          </div>
          <h1 style={{ fontSize:"clamp(2.1rem,5vw,3.5rem)", fontWeight:800, lineHeight:1.1, color:"#fff", marginBottom:"1.4rem", letterSpacing:"-1.5px" }}>
            Your Business Runs 24/7 —<br />While You Sleep
          </h1>
          <p style={{ fontSize:"1.1rem", color:"#94a3b8", lineHeight:1.8, marginBottom:"1rem", maxWidth:"620px", margin:"0 auto 1rem" }}>
            We build AI systems that handle customer chats, book appointments, protect your online reputation, and answer the questions your team doesn't have time for — so you focus on the work that actually needs a human.
          </p>
          <p style={{ fontSize:"0.85rem", color:"#67e8f9", marginBottom:"2.8rem" }}>
            No pricing pressure — just a conversation about what's slowing your team down.
          </p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <CTAButton onClick={openLeadModal} />
            <a href="#how-it-works"
              style={{ background:"rgba(255,255,255,0.08)", color:"#fff", border:"1px solid rgba(255,255,255,0.22)", padding:"0.9rem 2rem", borderRadius:"9px", fontWeight:600, fontSize:"1rem", display:"inline-block" }}>
              See How It Works
            </a>
          </div>
          <p style={{ marginTop:"2rem", color:"#64748b", fontSize:"0.8rem", letterSpacing:"0.03em" }}>
            Fast setup &nbsp;·&nbsp; Custom built &nbsp;·&nbsp; No bloated software &nbsp;·&nbsp; Global support
          </p>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section style={{ background:"#fff", padding:"3rem 2rem", borderBottom:`1px solid ${C.grayBorder}` }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <p style={{ textAlign:"center", fontSize:"0.75rem", fontWeight:700, color:C.grayDim, letterSpacing:"0.1em", marginBottom:"2rem" }}>
            BUILT FOR BUSINESSES WHERE SPEED MATTERS
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem" }}>
            {industries.map((i) => (
              <div key={i.name} style={{ background:C.grayLight, borderRadius:"12px", padding:"1.2rem 1.3rem", border:`1px solid ${C.grayBorder}`, display:"flex", gap:"0.85rem", alignItems:"flex-start" }}>
                <span style={{ fontSize:"1.5rem", flexShrink:0 }}>{i.icon}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:"0.92rem", color:C.navy, marginBottom:"0.25rem" }}>{i.name}</div>
                  <div style={{ fontSize:"0.82rem", color:C.grayMid, lineHeight:1.5 }}>{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ background:C.grayLight, padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"940px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:"0.6rem" }}>
              Every Missed Message Can Cost Revenue
            </h2>
            <p style={{ color:C.grayMid, fontSize:"1rem" }}>These are the exact problems we eliminate for our clients.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"1rem" }}>
            {painPoints.map((p) => (
              <div key={p.text} style={{ background:"#fff", border:`1px solid ${C.grayBorder}`, borderRadius:"12px", padding:"1.1rem 1.3rem", display:"flex", gap:"0.8rem", alignItems:"flex-start" }}>
                <span style={{ fontSize:"1.2rem", flexShrink:0, marginTop:"1px" }}>{p.icon}</span>
                <span style={{ fontSize:"0.875rem", color:C.gray, lineHeight:1.65 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ background:"#fff", padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"940px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:"0.6rem" }}>
              What We Build
            </h2>
            <p style={{ color:C.grayMid }}>Two ways we're helping businesses right now — more get added as your business grows.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"1.5rem" }}>
            {solutions.map((s) => (
              <div key={s.title} style={{ background:C.grayLight, borderRadius:"16px", padding:"2rem 1.8rem", border:`1px solid ${C.grayBorder}`, display:"flex", flexDirection:"column" }}>
                <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>{s.icon}</div>
                <h3 style={{ fontWeight:800, fontSize:"1.15rem", marginBottom:"0.6rem" }}>{s.title}</h3>
                <p style={{ fontSize:"0.9rem", color:C.grayMid, lineHeight:1.7, marginBottom:"1rem", flex:1 }}>{s.desc}</p>
                <p style={{ fontSize:"0.78rem", color:C.grayDim, fontStyle:"italic", marginBottom:"1.2rem" }}>{s.linkNote}</p>
                {s.linkHref ? (
                  <a href={s.linkHref}
                    style={{ color:C.cyan, fontWeight:700, fontSize:"0.9rem" }}>
                    {s.linkLabel}
                  </a>
                ) : (
                  <button onClick={openLeadModal}
                    style={{ background:"none", border:"none", color:C.cyan, fontWeight:700, fontSize:"0.9rem", cursor:"pointer", textAlign:"left", padding:0, fontFamily:"inherit" }}>
                    {s.linkLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section style={{ background:C.grayLight, padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:"0.6rem" }}>
              Built Around Real Business Workflows
            </h2>
            <p style={{ color:C.grayMid }}>Select an industry to see how the AI assistant handles a real conversation.</p>
          </div>
          {/* Tabs */}
          <div style={{ display:"flex", gap:"0.5rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"2rem" }}>
            {useCases.map((u) => (
              <button key={u.id} onClick={() => setActiveCase(u.id)}
                style={{ padding:"0.5rem 1.15rem", borderRadius:"999px", border: activeCase===u.id ? `2px solid ${u.color}` : `1.5px solid ${C.grayBorder}`, background: activeCase===u.id ? u.bg : "#fff", color: activeCase===u.id ? u.color : C.grayMid, fontWeight: activeCase===u.id ? 700 : 500, fontSize:"0.875rem", cursor:"pointer" }}>
                {u.label}
              </button>
            ))}
          </div>
          {/* Demo card */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" }}>
            <div style={{ background:"#fff", borderRadius:"16px", border:`1px solid ${C.grayBorder}`, overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ background:activeUseCase.color, padding:"1rem 1.3rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0 }}>💬</div>
                <div>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>{activeUseCase.title}</div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.7rem" }}>● Online · AutoServiceFlow</div>
                </div>
              </div>
              <div style={{ padding:"1.2rem", display:"flex", flexDirection:"column", gap:"0.65rem", minHeight:"280px" }}>
                {activeUseCase.chat.map((msg, i) => (
                  <div key={i} style={{ display:"flex", justifyContent: msg.from==="user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth:"82%", padding:"0.55rem 0.9rem", borderRadius: msg.from==="user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: msg.from==="user" ? "#dbeafe" : C.grayLight, fontSize:"0.82rem", lineHeight:1.55, color:"#1e293b" }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ paddingTop:"0.5rem" }}>
              <span style={{ background:activeUseCase.bg, color:activeUseCase.color, padding:"0.3rem 0.85rem", borderRadius:"999px", fontSize:"0.73rem", fontWeight:700, letterSpacing:"0.05em" }}>
                {activeUseCase.label.toUpperCase()}
              </span>
              <h3 style={{ fontSize:"1.4rem", fontWeight:800, margin:"0.9rem 0 0.65rem", letterSpacing:"-0.3px" }}>{activeUseCase.title}</h3>
              <p style={{ color:C.grayMid, lineHeight:1.75, fontSize:"0.92rem", marginBottom:"2rem" }}>{activeUseCase.desc}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", alignItems:"flex-start" }}>
                <CTAButton onClick={openLeadModal} />
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  style={{ background:C.white, color:C.navy, padding:"0.8rem 1.6rem", borderRadius:"9px", fontWeight:600, fontSize:"0.92rem", display:"inline-block", border:`1px solid ${C.grayBorder}` }}>
                  Book Free Strategy Call →
                </a>
              </div>
              <p style={{ fontSize:"0.77rem", color:C.grayDim, marginTop:"1rem" }}>
                We reply within 1 business day · {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background:"#fff", padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"820px", margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:"0.6rem" }}>
            Launch in 3 Simple Steps
          </h2>
          <p style={{ color:C.grayMid, marginBottom:"3rem" }}>From first conversation to live AI system — usually under 2 weeks.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {[
              { n:"01", title:"Tell us how your business handles customers today.", desc:"We learn your workflow, your customers, and where you lose the most time — or reputation." },
              { n:"02", title:"We design and build your AI system.", desc:"Custom flows, your knowledge base, your channels — tested before any real customer sees it." },
              { n:"03", title:"Go live and start converting more leads — while you sleep.", desc:"Your system is live. We monitor, update, and report every month." },
            ].map((s) => (
              <div key={s.n} style={{ background:C.grayLight, borderRadius:"14px", padding:"1.6rem 1.3rem", textAlign:"left", border:`1px solid ${C.grayBorder}` }}>
                <div style={{ color:C.cyan, fontWeight:800, fontSize:"1.8rem", marginBottom:"0.65rem", fontFamily:"Manrope,sans-serif" }}>{s.n}</div>
                <p style={{ fontWeight:600, fontSize:"0.9rem", marginBottom:"0.5rem", color:C.navy, lineHeight:1.45 }}>{s.title}</p>
                <p style={{ fontSize:"0.82rem", color:C.grayMid, lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section id="about" style={{ background:C.grayLight, padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"820px", margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", marginBottom:"2rem" }}>
            Built by Someone Who Needed It
          </h2>
          <div style={{ fontSize:"1rem", color:C.gray, lineHeight:1.9 }}>
            <p style={{ marginBottom:"1.2rem" }}>
              I spent years as a service engineer managing small teams across Asia. When we were all travelling or sleeping, there was no one in the office to support a customer whose machine was down in the middle of the night. Every missed message was a frustrated customer and a damaged relationship. I knew there had to be a better way.
            </p>
            <p style={{ marginBottom:"1.2rem" }}>
              Then I watched my wife — a veterinarian — get calls late at night from worried pet owners who needed reassurance. She helped every time, because that is who she is. But she was exhausted. She deserved to sleep.
            </p>
            <p style={{ marginBottom:"1.8rem" }}>
              I built AutoServiceFlow so that your business never goes dark. Whether your team is travelling, sleeping, or simply busy — your customers always get a response. Fast, helpful, and human enough to make them feel taken care of.
            </p>
            <p style={{ fontWeight:700, color:C.cyan, fontSize:"1.02rem", lineHeight:1.7, borderLeft:`3px solid ${C.cyan}`, paddingLeft:"1.2rem" }}>
              "This is not just a product. It is something I built because I needed it — and because the people I love needed it too."
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background:"#fff", padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", textAlign:"center", marginBottom:"3rem" }}>
            Lean, Practical, Results-Focused
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"1.2rem" }}>
            {whyUs.map((w) => (
              <div key={w.title} style={{ padding:"1.3rem", borderRadius:"12px", border:`1px solid ${C.grayBorder}` }}>
                <div style={{ fontSize:"1.4rem", marginBottom:"0.6rem" }}>{w.icon}</div>
                <div style={{ fontWeight:700, fontSize:"0.92rem", color:C.navy, marginBottom:"0.35rem" }}>{w.title}</div>
                <div style={{ fontSize:"0.84rem", color:C.grayMid, lineHeight:1.65 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (soft line — replaces table) ── */}
      <section id="pricing" style={{ background:C.grayLight, padding:"3.5rem 2rem", textAlign:"center" }}>
        <p style={{ fontSize:"clamp(1.1rem,2.4vw,1.4rem)", fontWeight:700, color:C.navy, marginBottom:"1.2rem" }}>
          Every business is different — let's talk about what you need.
        </p>
        <CTAButton onClick={openLeadModal} />
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:"#fff", padding:"4.5rem 2rem" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:800, letterSpacing:"-0.5px", textAlign:"center", marginBottom:"2.5rem" }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom:`1px solid ${C.grayBorder}` }}>
              <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{ width:"100%", textAlign:"left", padding:"1.1rem 0", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
                <span style={{ fontSize:"0.93rem", fontWeight:600, color:C.navy, lineHeight:1.4 }}>{f.q}</span>
                <span style={{ color:C.cyan, fontSize:"1.3rem", flexShrink:0, display:"inline-block", transform: openFaq===i ? "rotate(45deg)" : "none", transition:"transform 0.2s" }}>+</span>
              </button>
              {openFaq===i && (
                <div style={{ paddingBottom:"1.1rem", fontSize:"0.88rem", color:C.grayMid, lineHeight:1.8 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background:`linear-gradient(145deg,${C.navy} 0%,#0d3d6e 55%,#0a4a47 100%)`, padding:"5rem 2rem", textAlign:"center", color:"#fff" }}>
        <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.3rem)", fontWeight:800, marginBottom:"0.8rem", letterSpacing:"-0.5px", color:"#fff" }}>
          Ready to Stop Losing Customers to Slow Replies?
        </h2>
        <p style={{ color:"#94a3b8", fontSize:"1rem", maxWidth:"500px", margin:"0 auto 2.5rem", lineHeight:1.75 }}>
          Let AI handle the enquiries and protect your reputation. You focus on the work that actually needs a human.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <CTAButton onClick={openLeadModal} />
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            style={{ background:"rgba(255,255,255,0.08)", color:"#fff", border:`1px solid rgba(255,255,255,0.25)`, padding:"0.9rem 2rem", borderRadius:"9px", fontWeight:600, fontSize:"1rem", display:"inline-block" }}>
            Book Free Strategy Call
          </a>
        </div>
        <p style={{ marginTop:"1.5rem", fontSize:"0.78rem", color:"#64748b" }}>
          We reply to all enquiries within 1 business day · {CONTACT_EMAIL}
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.navy, padding:"3rem 2.5rem 2rem", color:"rgba(255,255,255,0.5)" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"2rem", alignItems:"start" }}>
          {/* Left — logo + tagline */}
          <div>
            <Image
              src="/logos/logo-white.png"
              alt="AutoServiceFlow"
              height={44}
              width={220}
              style={{ objectFit: "contain", marginBottom: "0.5rem" }}
            />
            <p style={{ fontSize:"0.82rem", fontStyle:"italic", color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>
              Your Business Runs 24/7 — While You Sleep
            </p>
          </div>
          {/* Middle — links */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", alignItems:"center" }}>
            <a href={`mailto:${TEMP_EMAIL}`} style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.85rem" }}>{CONTACT_EMAIL}</a>
            <a href="/privacy" style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.82rem" }}>Privacy Policy</a>
            <a href="/terms"   style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.82rem" }}>Terms of Service</a>
          </div>
          {/* Right — copyright */}
          <div style={{ textAlign:"right", fontSize:"0.78rem" }}>
            © 2026 AutoServiceFlow.<br />All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}
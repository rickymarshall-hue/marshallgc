'use client';
import { useState, useEffect, useRef } from "react";

const allPages = ["Home", "About", "Services", "Pricing", "Who We Work With", "Approach", "Insights", "Contact"];

const BRAND = "Marshall GC";
const DOMAIN = "marshallgc.co";
const EMAIL = "richard@marshallgc.co";
const CALENDLY_URL = "https://calendly.com/richard-marshallgc";

const notableTransactions = [
  { name: "Warner Bros.", type: "Licensing & brand collaboration" },
  { name: "Artestar", type: "Artist licensing & IP partnerships" },
  { name: "Casetify", type: "Co-branding & product collaboration" },
  { name: "IMG", type: "Brand licensing & representation" },
  { name: "Paris Saint-Germain", type: "Lifestyle & brand partnership" },
  { name: "Crypto.com", type: "Commercial partnership" },
  { name: "Mattel", type: "Product licensing & collaboration" },
  { name: "TKO Group Holdings (UFC)", type: "Licensing & commercial partnership" },
  { name: "Charles & Keith", type: "Retail collaboration & distribution" },
];

const distributionMarkets = [
  "United Kingdom", "European Union", "Taiwan", "Japan", "Kuwait", "United States", "China", "Australia", "GCC (UAE, Saudi Arabia, Bahrain, Oman, Qatar)", "Philippines", "Mexico"
];

const testimonials = [
  { text: "Richard has been instrumental in helping us navigate the legal complexities of scaling a global brand. His understanding of fashion, licensing, and international operations is exceptional, and he operates as a true extension of our team.", name: "CEO", role: "Global Fashion & Lifestyle Brand", featured: true },
  { text: "We needed someone who could move at our pace and think commercially, not just legally. Richard immediately understood our business and helped us structure partnerships we would not have got right on our own.", name: "Founder", role: "DTC Beauty Brand" },
  { text: "Having Richard as a fractional general counsel gave us the confidence to expand into three new markets in twelve months. He handled the complexity so we could focus on growth.", name: "CEO", role: "E-Commerce Lifestyle Brand" },
];

const caseStudies = [
  { tag: "Licensing & IP", title: "Global licensing program for a fashion brand", challenge: "A rapidly growing fashion brand needed to develop a structured licensing program to expand into new product categories across multiple territories.", outcome: "Developed a comprehensive licensing framework, negotiated agreements with three international partners, and established an IP protection strategy covering 12 markets.", metrics: ["3 licensing partnerships", "12 markets covered", "6-month delivery"] },
  { tag: "International Expansion", title: "European market entry for a US beauty brand", challenge: "A US-based beauty brand generating $20M in revenue wanted to enter the European market but lacked the legal infrastructure for cross-border operations.", outcome: "Structured the legal entity framework, navigated EU regulatory requirements, and drafted distribution agreements for wholesale and retail channels.", metrics: ["4 EU markets", "$2M+ first-year revenue", "Fully compliant structure"] },
  { tag: "Strategic Advisory", title: "Investor readiness for a scaling DTC brand", challenge: "A founder-led DTC brand approaching Series A needed to clean up its corporate structure, shareholder agreements, and IP ownership ahead of fundraising.", outcome: "Restructured corporate governance, consolidated IP holdings, and prepared a complete legal data room that gave investors confidence to move forward.", metrics: ["Series A closed", "60-day turnaround", "Clean legal data room"] },
];

const insights = [
  { date: "March 2026", tag: "International", title: "Five legal mistakes brands make when expanding internationally", excerpt: "International growth is exciting, but it introduces legal complexity that catches many brands off guard.",
    content: [
      { h: "1. Assuming your home-country contracts will work everywhere", p: "Contracts drafted under English or US law do not automatically hold up in other jurisdictions. Distribution agreements, employment contracts, and supplier terms often need to be adapted to comply with local laws." },
      { h: "2. Ignoring local IP registration", p: "Your UK or US trademark does not protect you internationally. Each market requires its own filing, and in many jurisdictions, the first to file wins regardless of who used the mark first." },
      { h: "3. Underestimating regulatory requirements", p: "From product labelling to data protection, every market has its own regulatory framework. Beauty brands face cosmetic regulations that vary dramatically across the EU, US, and Asia." },
      { h: "4. Choosing the wrong entity structure", p: "Setting up a subsidiary, branch office, or working through a distributor each carry different tax, liability, and operational implications. Getting this wrong early creates expensive restructuring later." },
      { h: "5. Not having a local dispute resolution strategy", p: "When things go wrong you need to know which courts or arbitration bodies have jurisdiction and whether your agreements actually protect you in that specific market." },
      { h: "The bottom line", p: "International expansion requires legal infrastructure that matches your ambition. The cost of getting it right upfront is always less than the cost of fixing it later." },
    ]
  },
  { date: "February 2026", tag: "Licensing", title: "When is the right time to start a licensing program?", excerpt: "Licensing can be a powerful growth lever, but timing matters. Too early and you dilute your brand.",
    content: [
      { h: "The appeal of licensing", p: "Licensing lets you extend your brand into new product categories without the capital investment of manufacturing and distribution. But it is not without risk." },
      { h: "Too early: the brand dilution trap", p: "If you license before your brand identity is firmly established, you lose control of how your brand shows up in the market." },
      { h: "Too late: missed opportunity cost", p: "Wait too long, and competitors or imitators fill the space your brand should occupy." },
      { h: "The signals that you are ready", p: "Strong brand recognition, profitable core categories, internal capacity for quality control, and a properly protected IP portfolio." },
      { h: "Getting the structure right", p: "Clear quality standards, approval rights, defined territories and exclusivity terms, and commercially realistic royalty structures." },
    ]
  },
  { date: "January 2026", tag: "Founders", title: "Why scaling brands need fractional counsel, not law firms", excerpt: "The traditional law firm model was not built for fast-moving consumer brands.",
    content: [
      { h: "The law firm problem", p: "Hourly billing fundamentally misaligns incentives. Clients hesitate to pick up the phone and defer legal work that should be done proactively." },
      { h: "The in-house gap", p: "For brands in the $3M to $50M range, a full-time general counsel is often premature. The salary and overhead can easily exceed $250,000 per year." },
      { h: "The fractional model", p: "A senior lawyer who knows your business, works on a predictable retainer, and operates as a genuine member of your team." },
      { h: "What changes", p: "Legal becomes a strategic function. You catch problems earlier. Your contracts get tighter, your IP gets protected, and your negotiations improve." },
      { h: "Is it right for every brand?", p: "For the 80% of legal work that scaling brands deal with, including contracts, IP, partnerships, and compliance, fractional counsel is almost always the better model." },
    ]
  },
  { date: "December 2025", tag: "IP", title: "Brand protection basics for e-commerce companies", excerpt: "Your brand is your most valuable asset. A practical guide to trademark strategy and portfolio management.",
    content: [
      { h: "Why brand protection matters", p: "Your brand is the trust that drives repeat purchases, the recognition that reduces acquisition costs, and the equity that underpins your valuation." },
      { h: "Start with trademark registration", p: "Register your brand name and primary logo in every market where you sell. In many jurisdictions, the first to file wins." },
      { h: "Monitor and enforce", p: "Active monitoring to catch infringements early, whether that is counterfeit products on marketplaces, domain squatting, or competitors using confusingly similar branding." },
      { h: "Build a portfolio strategy", p: "Consider trademark classes beyond current products, protect sub-brands, and file in markets you plan to enter." },
      { h: "Common mistakes", p: "Do not assume company name registration protects your brand. Do not wait to file trademarks. Do not ignore enforcement obligations." },
    ]
  },
];

const retainerTiers = [
  { name: "Counsel Lite", price: "$2,500", unit: "/month", desc: "For brands that need reliable legal support without a heavy commitment.", features: ["Up to 10 hours of advisory per month", "Commercial contract review & drafting", "Email & messaging support", "Monthly check-in call", "IP watching & basic brand protection"], highlighted: false, cta: "Get Started" },
  { name: "Fractional GC", price: "$5,000", unit: "/month", desc: "For scaling brands that need a dedicated legal partner embedded in their operations.", features: ["Up to 25 hours of advisory per month", "Full commercial contract management", "IP portfolio strategy & management", "Licensing & distribution support", "Commercial negotiation support", "Weekly strategy call", "Stakeholder & board-level support", "Priority response within 24 hours"], highlighted: true, cta: "Get Started" },
  { name: "Full Spectrum", price: "$9,500", unit: "/month", desc: "For brands in high-growth mode navigating complex legal and commercial challenges.", features: ["Up to 45 hours of advisory per month", "Everything in Fractional GC", "International expansion legal support", "Investor & fundraising structuring", "Strategic partnership advisory", "Commercial negotiation support", "Same-day priority response", "Quarterly business & legal review"], highlighted: false, cta: "Get Started" },
];

const projectExamples = [
  { name: "International Expansion", price: "From $8,000", desc: "Legal structuring for entering new markets." },
  { name: "Licensing Program", price: "From $6,000", desc: "End-to-end licensing program development." },
  { name: "Distribution Agreement", price: "From $3,500", desc: "Drafting and negotiating distribution partnerships." },
  { name: "Corporate Structuring", price: "From $5,000", desc: "Investor-ready corporate structure and governance." },
];

const pricingFaqs = [
  { q: "What happens if I need more hours?", a: "Additional hours are available at a pre-agreed rate, or we can discuss moving to a higher tier." },
  { q: "Can I switch between plans?", a: "Yes. You can move between tiers at the start of any month with 30 days notice." },
  { q: "Is there a minimum commitment?", a: "Three-month initial commitment on retainer plans. After that, it rolls month-to-month with 30 days notice to cancel." },
  { q: "Can I combine a retainer with a project?", a: "Yes, and many clients do. Monthly retainer for ongoing work plus a scoped project." },
  { q: "How does a strategic project work?", a: "Scoping conversation, fixed fee proposal, clear deliverables, and a timeline. No surprises." },
  { q: "How is payment structured?", a: "Retainers are invoiced monthly in advance. Project fees are typically split into an upfront payment and a completion payment, agreed before work begins." },
];

const values = [
  { t: "Embedded, not external", d: "I work as part of your team, anticipating problems before they arise." },
  { t: "Commercial thinking first", d: "Every recommendation is grounded in what actually works for your business." },
  { t: "Senior counsel from day one", d: "You work directly with me. Not a junior associate." },
  { t: "Built for founders", d: "I understand the pace, the ambiguity, and the need for clear answers." },
];

const privacyContent = [
  { h: "Introduction", p: BRAND + " is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit " + DOMAIN + " or engage with our services." },
  { h: "Information we collect", p: "We may collect personal information you provide directly to us, including your name, email address, phone number, company name, and any other information you choose to provide." },
  { h: "How we use your information", p: "We use the information we collect to respond to your enquiries, provide our advisory services, send newsletters, improve our website, and comply with legal obligations." },
  { h: "Cookies", p: "Our website uses cookies to enhance your browsing experience and analyse website traffic. You can manage your cookie preferences through your browser settings." },
  { h: "Data sharing", p: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers subject to confidentiality agreements." },
  { h: "Data retention", p: "We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected." },
  { h: "Your rights", p: "Under applicable data protection laws, you may have the right to access, correct, or delete your personal information, object to processing, withdraw consent, and lodge a complaint with a supervisory authority." },
  { h: "International transfers", p: "Your information may be transferred to and processed in countries outside of your country of residence with appropriate safeguards." },
  { h: "Changes to this policy", p: "We may update this Privacy Policy from time to time. Any changes will be posted on this page." },
  { h: "Contact us", p: "If you have any questions, please contact us at " + EMAIL + "." },
];

const regulatoryContent = [
  { h: "About " + BRAND, p: BRAND + " is an independent legal and strategic advisory practice. It is not a law firm and is not regulated by the Solicitors Regulation Authority (SRA), the Bar Standards Board, or any other legal regulatory body. " + BRAND + " operates as a consultancy providing legal and commercial advisory services outside the scope of any statutory legal regulatory framework." },
  { h: "About Richard Marshall", p: "Richard Marshall is the founder of " + BRAND + ". He qualified as a solicitor of England and Wales and has extensive experience advising consumer and e-commerce brands on international legal and commercial matters. Richard provides advisory services through " + BRAND + " in an independent consultancy capacity. He does not practise under the supervision or regulation of the SRA or any other governing legal body." },
  { h: "Scope of services", p: BRAND + " provides legal and strategic advisory services to scaling consumer brands, with particular expertise in commercial contracts, intellectual property strategy, licensing, distribution, international expansion, and corporate structuring. Services are delivered on a consultancy basis through monthly retainer agreements or defined-scope project engagements." },
  { h: "What this means for clients", p: "Because " + BRAND + " operates outside the regulatory framework of the SRA or any other legal regulatory body, clients should be aware that: " + BRAND + " is not subject to the SRA Standards and Regulations or Code of Conduct, clients will not have access to the SRA regulatory protections or complaints process, the Legal Ombudsman is not available, and the SRA Compensation Fund does not apply. Richard applies the professional standards and duty of care consistent with his training and qualification." },
  { h: "Professional indemnity insurance", p: BRAND + " maintains professional indemnity insurance (PII). This is not SRA minimum terms cover. Details of coverage are available on request." },
  { h: "When regulated legal advice may be appropriate", p: "For court proceedings, contentious matters, or where regulatory protections are required, " + BRAND + " is happy to provide a referral to an appropriate regulated firm." },
  { h: "Complaints", p: "If you are dissatisfied with any aspect of our work, please contact " + EMAIL + ". We will acknowledge your complaint promptly and aim to resolve it within 28 days." },
  { h: "Engagement terms", p: "All client engagements are governed by a written engagement letter confirming scope, fees, regulatory status, and PII arrangements." },
  { h: "Contact", p: "Questions about our regulatory status? Contact " + EMAIL + "." },
];

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" } };
}

function FadeIn({ children, style: extraStyle, ...props }) {
  const { ref, style } = useFadeIn();
  return <div ref={ref} style={{ ...style, ...extraStyle }} {...props}>{children}</div>;
}

export default function MarshallGC() {
  const [page, setPage] = useState("Home");
  const [articleIdx, setArticleIdx] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [emailSub, setEmailSub] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const go = (p, extras) => {
    if (p === page && !extras) return;
    setTransitioning(true);
    setTimeout(() => { setPage(p); if (extras && extras.articleIdx !== undefined) setArticleIdx(extras.articleIdx); else setArticleIdx(null); setMenuOpen(false); setTransitioning(false); }, 250);
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const st = {
    wrap: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: "#1a1a1a", background: "#FAFAF8", minHeight: "100vh", opacity: transitioning ? 0 : 1, transition: "opacity 0.25s ease" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "20px 24px" : "28px 48px", maxWidth: 1200, margin: "0 auto", position: "relative" },
    logo: { fontSize: 15, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" },
    section: { maxWidth: 1060, margin: "0 auto", padding: isMobile ? "56px 24px" : "80px 48px" },
    label: { fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 },
    h1: { fontSize: isMobile ? 32 : 42, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "16px 0 0" },
    h2: { fontSize: isMobile ? 24 : 30, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.2, margin: "14px 0 0" },
    h3: { fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 },
    body: { fontSize: 16, color: "#555", lineHeight: 1.75, marginTop: 20 },
    bodySm: { fontSize: 15, color: "#666", lineHeight: 1.7 },
    divider: { height: 1, background: "#E8E6E1", maxWidth: 1060, margin: "0 auto" },
    btn: { display: "inline-block", padding: "14px 36px", borderRadius: 8, background: "#1a1a1a", color: "#fff", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.03em", transition: "background 0.2s", textDecoration: "none" },
    btnOut: { display: "inline-block", padding: "13px 36px", borderRadius: 8, background: "transparent", color: "#1a1a1a", border: "1.5px solid #1a1a1a", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.2s" },
    card: { background: "#fff", border: "1px solid #E8E6E1", borderRadius: 14, padding: isMobile ? 24 : 32 },
  };

  const hoverFill = (e) => { e.target.style.background = "#1a1a1a"; e.target.style.color = "#fff"; };
  const unhoverFill = (e) => { e.target.style.background = "transparent"; e.target.style.color = "#1a1a1a"; };

  const socials = [
    { name: "LinkedIn", url: "https://linkedin.com/in/rickymarshall", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: "WhatsApp", url: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" stroke="#888" strokeWidth="1.5"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#888" strokeWidth="1.5"/></svg> },
  ];

  const Nav = () => (
    <nav style={st.nav}>
      <div style={st.logo} onClick={() => go("Home")}>
        <span style={{ fontWeight: 700 }}>M</span><span style={{ fontWeight: 400, fontSize: 13, letterSpacing: "0.08em" }}>ARSHALL</span>
        <span style={{ color: "#bbb", margin: "0 6px" }}>|</span>
        <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", color: "#1a1a1a" }}>GC</span>
      </div>
      {isMobile ? (
        <>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", padding: 8 }}>
            <div style={{ width: 20, height: 2, background: "#1a1a1a", marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "#1a1a1a", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <div style={{ width: 20, height: 2, background: "#1a1a1a", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </div>
          {menuOpen && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#FAFAF8", borderBottom: "1px solid #E8E6E1", padding: "16px 24px", zIndex: 100 }}>
              {allPages.map(p => <div key={p} onClick={() => go(p)} style={{ padding: "12px 0", fontSize: 14, color: page === p ? "#1a1a1a" : "#888", fontWeight: page === p ? 500 : 400, cursor: "pointer" }}>{p}</div>)}
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#777", letterSpacing: "0.02em" }}>
          {allPages.map(p => <span key={p} onClick={() => go(p)} style={{ cursor: "pointer", color: page === p ? "#1a1a1a" : "#777", fontWeight: page === p ? 500 : 400, transition: "color 0.2s" }}>{p}</span>)}
        </div>
      )}
    </nav>
  );

  const Newsletter = () => {
    const [subLoading, setSubLoading] = useState(false);
    const handleSubscribe = async () => {
      if (!emailSub) return;
      setSubLoading(true);
      try {
        const url = "https://magic.beehiiv.com/v1/aa326c60-857b-4c6a-b686-4a8dc1793c26?email=" + encodeURIComponent(emailSub);
        await fetch(url, { mode: "no-cors" });
        setSubbed(true);
      } catch (e) {
        setSubbed(true);
      }
      setSubLoading(false);
    };
    return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "56px 48px 0", textAlign: "center" }}>
      <p style={{ ...st.label, textAlign: "center" }}>Stay informed</p>
      <p style={{ fontSize: 18, fontWeight: 600, marginTop: 10, letterSpacing: "-0.02em" }}>Legal insights for scaling brands</p>
      <p style={{ fontSize: 14, color: "#888", marginTop: 6 }}>Practical advice on IP, licensing, international growth, and more.</p>
      {subbed ? <p style={{ fontSize: 14, color: "#16a34a", marginTop: 20 }}>You are subscribed.</p> : (
        <div style={{ display: "flex", gap: 10, marginTop: 20, maxWidth: 420, margin: "20px auto 0" }}>
          <input type="email" value={emailSub} onChange={e => { e.stopPropagation(); setEmailSub(e.target.value); }} placeholder="you@yourbrand.com" style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid #E8E6E1", fontSize: 14, outline: "none", fontFamily: "inherit" }} onKeyDown={e => e.stopPropagation()} />
          <button onClick={handleSubscribe} disabled={subLoading} style={{ ...st.btn, padding: "12px 24px", opacity: subLoading ? 0.6 : 1 }}>{subLoading ? "..." : "Subscribe"}</button>
        </div>
      )}
    </div>
    );
  };

  const Footer = () => (
    <footer style={{ borderTop: "1px solid #E8E6E1", marginTop: 80 }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "40px 24px 16px" : "48px 48px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{BRAND}</div>
          <div style={{ fontSize: 13, color: "#999", marginTop: 8, lineHeight: 1.6 }}>Legal and strategic advisory<br />for scaling consumer brands.</div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, border: "1px solid #E8E6E1" }}>{s.icon}</a>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 32 : 48 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 12 }}>Pages</div>
            {allPages.map(p => <div key={p} onClick={() => go(p)} style={{ fontSize: 13, color: "#666", cursor: "pointer", marginBottom: 8 }}>{p}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 12 }}>Connect</div>
            {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 8, textDecoration: "none" }}>{s.name}</a>)}
            <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>{EMAIL}</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "16px 24px 12px" : "24px 48px 12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#ccc" }}>
        <span>© 2026 {BRAND}. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16 }}>
          <span onClick={() => go("Privacy")} style={{ cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
          <span onClick={() => go("Regulatory")} style={{ cursor: "pointer", textDecoration: "underline" }}>Regulatory Information</span>
        </div>
      </div>
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "0 24px 24px" : "0 48px 32px" }}>
        <p style={{ fontSize: 11, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{BRAND} is an independent consultancy and is not regulated by the Solicitors Regulation Authority (SRA) or any other legal regulatory body. Richard Marshall qualified as a solicitor of England and Wales and provides advisory services in a non-regulated consultancy capacity. Professional indemnity insurance is maintained. <span onClick={() => go("Regulatory")} style={{ textDecoration: "underline", cursor: "pointer" }}>Full regulatory information</span>.</p>
      </div>
    </footer>
  );

  const CTA = ({ title, subtitle, btnText, dark, calendly }) => (
    <FadeIn style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px" }}>
      <div style={{ background: dark ? "#1a1a1a" : "#fff", border: dark ? "none" : "1px solid #E8E6E1", borderRadius: 18, padding: isMobile ? "40px 28px" : "56px 52px", textAlign: "center" }}>
        <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, color: dark ? "#fff" : "#1a1a1a" }}>{title}</h2>
        <p style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.6)" : "#888", marginTop: 10, lineHeight: 1.6 }}>{subtitle}</p>
        {calendly ? <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ ...st.btn, marginTop: 24, background: dark ? "#fff" : "#1a1a1a", color: dark ? "#1a1a1a" : "#fff", display: "inline-block" }}>{btnText || "Schedule a Conversation"}</a> : <button style={{ ...st.btn, marginTop: 24, background: dark ? "#fff" : "#1a1a1a", color: dark ? "#1a1a1a" : "#fff" }} onClick={() => go("Contact")}>{btnText || "Schedule a Conversation"}</button>}
      </div>
    </FadeIn>
  );

  const CookieBanner = () => {
    if (cookieConsent !== null) return null;
    return (
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, background: "#fff", borderTop: "1px solid #E8E6E1", padding: isMobile ? "20px 24px" : "20px 48px", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>We value your privacy</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>We use cookies to improve your experience. See our <span onClick={() => go("Privacy")} style={{ textDecoration: "underline", cursor: "pointer", color: "#555" }}>Privacy Policy</span>.</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setCookieConsent(false)} style={{ padding: "10px 24px", borderRadius: 8, background: "transparent", border: "1px solid #E8E6E1", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#888" }}>Decline</button>
            <button onClick={() => setCookieConsent(true)} style={{ ...st.btn, padding: "10px 24px" }}>Accept All</button>
          </div>
        </div>
      </div>
    );
  };

  const CardHover = ({ children, style: s2, ...props }) => (
    <div style={{ ...st.card, ...s2, transition: "box-shadow 0.25s, transform 0.25s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }} {...props}>{children}</div>
  );

  if (page === "Privacy") return (<div style={st.wrap}><Nav /><FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px" : "80px 48px" }}><p style={st.label}>Legal</p><h1 style={{ ...st.h1, fontSize: isMobile ? 28 : 36 }}>Privacy Policy</h1><p style={{ fontSize: 13, color: "#999", marginTop: 12 }}>Last updated: March 2026</p>{privacyContent.map((s, i) => <div key={i} style={{ marginTop: 36 }}><h3 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>{s.h}</h3><p style={{ ...st.bodySm, marginTop: 10 }}>{s.p}</p></div>)}</FadeIn><Footer /><CookieBanner /></div>);

  if (page === "Regulatory") return (<div style={st.wrap}><Nav /><FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px" : "80px 48px" }}><p style={st.label}>Legal</p><h1 style={{ ...st.h1, fontSize: isMobile ? 28 : 36 }}>Regulatory Information</h1><p style={{ fontSize: 13, color: "#999", marginTop: 12 }}>Last updated: March 2026</p><p style={{ ...st.body, maxWidth: 620 }}>Important information about the regulatory status of {BRAND}.</p>{regulatoryContent.map((s, i) => <div key={i} style={{ marginTop: 36 }}><h3 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>{s.h}</h3><p style={{ ...st.bodySm, marginTop: 10 }}>{s.p}</p></div>)}</FadeIn><Footer /><CookieBanner /></div>);

  if (page === "Article" && articleIdx !== null) { const a = insights[articleIdx]; return (<div style={st.wrap}><Nav /><FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px" : "80px 48px" }}><div style={{ marginBottom: 20 }}><span onClick={() => go("Insights")} style={{ fontSize: 13, color: "#888", cursor: "pointer" }}>Back to Insights</span></div><div style={{ display: "flex", gap: 12, marginBottom: 16 }}><span style={{ fontSize: 12, color: "#999" }}>{a.date}</span><span style={{ fontSize: 12, color: "#1a1a1a", background: "#F5F4F0", padding: "2px 10px", borderRadius: 12, fontWeight: 500 }}>{a.tag}</span></div><h1 style={{ ...st.h1, fontSize: isMobile ? 28 : 36 }}>{a.title}</h1><p style={{ ...st.body, fontSize: 17, color: "#666" }}>{a.excerpt}</p><div style={{ height: 1, background: "#E8E6E1", margin: "36px 0" }} />{a.content.map((s, i) => <div key={i} style={{ marginBottom: 32 }}><h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{s.h}</h3><p style={{ ...st.bodySm, marginTop: 10 }}>{s.p}</p></div>)}</FadeIn><Newsletter /><CTA title="Need help with this?" subtitle="If this resonates with where your brand is right now, we should talk." dark calendly /><Footer /><CookieBanner /></div>); }

  if (page === "Home") return (
    <div style={st.wrap}>
      <Nav />
      <FadeIn style={{ maxWidth: 820, margin: "0 auto", padding: isMobile ? "64px 24px 32px" : "100px 48px 40px" }}>
        <p style={st.label}>Legal & Strategic Advisory</p>
        <h1 style={st.h1}>The legal partner scaling<br />consumer brands actually need</h1>
        <p style={{ ...st.body, maxWidth: 600 }}>{BRAND} provides fractional general counsel and strategic advisory to e-commerce and consumer brands navigating the complexity of international growth.</p>
        <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={st.btn}>Schedule a Conversation</a>
          <button style={st.btnOut} onClick={() => go("Services")} onMouseEnter={hoverFill} onMouseLeave={unhoverFill}>Explore Services</button>
        </div>
      </FadeIn>
      <FadeIn style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "48px 24px 64px" : "60px 48px 80px" }}>
        <div style={{ ...st.card, display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 300px" }}><p style={st.label}>Why {BRAND}</p><h2 style={{ ...st.h2, fontSize: 22 }}>Built for the way modern brands actually operate</h2></div>
          <div style={{ flex: "1 1 360px" }}><p style={{ ...st.bodySm, marginTop: 0 }}>Most scaling brands do not need a law firm on retainer. They need an experienced legal mind who understands their business, works at their pace, and thinks commercially.</p></div>
        </div>
      </FadeIn>
      <div style={st.divider} />
      <div style={st.section}>
        <FadeIn><p style={st.label}>What we do</p><h2 style={{ ...st.h2, marginBottom: 40 }}>Advisory built around how you grow</h2></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {[
            { t: "Fractional General Counsel", d: "Ongoing legal support for brands that need experienced counsel without building a full in-house team." },
            { t: "Strategic Projects", d: "Defined-scope advisory for international expansion, licensing programs, distribution agreements, and partnership development." },
            { t: "Brand Protection & IP", d: "Global trademark strategy, portfolio management, and proactive brand protection. When enforcement is needed, we handle initial steps and manage the process with specialist counsel." },
          ].map((sv, i) => <FadeIn key={i}><CardHover style={{ height: "100%" }}><div style={st.h3}>{sv.t}</div><p style={{ ...st.bodySm, marginTop: 12 }}>{sv.d}</p></CardHover></FadeIn>)}
        </div>
      </div>
      <div style={st.divider} />
      <div style={st.section}>
        <FadeIn><p style={st.label}>Trusted by founders</p><h2 style={{ ...st.h2, marginBottom: 40 }}>What clients say</h2></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => <FadeIn key={i}><div style={{ ...st.card, height: "100%", border: t.featured ? "2px solid #1a1a1a" : "1px solid #E8E6E1" }}><div style={{ fontSize: 15, color: "#444", lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</div><div style={{ marginTop: 20, fontSize: 14, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 12, color: "#999" }}>{t.role}</div></div></FadeIn>)}
        </div>
      </div>
      <div style={st.divider} />
      <FadeIn style={st.section}>
        <p style={st.label}>Who we work with</p>
        <h2 style={{ ...st.h2, marginBottom: 16 }}>Founder-led brands ready to scale</h2>
        <p style={{ ...st.body, maxWidth: 600 }}>We work with e-commerce and consumer brands, typically between $3M and $100M in revenue, that are growing faster than their legal infrastructure can keep up.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          {["Fashion & Apparel", "Beauty & Wellness", "Lifestyle & Home", "Consumer Goods", "DTC & E-Commerce", "Consumer Services"].map(tag => <span key={tag} style={{ padding: "8px 20px", borderRadius: 24, border: "1px solid #E8E6E1", fontSize: 13, color: "#666", background: "#fff" }}>{tag}</span>)}
        </div>
      </FadeIn>
      <FadeIn style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "48px 24px 64px" : "60px 48px 80px" }}>
        <div style={{ ...st.card, background: "#F5F4F0", border: "none" }}>
          <p style={st.label}>Experience</p>
          <h2 style={{ ...st.h2, fontSize: 22 }}>Trusted by global brands</h2>
          <p style={{ ...st.body, maxWidth: 620 }}>{BRAND} works with ambitious consumer brands navigating international growth, including BLVCK Paris, a global fashion and lifestyle brand operating across multiple markets.</p>
          <p style={st.bodySm}>We bring that same calibre of thinking to every client engagement.</p>
        </div>
      </FadeIn>
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Select Transactions</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 16 }}>Negotiations and agreements involving</h2><p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>Richard has advised on commercial transactions, licensing agreements, and strategic partnerships involving the following organisations.</p></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {notableTransactions.map((t, i) => <FadeIn key={i}><div style={{ ...st.card, padding: isMobile ? 16 : 24, textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{t.type}</div></div></FadeIn>)}
        </div>
        <FadeIn style={{ marginTop: 48 }}>
          <p style={{ ...st.label, textAlign: "center" }}>International Reach</p>
          <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 16 }}>Distribution agreements across</h2>
          <p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>Experience structuring and negotiating complex distribution agreements across multiple jurisdictions.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {distributionMarkets.map((m, i) => <span key={i} style={{ padding: "8px 20px", borderRadius: 24, border: "1px solid #E8E6E1", fontSize: 13, color: "#555", background: "#fff", fontWeight: 500 }}>{m}</span>)}
          </div>
        </FadeIn>
      </div>
      {newsletterSection}
      <CTA title="Talk to us about where you are headed" subtitle="A short conversation to understand your brand, your challenges, and whether we are the right fit." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "About") return (
    <div style={st.wrap}>
      <Nav />
      <FadeIn style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "64px 24px" : "80px 48px 64px" }}>
        <div style={{ display: "flex", gap: isMobile ? 32 : 64, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: isMobile ? "100%" : 300, height: isMobile ? 280 : 380, borderRadius: 18, overflow: "hidden", flexShrink: 0 }}>
            <img src="/richard-marshall.jpg" alt="Richard Marshall" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={st.label}>About</p>
            <h1 style={st.h1}>Richard Marshall</h1>
            <p style={st.body}>I am an English-qualified lawyer and the founder of {BRAND}. I advise scaling consumer brands, including global fashion and lifestyle companies like BLVCK Paris, on the legal and commercial challenges that come with international growth.</p>
            <p style={st.bodySm}>That work has given me deep, practical experience across global IP portfolios, licensing partnerships, distribution agreements, and cross-border operations.</p>
            <p style={st.bodySm}>I started {BRAND} because too many scaling brands are caught between expensive law firms and going without proper counsel. Fractional legal leadership solves that.</p>
            <p style={st.bodySm}>I work as an extension of your team. Not as an outside advisor who parachutes in and disappears.</p>
          </div>
        </div>
      </FadeIn>
      <div style={{ ...st.divider, marginTop: 40 }} />
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Philosophy</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 40 }}>How I think about advisory</h2></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {values.map((v, i) => <FadeIn key={i}><CardHover style={{ height: "100%" }}><div style={st.h3}>{v.t}</div><p style={{ ...st.bodySm, marginTop: 10 }}>{v.d}</p></CardHover></FadeIn>)}
        </div>
      </div>
      <FadeIn style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ ...st.card, background: "#F5F4F0", border: "none", textAlign: "center", padding: isMobile ? 32 : 48 }}>
          <div style={{ fontSize: 17, color: "#444", lineHeight: 1.75, fontStyle: "italic" }}>"{testimonials[0].text}"</div>
          <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600 }}>{testimonials[0].name}</div>
          <div style={{ fontSize: 12, color: "#999" }}>{testimonials[0].role}</div>
        </div>
      </FadeIn>
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Select Transactions</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 16 }}>Organisations I have advised on transactions involving</h2><p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>Commercial agreements, licensing deals, and strategic partnerships across sectors and markets.</p></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {notableTransactions.map((t, i) => <FadeIn key={i}><div style={{ ...st.card, padding: isMobile ? 16 : 24, textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{t.type}</div></div></FadeIn>)}
        </div>
        <FadeIn style={{ marginTop: 48 }}>
          <p style={{ ...st.label, textAlign: "center" }}>International Reach</p>
          <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 16 }}>Distribution agreements across</h2>
          <p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>Experience structuring and negotiating complex distribution agreements across multiple jurisdictions.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {distributionMarkets.map((m, i) => <span key={i} style={{ padding: "8px 20px", borderRadius: 24, border: "1px solid #E8E6E1", fontSize: 13, color: "#555", background: "#fff", fontWeight: 500 }}>{m}</span>)}
          </div>
        </FadeIn>
      </div>
      <CTA title="See if we are the right fit" subtitle="I take on a limited number of clients to ensure each one gets proper attention." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Services") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px 24px" : "80px 48px 24px" }}><p style={st.label}>Services</p><h1 style={st.h1}>Legal and strategic advisory,<br />structured around your growth</h1><p style={st.body}>Every engagement is tailored to match how your business actually operates.</p></FadeIn>
      <div style={st.section}>
        <FadeIn><div style={{ ...st.card, marginBottom: 24, background: "#F5F4F0", border: "none" }}><p style={st.label}>Core offering</p><h2 style={{ ...st.h2, fontSize: 24 }}>Fractional General Counsel</h2><p style={{ ...st.body, maxWidth: 620 }}>For scaling brands that need experienced legal leadership without the cost of a full-time hire.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 32 }}>
            {["Commercial contracts", "Supplier & manufacturing agreements", "Distribution partnerships", "Licensing collaborations", "IP portfolio strategy", "Brand protection & monitoring", "Commercial negotiation support", "General legal advisory"].map((item, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}><div style={{ width: 6, height: 6, borderRadius: 3, background: "#1a1a1a", flexShrink: 0 }} /><span style={{ fontSize: 14, color: "#555" }}>{item}</span></div>)}
          </div></div></FadeIn>
        <FadeIn><div style={st.card}><p style={st.label}>Defined scope</p><h2 style={{ ...st.h2, fontSize: 24 }}>Strategic Projects</h2><p style={{ ...st.body, maxWidth: 620 }}>For specific initiatives that need focused attention with clear deliverables and timelines.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 32 }}>
            {["International expansion legal structure", "Licensing program development", "Distribution agreements", "Strategic partnership agreements", "Investor or corporate structuring"].map((item, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}><div style={{ width: 6, height: 6, borderRadius: 3, background: "#1a1a1a", flexShrink: 0 }} /><span style={{ fontSize: 14, color: "#555" }}>{item}</span></div>)}
          </div></div></FadeIn>
      </div>
      <CTA title="Scope what you need" subtitle="Every engagement starts with a conversation." calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Pricing") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px 24px" : "80px 48px 24px" }}><p style={st.label}>Pricing</p><h1 style={st.h1}>Transparent pricing,<br />no surprises</h1><p style={st.body}>Fixed monthly retainers or defined project fees. Always predictable.</p></FadeIn>
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Monthly Retainers</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 20 }}>Ongoing advisory, predictable cost</h2><p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>All retainers begin with a three-month initial commitment. After that, they roll month-to-month with 30 days notice to cancel. Invoiced monthly in advance.</p></FadeIn>
        <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap" }}>
          {retainerTiers.map(t => (
            <FadeIn key={t.name} style={{ flex: "1 1 300px", maxWidth: 330 }}>
              <div style={{ background: "#fff", border: t.highlighted ? "2px solid #1a1a1a" : "1px solid #E8E6E1", borderRadius: 16, padding: 36, display: "flex", flexDirection: "column", height: "100%", position: "relative", boxShadow: t.highlighted ? "0 8px 30px rgba(0,0,0,0.07)" : "none" }}>
                {t.highlighted && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "#fff", fontSize: 11, fontWeight: 500, padding: "4px 16px", borderRadius: 20 }}>Most Popular</div>}
                <div style={{ fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.name}</div>
                <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 2 }}><span style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.03em" }}>{t.price}</span><span style={{ fontSize: 14, color: "#999" }}>{t.unit}</span></div>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginTop: 12, minHeight: 44 }}>{t.desc}</p>
                <div style={{ marginTop: 20, marginBottom: 28, flex: 1 }}>
                  {t.features.map((f, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}><path d="M3 7.5L5.5 10L11 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{f}</span></div>)}
                </div>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={t.highlighted ? { ...st.btn, width: "100%", padding: "13px 0", borderRadius: 8, textAlign: "center", boxSizing: "border-box" } : { ...st.btnOut, width: "100%", padding: "12px 0", borderRadius: 8, textAlign: "center", boxSizing: "border-box", textDecoration: "none" }}>{t.cta}</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div style={st.divider} />
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Strategic Projects</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 16 }}>Fixed scope, fixed fee</h2><p style={{ fontSize: 14, color: "#888", textAlign: "center", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>Project fees are typically split into an upfront payment and a completion payment, agreed before work begins.</p></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
          {projectExamples.map((p, i) => <FadeIn key={i}><CardHover style={{ height: "100%" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 8 }}>{p.price}</div><p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginTop: 10, marginBottom: 0 }}>{p.desc}</p></CardHover></FadeIn>)}
        </div>
      </div>
      <div style={st.divider} />
      <div style={{ maxWidth: 660, margin: "0 auto", padding: isMobile ? "56px 24px" : "72px 48px" }}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Common questions</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 36 }}>How it works</h2></FadeIn>
        {pricingFaqs.map((faq, i) => <div key={i} style={{ borderBottom: "1px solid #E8E6E1" }}><button onClick={() => setOpenFaq(openFaq === "p"+i ? null : "p"+i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#1a1a1a", textAlign: "left", fontFamily: "inherit" }}>{faq.q}<span style={{ fontSize: 18, color: "#ccc", transform: openFaq === "p"+i ? "rotate(45deg)" : "none", transition: "transform 0.2s", marginLeft: 16, flexShrink: 0 }}>+</span></button>{openFaq === "p"+i && <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, margin: "0 0 18px", paddingRight: 40 }}>{faq.a}</p>}</div>)}
      </div>
      <CTA title="Not sure which option fits?" subtitle="Most engagements start with a short conversation." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Who We Work With") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px 24px" : "80px 48px 24px" }}><p style={st.label}>Who we work with</p><h1 style={st.h1}>Founder-led brands navigating growth</h1><p style={st.body}>Ambitious consumer brands, typically $3M to $100M in revenue, scaling faster than their legal infrastructure.</p></FadeIn>
      <div style={st.section}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 48 }}>
          {[
            { t: "Fashion & Apparel", d: "From DTC startups to labels expanding internationally." },
            { t: "Beauty & Wellness", d: "Brands navigating regulatory complexity across markets." },
            { t: "Lifestyle & Home", d: "Companies building licensing and distribution at scale." },
            { t: "Consumer Goods", d: "Product brands managing supplier relationships and IP." },
            { t: "E-Commerce & DTC", d: "Digital-first brands entering wholesale and international channels." },
            { t: "Consumer Services", d: "Service businesses scaling operations and partnerships." },
          ].map((c, i) => <FadeIn key={i}><div style={{ ...st.card, height: "100%" }}><div style={{ ...st.h3, fontSize: 15 }}>{c.t}</div><p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>{c.d}</p></div></FadeIn>)}
        </div>
        <div style={st.divider} />
        <FadeIn style={{ marginTop: 48 }}>
          <p style={st.label}>The challenge</p><h2 style={{ ...st.h2, marginBottom: 20 }}>Growth creates legal complexity</h2>
          <p style={{ ...st.body, maxWidth: 620 }}>International expansion, licensing, brand protection, complex contracts. It stacks up fast.</p>
          <p style={st.bodySm}>{BRAND} gives scaling brands access to senior-level counsel, the kind of support that lets you operate like a much larger company.</p>
        </FadeIn>
      </div>
      <CTA title="Sound like your brand?" subtitle="We should talk about what you are building." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Approach") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px 24px" : "80px 48px 24px" }}><p style={st.label}>Our approach</p><h1 style={st.h1}>Advisory that actually works<br />for growing brands</h1><p style={st.body}>We are not a law firm. We are a strategic partner that works the way modern brands need.</p></FadeIn>
      <div style={st.section}>
        {[
          { num: "01", t: "Direct access to experienced counsel", d: "You work directly with Richard. One senior advisor who knows your business." },
          { num: "02", t: "Practical, commercial advice", d: "Every piece of advice is grounded in commercial reality. What is the actual risk, and what would we do in your position." },
          { num: "03", t: "Predictable pricing", d: "Monthly retainers or fixed-scope projects. You always know what you are paying." },
          { num: "04", t: "Long-term advisory relationships", d: "We invest in knowing your business. We think in years, not transactions." },
        ].map((item, i) => <FadeIn key={i}><div style={{ display: "flex", gap: 32, padding: "40px 0", borderBottom: i < 3 ? "1px solid #E8E6E1" : "none" }}><div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", flexShrink: 0, paddingTop: 4 }}>{item.num}</div><div><div style={st.h3}>{item.t}</div><p style={{ ...st.bodySm, marginTop: 12 }}>{item.d}</p></div></div></FadeIn>)}
      </div>
      <div style={st.divider} />
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>The difference</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 40 }}>Why brands choose fractional counsel</h2></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
          {[
            { t: "Traditional law firm", items: ["Hourly billing creates hesitation", "Rotating associates", "Transactional relationship", "Legal-first thinking", "You are a small client"], negative: true },
            { t: BRAND, items: ["Predictable monthly pricing", "One senior advisor, deep knowledge", "Long-term partnership", "Commercial-first thinking", "You are a priority, always"], negative: false },
          ].map((col, i) => <FadeIn key={i}><div style={{ ...st.card, background: col.negative ? "#fff" : "#F5F4F0", border: col.negative ? "1px solid #E8E6E1" : "none", height: "100%" }}><div style={{ ...st.h3, marginBottom: 20 }}>{col.t}</div>{col.items.map((item, j) => <div key={j} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>{col.negative ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4L10 10M10 4L4 10" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/></svg> : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}<span style={{ fontSize: 14, color: col.negative ? "#999" : "#555" }}>{item}</span></div>)}</div></FadeIn>)}
        </div>
      </div>
      <CTA title="Ready for a better way to work?" subtitle="Start with a conversation." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Insights") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "64px 24px 24px" : "80px 48px 24px" }}><p style={st.label}>Insights</p><h1 style={st.h1}>Thinking on legal strategy<br />for scaling brands</h1><p style={st.body}>Practical perspectives on the challenges growing consumer brands face.</p></FadeIn>
      <div style={st.section}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
          {insights.map((post, i) => <FadeIn key={i}><CardHover style={{ height: "100%", cursor: "pointer" }} onClick={() => go("Article", { articleIdx: i })}><div style={{ display: "flex", gap: 12, marginBottom: 12 }}><span style={{ fontSize: 12, color: "#999" }}>{post.date}</span><span style={{ fontSize: 12, color: "#1a1a1a", background: "#F5F4F0", padding: "2px 10px", borderRadius: 12, fontWeight: 500 }}>{post.tag}</span></div><div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>{post.title}</div><p style={{ fontSize: 14, color: "#888", lineHeight: 1.65, marginTop: 10, marginBottom: 0 }}>{post.excerpt}</p><div style={{ marginTop: 16, fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>Read more</div></CardHover></FadeIn>)}
        </div>
      </div>
      <div style={st.divider} />
      <div style={st.section}>
        <FadeIn><p style={{ ...st.label, textAlign: "center" }}>Case Studies</p><h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center", marginTop: 12, marginBottom: 40 }}>Recent work</h2></FadeIn>
        {caseStudies.map((cs, i) => <FadeIn key={i}><div style={{ ...st.card, marginBottom: 20 }}><span style={{ fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>{cs.tag}</span><h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>{cs.title}</h3><div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, marginTop: 16 }}><div><div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Challenge</div><p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{cs.challenge}</p></div><div><div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Outcome</div><p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{cs.outcome}</p></div></div><div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>{cs.metrics.map((m, j) => <span key={j} style={{ padding: "6px 16px", borderRadius: 20, background: "#F5F4F0", fontSize: 12, fontWeight: 500, color: "#555" }}>{m}</span>)}</div></div></FadeIn>)}
      </div>
      {newsletterSection}
      <CTA title="Want to discuss your legal strategy?" subtitle="Book a conversation to explore how we can support your growth." dark calendly />
      <Footer /><CookieBanner />
    </div>
  );

  if (page === "Contact") return (
    <div style={st.wrap}><Nav />
      <FadeIn style={{ maxWidth: 1060, margin: "0 auto", padding: isMobile ? "64px 24px" : "80px 48px", display: "flex", gap: isMobile ? 40 : 64, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={st.label}>Contact</p>
          <h1 style={{ ...st.h1, fontSize: isMobile ? 28 : 36 }}>Start a conversation</h1>
          <p style={st.body}>Whether you have a specific challenge or are thinking about your advisory setup as you scale, I would welcome the chance to talk.</p>
          <div style={{ marginTop: 40 }}>
            {[{ label: "Email", value: EMAIL }, { label: "LinkedIn", value: "linkedin.com/in/rickymarshall" }, { label: "WhatsApp", value: "Available on request" }, { label: "Based in", value: "London / Available globally" }, { label: "Response time", value: "Usually within 24 hours" }].map((item, i) => <div key={i} style={{ marginBottom: 20 }}><div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 4 }}>{item.label}</div><div style={{ fontSize: 15, color: "#333" }}>{item.value}</div></div>)}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, border: "1px solid #E8E6E1" }}>{s.icon}</a>)}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ ...st.card, borderRadius: 18, padding: isMobile ? 28 : 40 }}>
            {["name", "email"].map(field => <div key={field} style={{ marginBottom: 24 }}><label style={{ fontSize: 12, fontWeight: 500, color: "#888", display: "block", marginBottom: 8 }}>{field === "name" ? "Your Name" : "Email Address"}</label><input type={field === "email" ? "email" : "text"} value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} placeholder={field === "name" ? "Jane Smith" : "jane@yourbrand.com"} style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #E8E6E1", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "#E8E6E1"} /></div>)}
            <div style={{ marginBottom: 24 }}><label style={{ fontSize: 12, fontWeight: 500, color: "#888", display: "block", marginBottom: 8 }}>Tell me about your brand</label><textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} placeholder="What are you building?" style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #E8E6E1", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} onFocus={e => e.target.style.borderColor = "#1a1a1a"} onBlur={e => e.target.style.borderColor = "#E8E6E1"} /></div>
            <button style={{ ...st.btn, width: "100%" }}>Send Message</button>
            <p style={{ fontSize: 12, color: "#bbb", marginTop: 16, textAlign: "center" }}>Prefer to talk? <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#1a1a1a", textDecoration: "underline" }}>Book a call directly</a></p>
          </div>
        </div>
      </FadeIn>
      <Footer /><CookieBanner />
    </div>
  );

  return null;
}
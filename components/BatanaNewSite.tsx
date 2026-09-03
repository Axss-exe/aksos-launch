'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

const needs = [
  'Investment opportunities', 'Funding opportunities', 'Local partners', 
  'Organizations', 'Businesses', 'Government / institutional contacts', 
  'Specialists / expertise', 'Projects', 'Market information', 'Regulatory information', 'Other'
];

function Label({ children }: { children: React.ReactNode }) { 
  return <p className="sys-label"><span />{children}</p>; 
}

// Text-based diagrams matching aksos.net aesthetic
function BatanaCycleDiagram() {
  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <div className="pipeline-flow">
        <span className="pipeline-stage">OBJECTIVE</span>
        <span className="pipeline-stage">UNDERSTAND</span>
        <span className="pipeline-stage">IDENTIFY</span>
        <span className="pipeline-stage">INVESTIGATE</span>
        <span className="pipeline-stage">ASSESS</span>
        <span className="pipeline-stage">CONNECT</span>
      </div>
      <p style={{ padding: '20px 0', fontSize: '11px', color: tokens.color.muted, letterSpacing: '0.05em', margin: 0 }}>
        BATANA
      </p>
    </motion.div>
  );
}

function ConnectionFlowDiagram() {
  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div>
          <h4 style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', marginBottom: '15px', color: tokens.color.muted }}>SEARCHING ALONE</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className="pipeline-stage">Your objective</span>
            <span className="pipeline-stage">Google</span>
            <span className="pipeline-stage">Reports</span>
            <span className="pipeline-stage">Websites</span>
            <span className="pipeline-stage">Emails</span>
            <span className="pipeline-stage">Cold introductions</span>
            <span className="pipeline-stage">Unknown information</span>
          </div>
          <p style={{ marginTop: '20px', fontSize: '12px', color: tokens.color.signal, fontFamily: tokens.font.mono }}>
            &quot;Who actually knows?&quot;
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', marginBottom: '15px', color: tokens.color.muted }}>PROJECT BATANA</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Your objective</span>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Understand what you need</span>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Identify relevant people</span>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Investigate potential matches</span>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Assess relevance</span>
            <span className="pipeline-stage" style={{ color: tokens.color.signal, borderBottomColor: tokens.color.signal }}>Find the right connection</span>
          </div>
          <p style={{ marginTop: '20px', fontSize: '12px', color: tokens.color.signal, fontFamily: tokens.font.mono }}>
            Conversation
          </p>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>
        OR
      </p>
    </motion.div>
  );
}

function MatchDiagram() {
  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="pipeline-stage" style={{ minWidth: '140px' }}>YOUR OBJECTIVE</span>
          <span style={{ color: tokens.color.muted, fontSize: '11px', fontFamily: tokens.font.mono }}>What you want to accomplish</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="pipeline-stage" style={{ minWidth: '140px' }}>WHAT YOU NEED</span>
          <span style={{ color: tokens.color.muted, fontSize: '11px', fontFamily: tokens.font.mono }}>Capital  Expertise  Local knowledge  Implementation  Relationships</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="pipeline-stage" style={{ minWidth: '140px' }}>FIT</span>
          <span style={{ color: tokens.color.muted, fontSize: '11px', fontFamily: tokens.font.mono }}>Relevant? Credible? Capable? Aligned?</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="pipeline-stage" style={{ minWidth: '140px' }}>CONNECTION</span>
          <span style={{ color: tokens.color.muted, fontSize: '11px', fontFamily: tokens.font.mono }}>A relevant conversation</span>
        </div>
      </div>
    </motion.div>
  );
}

function BatanaHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header batana-header">
      <a href="/#top" className="wordmark">
        <img className="brand-mark brand-mark-small" src="/aksos-symbol-traced.svg" alt="" />
        <span>AKSOS</span>
      </a>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
        <a href="/#why" onClick={() => setMenuOpen(false)}>Why we&apos;re building</a>
        <a href="/#atis" onClick={() => setMenuOpen(false)}>ATIS</a>
        <a href="/batana" onClick={() => setMenuOpen(false)}>Batana</a>
        <a href="#apply" onClick={() => setMenuOpen(false)}>Apply</a>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}


export function BatanaNewSite() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  
  const toggle = (value: string) => setSelectedNeeds((items) => 
    items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
  );
  
  const submit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
    if (!selectedNeeds.length) { 
      setError('Please select at least one thing you need help finding.'); 
      return 
    }
    setError(''); 
    setSending(true); 
    const form = new FormData(event.currentTarget); 
    const payload = Object.fromEntries(form.entries()); 
    payload.needs = selectedNeeds.join(', '); 
    try { 
      const response = await fetch('/api/batana-application', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      }); 
      if (!response.ok) throw new Error('Unable to send'); 
      setError(''); 
      setSubmitted(true); 
      event.currentTarget.reset(); 
      setSelectedNeeds([]) 
    } catch { 
      setError('We could not send your application. Please try again.'); 
    } finally { 
      setSending(false) 
    } 
  } 

  return (
    <main className="batana-page" id="top">
      <BatanaHeader />
      
      {/* Hero Section */}
      <section className="sys-hero batana-hero">
        <div className="sys-grid">
          <div className="hero-copy" style={{ gridColumn: '1 / -1' }}>
            <motion.p 
              className="sys-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.normal }}
            >
              <span />PROJECT BATANA
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.slow }}
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              You know what you want to do in Zimbabwe.<br />
              <em>But you may not know who can help you do it.</em>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
            >
              <p style={{ maxWidth: '680px', color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
                You can spend weeks searching Google, reading reports, sending emails, and asking people you already know. And still not find the person, organization, company, or institution you actually need.
              </p>
              <p style={{ maxWidth: '680px', color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
                But you don&apos;t need to know who to talk to before you start.
              </p>
              <p style={{ maxWidth: '680px', color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65 }}>
                Tell us what you&apos;re trying to accomplish. We&apos;ll work to understand your objective and connect you with viable people and partners who match what you want to achieve.
              </p>
            </motion.div>
            <motion.div 
              className="link-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.slow, delay: 0.4 }}
            >
              <a className="primary-link" href="#apply">Apply for a pilot slot <ArrowDown size={14} /></a>
              <a href="#how">See how it works <ArrowUpRight size={14} /></a>
            </motion.div>
          </div>
        </div>
        <div style={{ textAlign: 'right', padding: '40px var(--page-padding)', fontSize: '10px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>
          EARLY PILOT<br />
          <span style={{ color: tokens.color.ink }}>OBJECTIVE  CONNECTION</span>
        </div>
      </section>
      
      {/* Section 01 - Problem */}
      <section className="sys-section tone-paper">
        <div className="sys-grid">
          <Label>01 / THE PROBLEM</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            The information you need may not be online.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
            style={{ gridColumn: '1 / span 6' }}
          >
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
              You can find thousands of pages about Zimbabwe. But that doesn&apos;t mean you&apos;ll find the person who can actually help you.
            </p>
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
              The information you need may be spread across ministries, companies, local organizations, professional networks, reports, websites, or people who simply aren&apos;t visible through a normal search.
            </p>
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65 }}>
              Sometimes the problem isn&apos;t that the information doesn&apos;t exist. It&apos;s that you don&apos;t know where it lives  or who holds it.
            </p>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
            style={{ gridColumn: '1 / span 6', marginTop: '40px', fontSize: '18px', lineHeight: 1.65 }}
          >
            But you don&apos;t need to map Zimbabwe before you can start.<br />
            <em>You need to tell us what you&apos;re trying to accomplish.</em>
          </motion.p>
        </div>
      </section>
      
      {/* Section 02 - Searching vs Finding */}
      <section className="sys-section tone-paper">
        <div className="sys-grid">
          <Label>02 / SEARCHING VS FINDING</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            The visitor starts with an objective,<br />
            <em>not with a contact list.</em>
          </motion.h2>
          <ConnectionFlowDiagram />
        </div>
      </section>
      
      {/* Section 03 - Your Objective */}
      <section className="sys-section tone-paper">
        <div className="sys-grid">
          <Label>03 / YOUR OBJECTIVE</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            Start with your vision.<br />
            <em>Not your search history.</em>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
            style={{ gridColumn: '1 / span 6' }}
          >
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
              You might already know exactly what you want to do. You may want to invest. Fund a project. Build a company. Find a local partner. Expand an organization. Research a market. Or turn an idea into something real.
            </p>
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65 }}>
              The difficult part may be everything you don&apos;t know yet: who has the expertise, relationships, local capacity, or relevant information.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Section 04 - How Batana Works */}
      <section className="sys-section tone-dark">
        <div className="sys-grid">
          <Label>04 / HOW BATANA WORKS</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
            style={{ color: tokens.color.paper }}
          >
            We do not start by searching for random people.
          </motion.h2>
          <motion.p 
            className="section-lede"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
            style={{ color: '#a8aba2', gridColumn: '1 / span 6' }}
          >
            We start by understanding what you are trying to accomplish. Then we move through context, requirements, discovery, validation, and connection.
          </motion.p>
          <BatanaCycleDiagram />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
            style={{ gridColumn: '1 / -1', color: '#a8aba2', fontSize: '18px', lineHeight: 1.65, marginTop: '40px' }}
          >
            The outcome may be a conversation, a partnership, a project, an investment, or a new relationship. We do not promise the final outcome.
          </motion.p>
        </div>
      </section>
      
      {/* Section 05 - The Difference */}
      <section className="sys-section tone-paper">
        <div className="sys-grid">
          <Label>05 / THE DIFFERENCE</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            We don&apos;t just give you a list of names.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
            style={{ gridColumn: '1 / span 6' }}
          >
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
              Finding a name on Google is easy. Finding someone who actually fits your objective is harder.
            </p>
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65 }}>
              A useful connection isn&apos;t simply someone who works in your sector. It is someone whose capabilities, position, experience, resources, location, or relationships make sense for what you are actually trying to accomplish.
            </p>
          </motion.div>
          <MatchDiagram />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
            style={{ gridColumn: '1 / span 6', marginTop: '40px', fontSize: '18px', lineHeight: 1.65 }}
          >
            The objective isn&apos;t to give you more names.<br />
            <em>It&apos;s to help you find the right people to talk to.</em>
          </motion.p>
        </div>
      </section>
      
      {/* Section 06 - Project Batana */}
      <section className="sys-section tone-paper">
        <div className="sys-grid">
          <Label>06 / PROJECT BATANA</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            We don&apos;t want everyone.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
            style={{ gridColumn: '1 / span 6' }}
          >
            <p style={{ maxWidth: tokens.typography.textWidth, color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '24px' }}>
              Project Batana is not for people who are simply curious about Zimbabwe. This pilot is for people who want to do something.
            </p>
            <p style={{ fontSize: '16px', color: tokens.color.signal, letterSpacing: '0.05em', marginBottom: '24px' }}>
              Invest  Fund  Build  Expand  Partner  Research  Create  Solve
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
            style={{ gridColumn: '1 / span 6' }}
          >
            <strong style={{ fontWeight: 400, fontSize: '18px', display: 'block', marginBottom: '16px' }}>We need this to work.</strong>
            <p style={{ color: tokens.color.muted, fontSize: '18px', lineHeight: 1.65, margin: 0 }}>
              The pilot only proves its value if people move from an idea to a conversation, from a conversation to a relationship, and from a relationship to something real.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Section 07 - Apply */}
      <section className="sys-section tone-paper" id="apply">
        <div className="sys-grid">
          <Label>07 / APPLY</Label>
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow }}
          >
            Tell us what you&apos;re trying to accomplish.
          </motion.h2>
          <motion.p 
            className="section-lede"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
          >
            You don&apos;t need to know who you need to talk to. You just need to know what you want to make happen.
          </motion.p>
          
          <motion.form 
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
            style={{ gridColumn: '1 / -1' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '30px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>FULL NAME</span>
                <input required name="name" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>ORGANIZATION</span>
                <input name="organization" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>EMAIL</span>
                <input required type="email" name="email" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>COUNTRY</span>
                <input name="country" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
              </label>
            </div>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>WHAT ARE YOU TRYING TO ACCOMPLISH IN ZIMBABWE?</span>
              <textarea required rows={4} name="objective" style={{ padding: '12px', background: 'transparent', border: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>WHAT IS YOUR VISION?</span>
              <textarea required rows={4} name="vision" style={{ padding: '12px', background: 'transparent', border: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>HOW DO YOU INTEND TO ACCOMPLISH IT?</span>
              <textarea rows={4} name="approach" style={{ padding: '12px', background: 'transparent', border: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <fieldset style={{ border: 'none', padding: 0, marginBottom: '24px' }}>
              <legend style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted, marginBottom: '12px' }}>WHAT DO YOU NEED HELP FINDING?</legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {needs.map((need) => (
                  <label key={need} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedNeeds.includes(need)} onChange={() => toggle(need)} style={{ width: '16px', height: '16px' }} />
                    {selectedNeeds.includes(need) && <Check size={16} style={{ color: tokens.color.signal }} />}
                    <span>{need}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>WHAT KIND OF PARTNER ARE YOU LOOKING FOR?</span>
              <input name="partner" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '24px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>SECTOR</span>
                <input name="sector" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>TIMELINE</span>
                <select name="timeline" defaultValue="" style={{ padding: '12px', background: 'transparent', border: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }}>
                  <option value="" disabled>Select one</option>
                  <option>Exploring</option>
                  <option>Within 3 months</option>
                  <option>3-6 months</option>
                  <option>6-12 months</option>
                  <option>12+ months</option>
                </select>
              </label>
            </div>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>APPROXIMATE INVESTMENT OR FUNDING RANGE <small>(OPTIONAL)</small></span>
              <input name="funding" style={{ padding: '12px', background: 'transparent', border: 'none', borderBottom: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted }}>WHAT WOULD NEED TO HAPPEN FOR YOU TO SERIOUSLY MOVE FORWARD?</span>
              <textarea rows={4} name="move" style={{ padding: '12px', background: 'transparent', border: `1px solid ${tokens.color.line}`, fontSize: '16px', width: '100%' }} />
            </label>
            
            <fieldset style={{ border: 'none', padding: 0, marginBottom: '30px' }}>
              <legend style={{ fontSize: '11px', fontFamily: tokens.font.mono, letterSpacing: '0.1em', color: tokens.color.muted, marginBottom: '12px' }}>IF WE IDENTIFY A STRONG MATCH, WOULD YOU BE OPEN TO AN INTRODUCTION?</legend>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input required type="radio" name="introduction" value="yes" /> Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="introduction" value="no" /> No
                </label>
              </div>
            </fieldset>
            
            {error && <p style={{ color: tokens.color.signal, marginBottom: '20px' }}>{error}</p>}
            {submitted ? 
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: tokens.color.signal, marginBottom: '20px' }}>
                <Check /> Application received. We&apos;ll review your objective carefully.
              </p> : 
              null
            }
            <p style={{ fontSize: '14px', color: tokens.color.muted, marginBottom: '24px' }}>
              We review applications based on seriousness of intent, clarity of objective, and potential for a meaningful match.
            </p>
            <button className="button button-solid" type="submit" disabled={sending} style={{ fontFamily: tokens.font.mono, fontSize: '11px', letterSpacing: '0.1em' }}>
              {sending ? 'Sending application...' : 'Submit pilot application'} <ArrowUpRight size={14} />
            </button>
          </motion.form>
        </div>
      </section>
      
      {/* Final Section */}
      <section className="final-statement">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          Your idea is only the beginning.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          You may already know exactly what you want to do. But the right people may still be missing.
        </motion.p>
        <motion.p 
          className="final-motto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          Real intentions. Real relationships. Real possibilities.
        </motion.p>
      </section>
      
      <footer>
        <a href="/#top" className="wordmark">
          <img className="brand-mark brand-mark-small" src="/aksos-symbol-traced.svg" alt="" />
          <span>AKSOS</span>
        </a>
        <p>The information is already there.<br />
          <em>We&apos;re building the systems and relationships needed to understand how it connects.</em>
        </p>
        <span className="footer-meta">Harare  Zimbabwe / 2026</span>
      </footer>
    </main>
  );
}

export default BatanaNewSite;

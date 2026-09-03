'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';
import { Section, SectionLabel } from './layout/Section';

const needs = [
  'Investment opportunities', 'Funding opportunities', 'Local partners', 
  'Organizations', 'Businesses', 'Government / institutional contacts', 
  'Specialists / expertise', 'Projects', 'Market information', 'Regulatory information', 'Other'
];

const stages = [ 
  ['01', 'VISION', 'What are you trying to accomplish?'],
  ['02', 'CONTEXT', 'What are you trying to build, fund, invest in, research, or change?'],
  ['03', 'REQUIREMENTS', 'What people, capabilities, information, resources, or relationships are missing?'],
  ['04', 'DISCOVERY', 'Where might those capabilities or relationships exist?'],
  ['05', 'VALIDATION', 'Does the potential match actually fit what you need?'],
  ['06', 'CONNECTION', 'Where there is a genuine fit, we help create the introduction.'],
];

function Label({ children }: { children: React.ReactNode }) { 
  return <p className="sys-label"><span />{children}</p>; 
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="primary-link" href={href}>
      {children} <ArrowUpRight size={14} />
    </a>
  );
}

// Batana Network Cycle Diagram
function BatanaCycleDiagram() {
  const cycleStages = [
    { id: 1, label: 'OBJECTIVE', angle: 0, radius: 30, delay: 0.1 },
    { id: 2, label: 'UNDERSTAND', angle: 60, radius: 30, delay: 0.2 },
    { id: 3, label: 'IDENTIFY', angle: 120, radius: 30, delay: 0.3 },
    { id: 4, label: 'INVESTIGATE', angle: 180, radius: 30, delay: 0.4 },
    { id: 5, label: 'ASSESS', angle: 240, radius: 30, delay: 0.5 },
    { id: 6, label: 'CONNECT', angle: 300, radius: 30, delay: 0.6 },
  ];

  const center = { label: 'BATANA', x: 50, y: 50 };

  return (
    <motion.div 
      className="batana-cycle-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        {/* Central circle */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <circle cx={center.x} cy={center.y} r={12} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dy="-3"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
          >
            {center.label}
          </text>
        </motion.g>

        {/* Cycle path */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={35}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: tokens.animation.duration.slower, ease: tokens.animation.easing.easeInOut, delay: 0.1 }}
          style={{ pathLength: 0 }}
        />

        {/* Stage nodes */}
        {cycleStages.map((stage) => {
          const x = center.x + stage.radius * Math.cos((stage.angle - 90) * Math.PI / 180);
          const y = center.y + stage.radius * Math.sin((stage.angle - 90) * Math.PI / 180);
          
          return (
            <motion.g
              key={`stage-${stage.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay }}
            >
              <circle cx={x} cy={y} r={2} fill={tokens.color.ink} stroke={tokens.color.line} strokeWidth="0.3" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dy={stage.label.length > 6 ? '12' : '10'}
                fontSize="6"
                fontFamily={tokens.font.mono}
                fill={tokens.color.ink}
                letterSpacing="0.05em"
              >
                {stage.label}
              </text>
              <motion.line
                x1={x}
                y1={y}
                x2={center.x}
                y2={center.y}
                stroke={tokens.color.line}
                strokeWidth="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: tokens.animation.duration.normal, delay: stage.delay + 0.1 }}
              />
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

// Connection Flow Diagram
function ConnectionFlowDiagram() {
  const leftSide = [
    { label: 'Your objective', delay: 0.1 },
    { label: 'Google', delay: 0.2 },
    { label: 'Reports', delay: 0.3 },
    { label: 'Websites', delay: 0.4 },
    { label: 'Emails', delay: 0.5 },
    { label: 'Cold introductions', delay: 0.6 },
    { label: 'Unknown information', delay: 0.7 },
  ];

  const rightSide = [
    { label: 'Your objective', delay: 0.1 },
    { label: 'Understand what you need', delay: 0.2 },
    { label: 'Identify relevant people', delay: 0.3 },
    { label: 'Investigate potential matches', delay: 0.4 },
    { label: 'Assess relevance', delay: 0.5 },
    { label: 'Find the right connection', delay: 0.6 },
  ];

  return (
    <motion.div 
      className="connection-flow-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '300px' }}>
        {/* Left side - Searching Alone */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: tokens.animation.duration.normal }}>
          <text x={25} y={10} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">SEARCHING ALONE</text>
          {leftSide.map((item, index) => (
            <motion.g key={`left-${index}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: tokens.animation.duration.normal, delay: item.delay }}>
              <circle cx={25} cy={20 + (index * 12)} r={1.5} fill={tokens.color.ink} />
              <text x={25} y={20 + (index * 12)} textAnchor="middle" dy="8" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.05em">{item.label}</text>
            </motion.g>
          ))}
          <text x={25} y={100} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.05em">"Who actually knows?"</text>
        </motion.g>

        {/* OR divider */}
        <motion.text x={50} y={50} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>OR</motion.text>

        {/* Right side - Project Batana */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: tokens.animation.duration.normal }}>
          <text x={75} y={10} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">PROJECT BATANA</text>
          {rightSide.map((item, index) => (
            <motion.g key={`right-${index}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: tokens.animation.duration.normal, delay: item.delay }}>
              <circle cx={75} cy={20 + (index * 12)} r={1.5} fill={tokens.color.signal} />
              <text x={75} y={20 + (index * 12)} textAnchor="middle" dy="8" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.05em">{item.label}</text>
            </motion.g>
          ))}
          <text x={75} y={100} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.05em">Conversation</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

// Match Diagram
function MatchDiagram() {
  const steps = [
    { label: 'YOUR OBJECTIVE', desc: 'What you want to accomplish' },
    { label: 'WHAT YOU NEED', desc: 'Capital · Expertise · Local knowledge · Implementation · Relationships' },
    { label: 'FIT', desc: 'Relevant? Credible? Capable? Aligned?' },
    { label: 'CONNECTION', desc: 'A relevant conversation' },
  ];

  return (
    <motion.div 
      className="match-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '200px' }}>
        {steps.map((step, index) => (
          <motion.g
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: tokens.animation.duration.normal, delay: index * 0.1 }}
          >
            <rect x={50 - 25} y={15 + (index * 25)} width={50} height={18} fill="none" stroke={tokens.color.line} strokeWidth="0.3" />
            <text x={50} y={20 + (index * 25)} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{step.label}</text>
            <text x={50} y={32 + (index * 25)} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.05em">{step.desc}</text>
            {index < steps.length - 1 && (
              <motion.line
                x1={50}
                y1={38 + (index * 25)}
                x2={50}
                y2={48 + (index * 25)}
                stroke={tokens.color.line}
                strokeWidth="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: tokens.animation.duration.normal, delay: index * 0.1 + 0.1 }}
              />
            )}
          </motion.g>
        ))}
      </svg>
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

function BatanaHero() {
  return (
    <section className="batana-hero">
      <div className="batana-hero-overlay" />
      <div className="batana-hero-copy">
        <motion.p 
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          PROJECT BATANA
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          You know what you want to do in Zimbabwe.<br />
          <em>But you may not know who can help you do it.</em>
        </motion.h1>
        <motion.div 
          className="batana-hero-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <p>You can spend weeks searching Google, reading reports, sending emails, and asking people you already know. And still not find the person, organization, company, or institution you actually need.</p>
          <p>But you don&apos;t need to know who to talk to before you start.</p>
          <p>Tell us what you&apos;re trying to accomplish. We&apos;ll work to understand your objective and connect you with viable people and partners who match what you want to achieve.</p>
        </motion.div>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.4 }}
        >
          <a className="button button-solid" href="#apply">Apply for a pilot slot <ArrowDown /></a>
          <a className="button button-quiet" href="#how">See how it works</a>
        </motion.div>
      </div>
      <motion.div 
        className="batana-hero-index"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.6 }}
      >
        EARLY PILOT<br />
        <span>OBJECTIVE → CONNECTION</span>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <Section label="01 / THE PROBLEM" tone="paper">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        The information you need may not be online.
      </motion.h2>
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        <p>You can find thousands of pages about Zimbabwe. But that doesn&apos;t mean you&apos;ll find the person who can actually help you.</p>
        <p>The information you need may be spread across ministries, companies, local organizations, professional networks, reports, websites, or people who simply aren&apos;t visible through a normal search.</p>
        <p>Sometimes the problem isn&apos;t that the information doesn&apos;t exist. It&apos;s that you don&apos;t know where it lives — or who holds it.</p>
      </motion.div>
      <motion.p 
        className="section-callout"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        But you don&apos;t need to map Zimbabwe before you can start.<br />
        <em>You need to tell us what you&apos;re trying to accomplish.</em>
      </motion.p>
    </Section>
  );
}

function SearchingSection() {
  return (
    <Section label="02 / SEARCHING VS FINDING" tone="paper">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        The visitor starts with an objective,<br />
        <em>not with a contact list.</em>
      </motion.h2>
      <ConnectionFlowDiagram />
    </Section>
  );
}

function ObjectiveSection() {
  return (
    <Section label="03 / YOUR OBJECTIVE" tone="paper">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        Start with your vision.<br />
        <em>Not your search history.</em>
      </motion.h2>
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        <p>You might already know exactly what you want to do. You may want to invest. Fund a project. Build a company. Find a local partner. Expand an organization. Research a market. Or turn an idea into something real.</p>
        <p>The difficult part may be everything you don&apos;t know yet: who has the expertise, relationships, local capacity, or relevant information.</p>
      </motion.div>
    </Section>
  );
}

function HowBatanaWorksSection() {
  return (
    <Section label="04 / HOW BATANA WORKS" tone="dark">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We do not start by searching for random people.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        We start by understanding what you are trying to accomplish. Then we move through context, requirements, discovery, validation, and connection.
      </motion.p>
      <BatanaCycleDiagram />
      <motion.p 
        className="section-outcome"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
      >
        The outcome may be a conversation, a partnership, a project, an investment, or a new relationship. We do not promise the final outcome.
      </motion.p>
    </Section>
  );
}

function DifferenceSection() {
  return (
    <Section label="05 / THE DIFFERENCE" tone="paper">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We don&apos;t just give you a list of names.
      </motion.h2>
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        <p>Finding a name on Google is easy. Finding someone who actually fits your objective is harder.</p>
        <p>A useful connection isn&apos;t simply someone who works in your sector. It is someone whose capabilities, position, experience, resources, location, or relationships make sense for what you are actually trying to accomplish.</p>
      </motion.div>
      <MatchDiagram />
      <motion.p 
        className="section-callout"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
      >
        The objective isn&apos;t to give you more names.<br />
        <em>It&apos;s to help you find the right people to talk to.</em>
      </motion.p>
    </Section>
  );
}

function PilotSection() {
  return (
    <Section label="06 / PROJECT BATANA" tone="paper">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We don&apos;t want everyone.
      </motion.h2>
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        <p>Project Batana is not for people who are simply curious about Zimbabwe. This pilot is for people who want to do something.</p>
        <div className="verb-list">Invest · Fund · Build · Expand · Partner · Research · Create · Solve</div>
      </motion.div>
      <motion.div 
        className="pilot-note"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <strong>We need this to work.</strong>
        <p>The pilot only proves its value if people move from an idea to a conversation, from a conversation to a relationship, and from a relationship to something real.</p>
      </motion.div>
    </Section>
  );
}

function ApplySection() {
  const [menuOpen] = useState(false);
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
    <Section label="07 / APPLY" tone="paper">
      <motion.h2 
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
        className="batana-form"
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <div className="form-grid">
          <label>FULL NAME<input required name="name" /></label>
          <label>ORGANIZATION<input name="organization" /></label>
          <label>EMAIL<input required type="email" name="email" /></label>
          <label>COUNTRY<input name="country" /></label>
        </div>
        <label>WHAT ARE YOU TRYING TO ACCOMPLISH IN ZIMBABWE?<textarea required rows={4} name="objective" /></label>
        <label>WHAT IS YOUR VISION?<textarea required rows={4} name="vision" /></label>
        <label>HOW DO YOU INTEND TO ACCOMPLISH IT?<textarea rows={4} name="approach" /></label>
        <fieldset>
          <legend>WHAT DO YOU NEED HELP FINDING?</legend>
          <div className="batana-checks">
            {needs.map((need) => 
              <label key={need}>
                <input type="checkbox" checked={selectedNeeds.includes(need)} onChange={() => toggle(need)} />
                <span>{selectedNeeds.includes(need) && <Check />}</span>
                {need}
              </label>
            )}
          </div>
        </fieldset>
        <label>WHAT KIND OF PARTNER ARE YOU LOOKING FOR?<input name="partner" /></label>
        <div className="form-grid">
          <label>SECTOR<input name="sector" /></label>
          <label>TIMELINE
            <select name="timeline" defaultValue="">
              <option value="" disabled>Select one</option>
              <option>Exploring</option>
              <option>Within 3 months</option>
              <option>3-6 months</option>
              <option>6-12 months</option>
              <option>12+ months</option>
            </select>
          </label>
        </div>
        <label>APPROXIMATE INVESTMENT OR FUNDING RANGE <small>(OPTIONAL)</small><input name="funding" /></label>
        <label>WHAT WOULD NEED TO HAPPEN FOR YOU TO SERIOUSLY MOVE FORWARD?<textarea rows={4} name="move" /></label>
        <fieldset>
          <legend>IF WE IDENTIFY A STRONG MATCH, WOULD YOU BE OPEN TO AN INTRODUCTION?</legend>
          <div className="radio-row">
            <label><input required type="radio" name="introduction" value="yes" /> Yes</label>
            <label><input type="radio" name="introduction" value="no" /> No</label>
          </div>
        </fieldset>
        {error && <p className="form-error">{error}</p>}
        {submitted ? 
          <div className="form-success"><Check />Application received. We&apos;ll review your objective carefully.</div> : 
          <button className="button button-solid" type="submit">Apply for a pilot slot <ArrowUpRight /></button>
        }
        <p className="form-note">We review applications based on seriousness of intent, clarity of objective, and potential for a meaningful match.</p>
        <button className="button button-solid" type="submit" disabled={sending}>
          {sending ? 'Sending application...' : 'Submit pilot application'} <ArrowUpRight />
        </button>
      </motion.form>
    </Section>
  );
}

function FinalSection() {
  return (
    <Section label="" tone="paper">
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
    </Section>
  );
}

export function BatanaNewSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="batana-page" id="top">
      <BatanaHeader />
      
      <BatanaHero />
      
      <ProblemSection />
      <SearchingSection />
      <ObjectiveSection />
      <HowBatanaWorksSection />
      <DifferenceSection />
      <PilotSection />
      <ApplySection id="apply" />
      <FinalSection />
      
      <footer>
        <a href="/#top" className="wordmark">
          <img className="brand-mark brand-mark-small" src="/aksos-symbol-traced.svg" alt="" />
          <span>AKSOS</span>
        </a>
        <p>The information is already there.<br />
          <em>We&apos;re building the systems and relationships needed to understand how it connects.</em>
        </p>
        <span className="footer-meta">Harare · Zimbabwe / 2026</span>
      </footer>
    </main>
  );
}

export default BatanaNewSite;

'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import { SiteHeader } from './navigation/SiteHeader';
import { Section } from './layout/Section';

const needs = [
  'Investment opportunities', 'Funding opportunities', 'Local partners', 
  'Organizations', 'Businesses', 'Government / institutional contacts', 
  'Specialists / expertise', 'Projects', 'Market information', 'Regulatory information', 'Other'
];

// Form component that uses the existing API route
export function BatanaNewSite() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div id="top" className="relative">
      {/* Header */}
      <motion.header
        className="site-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: tokens.animation.duration.normal }}
      >
        <a href="/#top" className="wordmark">
          <img src="/aksos-symbol-traced.svg" alt="AKSOS" />
          <span>AKSOS</span>
        </a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a href="/#why" onClick={() => setMenuOpen(false)}>Why we're building</a>
          <a href="/#atis" onClick={() => setMenuOpen(false)}>ATIS</a>
          <a href="/batana" onClick={() => setMenuOpen(false)}>Batana</a>
          <a href="#apply" onClick={() => setMenuOpen(false)}>Apply</a>
        </nav>
        <button 
          className="menu-button" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid">
          <motion.div 
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: tokens.animation.duration.slow }}
            style={{ gridColumn: '1 / -1' }}
          >
            <motion.p 
              className="section-label"
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
              <p className="text-lg text-muted max-w-content mt-6">
                You can spend weeks searching Google, reading reports, sending emails, and asking people you already know. And still not find the person, organization, company, or institution you actually need.
              </p>
              <p className="text-lg text-muted max-w-content mt-6">
                But you don't need to know who to talk to before you start.
              </p>
              <p className="text-lg text-muted max-w-content mt-6">
                Tell us what you're trying to accomplish. We'll work to understand your objective and connect you with viable people and partners who match what you want to achieve.
              </p>
            </motion.div>
            <motion.div 
              className="flex items-center gap-6 mt-10 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.slow, delay: 0.4 }}
            >
              <a className="btn btn-primary" href="#apply">
                Apply for a pilot slot <ArrowDown size={14} />
              </a>
              <a href="#how" className="btn">
                See how it works <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="text-right padding-10 text-xs font-mono text-muted letter-spacing-wider">
          EARLY PILOT<br />
          <span className="text-ink">OBJECTIVE  CONNECTION</span>
        </div>
      </section>

      {/* Section 01 - Problem */}
      <Section label="01 / THE PROBLEM" tone="paper">
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
          className="max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          <p className="text-lg text-muted mt-6">
            You can find thousands of pages about Zimbabwe. But that doesn't mean you'll find the person who can actually help you.
          </p>
          <p className="text-lg text-muted mt-6">
            The information you need may be spread across ministries, companies, local organizations, professional networks, reports, websites, or people who simply aren't visible through a normal search.
          </p>
          <p className="text-lg text-muted mt-6">
            Sometimes the problem isn't that the information doesn't exist. It's that you don't know where it lives or who holds it.
          </p>
        </motion.div>
        <motion.p 
          className="text-lg text-muted max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          But you don't need to map Zimbabwe before you can start.<br />
          <em>You need to tell us what you're trying to accomplish.</em>
        </motion.p>
      </Section>

      {/* Section 02 - Searching vs Finding */}
      <Section label="02 / SEARCHING VS FINDING" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          The visitor starts with an objective,
        </motion.h2>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          <em>not with a contact list.</em>
        </motion.h2>

        <motion.div 
          className="mt-16 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm font-mono text-muted mb-6 letter-spacing-wider">SEARCHING ALONE</h4>
              <div className="space-y-3">
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Your objective</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Google</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Reports</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Websites</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Emails</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Cold introductions</div>
                <div className="border border-line px-4 py-2 text-sm font-mono text-muted">Unknown information</div>
              </div>
              <p className="text-center text-sm text-signal font-mono mt-6">
                &quot;Who actually knows?&quot;
              </p>
            </div>
            <div>
              <h4 className="text-sm font-mono text-muted mb-6 letter-spacing-wider">PROJECT BATANA</h4>
              <div className="space-y-3">
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Your objective</div>
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Understand what you need</div>
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Identify relevant people</div>
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Investigate potential matches</div>
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Assess relevance</div>
                <div className="border border-signal px-4 py-2 text-sm font-mono text-signal">Find the right connection</div>
              </div>
              <p className="text-center text-sm text-signal font-mono mt-6">
                Conversation
              </p>
            </div>
          </div>
          <p className="text-center text-xs font-mono text-muted mt-8 letter-spacing-wider">
            OR
          </p>
        </motion.div>
      </Section>

      {/* Section 03 - Your Objective */}
      <Section label="03 / YOUR OBJECTIVE" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          Start with your vision.
        </motion.h2>
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          <em>Not your search history.</em>
        </motion.h2>
        <motion.div 
          className="max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <p className="text-lg text-muted">
            You might already know exactly what you want to do. You may want to invest. Fund a project. Build a company. Find a local partner. Expand an organization. Research a market. Or turn an idea into something real.
          </p>
          <p className="text-lg text-muted mt-6">
            The difficult part may be everything you don't know yet: who has the expertise, relationships, local capacity, or relevant information.
          </p>
        </motion.div>
      </Section>

      {/* Section 04 - How Batana Works */}
      <Section id="how" label="04 / HOW BATANA WORKS" tone="dark">
        <motion.h2 
          className="section-heading text-paper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          We do not start by searching for random people.
        </motion.h2>
        <motion.p 
          className="section-lede text-muted-soft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          We start by understanding what you are trying to accomplish. Then we move through context, requirements, discovery, validation, and connection.
        </motion.p>

        <motion.div 
          className="mt-16 p-8 bg-ink border border-line-strong"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm font-mono text-muted-soft">
            <span className="border border-muted-soft px-4 py-2">OBJECTIVE</span>
            <span className="text-2xl"></span>
            <span className="border border-muted-soft px-4 py-2">UNDERSTAND</span>
            <span className="text-2xl"></span>
            <span className="border border-muted-soft px-4 py-2">IDENTIFY</span>
            <span className="text-2xl"></span>
            <span className="border border-muted-soft px-4 py-2">INVESTIGATE</span>
            <span className="text-2xl"></span>
            <span className="border border-muted-soft px-4 py-2">ASSESS</span>
            <span className="text-2xl"></span>
            <span className="border border-muted-soft px-4 py-2">CONNECT</span>
          </div>
          <p className="text-center text-sm font-mono text-muted-soft mt-6">
            BATANA
          </p>
        </motion.div>

        <motion.p 
          className="text-lg text-muted-soft max-w-content mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
        >
          The outcome may be a conversation, a partnership, a project, an investment, or a new relationship. We do not promise the final outcome.
        </motion.p>
      </Section>

      {/* Section 05 - The Difference */}
      <Section label="05 / THE DIFFERENCE" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          We don't just give you a list of names.
        </motion.h2>
        <motion.div 
          className="max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          <p className="text-lg text-muted">
            Finding a name on Google is easy. Finding someone who actually fits your objective is harder.
          </p>
          <p className="text-lg text-muted mt-6">
            A useful connection isn't simply someone who works in your sector. It is someone whose capabilities, position, experience, resources, location, or relationships make sense for what you are actually trying to accomplish.
          </p>
        </motion.div>

        <motion.div 
          className="mt-16 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted">YOUR OBJECTIVE</span>
              <span className="text-muted">What you want to accomplish</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted">WHAT YOU NEED</span>
              <span className="text-muted">Capital, Expertise, Local knowledge, Implementation, Relationships</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted">FIT</span>
              <span className="text-muted">Relevant? Credible? Capable? Aligned?</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted">CONNECTION</span>
              <span className="text-muted">A relevant conversation</span>
            </div>
          </div>
        </motion.div>

        <motion.p 
          className="text-lg text-muted max-w-content mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
        >
          The objective isn't to give you more names.<br />
          <em>It's to help you find the right people to talk to.</em>
        </motion.p>
      </Section>

      {/* Section 06 - Project Batana */}
      <Section label="06 / PROJECT BATANA" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          We don't want everyone.
        </motion.h2>
        <motion.div 
          className="max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          <p className="text-lg text-muted">
            Project Batana is not for people who are simply curious about Zimbabwe. This pilot is for people who want to do something.
          </p>
          <p className="text-sm font-mono text-signal mt-6 letter-spacing-wider">
            Invest  Fund  Build  Expand  Partner  Research  Create  Solve
          </p>
        </motion.div>
        <motion.div 
          className="max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <strong className="text-lg text-ink block mb-4">We need this to work.</strong>
          <p className="text-lg text-muted">
            The pilot only proves its value if people move from an idea to a conversation, from a conversation to a relationship, and from a relationship to something real.
          </p>
        </motion.div>
      </Section>

      {/* Section 07 - Apply */}
      <Section id="apply" label="07 / APPLY" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          Tell us what you're trying to accomplish.
        </motion.h2>
        <motion.p 
          className="section-lede"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          You don't need to know who you need to talk to. You just need to know what you want to make happen.
        </motion.p>

        <motion.form 
          onSubmit={submit}
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="form-group">
              <span className="form-label">FULL NAME</span>
              <input 
                required 
                name="name" 
                className="form-input"
                placeholder="Your full name"
              />
            </label>
            <label className="form-group">
              <span className="form-label">ORGANIZATION</span>
              <input 
                name="organization" 
                className="form-input"
                placeholder="Your organization (optional)"
              />
            </label>
            <label className="form-group">
              <span className="form-label">EMAIL</span>
              <input 
                required 
                type="email" 
                name="email" 
                className="form-input"
                placeholder="Your email address"
              />
            </label>
            <label className="form-group">
              <span className="form-label">COUNTRY</span>
              <input 
                name="country" 
                className="form-input"
                placeholder="Your country"
              />
            </label>
          </div>

          <label className="form-group">
            <span className="form-label">WHAT ARE YOU TRYING TO ACCOMPLISH IN ZIMBABWE?</span>
            <textarea 
              required 
              rows={4} 
              name="objective" 
              className="form-textarea"
              placeholder="Describe your objective in detail"
            />
          </label>

          <label className="form-group">
            <span className="form-label">WHAT IS YOUR VISION?</span>
            <textarea 
              required 
              rows={4} 
              name="vision" 
              className="form-textarea"
              placeholder="What is your vision for this work?"
            />
          </label>

          <label className="form-group">
            <span className="form-label">HOW DO YOU INTEND TO ACCOMPLISH IT?</span>
            <textarea 
              rows={4} 
              name="approach" 
              className="form-textarea"
              placeholder="Describe your approach (optional)"
            />
          </label>

          <fieldset className="form-group border-none p-0">
            <legend className="form-label">WHAT DO YOU NEED HELP FINDING?</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {needs.map((need) => (
                <label key={need} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedNeeds.includes(need)} 
                    onChange={() => toggle(need)} 
                    className="w-4 h-4"
                  />
                  {selectedNeeds.includes(need) && <Check size={16} className="text-signal" />}
                  <span>{need}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="form-group">
            <span className="form-label">WHAT KIND OF PARTNER ARE YOU LOOKING FOR?</span>
            <input 
              name="partner" 
              className="form-input"
              placeholder="Describe the ideal partner (optional)"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="form-group">
              <span className="form-label">SECTOR</span>
              <input 
                name="sector" 
                className="form-input"
                placeholder="Your sector (optional)"
              />
            </label>
            <label className="form-group">
              <span className="form-label">TIMELINE</span>
              <select name="timeline" defaultValue="" className="form-select">
                <option value="" disabled>Select one</option>
                <option>Exploring</option>
                <option>Within 3 months</option>
                <option>3-6 months</option>
                <option>6-12 months</option>
                <option>12+ months</option>
              </select>
            </label>
          </div>

          <label className="form-group">
            <span className="form-label">APPROXIMATE INVESTMENT OR FUNDING RANGE <small>(OPTIONAL)</small></span>
            <input 
              name="funding" 
              className="form-input"
              placeholder="Funding range (optional)"
            />
          </label>

          <label className="form-group">
            <span className="form-label">WHAT WOULD NEED TO HAPPEN FOR YOU TO SERIOUSLY MOVE FORWARD?</span>
            <textarea 
              rows={4} 
              name="move" 
              className="form-textarea"
              placeholder="What would need to happen? (optional)"
            />
          </label>

          <fieldset className="form-group border-none p-0">
            <legend className="form-label">IF WE IDENTIFY A STRONG MATCH, WOULD YOU BE OPEN TO AN INTRODUCTION?</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input required type="radio" name="introduction" value="yes" className="w-4 h-4" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="introduction" value="no" className="w-4 h-4" /> No
              </label>
            </div>
          </fieldset>

          {error && <p className="text-signal mt-4">{error}</p>}
          {submitted && 
            <p className="text-green flex items-center gap-2 mt-4">
              <Check size={16} /> Application received. We'll review your objective carefully.
            </p> 
          }

          <p className="text-muted mt-8">
            We review applications based on seriousness of intent, clarity of objective, and potential for a meaningful match.
          </p>
          <button 
            type="submit" 
            disabled={sending} 
            className="btn btn-primary mt-8"
          >
            {sending ? 'Sending application...' : 'Submit pilot application'} <ArrowUpRight size={14} />
          </button>
        </motion.form>
      </Section>

      {/* Final Section */}
      <section className="section section-paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow }}
        >
          Your idea is only the beginning.
        </motion.h2>
        <motion.p 
          className="text-lg text-muted max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        >
          You may already know exactly what you want to do. But the right people may still be missing.
        </motion.p>
        <motion.p 
          className="text-xl font-serif text-ink mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        >
          Real intentions. Real relationships. Real possibilities.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <a href="/#top" className="wordmark">
          <img src="/aksos-symbol-traced.svg" alt="AKSOS" className="w-8 h-8 mx-auto mb-4" />
          <span>AKSOS</span>
        </a>
        <p className="footer-tagline">
          The information is already there.<br />
          <em>We're building the systems and relationships needed to understand how it connects.</em>
        </p>
        <p className="footer-meta">
          Harare  Zimbabwe / 2026
        </p>
      </footer>
    </div>
  );
}

export default BatanaNewSite;

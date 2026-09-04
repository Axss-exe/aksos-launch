'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import { SiteHeader } from './navigation/SiteHeader';
import { SiteFooter } from './layout/SiteFooter';

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
      <SiteHeader 
        navItems={[
          { label: 'Why we\'re building', href: '/#why' },
          { label: 'ATIS', href: '/#atis' },
          { label: 'Batana', href: '/batana' },
        ]}
        cta={{ label: 'Apply', href: '#apply' }}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid">
          <motion.div 
            className="hero-copy"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: '1 / -1' }}
          >
            <motion.p 
              className="section-label"
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span />PROJECT BATANA
            </motion.p>
            <motion.h1 
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              You know what you want to do in Zimbabwe.<br />
              <em>But you may not know who can help you do it.</em>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
              style={{ marginTop: tokens.spacing['8'] }}
            >
              <p className="text-lg text-muted max-w-content">
                Project Batana is an early AKSOS pilot exploring how people, knowledge and opportunity can be connected more deliberately in Zimbabwe.
              </p>
              <p className="text-lg text-muted max-w-content">
                We're currently looking for a small group of people trying to do serious things in Zimbabwe to help us test and build it.
              </p>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 mt-10 flex-wrap"
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#apply" className="btn btn-primary">
                Apply for Batana
              </a>
              <a href="/#what-we-build" className="btn">
                See what we're building <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We're Building */}
      <section id="what-we-build" className="section section-paper">
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.p 
            className="section-label"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHAT WE'RE BUILDING
          </motion.p>
          
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We're building systems for the people who set the standard.
          </motion.h2>

          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src="/atis-symbol-traced.svg" alt="ATIS" className="w-10 h-10" />
                <h3 className="text-xl font-serif text-ink">ATIS</h3>
              </div>
              <p className="text-muted">
                Helps see what connects.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src="/rita-symbol-traced.svg" alt="RITA" className="w-10 h-10" />
                <h3 className="text-xl font-serif text-ink">RITA</h3>
              </div>
              <p className="text-muted">
                Helps follow the relationships.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-signal rounded-sm flex items-center justify-center">
                  <span className="text-paper font-mono text-xs">B</span>
                </div>
                <h3 className="text-xl font-serif text-ink">BATANA</h3>
              </div>
              <p className="text-muted">
                Helps us understand who we're helping.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why We're Building */}
      <section id="why" className="section section-quiet">
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.p 
            className="section-label"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHY WE'RE BUILDING
          </motion.p>
          
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            You can't build a new economy without new systems.
          </motion.h2>

          <motion.div 
            className="space-y-6 text-lg text-muted max-w-content"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              And you can't build new systems without understanding the people who will actually use them.
            </p>
            <p>
              That's what we're doing with Project Batana.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-serif text-ink">
              We're starting with a small group of people who are already doing the work.
            </h3>
          </motion.div>
        </motion.div>
      </section>

      {/* Who We're Looking For */}
      <section className="section section-paper">
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.p 
            className="section-label"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHO WE'RE LOOKING FOR
          </motion.p>
          
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            People who are already doing the work.
          </motion.h2>

          <motion.div 
            className="space-y-6 text-lg text-muted max-w-content"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              People who are already setting the standard.
            </p>
            <p>
              People who are already building something worth strengthening.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-serif text-ink mb-4">
              And people who are willing to help us build it.
            </h3>
            <p className="text-lg text-muted max-w-content">
              Because the best systems are built with the people who will actually use them.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Ask */}
      <section className="section section-quiet">
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.p 
            className="section-label"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHAT WE ASK
          </motion.p>
          
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We don't ask for much.
          </motion.h2>

          <motion.div 
            className="space-y-6 text-lg text-muted max-w-content"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              We ask for your time.
            </p>
            <p>
              We ask for your perspective.
            </p>
            <p>
              We ask for your honesty.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-serif text-ink">
              And we ask that you're willing to help us build something that actually helps you.
            </h3>
          </motion.div>
        </motion.div>
      </section>

      {/* Application Section */}
      <section id="apply" className="section section-paper">
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.p 
            className="section-label"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            APPLY FOR BATANA
          </motion.p>
          
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tell us about yourself and what you're building.
          </motion.h2>

          <motion.div 
            className="space-y-4 text-lg text-muted max-w-content"
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              We'll review your application and get back to you as soon as we can.
            </p>
            <p>
              If it looks like a good fit, we'll set up a conversation to learn more about what you're building and how we might be able to help.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: tokens.spacing['12'] }}
          >
            {error && (
              <motion.p 
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ color: tokens.color.error, marginBottom: tokens.spacing['4'] }}
              >
                {error}
              </motion.p>
            )}
            {submitted ? (
              <motion.div
                className="p-8 bg-paper border border-line"
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Check className="w-8 h-8 text-green mb-4" />
                <h3 className="text-2xl font-serif text-ink mb-4">
                  Application submitted
                </h3>
                <p className="text-lg text-muted">
                  We'll review your application and get back to you as soon as we can.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="form-label">NAME</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="form-label">EMAIL</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="form-label">OBJECTIVE</label>
                  <textarea 
                    name="objective" 
                    className="form-textarea" 
                    placeholder="What are you trying to achieve?"
                    required
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="form-label">VISION</label>
                  <textarea 
                    name="vision" 
                    className="form-textarea" 
                    placeholder="What does success look like?"
                    required
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="form-label">HOW DID YOU HEAR ABOUT US?</label>
                  <input 
                    type="text" 
                    name="referral" 
                    className="form-input" 
                    placeholder="How did you hear about AKSOS?"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label className="form-label">
                    WHAT ARE YOU LOOKING FOR? <span className="text-muted">(Select all that apply)</span>
                  </label>
                  <div className="space-y-2 mt-2">
                    {needs.map((need) => (
                      <motion.button
                        key={need}
                        type="button"
                        onClick={() => toggle(need)}
                        className={`w-full flex items-center justify-between gap-4 p-4 border ${selectedNeeds.includes(need) ? 'border-signal bg-signal bg-opacity-5' : 'border-line'}`}
                        initial={{ opacity: 1, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className={selectedNeeds.includes(need) ? 'text-signal' : 'text-muted'}>{need}</span>
                        {selectedNeeds.includes(need) && <Check className="w-5 h-5 text-signal" />}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-6 mt-8"
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={sending}
                  >
                    {sending ? 'Sending...' : 'Apply for Batana'}
                  </button>
                  <a href="/#what-we-build" className="btn">
                    See what we're building
                  </a>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

export default BatanaNewSite;

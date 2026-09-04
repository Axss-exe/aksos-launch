'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from './navigation/SiteHeader';
import { Section } from './layout/Section';
import { HeroNetworkDiagram } from './diagrams/HeroNetwork';

export function AksosNewSite() {
  return (
    <div id="top" className="relative">
      <SiteHeader />
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-grid">
          <motion.div 
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="section-label">
              <span />AKSOS
            </p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              style={{ marginBottom: '32px' }}
            >
              You already know your field.<br />
              <em>We help you become harder to beat in it.</em>
            </motion.h1>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <p className="text-lg text-muted max-w-content">
                You have the relationships.<br />
                You know the market.<br />
                You understand the work.
              </p>
              
              <p className="text-lg text-muted max-w-content">
                But information is scattered.<br />
                Opportunities are easy to miss.<br />
                The systems behind good work often aren't strong enough to carry it further.
              </p>

              <p className="text-lg text-muted max-w-content mt-6">
                You shouldn't have to build all of that alone.<br />
                <strong>We're here to help.</strong>
              </p>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 mt-10 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <a href="#what-we-build" className="btn btn-primary">
                See what we're building
              </a>
              <a href="/batana" className="btn">
                Start with Batana <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <HeroNetworkDiagram />
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <Section label="THE PROBLEM" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Good operators can still be held back by weak systems.
        </motion.h2>

        <motion.div 
          className="space-y-6 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            You can know your market and still miss a signal.
          </p>
          <p>
            You can have strong relationships and still lack the information to act on them.
          </p>
          <p>
            You can see an opportunity and still struggle to move quickly enough.
          </p>
          <p>
            You can be excellent at the work and still spend too much time finding, checking and connecting information.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif text-ink mb-2">
            The operator isn't always the problem.
          </h3>
          <h3 className="text-2xl font-serif text-ink">
            Sometimes the system around them is.
          </h3>
        </motion.div>
      </Section>

      {/* ALLY SECTION */}
      <Section label="THE ALLY" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          You don't need another company telling you what to do.
        </motion.h2>

        <motion.div 
          className="space-y-6 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            You need someone who can help you do it better.
          </p>
          <p>
            Someone who can help strengthen the systems behind your work.
          </p>
          <p>
            Someone who can help you see what you can't see.
          </p>
          <p>
            Someone who can build alongside you when the problem is bigger than one person.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif text-ink mb-4">
            That's the relationship we're trying to build.
          </h3>
          <p className="text-lg text-muted max-w-content">
            Not a vendor.<br />
            Not another dashboard.<br />
            A partner you can lean on when the work matters.
          </p>
        </motion.div>
      </Section>

      {/* WHAT WE BUILD SECTION */}
      <Section id="what-we-build" label="WHAT WE BUILD" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          So we build the things that should already exist.
        </motion.h2>

        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 0.4 }}
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

        <motion.div 
          className="mt-16 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-sm font-mono text-muted">PERSON / ORGANIZATION</span>
            <span className="text-2xl text-line">\u2192</span>
            <span className="text-sm font-mono text-muted">BATANA</span>
            <span className="text-2xl text-line">\u2193</span>
            <span className="text-sm font-mono text-muted">UNDERSTANDING</span>
            <span className="text-2xl text-line">\u2193</span>
            <span className="text-sm font-mono text-muted">ATIS + RITA</span>
            <span className="text-2xl text-line">\u2193</span>
            <span className="text-sm font-mono text-muted">STRONGER SYSTEM</span>
            <span className="text-2xl text-line">\u2193</span>
            <span className="text-sm font-mono text-muted">STRONGER OPERATOR</span>
          </div>
        </motion.div>
      </Section>

      <Section id="atis" label="ATIS" tone="paper">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <img src="/atis-symbol-traced.svg" alt="ATIS" className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-serif text-ink">ATIS</h2>
            <h3 className="text-xl font-serif text-muted">The system for seeing what connects.</h3>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-4 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>A company announces an expansion.</p>
          <p>A government changes a policy.</p>
          <p>Capital moves.</p>
          <p>A project begins.</p>
          <p>A new relationship forms.</p>
        </motion.div>

        <motion.p 
          className="text-xl font-serif text-ink mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ATIS connects the signals.
        </motion.p>

        <motion.div 
          className="mt-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted">01</span>
            <strong className="text-ink">What happened.</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted">02</span>
            <strong className="text-ink">Who is involved.</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted">03</span>
            <strong className="text-ink">What changed.</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted">04</span>
            <strong className="text-ink">What connects to it.</strong>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted">05</span>
            <strong className="text-ink">What it could mean for you.</strong>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-serif text-ink mb-4">
            We're still building it.
          </h3>
          <p className="text-lg text-muted max-w-content mb-8">
            That's deliberate.<br />
            We would rather make it genuinely useful before putting it in everyone's hands.
          </p>
          <p className="text-lg text-muted max-w-content mb-8">
            Limited ATIS access is currently available through Batana.
          </p>
          <a href="/batana" className="btn btn-primary">
            Join Batana
          </a>
        </motion.div>
      </Section>

      <Section id="rita" label="RITA" tone="quiet">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <img src="/rita-symbol-traced.svg" alt="RITA" className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-serif text-ink">RITA</h2>
            <h3 className="text-xl font-serif text-muted">Because the signal is rarely the whole story.</h3>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-4 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>One announcement can lead to a company.</p>
          <p>That company can lead to a person.</p>
          <p>That person can lead to an institution.</p>
          <p>That institution can lead to a decision.</p>
          <p>That decision can change a market.</p>
        </motion.div>

        <motion.p 
          className="text-xl font-serif text-ink mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          RITA helps follow the relationship.
        </motion.p>

        <motion.div 
          className="mt-12 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-center text-muted mb-4">
            Instead of stopping at:
          </p>
          <p className="text-center text-2xl font-serif text-ink mb-6">
            &quot;Something happened.&quot;
          </p>
          <p className="text-center text-muted mb-4">
            Show:
          </p>
          <p className="text-center text-2xl font-serif text-ink">
            &quot;What does this connect to?&quot;
          </p>
        </motion.div>

        <motion.p 
          className="text-xl font-serif text-ink mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The design should make RITA feel like the intelligence layer that turns relationships into understanding.
        </motion.p>
      </Section>

      <Section label="PERSPECTIVE" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          The same event means different things to different people.
        </motion.h2>

        <motion.div 
          className="mt-16 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-serif text-ink mb-8">
              NEW MINING PROJECT
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-mono text-muted">INVESTOR</span>
                <span className="text-2xl text-line">\u2192</span>
                <span className="text-muted">capital opportunity</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-mono text-muted">SUPPLIER</span>
                <span className="text-2xl text-line">\u2192</span>
                <span className="text-muted">new demand</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-mono text-muted">COMPETITOR</span>
                <span className="text-2xl text-line">\u2192</span>
                <span className="text-muted">market pressure</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-mono text-muted">GOVERNMENT</span>
                <span className="text-2xl text-line">\u2192</span>
                <span className="text-muted">revenue / infrastructure / regulation</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-mono text-muted">ANOTHER COUNTRY</span>
                <span className="text-2xl text-line">\u2192</span>
                <span className="text-muted">strategic development</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif text-ink">
            The event doesn't change.
          </h3>
          <h3 className="text-2xl font-serif text-ink">
            The perspective does.
          </h3>
        </motion.div>
      </Section>

      <Section label="STANDARD" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          We don't want to give you something that's merely impressive.
        </motion.h2>

        <motion.div 
          className="space-y-6 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>We want to give you something you can lean on.</p>
          <p>Something that holds up when the work gets difficult.</p>
          <p>Something your team can actually use.</p>
          <p>Something that makes the way you operate stronger.</p>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif text-ink">
            Because respect is earned in the work.
          </h3>
          <p className="text-lg text-muted mt-4">
            Not in a pitch deck.<br />
            Not in a demo.<br />
            Not in a promise.
          </p>
        </motion.div>
      </Section>

      <Section label="ACCESS" tone="paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          We're building it with the people who will actually use it.
        </motion.h2>

        <motion.div 
          className="space-y-6 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            ATIS is not finished because we don't want to release an unfinished system and call it a product.
          </p>
          <p>
            We want to test it.
          </p>
          <p>
            Learn from real operators.
          </p>
          <p>
            Find what breaks.
          </p>
          <p>
            Improve it.
          </p>
          <p>
            Then give it to more people.
          </p>
        </motion.div>

        <motion.p 
          className="text-lg text-muted max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          This is a product philosophy, not a scarcity tactic.
        </motion.p>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="/batana" className="btn btn-primary">
            Join Batana
          </a>
        </motion.div>
      </Section>

      <Section label="BATANA" tone="dark">
        <motion.h2 
          className="section-heading text-paper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Start with a conversation.
        </motion.h2>

        <motion.h3 
          className="text-xl font-serif text-paper mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Batana
        </motion.h3>

        <motion.div 
          className="space-y-6 text-lg text-muted-soft max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Tell us about the work.</p>
          <p>Tell us what you're building.</p>
          <p>Tell us where you need stronger support.</p>
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-paper">
            We'll listen first.
          </p>
          <p className="text-lg text-muted-soft">
            Then we'll see where we can help.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 space-y-6 text-lg text-muted-soft max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>
            We're already speaking with people outside Africa who want to build relationships, invest, trade and do business across the continent.
          </p>
          <p>
            Some have already asked us to help them find the right people and opportunities.
          </p>
          <p>
            The more African operators we know, the better we can make those connections.
          </p>
          <p>
            The stronger the network becomes, the more useful it becomes to everyone inside it.
          </p>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/batana" className="btn btn-primary">
            Enter Batana
          </a>
        </motion.div>

        <motion.p 
          className="text-sm text-muted-soft mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          The form route uses the existing form route. No backend changes.
        </motion.p>
      </Section>

      <Section label="NETWORK" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          One operator becomes a connection.
        </motion.h2>

        <motion.div 
          className="space-y-6 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>Every useful relationship makes the next one easier to find.</p>
          <p>Every new connection strengthens the network.</p>
        </motion.div>

        <motion.div 
          className="mt-16 p-8 bg-paper border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <span className="bg-signal text-paper px-4 py-2 text-sm font-mono">YOU</span>
              <span className="text-2xl text-line">\u2194</span>
              <span className="border border-line px-4 py-2 text-sm font-mono text-muted">AFRICAN OPERATORS</span>
            </div>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <span className="border border-line px-4 py-2 text-sm font-mono text-muted">AKSOS</span>
              <span className="text-2xl text-line">\u2194</span>
              <span className="border border-line px-4 py-2 text-sm font-mono text-muted">INTERNATIONAL PARTNERS</span>
            </div>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <span className="border border-line px-4 py-2 text-sm font-mono text-muted">CAPITAL</span>
              <span className="text-2xl text-line">\u2194</span>
              <span className="border border-line px-4 py-2 text-sm font-mono text-muted">TRADE</span>
            </div>
            <div className="border border-line px-4 py-2 text-sm font-mono text-muted inline-block">
              OPPORTUNITIES
            </div>
          </div>
        </motion.div>

        <motion.p 
          className="text-sm text-muted mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Network visualization showing structural benefit of growing connections.
        </motion.p>
      </Section>

      <Section label="VISION" tone="quiet">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          We want to see African operators become impossible to overlook.
        </motion.h2>

        <motion.div 
          className="space-y-4 text-lg text-muted max-w-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>Not because someone gave them a platform.</p>
          <p>Because their work is strong.</p>
          <p>Their systems are strong.</p>
          <p>Their relationships are strong.</p>
          <p>Their intelligence is strong.</p>
          <p>Their ability to act is strong.</p>
        </motion.div>

        <motion.h3 
          className="text-2xl font-serif text-ink mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We want to help build that strength.
        </motion.h3>

        <motion.p 
          className="text-xl text-muted mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          One operator.<br />
          One system.<br />
          One relationship at a time.
        </motion.p>
      </Section>

      <section className="section section-paper">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          If you're building something worth strengthening,
        </motion.h2>
        
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          we'd like to understand it.
        </motion.h2>

        <motion.div 
          className="space-y-4 text-lg text-muted max-w-content mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>You don't need to buy anything.</p>
          <p>You don't need to prove anything.</p>
          <p>Start by telling us what you're working on.</p>
        </motion.div>

        <motion.p 
          className="text-xl font-serif text-ink mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We'll take it from there.
        </motion.p>

        <motion.div 
          className="flex items-center gap-6 mt-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="/batana" className="btn btn-primary">
            Enter Batana
          </a>
          <a href="#what-we-build" className="btn">
            Explore what we're building
          </a>
        </motion.div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/aksos-symbol-traced.svg" alt="AKSOS" className="w-8 h-8 mx-auto mb-4" />
          AKSOS
        </div>
        <p className="footer-tagline">
          The information is already there. We're building the systems and relationships needed to understand how it connects.
        </p>
        <p className="footer-meta">
          Harare \u00b7 Zimbabwe / 2026
        </p>
      </footer>
    </div>
  );
}

export default AksosNewSite;

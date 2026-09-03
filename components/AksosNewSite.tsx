'use client';

import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroNetwork } from './diagrams/HeroNetwork';
import { InformationDepthDiagram } from './diagrams/InformationDepthDiagram';
import { ConvergenceDiagram } from './diagrams/ConvergenceDiagram';
import { IntelligenceCycle } from './diagrams/IntelligenceCycle';
import { GrowingNetwork } from './diagrams/GrowingNetwork';
import { Section, SectionLabel, AnimatedSection } from './layout/Section';
import { tokens } from '@/lib/design-tokens';

const capabilities = [
  ['01', 'NATURAL-LANGUAGE QUERYING', 'Ask questions in plain language and begin with the objective, not a search term.'],
  ['02', 'EVIDENCE RETRIEVAL', 'Gather source material, dates and entities into a traceable evidence base.'],
  ['03', 'RELATIONSHIP IDENTIFICATION', 'Surface connections between people, institutions, policies, markets and events.'],
  ['04', 'ANALYTICAL REPORTING', 'Turn validated relationships into a clearer picture for action.'],
];

const audience = ['BUILDERS', 'RESEARCHERS', 'INFORMATION HOLDERS', 'INDUSTRY EXPERTS', 'EARLY USERS', 'PARTNERS', 'CURIOUS PEOPLE'];

const journey = [['TODAY', 'FOUNDATION'], ['NEXT', 'RELATIONSHIPS'], ['THEN', 'INTELLIGENCE'], ['BEYOND', 'AFRICA']];

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

function Hero() {
  return (
    <section className="sys-hero">
      <div className="sys-grid">
        <div className="hero-copy">
          <Label>AKSOS / INTELLIGENCE INFRASTRUCTURE</Label>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: tokens.animation.duration.slow, ease: tokens.animation.easing.easeOut }}
          >
            Building intelligence infrastructure <em>for Africa.</em>
          </motion.h1>
          <p>Africa already produces enormous amounts of information. The harder problem is understanding how it connects.</p>
          <div className="link-row">
            <PrimaryLink href="#connect">Start a conversation</PrimaryLink>
            <a href="https://atis.aksos.net">Explore ATIS <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2, ease: tokens.animation.easing.easeOut }}
        >
          <HeroNetwork />
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <Section id="why" label="01 / THE PROBLEM">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        The information is there.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Governments publish policies. Organizations launch programs. Companies enter markets. The information exists, but it rarely arrives as one coherent picture.
      </motion.p>
    </Section>
  );
}

function WhatWeLearnedSection() {
  return (
    <Section label="02 / WHAT WE LEARNED" tone="quiet">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        The internet is not the whole picture.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Better intelligence does not begin with a better answer. It begins with better evidence.
      </motion.p>
      <InformationDepthDiagram />
    </Section>
  );
}

function ApproachSection() {
  return (
    <Section id="approach" label="03 / THE AKSOS APPROACH">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        Technology is only part of the infrastructure.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Meaningful intelligence requires both the system and the network around it.
      </motion.p>
      <ConvergenceDiagram />
    </Section>
  );
}

function AtisSection() {
  return (
    <Section id="atis" label="04 / THE SYSTEM" tone="dark">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        ATIS
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        An intelligence platform we're building to connect evidence, relationships and emerging information.
      </motion.p>
      <motion.div 
        className="atis-reveal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <div>
          <span>QUESTION</span>
          <strong>What connects this policy to current opportunity?</strong>
        </div>
        <div>
          <span>EVIDENCE → RELATIONSHIPS → CONTEXT</span>
          <strong>Analysis assembled from traceable source material.</strong>
        </div>
        <div>
          <span>REPORT</span>
          <strong>A clearer picture for action.</strong>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
        style={{ marginTop: '40px' }}
      >
        <PrimaryLink href="https://atis.aksos.net">Explore the ATIS demo</PrimaryLink>
      </motion.div>
    </Section>
  );
}

function BatanaSection() {
  return (
    <Section label="04A / THE NETWORK" tone="dark">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        Information doesn't always live in databases. Sometimes, it lives in people.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Batana helps find relevant people and organizations when conventional search cannot.
      </motion.p>
      <IntelligenceCycle />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
        style={{ marginTop: '40px' }}
      >
        <PrimaryLink href="/batana">Explore Batana</PrimaryLink>
      </motion.div>
    </Section>
  );
}

function PipelineSection() {
  return (
    <Section label="05 / HOW INFORMATION BECOMES INTELLIGENCE">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        Better signals. Clearer understanding.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Each stage adds structure, context and traceability.
      </motion.p>
      <motion.div 
        className="pipeline-diagram"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <div className="pipeline-flow">
          {['SIGNALS', 'SOURCE', 'EVIDENCE', 'CONTEXT', 'RELATIONSHIPS', 'RITA', 'STORY', 'ACTION'].map((stage, index) => (
            <motion.div 
              key={stage}
              className="pipeline-stage"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: 0.3 + (index * 0.05) }}
            >
              <span>{stage}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function CapabilitiesSection() {
  return (
    <Section label="06 / CURRENT CAPABILITIES" tone="quiet">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        What exists today.
      </motion.h2>
      <motion.div 
        className="capability-index"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        {capabilities.map(([n, title, copy]) => (
          <motion.div 
            key={n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.2 + (parseInt(n) * 0.05) }}
          >
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function RitaSection() {
  return (
    <Section id="rita" label="06A / RITA IN ACTION" tone="dark">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        From fragmented evidence to <em>actionable intelligence.</em>
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        RITA reveals which relationships around an event are meaningful enough to change what it means.
      </motion.p>
      <motion.div 
        className="investigation"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <div>
          <span>SOURCE</span>
          <b>EVENT</b>
          <b>ENTITY</b>
          <b>RELATIONSHIP</b>
          <b>CONTEXT</b>
          <strong>STORY → INTELLIGENCE</strong>
        </div>
      </motion.div>
    </Section>
  );
}

function ProvenanceSection() {
  return (
    <Section label="08 / PROVENANCE & TRUST">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        If we can't trace it, we don't know enough.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Intelligence is only useful when its origin can be understood. AKSOS is designed to preserve the chain: SOURCE → EVIDENCE → RELATIONSHIP → STORY. The purpose is not simply citation. It is being able to understand where information came from, what evidence supports it, how entities are connected, and how the conclusion was formed.
      </motion.p>
    </Section>
  );
}

function StatusSection() {
  return (
    <Section label="09 / HONEST STATUS" tone="quiet">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We're still building.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        AKSOS is not presenting itself as a finished intelligence platform. ATIS is being actively developed. RITA is evolving. The network of people and institutions is still being built. The intelligence model improves as more evidence, relationships and first-source information enter the system. This should not sound apologetic. It should communicate that the infrastructure itself is being built alongside the technology.
      </motion.p>
      <motion.div 
        className="status-list"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        {[['ATIS','EXPERIMENTAL'],['RITA','DEVELOPING'],['NETWORK','BUILDING'],['INTELLIGENCE MODEL','EVOLVING']].map(([a,b], index) => (
          <motion.div 
            key={a}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.3 + (index * 0.05) }}
          >
            <span>{a}</span>
            <strong>{b}</strong>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function NetworkSection() {
  return (
    <Section label="10 / THE NETWORK">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We're building the network, too.
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        The long-term value of AKSOS comes not only from software, but from the growing network of people, institutions, researchers, businesses and information holders contributing context.
      </motion.p>
      <GrowingNetwork />
    </Section>
  );
}

function InvitationSection() {
  return (
    <Section label="11 / WHO SHOULD BE PART OF THIS?" tone="quiet">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        People close to the information.
      </motion.h2>
      <motion.div 
        className="audience-index"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        {audience.map((item, i) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.2 + (i * 0.03) }}
          >
            <span>0{i + 1}</span>
            <strong>{item}</strong>
            <p>Contribute perspective, access, evidence or relationships.</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function JourneySection() {
  return (
    <Section id="journey" label="12 / THE JOURNEY">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        Zimbabwe <em>→</em> Africa
      </motion.h2>
      <motion.p 
        className="section-lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        Zimbabwe is the starting point for building and validating the infrastructure, but the underlying model is designed to expand across African markets. Today, we establish the infrastructure, relationships and operating model in Zimbabwe. Next, we expand the network and connect more first-source information. Then, we turn the growing evidence and relationship network into increasingly useful intelligence. Beyond, we expand the model across countries and interconnected markets. Zimbabwe is the starting point, not the limit of the ambition.
      </motion.p>
      <motion.div 
        className="journey-line"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        {journey.map(([when, what], index) => (
          <motion.div 
            key={when}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.3 + (index * 0.05) }}
          >
            <span>{when}</span>
            <strong>{what}</strong>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function FinalSection() {
  return (
    <section id="connect" className="final-statement">
      <Label>13 / THE NEXT STAGE</Label>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow }}
      >
        We're not finished.<br />
        <em>That's the point.</em>
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
      >
        We are building the systems and relationships needed to understand how information connects.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
      >
        <PrimaryLink href="mailto:hello@aksos.net">Start a conversation</PrimaryLink>
      </motion.div>
    </section>
  );
}

export function AksosNewSite() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark">
          <img src="/aksos-symbol-traced.svg" alt="AKSOS" />
          AKSOS
        </a>
        <nav className={open ? 'nav-open' : ''}>
          <a href="#approach">Approach</a>
          <a href="#atis">ATIS</a>
          <a href="/batana">Batana</a>
          <a href="#rita">RITA</a>
          <a href="#journey">Journey</a>
          <a href="#connect">Start a conversation →</a>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      
      <div id="top">
        <Hero />
      </div>
      
      <ProblemSection />
      <WhatWeLearnedSection />
      <ApproachSection />
      <AtisSection />
      <BatanaSection />
      <PipelineSection />
      <CapabilitiesSection />
      <RitaSection />
      <ProvenanceSection />
      <StatusSection />
      <NetworkSection />
      <InvitationSection />
      <JourneySection />
      <FinalSection />
      
      <footer>
        <span>AKSOS</span>
        <p>The information is already there. We're building the systems and relationships needed to understand how it connects.</p>
        <small className="footer-meta">Harare · Zimbabwe / 2026</small>
      </footer>
    </main>
  );
}

export default AksosNewSite;

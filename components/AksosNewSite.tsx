'use client'

import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { SiteHeader } from './navigation/SiteHeader'
import { Section } from './layout/Section'
import { HeroNetworkDiagram } from './diagrams/HeroNetwork'

const stages = [
  { key: 'SEE', text: 'Signals are everywhere. The work is deciding which ones matter.' },
  { key: 'CONNECT', text: 'The important information is relational: people, policy, capital, projects and markets.' },
  { key: 'UNDERSTAND', text: 'Context turns an event into intelligence you can use.' },
  { key: 'ACT', text: 'Better intelligence gives capable operators room to move.' },
  { key: 'BUILD', text: 'Every useful relationship makes the next one easier to find.' },
] as const

const systems = [
  { id: 'atis', name: 'ATIS', role: 'INTELLIGENCE LAYER', copy: 'What is happening? What matters? What does it mean from your perspective?', icon: '/atis-symbol-traced.svg' },
  { id: 'rita', name: 'RITA', role: 'RELATIONSHIP LAYER', copy: 'How are the entities, events and signals connected?', icon: '/rita-symbol-traced.svg' },
  { id: 'batana', name: 'BATANA', role: 'HUMAN / ACTION LAYER', copy: 'What can you do with this intelligence? Start with a conversation.', icon: null },
]

function SignalRail() {
  const [active, setActive] = useState(0)
  return (
    <div className="signal-rail" aria-label="AKSOS visitor journey">
      <div className="signal-rail-line" aria-hidden="true"><span style={{ width: `${active * 25}%` }} /></div>
      <div className="signal-rail-items">
        {stages.map((stage, index) => (
          <button key={stage.key} className={active === index ? 'signal-step is-active' : 'signal-step'} onClick={() => setActive(index)} aria-pressed={active === index}>
            <span className="signal-step-dot" />
            <span className="signal-step-label">{stage.key}</span>
          </button>
        ))}
      </div>
      <p className="signal-rail-copy">{stages[active].text}</p>
    </div>
  )
}

function SystemArchitecture() {
  const [selected, setSelected] = useState('atis')
  return (
    <div className="architecture-scene">
      <div className="architecture-operator"><span className="node-dot node-dot-signal" />YOU</div>
      <div className="architecture-lines" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="architecture-systems" role="tablist" aria-label="AKSOS systems">
        {systems.map((system) => (
          <button key={system.id} className={selected === system.id ? 'architecture-node is-selected' : 'architecture-node'} onClick={() => setSelected(system.id)} role="tab" aria-selected={selected === system.id}>
            {system.icon ? <img src={system.icon} alt="" /> : <span className="batana-mark">B</span>}
            <span><b>{system.name}</b><small>{system.role}</small></span>
          </button>
        ))}
      </div>
      <div className="architecture-result"><span className="node-dot" />OPPORTUNITY <span className="architecture-arrow">→</span> ACTION</div>
      <p className="architecture-caption">{systems.find((system) => system.id === selected)?.copy}</p>
    </div>
  )
}

function FlowScene() {
  const steps = ['SOURCE', 'EVENT', 'ENTITY', 'RELATIONSHIP', 'CONTEXT', 'STORY']
  return <div className="flow-scene" aria-label="RITA investigation flow">{steps.map((step, index) => <div className="flow-step" key={step}><span className="flow-index">0{index + 1}</span><strong>{step}</strong>{index < steps.length - 1 && <ChevronDown aria-hidden="true" />}</div>)}</div>
}

export function AksosNewSite() {
  return <div id="top" className="aksos-page">
    <SiteHeader />
    <main>
      <section className="hero hero-intelligence">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-label">AKSOS / INTELLIGENCE INFRASTRUCTURE</p>
            <h1>You already know your field.<br /><em>We help you become harder to beat in it.</em></h1>
            <p className="hero-lede">The information is already there. We are building the systems and relationships needed to understand how it connects.</p>
            <div className="hero-actions"><a href="#what-we-build" className="btn btn-primary">See what we&apos;re building <ArrowUpRight aria-hidden="true" /></a><a href="/batana" className="text-link">Start with Batana <ArrowUpRight aria-hidden="true" /></a></div>
            <SignalRail />
          </div>
          <div className="hero-visual"><HeroNetworkDiagram /></div>
        </div>
      </section>

      <section className="statement-band"><p className="section-label">ACT I / RECOGNITION</p><h2>Good operators can still be held back by weak systems.</h2><p>You can know your market and still miss a signal. You can have strong relationships and still lack the information to act on them.</p><span className="statement-aside">THE OPERATOR ISN&apos;T ALWAYS THE PROBLEM.<br /><em>SOMETIMES THE SYSTEM AROUND THEM IS.</em></span></section>

      <Section label="ACT II / REFRAMING" tone="paper">
        <div className="split-statement"><h2 className="section-heading">Information becomes useful when it becomes relational.</h2><div><p className="section-lede">A company announces an expansion. A government changes a policy. Capital moves. A project begins. A new relationship forms.</p><p className="serif-callout">The signal is only the beginning.</p></div></div>
        <div className="relationship-field" aria-label="Relationships between people, institutions, capital, projects and markets"><span className="field-center">A NEW<br />EVENT</span><span className="field-node field-node-a">PEOPLE</span><span className="field-node field-node-b">POLICY</span><span className="field-node field-node-c">CAPITAL</span><span className="field-node field-node-d">PROJECTS</span><span className="field-node field-node-e">MARKETS</span></div>
      </Section>

      <section className="ally-section"><div className="ally-copy"><p className="section-label">ACT III / THE ALLY</p><h2>You don&apos;t need another company telling you what to do.</h2><p> You need someone who can help you do it better. Someone who can strengthen the systems behind your work and help you see what you can&apos;t see.</p><p className="serif-callout">Not a vendor. Not another dashboard. A partner you can lean on when the work matters.</p></div><div className="ally-visual"><div className="ally-ring ally-ring-outer" /><div className="ally-ring ally-ring-inner" /><span className="ally-you">YOU</span><span className="ally-aksos">AKSOS</span><span className="ally-label ally-label-one">YOUR WORK</span><span className="ally-label ally-label-two">STRONGER SYSTEM</span></div></section>

      <Section id="what-we-build" label="ACT IV / THE SYSTEM" tone="quiet"><div className="system-intro"><h2 className="section-heading">The visitor is the hero.<br /><em>AKSOS is the connective tissue.</em></h2><p className="section-lede">We build the things that should already exist around capable operators across Africa.</p></div><SystemArchitecture /></Section>

      <Section id="atis" label="ATIS / SEE → UNDERSTAND" tone="paper"><div className="product-heading"><img src="/atis-symbol-traced.svg" alt="" /><div><h2>ATIS</h2><p>The intelligence layer.</p></div></div><div className="product-grid"><div><p className="section-lede">It helps answer: what happened, who is involved, what changed, what connects to it, and what it could mean for you.</p><p>We are still building it. That&apos;s deliberate. We would rather make it genuinely useful before putting it in everyone&apos;s hands.</p><a href="/batana" className="btn btn-primary">Join Batana <ArrowUpRight aria-hidden="true" /></a></div><div className="atis-scene"><span className="atis-source">SIGNALS</span><span className="atis-path path-one" /><span className="atis-path path-two" /><span className="atis-path path-three" /><span className="atis-core">CONTEXT<br /><small>FOR YOU</small></span><span className="atis-outcome">MEANING</span></div></div></Section>

      <Section id="rita" label="RITA / CONNECT → UNDERSTAND" tone="quiet"><div className="product-heading"><img src="/rita-symbol-traced.svg" alt="" /><div><h2>RITA</h2><p>The relationship and investigation layer.</p></div></div><div className="rita-layout"><div><h3 className="section-heading">Because the signal is rarely the whole story.</h3><p className="section-lede">One announcement can lead to a company. That company can lead to a person. That person can lead to an institution. That institution can lead to a decision.</p><p className="serif-callout">RITA helps follow the relationship.</p></div><FlowScene /></div></Section>

      <section className="action-section"><p className="section-label">ACT V / COMPOUNDING</p><div className="action-grid"><div><h2>Every useful relationship makes the next one easier to find.</h2><p>The stronger the network becomes, the more useful it becomes to everyone inside it.</p></div><div className="network-growth"><span className="growth-user">YOU</span>{['PEOPLE','CAPITAL','TRADE','POLICY','MARKETS','PROJECTS'].map((node, index) => <span className={`growth-node growth-${index}`} key={node}>{node}</span>)}</div></div></section>

      <section className="closing-section"><p className="section-label">ACT VI / ACTION</p><h2>If you&apos;re building something worth strengthening,<br /><em>we&apos;d like to understand it.</em></h2><p>You don&apos;t need to buy anything. You don&apos;t need to prove anything. Start by telling us what you&apos;re working on.</p><div className="hero-actions"><a href="/batana" className="btn btn-primary">Enter Batana <ArrowUpRight aria-hidden="true" /></a><a href="#what-we-build" className="text-link">Explore the system <ArrowUpRight aria-hidden="true" /></a></div></section>
    </main>
    <footer className="site-footer"><div className="footer-brand"><img src="/aksos-symbol-traced.svg" alt="AKSOS" /> AKSOS</div><p className="footer-tagline">The information is already there. We&apos;re building the systems and relationships needed to understand how it connects.</p><p className="footer-meta">Harare · Zimbabwe / 2026</p></footer>
  </div>
}

export default AksosNewSite

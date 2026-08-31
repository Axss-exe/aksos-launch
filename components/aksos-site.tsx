'use client'

import { ArrowDown, ArrowUpRight, ChevronRight, CircleDot, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'

const audience = [
  ['Builders', 'Engineers, AI specialists, data engineers, product thinkers and designers.'],
  ['Researchers', 'Economists, lawyers, policy researchers, academics and analysts.'],
  ['Information holders', 'Organizations and institutions close to primary information.'],
  ['Industry experts', 'People who understand what is actually happening on the ground.'],
  ['Early users', 'People willing to test ATIS against real questions and challenge the results.'],
  ['Partners', 'People who can contribute expertise, access, data, infrastructure or relationships.'],
  ['Curious people', 'People who see the problem and want to help explore it.'],
]

const journey = [
  ['TODAY', 'Building the foundation', 'Verified knowledge, evidence systems and the first ATIS capabilities.'],
  ['NEXT', 'Strengthening relationships', 'Building pathways toward more current, first-source and validated information.'],
  ['THEN', 'Strengthening intelligence', 'Improving relationship discovery, story detection, reasoning, validation and reporting.'],
  ['BEYOND', 'Expanding the system', 'Moving from the initial Zimbabwe operating context toward broader African intelligence infrastructure.'],
]

function Mark({ small = false, atis = false }: { small?: boolean; atis?: boolean }) {
  return (
    <img
      className={small ? 'brand-mark brand-mark-small' : atis ? 'atis-mark' : 'brand-mark'}
      src={atis ? '/atis-symbol-traced.svg' : '/aksos-symbol-traced.svg'}
      alt={small ? '' : atis ? 'ATIS symbol' : 'AKSOS symbol'}
      aria-hidden={small ? true : undefined}
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span className="label-rule" />{children}</p>
}

function GraphVisual() {
  return (
    <div className="graph-visual" aria-label="A visual showing separate information becoming connected understanding" role="img">
      <div className="graph-lines"><span /><span /><span /><span /><span /></div>
      <div className="graph-node node-policy"><b>POLICY</b><small>published</small></div>
      <div className="graph-node node-program"><b>PROGRAM</b><small>launched</small></div>
      <div className="graph-node node-ministry"><b>MINISTRY</b><small>responsible for</small></div>
      <div className="graph-node node-company"><b>COMPANY</b><small>affected</small></div>
      <div className="graph-node node-story"><span className="node-dot" /><b>ONE STORY</b><small>emerging</small></div>
      <div className="graph-caption">Mention <ChevronRight /> Relationship <ChevronRight /> Meaning</div>
    </div>
  )
}

function DemoPanel() {
  return (
    <div className="demo-panel" aria-label="Conceptual ATIS interface demonstration">
      <div className="demo-top"><span>ATIS / EXPLORER</span><span className="demo-status"><CircleDot /> early system</span></div>
      <div className="demo-body">
        <div className="demo-sidebar"><span className="active">Overview</span><span>Evidence</span><span>Relationships</span><span>Reports</span></div>
        <div className="demo-main">
          <div className="demo-query"><span className="query-dot" />What connects this policy to current opportunity?</div>
          <div className="demo-result-heading"><span>ANALYSIS / 01</span><b>Emerging relationship map</b></div>
          <div className="mini-map"><span className="mini-line a" /><span className="mini-line b" /><span className="mini-line c" /><i className="mini-node n1">P</i><i className="mini-node n2">M</i><i className="mini-node n3">O</i><i className="mini-node n4">I</i></div>
          <div className="demo-evidence"><span>Current pilot</span><b>Zimbabwe focus</b><span>Analysis mode</span><b>RAG + RITA</b><span>System status</span><b className="signal">Experimental</b></div>
        </div>
      </div>
      <p className="demo-note">Conceptual interface — representative of the kind of system we are building.</p>
    </div>
  )
}

export function AksosSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark"><Mark small /><span>AKSOS</span></a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a href="#why" onClick={() => setMenuOpen(false)}>Why we&apos;re building</a><a href="#atis" onClick={() => setMenuOpen(false)}>ATIS</a><a href="#rita" onClick={() => setMenuOpen(false)}>RITA</a><a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#journey" onClick={() => setMenuOpen(false)}>The journey</a>
          <a className="nav-cta" href="#connect" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">AKSOS / INTELLIGENCE INFRASTRUCTURE</p><h1>Building intelligence infrastructure <em>for Africa.</em></h1><p className="hero-lede">Africa already produces enormous amounts of information. The harder problem is understanding how it connects.</p><p className="hero-lede muted">AKSOS is building the technology, intelligence systems, and relationships needed to turn fragmented evidence into clearer understanding.</p><div className="hero-actions"><a className="button button-solid" href="#connect">Start a conversation <ArrowUpRight /></a><a className="button button-quiet" href="#atis">Explore ATIS <ArrowDown /></a></div></div>
        <div className="hero-aside"><div className="hero-mark-wrap"><Mark /><span className="hero-mark-label">AKSOS</span></div><div className="status"><span className="status-dot" />Early stage · Building in public</div></div>
      </section>

      <section className="statement-strip"><span>INFORMATION</span><ArrowRightLine /><span>UNDERSTANDING</span></section>

      <section className="section problem" id="why"><div className="section-intro"><SectionLabel>01 / THE PROBLEM</SectionLabel><h2>The information is there.</h2><p>Governments publish policies. Organizations launch programs. Companies enter markets. Institutions fund initiatives. Researchers publish findings. News reports what is changing.</p><p>The information exists. But it rarely arrives as one coherent picture.</p></div><GraphVisual /><div className="section-bottom"><p>Important relationships are spread across documents, institutions, websites, datasets, and time.</p><p className="large-note">Finding one fact is relatively easy.<br /><em>Understanding what that fact connects to is much harder.</em></p></div></section>

      <section className="section lesson"><div className="lesson-mark">THE<br />LESSON<br /><span>01</span></div><div className="lesson-copy"><SectionLabel>02 / WHAT WE LEARNED</SectionLabel><h2>The internet is not the whole picture.</h2><p>The more we built, the more difficult the problem became.</p><p>We learned how difficult it can be to find reliable, current information through the open internet alone. Websites become outdated. Information is buried. Documents describe events after they happen. Important knowledge can exist inside institutions long before it becomes publicly accessible.</p><p>That changed how we think about intelligence. Better intelligence does not begin with a better answer. It begins with better evidence.</p><a className="text-link" href="#connect">Help us build it <ArrowUpRight /></a></div></section>

      <section className="section approach" id="approach"><SectionLabel>03 / THE AKSOS APPROACH</SectionLabel><h2>Technology is only part<br />of the infrastructure.</h2><div className="approach-grid"><div className="approach-side system"><div className="side-icon">ATIS</div><h3>The system</h3><p>ATIS + RITA + evidence architecture + intelligence workflows</p><div className="side-list"><span>Organize evidence</span><span>Identify relationships</span><span>Accelerate analysis</span></div></div><div className="approach-plus">+</div><div className="approach-side network"><div className="side-icon">AKSOS</div><h3>The network</h3><p>People + institutions + researchers + organizations + first-source information</p><div className="side-list"><span>Bring current context</span><span>Share domain expertise</span><span>Stay close to change</span></div></div></div><p className="approach-footer">We believe meaningful intelligence requires both. AKSOS is building both.</p></section>

      <section className="section atis" id="atis"><div className="atis-header"><div><SectionLabel>04 / THE SYSTEM</SectionLabel><div className="atis-title"><Mark atis /><h2>ATIS</h2></div><p className="subhead">An intelligence platform we&apos;re building to connect evidence, relationships and emerging information.</p></div><a className="atis-arrow" href="https://av2-ten.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the ATIS pilot briefing"><ArrowUpRight /></a></div><div className="atis-content"><div><p>ATIS is an intelligence platform powered by a Retrieval-Augmented Generation system and built around verified knowledge.</p><p>It is being developed to work across economic, legal, regulatory, government, organizational and other relevant information.</p><p>Users can ask questions in natural language and explore the evidence, relationships and context surrounding a subject. The system can then produce analytical reports that bring together relevant evidence, relationships, risks, opportunities and strategic considerations.</p><p className="fine-print">ATIS is still under active development. What you see here represents capabilities demonstrated by the current system — not the finished vision.</p></div><DemoPanel /></div></section>

      <section className="section capabilities"><SectionLabel>05 / CURRENT CAPABILITIES</SectionLabel><div className="cap-header"><h2>What ATIS can do today.</h2><p>Here is what we have been able to build so far. The interface is a window into an evolving system, not a promise of a finished product.</p></div><div className="cap-list"><div><span>01</span><b>Natural-language querying</b><p>Ask questions across a verified knowledge base.</p></div><div><span>02</span><b>Evidence retrieval</b><p>Trace an answer back to the sources that support it.</p></div><div><span>03</span><b>Relationship identification</b><p>Surface how entities, events and documents may connect.</p></div><div><span>04</span><b>Analytical reporting</b><p>Bring evidence, context and potential implications together.</p></div></div></section>

      <section className="section rita" id="rita"><div className="rita-heading"><SectionLabel>06 / THE RELATIONSHIP LAYER</SectionLabel><h2>Not every connection<br /><em>is a story.</em></h2></div><div className="rita-copy"><p className="subhead">RITA — Relationship Intelligence &amp; Triage Analyst</p><p>A corpus can contain hundreds of documents mentioning the same country, ministry, company or industry without those documents belonging to the same story.</p><p>RITA is the relationship and story-discovery intelligence layer within ATIS. It is being developed to distinguish meaningful relationships from generic contextual overlap.</p></div><div className="relationship-types"><div><span className="type-number">01</span><h3>Semantic relationships</h3><p>Instead of simply recording that two entities appear in the same document, RITA attempts to understand the relationship between them.</p><div className="relationship-examples"><span>Program <b>→ implemented by →</b> Organization</span><span>Policy <b>→ affects →</b> Industry</span><span>Organization <b>→ responsible for →</b> Initiative</span></div></div><div><span className="type-number">02</span><h3>Relationship triage</h3><p>Not every relationship deserves equal analytical weight. RITA evaluates relationship type, semantic strength, evidence quality, source support, recurrence, narrative coherence and provenance.</p><div className="triage-bars"><span style={{'--width':'92%'} as React.CSSProperties}>source support</span><span style={{'--width':'76%'} as React.CSSProperties}>coherence</span><span style={{'--width':'58%'} as React.CSSProperties}>recurrence</span></div></div></div><div className="graphs"><div><b>STORY GRAPH</b><span>Meaningful relationships that can contribute to a coherent narrative.</span></div><div><b>CONTEXT GRAPH</b><span>Useful relationships that provide context but are not strong enough to establish a story.</span></div></div><p className="rita-end">RITA&apos;s job is not to find the maximum number of connections.<br /><em>Its job is to find the right connections.</em></p></section>

      <section className="loop-section"><div className="loop-intro"><SectionLabel>07 / THE INTELLIGENCE LOOP</SectionLabel><h2>From connection<br />to intelligence.</h2></div><div className="loop"><div className="loop-item first">EVIDENCE</div><div className="loop-item">SEMANTIC EXTRACTION</div><div className="loop-item">TYPED RELATIONSHIPS</div><div className="loop-item">RELATIONSHIP TRIAGE</div><div className="loop-item highlighted">STORY GRAPH +<br />CONTEXT GRAPH</div><div className="loop-item">STORY DISCOVERY</div><div className="loop-item">COHERENCE VALIDATION</div><div className="loop-item output">INTELLIGENCE <ArrowDown /> ACTION</div></div></section>

      <section className="section provenance"><div><SectionLabel>08 / PROVENANCE &amp; TRUST</SectionLabel><h2>If we can&apos;t trace it,<br /><em>we don&apos;t know enough.</em></h2></div><div className="provenance-copy"><p>Intelligence needs to be explainable.</p><p>Every meaningful relationship should be connected to the evidence that supports it.</p><div className="trace"><span>Story</span><ChevronRight /><span>Relationship</span><ChevronRight /><span>Evidence</span><ChevronRight /><span>Source</span></div><p className="fine-print">A user should be able to understand why the system believes those things are connected. This principle is fundamental to the system we are building.</p></div></section>

      <section className="section honest"><div className="honest-count">09 /<br /><span>HONEST<br />STATUS</span></div><div><SectionLabel>WHERE WE ARE NOW</SectionLabel><h2>We&apos;re still building.</h2><p className="honest-lede">ATIS is not a finished product.</p><p>It is an evolving system being developed, tested and challenged. We are building the technology while simultaneously learning what reliable African intelligence actually requires.</p><p>Some parts work today. Some are being refined. Some are still ideas we need to prove.</p><p>We would rather show that honestly than pretend the final system already exists.</p></div></section>

      <section className="section network-section" id="connect"><div className="network-copy"><SectionLabel>10 / THE NETWORK</SectionLabel><h2>We&apos;re building<br /><em>the network, too.</em></h2><p>Some of the information that matters most isn&apos;t sitting neatly on the internet. It lives inside institutions, organizations, businesses, research communities and the people working within them.</p><p>We are currently talking to people across different fields and looking for relationships that can help us understand the problem better and build the system properly.</p><a className="button button-solid" href="mailto:hello@aksos.africa">Start a conversation <Mail /></a></div><div className="network-orbit"><div className="orbit-center">AKSOS</div><span className="orbit-item oi-1">RESEARCHERS</span><span className="orbit-item oi-2">INSTITUTIONS</span><span className="orbit-item oi-3">BUILDERS</span><span className="orbit-item oi-4">EXPERTS</span><span className="orbit-item oi-5">INFORMATION</span></div></section>

      <section className="section people"><SectionLabel>11 / WHO SHOULD BE PART OF THIS?</SectionLabel><h2>People who understand<br /><em>why this matters.</em></h2><div className="audience-grid">{audience.map(([title, text], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="section journey" id="journey"><SectionLabel>12 / THE JOURNEY</SectionLabel><h2>Starting somewhere real.<br /><em>Building for something larger.</em></h2><div className="journey-list">{journey.map(([label, title, text], i) => <div className={i === 0 ? 'journey-row current' : 'journey-row'} key={label}><span className="journey-label">{label}</span><span className="journey-dot" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="zimbabwe-note"><b>Zimbabwe → Africa</b><p>We are starting with Zimbabwe. Not because Zimbabwe is the limit of the vision, but because meaningful systems need somewhere real to be tested.</p><p>The longer-term ambition is broader: intelligence infrastructure designed for African markets, institutions and realities.</p></div></section>

      <section className="final-section"><div className="final-line" /><SectionLabel>13 / THE NEXT STAGE</SectionLabel><h2>We&apos;re not finished.<br /><em>That&apos;s the point.</em></h2><p>We have a direction. We have an early system. We have learned that the problem is harder than it first appeared. And we believe it is worth solving.</p><p>The next stage will not be built by technology alone. It will require people who understand Africa, people who can build, people who can challenge our assumptions, people who can open doors to better information, and people who simply want to help us figure out what this should become.</p><p>We&apos;re building AKSOS. If you see something worth building here, come build it with us.</p><div className="hero-actions"><a className="button button-solid" href="mailto:hello@aksos.africa">Start a conversation <ArrowUpRight /></a><a className="button button-quiet" href="#atis">Explore ATIS <ArrowDown /></a></div></section>

      <footer><a href="#top" className="wordmark"><Mark small /><span>AKSOS</span></a><p>The information is already there.<br /><em>We&apos;re building the systems and relationships needed to understand how it connects.</em></p><span className="footer-meta">Harare · Zimbabwe / 2026</span></footer>
    </main>
  )
}

function ArrowRightLine() { return <span className="arrow-right-line" aria-hidden="true"><span /></span> }

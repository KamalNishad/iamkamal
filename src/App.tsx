import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowDown,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Globe,
  Database,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Menu,
  X,
  Code2,
} from 'lucide-react'

/* ---------- Magnetic Hover Physics Component ---------- */
function Magnet({
  children,
  padding = 140,
  strength = 3.5,
  className = '',
}: {
  children: React.ReactNode
  padding?: number
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const cx = left + width / 2
      const cy = top + height / 2
      const dx = Math.abs(cx - e.clientX)
      const dy = Math.abs(cy - e.clientY)

      if (dx < width / 2 + padding && dy < height / 2 + padding) {
        setActive(true)
        setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength })
      } else {
        setActive(false)
        setPos({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [padding, strength])

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: active ? 'transform 0.25s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ---------- Reusable FadeIn Helper ---------- */
function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Navigation Bar ---------- */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <div className="w-full max-w-6xl flex items-center justify-between pointer-events-auto">
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-3 px-4 py-2 navbar-float group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-dark-950 font-heading font-black text-sm tracking-wider shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            KK
          </div>
          <span className="font-heading font-bold text-sm tracking-wide text-white hidden sm:inline">
            Kamal Kewat
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 navbar-float">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Status Badge + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center status-indicator-live">
            <span className="pulse-dot" />
            <span>Available for Projects</span>
          </div>

          <a href="#contact" className="btn-cyan text-xs py-2 px-5 font-semibold">
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full navbar-float text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 p-6 glass-card md:hidden pointer-events-auto flex flex-col gap-4 text-center border border-white/15"
          >
            <div className="flex items-center justify-center gap-2 pb-3 border-b border-white/10 text-emerald-400 text-xs font-semibold">
              <span className="pulse-dot" />
              Available for Freelance &amp; Enterprise
            </div>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-heading font-semibold uppercase tracking-wider text-slate-200 hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- Hero Section (High-Impact Motion & Statement Typography) ---------- */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden ambient-grid">
      {/* Top Banner Tag */}
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-6">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-pill text-cyan-300 text-xs font-semibold tracking-wider uppercase border-cyan-500/30">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span>Senior Mobile &amp; Full-Stack Architect · 8+ Yrs Experience</span>
          </div>
        </FadeIn>
      </div>

      {/* Giant Statement Headline */}
      <div className="w-full text-center my-auto py-6">
        <FadeIn delay={0.2} y={30}>
          <h1 className="font-heading font-black uppercase tracking-tight leading-[0.85] text-white text-[11vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] select-none">
            <span className="text-gradient-silver">Hi, I&apos;m Kamal</span>
          </h1>
        </FadeIn>
      </div>

      {/* Floating Center Avatar with Magnetic Physics */}
      <div className="relative z-20 flex justify-center -mt-10 sm:-mt-16 md:-mt-24 mb-6">
        <FadeIn delay={0.4} y={30}>
          <Magnet padding={180} strength={3.5}>
            <div className="avatar-orbit-container">
              <div className="avatar-ambient-glow" />
              <div className="avatar-ring-dashed" />

              <div className="avatar-inner-box">
                <img
                  src={`${import.meta.env.BASE_URL}kamal.png?v=new`}
                  alt="Kamal Kewat"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating Stat Badges */}
              <div className="floating-chip -top-2 -right-4 sm:-right-6">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-heading font-black text-sm">
                  8.5+
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-white">Years</p>
                  <p className="text-[9px] text-slate-400 font-light">Experience</p>
                </div>
              </div>

              <div className="floating-chip -bottom-2 -left-4 sm:-left-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-heading font-black text-sm">
                  30+
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-white">Apps</p>
                  <p className="text-[9px] text-slate-400 font-light">Shipped Live</p>
                </div>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Sub-bar */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
        <FadeIn delay={0.5} className="text-center md:text-left">
          <p className="text-sm sm:text-base text-slate-300 font-heading font-light uppercase tracking-wide max-w-md">
            Mobile app developer building scalable, secure apps for government &amp; enterprise
          </p>
        </FadeIn>

        <FadeIn delay={0.6} className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-cyan">
            <span>View Projects</span>
            <ArrowDown size={15} />
          </a>
          <a href="#contact" className="btn-outline-glass">
            <span>Contact Me</span>
            <ArrowUpRight size={15} />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

/* ---------- Skills Ticker Section ---------- */
const ROW_1 = [
  'Android (Kotlin)',
  'Jetpack Compose',
  'Java',
  'React Native',
  'React.js',
  'Node.js',
  'MVVM & Clean Architecture',
  'Coroutines & Flow',
  'Dagger / Hilt',
  'Retrofit',
  'Room DB & SQLite',
]

const ROW_2 = [
  'GIS & Geofencing',
  'Mapbox & Leaflet',
  'OpenLayers',
  'Google Maps API',
  'Geotagging & Camera2',
  'PostgreSQL & MySQL',
  'REST & WebSockets',
  'CI/CD Pipelines',
  'Offline-First Sync',
  'Agile / Scrum',
]

function SkillsMarquee() {
  return (
    <section id="skills" className="relative py-16 bg-[#07090E] border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
          [ 01. STACK &amp; TOOLS ]
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading uppercase font-bold text-white mt-1">
          Mastered Technologies &amp; Architecture
        </h2>
      </div>

      {/* Row 1: Left */}
      <div className="marquee-wrapper mb-4">
        <div className="marquee-content-left">
          {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((skill, idx) => (
            <div key={idx} className="skill-tag-pill">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Right */}
      <div className="marquee-wrapper">
        <div className="marquee-content-right">
          {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((skill, idx) => (
            <div key={idx} className="skill-tag-pill">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- About Section (Interactive Engineering Philosophy Console) ---------- */
const PHILOSOPHY_PILLARS = [
  {
    id: 'security',
    title: 'Govt Scale & Security',
    icon: ShieldCheck,
    tag: 'Compliance & Biometrics',
    summary: 'Building high-compliance applications trusted by election and government bodies.',
    challenge: 'Government & public sector apps cannot afford security flaws, fake submissions, or data tampering when handling voter records and public funds.',
    solution: 'I implement Zero-Trust mobile architecture: hardware-backed Android KeyStore encryption, biometric authentication, anti-tampering root detection, and cryptographic integrity hashes on all submitted records.',
    standards: ['Android KeyStore AES-256', 'CERT-In & Govt Guidelines', 'Anti-Root / Anti-Tamper', 'Biometric Fingerprint / Face'],
    simulator: {
      title: 'Security Audit & Trust Enclave',
      status: 'AUDIT COMPLIANT · LEVEL 4',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      items: [
        { label: 'Encryption Protocol', value: 'AES-256 GCM + SHA-256 Sign' },
        { label: 'Keystore Hardware', value: 'Active (StrongBox Enclave)' },
        { label: 'Environment Integrity', value: 'Verified (No Root / No Emulator)' },
        { label: 'Data Tampering Check', value: '0 Violations Detected' },
      ],
    },
  },
  {
    id: 'gis',
    title: 'GIS & Geofencing Precision',
    icon: MapPin,
    tag: 'Location Intelligence',
    summary: 'High-accuracy geospatial tracking without burning through device battery.',
    challenge: 'Field engineers inspecting roads and bridges need sub-meter GPS accuracy and anti-spoofing verification, but persistent GPS drains battery within a few hours.',
    solution: 'I construct optimized location engines using Fused Location Provider, polygonal geofencing with polygon containment algorithms, and offline vector tile caching with Mapbox, Leaflet, and Google Maps API.',
    standards: ['Sub-meter GPS Accuracy', 'Battery-Throttled Polling', 'Polygon Geofencing', 'Anti-Spoofing Sensors'],
    simulator: {
      title: 'Geospatial Audit HUD',
      status: 'GPS LOCKED · HIGH ACCURACY',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      items: [
        { label: 'Target Site', value: 'CGPWD Sector 4 Asset Register' },
        { label: 'Coordinates', value: '21.2514° N, 81.6296° E' },
        { label: 'Sensor Accuracy', value: '± 1.1 meters (Fused GPS)' },
        { label: 'Boundary Verification', value: '✓ INSIDE AUTHORIZED POLYGON' },
      ],
    },
  },
  {
    id: 'offline',
    title: 'Offline-First Sync Engine',
    icon: Database,
    tag: 'Zero-Signal Resilience',
    summary: 'Ensuring zero data loss in remote rural areas with automated cloud sync.',
    challenge: 'Critical inspections frequently happen in rural dead zones where network connectivity is 0%. Traditional apps crash or lose field data.',
    solution: 'I build offline-first architectures where Room DB acts as the single source of truth. Photos and inspection reports are committed instantly to local storage, and WorkManager queues background sync with exponential backoff.',
    standards: ['Room DB / SQLite Cache', 'WorkManager Background Sync', 'Zero-Latency Local Writes', 'Automatic Conflict Resolution'],
    simulator: {
      title: 'Sync Pipeline Diagnostics',
      status: 'OFFLINE CACHE READY · AUTO SYNC',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      items: [
        { label: 'Storage Engine', value: 'Encrypted Room DB (0ms Write)' },
        { label: 'Pending Cache Queue', value: '14 Inspection Assets Queued' },
        { label: 'Network Detection', value: 'Passive WiFi & Cellular Watcher' },
        { label: 'Sync Pipeline', value: 'Exponential Backoff (Zero Loss)' },
      ],
    },
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Ecosystem',
    icon: Layers,
    tag: 'Mobile to Web Dashboard',
    summary: 'Connecting native mobile field apps with real-time executive web portals.',
    challenge: 'Mobile apps need real-time web dashboards, CMS management, and secure APIs for ministers and executives to review field progress.',
    solution: 'I bridge mobile and web by architecting companion platforms using React.js, Node.js, Express, and MySQL, delivering full-stack solutions with live analytical charts, exportable PDF reports, and automated CI/CD.',
    standards: ['React.js Enterprise Portals', 'Node.js & Express REST APIs', 'MySQL / PostgreSQL Scalability', 'Role-Based Access Control'],
    simulator: {
      title: 'Full-Stack Architecture Stack',
      status: 'ALL SERVICES OPERATIONAL',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      items: [
        { label: 'Mobile Client', value: 'Native Android (Kotlin / Compose)' },
        { label: 'API Gateway', value: 'Node.js + Express (JWT Auth)' },
        { label: 'State Database', value: 'MySQL (ACID Compliant)' },
        { label: 'Admin Portal', value: 'React.js + Tailwind CSS WebMIS' },
      ],
    },
  },
]

function AboutSection() {
  const [activeTab, setActiveTab] = useState(0)
  const currentPillar = PHILOSOPHY_PILLARS[activeTab]
  const Icon = currentPillar.icon

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <FadeIn>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
            [ 02. PROFILE &amp; PHILOSOPHY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase text-white mt-2">
            How I Architect &amp; Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light">
            Click through my core engineering pillars below to see how I solve mission-critical challenges in production.
          </p>
        </FadeIn>
      </div>

      {/* Interactive Tabs Selector */}
      <FadeIn delay={0.1} className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {PHILOSOPHY_PILLARS.map((p, idx) => {
          const TabIcon = p.icon
          const isActive = idx === activeTab
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`interactive-tab ${isActive ? 'interactive-tab-active' : ''}`}
            >
              <TabIcon size={16} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
              <span>{p.title}</span>
            </button>
          )
        })}
      </FadeIn>

      {/* Interactive Console Body */}
      <div className="glass-card p-6 sm:p-10 mb-12 relative overflow-hidden border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Engineering Challenge & Solution */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      {currentPillar.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                      {currentPillar.title}
                    </h3>
                  </div>
                </div>

                {/* Challenge Callout */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-5">
                  <p className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">⚠ The Challenge:</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {currentPillar.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <p className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">✓ My Architecture Solution:</span>
                  </p>
                  <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                    {currentPillar.solution}
                  </p>
                </div>
              </div>

              {/* Technical Standards Tags */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2 font-mono">
                  Production Standards
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentPillar.standards.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-cyan-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Simulator Panel */}
            <div className="lg:col-span-5">
              <div className="simulator-box">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                      {currentPillar.simulator.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${currentPillar.simulator.badgeColor}`}
                  >
                    {currentPillar.simulator.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {currentPillar.simulator.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <span className="text-xs text-slate-400 font-light">{item.label}</span>
                      <span className="text-xs font-mono font-semibold text-slate-200 text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Engine: Kamal Architecture Core</span>
                  <span className="text-emerald-400">● 100% Operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4 Core Quantitative Metrics (Bottom Bento Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <FadeIn delay={0.1} className="glass-card p-6 flex flex-col justify-between group">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">Experience</span>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">8.5+</span>
            <p className="text-xs text-cyan-400 font-medium mt-1">Years Engineering</p>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Leading end-to-end SDLC from system design to production deployment.
          </p>
        </FadeIn>

        {/* Metric 2 */}
        <FadeIn delay={0.2} className="glass-card p-6 flex flex-col justify-between group">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">Deliveries</span>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">30+</span>
            <p className="text-xs text-indigo-400 font-medium mt-1">Production Apps</p>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Shipped across Play Store, App Store &amp; Govt MDMs.
          </p>
        </FadeIn>

        {/* Metric 3 */}
        <FadeIn delay={0.3} className="glass-card p-6 flex flex-col justify-between group">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">Scale</span>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">1M+</span>
            <p className="text-xs text-emerald-400 font-medium mt-1">Beneficiaries Served</p>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Field workers, state engineers, and rural housing citizens.
          </p>
        </FadeIn>

        {/* Metric 4 */}
        <FadeIn delay={0.4} className="glass-card p-6 flex flex-col justify-between group">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">Quality</span>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">99.9%</span>
            <p className="text-xs text-amber-400 font-medium mt-1">Crash-Free Rate</p>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Architected with defensive coding, Flow, and Room DB persistence.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ---------- Expertise Section ---------- */
const EXPERTISE_LIST = [
  {
    num: '01',
    icon: Smartphone,
    title: 'Native Android Engineering',
    desc: 'Production-tested native applications using Kotlin, Java, and Jetpack Compose. Architected with MVVM / Clean Architecture, Coroutines, Flow, Dagger/Hilt, and Room DB for bulletproof reliability.',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines', 'Room DB', 'Camera2'],
  },
  {
    num: '02',
    icon: Globe,
    title: 'Cross-Platform & Full-Stack Web',
    desc: 'Scalable React Native and React.js enterprise solutions backed by robust Node.js and Express APIs. Experienced in constructing comprehensive Management Information Systems (MIS) and administrative CMS dashboards.',
    tags: ['React Native', 'React.js', 'Node.js', 'Express', 'MySQL', 'REST APIs'],
  },
  {
    num: '03',
    icon: MapPin,
    title: 'GIS & Geospatial Systems',
    desc: 'Location-intelligence engines featuring sub-meter geotagging, polygon geofencing, and map visualization via Mapbox, Leaflet, OpenLayers, and Google Maps API with optimized battery consumption.',
    tags: ['Mapbox', 'Leaflet', 'OpenLayers', 'Google Maps API', 'Geofencing'],
  },
  {
    num: '04',
    icon: Database,
    title: 'Offline-First Field Architecture',
    desc: 'Battle-hardened local storage solutions designed for field personnel operating in zero-connectivity environments. Seamless two-way cloud synchronization once connectivity is restored.',
    tags: ['SQLite', 'WorkManager', 'Sync Engines', 'Audit Trails', 'Conflict Resolution'],
  },
  {
    num: '05',
    icon: Layers,
    title: 'Architecture & Store Delivery',
    desc: 'Leading the full software development lifecycle from initial architecture design and security audits to Play Store & App Store compliance, CI/CD automation, and post-launch maintenance.',
    tags: ['CI/CD', 'Code Review', 'Store Deployment', 'Performance Optimization'],
  },
]

function ExpertiseSection() {
  return (
    <section id="expertise" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <FadeIn>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
            [ 03. WHAT I DO ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase text-white mt-2">
            Technical Expertise
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-light">
            Engineered systems designed to meet enterprise standards of performance, security, and scalability.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERTISE_LIST.map((item, idx) => {
          const Icon = item.icon
          return (
            <FadeIn
              key={item.title}
              delay={idx * 0.1}
              className={`glass-card p-8 flex flex-col justify-between ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <span className="font-heading font-black text-2xl text-slate-600">
                    {item.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {item.tags.map((t) => (
                  <span key={t} className="tech-badge-luxury">
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Projects Section (Sticky Stacking Motion Cards) ---------- */
const FEATURED_PROJECTS = [
  {
    num: '01',
    name: 'CGPWD',
    tagline: 'Infrastructure Asset & Road Inspection Management',
    category: 'Enterprise Android & iOS · Government',
    link: 'https://play.google.com/store/apps/details?id=com.chips.cgpwd&hl=en_IN',
    isPlayStore: true,
    desc: 'Flagship infrastructure management platform for the Chhattisgarh Public Works Department. Enables engineers and administrative officials to inspect public infrastructure, record geo-tagged site evidence, track milestone progress, and file verified reports directly from the field.',
    highlights: [
      'GPS & camera geotagged site verification with anti-spoofing',
      'Comprehensive digital road & bridge asset registers',
      'Milestone sign-off workflows with instant cloud synchronization',
      'Role-based security for field engineers, executives & ministers',
    ],
    tech: ['Kotlin', 'GPS Geotagging', 'Camera2 API', 'RESTful APIs', 'Room DB'],
  },
  {
    num: '02',
    name: 'WebMIS',
    tagline: 'Statewide Project Monitoring & Analytics System',
    category: 'Web Platform · React & Node.js',
    link: 'https://webmis.cgstate.gov.in/login',
    isPlayStore: false,
    desc: 'High-performance Management Information System providing real-time oversight for multi-crore state development projects. Features executive dashboards, Gantt charts, expenditure tracking, and granular progress monitoring.',
    highlights: [
      'Interactive executive dashboards with real-time KPI metrics',
      'Monthly physical vs. financial progress reconciliation',
      'Audit-ready, version-controlled document archive',
      'Scalable Node.js + MySQL backend architecture',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'Charts'],
  },
  {
    num: '03',
    name: 'CM Awas Yojana',
    tagline: 'Rural Housing Progress & Disbursement Tracking',
    category: 'Mobile Application · State Government',
    link: 'https://play.google.com/store/apps/details?id=com.chips.graminawas.nyayyojna',
    isPlayStore: true,
    desc: 'Direct beneficiary reporting and verification application allowing rural homeowners to upload geo-tagged photographic evidence of construction milestones to trigger the next tranche of financial aid.',
    highlights: [
      'Citizen-friendly interface designed for low-literacy users',
      'Automated geo-validation preventing duplicate claims',
      'Robust offline mode for remote villages without active networks',
      'Instant verification pipeline for district authorities',
    ],
    tech: ['Kotlin', 'Retrofit', 'Room DB', 'Data Binding', 'MVVM'],
  },
  {
    num: '04',
    name: 'One Avinash',
    tagline: 'Enterprise Real Estate Field Verification & CMS',
    category: 'Mobile & Web · Avinash Group',
    link: 'https://apps.apple.com/gh/app/one-avinash/id6759089031',
    isAppStore: true,
    desc: 'Corporate field application for authorised agents and builders of the Avinash Group, guaranteeing accurate client onboarding with strict GPS-location verification, integrated with a bespoke React & Node CMS.',
    highlights: [
      'GPS-verified client interactions and location tagging',
      'Encrypted digital documentation and KYC verification',
      'Custom React + Node content management companion suite',
      'High-reliability cross-platform deployment on iOS & Android',
    ],
    tech: ['Android / iOS', 'GPS Tracking', 'React', 'Node.js', 'REST APIs'],
  },
]

function ProjectCard({
  p,
  i,
  total,
  progress,
}: {
  p: (typeof FEATURED_PROJECTS)[number]
  i: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - i) * 0.04
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <div className="h-[90vh] flex items-start justify-center">
      <motion.div
        className="sticky w-full max-w-5xl project-card-luxury"
        style={{
          scale,
          top: `calc(clamp(5.5rem, 8vw + 1rem, 7.5rem) + ${i * 30}px)`,
          transformOrigin: 'top center',
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-heading font-black text-xl text-cyan-400 font-mono">
                {p.num}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-white/10 text-cyan-300 font-medium">
                {p.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="pulse-dot" />
                Live in Production
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              {p.name}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-1">
              {p.tagline}
            </p>
          </div>

          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-glass text-xs py-2.5 px-6 shrink-0"
          >
            <span>{p.isPlayStore ? 'Play Store' : p.isAppStore ? 'App Store' : 'Live Portal'}</span>
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base mb-6">
              {p.desc}
            </p>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2 font-mono">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="tech-badge-luxury">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#080B12] border border-white/10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-4 flex items-center gap-2 font-mono">
              <ShieldCheck size={16} />
              <span>Key Architectural Features</span>
            </p>
            <ul className="space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <FadeIn>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
            [ 04. FEATURED WORK ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase text-white mt-2">
            Production Applications
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-light">
            Live systems serving citizens, state departments, and corporate teams daily.
          </p>
        </FadeIn>
      </div>

      {/* Stacking Cards Container */}
      <div ref={containerRef} className="relative">
        {FEATURED_PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.name}
            p={project}
            i={idx}
            total={FEATURED_PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

/* ---------- Contact & Footer Section ---------- */
function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('kamalnishad456@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#05060A] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center status-indicator-live mb-6">
            <span className="pulse-dot" />
            <span>Open for Technical Opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-heading font-black uppercase text-white tracking-tight leading-tight">
            Let&apos;s Build Something <span className="text-gradient-cyan">Exceptional</span>
          </h2>

          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-light">
            Whether you need a high-scale native Android app, a GIS-powered field tracking tool, or an architectural audit, let&apos;s connect.
          </p>
        </FadeIn>

        {/* Contact Action Cards */}
        <FadeIn delay={0.2} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {/* Email */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Mail size={18} />
              </div>
              <button
                onClick={copyEmail}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                title="Copy Email Address"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium font-mono">Email Address</p>
              <a
                href="mailto:kamalnishad456@gmail.com"
                className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors break-all mt-1 inline-block"
              >
                kamalnishad456@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Phone size={18} />
              </div>
              <ArrowUpRight size={16} className="text-slate-500 hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium font-mono">Direct Line / WhatsApp</p>
              <a
                href="tel:+918817941549"
                className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors mt-1 inline-block"
              >
                +91 88179 41549
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Remote Ready
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium font-mono">Based in</p>
              <p className="text-sm font-semibold text-white mt-1">
                Raipur, Chhattisgarh, India
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Footer Sub-bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kamal Kewat. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono">
            <a href="https://github.com/KamalNishad" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              GitHub
            </a>
            <a href="mailto:kamalnishad456@gmail.com" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Main Application Entry ---------- */
export default function App() {
  return (
    <div className="min-h-screen bg-[#06070A] text-slate-100 font-body">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsMarquee />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}

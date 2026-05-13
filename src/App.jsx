import { motion } from 'framer-motion'

const navigation = ['Project', 'How It Works', 'About Us']

const workflowSteps = [
  'Product Idea',
  'AI Capability Analysis',
  'Privacy Risk Identification',
  'Mitigation Strategies',
  'Shareable Report',
]

const reveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function RevealSection({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const navHref = (item) => `#${item.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/85 backdrop-blur-[2px]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="text-sm font-light tracking-[0.14em] text-zinc-100">
            PRIVY
          </a>
          <nav className="flex items-center gap-6 md:gap-8">
            {navigation.map((item) => (
              <a key={item} href={navHref(item)} className="nav-tab">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28 md:px-10 md:pt-32">
        <RevealSection className="section-grid">
          <div>
            <p className="kicker">Privacy Risk Assessment Platform</p>
            <h1 className="hero-title">
              Privacy Risk Assessment for AI Product Teams
            </h1>
            <p className="body-copy mt-6 max-w-xl">
              Privy helps teams identify, assess, and mitigate privacy risks in
              consumer-facing AI products before deployment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://arxiv.org/abs/2509.23525"
                target="_blank"
                rel="noreferrer"
                className="mono-button"
              >
                Read Paper
              </a>
              <a href="#how-it-works" className="mono-button">
                View Demo
              </a>
            </div>
          </div>
          <div className="placeholder-panel min-h-[330px] md:min-h-[420px]">
            <span>Insert Demo Screenshot</span>
          </div>
        </RevealSection>

        <RevealSection id="project" className="section-spacing">
          <div className="section-header">
            <p className="kicker">Project</p>
            <h2 className="section-title">What Privy Is</h2>
            <p className="body-copy max-w-3xl">
              Privy is a structured, research-oriented workflow for envisioning
              and mitigating privacy risks in AI product concepts.
            </p>
          </div>

          <div className="mt-16 space-y-20 md:space-y-24">
            <article className="section-grid">
              <div className="placeholder-panel min-h-[300px] md:min-h-[360px]">
                <span>Insert Research Figure</span>
              </div>
              <div>
                <h3 className="subheading">Structured problem framing</h3>
                <p className="body-copy mt-4">
                  Teams begin by articulating the product concept, user context,
                  and AI capabilities. Privy transforms this early description
                  into a format that supports rigorous privacy inquiry.
                </p>
              </div>
            </article>

            <article className="section-grid">
              <div className="order-2 md:order-1">
                <h3 className="subheading">Assessment with human oversight</h3>
                <p className="body-copy mt-4">
                  Privy combines LLM-generated prompts with practitioner
                  judgment, helping teams discover non-obvious risks while
                  preserving accountability in final decisions.
                </p>
              </div>
              <div className="placeholder-panel order-1 min-h-[300px] md:order-2 md:min-h-[360px]">
                <span>Insert Assessment Interface</span>
              </div>
            </article>
          </div>
        </RevealSection>

        <RevealSection id="how-it-works" className="section-spacing">
          <div className="section-header">
            <p className="kicker">How It Works</p>
            <h2 className="section-title">Step-by-step workflow</h2>
          </div>

          <div className="placeholder-panel mt-14 min-h-[190px] px-5">
            <span>Insert Workflow Graphic</span>
            <div className="mt-8 hidden w-full grid-cols-5 gap-2 text-center text-xs tracking-[0.06em] text-zinc-400 md:grid">
              {workflowSteps.map((step) => (
                <span key={step} className="border-t border-zinc-700/70 pt-3">
                  {step}
                </span>
              ))}
            </div>
          </div>

          <ol className="mt-10 grid gap-5 border-t border-zinc-800 pt-8 md:grid-cols-2">
            {workflowSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 text-xs text-zinc-500">0{index + 1}</span>
                <span className="text-sm text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </RevealSection>

        <RevealSection id="about-us" className="section-spacing">
          <div className="section-header">
            <p className="kicker">About Us</p>
            <h2 className="section-title">Research team and lab context</h2>
            <p className="body-copy max-w-3xl">
              Privy is presented as an HCI/privacy research project aligned with
              Carnegie Mellon University and SPUD Lab style communication:
              clear, evidence-based, and practitioner-facing.
            </p>
          </div>

          <div className="section-grid mt-14">
            <div>
              <h3 className="subheading">Academic grounding</h3>
              <p className="body-copy mt-4">
                The project synthesizes empirical findings from AI practitioner
                workflows with actionable privacy design practices for
                consumer-facing systems.
              </p>
              <div className="mt-10 border-t border-zinc-800 pt-6">
                <p className="text-sm text-zinc-400">
                  Carnegie Mellon University
                </p>
                <p className="mt-1 text-sm text-zinc-400">SPUD Lab</p>
              </div>
            </div>
            <div className="placeholder-panel min-h-[320px] md:min-h-[380px]">
              <span>Insert Team / Lab Photo</span>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-xs tracking-[0.08em] text-zinc-500 md:flex-row md:items-center md:justify-between md:px-10">
          <p>Privy · Carnegie Mellon University</p>
          <div className="flex gap-5">
            <a href="https://arxiv.org/abs/2509.23525" target="_blank" rel="noreferrer">
              Paper
            </a>
            <a href="#how-it-works">Demo</a>
            <a href="#about-us">About</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

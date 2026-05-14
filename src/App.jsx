import { motion } from 'framer-motion'

const navigation = ['Project', 'How It Works', 'Research', 'About Us']

const workflowSteps = [
  { num: '1', label: 'Identify Privacy Risks', desc: 'Identify privacy risks based on your product description and the user context it operates in.' },
  { num: '2', label: 'Rank by Priority', desc: 'Rank the privacy risks in priority order.' },
  { num: '3', label: 'Create Mitigation Plan', desc: 'Brainstorm a mitigation strategy for the identified risks.' },
  { num: '4', label: 'Generate Summary', desc: 'Get structured summary of the ranked privacy risks and their mitigation strategies.' },
  { num: '5', label: 'Export Report', desc: 'Export a structured report to document decisions and share with others.' },
]

const reveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
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
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const navHref = (item) => `#${item.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="min-h-screen bg-white text-zinc-900">

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
          <a href="#top">
            <img src="/privy_logo.png" alt="Privy" className="h-10 w-auto" />
          </a>
          <nav className="flex items-center gap-6 md:gap-8">
            {navigation.map((item) => (
              <a key={item} href={navHref(item)} className="nav-tab text-sm">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">

        {/* HERO / PROJECT */}
        <RevealSection
          id="project"
          className="mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pt-44"
        >
          <div className="grid items-center gap-12 md:grid-cols-[0.75fr_1.45fr] md:gap-14">
            <div>
              <h1 className="hero-title">
                AI Privacy Risk Assistant
              </h1>
              <p className="body-copy mt-6 max-w-lg">
                Privy helps teams identify, assess, and mitigate privacy risks
                in consumer-facing AI products — before deployment.
              </p>
              <div className="mt-10">
                <a
                  href="https://docs.google.com/document/d/1kzmI5oTjbS_oZXcG8D6QeMQVCuF-GPBw2hKHlVB-gS0/edit?tab=t.0"
                  target="_blank"
                  rel="noreferrer"
                  className="launch-button"
                >
                  Launch Privy →
                </a>
              </div>
            </div>
            <figure className="overflow-hidden border border-zinc-200 bg-white shadow-sm">
              <img
                src="/privyScreenshot.png"
                alt="Privy privacy risk assistant workflow interface"
                className="w-full object-contain"
              />
            </figure>
          </div>
        </RevealSection>

        {/* HOW IT WORKS */}
        <RevealSection
          id="how-it-works"
          className="border-t border-zinc-200 bg-zinc-50"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
            <div className="mb-16">
              <p className="kicker mb-3">How It Works</p>
              <h2 className="section-title">A five-step workflow</h2>
            </div>

            <ol className="divide-y divide-zinc-200 border-t border-zinc-200">
              {workflowSteps.map((step) => (
                <li key={step.num} className="grid gap-4 py-8 md:grid-cols-[80px_1fr_2fr] md:gap-10 md:py-10">
                  <span className="self-start text-3xl font-semibold leading-none tracking-tight text-zinc-300">{step.num}</span>
                  <p className="subheading self-start">{step.label}</p>
                  <p className="body-copy">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </RevealSection>

        {/* RESEARCH */}
        <RevealSection
          id="research"
          className="border-t border-zinc-200"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
            <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <p className="kicker mb-3">Research</p>
                <h2 className="section-title">The research this tool is built on</h2>
                <figure className="mt-8 overflow-hidden border border-zinc-200 bg-white shadow-sm">
                  <img
                    src="/privyResearchScreenshot.png"
                    alt="Privy research privacy risk highlight summary"
                    className="w-full object-contain"
                  />
                </figure>
              </div>
              <div>
                <p className="body-copy">
                  Privy grew out of a research study of how AI product teams navigate privacy decisions.
                  Through a formative study with AI practitioners, we found that most product teams lack
                  the privacy expertise — and the structured tools — to proactively identify the risks
                  their AI products may create or worsen.
                </p>
                <p className="body-copy mt-5">
                  Privy was built to close this gap: it guides practitioners through a structured privacy
                  impact assessment, using LLM-generated suggestions to surface blind spots while keeping
                  practitioners in control of final decisions. In an evaluation with 24 practitioners
                  reviewed by 13 privacy experts, Privy consistently helped non-experts identify relevant
                  risks and propose effective mitigation strategies.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="https://arxiv.org/abs/2509.23525"
                    target="_blank"
                    rel="noreferrer"
                    className="mono-button"
                  >
                    Read Paper
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ABOUT US — black section */}
        <section id="about-us" className="bg-zinc-950 text-zinc-100">
          <motion.div
            className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <p className="kicker mb-3 text-zinc-500">About Us</p>
                <h2 className="section-title text-zinc-100">
                  Researchers at CMU's HCII &amp; SPUD Lab
                </h2>
              </div>
              <div>
                <p className="body-copy text-zinc-400">
                  We are a research group focused on human-centered approaches
                  to privacy and AI. Privy is part of a broader effort to give
                  practitioners the tools they need to build responsibly.
                </p>
                <p className="body-copy mt-5 text-zinc-400">
                  We collaborate with industry partners and academic institutions to study how
                  privacy decisions are made and how they can be improved.
                </p>
                <div className="mt-10 border-t border-zinc-800 pt-6">
                  <p className="text-sm tracking-wide text-zinc-500">Carnegie Mellon University</p>
                  <p className="mt-1 text-sm tracking-wide text-zinc-500">SPUD Lab</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-xs tracking-[0.08em] text-zinc-600 md:flex-row md:items-center md:justify-between md:px-10">
          <p>Privy · Carnegie Mellon University</p>
          <div className="flex gap-5">
            <a href="https://arxiv.org/abs/2509.23525" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              Paper
            </a>
            <a href="#how-it-works" className="hover:text-zinc-400 transition-colors">How It Works</a>
            <a href="#about-us" className="hover:text-zinc-400 transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

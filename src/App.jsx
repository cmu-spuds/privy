import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navigation = ['Project', 'How It Works', 'Research', 'About Us']

const workflowSteps = [
  {
    step: 1,
    title: 'Identify Privacy Risks',
    description:
      'Identify privacy risks based on your product description and the user context it operates in.',
    image: '/step1.png',
    alt: 'Screenshot of Privy step one showing identified privacy risks.',
  },
  {
    step: 2,
    title: 'Rank by Priority',
    description: 'Rank the privacy risks in priority order.',
    image: '/step2.png',
    alt: 'Screenshot of Privy step two showing prioritized privacy risks.',
  },
  {
    step: 3,
    title: 'Create Mitigation Plan',
    description:
      'Brainstorm a mitigation strategy for the identified risks.',
    image: '/step3.png',
    alt: 'Screenshot of Privy step three showing mitigation planning.',
  },
  {
    step: 4,
    title: 'Generate Summary',
    description:
      'Get structured summary of the ranked privacy risks and their mitigation strategies.',
    image: '/step4.png',
    alt: 'Screenshot of Privy step four showing generated workflow summary.',
  },
  {
    step: 5,
    title: 'Export Report',
    description:
      'Export a structured report to document decisions and share with others.',
    image: '/step5.png',
    alt: 'Screenshot of Privy step five showing exported report output.',
  },
]

const BIBTEX = `@inproceedings{lee2026privy,
  title     = {Privy: Envisioning and Mitigating Privacy Risks
               for Consumer-facing AI Product Concepts},
  author    = {Lee, Hao-Ping and Yang, Yu-Ju and Bilik, Matthew
               and Krsek, Isadora and von Davier, Thomas Serban
               and Monteiro, Kyzyl and Lin, Jason and Agarwal, Shivani
               and Forlizzi, Jodi and Das, Sauvik},
  booktitle = {Proceedings of the 2026 CHI Conference on
               Human Factors in Computing Systems},
  year      = {2026},
  doi       = {10.1145/3772318.3791279}
}`

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

function fallbackImageDataUri(label) {
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
      <rect width="1280" height="800" fill="#f4f4f5" />
      <rect x="30" y="30" width="1220" height="740" fill="#ffffff" stroke="#d4d4d8" stroke-width="2" />
      <text x="640" y="404" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" fill="#71717a" letter-spacing="2">${safeLabel}</text>
    </svg>`
  )}`
}

function fallbackFrameDataUri(label) {
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
      <rect width="1200" height="760" fill="#f4f4f5" />
      <rect x="76" y="52" width="1048" height="590" rx="20" fill="none" stroke="#a1a1aa" stroke-width="18" />
      <rect x="114" y="90" width="972" height="516" rx="8" fill="#ffffff" stroke="#d4d4d8" stroke-width="2" />
      <rect x="260" y="658" width="680" height="28" rx="14" fill="#e4e4e7" stroke="#a1a1aa" />
      <text x="600" y="388" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" fill="#71717a" letter-spacing="1">${safeLabel}</text>
    </svg>`
  )}`
}

function CopyButton() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(BIBTEX).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-7 right-3 border border-zinc-300 bg-white px-2 py-1 text-xs tracking-wide text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-800"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function CrossfadeImage({ src, alt, onError }) {
  const [topSrc, setTopSrc] = useState(src)
  const [bottomSrc, setBottomSrc] = useState(src)
  const [fading, setFading] = useState(false)
  const fadeTimer = useRef(null)

  useEffect(() => {
    if (src === topSrc) return

    setBottomSrc(src)
    setFading(true)

    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      setTopSrc(src)
      setFading(false)
    }, 350)

    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [src])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={bottomSrc}
        alt=""
        aria-hidden="true"
        onError={onError}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <img
        src={topSrc}
        alt={alt}
        onError={onError}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: fading ? 0 : 1,
          transition: 'opacity 350ms ease',
        }}
      />
    </div>
  )
}

function App() {
  const navHref = (item) => `#${item.toLowerCase().replace(/\s+/g, '-')}`
  const [activeStep, setActiveStep] = useState(workflowSteps[0].step)
  const [expandedStep, setExpandedStep] = useState(workflowSteps[0].step)

  const handleStepSelection = (stepNumber) => {
    if (stepNumber === expandedStep) {
      setExpandedStep(null)
      return
    }
    setExpandedStep(stepNumber)
    setActiveStep(stepNumber)
  }

  const currentStep =
    workflowSteps.find((step) => step.step === activeStep) ?? workflowSteps[0]

  const handleStepImageError = (event, label) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackImageDataUri(label)
  }

  const handleFrameImageError = (event, label) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackFrameDataUri(label)
  }

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
            <div className="flex flex-col items-center text-center">
              <h1 className="hero-title mx-auto text-center">
                AI Privacy Risk Assistant
              </h1>
              <p className="body-copy mt-6 max-w-lg text-center">
                Privy helps teams identify, assess, and mitigate privacy risks
                in consumer-facing AI products — before deployment.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  href="mailto:haopingl@andrew.cmu.edu"
                  className="launch-button"
                >
                  Contact us for access
                </a>
              </div>
            </div>
            <figure className="overflow-hidden border border-zinc-200 bg-white shadow-sm">
              <video
                src="/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
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
          <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-20">
            <div className="mb-8">
              <p className="kicker mb-3">How It Works</p>
              <h2 className="section-title">A five-step workflow</h2>
            </div>

            <div className="how-it-works-layout">
              <div>
                <div role="tablist" aria-label="How Privy works" className="space-y-3">
                  {workflowSteps.map((step) => {
                    const isActive = step.step === activeStep
                    const isExpanded = step.step === expandedStep
                    return (
                      <button
                        key={step.step}
                        id={`how-it-works-tab-${step.step}`}
                        role="tab"
                        aria-selected={isActive}
                        aria-expanded={isExpanded}
                        aria-controls="how-it-works-panel"
                        type="button"
                        onClick={() => handleStepSelection(step.step)}
                        className={`step-card ${isActive ? 'step-card-active' : ''}`}
                      >
                        <span className="step-card-header">
                          <span className="step-number">{step.step}</span>
                          <span className="step-title">{step.title}</span>
                          <span
                            aria-hidden="true"
                            className={`step-chevron ${isExpanded ? 'step-chevron-open' : ''}`}
                          >
                            <svg viewBox="0 0 16 16" className="step-chevron-icon">
                              <path
                                d="M3.25 5.75L8 10.25L12.75 5.75"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                        <span
                          className={`step-description ${isExpanded ? 'step-description-open' : ''}`}
                        >
                          {step.description}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Mobile preview */}
                <div
                  id="how-it-works-panel-mobile"
                  role="tabpanel"
                  aria-labelledby={`how-it-works-tab-${activeStep}`}
                  className="mobile-preview md:hidden"
                >
                  <div className="image-stage">
                    <CrossfadeImage
                      src={currentStep.image}
                      alt={currentStep.alt}
                      onError={(e) => handleStepImageError(e, `Step ${currentStep.step} Preview`)}
                    />
                  </div>
                </div>
              </div>

              <aside className="preview-column hidden md:block">
                <div className="preview-sticky">
                  <div
                    id="how-it-works-panel"
                    role="tabpanel"
                    aria-labelledby={`how-it-works-tab-${activeStep}`}
                    className="laptop-shell"
                  >
                    <div className="laptop-screen-window">
                      <div className="image-stage laptop-image-stage">
                        <CrossfadeImage
                          src={currentStep.image}
                          alt={currentStep.alt}
                          onError={(e) => handleStepImageError(e, `Step ${currentStep.step} Preview`)}
                        />
                      </div>
                    </div>
                    <img
                      src="/laptop-icon.png"
                      alt=""
                      aria-hidden="true"
                      className="laptop-overlay"
                      onError={(event) => handleFrameImageError(event, 'Laptop Frame')}
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </RevealSection>

        {/* RESEARCH */}
        <RevealSection
          id="research"
          className="border-t border-zinc-200"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
            <div className="split-section-layout">
              <div>
                <p className="kicker mb-3">Research</p>
                <h2 className="section-title">The research this tool is built on</h2>
                <figure className="mt-8 block w-full max-w-[560px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                  <img
                    src="/conference.jpg"
                    alt="Privy researchers presenting at a conference"
                    className="block w-full object-cover"
                    onError={(event) => handleStepImageError(event, 'Conference Photo')}
                  />
                </figure>
              </div>
              <div>
                <p className="body-copy">
                  Privy guides AI product teams through a structured privacy assessment, surfacing blind spots with LLM-generated suggestions while keeping practitioners in control of final decisions. In an evaluation with 24 practitioners reviewed by 13 privacy experts, Privy consistently helped non-experts identify relevant risks and propose effective mitigation strategies. This work has been recognized with a Distinguished Paper Award at USENIX Security 2024, a Best Paper Award at CHI 2024, and an Honourable Mention at CHI 2026.
                </p>

                {/* Learn More */}
                <div className="mt-10 border-t border-zinc-200 pt-8">
                  <p className="kicker mb-5">Learn More</p>

                  {/* Paper card */}
                  <a
                    href="https://arxiv.org/abs/2509.23525"
                    target="_blank"
                    rel="noreferrer"
                    className="group mb-6 flex items-start gap-4"
                  >
                    <div className="w-20 flex-shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-50 transition-opacity group-hover:opacity-75">
                      <img
                        src="/paper-thumbnail.png"
                        alt="Privy paper thumbnail"
                        className="block w-full object-cover"
                        onError={(e) => handleStepImageError(e, 'Paper')}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-snug text-zinc-900 group-hover:underline">
                        Privy: Envisioning and Mitigating Privacy Risks for Consumer-facing AI Product Concepts
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">CHI 2026 · Honourable Mention</p>
                    </div>
                  </a>

                  {/* Authors */}
                  <p className="mb-6 text-sm leading-relaxed text-zinc-600">
                    <a href="https://hankhplee.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900">Hao-Ping (Hank) Lee</a>, Yu-Ju Yang, Matthew Bilik, Isadora Krsek, Thomas Serban von Davier, Kyzyl Monteiro, Jason Lin, Shivani Agarwal, Jodi Forlizzi, and Sauvik Das
                  </p>

                  {/* BibTeX */}
                  <div className="relative">
                    <p className="kicker mb-2">Cite</p>
                    <pre className="overflow-x-auto rounded border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-700">
{BIBTEX}
                    </pre>
                    <CopyButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ABOUT US */}
        <section id="about-us" className="bg-zinc-950 text-zinc-100">
          <motion.div
            className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="split-section-layout">
              <div>
                <p className="kicker mb-3 text-zinc-500">About Us</p>
                <h2 className="section-title text-zinc-100">
                  Researchers at CMU&apos;s HCII &amp; SPUD Lab
                </h2>
                <div className="mt-6 flex items-center gap-10">
                  <a href="https://cmu-spuds.github.io" target="_blank" rel="noreferrer">
                    <img
                      src="/spud.png"
                      alt="SPUD Lab logo"
                      className="institution-logo"
                      onError={(event) => handleStepImageError(event, 'SPUD')}
                    />
                  </a>
                  <a href="https://hcii.cmu.edu" target="_blank" rel="noreferrer">
                    <img
                      src="/hcii.png"
                      alt="HCII logo"
                      className="institution-logo"
                      onError={(event) => handleStepImageError(event, 'HCII')}
                    />
                  </a>
                </div>
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
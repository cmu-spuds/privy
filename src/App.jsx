import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navigation = [
  { label: 'Home', href: '#top' },
  { label: 'How It Works', href: '#how-privy-works' },
  { label: 'Research', href: '#research' },
  { label: 'About Us', href: '#about-us' },
]

const workflowSteps = [
  {
    step: 1,
    title: 'Elicit the AI capabilities and requirements',
    description:
      'Privy helps teams articulate capabilities and requirements of their AI product concepts.',
    image: 'step1.png',
    alt: 'Screenshot of Privy step one showing identified privacy risks.',
  },
  {
    step: 2,
    title: ' Identify and prioritize AI privacy risks',
    description: 'Privy guides teams to envision, assess, and rank risks drawn from an AI privacy taxonomy.',
    image: 'step2.png',
    alt: 'Screenshot of Privy step two showing prioritized privacy risks.',
  },
  {
    step: 3,
    title: 'Brainstorm mitigation strategies for AI privacy risks',
    description:
      'Privy provides an interface that allows teams to brainstorm and integrate mitigation ideas across risks.',
    image: 'step3.png',
    alt: 'Screenshot of Privy step three showing mitigation planning.',
  },
  {
    step: 4,
    title: 'Generate an AI privacy assessment to share and use',
    description:
      'Privy enables teams to easily compile and share findings about AI privacy work.',
    image: 'step4.png',
    alt: 'Screenshot of Privy step four showing generated workflow summary.',
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

  /* eslint-disable react-hooks/set-state-in-effect */
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
  }, [src, topSrc])
  /* eslint-enable react-hooks/set-state-in-effect */

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
          objectFit: 'contain',
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
          objectFit: 'contain',
          objectPosition: 'center',
          opacity: fading ? 0 : 1,
          transition: 'opacity 350ms ease',
        }}
      />
    </div>
  )
}

function App() {
  const base = import.meta.env.BASE_URL
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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
          <a href="#top" className="flex-shrink-0">
            <img src={`${base}privy_logo.png`} alt="Privy" className="h-10 w-auto" />
          </a>
          <nav className="flex w-full items-center gap-5 overflow-x-auto whitespace-nowrap pb-1 sm:w-auto sm:gap-6 sm:pb-0 md:gap-8">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="nav-tab flex-shrink-0 text-xs sm:text-sm">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">

        {/* HERO / PROJECT */}
        <RevealSection
          id="privy"
          className="mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pt-44"
        >
          <div className="grid items-center gap-12 md:grid-cols-[0.75fr_1.45fr] md:gap-14">
            <div className="flex flex-col items-start text-left">
              <h1 className="hero-title text-left">
                Privy, an AI privacy risk assistant
              </h1>
              <p className="body-copy mt-6 max-w-lg text-left">
                Privy helps teams envision and mitigate privacy risks
                for novel AI product concepts.
              </p>
              <div className="mt-10 flex justify-start">
                <a
                  href="https://forms.gle/perVmagfkR7N7gmj8"
                  target="_blank"
                  rel="noreferrer"
                  className="launch-button"
                >
                  Sign-up for early access
                </a>
              </div>
            </div>
            <figure className="overflow-hidden border border-zinc-200 bg-white shadow-sm">
              <video
                src={`${base}demo.mp4`}
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
          id="how-privy-works"
          className="border-t border-zinc-200 bg-zinc-50"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-20">
            <div className="mb-8">
              <p className="kicker mb-3">How Privy Works</p>
              <h2 className="section-title">Key features</h2>
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
                  className="mobile-preview lg:hidden"
                >
                  <div className="image-stage">
                    <CrossfadeImage
                      src={`${base}${currentStep.image}`}
                      alt={currentStep.alt}
                      onError={(e) => handleStepImageError(e, `Step ${currentStep.step} Preview`)}
                    />
                  </div>
                </div>
              </div>

              <aside className="preview-column hidden lg:block">
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
                          src={`${base}${currentStep.image}`}
                          alt={currentStep.alt}
                          onError={(e) => handleStepImageError(e, `Step ${currentStep.step} Preview`)}
                        />
                      </div>
                    </div>
                    <img
                      src={`${base}laptop-icon.png`}
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
          <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-9">
            <div className="split-section-layout research-section-layout">
              <div>
                <p className="kicker mb-3">Research</p>
                <h2 className="section-title">The research behind Privy</h2>
                <p className="body-copy mt-6">
                AI creates and exacerbates privacy risks, yet practitioners lack effective resources to identify and mitigate these risks. We present Privy, a tool that guides practitioners without privacy expertise through structured privacy impact assessments to: (i) identify relevant risks in novel AI product concepts, and (ii) propose appropriate mitigations. Privy was shaped by a formative study with 11 practitioners, which informed two versions — one LLM-powered, the other template-based. We evaluated these two versions of Privy through a between-subjects, controlled study with 24 separate practitioners, whose assessments were reviewed by 13 independent privacy experts. Results show that Privy helps practitioners produce privacy assessments that experts deemed high quality: practitioners identified relevant risks and proposed appropriate mitigation strategies. These effects were augmented in the LLM-powered version. Practitioners themselves rated Privy as being useful and usable, and their feedback illustrates how it helps overcome long-standing awareness, motivation, and ability barriers in privacy work.
                </p>
              </div>
              <div>
                {/* Learn More */}
                <div className="mt-10 pt-8">

                  {/* Paper card */}
                  <div className="mb-6 flex items-start gap-4">
                    <a
                      href="https://dl.acm.org/doi/10.1145/3772318.3791279"
                      target="_blank"
                      rel="noreferrer"
                      className="group h-52 w-40 flex-shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-50 transition-opacity hover:opacity-75"
                    >
                      <img
                        src={`${base}paper-thumbnail.png.pdf.png`}
                        alt="Privy paper thumbnail"
                        className="block h-full w-full border border-zinc-300 object-cover"
                        onError={(e) => handleStepImageError(e, 'Paper')}
                      />
                    </a>
                    <div>
                      <a
                        href="https://dl.acm.org/doi/10.1145/3772318.3791279"
                        target="_blank"
                        rel="noreferrer"
                        className="group"
                      >
                        <p className="text-base font-semibold leading-snug text-zinc-900 group-hover:underline">
                          Privy: Envisioning and Mitigating Privacy Risks for Consumer-facing AI Product Concepts
                        </p>
                        <p className="mt-2 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          CHI 2026 Honourable Mention
                        </p>
                      </a>

                      {/* Authors */}
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                        <a href="https://hankhplee.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Hao-Ping (Hank) Lee</a>, <a href="https://marisayang.com/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Yu-Ju Yang</a>, <a href="https://www.mattbilik.com/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Matthew Bilik</a>, <a href="https://www.isadorakrsek.com/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Isadora Krsek</a>, <a href="https://tvondavi.github.io/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Thomas Serban von Davier</a>, <a href="https://kyzyl.notion.site/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Kyzyl Monteiro</a>, <a href="https://www.linkedin.com/in/jasonlin08/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Jason Lin</a>, <a href="https://www.linkedin.com/in/shivani-agarwal-design/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Shivani Agarwal</a>, <a href="https://jodiforlizzi.com/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Jodi Forlizzi</a>, and <a href="http://sauvik.me/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900">Sauvik Das</a>
                      </p>
                    </div>
                  </div>

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
                      src={`${base}spud.png`}
                      alt="SPUD Lab logo"
                      className="institution-logo"
                      onError={(event) => handleStepImageError(event, 'SPUD')}
                    />
                  </a>
                  <a href="https://hcii.cmu.edu" target="_blank" rel="noreferrer">
                    <img
                      src={`${base}hcii.png`}
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
                  practitioners the tools they need to build AI responsibly.
                </p>
                <p className="body-copy mt-5 text-zinc-400">
                  We collaborate with industry partners and academic institutions to study how
                  privacy-related product decisions are made and how they can be improved.
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
            <a href="#how-privy-works" className="hover:text-zinc-400 transition-colors">How Privy Works</a>
            <a href="#about-us" className="hover:text-zinc-400 transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
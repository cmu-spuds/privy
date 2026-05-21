import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navigation = ['Project', 'How It Works', 'About Us']

const howItWorksSteps = [
  {
    step: 1,
    title: 'Product Idea Intake',
    description:
      'Capture the concept, target users, and intended AI behaviors to ground the privacy review.',
    image: '/images/step1.png',
    alt: 'Privy interface showing product idea intake form and context fields.',
  },
  {
    step: 2,
    title: 'Capability and Data Mapping',
    description:
      'Analyze model capabilities, data pathways, and user touchpoints that could introduce privacy risk.',
    image: '/images/step2.png',
    alt: 'Privy screen mapping AI capabilities and associated data flows.',
  },
  {
    step: 3,
    title: 'Privacy Risk Identification',
    description:
      'Generate and refine plausible privacy risks across collection, inference, retention, and sharing.',
    image: '/images/step3.png',
    alt: 'Privy risk identification panel listing candidate privacy concerns.',
  },
  {
    step: 4,
    title: 'Mitigation Strategy Design',
    description:
      'Develop concrete mitigation strategies with human review and feasibility checks.',
    image: '/images/step4.png',
    alt: 'Privy mitigation strategy workspace with reviewed recommendations.',
  },
  {
    step: 5,
    title: 'Shareable Assessment Report',
    description:
      'Compile findings into a report suitable for product, policy, and governance stakeholders.',
    image: '/images/step5.png',
    alt: 'Privy report export view showing summarized risks and mitigations.',
  },
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

function fallbackImageDataUri(label) {
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
      <rect width="1280" height="800" fill="#0a0a0a" />
      <rect x="30" y="30" width="1220" height="740" fill="#111111" stroke="#3f3f46" stroke-width="2" />
      <text x="640" y="404" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" fill="#a1a1aa" letter-spacing="2">${safeLabel}</text>
    </svg>`
  )}`
}

function App() {
  const navHref = (item) => `#${item.toLowerCase().replace(/\s+/g, '-')}`
  const [activeStep, setActiveStep] = useState(howItWorksSteps[0].step)
  const [displayedStep, setDisplayedStep] = useState(howItWorksSteps[0].step)
  const [incomingStep, setIncomingStep] = useState(null)
  const stepTransitionTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (stepTransitionTimer.current) {
        clearTimeout(stepTransitionTimer.current)
      }
    }
  }, [])

  const handleStepSelection = (stepNumber) => {
    if (stepNumber === activeStep) {
      return
    }

    setActiveStep(stepNumber)
    setIncomingStep(stepNumber)

    if (stepTransitionTimer.current) {
      clearTimeout(stepTransitionTimer.current)
    }

    stepTransitionTimer.current = setTimeout(() => {
      setDisplayedStep(stepNumber)
      setIncomingStep(null)
    }, 300)
  }

  const currentStep =
    howItWorksSteps.find((step) => step.step === displayedStep) ?? howItWorksSteps[0]
  const nextStep = incomingStep
    ? howItWorksSteps.find((step) => step.step === incomingStep)
    : null

  const handleStepImageError = (event, label) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackImageDataUri(label)
  }

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
            <article className="max-w-3xl">
              <h3 className="subheading">Structured problem framing</h3>
              <p className="body-copy mt-4">
                Teams begin by articulating the product concept, user context,
                and AI capabilities. Privy transforms this early description
                into a format that supports rigorous privacy inquiry.
              </p>
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

          <div className="how-it-works-layout mt-14">
            <div>
              <div role="tablist" aria-label="How Privy works" className="space-y-3">
                {howItWorksSteps.map((stepItem) => {
                  const isActive = stepItem.step === activeStep
                  return (
                    <button
                      key={stepItem.step}
                      id={`how-it-works-tab-${stepItem.step}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="how-it-works-preview"
                      type="button"
                      onClick={() => handleStepSelection(stepItem.step)}
                      className={`step-card ${isActive ? 'step-card-active' : ''}`}
                    >
                      <span className="step-number">0{stepItem.step}</span>
                      <span className="block">
                        <span className="step-title">{stepItem.title}</span>
                        <span className="step-description">
                          {stepItem.description}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                id="how-it-works-preview-mobile"
                role="tabpanel"
                aria-labelledby={`how-it-works-tab-${activeStep}`}
                className="mobile-preview md:hidden"
              >
                <div className="image-stage">
                  <img
                    src={currentStep.image}
                    alt={currentStep.alt}
                    loading="lazy"
                    onError={(event) =>
                      handleStepImageError(event, `Step ${currentStep.step} Preview`)
                    }
                    className={`screen-image ${nextStep ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
                  />
                  {nextStep && (
                    <img
                      src={nextStep.image}
                      alt={nextStep.alt}
                      loading="lazy"
                      onError={(event) =>
                        handleStepImageError(event, `Step ${nextStep.step} Preview`)
                      }
                      className="screen-image absolute inset-0 opacity-100 translate-y-0"
                    />
                  )}
                </div>
              </div>
            </div>

            <aside className="preview-column hidden md:block">
              <div className="preview-sticky">
                <div
                  id="how-it-works-preview"
                  role="tabpanel"
                  aria-labelledby={`how-it-works-tab-${activeStep}`}
                  className="laptop-frame"
                >
                  <div className="laptop-screen">
                    <div className="image-stage">
                      <img
                        src={currentStep.image}
                        alt={currentStep.alt}
                        loading="lazy"
                        onError={(event) =>
                          handleStepImageError(event, `Step ${currentStep.step} Preview`)
                        }
                        className={`screen-image ${nextStep ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
                      />
                      {nextStep && (
                        <img
                          src={nextStep.image}
                          alt={nextStep.alt}
                          loading="lazy"
                          onError={(event) =>
                            handleStepImageError(event, `Step ${nextStep.step} Preview`)
                          }
                          className="screen-image absolute inset-0 opacity-100 translate-y-0"
                        />
                      )}
                    </div>
                  </div>
                  <div className="laptop-base" aria-hidden="true" />
                </div>
              </div>
            </aside>
          </div>
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

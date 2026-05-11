import {
  ArrowRight,
  Bot,
  ExternalLink,
  FileText,
  Lightbulb,
  ListChecks,
  Shield,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Risk Identification',
    description:
      'Surface privacy risks early by mapping consumer-facing AI interactions, data flows, and vulnerable touchpoints.',
    icon: Shield,
  },
  {
    title: 'Mitigation Suggestions',
    description:
      'Generate practical, context-aware mitigation options that teams can evaluate and prioritize.',
    icon: Lightbulb,
  },
  {
    title: 'AI-Assisted Assessments',
    description:
      'Leverage LLM guidance to expand threat imagination while keeping experts in-the-loop.',
    icon: Bot,
  },
  {
    title: 'Structured Privacy Workflows',
    description:
      'Move through a repeatable process that supports privacy-by-design across product development.',
    icon: ListChecks,
  },
  {
    title: 'Shareable Reports',
    description:
      'Create concise, citation-ready outputs for product, legal, and policy stakeholders.',
    icon: FileText,
  },
  {
    title: 'Human-AI Collaboration',
    description:
      'Combine practitioner judgment with model assistance to improve rigor without sacrificing speed.',
    icon: Users,
  },
]

const workflowSteps = [
  'Product Idea',
  'AI Capability Analysis',
  'Privacy Risk Identification',
  'Mitigation Strategies',
  'Shareable Report',
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

function Reveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <div className="relative overflow-x-clip">
      <div className="noise-overlay" aria-hidden="true" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-6 pt-8 md:px-10">
        <p className="text-sm font-medium tracking-[0.16em] text-zinc-200/85">
          PRIVY
        </p>
        <a
          href="#research"
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium tracking-[0.08em] text-zinc-200/85 transition hover:border-cyan-300/45 hover:text-cyan-100"
        >
          BASED ON RESEARCH
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 md:gap-24 md:px-10">
        <section id="top" className="section-shell grid-background relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.24),transparent_38%),radial-gradient(circle_at_82%_24%,rgba(45,212,191,0.2),transparent_34%),radial-gradient(circle_at_58%_80%,rgba(168,85,247,0.2),transparent_36%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 grid gap-10 px-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-12 md:py-20">
            <Reveal>
              <p className="mb-5 inline-flex rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-[0.08em] text-zinc-300/85">
                AI-POWERED PRIVACY RISK ASSESSMENT
              </p>
              <h1 className="text-balance text-4xl font-bold leading-tight tracking-[-0.03em] text-zinc-50 sm:text-5xl md:text-6xl">
                Privacy Risk Assessment for AI Product Teams
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300/80 md:text-lg">
                Privy helps teams identify, assess, and mitigate AI privacy
                risks before deployment.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://arxiv.org/abs/2509.23525"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
                >
                  Read Paper
                  <ExternalLink size={16} />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/45 hover:text-cyan-100"
                >
                  View Demo
                  <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal className="relative">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-3xl border border-white/15 bg-[#0f1622]/95 p-6 shadow-[0_10px_80px_-45px_rgba(34,211,238,0.6)]"
              >
                <p className="text-xs font-medium tracking-[0.09em] text-zinc-300/80">
                  PRIVACY ASSESSMENT DASHBOARD
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    ['Risk vectors identified', '12'],
                    ['Mitigation plans drafted', '8'],
                    ['Assessment confidence', 'High'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="text-sm text-zinc-300/85">{label}</span>
                      <span className="text-sm font-semibold text-zinc-100">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100/90">
                  Suggested action: tighten data retention in conversational
                  logs before pilot launch.
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <Reveal id="about" className="space-y-6">
          <p className="section-kicker">About</p>
          <h2 className="section-title max-w-3xl">
            AI products create novel privacy risks, but most teams lack
            structured workflows for identifying and mitigating them.
          </h2>
          <p className="max-w-3xl text-pretty text-base leading-relaxed text-zinc-300/80 md:text-lg">
            Privy guides practitioners through structured privacy impact
            assessments powered by AI assistance. It supports practical,
            evidence-oriented decision-making while preserving human oversight.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Research-backed assessment scaffolds',
              'Clear checkpoints for cross-functional teams',
              'Actionable outputs for design and governance',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-zinc-200/85"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal id="features" className="space-y-7">
          <div className="space-y-3">
            <p className="section-kicker">Features</p>
            <h2 className="section-title max-w-3xl">
              Built for privacy-sensitive AI product development workflows.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/30 hover:shadow-[0_16px_60px_-44px_rgba(103,232,249,0.8)]"
                >
                  <div className="mb-4 inline-flex rounded-lg border border-white/15 bg-white/[0.03] p-2.5 text-cyan-100/85 transition group-hover:border-cyan-300/45">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300/80">
                    {feature.description}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </Reveal>

        <Reveal id="research" className="space-y-6">
          <p className="section-kicker">Research</p>
          <h2 className="section-title max-w-3xl">
            Based on peer-reviewed research in privacy risk assessment for
            consumer-facing AI systems.
          </h2>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-7">
            <p className="text-sm leading-relaxed text-zinc-300/85 md:text-base">
              <span className="font-semibold text-zinc-100">Privy:</span>{' '}
              Envisioning and Mitigating Privacy Risks for Consumer-facing AI
              Product Concepts
            </p>
            <p className="mt-2 text-xs tracking-wide text-zinc-400/85">
              Citation-style summary with links to the preprint and full paper.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://arxiv.org/abs/2509.23525"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
              >
                arXiv <ExternalLink size={15} />
              </a>
              <a
                href="https://arxiv.org/pdf/2509.23525"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
              >
                Paper PDF <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal id="workflow" className="space-y-7">
          <div className="space-y-3">
            <p className="section-kicker">Workflow</p>
            <h2 className="section-title max-w-3xl">
              A structured path from concept exploration to actionable privacy
              recommendations.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.02] p-5 md:p-6">
            <div className="grid gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))]">
              {workflowSteps.map((step, index) => (
                <div key={step} className="relative flex items-center gap-3">
                  <div className="relative flex min-h-20 flex-1 items-center rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3">
                    <span className="text-sm font-medium text-zinc-100">
                      {step}
                    </span>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      aria-hidden="true"
                      className="hidden h-px w-8 bg-gradient-to-r from-cyan-300/60 to-indigo-300/20 lg:block"
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-zinc-300/80 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            <span className="font-semibold text-zinc-100">Privy</span> · Carnegie
            Mellon University
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://arxiv.org/abs/2509.23525"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-100"
            >
              Paper
            </a>
            <a href="#workflow" className="transition hover:text-cyan-100">
              Demo
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-100"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

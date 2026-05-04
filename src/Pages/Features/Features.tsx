import {
  ArrowRight,
  BookOpen,
  Brain,
  Layers,
  MessageCircleQuestion,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Link } from "react-router";

const pillars = [
  {
    id: "ai-notes",
    title: "AI notes",
    tag: "Capture",
    description:
      "Turn lectures and PDFs into structured notes you can skim before class—headings, definitions, and key formulas preserved.",
    icon: BookOpen,
    accent: "from-emerald-400/90 to-teal-600",
    ring: "ring-emerald-500/30",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "ai-summarization",
    title: "AI summarization",
    tag: "Compress",
    description:
      "Multi-level summaries from one-page overviews down to bullet takeaways so you can revise in minutes, not hours.",
    icon: Layers,
    accent: "from-sky-400 to-cyan-600",
    ring: "ring-sky-500/30",
    span: "md:col-span-1",
  },
  {
    id: "ai-flashcard",
    title: "AI flashcards",
    tag: "Retain",
    description:
      "Concept-aware cards with hints and spaced repetition cues generated straight from your material.",
    icon: Sparkles,
    accent: "from-violet-400 to-purple-700",
    ring: "ring-violet-500/30",
    span: "md:col-span-1",
  },
  {
    id: "ai-quizzes",
    title: "AI quizzes",
    tag: "Check",
    description:
      "Adaptive MCQs and short answers that mirror your syllabus—spot gaps before the exam does.",
    icon: MessageCircleQuestion,
    accent: "from-amber-400 to-orange-600",
    ring: "ring-amber-500/30",
    span: "md:col-span-1",
  },
  {
    id: "ai-tutor",
    title: "AI tutor",
    tag: "Clarify",
    description:
      "Ask follow-ups in plain language. Answers stay grounded in your uploads so study stays on-rails.",
    icon: Brain,
    accent: "from-rose-400 to-pink-700",
    ring: "ring-rose-500/30",
    span: "md:col-span-2",
  },
];

const workflow = [
  { step: "01", title: "Upload", detail: "Drop a PDF or paste a reading list." },
  { step: "02", title: "Synthesize", detail: "Models extract structure and intent." },
  { step: "03", title: "Study kit", detail: "Notes, cards, quizzes, and chat—unified." },
];

const Features = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-linear-to-br from-emerald-300/50 via-teal-200/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-linear-to-tr from-violet-300/40 to-transparent blur-3xl"
      />

      <section className="relative border-b border-slate-200/80">
        <div className="container mx-auto px-4 py-16 lg:px-10 lg:py-24">
          <div
            className="mx-auto max-w-4xl text-center"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-sm font-medium text-emerald-800">
              <Wand2 className="h-4 w-4" strokeWidth={2} />
              Product · Features
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              One pipeline from{" "}
              <span className="bg-linear-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                document
              </span>{" "}
              to deep mastery
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-600">
              Every feature shares the same philosophy: stay invisible in your workflow,
              obvious in the results, and respectful of your time.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-teal-600 hover:to-emerald-500 active:scale-[0.98]"
              >
                Start free
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
              <Link
                to="/solution"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700"
              >
                See who it is for
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {workflow.map((w, wi) => (
              <div
                key={w.step}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-left backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={wi * 100}
              >
                <span className="font-mono text-xs font-bold tracking-widest text-emerald-600">
                  {w.step}
                </span>
                <h2 className="mt-2 text-lg font-bold text-slate-900">{w.title}</h2>
                <p className="mt-2 text-sm font-medium text-slate-600">{w.detail}</p>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-400/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div
            className="mb-12 max-w-2xl"
            data-aos="fade-right"
            data-aos-duration="700"
          >
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Bento-style toolkit
            </h2>
            <p className="mt-3 text-lg font-medium text-slate-600">
              Mix and match modules—each block is crafted to feel like a studio
              instrument, not another tab to manage.
            </p>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <article
                key={p.id}
                id={p.id}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ${p.ring} transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 ${p.span}`}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                data-aos-duration="700"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${p.accent} text-white shadow-md`}
                >
                  <p.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {p.tag}
                </span>
                <h3 className="mt-1 text-xl font-bold capitalize text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-600">
                  {p.description}
                </p>
                <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-4">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-800"
                  >
                    Try it
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-linear-to-br from-white to-slate-100 opacity-0 blur-2xl transition group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 py-16 text-white lg:py-20"
        data-aos="zoom-in"
        data-aos-duration="750"
      >
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center lg:px-10">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            Ready to wire your next study sprint?
          </h2>
          <p className="max-w-xl text-base font-medium text-emerald-100/90">
            Bring a single document—we will show you the full stack: notes, cards,
            quizzes, and tutor in one workspace.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-emerald-900 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]"
          >
            Create your workspace
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;

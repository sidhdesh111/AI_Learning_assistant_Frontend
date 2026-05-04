import {
  ArrowRight,
  Backpack,
  Briefcase,
  GraduationCap,
  LineChart,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const audiences = [
  {
    id: "for-students",
    title: "For students",
    hook: "Exam seasons, without the panic rooms.",
    copy: "Syllabus-aware summaries, drill-ready quizzes, and tutor chat that cites your actual lecture notes.",
    icon: Backpack,
    gradient: "from-emerald-500 to-teal-700",
    mesh: "from-emerald-400/30 to-cyan-300/20",
  },
  {
    id: "for-self-learners",
    title: "For self-learners",
    hook: "Curiosity-led paths, evidence-backed depth.",
    copy: "Stack PDFs, courses, and side projects—get a single narrative thread instead of scattered highlights.",
    icon: LineChart,
    gradient: "from-sky-500 to-indigo-700",
    mesh: "from-sky-400/30 to-violet-300/20",
  },
  {
    id: "for-educators",
    title: "For educators",
    hook: "Amplify feedback loops, not workload.",
    copy: "Spin up formative checks, differentiation sets, and explainers grounded in the readings you assign.",
    icon: GraduationCap,
    gradient: "from-amber-500 to-orange-700",
    mesh: "from-amber-300/30 to-rose-200/20",
  },
  {
    id: "for-professionals",
    title: "For professionals",
    hook: "Turn dense specs into confident recall.",
    copy: "Onboard faster with flashcards and quizzes built from internal docs—without leaking beyond your workspace rules.",
    icon: Briefcase,
    gradient: "from-violet-500 to-fuchsia-700",
    mesh: "from-violet-400/30 to-pink-300/20",
  },
];

const metrics = [
  { value: "10+", label: "hours reclaimed weekly", hint: "avg. power-user estimate" },
  { value: "4-in-1", label: "study surfaces", hint: "notes · cards · quiz · chat" },
  { value: "24/7", label: "tutor availability", hint: "grounded in your files" },
];

const Solutions = () => {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.35),transparent)]"
      />

      <section className="relative">
        <div className="container mx-auto px-4 pb-12 pt-16 lg:px-10 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-aos="fade-right" data-aos-duration="750">
              <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <Users className="h-4 w-4 text-emerald-600" />
                Solutions
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Built for the way{" "}
                <span className="relative inline-block">
                  you
                  <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-6 bg-emerald-300/60 -z-10" />
                </span>{" "}
                actually learn
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium text-slate-600">
                Pick your lane—we tune defaults, tone, and pacing so the AI feels native
                to coursework, self-study, teaching, or professional upskilling.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  Match me to a template
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/feature"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:border-emerald-400"
                >
                  Explore features
                </Link>
              </div>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-duration="800">
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-emerald-200/50 via-transparent to-violet-200/40 blur-2xl" />
              <div className="relative space-y-4 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-4"
                  >
                    <div>
                      <p className="text-3xl font-black tracking-tight text-slate-900">
                        {m.value}
                      </p>
                      <p className="text-sm font-semibold text-slate-700">{m.label}</p>
                    </div>
                    <p className="max-w-[10rem] text-right text-xs font-medium text-slate-500">
                      {m.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div
            className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
            data-aos="fade-up"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Persona cards
              </h2>
              <p className="mt-2 max-w-xl text-lg font-medium text-slate-600">
                Each lane ships with tuned prompts, density presets, and guardrails so
                the product feels bespoke—not generic.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {audiences.map((a, i) => (
              <article
                key={a.id}
                id={a.id}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
                data-aos="flip-up"
                data-aos-delay={i * 100}
                data-aos-duration="700"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-linear-to-br ${a.mesh} blur-3xl transition duration-700 group-hover:scale-110`}
                />
                <div
                  className={`relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${a.gradient} text-white shadow-lg`}
                >
                  <a.icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="relative text-2xl font-bold capitalize text-slate-900">
                  {a.title}
                </h3>
                <p className="relative mt-2 text-base font-semibold text-emerald-800/90">
                  {a.hook}
                </p>
                <p className="relative mt-4 text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  {a.copy}
                </p>
                <div className="relative mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Includes workspace presets
                  </span>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-800"
                  >
                    Configure
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-emerald-100 bg-emerald-50/40 py-14"
        data-aos="fade-up"
      >
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center lg:px-10">
          <p className="max-w-2xl text-base font-medium text-slate-700">
            Need a hybrid? Most teams blend the educator and professional presets for
            certification programs—talk to us after you try the sandbox.
          </p>
          <Link
            to="/contact"
            className="text-sm font-bold text-emerald-800 underline-offset-4 hover:underline"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

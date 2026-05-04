import {
  ArrowRight,
  BookMarked,
  ChevronDown,
  HelpCircle,
  LifeBuoy,
  Mail,
  Newspaper,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { refreshAOS } from "../../lib/aos";

const posts = [
  {
    title: "Designing trustworthy AI study companions",
    excerpt: "How we keep answers anchored to your sources—and what to watch for in any tool you adopt.",
    tag: "Trust & safety",
    tone: "from-teal-500 to-emerald-700",
  },
  {
    title: "Spaced repetition without the spreadsheet",
    excerpt: "A practical walkthrough of turning dense PDFs into lightweight review loops.",
    tag: "Method",
    tone: "from-violet-500 to-purple-700",
  },
  {
    title: "From lecture chaos to exam clarity",
    excerpt: "Three templates educators reuse every term to keep feedback fast and fair.",
    tag: "Educators",
    tone: "from-amber-500 to-orange-600",
  },
];

const faqPreview = [
  {
    q: "Can I delete my documents anytime?",
    a: "Yes. Removing a document clears generated artifacts tied to it from your workspace.",
  },
  {
    q: "Does the tutor invent facts?",
    a: "The tutor is constrained to your uploads for factual answers—ask it to cite the passage it used.",
  },
  {
    q: "Is there a free tier?",
    a: "You can start with a free account to explore core flows before upgrading for heavier workloads.",
  },
];

const Resources = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    requestAnimationFrame(() => refreshAOS());
  }, [openFaq]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[480px] w-[100vw] blur-lg -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.15),transparent_55%,rgba(139,92,246,0.12),transparent)]"
      />

      <section className="relative border-b border-slate-200/80 -mb-10">
        <div className="container mx-auto px-4 py-16 lg:px-10 lg:py-20">
          <div
            className="mx-auto max-w-3xl text-center"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <div className="mx-auto mb-6 flex max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
              <Search className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-left text-sm font-medium text-slate-500">
                Search guides, playbooks, and release notes…
              </span>
              <span className="ml-auto rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Soon
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Resources that feel like a{" "}
              <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                creative studio
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-slate-600">
              FAQs for quick unblock, a help hub for workflows, and editorials on how
              teams learn with AI—same visual language as the rest of the product.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-14 lg:py-20">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-3 lg:px-10">
          <a
            href="#faq-spot"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <HelpCircle className="h-6 w-6" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
            <p className="mt-2 flex-1 text-sm font-medium text-slate-600">
              Short answers to the questions we hear in onboarding every week.
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-teal-600 group-hover:gap-2">
              Jump to FAQ
              <ArrowRight className="h-4 w-4" />
            </span>
            <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
          </a>

          <Link
            id="help-center"
            to="/contact"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-slate-900 to-emerald-950 p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
              <LifeBuoy className="h-6 w-6" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold">Help center</h2>
            <p className="mt-2 flex-1 text-sm font-medium text-emerald-100/90">
              Stuck on uploads, sharing, or quiz formats? Send us the details—we route
              you to the fastest fix.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
              <Mail className="h-4 w-4" />
              Open a request
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <div
            id="blog"
            className="relative flex flex-col overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <Newspaper className="h-6 w-6" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Blog</h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Long-form notes from our design and pedagogy team—new drops land here
              first.
            </p>
            <p className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-500">
              Feed is warming up — follow the cards below for the latest drafts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div data-aos="fade-right">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                From the journal
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Styled cards—swap in your CMS or MDX later without losing the layout.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 self-start rounded-xl border-2 border-slate-900 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white"
              data-aos="fade-left"
            >
              Get updates
              <BookMarked className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <article
                key={post.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className={`h-2 w-full bg-linear-to-r ${post.tone}`} />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {post.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-800"
                  >
                    Read draft
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-14 lg:py-20"
        id="faq-spot"
        data-aos="fade-up"
      >
        <div className="container mx-auto max-w-3xl px-4 lg:px-10">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            FAQ spotlight
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm font-medium text-slate-600">
            Tap to expand—mirrors the accordion on the home page, tuned for visitors who
            land here first.
          </p>
          <div className="mt-10 space-y-3">
            {faqPreview.map((item, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-slate-100 px-5 py-4 text-sm font-medium leading-relaxed text-slate-600">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            More questions?{" "}
            <Link to="/contact" className="font-bold text-emerald-700 hover:underline">
              Visit contact
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:info@example.com"
              className="font-bold text-emerald-700 hover:underline"
            >
              info@example.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resources;

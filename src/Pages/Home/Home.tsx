import { Lock, Pen, Share2, UserStar, AArrowUp, Brain, ChartBar, NotebookIcon, NotepadText, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Features_Slider from "../../Components/Slider/Features_Slider";
import { } from 'lucide-react';
import { useState, useEffect } from "react";
import FAQ from "../../Components/FAQ/FAQ";
import { refreshAOS } from "../../lib/aos";
import Testimonial from "../../Components/Testimonial/Testimonial";
const section2 = [
  {
    color: "bg-rose-600/30",
    icons: Share2,
    title: "Invisible, not extra",
    desc: "AI sits so deeply inside your workflows that it stops feeling like an extra step. It becomes part of the way you teach.",

  },
  {
    color: "bg-amber-300/60",
    icons: UserStar,
    title: "Teacher-first control",
    desc: "AI offers helpful ideas and insights, but every suggestion is yours to review, refine, or discard entirely. You decide what’s best for your students.",
  },
  {
    color: "bg-slate-600/20",
    icons: Lock,
    title: "Trust through quality",
    desc: "Built on top of leading top AI models and refined by educators, our tools ensure high-quality educational output.",
  },
  {
    color: "bg-purple-500/20",
    icons: Pen,
    title: "Highest standards of privacy",
    desc: "ISO 42001, 27701 certified, and Digital Promise’s Responsible AI certification; with all data encrypted at rest and in transit.",
  },
];


const FeturesData = [
  {
    Icons: ChartBar,
    key: "PRA",
    label: "Progress Reports Assistant",
    para: "Each comment links to evidence of student work for easy review.",
    colorclass: "from-green-100 to-green-500",
    textColor: "text-green-900",
    primarycolor: "bg-green-200",
    secondryColor: "shadow-green-500",
    children: [
      {
        label: "Generate evidence-backed comments",
        para: "from scratch or by transforming existing materials.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "Define your own voice and structure",
        para: "and craft comments in your style.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Translate your comments",
        para: "to 50+ languages.",
        img: "./acco-1-ss-3.webp"
      },


    ]
  }, {
    Icons: Pen,
    key: "WA",
    label: "Writing Assistant",
    para: "Everything you write on toddle, write faster and better with the writing assistant.",
    colorclass: "from-sky-100 to-sky-500",
    textColor: "text-sky-900",
    primarycolor: "bg-sky-200",
    secondryColor: "shadow-sky-500",
    children: [
      {
        label: "Create announcements",
        para: "Give broad strokes, get a polished announcement written in your voice.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "Compose replies",
        para: "Respond quickly in channels and threads with smart suggestions.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Draft nuanced behaviour reports",
        para: "Outline the key points and get a carefully worded report.",
        img: "./acco-1-ss-3.webp"
      },
      {
        label: "Craft portfolio captions",
        para: "with AI that reads even photos and handwritten work.",
        img: "./acco-1-ss-4.webp"
      },
      {
        label: "Summarise chats",
        para: "as well as channels, behaviour history, and more.",
        img: "./acco-1-ss-5.webp"
      }

    ]

  }, {
    Icons: NotepadText,
    key: "CDA",
    label: "Cuuriculum Design Assistant",
    para: "Work with an infinitely creative planning partner to elevate every stage of curriculum design, from courses to units to lesson plans.",
    colorclass: "from-pink-100 to-pink-500",
    textColor: "text-pink-900",
    primarycolor: "bg-pink-200",
    secondryColor: "shadow-pink-500",
    children: [
      {
        label: "Build well-structured courses",
        para: "from scratch or by transforming existing materials.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "Design engaging units",
        para: "that align with your learning goals.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Create lesson plans",
        para: "that target specific skills and competencies.",
        img: "./acco-1-ss-3.webp"
      },
      {
        label: "Differentiate lessons",
        para: "and personalise learning.",
        img: "./acco-1-ss-4.webp"
      },
      {
        label: "Generate assessment tools",
        para: "such as rubrics, checklists, and more created in seconds.",
        img: "./acco-1-ss-5.webp"
      }

    ]
  },
  {
    Icons: NotebookIcon,
    key: "AB",
    label: "Assesssment Builder",
    para: "Turn any material into thoughful, authentic assessments in minutes.",
    colorclass: "from-green-100 to-green-500",
    textColor: "text-green-900",
    primarycolor: "bg-green-200",
    secondryColor: "shadow-green-500",
    children: [
      {
        label: "Create high-quality assessments",
        para: "Describe your objective or drop in material - YouTube links, PDFs, and more.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "Choose from multiple formats",
        para: "From MCQs and essays to true/false, long-answer and more.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Target specific standards",
        para: "and get tailored questions instantly.",
        img: "./acco-1-ss-3.webp"
      },
      {
        label: "Adapt to every learner",
        para: "Change difficulty levels, add real-world examples, and more.",
        img: "./acco-1-ss-4.webp"
      },
      {
        label: "Import or digitize worksheets",
        para: "Upload from Drive or snap a photo and turn it into a Toddle assignment.",
        img: "./acco-1-ss-5.webp"
      }

    ]
  },
  {
    Icons: AArrowUp,
    key: "FGA",
    label: "Feedback & Grading Assistant",
    para: "A Smart grading companion to take the first pass at evaluating student work.",
    colorclass: "from-purple-100 to-purple-500",
    textColor: "text-purple-900",
    primarycolor: "bg-purple-200",
    secondryColor: "shadow-purple-500",
    children: [
      {
        label: "You’re in control",
        para: "Grades using your criteria and explains its thinking. You review, refine, or discard entirely.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "Works across assessment tools",
        para: "scores, rubrics, checklists, and more.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Offers rich feedback",
        para: "Including strengths, areas to improve, and next steps for each student.",
        img: "./acco-1-ss-3.webp"
      },
      {
        label: "Supports all subjects",
        para: "From multi-step math problems to complex essays with 90% precision.",
        img: "./acco-1-ss-4.webp"
      },
      {
        label: "Reads all formats",
        para: "Handwritten work, PDFs, images, Docs, Slides, and more.",
        img: "./acco-1-ss-5.webp"
      }

    ]
  },
  {
    Icons: Brain,
    key: "AT",
    label: "AI Tutors",
    para: "Design deeply personalized and immersive learning experiences at scale.",
    colorclass: "from-red-100 to-red-500",
    textColor: "text-red-900",
    primarycolor: "bg-red-200",
    secondryColor: "shadow-red-500",
    children: [
      {
        label: "Design once-unimaginable learning experiences",
        para: "From practicing probability over a game of battleship to debating Hamlet's dilemma with Hamlet himself.",
        img: "./acco-1-ss-1.webp"
      },
      {
        label: "25 learners, 25 learning journeys",
        para: "AI Tutors adapt in real-time to each student’s pace and interests, creating truly individualised learning paths.",
        img: "./acco-1-ss-2.webp"
      },
      {
        label: "Get guidance for future instruction",
        para: "AI Tutors analyse all conversations to provide guidance for future instruction, both at the class level and for each student.",
        img: "./acco-1-ss-3.webp"
      },
      {
        label: "Secure, student-friendly AI",
        para: "A highly secure framework that allows students to tap into the power of AI under your guidance.",
        img: "./acco-1-ss-4.webp"
      }
    ]
  }
]


const faqData = [

  {
    "question": "What is the AI Learning Assistant Portal?",
    "answer": "The AI Learning Assistant Portal is an intelligent platform that helps users learn from uploaded documents. Users can upload PDFs, and the AI automatically generates summaries, flashcards, quizzes, chat assistance, and study materials."
  },
  {
    "question": "What types of documents can I upload?",
    "answer": "Users can upload PDF files. Additional file formats may be supported in future updates."
  },
  {
    "question": "How does the AI work?",
    "answer": "After a document is uploaded, the AI analyzes the content and automatically generates summaries, quizzes, flashcards, AI chat responses, and important insights based on the uploaded material."
  },
  {
    "question": "What is the AI Chat feature?",
    "answer": "The AI Chat feature allows users to ask questions related to the uploaded document. The AI provides answers based only on the document content to help users understand topics more effectively."
  },
  {
    "question": "What kind of quizzes are generated?",
    "answer": "The platform generates multiple-choice questions, concept-based quizzes, and practice tests automatically from the uploaded document."
  },
  {
    "question": "How do Flashcards help?",
    "answer": "Flashcards help users quickly revise and memorize important concepts. Each flashcard contains a question and answer generated from the document content."
  },
  {
    "question": "What are AI Actions?",
    "answer": "AI Actions are smart tools that allow users to summarize content, simplify difficult topics, translate text, extract key insights, and generate short notes automatically."
  },
  {
    "question": "Is my uploaded data secure?",
    "answer": "Yes. Uploaded documents and generated content are securely stored and accessible only to the authorized user."
  },
  {
    "question": "Can I use the portal on mobile devices?",
    "answer": "Yes. The platform is fully responsive and works on mobile phones, tablets, laptops, and desktop devices."
  },

  {
    "question": "Do I need to create an account?",
    "answer": "Yes. Users need to sign up or log in to upload documents, save progress, and access generated learning materials later."
  },
  {
    "question": "Can I manage multiple documents?",
    "answer": "Yes. Each uploaded document gets its own workspace where users can access summaries, quizzes, flashcards, AI chat, and study history."
  },
  {
    "question": "Who can use this platform?",
    "answer": "The platform is designed for students, teachers, researchers, professionals, and anyone who wants to learn more efficiently from documents."
  },
  {
    "question": "How long does AI processing take?",
    "answer": "Most documents are processed within a few seconds, depending on the file size and content length."
  },

  {
    "question": "What is the main goal of the platform?",
    "answer": "The platform aims to transform documents into interactive learning experiences that help users study smarter, faster, and more effectively."
  }

]

type FeatureKey = (typeof FeturesData)[number]["key"];

const Home = () => {

  const [selectedFeature, setSelectedFeature] = useState<
    Record<FeatureKey, string>
  >({
    PRA: "PRA-0",
    WA: "WA-0",
    CDA: "CDA-0",
    AB: "AB-0",
    FGA: "FGA-0",
    AT: "AT-0"
  });

  const [faqopen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => refreshAOS());
  }, [faqopen]);




  return (
    <>
      {/* hero section  */}
      <section className="min-h-[70%]">
        <div className="container mx-auto px-2 lg:px-10 py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 items-center lg:px-20">
            <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="800">
              <h2 className="text-3xl lg:text-4xl px-2 text-center lg:text-start font-medium leading-10 lg:mr-20 mb-4 text-slate-900">
                World's most powerful AI toolkit for Learner's and Educator's
              </h2>
              <p className="text-[1.2rem] text-center lg:text-start px-2 font-medium text-slate-600 mb-6">
                Seamlessly embedded in every Toddle workflow to help you teach
                better, personalise learning more deeply, and reclaim up to 10
                hours every week.
              </p>
              <Link to={"/register"} className="w-full block text-center lg:text-start">
                <button
                  type="button"
                  className="px-6 py-2 rounded-md bg-linear-to-br from-emerald-400 to-teal-500 text-white font-medium hover:from-teal-500 hover:to-emerald-400 transition-all duration-500 cursor-pointer active:scale-95 disabled:pointer-events-none"
                >
                  Get Demo
                </button>
              </Link>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="900">
              <img
                className=" lg:min-h-50 h-auto aspect-auto w-auto"
                src="./ai-banner.webp"
              />
            </div>
          </div>
        </div>
      </section>
      {/* amplifies section  */}
      <section
        className=" bg-linear-to-br from-slate-100/30 to-neutral-200/20"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-6 lg:px-30 py-15 lg:py-30 ">
          <div>
            <h2
              className="text-xl lg:text-3xl font-bold text-center"
              data-aos="zoom-in"
              data-aos-delay="50"
            >
              AI, when done right, amplifies great teaching - never replaces it
            </h2>
            <p className="text-xl lg:text-lg text-slate-600 font-medium text-center my-4">
              Here are the principles that shape every line of code we ship:
            </p>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 mt-10 lg:mt-30 gap-10  lg:gap-10 lg:px-10">
              {section2.map((items, index) => (
                <div
                  key={index}
                  className="px-5 py-10 lg:p-15 bg-white  rounded-xl border-2 border-slate-200 lg:border-none"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center flex-col lg:flex-row lg:items-start  gap-5 ">
                    <div
                      className={`p-6 rounded-lg flex items-center justify-center ${items.color}`}
                    >
                      <items.icons className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-lg text-center lg:text-start font-bold mb-2">
                        {items.title}
                      </h2>
                      <p className="text-md text-center lg:text-start font-medium text-slate-500">
                        {items.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className=" absolute top-[50%] right-[12%] -translate-x-1/2 -translate-y-1/2 w-120 h-120  rounded-full bg-linear-to-br from-rose-600/80 via-amber-300/20 to-violet-500/40 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>
      {/* Feature Slider  */}
      <section data-aos="fade-up">
        <div className="relative mx-auto py-10 lg:py-20">
          <div className="container mx-auto px-6 py-4 lg:py-20 lg:px-10">

            <h2 className="text-xl lg:text-3xl font-bold text-center" data-aos="fade-down">
              AI that supports you at every step
            </h2>
          </div>

          <div className="my-10 mx-auto w-full lg:my-20 container lg:w-screen relative overflow-x-hidden">
            <Features_Slider FeturesData={FeturesData} />
          </div>
          <div className=" absolute top-1/2  lg:-translate-y-[30%] w-full h-[20%] bg-emerald-500/20 blur-3xl" />
        </div>
      </section>
      {/* tab section features */}
      <section className=" pb-10 lg:pb-20 " data-aos="fade-up">
        <div className="hidden lg:block container mx-auto ">
          {FeturesData.map((feature, index) => (
            <div
              key={index}
              className="px-6 lg:px-40 mx-auto mb-30"
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 80, 400)}
            >
              <div className="flex items-center gap-8 mb-10">
                <div className={`w-fit p-4 bg-linear-to-br ${feature.colorclass} rounded-lg shadow-lg shadow-rose-400/20`}>
                  <feature.Icons className={`w-10 h-10 ${feature.textColor}`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-3xl font-bold">
                    {feature.label}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">{feature.para}</p>
                </div>
              </div>
              <div className="flex items-start w-full justify-between gap-6">
                <div className="w-[40%]">
                  <ul className="flex flex-col gap-4">
                    {
                      feature.children.map((featchild, i) => (
                        <li key={`${feature.key}-${i}`} onClick={() => setSelectedFeature((prev) => ({ ...prev, [feature.key]: `${feature.key}-${i}` }))} className={`p-4 cursor-pointer rounded-lg transition-all duration-300 ${selectedFeature[feature.key as FeatureKey] === feature.key + "-" + i ? `border-l-4 border-slate-600 bg-slate-100/50 shadow-md` : `hover:bg-slate-100/30 border-l-4 border-transparent hover:shadow-sm`}`}>
                          <div className="flex flex-col gap-0.5">
                            <h2 className={`text-lg transition-all duration-300 ${selectedFeature[feature.key as FeatureKey] === feature.key + "-" + i ? `font-bold text-slate-900` : `font-medium text-slate-700 group-hover:text-slate-900`}`}>
                              {featchild.label}

                            </h2>
                            <p className={`text-sm font-medium transition-all duration-500 ease-in-out transform ${selectedFeature[feature.key as FeatureKey] === feature.key + "-" + i ? `text-slate-600 opacity-100 max-h-20 visible` : `text-slate-500 opacity-0 max-h-0 hidden`}`}>
                              {featchild.para}
                            </p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className={`p-10 rounded-md w-[70%] h-[32rem] ${feature.primarycolor}`}>

                  <img
                    key={selectedFeature[feature.key as FeatureKey]}
                    src={
                      feature.children.find(
                        (_, i) => `${feature.key}-${i}` === selectedFeature[feature.key as FeatureKey]
                      )?.img
                    }
                    alt=""
                    className={`
    shadow-lg
    rounded-md
    w-full
    animate__animated
    animate__fadeIn
   ${feature.secondryColor}
  `}

                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section  */}
      <section
        className="py-10 lg:py-30 lg:px-10 bg-emerald-300/30"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-4 lg:px-30 ">
          <div className="mb-8 lg:mb-30" data-aos="zoom-in">
            <h2 className="text-xl lg:text-3xl font-bold capitalize text-center"> Impact stories from our users worldwide</h2>
            <p className="text-center text-md mt-4 text-slate-600 font-medium">5M+ users across the globe are saving time, reducing stress, and learning faster with Mindgrasp AI Study tool.</p>
          </div>

          <div>
            <Testimonial />
          </div>
        </div>
      </section>

      {/* FAQ section  */}
      <section className="py-10 lg:py-30 lg:px-10" data-aos="fade-up">
        <div className="container mx-auto px-6 lg:px-30 ">
          <div className="mb-10 lg:mb-30" data-aos="fade-down">
            <h2 className="text-xl lg:text-3xl font-bold capitalize text-center">Frequently asked questions (FAQ)</h2>
          </div>
          <div>
            {faqData.map((data, index) => (
              <FAQ key={index} data={data} index={index} faqopen={faqopen} setFaqOpen={setFaqOpen} />
            ))}
          </div>
        </div>
      </section>
      {/* call to Action  */}
      <section
        className="py-10 lg:py-20 lg:px-10 bg-teal-800 overflow-hidden"
        data-aos="zoom-in"
        data-aos-duration="900"
      >
        <div className="container mx-auto lg:px-30 ">
          <div className="flex items-center flex-col lg:flex-row gap-4 lg:px-20">
            <div className="flex flex-col gap-5 lg:gap-6 text-start px-4 w-full lg:w-[70%]">
              <h2 className="text-center lg:text-left text-2xl lg:text-4xl lg:pr-10 font-medium text-white tracking-wide">
                Your next study session can be smarter.
              </h2>
              <p className="text-lg text-white text-center lg:text-left">
                Turn lectures, readings, and links into a complete AI study system in minutes.
              </p>
             <Link to={"/register"}> <button type="button" className="cursor-pointer w-fit mx-auto lg:mx-0 flex items-center gap-4 border-2 px-4 py-2 text-lg font-medium rounded border-white text-white
              hover:bg-linear-to-br hover:from-emerald-400 hover:to-teal-600 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-400/20 transition-all duration-500 ease-in-out
              ">
                Create Free Study Session
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button></Link>
            </div>
            <div className="relative mx-auto lg:mx-0 w-full lg:w-[40%]">
              <img src="./AI_ASSISTANT.svg" className="block lg:hidden mx-auto mt-10" />
              <img src="./AI_ASSISTANT.svg" className="hidden lg:block absolute w-[900px] -top-15  z-20  " />
              <img src="./AI_ASSISTANT.svg" className="hidden lg:block absolute w-[700px] z-10 -top-25 left-10 opacity-20" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

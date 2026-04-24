import React, { useState } from "react";
import { useParams } from "react-router";
import { explainConcept, generateSummary } from "../../Services/aiServices";
import toast from "react-hot-toast";
import { BookOpen, Lightbulb, Sparkles } from "lucide-react";
import Modal from "../common/Modal";
import MarkdownRender from "../common/MarkdownRender";

const AI_Action = () => {
  const { id: documentId } = useParams();

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTile] = useState("");
  const [concept, setConcept] = useState("");

  const handleGenerateSummary = async () => {
    setLoadingAction("summary");

    try {
      const response = await generateSummary(documentId!);
      setModalTile("Generated Summary");
      setModalContent(response.data.summary);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleExplationConcept = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!concept.trim()) {
      toast.error("Please enter a concept to explain.");
      return;
    }

    try {
      const resonse = await explainConcept(documentId!, concept);
      setModalContent(resonse.data.explanation);
      setModalTile(`Explanation for "${concept}"`);
      setIsModalOpen(true);
      setConcept("");
    } catch (error) {
      toast.error("Failed to explain concept. Please try again.");
      console.log(error);
    } finally {
      //  setLoadingAction(null);
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-br form-slate-50/50 to-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-600 shadow-lg shadow-purple-500/25 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-md font-semibold text-slate-900">
                AI Assistant
              </h3>
              <p className="text-xs text-slate-500">Powered by advanced AI</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Generate Summary  */}
          <div className="group p-5 bg-linear-to-br from-slate-50/50 to-white rounded-xl border border-slate-200/60 hover:bg-white hover:border-slate-300/60 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <BookOpen
                      className="w-4 h-4 text-blue-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h4 className="font-semibold text-slate-900">
                    Generate Summary
                  </h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get a concise summary of the entrire document.
                </p>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={loadingAction === "summary"}
                className="shrink-0 py-3 px-5 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-500 text-sm font-semibold 
                shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loadingAction === "summary" ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </span>
                ) : (
                  "Summarize"
                )}
              </button>
            </div>
          </div>
          {/* Explain Concept  */}

          <div className="group p-5 bg-linear-to-br from-slate-50/50 to-white rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:shadow-md transition-all duration-300">
            <form onSubmit={handleExplationConcept}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  <Lightbulb
                    className="w-5 h-5 text-amber-600"
                    strokeWidth={2}
                  />
                </div>
                <h2 className="font-semibold text-slate-900">
                  Explain a Concept
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Exter a Topic or concept from the document to get a detailed
                explanation.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="e.g., 'React Hooks'"
                  className="flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-300 focus-within:outline-emerald-500 focus:border-emerald-500 focus:shadow-lg focus: shadow-purple-500/10"
                />
                <button
                  type="submit"
                  disabled={loadingAction === "explain" || !concept.trim()}
                  className="shrink-0 py-3 px-5 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-500 text-sm font-semibold 
                shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loadingAction === "explain" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading...
                    </span>
                  ) : (
                    "Explain"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Result Modal  */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <div className="max-h-[60vh] overflow-y-auto prose prose-sm max-w-none prose-slate">
          <MarkdownRender content={modalContent} />
        </div>
      </Modal>
    </>
  );
};

export default AI_Action;

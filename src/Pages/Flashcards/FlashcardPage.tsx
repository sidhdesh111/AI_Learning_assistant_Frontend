import { useNavigate } from "react-router";
import type { FlashcardSet, DocumentRef } from "../../types/FlashcardType";
import { BookOpen, Clock, TrendingUp, Trash2, Sparkles } from "lucide-react";
import moment from "moment";

type flashcardPageProps = {
  flashcard?: FlashcardSet;
  onDelete?: (set: FlashcardSet) => void;
};


const FlashcardPage = (props: flashcardPageProps) => {
  const navigate = useNavigate();

  if (!props.flashcard) {
    return null;
  }

  console.log(props.flashcard);
  

  // Handle both string and DocumentRef types for documentId
  const getDocumentId = (): string => {
    const docId = props.flashcard!.documentId;
    if (typeof docId === "string") {
      return docId;
    }
    return (docId as DocumentRef)._id;
  };

  const getDocumentTitle = (): string => {
    const docId = props.flashcard!.documentId;
    if (typeof docId === "string") {
      return "Untitled Document";
    }
    return (docId as DocumentRef).title || "Untitled Document";
  };

  const handleStudyNow = () => {
    navigate(`/flashcards/${props.flashcard?._id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (props.onDelete && props.flashcard) {
      props.onDelete(props.flashcard);
    }
  };

  const reviewedCount =
    props.flashcard.cards?.filter((card) => card.reviewCount > 0).length ?? 0;
  const totalCards = props.flashcard.cards?.length ?? 0;
  const progressPercentage =
    totalCards > 0 ? Math.round((reviewedCount / totalCards) * 100) : 0;

  return (
    <div
      onClick={handleStudyNow}
      className="group relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="shrink-0 w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 pointer-events-auto"
            onClick={handleDelete}
            type="button"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <h3
          className="text-base font-semibold text-slate-900 truncate mb-2"
          title={getDocumentTitle()}
        >
          {getDocumentTitle()}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg">
            <BookOpen
              className="w-3.5 h-3.5 text-emerald-600"
              strokeWidth={2}
            />
            <span className="text-xs font-semibold text-emerald-700">
              {totalCards} {totalCards === 1 ? "card" : "cards"}
            </span>
          </div>
          {reviewedCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg">
              <TrendingUp
                className="w-3.5 h-3.5 text-emerald-600"
                strokeWidth={2}
              />
              <span className="text-xs font-semibold text-emerald-700">
                {progressPercentage}%
              </span>
            </div>
          )}
        </div>

        {totalCards > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600">
                Progress
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {reviewedCount}/{totalCards} reviewed
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-1.5 text-xs text-slate-500 ">
          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Created {moment(props.flashcard.createdAt).fromNow()}</span>
        </div>

        <div className="mt-4 border-t pt-4 border-slate-200">
          <button className="group/btn relative w-full h-11 bg-linear-to-br bg-emerald-50 bg-teal-100 hover:from-emerald-600 hover:to-teal-600 text-emerald-700 hover:text-white font-medium text-md rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-500/25">
            <span className="relative flex items-center z-10 justify-center gap-2">
              <Sparkles className="w-5 h-5" strokeWidth={2} />
              Study
              
            </span>
          </button>
        </div>
      </div>

      {/* <button className="group/btn relative w-full h-11 bg-linear-to-br bg-emerald-50 bg-teal-100 hover:from-emerald-600 hover:to-teal-600 text-emerald-700 hover:text-white font-medium text-md rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-500/25 ">
          <span className="relative flex items-center z-10 justify-center gap-2">
            <Sparkles className="w-5 h-5" strokeWidth={2} />
            Study
          </span>

          <div className=" absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full trnasition-transform duration-700" />
        </button> */}

      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default FlashcardPage;

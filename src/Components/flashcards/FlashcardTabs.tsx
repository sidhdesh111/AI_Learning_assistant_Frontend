import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import {
  deleteFlashcardSet,
  getFlashcardsForDocument,
  reviewFlashcard,
  toggleFlashcardStar,
} from "../../Services/flashcardServices";
import type {
  FlashcardSet,
  GetFlashcardsResponse,
} from "../../types/FlashcardType";
import toast from "react-hot-toast";
import { generateFlashcards } from "../../Services/aiServices";
import Spin_loader from "../Loader/Spin_loader";
import {
  ArrowLeft,
  Brain,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import moment from "moment";
import Modal from "../common/Modal";
import Flashcard from "./Flashcard";

type FlashcardPropsType = {
  documentId: string | undefined;
};

const FlashcardTabs = (props: FlashcardPropsType) => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [genrating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
 const [setToDelete, setSetToDelete] = useState<FlashcardSet | null>(null);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    try {
      const response: GetFlashcardsResponse = await getFlashcardsForDocument(
        props.documentId as string,
      );

      setFlashcardSets(response.data);
    } catch (error) {
      toast.error("Failed to fetch flashcard sets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.documentId) {
      fetchFlashcardSets();
    }
  }, [props.documentId]);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      await generateFlashcards(props.documentId as string, 30);
      toast.success("FLashcards generated successfully!");
      fetchFlashcardSets();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "failed to generate flashcards.");
    } finally {
      setGenerating(false);
    }
  };

  const handleNextCard = () => {
    if (selectedSet) {
      const currentCard = selectedSet.cards[currentCardIndex];
      if (currentCard) {
        handleReview(currentCard._id);
      }
      setCurrentCardIndex(
        (prevIndex) => (prevIndex + 1) % selectedSet.cards.length,
      );
    }
  };

  const handlePrevCard = () => {
    if (selectedSet) {
      const currentCard = selectedSet.cards[currentCardIndex];
      if (currentCard) {
        handleReview(currentCard._id);
      }
      setCurrentCardIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length,
      );
    }
  };

  const handleReview = async (cardId: string) => {
    try {
      await reviewFlashcard(cardId, true);
      console.log(`Card ${cardId} reviewed`);
    } catch (error) {
      console.error("Failed to review flashcard:", error);
    }
  };

  const handleToggleStar = async (cardId: string) => {
    if (!selectedSet) return;

    try {
      await toggleFlashcardStar(cardId);
      const updatedSets = flashcardSets.map((set) => {
        if (set._id === selectedSet._id) {
          const updatedCards = set.cards.map((card) =>
            card._id === cardId
              ? { ...card, isStarred: !card.isStarred }
              : card,
          );
          return { ...set, cards: updatedCards };
        }
        return set;
      });
      setFlashcardSets(updatedSets);
      setSelectedSet(
        updatedSets.find((set) => set._id === selectedSet._id) || null
      );
      toast.success("Flashcard starred Status updated!");
    } catch (error) {
      toast.error("Failed to update star Status.");
    }
  };

  const handleDeleteRequest = (e: MouseEvent, set: FlashcardSet) => {
    e.stopPropagation();
    setSetToDelete(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!setToDelete) return null;

    setDeleting(true);
    try {
      const flashcard_id: string = setToDelete._id as string;
      await deleteFlashcardSet(flashcard_id);
      toast.success("Flashcard Set Deleted Successfully!");
      setIsDeleteModalOpen(false);
      setSetToDelete(null);
      fetchFlashcardSets();
    } catch (error) {
      toast.error( error instanceof Error ? error.message :"Failed to delete Flashacard set." );
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectSet = (set: FlashcardSet) => {
    setSelectedSet(set);
    setCurrentCardIndex(0);
  };

  const renderFlashcardViewer = () => {
    if (!selectedSet) {
      return null;
    }

    const currentCard = selectedSet.cards[currentCardIndex];

    // Debug logging
    console.log("Current Set:", selectedSet._id);
    console.log("Total Cards in Set:", selectedSet.cards.length);
    console.log("Current Card Index:", currentCardIndex);
    console.log("Current Card:", {
      id: currentCard?._id,
      question: currentCard?.question,
      answer: currentCard?.answer,
    });
    console.log("All Cards:", selectedSet.cards.map((card, idx) => ({
      idx,
      question: card.question.substring(0, 50) + "...",
    })));

    return (
      <div className="space-y-8">
        <button
          onClick={() => setSelectedSet(null)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-500 transition-color duration-300"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 trnasition-transform duration-300"
            strokeWidth={2}
          />
          Back to Sets
        </button>

        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-2xl">
            <Flashcard
              flashcard={currentCard}
              onToggleStar={handleToggleStar}
            />
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevCard}
              disabled={selectedSet.cards.length <= 1}
              className="group flex items-center gap-2 px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
            >
              <ChevronLeft
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300"
                strokeWidth={2}
              />
              Previous
            </button>

            <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-sm font-semibold text-slate-700">
                {currentCardIndex + 1}{" "}
                <span className="text-slate-500 font-normal mr-1">/</span>
                {selectedSet.cards.length}
              </span>
            </div>
            <button
              onClick={handleNextCard}
              disabled={selectedSet.cards.length <= 1}
              className="group flex items-center gap-2 px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
            >
              Next
              <ChevronRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSetList = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Spin_loader width={20} height={20} color="green" />
        </div>
      );
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-200 to-teal-400 mb-6">
            <Brain className="w-8 h-8 text-emerald-700" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No Flashcards Yet
          </h3>
          <p className="text-sm text-slate-500 mb-8 text-center max-w-sm">
            Generate flashcards from your document to start learning and
            reinforce your knowledge.
          </p>
          <button
            onClick={handleGenerateFlashcards}
            disabled={genrating}
            className="group inline-flex items-center gap-2 px-6 h-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-teal-500 hover:to-emerald-500
        text-white font-semibold text-sm rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {genrating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" strokeWidth={2} />
                Generate Flashcards
              </>
            )}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex  items-center justify-between">
          <div className="text-lg font-semibold text-slate-900">
            <h3>Your Flashcard Sets</h3>
            <p className="text-sm text-slate-500 mt-1 capitalize">
              <span className="mr-0.5">{flashcardSets.length}</span>
              {""}
              {flashcardSets.length === 1 ? "Set" : "Sets"} available
            </p>
          </div>
          <button
            onClick={handleGenerateFlashcards}
            disabled={genrating}
            className="group inline-flex items-center gap-2 px-5 h-11 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:from-teal-500 hover:to-emerald-500 shadow-lg shadow-slate-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {genrating ? (
              <>
                <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                Generate New Set
              </>
            )}
          </button>
        </div>
        {/* Flashcard Sets Grid  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcardSets.map((set) => (
            <div
              key={set._id}
              onClick={() => handleSelectSet(set)}
              className="group relative bg-white/80 backdrop-blur-xl border-2 border-slate-200 hover:border-emerald-300 rounded-2xl p-6 cursor-pointer transition-all duration-300"
            >
              <button
                className=" absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 bg-rose-50 rounded-lg trnasition-all duration-200 opacity-0 group-hover:opacity-100"
                onClick={(e) => handleDeleteRequest(e, set)}
              >
                <Trash2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
              {/* set Content  */}

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100">
                  <Brain className="w-6 h-6 text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-base font-semibold text-slate-900 mb-1">
                    Flashcard Set 
                  </h4>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Created {moment(set.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="text-sm font-semibold text-emerald-800">
                      {set.cards.length}{" "}
                      {set.cards.length === 1 ? "card" : "cards"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-4">
        {selectedSet ? renderFlashcardViewer() : renderSetList()}
      </div>

      {/* Deleting Confirmation Modal */}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Flashcard Set?"
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this flashcard set? This action
            cannot be undone and all cards will be permanently removed.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleting}
              className="px-5 h-11 bg-slate-200 hover:bg-slate-400 hover:text-white rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="px-5 h-11 bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 shadow-lg shadow-purple-300/40 hover:shadow-rose-400/40 hover:to-rose-500 rounded-xl font-semibold text-white cursor-pointer disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-300"
            >
              {deleting ? (
                <span>
                  <div className="" />
                  Deleting...
                </span>
              ) : (
                "Delete Set"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlashcardTabs;

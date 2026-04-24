import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { FlashcardSet } from "../../types/FlashcardType";
import Flashcard from "../../Components/flashcards/Flashcard";
import { reviewFlashcard, getFlashcardSetById, toggleFlashcardStar } from "../../Services/flashcardServices";
import toast from "react-hot-toast";
import Spin_loader from "../../Components/Loader/Spin_loader";

const FlashcardDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getFlashcardSetById(id);
          if (response.data && response.data.length > 0) {
            setSelectedSet(response.data[0]);
          } else {
            toast.error("Flashcard set not found");
            navigate("/flashcards");
          }
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load flashcard set");
        navigate("/flashcards");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSet();
  }, [id, navigate]);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [selectedSet]);

  const handleOnBack = () => {
    navigate("/flashcards");
  };

  const handleToggleStar = async (cardId: string) => {
    if (!selectedSet) return;

    try {
      await toggleFlashcardStar(cardId);
      const updatedCards = selectedSet.cards.map((card) =>
        card._id === cardId
          ? { ...card, isStarred: !card.isStarred }
          : card,
      );
      setSelectedSet({ ...selectedSet, cards: updatedCards });
      toast.success("Flashcard starred status updated!");
    } catch (error) {
      toast.error("Failed to update star status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Spin_loader width={60} height={60} color="green" />
      </div>
    );
  }

  if (!selectedSet) {
    return null;
  }

  const currentCard = selectedSet.cards[currentCardIndex];

  const handleReview = async (index: number) => {
    setIsReviewing(true);
    try {
      await reviewFlashcard(currentCard._id, index);
      toast.success("Flashcard reviewed!");
    } catch (error) {
      toast.error("Failed to review flashcard.");
    } finally {
      setIsReviewing(false);
    }
  };

  const handleNextCard = async () => {
    if (selectedSet) {
      await handleReview(currentCardIndex);
      setCurrentCardIndex(
        (prevIndex) => (prevIndex + 1) % selectedSet.cards.length,
      );
    }
  };

  const handlePrevCard = async () => {
    if (selectedSet) {
      await handleReview(currentCardIndex);
      setCurrentCardIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length,
      );
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-8">
      <div className="space-y-8">
        <button
          onClick={handleOnBack}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-500 transition-color duration-300"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
            strokeWidth={2}
          />
          Back to Sets
        </button>

        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-2xl">
            <Flashcard flashcard={currentCard} onToggleStar={handleToggleStar} />
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevCard}
              disabled={selectedSet.cards.length <= 1 || isReviewing}
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
              disabled={selectedSet.cards.length <= 1 || isReviewing}
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
    </div>
  );
};

export default FlashcardDisplay;

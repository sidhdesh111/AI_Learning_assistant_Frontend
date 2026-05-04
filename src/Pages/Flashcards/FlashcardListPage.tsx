import { useEffect, useState } from "react";
import { getALLFlashcards, deleteFlashcardSet } from "../../Services/flashcardServices";
import toast from "react-hot-toast";
import type { FlashcardSet, DocumentRef } from "../../types/FlashcardType";
import Spin_loader from "../../Components/Loader/Spin_loader";
import { BookOpen, Trash2, X } from "lucide-react";
import FlashcardPage from "./FlashcardPage";

const FlashcardListPage = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);

  const fetchFlashcardSets = async () => {
    try {
      setLoading(true);
      const response = await getALLFlashcards();
      console.log(response);
      
      setFlashcardSets(response.data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch Flashcards.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcardSets();
  }, []);

  const getDocumentTitle = (docId: string | DocumentRef): string => {
    if (typeof docId === "string") {
      return "Untitled Document";
    }
    return (docId as DocumentRef).title || "Untitled Document";
  };

  const handleDeleteRequest = (set: FlashcardSet) => {
    setSelectedSet(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSet) return;
    setDeleting(true);
    try {
      await deleteFlashcardSet(selectedSet._id);
      setIsDeleteModalOpen(false);
      toast.success("Flashcard set deleted successfully.");
      fetchFlashcardSets();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete flashcard set.");
    } finally {
      setDeleting(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[80vh]">
          <Spin_loader width={60} height={60} border={5} color="green" />
        </div>
      );
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-lg shadow-slate-200/50 mb-6">
              <BookOpen className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
              No Flashcard Sets Yet
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              You haven't generated any flashcards yet. Go to a document to create your first flashcard set.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {flashcardSets.map((set) => (
          <FlashcardPage 
            key={set._id} 
            flashcard={set}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px, trnasparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* header */}
        <div className="mb-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
              My Flashcard Sets
            </h1>
            <p className="text-slate-500 text-sm">
              Review and manage your learning flashcards
            </p>
          </div>
        </div>
        {renderContent()}
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-xl shadow-2xl shadow-slate-900/60 p-6">
            {/* close Button for Delete Flashcard */}
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 transition-all duration-300"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            {/* modal Header */}
            <div className="mb-6">
              <div className="w-14 h-14 rounded-xl bg-linear-to-r from-red-100 to-red-300 flex items-center justify-center mb-4 shadow-lg shadow-red-200/50">
                <Trash2 className="w-8 h-8 text-red-700" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-medium text-slate-900 tracking-tight">
                Confirm Delete
              </h2>
            </div>
            {/* Content */}
            <p className="text-md text-slate-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {selectedSet ? getDocumentTitle(selectedSet.documentId) : "this flashcard set"}
              </span>
              ? This action cannot be undone.
            </p>

            {/* Action Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
                className="flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 h-11 px-4 rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardListPage;

import React, { useEffect, useState } from "react";
import type { Quiz } from "../../types/AIServiesTypes";
import { deleteQuiz, getQuizById, getQuizzesByDocId } from "../../Services/quizServices";
import toast from "react-hot-toast";
import { generateQuiz } from "../../Services/aiServices";
import Button from "../Loader/Button";
import { Plus } from "lucide-react";
import Spin_loader from "../Loader/Spin_loader";
import EmptyState from "../common/EmptyState";
import QuizCard from "./QuizCard";
import Modal from "../common/Modal";

type QuizPropsType = {
  documentId: string | undefined;
};

type QuizResponse = {
  success: boolean;
  data: Quiz;
  message?: string;
  count?: number;
};

const Quiz_Tab = (props: QuizPropsType) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] =
    useState<boolean>(false);
  const [numQuestions, setNumQuestion] = useState<number>(30);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [selectedQuiz, setSeletedQuiz] = useState<Quiz | null>(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getQuizzesByDocId(props.documentId as string);
      setQuizzes(data.data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch quizzes.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.documentId) {
      fetchQuizzes();
    }
  }, [props.documentId]);

  const handleGenerateQuiz = async (e: any) => {
    e.preventDefault();
    setGenerating(true);

    try {
      await generateQuiz(props.documentId, numQuestions);
      toast.success("Quiz generated Successfully!.");
      setIsGenerateModalOpen(false);
      fetchQuizzes();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to genrate quiz.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteRequest = (quiz: any) => {
    setSeletedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedQuiz) return;
    setDeleting(true);
    try {
      await deleteQuiz(selectedQuiz._id);
      toast.success(`${selectedQuiz.title || "Quiz"} deleted.`);
      setIsDeleteModalOpen(false);
      setSeletedQuiz(null);
      setQuizzes(quizzes.filter((q) => q._id !== selectedQuiz._id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  const renderQuizContent = () => {
    if (loading) {
      return (
        <div className="w-full flex items-center justify-center max-h-[70vh] h-[40vh]">
          <Spin_loader width={40} height={40} />
        </div>
      );
    }

    if (quizzes.length == 0) {
      return (
        <EmptyState
          title="No Quizzes Yet"
          description="Generate a quiz from your document to test your knowledge"
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} onDelete={handleDeleteRequest} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={() => setIsGenerateModalOpen(true)}>
          <Plus size={16} />
          Generate Quiz
        </Button>
      </div>
      {renderQuizContent()}

      {/* Generate Question  */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate New Quiz"
      >
        <form onSubmit={handleGenerateQuiz} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-neutral-700 mb-2"
              htmlFor="qt-1a"
            >
              Number of Questions
            </label>
            <input
              id="qt-1a"
              type="number"
              value={numQuestions}
              onChange={(e) =>
                setNumQuestion(Math.max(1, parseInt(e.target.value) || 30))
              }
             
              required
              className="w-full h-9 px-3 border border-neutral-200 rounded-lg bg-white text-sm text-neutral-900 placeholder-neutral-500
              transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus-within:outline-emerald-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsGenerateModalOpen(false)}
              disabled={generating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={generating}>
              {generating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confimation  */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Quiz"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Are you sure what to delete the Quiz:{" "}
            <span className="font-semibold text-neutral-900">
              {selectedQuiz?.title || "this quiz"}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-600"
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Quiz_Tab;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getDocumentById } from "../../Services/documentService";
import type { DocumentWithMeta } from "../../types/DocumentType";
import Spin_loader from "../../Components/Loader/Spin_loader";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../../Components/common/PageHeader";
import Tabs from "../../Components/common/Tabs";
import ChatInterface from "../../Components/chat/ChatInterface";
import AI_Action from "../../Components/AI_Action/AI_Action";
import FlashcardTabs from "../../Components/flashcards/FlashcardTabs";
import Quiz_Tab from "../../Components/quizzes/Quiz_Tab";

type DocumentResponseType = {
  data: DocumentWithMeta;
  success: boolean;
  message?: string;
};

type TabType = {
  name: string;
  label: string;
  content: React.ReactNode;
}[];

const DocumentDetailPage = () => {
  const { id } = useParams();
  const [document, setdocument] = useState<DocumentResponseType | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [activeTab, setactiveTab] = useState("Content");

  useEffect(() => {
    const fetchdocumentDetails = async () => {
      try {
        const response: DocumentResponseType = await getDocumentById(id!);
        console.log(response);
        setdocument(response);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchdocumentDetails();
  }, [id]);

  const getPDFUrl = () => {
    if (!document?.data?.filePath) return null;

    const filePath = document.data.filePath;
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

    return `${baseUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <Spin_loader width={60} height={60} border={5} color="green" />
        </div>
      );
    }

    if (!document?.data || !document?.data?.filePath) {
      return <div className="text-center p-8">PDF Document not found.</div>;
    }

    const pdfUrl: string | null = getPDFUrl();
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50">
          <span className="text-sm font-medium text-gray-700">
            Document Viewer
          </span>
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            to={`${pdfUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} /> Open in New Tab
          </Link>
        </div>
        <div className="bg-gray-100 p-1">
          <iframe
            src={pdfUrl!}
            title="Document Viewer"
            className="w-full h-[70vh] rounded border border-gray-300"
            style={{
              colorScheme: "light",
            }}
          />
        </div>
      </div>
    );
  };

  const renderChat = () => {
    return <ChatInterface />;
  };

  const renderAIActions = () => {
    return <AI_Action />;
  };

  const renderFlashcardsTab = () => {
    return <FlashcardTabs documentId={id} />;
  };

  const renderQuizzesTab = () => {
    return <Quiz_Tab documentId={id} />;
  };

  const tabs: TabType = [
    { name: "Content", label: "Content", content: renderContent() },
    { name: "Chat", label: "Chat", content: renderChat() },
    { name: "Flashcards", label: "Flashcards", content: renderFlashcardsTab() },
    { name: "Quizzes", label: "Quizzes", content: renderQuizzesTab() },
    { name: "AI Actions", label: "AI Actions", content: renderAIActions() },
  ];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Spin_loader width={60} height={60} border={5} color="green" />
      </div>
    );
  }

  if (!document || !document.data) {
    return <div className="text-center p-8">Document not found.</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          to={"/documents"}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Documents
        </Link>
      </div>
      <PageHeader title={document.data.title} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setactiveTab} />
    </div>
  );
};

export default DocumentDetailPage;

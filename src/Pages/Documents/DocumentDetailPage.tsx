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
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/ApiPaths";

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

/**
 * Loads the PDF through the API (Bearer token) so the iframe does not open
 * a separate origin URL like /uploads/... (which can show "refused to connect" in production).
 * If the document is on Cloudinary, the API redirects and axios still returns a PDF blob.
 */
const DocumentPdfViewer = ({
  doc,
  documentId,
}: {
  doc: DocumentWithMeta;
  documentId: string;
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(true);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    const load = async () => {
      setPdfLoading(true);
      setLoadError(null);
      setSrc(null);

      if (
        doc.cloudinaryUrl &&
        /^https?:\/\//i.test(doc.cloudinaryUrl.trim())
      ) {
        setSrc(doc.cloudinaryUrl.trim());
        setPdfLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get<Blob>(
          API_PATHS.DOCUMENTS.GET_DOCUMENT_FILE(documentId),
          { responseType: "blob" },
        );
        if (cancelled) return;
        if (!data || data.size === 0) {
          setLoadError("PDF file is empty or missing on the server.");
          return;
        }
        const type = data.type || "";
        if (
          type.includes("json") ||
          (type &&
            !type.includes("pdf") &&
            type !== "application/octet-stream")
        ) {
          setLoadError("The server did not return a valid PDF.");
          return;
        }
        objectUrl = URL.createObjectURL(data);
        setSrc(objectUrl);
      } catch {
        if (!cancelled) {
          setLoadError(
            "Could not load the document. Check that the API is reachable and that the file still exists on the server.",
          );
        }
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentId, doc.cloudinaryUrl, doc.filePath]);

  if (pdfLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spin_loader width={60} height={60} border={5} color="green" />
      </div>
    );
  }

  if (loadError || !src) {
    return (
      <div className="text-center p-8 text-neutral-600 max-w-lg mx-auto">
        {loadError ?? "PDF unavailable."}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50">
        <span className="text-sm font-medium text-gray-700">
          Document Viewer
        </span>
        <a
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} /> Open in New Tab
        </a>
      </div>
      <div className="bg-gray-100 p-1">
        <iframe
          src={src}
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

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <Spin_loader width={60} height={60} border={5} color="green" />
        </div>
      );
    }

    if (
      !document?.data ||
      (!document.data.filePath && !document.data.cloudinaryUrl)
    ) {
      return <div className="text-center p-8">PDF Document not found.</div>;
    }

    return (
      <DocumentPdfViewer doc={document.data} documentId={id!} />
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
    <div data-aos="fade-up" data-aos-duration="650">
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

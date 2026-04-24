import { useEffect, useState } from "react";
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "../../Services/documentService";
import toast from "react-hot-toast";
import type { Document, DocumentWithMeta } from "../../types/DocumentType";
import Button from "../../Components/Loader/Button";
import { FileText, Plus, Trash2, Upload, X } from "lucide-react";
import Spin_loader from "../../Components/Loader/Spin_loader";
import DocumentCard from "../../Components/documents/DocumentCard";

const DocumentList = () => {
  const [documents, setdocuments] = useState<DocumentWithMeta[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  const [isUploadModalOpen, setisUploadModalOpen] = useState<boolean>(false);

  const [uploadFile, setuploadFile] = useState<File | null>(null);
  const [uploadTitle, setuploadTitle] = useState("");

  const [uploading, setuploading] = useState<boolean>(false);
  const [isDragActive, setisDragActive] = useState<boolean>(false);

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);
  const [deleting, setdeleting] = useState<boolean>(false);
  const [selectedDoc, setselectedDoc] = useState<Document | null>(null);

  const fetchDocument = async () => {
    try {
      setloading(true);
      const response = await getDocuments();
      console.log(response);
      setdocuments(response.data);
    } catch (error) {
      toast.error("Failed to fetch Documents.");
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Validate file type
    if (!file.type.includes("pdf")) {
      toast.error("Please select a PDF file");
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    setuploadFile(file);
    setuploadTitle(file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setisDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setisDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setisDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setisDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("Please provide a title and select a file.");
      return;
    }

    setuploading(true);
    const formData = new FormData();
    formData.append("document", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await uploadDocument(formData);
      toast.success("Document uploaded successfully!");
      
      // Reset all upload states
      setisUploadModalOpen(false);
      setuploadFile(null);
      setuploadTitle("");
      
      // Refresh documents list
      setloading(true);
      await fetchDocument();
    } catch (error: any) {
      console.error("Upload error:", error);
      
      // Extract error message
      let errorMessage = "Failed to upload document. Please try again.";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      
      toast.error(errorMessage);
      // Keep modal open on error so user can retry
    } finally {
      setuploading(false);
    }
  };

  const handleDeleteRequest = (doc: any) => {
    setselectedDoc(doc);
    setisDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;
    setdeleting(true);
    try {
      await deleteDocument(selectedDoc._id);
      setisDeleteModalOpen(false);
      toast.success(`${selectedDoc.title} deleted.`);
      setloading(true);
      await fetchDocument();
    } catch (error: any) {
      console.error("Delete error:", error);
      const errorMessage = error?.message || "Failed to delete document. Please try again.";
      toast.error(errorMessage);
    } finally {
      setdeleting(false);
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

    if (documents.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-lg shadow-slate-200/50 mb-6">
              <FileText className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
              No Documents Yet
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Get Started by uploading your First PDF document to begin
              learning.
            </p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
              onClick={() => setisUploadModalOpen(true)}
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className=" absolute inset-0 bg-[radial-gradient(#e5e7eb_1px, trnasparent_1px)] bg-size-[16px_16px] opacity-30  pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* header  */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
              My Documents
            </h1>
            <p className="text-slate-500 text-sm">
              Manage and organixe your learning materials
            </p>
          </div>
          {
            <Button onClick={() => setisUploadModalOpen(true)}>
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </Button>
          }
        </div>
        {renderContent()}
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl  border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-8">
            <button
              className=" absolute top-6 right-6 w-8 h-8 flex items-center justify-center  rounded-lg text-slate-400 hover:text-slate-700 transition-all duration-300"
              onClick={() => setisUploadModalOpen(false)}
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
            {/* modal Header  */}

            <div className="mb-6">
              <h2 className="text-xl font-medium text-slate-900 tracking-tight">
                Upload New Document
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Add a PDF document to your Library
              </p>
            </div>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Document Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setuploadTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="w-full  p-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-300 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:bg-emerald-500/10"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Document File
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-200/50"
                      : "border-slate-400 bg-slate-50/50 hover:border-emerald-500"
                  }`}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center py-10 px-6 gap-1 w-full">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-r from-emerald-200/50 to-teal-200/70 flex items-center justify-center mb-4">
                      <Upload
                        className="w-7 h-7 text-emerald-700"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-sm  font-medium text-slate-600 mb-1">
                      {uploadFile ? (
                        <span className="text-emerald-600">
                          File selected: {uploadFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-slate-500">
                            Click to upload
                          </span>{" "}
                          or Drag and Drop
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">PDF up to 10MB</p>
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setisUploadModalOpen(false)}
                  disabled={uploading}
                  className="flex-1 h-11 px-4 border-2 border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 h-11 px-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-xl shadow-2xl shadow-slate-900/60 p-6">
            {/* close Button for Delete Document  */}
            <button
              onClick={() => setisDeleteModalOpen(false)}
              className=" absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 transition-all duration-300"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            {/* modal Header  */}
            <div className="mb-6">
              <div className="w-14 h-14 rounded-xl bg-linear-to-r from-red-100 to-red-300 flex items-center justify-center mb-4 shadow-lg shadow-red-200/50">
                <Trash2 className="w-8 h-8 text-red-700" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-medium text-slate-900 tracking-tight">
                Confirm Delete
              </h2>
            </div>
            {/* Content  */}
            <p className="text-md text-slate-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {selectedDoc?.title}
              </span>
              ? This action cannot be undone.
            </p>

            {/* Action Button  */}
            <div className="flex gap-3">
              <button
                onClick={() => setisDeleteModalOpen(false)}
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

export default DocumentList;

import { FileText, Download, X } from "lucide-react";
import BaseModal from "./BaseModal";

const FileUploadModal = ({ isOpen, onClose, fileUrl, fileName }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Document Preview"
      className="sm:max-w-[800px]"
    >
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden min-h-[400px] flex items-center justify-center border border-slate-200 dark:border-slate-700">
        {/* In a real app, use an iframe for PDFs or <img> for receipts */}
        {fileUrl ? (
          <img src={fileUrl} alt="Receipt" className="max-w-full h-auto" />
        ) : (
          <div className="text-center space-y-2">
            <FileText size={48} className="mx-auto text-slate-400" />
            <p className="text-slate-500 font-medium">{fileName || "No document selected"}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs text-slate-400">Uploaded on March 24, 2024</p>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 transition">
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default FileUploadModal;
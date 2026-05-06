import { AlertTriangle, Loader2 } from "lucide-react";
import BaseModal from "./BaseModal";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, loading }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      description="This action is permanent and cannot be undone. All associated data will be removed from our servers."
      className="sm:max-w-[400px]"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-full text-rose-600 dark:text-rose-400">
          <AlertTriangle size={32} />
        </div>
        <p className="font-semibold text-slate-900 dark:text-white">
          Are you sure you want to delete <span className="text-rose-600">"{title}"</span>?
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Delete Permanently
        </button>
      </div>
    </BaseModal>
  );
};

export default DeleteConfirmModal;
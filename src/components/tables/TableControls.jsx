import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";

const TableControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <p className="text-xs font-medium text-slate-500">
        Showing Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 border rounded-lg hover:bg-slate-50 dark:border-slate-800 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 border rounded-lg hover:bg-slate-50 dark:border-slate-800 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TableControls;
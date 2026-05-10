import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { cn } from '../../lib/utils';

const FileUpload = ({ onUploadComplete, accept = "image/*,.pdf", maxSizeMB = 5 }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Connect to your notification store
  const addToast = useNotificationStore((state) => state.addToast);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // Validate size (MB to Bytes)
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      addToast({
        title: "File too large",
        message: `Maximum size allowed is ${maxSizeMB}MB.`,
        variant: "danger" // Matching your statusBadge variants
      });
      // Reset input so the same file can be attempted again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    simulateUpload(selectedFile);
  };

  const simulateUpload = (file) => {
    setUploading(true);
    // This simulates the XHR/Fetch request to your MERN backend or S3
    setTimeout(() => {
      setUploading(false);
      addToast({
        title: "Upload Successful",
        message: `${file.name} is ready.`,
        variant: "success"
      });
      if (onUploadComplete) onUploadComplete(file);
    }, 1500);
  };

  const clearFile = (e) => {
    e.stopPropagation(); // Prevent triggering the click on the parent div
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
          className={cn(
            "relative cursor-pointer group border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200",
            isDragging 
              ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10" 
              : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          )}
        >
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFile(e.target.files[0])}
            accept={accept}
          />
          
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG or PDF (max. {maxSizeMB}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[180px] md:max-w-[250px]">{file.name}</p>
              <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {uploading ? (
              <Loader2 size={18} className="animate-spin text-indigo-600" />
            ) : (
              <CheckCircle2 size={18} className="text-emerald-500" />
            )}
            <button 
              onClick={clearFile}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, CheckCircle2, AlertCircle } from 'lucide-react';

export interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  dataUrl?: string;
}

interface FileUploaderProps {
  files: UploadedFileItem[];
  onChange: (files: UploadedFileItem[]) => void;
  maxFiles?: number;
  maxSizeBytes?: number; // default 10MB
  accept?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onChange,
  maxFiles = 5,
  maxSizeBytes = 10 * 1024 * 1024,
  accept = '.csv, .xlsx, .xls, .pdf, .doc, .docx, .png, .jpg, .jpeg, .webp'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFiles = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const newFiles: UploadedFileItem[] = [...files];
    const incoming = Array.from(fileList);

    if (newFiles.length + incoming.length > maxFiles) {
      setErrorMessage(`You can upload a maximum of ${maxFiles} files per valuation submission.`);
      return;
    }

    for (const file of incoming) {
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds the 10MB size limit.`);
        continue;
      }

      const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const isImage = file.type.startsWith('image/');
      
      const fileItem: UploadedFileItem = {
        id: fileId,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined
      };

      // Read as Data URL for backend transmission if needed
      const reader = new FileReader();
      reader.onload = (e) => {
        fileItem.dataUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      newFiles.push(fileItem);
    }

    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    const updated = files.filter(f => f.id !== id);
    onChange(updated);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-100/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="text-xs">
            <span className="font-bold text-slate-800">Click to upload stock list or images</span>{' '}
            <span className="text-slate-500">or drag and drop</span>
          </div>

          <p className="text-[11px] text-slate-400">
            Supports CSV, Excel (.xlsx), PDF, PNG, JPG (Max 10MB each, up to {maxFiles} files)
          </p>
        </div>
      </div>

      {/* Validation Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* File List Preview */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>Attached Files ({files.length}/{maxFiles})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm text-xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                  )}

                  <div className="truncate">
                    <p className="font-medium text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{formatFileSize(item.size)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(item.id);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 ml-2"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

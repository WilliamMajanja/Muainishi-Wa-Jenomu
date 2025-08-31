import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: { name: string; size?: number } | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label htmlFor="file-upload" className="block text-lg font-semibold mb-2 text-brand-light">
        1. Upload Genome Sequence File
      </label>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex justify-center items-center w-full h-48 px-6 transition-all duration-300 border-2 border-dashed rounded-lg cursor-pointer
          ${isDragging ? 'border-brand-highlight bg-brand-accent/50' : 'border-brand-accent hover:border-brand-light bg-brand-secondary'}
        `}
      >
        <div className="text-center">
          {selectedFile ? (
            <>
              <p className="text-brand-text font-semibold">{selectedFile.name}</p>
              {selectedFile.size && (
                <p className="text-sm text-brand-light">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
              )}
               <p className="text-xs text-brand-light mt-4">Click or drag another file to replace.</p>
            </>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-brand-light" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-1 text-sm text-brand-light">
                <span className="font-semibold text-brand-highlight">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-brand-light mt-1">FASTA, VCF, FASTQ, etc.</p>
            </>
          )}
        </div>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
      </div>
    </div>
  );
};
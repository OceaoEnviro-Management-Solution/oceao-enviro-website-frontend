// FileUploadField.jsx — Optional file attachment component for the Feedback form.
// Supports 3 states: empty, file selected, error.
// Reusable — designed for Callback system too (per prompt spec).

import { useRef } from 'react';
import { validateFile } from '../../utils/fileValidation';
import { ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE } from '../../constants/feedbackTypes';

export default function FileUploadField({ file, onChange, error: externalError }) {
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const selected = e.target.files?.[0] || null;
    const validationError = validateFile(selected);
    onChange(selected, validationError);
    // Reset input so the same file can be re-selected after removal
    e.target.value = '';
  }

  function handleRemove() {
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label */}
      <label className="text-sm font-medium text-[#011539]/80">
        Attachment
        <span className="ml-1 text-[#011539]/40 font-normal">(Optional)</span>
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id="feedback-file-input"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Attach a file"
      />

      {/* File selected state */}
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#017119]/30 bg-[#E4F3E6]/50 px-4 py-3">
          <span className="text-lg" aria-hidden="true">📄</span>
          <span className="flex-1 text-sm text-[#011539] font-medium truncate">
            {file.name}
          </span>
          <span className="text-xs text-[#011539]/45">
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="ml-1 w-6 h-6 rounded-full bg-[#011539]/10 flex items-center justify-center text-[#011539]/60 hover:bg-red-100 hover:text-red-500 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label="Remove attachment"
          >
            ×
          </button>
        </div>
      ) : (
        /* Empty state */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={[
            'flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 w-full text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]/40',
            externalError
              ? 'border-red-300 bg-red-50/30'
              : 'border-gray-200 hover:border-[#017119]/40 hover:bg-[#E4F3E6]/30'
          ].join(' ')}
          aria-describedby={externalError ? 'file-error' : undefined}
        >
          <span className="text-xl" aria-hidden="true">📎</span>
          <div>
            <p className="text-sm font-medium text-[#011539]/70">Attach a file</p>
            <p className="text-xs text-[#011539]/40 mt-0.5">
              {ALLOWED_FILE_EXTENSIONS.join(', ')} · Max {MAX_FILE_SIZE / 1024 / 1024}MB
            </p>
          </div>
          <span className="ml-auto text-xs font-semibold text-[#017119] border border-[#017119]/30 rounded-lg px-3 py-1.5 hover:bg-[#017119] hover:text-white transition-colors duration-150">
            Choose File
          </span>
        </button>
      )}

      {/* Error message */}
      {externalError && (
        <p id="file-error" className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <span aria-hidden="true">❌</span>
          {externalError}
        </p>
      )}

    </div>
  );
}

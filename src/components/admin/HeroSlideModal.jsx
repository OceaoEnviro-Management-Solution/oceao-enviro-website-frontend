// HeroSlideModal.jsx — Add a hero slide, or edit the texts of one.
//   mode 'add'  : photo (with preview), name, location, description, optional credit, employee name.
//                 The photo is checked here (jpg, png or webp, at most 10 MB) before it is uploaded.
//   mode 'edit' : the same texts, but no photo field: a photo cannot be changed, only replaced by
//                 deleting the slide and adding a new one.
// The employee name is prefilled from sessionStorage ("oe_admin_name") and saved back on submit.
// A failed request shows the backend's message inside the modal, which stays open.
// Props: isOpen, mode, set ('live'|'scheduled', for add), setLabel, slide (for edit), onClose,
//        onSaved() called after a successful save (the page reloads its lists)

import { useState, useEffect, useRef } from 'react';
import { X, ImagePlus, RefreshCw, Images } from 'lucide-react';
import { addSlide, updateSlide } from '../../services/heroAdminApi';
import { getStoredAdminName, saveAdminName } from '../../utils/adminName';
import { validateEmployeeName } from '../../utils/validation';
import { HERO_LIMITS, IMAGE_TYPES, heroErrorsFrom, validateHeroTexts, validateImageFile } from '../../utils/heroForm';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

const fieldClass = (hasError) =>
  `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors disabled:bg-gray-50
   ${hasError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`;

const formatSize = (bytes) => (bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

// Mounted only while open, so its fields start fresh every time.
function HeroSlideDialog({ mode, set, setLabel, slide, onClose, onSaved }) {
  const isEdit = mode === 'edit';

  const [name, setName]                 = useState(slide?.name ?? '');
  const [location, setLocation]         = useState(slide?.location ?? '');
  const [description, setDescription]   = useState(slide?.description ?? '');
  const [credit, setCredit]             = useState(slide?.credit ?? '');
  const [employeeName, setEmployeeName] = useState(getStoredAdminName());
  const [file, setFile]                 = useState(null);
  const [preview, setPreview]           = useState('');
  const [errors, setErrors]             = useState({});
  const [busy, setBusy]                 = useState(false);
  const previewRef = useRef('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && !busy) onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, busy]);

  // Free the preview picture when the modal closes.
  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); }, []);

  const clearError = (field) => setErrors((previous) => ({ ...previous, [field]: '', _global: '' }));

  const choosePhoto = (event) => {
    const chosen = event.target.files?.[0];
    event.target.value = '';   // choosing the same file again must work after a rejection
    if (!chosen) return;

    const problem = validateImageFile(chosen);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = '';

    if (problem) {
      setFile(null);
      setPreview('');
      setErrors((previous) => ({ ...previous, image: problem, _global: '' }));
      return;
    }

    const url = URL.createObjectURL(chosen);
    previewRef.current = url;
    setFile(chosen);
    setPreview(url);
    clearError('image');
  };

  const changed = isEdit
    ? {
        ...(name.trim() !== slide.name && { name: name.trim() }),
        ...(location.trim() !== slide.location && { location: location.trim() }),
        ...(description.trim() !== slide.description && { description: description.trim() }),
        ...(credit.trim() !== slide.credit && { credit: credit.trim() || null }),
      }
    : {};
  const nothingToSave = isEdit && Object.keys(changed).length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy || nothingToSave) return;

    const next = validateHeroTexts({ name, location, description, credit });
    if (!isEdit) {
      const imageProblem = validateImageFile(file);
      if (imageProblem) next.image = imageProblem;
    }
    const nameProblem = validateEmployeeName(employeeName);
    if (nameProblem) next.employeeName = nameProblem;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    saveAdminName(employeeName);
    setBusy(true);
    try {
      if (isEdit) {
        await updateSlide(slide.id, { ...changed, performedBy: employeeName.trim() });
      } else {
        await addSlide({
          set, file,
          name: name.trim(), location: location.trim(), description: description.trim(), credit: credit.trim(),
          performedBy: employeeName.trim(),
        });
      }
      onSaved();
      onClose();
    } catch (error) {
      setErrors(heroErrorsFrom(error));
      setBusy(false);
    }
  };

  const descriptionLeft = HERO_LIMITS.description.max - description.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="hero-slide-title"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-[modalPop_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center">
              <Images className="w-5 h-5 text-[#017119]" />
            </div>
            <div>
              <h2 id="hero-slide-title" className="text-base font-bold text-[#011539]">
                {isEdit ? 'Edit slide' : 'Add slide'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{isEdit ? slide.name : `Adding to: ${setLabel}`}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={busy}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Close modal">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {isEdit ? (
            <p className="rounded-xl bg-[#EAEBF7] px-4 py-3 text-xs font-medium text-[#0F1D75]">
              To change the photo, delete this slide and add a new one.
            </p>
          ) : (
            <div>
              <p className="text-sm font-semibold text-[#011539] mb-1.5">
                Photo <span className="text-red-500">*</span>
              </p>
              <div className={`rounded-2xl border-2 border-dashed p-3 ${errors.image ? 'border-red-400 bg-red-50/30' : 'border-gray-200'}`}>
                {preview ? (
                  <img src={preview} alt="Preview of the chosen photo" className="aspect-[16/9] w-full rounded-xl object-cover" />
                ) : (
                  <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 text-gray-400">
                    <ImagePlus className="h-8 w-8" aria-hidden="true" />
                    <span className="text-xs">JPG, PNG or WebP, up to 10 MB</span>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-xs text-gray-500">
                    {file ? `${file.name} (${formatSize(file.size)})` : 'No photo chosen'}
                  </p>
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={busy}
                    className="shrink-0 rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-40">
                    {file ? 'Choose another' : 'Choose photo'}
                  </button>
                </div>
                <input ref={fileInputRef} id="hero-slide-image" type="file" accept={IMAGE_TYPES.join(',')} onChange={choosePhoto} className="sr-only" tabIndex={-1} aria-label="Photo file" />
              </div>
              {errors.image && <p className="text-xs text-red-600 mt-1" role="alert">{errors.image}</p>}
              <p className="mt-1 text-xs text-gray-400">A wide, landscape photo works best.</p>
            </div>
          )}

          <div>
            <label htmlFor="hero-name" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input id="hero-name" type="text" value={name} maxLength={HERO_LIMITS.name.max} disabled={busy}
              onChange={(e) => { setName(e.target.value); clearError('name'); }}
              placeholder="e.g. Rohtang Pass"
              className={fieldClass(errors.name)} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="hero-location" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <input id="hero-location" type="text" value={location} maxLength={HERO_LIMITS.location.max} disabled={busy}
              onChange={(e) => { setLocation(e.target.value); clearError('location'); }}
              placeholder="e.g. Himachal Pradesh"
              className={fieldClass(errors.location)} />
            {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="hero-description" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea id="hero-description" rows={3} value={description} maxLength={HERO_LIMITS.description.max} disabled={busy}
              onChange={(e) => { setDescription(e.target.value); clearError('description'); }}
              placeholder="A short line about the photo"
              className={`${fieldClass(errors.description)} resize-none`} />
            <div className="mt-1 flex items-start justify-between gap-3">
              <p className="text-xs text-red-600">{errors.description}</p>
              <p className={`shrink-0 text-xs ${descriptionLeft <= 10 ? 'font-semibold text-amber-600' : 'text-gray-400'}`} aria-live="polite">
                {description.length} / {HERO_LIMITS.description.max}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="hero-credit" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Photo credit <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input id="hero-credit" type="text" value={credit} maxLength={HERO_LIMITS.credit.max} disabled={busy}
              onChange={(e) => { setCredit(e.target.value); clearError('credit'); }}
              placeholder="e.g. A. Kumar"
              className={fieldClass(errors.credit)} />
            {errors.credit && <p className="text-xs text-red-600 mt-1">{errors.credit}</p>}
          </div>

          <div>
            <label htmlFor="hero-employee" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input id="hero-employee" type="text" value={employeeName} disabled={busy} autoComplete="name"
              onChange={(e) => { setEmployeeName(e.target.value); clearError('employeeName'); }}
              placeholder="Your full name"
              className={fieldClass(errors.employeeName)} />
            {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
          </div>

          {errors._global && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{errors._global}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-gray-100">
          <button type="button" onClick={onClose} disabled={busy}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40">
            Cancel
          </button>
          <button type="submit" disabled={busy || nothingToSave}
            className="flex-1 px-4 py-3 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2">
            {busy && <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {busy ? (isEdit ? 'Saving…' : 'Uploading photo…') : (isEdit ? 'Save changes' : 'Add slide')}
          </button>
        </div>
      </form>
      <style>{ANIM}</style>
    </div>
  );
}

export default function HeroSlideModal({ isOpen, ...props }) {
  if (!isOpen) return null;
  return <HeroSlideDialog {...props} />;
}

// HeroSlideCard.jsx — One hero slide in a set: thumbnail, texts and the Edit / Delete buttons.
// It can be dragged to a new place with the grip handle: with a mouse, with a finger (press and
// hold a moment so the page can still scroll) or with the keyboard (focus the handle, Space picks
// it up, the arrow keys move it, Space drops it, Escape cancels).
// Props: slide, position (1-based), disabled (no dragging or editing while a change is saved),
//        onEdit(slide), onDelete(slide)

import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, Pencil, Trash2, MapPin } from 'lucide-react';
import { thumbnailUrl } from '../../utils/heroForm';

export default function HeroSlideCard({ slide, position, disabled, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id, disabled });

  const style = {
    transform: transform ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)` : undefined,
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-stretch gap-3 rounded-2xl border bg-white p-3 shadow-sm sm:gap-4 sm:p-4
        ${isDragging ? 'relative z-10 border-[#017119] opacity-90 shadow-xl' : 'border-gray-100'}`}
      data-slide-id={slide.id}
    >
      {/* Drag handle: the only part that starts a drag, so the buttons and page scrolling keep working */}
      <button
        type="button"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label={`Move ${slide.name}. Press space to pick it up, then use the arrow keys.`}
        className="flex w-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#011539] active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#017119]"
      >
        <GripVertical className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-36">
        <img src={thumbnailUrl(slide.imageUrl)} alt={`${slide.name}, ${slide.location}`} className="h-full w-full object-cover" draggable="false" />
        <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#011539]/80 text-xs font-bold text-white">
          {position}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#011539]">{slide.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{slide.location}</span>
        </p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600">{slide.description}</p>
        {slide.credit && <p className="mt-1 truncate text-xs italic text-gray-400">Photo: {slide.credit}</p>}
      </div>

      <div className="flex shrink-0 flex-col justify-center gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => onEdit(slide)}
          disabled={disabled}
          aria-label={`Edit ${slide.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(slide)}
          disabled={disabled}
          aria-label={`Delete ${slide.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

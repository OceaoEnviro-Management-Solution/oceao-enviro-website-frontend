// UpdateCard.jsx — One PARIVESH update as a card (homepage carousel) and its loading skeleton.
// The whole card is the link: the PDF opens in a new tab.
//
//   <UpdateCard item={item} />                   item: { title, category, date, sizeLabel, pdfUrl, isNew }
//   <UpdateCard item={item} focusable={false} /> a card scrolled out of view: not reachable by Tab
//   <UpdateCardSkeleton />

import { FileText } from 'lucide-react';
import { formatUpdateDate } from '../../utils/updateFormat';

export function NewBadge() {
  return (
    <span className="shrink-0 rounded-full bg-brand-orange px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-wide text-white">
      New
    </span>
  );
}

export function CategoryTag({ category }) {
  if (!category) return null;

  return (
    <span className="min-w-0 max-w-full truncate rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green" title={category}>
      {category}
    </span>
  );
}

export function UpdateCard({ item, focusable = true }) {
  const date = formatUpdateDate(item.date);

  return (
    <a
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={focusable ? undefined : -1}
      className="group flex h-full min-h-[100px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <CategoryTag category={item.category} />
        {item.isNew && <NewBadge />}
      </div>

      <h3 className="mb-4 line-clamp-3 text-base font-bold leading-snug text-brand-blue transition-colors group-hover:text-brand-green" title={item.title}>
        {item.title}
      </h3>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs font-medium text-gray-500">
        <span>{date}</span>
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-brand-green" aria-hidden="true" />
          {item.sizeLabel ?? 'PDF'}
        </span>
      </div>

      <span className="sr-only">(PDF, opens in a new tab)</span>
    </a>
  );
}

export function UpdateCardSkeleton() {
  return (
    <div className="flex h-full min-h-[210px] animate-pulse flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-hidden="true">
      <div className="mb-3 h-6 w-32 rounded-full bg-gray-200" />
      <div className="mb-2 h-4 w-full rounded bg-gray-200" />
      <div className="mb-2 h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-auto flex justify-between border-t border-gray-100 pt-3">
        <div className="h-3 w-20 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}

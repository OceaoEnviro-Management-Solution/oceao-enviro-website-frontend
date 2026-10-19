// UpdateListItem.jsx — One PARIVESH update as a row of the Updates page, and its loading skeleton.
// The same fields as UpdateCard; the whole row is the link and opens the PDF in a new tab.

import { FileText } from 'lucide-react';
import { formatUpdateDate } from '../../utils/updateFormat';
import { CategoryTag, NewBadge } from './UpdateCard';

export function UpdateListItem({ item }) {
  const date = formatUpdateDate(item.date);

  return (
    <a
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none"
    >
      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green sm:flex">
        <FileText className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CategoryTag category={item.category} />
          {item.isNew && <NewBadge />}
        </div>

        <h2 className="break-words text-base font-bold leading-snug text-brand-blue transition-colors group-hover:text-brand-green">
          {item.title}
        </h2>

        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
          {date && <span>{date}</span>}
          <span>{item.sizeLabel ?? 'PDF'}</span>
        </p>
      </div>

      <span className="sr-only">(PDF, opens in a new tab)</span>
    </a>
  );
}

export function UpdateListItemSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" aria-hidden="true">
      <div className="hidden h-12 w-12 shrink-0 rounded-full bg-gray-200 sm:block" />
      <div className="min-w-0 flex-1">
        <div className="mb-3 h-6 w-36 rounded-full bg-gray-200" />
        <div className="mb-2 h-4 w-full rounded bg-gray-200" />
        <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}

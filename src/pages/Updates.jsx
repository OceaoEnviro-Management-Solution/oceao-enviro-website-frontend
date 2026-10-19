// Updates.jsx — /updates
// Every PARIVESH update, 10 per page. The page number is in the URL (?page=N), so a page can be
// bookmarked, shared and reached with the browser's back button.
// Layout: heading + source line -> list (or skeletons, or a message) -> pagination -> link to PARIVESH.

import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { getPage } from '../services/updatesApi';
import { UpdateListItem, UpdateListItemSkeleton } from '../components/updates/UpdateListItem';

const PARIVESH_WHATS_NEW_URL = 'https://parivesh.nic.in/#/whatsNewFullView';
const PAGE_SIZE = 10;

// ?page=N -> a whole number from 1; anything else (missing, 0, abc, 2.5) is page 1.
const readPage = (value) => (/^\d{1,5}$/.test(value ?? '') && Number(value) >= 1 ? Number(value) : 1);

// The page numbers to show: the first, the last and the neighbours of the current one,
// with 'gap' where numbers are left out. [1, 'gap', 4, 5, 6, 'gap', 33]
function pageWindow(page, totalPages) {
  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const numbers = [...wanted].filter((number) => number >= 1 && number <= totalPages).sort((a, b) => a - b);

  return numbers.flatMap((number, position) =>
    position > 0 && number - numbers[position - 1] > 1 ? ['gap', number] : [number]
  );
}

const PAGE_BUTTON =
  'flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green';
const PAGE_BUTTON_IDLE = 'border-gray-200 bg-white text-brand-blue hover:bg-brand-blue hover:text-white disabled:pointer-events-none disabled:opacity-40';

function Pagination({ page, totalPages, onChange }) {
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={`${PAGE_BUTTON} ${PAGE_BUTTON_IDLE} gap-1`} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sr-only sm:hidden">Previous page</span>
      </button>

      {pageWindow(page, totalPages).map((entry, position) =>
        entry === 'gap' ? (
          <span key={`gap-${position}`} className="px-1 text-gray-400" aria-hidden="true">…</span>
        ) : (
          <button
            key={entry}
            type="button"
            className={`${PAGE_BUTTON} ${entry === page ? 'border-brand-blue bg-brand-blue text-white' : PAGE_BUTTON_IDLE}`}
            aria-current={entry === page ? 'page' : undefined}
            aria-label={`Page ${entry}`}
            onClick={() => onChange(entry)}
          >
            {entry}
          </button>
        )
      )}

      <button type="button" className={`${PAGE_BUTTON} ${PAGE_BUTTON_IDLE} gap-1`} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        <span className="hidden sm:inline">Next</span>
        <span className="sr-only sm:hidden">Next page</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

export default function Updates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = readPage(searchParams.get('page'));

  // The answer, tagged with the page it is for: while another page is loading the list shows
  // skeletons, and a slow answer for a page we have left is ignored.
  const [loaded, setLoaded] = useState({ page: null, data: null, failed: false });
  const [retryTick, setRetryTick] = useState(0);
  const listTop = useRef(null);
  const changedByUser = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    getPage(page, { signal: controller.signal })
      .then((data) => setLoaded({ page, data, failed: false }))
      .catch(() => {
        if (!controller.signal.aborted) setLoaded({ page, data: null, failed: true });
      });

    return () => controller.abort();
  }, [page, retryTick]);

  // After the visitor changes page, bring the top of the list back into view.
  useEffect(() => {
    if (loaded.page === page && changedByUser.current) {
      changedByUser.current = false;
      listTop.current?.scrollIntoView({ block: 'start' });
    }
  }, [loaded.page, page]);

  const goTo = (next) => {
    changedByUser.current = true;
    setSearchParams({ page: String(next) });
  };

  const retry = () => {
    setLoaded({ page: null, data: null, failed: false });
    setRetryTick((tick) => tick + 1);
  };

  const loading = loaded.page !== page;
  const { data, failed } = loaded;
  const pastTheEnd = !loading && !failed && data && data.items.length === 0 && data.total > 0;
  const nothingYet = !loading && !failed && data && data.total === 0;

  return (
    <div className="w-full bg-white">
      <section className="px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div ref={listTop} className="mx-auto max-w-5xl scroll-mt-24">
          <h1 className="mb-3 text-3xl font-bold text-brand-blue md:text-4xl lg:text-[40px]">Updates</h1>
          <p className="text-base font-medium text-gray-600">
            Source: PARIVESH, Ministry of Environment, Forest and Climate Change
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {loading && (
            <div className="flex flex-col gap-4" aria-busy="true">
              {Array.from({ length: PAGE_SIZE }, (_, position) => <UpdateListItemSkeleton key={position} />)}
            </div>
          )}

          {failed && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
              <p className="mb-4 text-base font-medium text-gray-600" role="status">Updates are unavailable right now.</p>
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
              >
                Try again
              </button>
            </div>
          )}

          {nothingYet && (
            <p className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center text-base font-medium text-gray-600">
              No updates to show yet.
            </p>
          )}

          {pastTheEnd && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
              <p className="mb-4 text-base font-medium text-gray-600">There are no updates on this page.</p>
              <Link
                to="/updates?page=1"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
              >
                Go to the first page
              </Link>
            </div>
          )}

          {!loading && !failed && data && data.items.length > 0 && (
            <>
              <ul className="flex flex-col gap-4">
                {data.items.map((item) => (
                  <li key={item.id}><UpdateListItem item={item} /></li>
                ))}
              </ul>

              {data.totalPages > 1 && <Pagination page={data.page} totalPages={data.totalPages} onChange={goTo} />}
            </>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 text-center sm:px-6 lg:px-8">
        <a
          href={PARIVESH_WHATS_NEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-blue px-8 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
        >
          View all on PARIVESH
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </section>
    </div>
  );
}

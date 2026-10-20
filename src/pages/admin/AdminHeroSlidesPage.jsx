// AdminHeroSlidesPage.jsx — /admin/hero-slides: manage the homepage hero slides.
// Two sets of up to 5 slides: "Live now" (on the homepage) and "Next set" (a draft that replaces
// Live now on its switch date). Add, edit the texts of, delete and drag to reorder slides; set or
// cancel the switch date. The backend does the planned switch itself when this page (or the
// homepage) is opened on or after that day, so a set that has just gone live is already under
// "Live now" when the page loads.

import { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, RefreshCw, X, Images } from 'lucide-react';
import { useAdminContext } from '../../hooks/useAdminContext';
import { clearSchedule, getHeroAdmin, reorder, setSchedule } from '../../services/heroAdminApi';
import { HERO_SET_MAX } from '../../utils/heroForm';
import HeroSlideCard from '../../components/admin/HeroSlideCard';
import HeroSlideModal from '../../components/admin/HeroSlideModal';
import HeroDeleteModal from '../../components/admin/HeroDeleteModal';
import HeroSchedulePanel from '../../components/admin/HeroSchedulePanel';

const TABS = [
  { id: 'live', label: 'Live now' },
  { id: 'scheduled', label: 'Next set' },
];
const SET_LABEL = { live: 'Live now', scheduled: 'Next set' };

export default function AdminHeroSlidesPage() {
  const { requestName } = useAdminContext();

  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState('live');
  const [modal, setModal] = useState({ type: null, slide: null });
  const [notice, setNotice] = useState('');     // a failed reorder / schedule / reload, shown above the list
  const [saving, setSaving] = useState(false);  // a reorder or schedule change is being saved

  // ── Loading ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    getHeroAdmin()
      .then((data) => { if (!cancelled) setState({ status: 'ready', data, error: '' }); })
      .catch((error) => {
        if (cancelled) return;
        const message = error?.message || 'Could not load the hero slides.';
        // With a list already on screen a failed refresh only shows a notice.
        setState((previous) => (previous.data ? { ...previous, status: 'ready' } : { status: 'error', data: null, error: message }));
        setNotice(message);
      });

    return () => { cancelled = true; };
  }, [tick]);

  const reload = useCallback(() => { setNotice(''); setTick((n) => n + 1); }, []);

  const retry = () => { setState({ status: 'loading', data: null, error: '' }); reload(); };

  // ── Drag and drop ─────────────────────────────────────────────────────────
  // The mouse needs a few pixels of movement (so a click is a click), a finger a short press (so
  // the page can still be scrolled), the keyboard works from the handle.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const slidesOf = (data, set) => (set === 'live' ? data.live : data.scheduled.slides);

  const putSlides = useCallback((set, slides) => {
    setState((previous) => {
      const data = previous.data;
      return {
        ...previous,
        data: set === 'live' ? { ...data, live: slides } : { ...data, scheduled: { ...data.scheduled, slides } },
      };
    });
  }, []);

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id || saving) return;

    const before = slidesOf(state.data, tab);
    const from = before.findIndex((slide) => slide.id === active.id);
    const to = before.findIndex((slide) => slide.id === over.id);
    if (from < 0 || to < 0) return;

    const after = arrayMove(before, from, to);
    putSlides(tab, after);          // show the new order at once ...
    setNotice('');
    setSaving(true);

    try {
      const name = await requestName();
      if (!name) { putSlides(tab, before); return; }          // the name prompt was dismissed: nothing is saved

      putSlides(tab, await reorder(tab, after.map((slide) => slide.id), name));
    } catch (error) {
      putSlides(tab, before);       // ... and put it back if the server refused
      setNotice(error?.message || 'The new order could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  // ── Switch date ───────────────────────────────────────────────────────────
  const runScheduleChange = async (change) => {
    setNotice('');
    setSaving(true);
    try {
      const name = await requestName();
      if (!name) return;
      await change(name);
      reload();
    } catch (error) {
      setNotice(error?.message || 'The switch date could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  // ── Rendering ─────────────────────────────────────────────────────────────
  if (state.status === 'loading') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#011539]">Hero Slides</h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#017119] animate-spin" />
            <p className="text-sm text-gray-500">Loading hero slides…</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#011539]">Hero Slides</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-10 text-center space-y-3">
          <p className="text-sm text-red-600" role="alert">{state.error}</p>
          <button type="button" onClick={retry}
            className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { data } = state;
  const slides = slidesOf(data, tab);
  const full = slides.length >= HERO_SET_MAX;
  const counts = { live: data.live.length, scheduled: data.scheduled.slides.length };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#011539]">Hero Slides</h2>
        <p className="mt-1 text-sm text-gray-500">
          The photos behind the homepage heading. Each set holds up to {HERO_SET_MAX} slides.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Slide sets" className="inline-flex rounded-2xl bg-gray-100 p-1">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`hero-tab-${id}`}
            aria-selected={tab === id}
            aria-controls="hero-tab-panel"
            onClick={() => setTab(id)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${tab === id ? 'bg-white text-[#011539] shadow-sm' : 'text-gray-500 hover:text-[#011539]'}`}
          >
            {label} <span className="ml-1 text-xs font-medium text-gray-400">{counts[id]}</span>
          </button>
        ))}
      </div>

      {notice && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-3" role="alert">
          <p className="text-sm font-medium text-red-700">{notice}</p>
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss"
            className="shrink-0 rounded-full p-1 text-red-500 hover:bg-red-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div id="hero-tab-panel" role="tabpanel" aria-labelledby={`hero-tab-${tab}`} className="space-y-4">

        {tab === 'scheduled' && (
          <HeroSchedulePanel
            key={data.scheduled.switchDate ?? 'none'}
            switchDate={data.scheduled.switchDate}
            slideCount={counts.scheduled}
            busy={saving}
            onSave={(date) => runScheduleChange((name) => setSchedule(date, name))}
            onCancel={() => runScheduleChange((name) => clearSchedule(name))}
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">{SET_LABEL[tab]}</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              {tab === 'live'
                ? 'On the homepage right now. Drag the handle to change the order.'
                : 'A draft for the next switch. Drag the handle to change the order.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${full ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`} aria-label={`${slides.length} of ${HERO_SET_MAX} slides`}>
              {slides.length} / {HERO_SET_MAX}
            </span>
            <button
              type="button"
              onClick={() => setModal({ type: 'add', slide: null })}
              disabled={full}
              title={full ? `This set already has ${HERO_SET_MAX} slides. Delete one to add another.` : undefined}
              className="flex items-center gap-2 rounded-xl bg-[#017119] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#014D11] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add slide
            </button>
          </div>
        </div>

        {slides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center">
            <Images className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-gray-600">No slides in this set yet.</p>
            <p className="mt-1 text-xs text-gray-400">
              {tab === 'live' ? 'Until you add one, the homepage shows its standard picture.' : 'Add the photos you want for the next switch.'}
            </p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={slides.map((slide) => slide.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3" aria-label={`${SET_LABEL[tab]} slides`}>
                {slides.map((slide, index) => (
                  <HeroSlideCard
                    key={slide.id}
                    slide={slide}
                    position={index + 1}
                    disabled={saving}
                    onEdit={(item) => setModal({ type: 'edit', slide: item })}
                    onDelete={(item) => setModal({ type: 'delete', slide: item })}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <HeroSlideModal
        isOpen={modal.type === 'add' || modal.type === 'edit'}
        mode={modal.type === 'edit' ? 'edit' : 'add'}
        set={tab}
        setLabel={SET_LABEL[tab]}
        slide={modal.slide}
        onClose={() => setModal({ type: null, slide: null })}
        onSaved={reload}
      />
      <HeroDeleteModal
        isOpen={modal.type === 'delete'}
        slide={modal.slide}
        onClose={() => setModal({ type: null, slide: null })}
        onDeleted={reload}
      />
    </div>
  );
}

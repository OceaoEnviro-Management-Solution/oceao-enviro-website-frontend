// DirectorCard.jsx — Director card made of 3 blocks:
//   [ Photo ] [ Info ]   (side by side on md+, stacked on mobile)
//   [      Director Message      ] (full width, justified, signed)
// Message markup: **bold**, ==highlight== (orange bold italic)

import Avatar from './Avatar';

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, idx) => {
    if (part.startsWith('**')) {
      return <strong key={idx} className="font-bold text-[#011539]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('==')) {
      return <strong key={idx} className="font-bold italic text-[#E69500]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function DirectorCard({ director }) {
  const paragraphs = director.message
    ? director.message.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <article
      id={`director-${director.id}`}
      className="bg-white border-2 border-[#017119]/30 rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3 sm:gap-4"
    >
      {/* ── Top row: photo + info ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

        {/* Director photo */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center min-h-72 md:min-h-80">
          {director.photo ? (
            <img
              src={director.photo}
              alt={director.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <Avatar name={director.name} className="w-32 h-32 text-4xl bg-white/70" />
          )}
        </div>

        {/* Director info */}
        <div className="rounded-2xl border border-gray-200 bg-[#F8FAF8] p-6 lg:p-8 flex flex-col justify-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#0F1D75] mb-1">{director.name}</h3>
          <p className="text-lg font-semibold text-[#017119] mb-2">{director.designation}</p>
          <span className="block w-10 h-1 bg-[#FFA500] rounded-full mb-5" />

          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1D75] mb-2">Education</h4>
          <ul className="space-y-1.5">
            {director.qualifications.map((qualification) => (
              <li key={qualification} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#017119] shrink-0" aria-hidden="true" />
                {qualification}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Director message ── */}
      <div className="rounded-2xl border border-gray-200 p-6 lg:p-8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1D75] mb-4">
          Director&apos;s Message
        </h4>

        {paragraphs.length > 0 ? (
          <>
            <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx}>{renderInline(paragraph)}</p>
              ))}
            </div>
            <div className="mt-6">
              <p className="font-bold text-[#011539]">{director.name}</p>
              <p className="font-bold text-[#011539]">{director.designation}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">Director&apos;s message coming soon.</p>
        )}
      </div>
    </article>
  );
}

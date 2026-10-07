// Avatar.jsx — Initials avatar used on team cards (no staff photos)

const TITLES = /^(mr|mrs|ms|dr)\.?$/i;

function getInitials(name) {
  const words = name.split(/\s+/).filter((w) => !TITLES.test(w));
  return ((words[0]?.[0] ?? '') + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

export default function Avatar({ name, className = 'w-12 h-12 text-base' }) {
  return (
    <div
      aria-hidden="true"
      className={`shrink-0 rounded-full bg-gradient-to-br from-[#E4F3E6] to-[#EAEBF7] text-[#017119] font-bold flex items-center justify-center shadow-sm ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

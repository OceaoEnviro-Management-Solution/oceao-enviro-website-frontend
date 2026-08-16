import React from 'react';
import { useTypewriterLoop } from '../../hooks/useTypewriterLoop';

export default function AnimatedTagline() {
  // User requested "Be A Part of Sustainability" in orange colour
  const texts = ["Be A Part Of Sustainability"];
  const displayText = useTypewriterLoop(texts, { speedMs: 100, holdMs: 3000 });

  return (
    <div className="h-6 mt-2">
      <span className="text-orange-400 text-[15px] font-bold tracking-wide">
        {displayText}
        {/* <span className="animate-pulse">|</span> */}
      </span>
    </div>
  );
}

import { useState, useEffect } from 'react';

export function useTypewriterLoop(texts, { speedMs = 100, holdMs = 2000 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentFullText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), holdMs);
        }
      } else {
        // Deleting
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        } else {
          // Clear all at once for a fade-out like effect or character by character 
          // The prompt says: "the completed text holds briefly, then fully clears/fades out, and the cycle repeats."
          // So we can just clear it fully.
          setDisplayText('');
        }
      }
    }, isDeleting ? 50 : speedMs); // speed doesn't matter much on delete if we clear instantly, but keep for structure

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speedMs, holdMs]);

  return displayText;
}

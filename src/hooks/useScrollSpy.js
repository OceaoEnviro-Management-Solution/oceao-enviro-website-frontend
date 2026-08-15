import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is in viewport
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element is near the top of the screen or above
          if (rect.top <= offset + 50) {
            active = id;
          }
        }
      }
      
      setActiveId(active);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);
  
  return activeId;
}

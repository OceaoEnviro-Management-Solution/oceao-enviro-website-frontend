// LabServicesList.jsx — Accordion container for lab test cards
// Same expand/collapse logic as ServicesList BUT resets state when `items` changes
// (i.e. user switches category in the sidebar → all cards collapse)

import { useState, useEffect } from 'react';
import LabServiceCard from './LabServiceCard';

export default function LabServicesList({ items }) {
  const [expandedCards, setExpandedCards] = useState({});

  // Reset all expanded cards when the category switches (items array changes)
  useEffect(() => {
    setExpandedCards({});
  }, [items]);

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
      {items.map((item) => (
        <LabServiceCard
          key={item.id}
          item={item}
          isExpanded={expandedCards[item.id] || false}
          onToggle={() => toggleCard(item.id)}
        />
      ))}
    </div>
  );
}

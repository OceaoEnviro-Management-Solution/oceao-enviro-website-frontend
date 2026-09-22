// ServicesList.jsx — Accordion container for service cards
// Multiple cards can be open simultaneously; none open by default.

import { useState } from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesList({ items }) {
  // Object keyed by item.id; true = expanded
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
      {items.map((item) => (
        <ServiceCard
          key={item.id}
          item={item}
          isExpanded={expandedCards[item.id] || false}
          onToggle={() => toggleCard(item.id)}
        />
      ))}
    </div>
  );
}

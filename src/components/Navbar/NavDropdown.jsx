import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function NavDropdown({ item, isOpen, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[240px] max-w-sm bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200"
      role="menu"
    >
      <ul className="flex flex-col gap-1">
        {item.children.map((child, index) => (
          <li key={index} role="none">
            <Link
              to={child.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors group"
              role="menuitem"
              onClick={onClose}
            >
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green shrink-0 transition-colors" />
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

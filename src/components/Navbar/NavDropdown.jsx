import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const numberOfElementsInRow = 4;

export default function NavDropdown({ item, isOpen, onClose }) {
  const dropdownRef = useRef(null);

  // Dynamically position the dropdown strictly below the navbar
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current) {
      const updatePosition = () => {
        if (!dropdownRef.current) return;
        // Target the nav pill directly instead of the outer sticky wrapper
        // to eliminate any gap caused by the wrapper's bottom padding
        const navElement = dropdownRef.current.closest('nav');
        if (navElement) {
          const rect = navElement.getBoundingClientRect();
          // We can optionally subtract 1px to perfectly overlap the borders
          dropdownRef.current.style.top = `${rect.bottom - 1}px`;
        }
      };

      updatePosition();

      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

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
      className="fixed left-0 w-full bg-[#faf1e8] text-gray-800 rounded-b-3xl shadow-xl border-t border-gray-100 py-6 z-50 animate-in fade-in slide-in-from-top-2  duration-200"
      role="menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          className="grid gap-x-8 gap-y-2"
          style={{ gridTemplateColumns: `repeat(${numberOfElementsInRow}, minmax(0, 1fr))` }}
        >
          {item.children.map((child, index) => (
            <li key={index} role="none">
              <Link
                to={child.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors group"
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
    </div>
  );
}

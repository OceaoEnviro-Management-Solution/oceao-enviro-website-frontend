// useAvailability.js — Shared hook for VM and Callback availability pages.
// Manages: selectedDate, raw slot data, loading state, and fetch function.
// Used by both AdminAvailabilityVMPage and AdminAvailabilityCallbacksPage
// to avoid duplicating the same fetch-on-date-select pattern.

import { useState, useCallback } from 'react';
import { adminApi } from '../services/adminApi';

/**
 * @param {'vm' | 'callback'} type - Which availability to fetch
 */
export function useAvailability(type) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForDate = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const result = type === 'vm'
        ? await adminApi.getVMAvailability(date)
        : await adminApi.getCallbackAvailability(date);

      if (result.success) setSlotsData(result.slots);
      else setError('Failed to load availability');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [type]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    fetchForDate(date);
  }, [fetchForDate]);

  const refresh = useCallback(() => {
    if (selectedDate) fetchForDate(selectedDate);
  }, [selectedDate, fetchForDate]);

  return {
    selectedDate,
    slotsData,
    loading,
    error,
    handleDateSelect,
    refresh
  };
}

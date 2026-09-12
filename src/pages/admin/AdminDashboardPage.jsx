// AdminDashboardPage.jsx — Admin dashboard overview: today's meetings + callbacks.
// Shows stat cards + upcoming list + "View All Bookings" CTA.
// Replaces the 'dashboard' case from the old AdminDashboard.jsx god component.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import StatCard from '../../components/admin/StatCard';
import MeetingsList from '../../components/admin/MeetingsList';
import { Video, PhoneCall, RefreshCw, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await adminApi.getDashboardData();
        if (result.success) setData(result.today);
      } catch {
        console.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#017119] animate-spin" />
          <p className="text-sm text-gray-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Dashboard</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Video className="w-5 h-5" />}
          label="Today's Meetings"
          value={data?.meetings}
          accentClass="bg-[#E4F3E6]"
          iconClass="text-[#017119]"
        />
        <StatCard
          icon={<PhoneCall className="w-5 h-5" />}
          label="Today's Callbacks"
          value={data?.callbacks}
          accentClass="bg-[#EAEBF7]"
          iconClass="text-[#0F1D75]"
        />
      </div>

      {/* Upcoming today */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Upcoming Today</h3>
        </div>
        <MeetingsList meetings={data?.upcoming || []} grouped={false} />
      </div>

      {/* View all bookings CTA */}
      <button
        type="button"
        onClick={() => navigate('/admin/bookings')}
        className="flex items-center gap-2 text-sm font-semibold text-[#017119] hover:gap-3 transition-all duration-200"
      >
        View All Bookings
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

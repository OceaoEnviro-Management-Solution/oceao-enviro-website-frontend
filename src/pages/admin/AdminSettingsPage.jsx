// AdminSettingsPage.jsx — Settings: callback capacity and the holiday planner.
// Both read and write real data; every change is recorded in the activity log with the
// employee name and reason typed here.

import CapacitySettingsCard from '../../components/admin/CapacitySettingsCard';
import HolidayPlanner from '../../components/admin/HolidayPlanner';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Settings</h2>

      <CapacitySettingsCard />
      <HolidayPlanner />
    </div>
  );
}

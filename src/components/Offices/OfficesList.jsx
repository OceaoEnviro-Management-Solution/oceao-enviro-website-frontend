import { locationsData } from '../../constants/locations';
import OfficeCard from './OfficeCard';

export default function OfficesList() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75] mb-4">
            Visit Our Locations
          </h2>
          <p className="text-gray-600 text-lg">
            We operate from multiple strategic locations to serve you better.
            Feel free to reach out or visit us at any of our offices.
          </p>
        </div>

        {/* Office Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locationsData.map((office, index) => (
            <OfficeCard key={`${office.city}-${index}`} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}

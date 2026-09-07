import OfficesHero from '../components/Offices/OfficesHero';
import OfficesList from '../components/Offices/OfficesList';

export default function Offices() {
  return (
    <main className="w-full bg-white min-h-screen">
      <OfficesHero />
      <OfficesList />
    </main>
  );
}

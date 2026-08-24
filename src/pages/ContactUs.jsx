// ContactUs.jsx — Main page for /contact/quick-contact
// Thin shell: Hero → Tabs (same pattern as Gallery.jsx)

import ContactHero from '../components/sections/ContactHero';
import ContactTabs from '../components/Contact/ContactTabs';

export default function ContactUs() {
  return (
    <main className="w-full bg-white pb-20">
      {/* Hero */}
      <ContactHero />

      {/* Tabs + Tab Content */}
      <ContactTabs />
    </main>
  );
}

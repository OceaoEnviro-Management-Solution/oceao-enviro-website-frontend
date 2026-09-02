// GeneralContactSection.jsx — Tab 1: Immediate contact info
// Three color-coded cards: Phone (both numbers), Email, Offices.
// Uses ContactCard, ContactRow, PrimaryBtn, CopyBtn sub-components.

import { Phone, Mail, MapPin, PhoneCall } from 'lucide-react';
import ContactCard, { ContactRow, PrimaryBtn, CopyBtn } from './ContactCard';
import { contactInfo } from '../../constants/contact';

const ACCENT = {
  phone: '#0F1D75',   // brand-blue
  email: '#FFA500',   // brand-orange
  offices: '#017119',   // brand-green
};

export default function GeneralContactSection() {
  const { phone, email, offices } = contactInfo;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <p className="text-sm text-gray-500 text-center mb-8">
        Reach us directly — we're available Monday to Saturday, 9 AM – 6 PM IST.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Phone Card ──────────────────────────────────────────── */}
        <ContactCard icon={Phone} title="Call Us" accentColor={ACCENT.phone}>
          {/* Mobile */}
          <ContactRow
            label="Mobile"
            value={phone.mobile}
            buttons={
              <>
                <PrimaryBtn href={`tel:${phone.mobile.replace(/\s/g, '')}`}>
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </PrimaryBtn>
                <CopyBtn textToCopy={phone.mobile} toastLabel="Copied!" />
              </>
            }
          />

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Landline */}
          <ContactRow
            label="Landline"
            value={phone.landline}
            buttons={
              <>
                <PrimaryBtn href={`tel:${phone.landline.replace(/\s/g, '')}`}>
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </PrimaryBtn>
                <CopyBtn textToCopy={phone.landline} toastLabel="Copied!" />
              </>
            }
          />

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Landline */}
          <ContactRow
            label="Landline"
            value={phone.landline2}
            buttons={
              <>
                <PrimaryBtn href={`tel:${phone.landline2.replace(/\s/g, '')}`}>
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </PrimaryBtn>
                <CopyBtn textToCopy={phone.landline2} toastLabel="Copied!" />
              </>
            }
          />
        </ContactCard>

        {/* ── Email Card ──────────────────────────────────────────── */}
        <ContactCard icon={Mail} title="Email Us" accentColor={ACCENT.email}>
          <ContactRow
            label="General Inquiries"
            value={email}
            buttons={
              <>
                <PrimaryBtn href={`mailto:${email}`}>
                  <Mail className="w-3.5 h-3.5" /> Send Email
                </PrimaryBtn>
                <CopyBtn textToCopy={email} toastLabel="Email Copied!" />
              </>
            }
          />
          <p className="text-xs text-gray-400 leading-relaxed">
            We typically respond within 24–48 business hours.
          </p>
        </ContactCard>

        {/* ── Offices Card ────────────────────────────────────────── */}
        <ContactCard icon={MapPin} title="Our Offices" accentColor={ACCENT.offices}>
          <ContactRow
            label="Presence"
            value="Pan-India Locations"
          />
          <p className="text-xs text-gray-500 leading-relaxed">
            {offices.text}. Walk in or schedule a visit at your nearest branch.
          </p>
          <PrimaryBtn href={offices.link}>
            <MapPin className="w-3.5 h-3.5" /> View Offices
          </PrimaryBtn>
        </ContactCard>

      </div>
    </section>
  );
}

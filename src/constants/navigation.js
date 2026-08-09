export const navItems = [
  { id: 'home', label: 'Home', href: '/', hasDropdown: false },
  {
    id: 'about', label: 'About Us', href: '/about', hasDropdown: true, children: [
      { label: 'Company Profile', href: '/about/profile' },
      { label: 'Certifications & Accreditations', href: '/about/certifications' },
      { label: 'Vision & Mission', href: '/about/vision' },
      { label: 'Team', href: '/about/team' },
      { label: 'Gallery', href: '/about/gallery' },
    ]
  },
  {
    id: 'services', label: 'Services', href: '/services', hasDropdown: true, children: [
      { label: 'Environment Clearance', href: '/services/clearance' },
      { label: 'EPR & CPCB Registration', href: '/services/epr' },
      { label: 'Environment Consultancy', href: '/services/consultancy' },
      { label: 'Sustainability Consultancy', href: '/services/sustainability' },
      { label: 'Health & Safety Audits', href: '/services/audits' },
      { label: 'Laboratory Services', href: '/services/lab' },
      { label: 'Legal Compliances', href: '/services/compliance' },
      { label: 'Waste Management', href: '/services/waste' }
    ]
  },
  {
    id: 'products', label: 'Products', href: '/products', hasDropdown: true, children: [
      { label: 'OWC', href: '/products/owc' },
      { label: 'STP/ETP', href: '/products/stp' },
      { label: 'RWH', href: '/products/rwh' },
      { label: 'Online Monitoring Product', href: '/products/monitoring' }
    ]
  },
  {
    id: 'our work', label: 'Our Work', href: '/our-work', hasDropdown: true, children: [
      { label: 'Projects', href: '/our-work/projects' },
      { label: 'Clientele', href: '/our-work/clientele' },
    ]
  },
  {
    id: 'contact', label: 'Contact Us', href: '/contact', hasDropdown: true, children: [
      { label: 'Book Virtual Meeting', href: '/contact/meeting' },
      { label: 'Request a Callback', href: '/contact/callback' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Feedback & Complaint', href: '/contact/feedback' },
      { label: 'Our Offices', href: '/contact/offices' },
    ]
  },
  {
    id: 'career', label: 'Career', href: '/career', hasDropdown: true, children: [
      { label: 'Work Life @ OE', href: '/career/life' },
      { label: 'Want to Join OE?', href: '/career/apply' },
    ]
  },


];

export const ctaButtons = {
  quote: { text: 'Get a Quote', href: '/quote', icon: 'ArrowRight' }
};

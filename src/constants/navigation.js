export const navItems = [
  { id: 'home', label: 'Home', href: '/', hasDropdown: false },
  {
    id: 'about', label: 'About Us', href: '/about', hasDropdown: true, children: [
      { label: 'Company Profile', href: '/about/Company-Profile' },
      { label: 'Certifications & Accreditations', href: '/about/accreditations' },
      { label: 'Vision & Mission', href: '/about/Vision-Mission' },
      { label: 'Team', href: '/about/team' },
      { label: 'Gallery', href: '/about/gallery' },
    ]
  },
  {
    id: 'services', label: 'Services', href: '/services', hasDropdown: true, children: [
      { label: 'Environmental Services', href: '/services/environmental-services' },
      { label: 'Social Assessment Studies', href: '/services/social-assessment-studies' },
      { label: 'Statutory NOCs/ Permissions/ Clearances', href: '/services/statutory-noc' },
      { label: 'Water Resource Management', href: '/services/water-resource-management' },
      { label: 'Laboratory Services', href: '/services/laboratory-services' },
    ]
  },
  { id: 'products', label: 'Products', href: '/products', hasDropdown: false },
  {
    id: 'our work', label: 'Our Work', href: '/our-work', hasDropdown: true, children: [
      { label: 'Projects', href: '/our-work/projects' },
      { label: 'Clientele', href: '/our-work/clientele' },
    ]
  },
  {
    id: 'contact', label: 'Contact Us', href: '/contact', hasDropdown: true, children: [
      { label: 'Quick Contact', href: '/contact/quick-contact' },
      { label: 'Book Virtual Meeting', href: '/booking-vm' },
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
  quote: { text: 'Contact Us', href: '/contact/quick-contact', icon: 'ArrowRight' }
};

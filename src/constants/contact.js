// contact.js — All contact page data: info, form fields, dropdowns, tabs
// Edit this file to update any contact info, add/remove form fields, or modify dropdown options.

export const contactInfo = {
  phone: {
    mobile: '+91-9220460040',
    landline: '0120-4338047',
  },
  email: 'info@oceaoenviro.com',
  offices: {
    text: 'Visit our offices across Pan-India',
    link: '/contact/offices',
  },
};

export const formFields = {
  // Query form fields — edit here to add/remove fields
  queryForm: [
    { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Your full name' },
    { id: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 XXXX XXXXXX' },
    { id: 'company', label: 'Company / Organization', type: 'text', required: false, placeholder: 'Your company name' },
    { id: 'industry', label: 'Industry', type: 'dropdown', required: false, placeholder: 'Select industry' },
    { id: 'hearAbout', label: 'How did you hear about us?', type: 'dropdown', required: false, placeholder: 'Select option' },
    { id: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Inquiry subject' },
    { id: 'query', label: 'Your Query', type: 'textarea', required: true, placeholder: 'Please describe your query in detail...' },
  ],

  // Callback form fields — edit here to add/remove fields
  callbackForm: [
    { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 XXXX XXXXXX' },
    { id: 'preferredDate', label: 'Preferred Date', type: 'datepicker', required: true, placeholder: 'Select a date' },
    { id: 'preferredTime', label: 'Preferred Time', type: 'dropdown', required: true, placeholder: 'Select time slot' },
    { id: 'reason', label: 'Reason / Requirement', type: 'textarea', required: false, placeholder: 'Tell us why you need a callback...' },
  ],
};

export const dropdownOptions = {
  // Industry options
  industry: [
    { value: 'govt', label: 'Government & PSUs' },
    { value: 'construction', label: 'Construction & Real Estate' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'infrastructure', label: 'Infrastructure & Transportation' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'brick', label: 'Brick & Ceramic Industries' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education & Research' },
    { value: 'other', label: 'Other' },
  ],

  // How did you hear about us options
  hearAbout: [
    { value: 'google', label: 'Google Search' },
    { value: 'social', label: 'Social Media (LinkedIn, Instagram, etc.)' },
    { value: 'referral', label: 'Referral / Recommendation' },
    { value: 'news', label: 'News / Article' },
    { value: 'event', label: 'Event / Conference' },
    { value: 'direct', label: 'Direct Contact / Website' },
    { value: 'other', label: 'Other' },
  ],

  // Preferred callback time slots
  preferredTime: [
    { value: 'morning', label: 'Morning (9 AM – 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM – 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM – 8 PM)' },
  ],
};

export const tabs = [
  { id: 'general', label: 'General / Immediate', icon: 'Phone' },
  { id: 'query', label: 'Send Us Your Query', icon: 'MessageSquare' },
  { id: 'callback', label: 'Prefer a Call? / Request a Callback', icon: 'PhoneIncoming' },
];

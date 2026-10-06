# Oceao Enviro – Frontend

Frontend for the official Oceao Enviro website: a corporate site for an environmental consultancy and NABL-accredited testing laboratory, with a virtual-meeting booking system, contact/feedback forms and an admin panel.

---

## 🛠️ Tech Stack

| Area | Technology |
|------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router 7 |
| Icons | lucide-react |
| Date picking | react-datepicker |
| PDF viewing | react-pdf |
| State | React Context (Booking, Feedback, Admin) |
| Linting | ESLint 10 |
| Deployment | Vercel (SPA rewrites in `vercel.json`) |

Backend (separate folder `OE Backend`): Node.js, Express.js, MongoDB Atlas.

---

## ✅ Available Features

### Public website
- **Home** – hero, welcome/about, services, products, why choose us, certifications, clientele, gallery preview, virtual meeting CTA.
- **About Us** – Company Profile (with directors), Certifications & Accreditations, Vision & Mission, Gallery (category sidebar + lightbox viewer).
- **Services** – Services hub plus pages for Environmental Services, Social Assessment Studies, Statutory NOCs/Permissions/Clearances, Water Resource Management and Laboratory Services (with category navigation and expandable cards).
- **Contact Us** – Quick Contact (general info, query form, callback request), Feedback & Complaint form with file attachment, Our Offices.
- **Navigation** – responsive navbar with dropdowns, mobile drawer, bottom mobile bar, top info bar and footer with locations and social links.

### Virtual Meeting Booking (`/booking-vm`)
Multi-step flow: details form → email OTP verification → date and time-slot selection → confirmation review → success.

### Admin Panel (`/admin`)
Protected area with login, dashboard stats, bookings and callbacks management, availability management for virtual meetings and callbacks (calendar, slot blocking), and meeting/callback cancellation.

### Backend integration status
| Feature | Status |
|---------|--------|
| Query form (`/query/new-query`) | Connected to backend API |
| Feedback form (`/feedback/new-feedback`) | Connected to backend API |
| Virtual meeting booking (OTP, slots, bookings) | Mock API (simulated data) |
| Admin panel (auth, bookings, availability) | Mock API (simulated data) |

---

## 🚧 In Progress / Coming Soon

Already linked in the navigation, pages under development:

- **Team** page (`/about/team`)
- **Products** page (`/products`)
- **Our Work** – Projects and Clientele pages (`/our-work/*`)
- **Career** – Work Life @ OE and Want to Join OE? (`/career/*`)
- **Get a Quote** (`/quote`)

Planned engineering work:

- Replace the mock booking and admin APIs with real backend endpoints (real email OTP, persistent bookings, secure admin authentication).
- **Government Regulatory Updates Portal** – automated, centralized access to environmental and regulatory information.
- Remove mock data (`src/constants/mockData.js`, `feedbackMockData.js`) once the APIs are live.

> Additional phases will be documented after the current scope is complete.

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# production build / preview
npm run build
npm run preview

# lint
npm run lint
```

### Environment variables

Create `.env.local` in the project root:

```
VITE_API_BASE_URL=<backend API base URL>
```

---

## 📂 Project Structure

```
src/
├── assets/        Images, logos, certifications
├── components/    UI by feature (Navbar, Footer, booking, admin, Contact, Gallery, services, ...)
├── constants/     Static content, navigation, and mock data
├── context/       Booking, Feedback and Admin context providers
├── hooks/         Reusable hooks (availability, lightbox, scroll, form validation, ...)
├── layouts/       MainLayout (public) and AdminLayout (protected)
├── pages/         Route pages (public, services, booking, feedback, admin)
├── routes/        AppRoutes.jsx – central routing
├── services/      API modules (booking, admin, feedback, query)
├── styles/        Global CSS
└── utils/         Validation, file validation, rate limiter
```

---

## 👨‍💻 Maintainer

Maintained by the Oceao Enviro development team.

> **Status:** Active Development

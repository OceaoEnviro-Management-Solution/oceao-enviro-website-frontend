# Oceao Enviro website: release notes

First production release of the website (frontend) and its API (backend). These notes cover both repos, because going live needs both. Written 11 October 2026.

Related documents: `docs/API_CONTRACT.md` (every endpoint), `docs/AGENT_CONTEXT.md` (rules and business rules). Backend: `docs/SECURITY_CHECKLIST.md`, `.env.example`.

## 1. Features

### Public website

- **Company pages**: Home, About (Company Profile with directors, Certifications and Accreditations, Vision and Mission, Team, Gallery), Services (hub and five service pages, Laboratory Services with category navigation), Products, Our Offices.
- **Send us your query**: form with Cloudflare Turnstile. The company inbox receives the query and the customer a confirmation.
- **Feedback and complaint**: form with an optional PDF, JPG or PNG attachment (up to 5 MB), Turnstile, and the same two emails.
- **Request a callback**: pick a date (today to 30 days ahead; Monday to Saturday, closed Sundays, second Saturdays and holidays) and a period (Morning 9 AM to 12 PM, Afternoon 12 to 3 PM, Evening 3 to 6 PM). Each period has a capacity set by staff and a request stops being offered when it is full. Customer and company are emailed.
- **Virtual meeting booking** (`/booking-vm`): details, email OTP (6 digits, valid 5 minutes), date and slot (Monday to Saturday, closed Sundays and the 2nd Saturday of the month, 10:00, 12:00, 14:00, 16:00 IST, one hour, up to 30 days ahead, at least 2 hours from now), review, confirmation. A Google Meet link is created and emailed. One upcoming booking per email address.
- Responsive layout, a Not Found page for unknown addresses, and readable messages when the server cannot be reached.

### Admin panel (`/admin`)

- One shared login (8 hour session in an httpOnly cookie). Staff type their name once per session; it is recorded with every change.
- **Dashboard**: the day at a glance (meetings, callbacks, open and blocked slots), with one-click Meet link retry and callback status.
- **Bookings**: week view of meetings and callback requests, with cancelled items on request.
- **VM availability**: calendar, block or unblock a slot or a whole day, cancel a meeting (the slot is freed or blocked; the customer is emailed).
- **Callback availability**: block or unblock a period or a day, cancel requests (customers are emailed).
- **Settings**: callback capacity per period (0 to 50), holiday calendar for the year with bulk add at the start of the year, rename and remove.
- Every change is written to an audit log kept for 180 days.

### Operations

- `GET /health` for the host's health check, a request ID on every response and log line, rate limits, strict input validation, generic error responses in production, and a concurrency check script. Details in the backend `docs/SECURITY_CHECKLIST.md`.

## 2. Environment variables required in production

Nothing is read from a committed file. Set these in the host's environment.

### Backend (Node 20 or newer)

| Variable | Production value | Notes |
| --- | --- | --- |
| `NODE_ENV` | `production` | Hides 5xx details and marks the admin cookie Secure. Never use `test` on a public server: it turns the rate limits off. |
| `MONGODB_URI` | `mongodb+srv://<user>:<password>@<cluster>/<db>` | MongoDB Atlas. |
| `CORS_ORIGINS` | `https://www.your-domain.example` | The exact frontend origin(s), comma separated, no trailing slash, no `*`. The admin CSRF check uses the same list. |
| `TRUST_PROXY` | `1` | Number of proxies in front of the app. With `0` behind a proxy every visitor shares one IP and the rate limits trip together. |
| `EMAIL_MODE` | `smtp` | |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` | your mail provider | `SMTP_SECURE=true` for port 465, `false` for 587. |
| `MAIL_FROM` | `Oceao Enviro <no-reply@your-domain>` | |
| `COMPANY_MAIL` | the inbox that receives queries, feedback, bookings, callbacks | |
| `OTP_SECRET` | random, 32+ characters | Different from the other secrets. |
| `BOOKING_TOKEN_SECRET` | random, 32+ characters | |
| `TURNSTILE_SECRET_KEY` | the real secret from Cloudflare | The test key (`1x0000000000000000000000000000000AA`) always passes and must not be used. |
| `ADMIN_EMAIL` | the admin login email | |
| `ADMIN_PASSWORD_HASH` | bcrypt hash from `npm run admin:hash` | |
| `ADMIN_JWT_SECRET` | random, 32+ characters | |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` | from the Google steps below | Optional: without all three, bookings still work but have no Meet link ("link will follow"; staff can retry later). |
| `GOOGLE_CALENDAR_ID` | `primary` or a calendar ID | Optional, defaults to `primary`. |
| `PORT` | set by the host | Optional, defaults to 8000. |

Generate a secret with: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`

### Frontend (set at build time)

| Variable | Production value | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://<api-host>/api/v1` | Includes the `/api/v1` prefix. Baked into the build: change it, then build again. |
| `VITE_TURNSTILE_SITE_KEY` | the real site key from Cloudflare | The test key (`1x00000000000000000000AA`) always passes. |

## 3. Manual setup steps

Do these once, in this order.

1. **MongoDB Atlas**: create a cluster, a database user and the network access rule for the host. Put the connection string in `MONGODB_URI`.
2. **Cloudflare Turnstile**: in the Cloudflare dashboard create a widget for the website's domain. The site key goes to the frontend (`VITE_TURNSTILE_SITE_KEY`), the secret key to the backend (`TURNSTILE_SECRET_KEY`).
3. **Admin login**: in the backend folder run `npm run admin:hash`, type the password, and copy the printed hash to `ADMIN_PASSWORD_HASH`. If the host expands `$` in values, wrap the hash in single quotes. Set `ADMIN_EMAIL` and `ADMIN_JWT_SECRET`. Changing the hash later ends every open admin session.
4. **Google Meet (optional)**:
   1. In Google Cloud Console create a project and enable the Google Calendar API.
   2. Configure the OAuth consent screen and create an OAuth client: a Desktop app client works as is; a Web application client needs `http://127.0.0.1:5555` as an authorised redirect URI.
   3. Put the client ID and secret in the backend `.env` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
   4. On a machine with a browser (port 5555 free) run `npm run google:auth`, open the printed URL and approve with the Google account whose calendar should hold the meetings.
   5. Copy the printed refresh token to `GOOGLE_REFRESH_TOKEN` and restart. Nothing is saved to disk by the script.
   6. If the consent screen is left in "Testing", Google expires the refresh token after 7 days; publish the app to keep it valid.
5. **Holidays**: edit `data/holidays.json` (a list of `{ "date": "YYYY-MM-DD", "name": "..." }`; Sundays and second Saturdays are closed by rule and are skipped), then run `npm run seed:holidays`. It is safe to repeat. After that staff manage holidays in Admin, Settings.
6. **Deploy the backend** behind HTTPS with the variables above. Point the host's health check at `GET /health` (200 when MongoDB is connected, 503 otherwise).
7. **Deploy the frontend**: set the two `VITE_` variables in the host, run `npm run build`. `vercel.json` already rewrites every path to `index.html`.
8. **Smoke test on the live site**: send a query (email arrives), book a virtual meeting (OTP email, booking, Meet link), request a callback, sign in to the admin panel, block and unblock a slot, change nothing else.

## 4. Known limitations

### Product

- **Pages that do not exist yet**: Terms, Privacy notice, Cookie notice, POSH policy, Accessibility, Online security and Sitemap (footer), Our Work (Projects, Clientele) and Career (Work Life, Want to Join). Their links open the Not Found page. Legal pages should be added before a public launch.
- **Indian mobile numbers only** (10 digits starting 6 to 9, optional +91 or 0).
- **Customers cannot cancel or reschedule** a meeting or a callback themselves; staff do it in the admin panel and the customer is emailed.
- **One upcoming virtual meeting per email address.**
- **One shared admin account**; there is no per-person login, password reset or role. The employee name is typed, not verified.
- **Retention**: bookings, requests and blocks are deleted 30 days after their date; the audit log after 180 days.
- **Emails are sent after the response and are not retried**; a failure is only logged. A failed company notification for the query form is reported to the visitor as an error.
- **Meet links depend on Google**; when Google fails the booking stays confirmed without a link until staff retry it.

### Website behaviour

- The feedback form allows one submission per hour per browser (a browser-side limit, stricter than the server's), and keeps an unsent draft in the browser's local storage.
- The query form shows a general error in a browser alert box; the other forms show it on the page.
- API requests have no time limit; on a connection that hangs, a form keeps showing its loading state until the browser gives up.
- The admin panel is part of the public JavaScript bundle (about 215 kB gzip in total).

### Operations

- Rate limit counters live in the server's memory: with more than one backend instance each keeps its own count.
- The request ID header is not exposed to browser scripts (CORS `exposedHeaders` is not set).
- A 500 error line in the server log can contain submitted values quoted by a database error; phone numbers are masked, email addresses are not.
- `npm audit` still lists three advisories in development tooling (nodemon); none ship to production.

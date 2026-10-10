# Hunter Islamic Agro Farm Frontend

Frontend application for **Hunter Islamic Agro Farm**, an Islamic agro-farm investment platform where investors and sharks can browse agricultural projects, buy investment shares, track payments/shares, and manage appointment workflows with admins.

The backend ERD diagram is available here: [ERD Diagram](https://github.com/0xiloveyou/hunter-islamic-agro-farm-backend/blob/main/ERD%20Diagram.png)

![Hunter Islamic Agro Farm ERD](https://github.com/0xiloveyou/hunter-islamic-agro-farm-backend/blob/main/ERD%20Diagram.png?raw=true)

## Features

- Public marketing pages for home, about, contact, FAQs, blogs, projects, privacy policy, disclaimer, and terms.
- User registration, email OTP verification, login, logout, refresh-token handling, and Google OAuth login.
- Role-aware dashboard access for admins, investors, and sharks.
- Public project listing with backend-supported pagination, search, filters, and sorting.
- Stripe checkout flow for buying shares.
- Investor and shark share summary/payment workflows.
- Shark application flow for eligible users.
- Shark appointment scheduling and booking flow.
- Admin dashboard for analytics, project creation, schedule creation, appointment approval, and shark application approval.

## User Roles

### Admin

- View dashboard analytics.
- Create agro investment projects.
- Create shark appointment schedules.
- Review and approve appointment requests.
- Review and approve shark applications.
- Navigate to public projects and share pages from the dashboard.

### Investor

- Register, verify account, and log in.
- Browse projects.
- Buy investment shares at USD 1,000 per share.
- Apply to become a shark.
- View dashboard and share information.

### Shark

- Access shark dashboard.
- Browse projects.
- Buy higher-value shares at USD 50,000 per share.
- View available schedules and book appointments.
- View share and payment-related information.

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, shadcn-style components, Base UI, Lucide icons
- **Forms and validation:** TanStack Form, Zod
- **Server state:** TanStack Query
- **HTTP client:** ofetch
- **Authentication:** HTTP-only cookie based auth with refresh-token retry support
- **OAuth:** Google OAuth
- **Tooling:** Biome, Bun

## Project Structure

```text
src/
  api/                 API request functions
  app/                 Next.js App Router pages and layouts
  assets/              Local React assets
  components/          Shared UI, auth, dashboard, layout, form, and module components
  hooks/               TanStack Query hooks and utility hooks
  lib/                 API client and shared helpers
  providers/           App-level providers
  routes/              Dashboard sidebar route definitions
  types/               Shared TypeScript types
  validation/          Validation schemas
public/                Static images and icons
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

The backend must be running and configured to allow credentialed CORS requests from the frontend origin.

## Getting Started

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
bun dev       # Start the Next.js development server
bun build     # Build the production application
bun start     # Start the production server
bun lint      # Run Biome checks
bun format    # Format files with Biome
```

## Important Routes

| Route | Description |
| --- | --- |
| `/` | Public home page |
| `/projects` | Public project listing |
| `/login` | User login |
| `/register` | User registration |
| `/register/verify-account` | Email OTP verification |
| `/admin` | Admin dashboard |
| `/admin/approve-shark` | Shark application approval |
| `/investor` | Investor dashboard |
| `/shark` | Shark dashboard |
| `/shares` | Share purchase page |
| `/payment/success` | Stripe success page |
| `/payment/cancel` | Stripe cancel page |

## Backend API

This frontend is designed for the Hunter Islamic Agro Farm backend API. Core backend flows include:

- Authentication and refresh tokens
- Google OAuth
- Project management
- Shark applications
- Appointment schedules and approvals
- Stripe checkout and payment verification
- Share tracking
- Admin analytics

For a route-by-route list of which frontend pages call which backend endpoints, see [API Documentation](./API-Documentation.md).

Backend repository ERD: [hunter-islamic-agro-farm-backend ERD Diagram](https://github.com/0xiloveyou/hunter-islamic-agro-farm-backend/blob/main/ERD%20Diagram.png)

# API Documentation

This file documents the backend API calls used by the Hunter Islamic Agro Farm frontend.

Base URL is configured with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

All paths below are relative to `NEXT_PUBLIC_API_BASE_URL`.

## Frontend Routes & API Integration

| Next.js Route | Component/Feature | Backend API Consumption |
| --- | --- | --- |
| `/` | Public home page / marketing landing page | No page-specific API call. Shared `Header` may call `GET /auth/me` to detect the logged-in user and `POST /auth/logout` when signing out. |
| `/about-us` | Public about page | No page-specific API call. Shared `Header` auth calls may run. |
| `/contact` | Public contact page | No page-specific API call. Shared `Header` auth calls may run. |
| `/faqs` | Public FAQ page | No page-specific API call. Shared `Header` auth calls may run. |
| `/blogs` | Public blogs page | No page-specific API call. Shared `Header` auth calls may run. |
| `/privacy-policy` | Public privacy policy page | No backend API consumption. |
| `/disclaimer` | Public disclaimer page | No backend API consumption. |
| `/terms-and-conditions` | Public terms page | No backend API consumption. |
| `/projects` | Public project listing with search, pagination, and sorting | `GET /projects?page=1&limit=20&searchTerm={value}&sortBy=createdAt&sortOrder=desc`. Falls back to `GET /v1/projects` if the first endpoint fails. |
| `/login` | Login form and Google OAuth login | `POST /auth/login` with email/password credentials. Google login uses `POST /auth/google` with an ID token. |
| `/register` | User registration form | `POST /auth/register` with registration payload. |
| `/register/verify-account` | Email OTP verification form | `POST /auth/verify-email` with verification payload. |
| `/admin` | Admin dashboard, analytics, project creation, schedule creation, and appointment approval | `GET /analytics/admin` with fallback `GET /v1/analytics/admin`; `GET /projects?page=1&limit=1`; `POST /projects`; `POST /admin/schedule`; `GET /admin/appointment-requests`; `PATCH /admin/appointment-requests/{appointmentId}/approve` with fallback `PATCH /appointment-requests/{appointmentId}/approve`. |
| `/admin/approve-shark` | Admin shark application review and approval | `GET /admin/accept-shark`; `PATCH /admin/accept-shark/{userId}`. |
| `/investor` | Investor dashboard, share/payment summary, and shark application | `GET /share/my-shares`; `GET /payments/my-payments`; `POST /user/apply-as-shark`. |
| `/shark` | Shark dashboard, appointment booking, share/payment summary | `GET /user/schedules`; `GET /user/my-appointment`; `POST /user/book-appointment`; `GET /share/my-shares`; `GET /payments/my-payments`. |
| `/shares` | Share purchase page and Stripe checkout redirect | `GET /auth/me` to determine role-based share price; `POST /payments/create-checkout` with share count. |
| `/payment/success` | Stripe payment success page | No API call in this frontend page. Backend/payment provider completes payment verification outside this page. |
| `/payment/cancel` | Stripe payment cancellation page | No API call in this frontend page. |

## Shared Backend Services

| File/Helper | Purpose | Backend API Consumption |
| --- | --- | --- |
| `src/lib/apiClient.ts` | Shared `ofetch` client. Sends credentialed requests with `credentials: "include"` and uses `NEXT_PUBLIC_API_BASE_URL` as the base URL. | Retries protected requests after `POST /auth/refresh-token` when a non-auth endpoint returns `401`. Refresh is skipped for login, register, verify email, logout, Google OAuth, and refresh-token requests. |
| `src/api/auth.api.ts` | Authentication API helper functions. | `POST /auth/login`; `POST /auth/register`; `POST /auth/verify-email`; `POST /auth/logout`; `POST /auth/refresh-token`; `GET /auth/me`; `POST /auth/google`. |
| `src/api/platform.api.ts` | Main platform API helper functions for projects, analytics, sharks, schedules, appointments, payments, and shares. | `GET /projects`; `POST /projects`; `GET /analytics/admin`; `GET /admin/accept-shark`; `PATCH /admin/accept-shark/{userId}`; `POST /admin/schedule`; `GET /admin/appointment-requests`; `PATCH /admin/appointment-requests/{appointmentId}/approve`; `GET /user/schedules`; `POST /user/book-appointment`; `GET /user/my-appointment`; `POST /user/apply-as-shark`; `POST /payments/create-checkout`; `GET /payments/my-payments`; `GET /share/my-shares`. |
| `src/hooks/auth.hook.ts` | TanStack Query/Mutation wrappers for authentication calls. | Wraps all helpers from `auth.api.ts` and exposes query key `["user"]` for `GET /auth/me`. |
| `src/hooks/platform.hook.ts` | TanStack Query/Mutation wrappers for platform calls and cache invalidation. | Wraps all helpers from `platform.api.ts`; invalidates projects, analytics, schedules, appointments, shark applications, payments, and shares where needed. |
| `src/components/auth/auth-guard.tsx` | Protects authenticated routes. | Uses `GET /auth/me`. |
| `src/components/auth/role-guard.tsx` | Protects role-specific dashboard routes. | Uses `GET /auth/me`. |
| `src/components/layout/public/Header.tsx` | Displays login/user navigation and handles logout. | Uses `GET /auth/me` and `POST /auth/logout`. |
| `src/components/form/login-form.tsx` | Email/password login form. | Uses `POST /auth/login`; Google login module uses `POST /auth/google`. |
| `src/components/form/register-form.tsx` | Registration form. | Uses `POST /auth/register`. |
| `src/components/form/verify-account-form.tsx` | Account verification form. | Uses `POST /auth/verify-email`. |

## Endpoint Summary

| Method | Endpoint | Used For |
| --- | --- | --- |
| `POST` | `/auth/login` | User login. |
| `POST` | `/auth/register` | User registration. |
| `POST` | `/auth/verify-email` | Email OTP/account verification. |
| `POST` | `/auth/logout` | User logout. |
| `POST` | `/auth/refresh-token` | Refresh expired access token and retry protected requests. |
| `GET` | `/auth/me` | Current user lookup for guards, header, and share pricing. |
| `POST` | `/auth/google` | Google OAuth login. |
| `GET` | `/projects` | Public/admin project listing with query params. |
| `GET` | `/v1/projects` | Fallback project listing endpoint. |
| `POST` | `/projects` | Admin project creation. |
| `GET` | `/analytics/admin` | Admin dashboard analytics. |
| `GET` | `/v1/analytics/admin` | Fallback admin analytics endpoint. |
| `GET` | `/admin/accept-shark` | Admin list of shark applications. |
| `PATCH` | `/admin/accept-shark/{userId}` | Admin approval for a shark application. |
| `POST` | `/admin/schedule` | Admin creates available shark appointment schedule. |
| `GET` | `/admin/appointment-requests` | Admin list of appointment requests. |
| `PATCH` | `/admin/appointment-requests/{appointmentId}/approve` | Admin approves appointment and saves meeting URL. |
| `PATCH` | `/appointment-requests/{appointmentId}/approve` | Fallback appointment approval endpoint. |
| `GET` | `/user/schedules` | Shark dashboard list of available appointment schedules. |
| `POST` | `/user/book-appointment` | Shark books/requests an appointment. |
| `GET` | `/user/my-appointment` | Shark dashboard current appointment lookup. |
| `POST` | `/user/apply-as-shark` | Investor applies for shark access. |
| `POST` | `/payments/create-checkout` | Create Stripe checkout session for share purchase. |
| `GET` | `/payments/my-payments` | Current user's payment history. |
| `GET` | `/share/my-shares` | Current user's share summary. |

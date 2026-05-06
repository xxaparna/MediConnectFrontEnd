# 🏥 MediConnect Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-v7-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.11-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> The React frontend for MediConnect — a complete healthcare management platform where patients submit medical problems, book appointments, track prescriptions, and manage medicine reminders, while doctors review cases, prescribe treatments, and manage their schedule.

---

## 📁 Project Structure

```
mediconnect-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
└── src/
    ├── App.js                        # Root component, routing, theme provider
    ├── theme.js                      # Global MUI theme (colors, typography, components)
    ├── index.js                      # React entry point
    ├── constants/
    │   └── NetworkConstants.js       # Backend base URL constant
    ├── contexts/
    │   └── AuthContext.js            # Global auth state (user, token, login, logout)
    ├── components/
    │   └── HeroSection.js            # Landing page with inline login/register modals
    └── pages/
        ├── LoginPage.js              # Standalone login page
        ├── RegisterPage.js           # Standalone registration page
        ├── PatientDashboard.js       # Patient home — submit problems, book appointments
        ├── DoctorDashboard.js        # Doctor home — manage cases, prescribe, appointments
        ├── AppointmentsPage.js       # View appointments (role-aware)
        ├── PrescriptionsPage.js      # View prescriptions (role-aware)
        ├── MedicineReminder.js       # Create and manage medicine reminders
        └── Profile.js                # View and edit profile (role-aware)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MediConnect backend running (see `../backend/README.md`)

### Installation

```bash
# Navigate to the frontend directory
cd mediconnect-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Configuration

### Backend URL

All API calls are centralized through a single constant. To switch between local development and production, edit:

```js
// src/constants/NetworkConstants.js
export default class NetworkConstants {
    static BASE_URL = "https://mediconnectbackend-h1s4.onrender.com";
}
```

Change `BASE_URL` to `http://localhost:5000` for local development.

---

## 🗺️ Routing

Routing is handled by **React Router v7**. The `PrivateRoute` wrapper protects role-specific pages.

| Path | Component | Access |
|---|---|---|
| `/` | Redirects based on auth state | Public |
| `/login` | `LoginPage` | Public |
| `/register` | `RegisterPage` | Public |
| `/patient` | `PatientDashboard` | 🔒 Patient only |
| `/doctor` | `DoctorDashboard` | 🔒 Doctor only |
| `/appointments` | `AppointmentsPage` | 🔒 Authenticated |
| `/prescriptions` | `PrescriptionsPage` | 🔒 Authenticated |
| `/medicine-reminders` | `MedicineReminder` | 🔒 Authenticated |
| `/profile` | `Profile` | 🔒 Authenticated |

### Route Guard Logic

```
User not logged in  →  Redirect to /login
User is patient     →  Redirect to /patient
User is doctor      →  Redirect to /doctor
Wrong role access   →  Redirect to /
```

---

## 🔐 Authentication

Auth state is managed globally via **React Context** (`AuthContext`).

### What it stores

| Key | Description |
|---|---|
| `user` | `{ _id, name, email, role }` |
| `token` | JWT Bearer token |

### How it works

- On login, `user` and `token` are saved to both React state and `localStorage` (`mediconnectUser`, `mediconnectToken`).
- An **axios interceptor** automatically attaches `Authorization: Bearer <token>` to every outgoing request.
- On logout, state and localStorage are cleared and the axios header is removed.
- On page refresh, state is rehydrated from `localStorage`.

### Usage in any component

```js
import { useAuth } from "../contexts/AuthContext";

const { user, token, login, logout } = useAuth();
```

---

## 📄 Pages

### 🏠 HeroSection (Landing Page)

The public-facing landing page shown to unauthenticated users. Features:

- Animated gradient hero banner with the MediConnect branding
- Feature highlights grid (Expert Care, Appointments, Reminders, Health Records)
- **Inline Login modal** — sign in without leaving the page
- **Inline Register modal** — create an account with role and speciality selection
- After successful login, redirects to the appropriate dashboard based on role

---

### 🔑 LoginPage `/login`

Standalone login page with:

- Email, role selector (Patient / Doctor), and password fields
- Password visibility toggle
- Role mismatch validation — prevents a doctor from logging in as a patient and vice versa
- Redirects to `/patient` or `/doctor` on success

---

### 📝 RegisterPage `/register`

Multi-field registration form with:

- Full name, email, role selector
- Conditional **speciality dropdown** (only shown when role is `doctor`)
- Password + confirm password with visibility toggles and minimum length validation
- On success, redirects to `/login` after a 2-second delay

**Supported Specialities**

| Value | Label |
|---|---|
| `general` | General Physician |
| `gyanae` | Gynaecology |
| `ent` | ENT |
| `physiotherapist` | Physiotherapy |
| `dentist` | Dentistry |
| `ortho` | Orthopaedics |
| `derma` | Dermatology |

---

### 🧑‍💼 PatientDashboard `/patient`

The patient's home screen. Features:

- **Submit Medical Problem** — select speciality type, describe the problem, set duration and notes. The backend auto-assigns a matching doctor.
- **Book Appointment** — select from available doctors, pick a date and time slot.
- Quick-access buttons in the top bar: View Prescriptions, View Appointments, Manage Medicine Reminders.
- Avatar menu with Profile and Logout options.

---

### 👨‍⚕️ DoctorDashboard `/doctor`

The doctor's home screen. Features:

- **Assigned Problems** — card grid of pending patient cases. Click a card to select it.
- **Prescription Form** — dynamically add/remove medicines `(name, dosage, frequency)` and routines `(activity, timing)` for the selected case.
- **Mark as Treated** — mark a prescribed case as fully treated.
- **Appointments Panel** — view all assigned appointments with patient details. Approve or mark as treated.
- **Treated Appointments** — historical view of completed appointments.
- Quick-access buttons: View Appointments, View Prescriptions.
- Avatar menu with Profile and Logout options.

---

### 📅 AppointmentsPage `/appointments`

Role-aware appointments viewer:

- **Patients** see their own booked appointments with doctor name, speciality, date, time slot, and status chip.
- **Doctors** see all appointments assigned to them with patient details.
- Status chips with color coding: `pending` → warning, `confirmed` / `approved` → success, `cancelled` → error.

---

### 💊 PrescriptionsPage `/prescriptions`

Role-aware prescriptions viewer:

- **Patients** see all prescriptions issued to them, with the linked problem description, medicines, and routines.
- **Doctors** see all prescriptions they have submitted.

---

### ⏰ MedicineReminder `/medicine-reminders`

Patient-only medicine reminder manager:

- Lists all active reminders with medicine name, dosage, schedule times, date range, and status chip.
- **Add Reminder dialog** — enter medicine name, dosage, comma-separated times (e.g. `08:00, 14:00, 20:00`), start date, and end date.
- **Mark as Taken** button on each reminder.
- On creation, the backend automatically schedules email reminders via Resend for the next 72 hours.

---

### 👤 Profile `/profile`

Role-aware profile page:

- Displays name, email, phone, and role-specific fields.
  - **Patient**: age, gender
  - **Doctor**: specialisation, experience
- Inline edit mode with save/cancel.
- **Statistics panel** (doctors): total problems treated, appointments completed, prescriptions given.
- **Medical history** (patients): list of submitted problems.
- **Recent treated problems** (doctors): last 5 cases with patient name, type, and description.
- Quick-access buttons: Prescriptions, Appointments.

---

## 🎨 Theme

The global MUI theme is defined in `src/theme.js`.

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary | Medical Blue | `#2563eb` |
| Secondary | Medical Green | `#10b981` |
| Info / Accent | Medical Purple | `#8b5cf6` |
| Warning | Amber | `#f59e0b` |
| Error | Red | `#ef4444` |
| Background | Soft White | `#f8fafc` |
| Text Primary | Dark Slate | `#1e293b` |

### Typography

- Font family: **Inter**, Roboto, Helvetica, Arial
- All button text transforms are disabled (`textTransform: 'none'`)
- Consistent font weights: headings 600–700, body 400

### Component Overrides

| Component | Customization |
|---|---|
| `MuiButton` | 12px radius, lift on hover, shadow on contained |
| `MuiTextField` | 12px radius, blue focus ring, subtle border |
| `MuiPaper` | 16px radius, layered shadow system |
| `MuiCard` | 16px radius, lift on hover |
| `MuiChip` | 8px radius, medium weight |
| `MuiAlert` | 12px radius |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1.1 | UI library |
| `react-dom` | ^19.1.1 | DOM rendering |
| `react-router-dom` | ^7.8.0 | Client-side routing |
| `@mui/material` | ^7.3.1 | Component library |
| `@mui/icons-material` | ^7.3.1 | Icon set |
| `@emotion/react` | ^11.14.0 | MUI styling engine |
| `@emotion/styled` | ^11.14.1 | MUI styled components |
| `axios` | ^1.11.0 | HTTP client |
| `web-vitals` | ^2.1.4 | Performance metrics |

---

## 📜 Scripts

```bash
npm start        # Start development server on http://localhost:3000
npm run build    # Production build to /build
npm test         # Run test suite
npm run eject    # Eject CRA config (irreversible)
```

---

## 🔒 Auth Flow Summary

```
User visits /
      ↓
Not logged in → HeroSection shown
      ↓
User clicks Sign In → Login modal opens
      ↓
POST /api/auth/login → JWT returned
      ↓
AuthContext stores user + token
axios interceptor attaches token globally
      ↓
Redirect → /patient or /doctor
      ↓
PrivateRoute guards all protected pages
      ↓
Logout → clears state + localStorage + axios header
```

---

*Built with ❤️ for MediConnect — Your Health Companion*

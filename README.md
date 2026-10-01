# dirasa-client

> **Dirasa** — Modern, Enterprise-Grade School Information & Management System (SIS / SMS) Frontend.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Designed for high productivity with high-contrast accessibility (WCAG AAA), seamless Light/Dark mode theming, and an intuitive UI inspired by modern SIS platforms like DreamClass.

---

## 🌟 Key Features

### 1. 📅 Timetable & Interactive Calendar Suite
- **Dual View Modes**: Switch between graphical **Calendar Grid** (day/week/month with overlapping multi-lane course blocks) and a sequential **Lessons Table**.
- **Interactive Popovers**: Click any lesson block for quick metadata, teacher assignments, and live status actions (`SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- **Scheduling Engines**:
  - `Add Recurring Lesson`: Multi-day selector (Mon/Wed/Fri), term interval rules, clash detection.
  - `Add Single Lesson`: Instant date, classroom, remote video links, and credentials.
  - `Add School Event`: Color-coded assembly/meeting scheduler with student & faculty visibility controls.
  - Dedicated full-page scheduler at `/calendar/new`.
- **Print & Export**: One-click printable calendar grid and lessons broadsheet.

### 2. 👨‍🎓 Comprehensive Student Information System (SIS)
- **Student Directory (`/students`)**: Roster of enrolled scholars with live search, grade filters, attendance rates, overdue tuition indicators, and safeguarding tags.
- **Dedicated Admission & Enrollment (`/students/new`)**: 5-tab registration covering biodata, guardian pickup permissions, medical notes, custody court orders, and tuition tier selection.
- **Student 360 Profile (`/students/[id]`)**: Full student profile with 6 tabs:
  - Personal details & family cards
  - Academic transcript & term grades
  - Weekly period timetable
  - Attendance heat register
  - Fee ledger with interactive M-Pesa STK push & Paystack checkout
  - Safeguarding & pastoral observation records

### 3. 👩‍🏫 Faculty & Staff Management
- **Teacher Directory (`/teachers`)**: Departmental breakdown, subject allocations, course load metrics, and CSV export.
- **Faculty Onboarding (`/teachers/new`)**: 5-tab onboarding flow with qualifications, teaching subjects, timetable assignment, and emergency contacts.
- **Teacher 360 Profile (`/teachers/[id]`)**: Overview, master timetable, verified degrees & certifications, leave request management, and payroll/compensation details.

### 4. 🏫 Academic Classes & Curriculum
- **Class Roster Hub (`/classes`)**: Class sections with homeroom teachers, room assignments, shifts, and capacity meters.
- **Class Creation (`/classes/new`)**: Configure sections, grade levels, rooms, and curriculum course catalog matrix.
- **Class Detail Hub (`/classes/[id]`)**: Enrolled student roster, subject syllabus progress, timetable, and grade distribution.

### 5. 💳 Fees, Invoicing & Payments
- **Financial Dashboard (`/fees` / `/finance`)**: Overdue invoices, collected revenue, and double-entry general ledger.
- **Invoice Generator (`/fees/new`)**: Multi-item fee line-item builder, scholarship/bursary discounts, split-billing configurations between guardians, and term conditions.
- **Integrated Payment Simulator**:
  - 📲 **M-Pesa STK Push**: Instant phone prompt checkout with live polling and receipt generation.
  - 💳 **Paystack Card Checkout**: Card processing simulation.
  - 🏦 **Direct Wire Transfer**: Bank verification workflow.

### 6. 🎨 High-Contrast & Adaptive Dark/Light Theming
- **Tailwind CSS v4** `@custom-variant dark (&:where(.dark, .dark *));`.
- WCAG AAA contrast ratios across all typography, borders, badges, cards, and inputs.
- Persistent `ThemeProvider` with 3-way toggle (Light / Dark / System) in the sidebar.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm**, **pnpm**, or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/Mutwiricris/dirasa-client.git
cd dirasa-client

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and optimize for production
npm run build

# Start the production server
npm start
```

---

## 📁 Project Architecture

```
dirasa-client/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login, Forgot Password, Reset Password, Accept Invite
│   │   ├── calendar/           # Timetable & Calendar suite, /calendar/new
│   │   ├── classes/            # Class hubs, /classes/new, /classes/[id]
│   │   ├── students/           # SIS Directory, /students/new, /students/[id]
│   │   ├── teachers/           # Faculty directory, /teachers/new, /teachers/[id]
│   │   ├── fees/               # Billing ledger, /fees/new invoice builder
│   │   ├── attendance/         # Roll call attendance register
│   │   ├── grading/            # Multi-scale gradebook & report cards
│   │   ├── admissions/         # Application forms & admissions pipeline
│   │   ├── layout.tsx          # Root layout with ThemeProvider
│   │   └── globals.css         # Tailwind v4 styles & contrast tokens
│   ├── components/
│   │   ├── layout/             # AppSidebar, AppHeader
│   │   ├── theme/              # ThemeProvider, ThemeToggle
│   │   └── ui/                 # HighContrastBadge, HighContrastCard, PageHeader, Breadcrumbs
│   └── lib/                    # Authentication, mock dataset, utils
└── package.json
```

---

## 📄 License
Private & Proprietary — Redco Academy / Dirasa System.

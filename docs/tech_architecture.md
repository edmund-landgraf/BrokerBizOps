# Technical Architecture: BrokerBizOps (Sams Valuations)

## 🏢 1. System Philosophy
The BrokerBizOps platform is engineered as a **Fiduciary-First Asset Management Dashboard**. It is designed to bridge the gap between high-fidelity public marketing and secure, offline-capable administrative tools for probate and REO brokerage.

---

## 🛠️ 2. Core Technology Stack

### Frontend Foundation
- **React 18 (TypeScript)**: Utilizing a strict type-safe architecture for all data models (Leads, Orders, Documents).
- **Vite**: Serves as the primary build engine and dev-server, configured with a custom middleware layer for persistence.
- **React Router v6**: Implements a declarative routing model with specialized "Admin" and "Client Portal" protected paths.

### Styling & Design System
- **Tailwind CSS**: Custom `tailwind.config.js` extension for the **Sams Gold (#c5a059)** and **Slate (#0f172a)** palette.
- **Typography**: Dual-typeface system using *Playfair Display* (Serif) for fiduciary authority and *Inter/Roboto* (Sans) for data clarity.
- **Framer Motion**: State-driven animations for modal transitions, success states, and the "painless" portal login experience.

### Specialized Engines
- **BPO Document Engine**: 
    - Built on **jsPDF** and **jsPDF-autotable**. 
    - Implements a dynamic Y-coordinate tracking system to prevent overlap in multi-section reports.
    - Features digital signature rendering and compliance-mandated fiduciary footers.
- **Knowledge Base (KB) Widget**:
    - Uses a **React Native Web** bridge to support `@ronradtke/react-native-markdown-display`.
    - This architecture allows for 100% granular control over markdown rendering styles (line heights, heading colors, bullet points) that traditional web-markdown parsers lack.

---

## 📦 3. Architectural Components & Data Flow

### A. The Persistence Layer (Vite Middleware API)
Rather than a traditional SQL database, the prototype utilizes a **Local I/O Persistence Layer** managed via `vite.config.ts`.
- **Workflow**: 
    1. Frontend `fetch('/api/contact', { method: 'POST' })`
    2. Vite Middleware intercepts the request.
    3. `fs` (Node.js FileSystem) writes a timestamped JSON node to `/backups/submissions/`.
- **Logic**: This provides a "painless" development experience with zero-config database setup while ensuring lead data is locally persisted and Git-ready.

### B. Admin & Knowledge Management
- **Docs API**: Automates the discovery of `.md` files in the `/docs` directory and maps them to the `AdminDocsPage` UI.
- **Live Editing**: Uses the bridge to save real-time changes back to the disk, ensuring the "Strategic Knowledge Base" is always in sync with the codebase.

### C. Secure Client Portal
- **Session Simulation**: Implements a mock auth state (`PortalPage.tsx`) that transitions into the `PortalDashboard`.
- **Pay-to-Download Logic**: 
    - Stores order metadata in React Router state during checkout navigation.
    - Locks property addresses and Order IDs to ensure billing integrity for BPOs.
    - Unlocks the `generateSamplePDF` utility only upon state-verified success.

---

## 🚀 4. Feature Implementation Details

### Lead Management (Admin Inbox)
- **Search Logic**: Implements a dual-layer filter (Address and ID) using client-side memoization for instant performance.
- **JSON Nodes**: Each lead is a discrete object, allowing for easy migration to a MongoDB or PostgreSQL JSONB column in the future.

### PDF Report Logic
- **coordinate tracking**: The `generateSamplePDF` utility uses a `Math.max()` calculation for the signature area, ensuring it always lands below the dynamic content of the Fiduciary Disclosure, regardless of report length.
- **Branding consistency**: Colors are hardcoded as RGB arrays `[197, 160, 89]` to match the CSS theme precisely across print and digital.

---

## 🔒 5. Security & Privacy
- **Local-First Backups**: Lead submissions are stored in `/backups/`, which is listed in `.gitignore` by default to prevent client PII (Personally Identifiable Information) from hitting public repositories.
- **SSL Disclosure**: The UI implements secure checkout badges and PCI-compliance mockups to establish user trust during the valuation order process.

---

## 📈 6. Scaling & Roadmap
- **Automated Alerts**: Roadmap for implementing real-time Email (Resend) and SMS (Twilio) notifications. See [Automation & Notifications Guide](file:///d:/repos/BrokerBizOps/docs/automation_notifications.md).
- **Live Payments**: Strategy for transitioning to Stripe/ACH bank payouts. See [Payment & ACH Integration Guide](file:///d:/repos/BrokerBizOps/docs/payment_integration.md).
- **Fiduciary SOPs**: Detailed standards for court-defensible BPOs. See [BPO SOP Guide](file:///d:/repos/BrokerBizOps/docs/bpo_sop_fiduciary.md).
- **Legal Frameworks**: Templates and clauses for complex service contracts. See [Engagement Letter Framework](file:///d:/repos/BrokerBizOps/docs/engagement_letter_framework.md).
- **Local SEO dominance**: Strategy for ranking in high-value legal search niches. See [Local SEO & GMB Strategy](file:///d:/repos/BrokerBizOps/docs/local_seo_gmb_strategy.md).
- **Security & HTTPS**: Guide for installing and maintaining SSL certificates. See [SSL Installation Guide](file:///d:/repos/BrokerBizOps/docs/ssl_installation_guide.md).
- **Lead Sourcing**: Strategy for scouring BPO platforms and asset management portals. See [BPO Lead Sources Strategy](file:///d:/repos/BrokerBizOps/docs/bpo_lead_sources_strategy.md).
- **Database Migration**: The middleware pattern is designed for easy replacement with a standard Express server and a DB adapter (Prisma/TypeORM).
- **AdWords Integration**: Documentation for the AdWords strategy is stored natively within the KB to allow for future automated landing page generation based on target keywords.
- **Real PDF Storage**: Moving from client-side generation to server-side (Puppeteer/Node-PDF) for background report delivery.

# Live Style Platform Product Requirements Document (PRD)

## 1. Goals and Background Context

### Goals
- Deliver a comprehensive management platform for the Live Style agency (a TikTok Lives agency).
- Provide a Partner Portal (Hotmart style) with courses, training, and a community area for partners.
- Provide an Admin Portal for internal team management and operational workflows.
- Implement an automated recruiting CRM to capture and manage prospective artists/singers.
- Integrate automated omnichannel messaging (WhatsApp, Instagram, TikTok) and emails for prospect outreach.
- Provide a robust dashboard with metrics, KPIs, and automated reports for data-driven decisions.

### Background Context
Live Style is an agency specializing in TikTok Lives, focusing on recruiting and managing artists and singers. The current process requires significant manual effort to capture leads from various platforms (YouTube, TikTok, Instagram, Google), qualify them, and communicate with them. This platform aims to centralize and automate the entire recruitment lifecycle—from active capture to automated outreach, selection forms, and omnichannel follow-ups. Furthermore, it serves as an educational hub where approved partners can access necessary training and community support.

### Change Log
| Date       | Version | Description                   | Author      |
| ---------- | ------- | ----------------------------- | ----------- |
| 2026-03-10 | 1.0     | Initial draft based on prompt | aiox-master |

---

## 2. Requirements

### Functional Requirements
- **FR1:** The system shall provide a Partner Login that redirects to a dedicated Members Area containing courses, training materials, and a community forum.
- **FR2:** The system shall provide an Admin Login that redirects to an internal team management and CRM dashboard.
- **FR3:** The CRM shall automatically capture prospect data from external sources (YouTube, TikTok, Instagram, Google) and ingest them into the recruitment pipeline.
- **FR4:** The CRM shall utilize automated agents/workers to transition prospects between pipeline stages based on predefined conditions.
- **FR5:** The system shall automatically send selection forms to prospects at the designated pipeline stage.
- **FR6:** The system shall integrate a centralized omnichannel inbox capable of sending and receiving messages via WhatsApp, Instagram, and TikTok.
- **FR7:** The system shall support the creation of automated messaging flows for WhatsApp, Instagram, and TikTok linked to specific CRM triggers.
- **FR8:** The system shall support automated email sequences that work in tandem with the messaging flows.
- **FR9:** The system shall provide customizable dashboards displaying recruitment metrics, agent KPIs, and generating automated reports.

### Non-Functional Requirements
- **NFR1:** The system must ensure secure authentication and authorization with role-based access control (Admin vs. Partner).
- **NFR2:** The messaging integration must comply with the rate limits and API guidelines of WhatsApp, Instagram, and TikTok.
- **NFR3:** The UI must be responsive and accessible across desktop and mobile devices.

---

## 3. User Interface Design Goals

### Overall UX Vision
A modern, clean, and highly functional interface that balances a content-rich educational experience (Partner Portal) with a data-dense, efficient workspace (Admin CRM).

### Key Interaction Paradigms
- **Partner Portal:** Video player focused, easy navigation between modules, interactive community threads.
- **Admin CRM:** Kanban-style or list-based pipeline views, split-screen for omnichannel inbox (chat interface next to prospect details), drag-and-drop workflow builders.

### Core Screens and Views
- Public/Partner Login Screen
- Admin Login Screen
- Partner Dashboard & Course Player
- Partner Community Feed
- Admin Master Dashboard (KPIs & Metrics)
- CRM Pipeline View
- Omnichannel Central Inbox View
- Automation Flow Builder (Messaging/Email)

### Target Device and Platforms
- Web Responsive (Primary for Admin CRM)
- Mobile-friendly (Critical for Partner Portal and Inbox on-the-go)

---

## 4. Technical Assumptions

### Repository Structure
- Monorepo (recommended for shared types/schemas between UI and backend services).

### Service Architecture
- Microservices or modular monolith to isolate the heavy API integrations (WhatsApp, TikTok, Meta) from the core CRM and Educational portal.

### Testing Requirements
- Unit testing for business logic (pipeline transitions, workers).
- Integration testing for third-party API webhooks and messaging.
- E2E testing for critical user journeys (login, lead capture, course viewing).

### Additional Technical Assumptions and Requests
- Integration with official WhatsApp Cloud API, Instagram Graph API, and TikTok API.
- Need a background job processing system (e.g., Redis + BullMQ or similar) for automated workers and message queuing.

---

## 5. Epic List

- **Epic 1: Foundation, Auth & Core Admin Management**
  *Goal: Establish project setup, authentication flows for Partners vs. Admins, and basic internal team management.*
  - **Story 1.1: Project Monorepo Scaffolding**
    *As a Developer, I want to set up a Turborepo monorepo with Next.js, Node.js, and shared packages, so that we have a solid foundation for development.*
  - **Story 1.2: Database Schema & ORM Setup**
    *As a Developer, I want to configure PostgreSQL and Prisma/Drizzle with the initial User and Profile schemas, so that we can persist user data.*
  - **Story 1.3: Unified Authentication System (NextAuth/Supabase)**
    *As a User, I want to be able to sign in and out securely, so that my data is protected and I can access my specific portal.*
  - **Story 1.4: Role-Based Access Control (RBAC) & Routing**
    *As a System, I want to redirect Users to their respective dashboards (Admin vs Partner) based on their role, so that the experience is personalized and secure.*
  - **Story 1.5: Core UI Library & Design System Integration**
    *As a Developer, I want to integrate shadcn/ui and TailwindCSS into the monorepo, so that we can build consistent and professional interfaces rapidly.*

- **Epic 2: Partner Members Area (Education & Community)**
  *Goal: Build the Hotmart-style course platform and community forum for approved partners.*
  - **Story 2.1: Partner Dashboard & Course Listing**
    *As a Partner, I want to see the courses I am enrolled in, so that I can start my training.* (COMPLETED)
  - **Story 2.2: Video Player Interface**
    *As a Partner, I want a dedicated video player with a sidebar for modules and lessons, so that I have a premium learning experience.* (COMPLETED)
  - **Story 2.3: Community Forum**
    *As a Partner, I want a space to interact with other creators, so that we can share tips and network.* (TODO)

- **Epic 3: CRM Pipeline & Lead Capture Engine**
  *Goal: Develop the core CRM architecture, pipeline stages, and lead ingestion from external sources.*
  - **Story 3.1: Kanban Pipeline UI**
    *As an Admin, I want to view my leads in a Kanban board grouped by stages, so that I can manage the recruitment funnel.* (COMPLETED)
  - **Story 3.2: Manual Prospect Creation**
    *As an Admin, I want to manually add a prospect to the CRM, so that I can track leads found outside automated channels.* (COMPLETED)
  - **Story 3.3: Webhook Lead Ingestion**
    *As a System, I want an API endpoint to receive leads from external tools (Typeform/Zapier), so that they enter the "New Leads" column automatically.* (COMPLETED)

- **Epic 4: Omnichannel Inbox & Automations**
  *Goal: Integrate WhatsApp, Instagram, TikTok, and Email APIs to centralize communications and enable automated workflow sequences.*
  - **Story 4.1: Centralized Chat UI**
    *As an Admin, I want a chat interface that lists all my prospect conversations and allows me to reply directly, so that I don't have to switch apps.* (COMPLETED)
  - **Story 4.2: Queue Worker Infrastructure (Redis/BullMQ)**
    *As a System, I want a background job queue, so that heavy tasks and automations do not slow down the main API.* (COMPLETED)
  - **Story 4.3: Automated Welcome Message Worker**
    *As a System, I want a worker that detects a new lead, waits 5 seconds, sends a welcome message, and moves them to "Contacted", so that the first touchpoint is immediate.* (COMPLETED)
  - **Story 4.4: Real API Integrations (Meta/WhatsApp)**
    *As a System, I want to connect the chat UI and workers to the real Meta/WhatsApp APIs, so that messages are actually sent to users' phones.* (TODO)

- **Epic 5: Dashboards, KPIs & Reporting**
  *Goal: Provide data visualization, metric tracking, and automated reporting for the recruitment process.*
  - **Story 5.1: Real-time Metric Cards**
    *As an Admin, I want to see the total number of prospects, partners, and messages on my home screen, so that I have a quick pulse of the agency.* (COMPLETED)
  - **Story 5.2: Conversion Charts**
    *As an Admin, I want to see a chart of leads converted over time, so that I can measure recruitment success.* (TODO)

---

## 6. Next Steps

- Review and refine the Epics and Requirements.
- Expand Epics into detailed User Stories.
- Proceed to Architecture Definition (engaging `@architect`) using this PRD as input.
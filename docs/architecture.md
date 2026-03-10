# Live Style Platform Fullstack Architecture Document

## 1. Introduction

This document outlines the complete fullstack architecture for the Live Style Platform, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

### Starter Template or Existing Project
N/A - Greenfield project.

### Change Log
| Date       | Version | Description                   | Author      |
| ---------- | ------- | ----------------------------- | ----------- |
| 2026-03-10 | 1.0     | Initial draft based on PRD    | aiox-master |

---

## 2. High Level Architecture

### Technical Summary
The Live Style Platform will be built using a modern fullstack JavaScript/TypeScript architecture deployed on a scalable cloud provider (e.g., Vercel + AWS). The frontend will use Next.js (React) to deliver both the Partner Portal and the Admin CRM, leveraging Server-Side Rendering (SSR) for SEO/Performance where needed and client-side interactivity for the CRM dashboard. The backend will consist of Node.js services exposing RESTful APIs, with PostgreSQL as the primary relational database and Redis for caching and managing the BullMQ background job queues for the automated CRM workers and omnichannel messaging.

### Platform and Infrastructure Choice
**Platform:** Vercel (Frontend) + Render or AWS (Backend & Database)
**Key Services:** 
- Vercel for Next.js hosting.
- AWS RDS (PostgreSQL) or Supabase.
- Redis (Upstash or ElastiCache) for message queues.
- Meta Graph API / WhatsApp Business API / TikTok API for integrations.

### Repository Structure
**Structure:** Monorepo
**Monorepo Tool:** Turborepo
**Package Organization:** 
- `apps/admin-crm` (Next.js)
- `apps/partner-portal` (Next.js)
- `apps/api` (Node.js)
- `packages/ui` (Shared React components)
- `packages/database` (Prisma/Drizzle schema and clients)
- `packages/config` (ESLint, TSConfig)

### Architectural Patterns
- **Monorepo Architecture:** Centralized codebase for easy sharing of DTOs and UI components - *Rationale:* Improves developer experience and type safety across the stack.
- **Component-Based UI:** Reusable React components with TailwindCSS - *Rationale:* Rapid UI development and consistent design system.
- **Event-Driven Background Workers:** Redis + BullMQ for CRM state transitions and message sending - *Rationale:* Decouples heavy API operations from the main request/response cycle, preventing timeouts.

---

## 3. Tech Stack

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| Frontend Language | TypeScript | 5.x | Type safety | Standard for modern JS |
| Frontend Framework | Next.js (App Router) | 14.x | React framework | Built-in routing, optimized rendering |
| UI Component Library | shadcn/ui + Tailwind | Latest | Styling and UI components | Accessible, highly customizable |
| State Management | Zustand / React Query | Latest | Client state & server state caching | Lightweight and efficient |
| Backend Language | TypeScript | 5.x | Type safety | Code sharing with frontend |
| Backend Framework | Node.js (Express / Fastify) | Latest | API server | Fast, vast ecosystem |
| API Style | REST | 3.0 | Client-Server communication | Standard, easy to integrate with webhooks |
| Database | PostgreSQL | 15+ | Primary data store | Robust relational data modeling |
| ORM | Prisma or Drizzle | Latest | Database access | Type-safe queries |
| Cache & Queues | Redis + BullMQ | Latest | Background jobs, rate limiting | Essential for CRM workers and API rate limits |
| Authentication | NextAuth.js or Supabase Auth | Latest | User identity | Secure, supports multiple providers |

---

## 4. Data Models

**User (Admin / Partner)**
**Purpose:** Core identity for the system.
**Key Attributes:**
- `id`: UUID
- `email`: String
- `role`: Enum (ADMIN, PARTNER)
- `name`: String

**Prospect (Lead)**
**Purpose:** Represents a captured artist/singer in the CRM.
**Key Attributes:**
- `id`: UUID
- `name`: String
- `platform`: String (TikTok, YouTube, etc.)
- `contact_info`: JSON (Phone, social handles)
- `stage_id`: UUID (Foreign Key to Pipeline Stage)

**PipelineStage**
**Purpose:** Represents a stage in the recruitment funnel.
**Key Attributes:**
- `id`: UUID
- `name`: String
- `order`: Integer

**Message**
**Purpose:** Omnichannel message log.
**Key Attributes:**
- `id`: UUID
- `prospect_id`: UUID
- `channel`: Enum (WHATSAPP, INSTAGRAM, TIKTOK)
- `direction`: Enum (INBOUND, OUTBOUND)
- `content`: Text

---

## 5. Components

**Responsibility:** Omnichannel Worker Service
**Key Interfaces:**
- Webhook Listeners (Meta/TikTok)
- Queue Processors (BullMQ)
**Dependencies:** Redis, PostgreSQL, External APIs
**Technology Stack:** Node.js, Redis, BullMQ

---

## 6. External APIs

- **WhatsApp Cloud API:** For sending and receiving automated WhatsApp messages.
- **Instagram Graph API:** For DM automation and listening.
- **TikTok API:** For prospect data enrichment and messaging.

---

## 7. Next Steps

- **Completed:** Monorepo setup, Database schema (PostgreSQL + Prisma), NextAuth implementation, UI Library (shadcn), CRM Pipeline Client, Webhook Ingestion, Redis/BullMQ Worker, Omnichannel Chat UI, and Partner Video Player.
- **Pending Integration:** 
  - Connect the Omnichannel Chat UI to the actual **WhatsApp Cloud API** and **Meta Graph API** (currently it simulates messages in the local DB).
  - Develop the Community Forum within the Partner Portal.
  - Implement real charting libraries (e.g., Recharts) on the Admin Dashboard for visual data analysis.
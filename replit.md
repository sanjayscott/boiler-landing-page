# replit.md

## Overview

This is a lead generation landing page for Worcester Bosch Greenstar boilers. It's a single-page marketing site that showcases three boiler models (Greenstar 2000, 4000, and 8000), highlights key features, and collects customer inquiries through a quote request form. The form data is stored in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript, built using Vite
- **Routing**: Wouter (lightweight React router) — only two routes: Home (`/`) and a 404 catch-all
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives, styled with Tailwind CSS and CSS variables for theming
- **Animations**: Framer Motion for scroll animations and hover effects
- **Forms**: React Hook Form with Zod validation (via `@hookform/resolvers`)
- **Data Fetching**: TanStack React Query for server state management
- **Brand Colors**: Worcester Bosch palette — Dark Blue `#005F9E`, Light Blue `#007BC0`, with clean whites/greys. Defined as CSS custom properties in `client/src/index.css`

### Backend
- **Framework**: Express 5 on Node.js, written in TypeScript (run with `tsx`)
- **API**: Single REST endpoint — `POST /api/inquiries` for form submissions
- **Route Definitions**: Shared route contracts in `shared/routes.ts` using Zod schemas, consumed by both client and server
- **Dev Server**: Vite dev server is mounted as Express middleware in development (see `server/vite.ts`), with HMR support
- **Production**: Client is built to `dist/public`, server is bundled with esbuild to `dist/index.cjs`

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with `drizzle-zod` for automatic Zod schema generation from table definitions
- **Schema Location**: `shared/schema.ts` — single `inquiries` table with fields: id, name, email, phone, postcode, selectedModel, message, createdAt
- **Migrations**: Managed with `drizzle-kit push` (schema push approach, not migration files)
- **Storage Pattern**: `server/storage.ts` defines an `IStorage` interface with a `DatabaseStorage` implementation, making storage swappable

### Shared Code
- The `shared/` directory contains code used by both client and server:
  - `schema.ts` — Drizzle table definitions and Zod insert schemas
  - `routes.ts` — API route contracts with paths, methods, and validation schemas

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Build & Dev Scripts
- `npm run dev` — Starts dev server with Vite HMR
- `npm run build` — Builds client (Vite) and server (esbuild) to `dist/`
- `npm run start` — Runs production build
- `npm run db:push` — Pushes Drizzle schema to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL** — Required. Must be provisioned and available via `DATABASE_URL` environment variable. Used with `pg` (node-postgres) connection pool and Drizzle ORM.

### Key NPM Packages
- **express** v5 — HTTP server
- **drizzle-orm** + **drizzle-kit** — Database ORM and schema management
- **@tanstack/react-query** — Client-side async state management
- **react-hook-form** + **zod** — Form handling and validation
- **framer-motion** — Animation library
- **shadcn/ui** ecosystem — Radix UI, class-variance-authority, tailwind-merge, clsx, lucide-react icons
- **wouter** — Client-side routing
- **connect-pg-simple** — PostgreSQL session store (available but not actively used for sessions currently)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (conditionally loaded)
- `@replit/vite-plugin-dev-banner` — Dev environment banner (conditionally loaded)

### External Services
- **Google Fonts** — DM Sans, Geist Mono, Fira Code, Architects Daughter fonts loaded via CDN
- No authentication system is implemented
- No third-party API integrations (no payment processing, no email sending currently active)
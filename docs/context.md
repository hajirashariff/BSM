### Context: Pro BSM Platform Monorepo

This monorepo hosts a modular BSM platform inspired by Jira SM, ServiceNow, and Kroolo. It targets cross-departmental service ops with reusable apps and packages.

#### Apps
- web-portal: Customer portal, KB, ticket tracking
- admin-dashboard: Agent/admin tools, workflows, analytics
- backend: Django REST API for core domain modules (tickets, accounts, assets, workflows, dashboards, users, KB, integrations)

#### Packages
- ui: Shared React components
- models: TypeScript types and JSON schemas for core entities
- utils: Shared utilities
- auth: Auth helpers for OAuth2/OIDC/SAML (stubs)
- integrations: Connectors stubs (Salesforce/HubSpot/Slack/etc.)

#### Run Locally
- Frontend apps via npm scripts (Next.js dev servers)
- Backend via Django manage.py

#### Next Steps
- Flesh out domain models across backend and models package
- Implement auth (SSO/OAuth2), RBAC, and audit logging
- Build workflow designer and automation engine MVP

#### Session Summary - 2025-09-25
- Installed monorepo dependencies with `npm ci` at repo root.
- Started Web Portal dev server `@bsm/web-portal` on http://localhost:3000.
- Started Admin Dashboard dev server `@bsm/admin-dashboard` on http://localhost:3001.
- Verified both frontends return HTTP 200 locally.

##### Quick Run Commands
- Start Web Portal: `npm run dev:web`
- Start Admin Dashboard: `npm run dev:admin`
- Start both (parallel via Turbo): `npm run dev`
- Start Django backend (default 8000): `npm run dev:backend`

##### Notes
- Frontend frameworks: Next.js 14, React 18.
- `apps/backend` is Django; API base configured in `server/urls.py`.
- If ports 3000/3001 are busy, change `-p` flags in each app's `package.json`.


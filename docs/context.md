### Context: Pro BSM Platform Monorepo

This monorepo hosts a modular BSM platform inspired by Jira SM, ServiceNow, and Kroolo. It targets cross-departmental service ops with reusable apps and packages.

#### Apps
- customer-portal: Customer portal, KB, ticket tracking
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


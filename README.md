## BSM Monorepo

Enterprise Business Service Management platform monorepo.

### Structure
- apps/
  - web-portal (Next.js)
  - admin-dashboard (Next.js)
  - backend (Django + DRF)
- packages/
  - ui, models, utils, auth, integrations
- docs/
  - context.md, api/, workflows/, marketplace/

### Quickstart
1) Node 20+, Python 3.11+, npm
2) Frontend: `npm run dev:web` and `npm run dev:admin`
3) Backend: `python -m venv .venv && ./.venv/Scripts/activate && pip install -r apps/backend/requirements.txt && python apps/backend/manage.py runserver`

### Scripts
- npm run dev: Run all dev processes
- npm run dev:web: Web portal
- npm run dev:admin: Admin dashboard
- npm run lint/test/build: Turborepo pipeline

### Docs
See `docs/context.md` and `docs/api` for module design and endpoints.


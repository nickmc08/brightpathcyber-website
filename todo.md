# Custom Email Capture System -- Bright Path Cyber

## Phase 1: Infrastructure
- [x] Upgrade project to web-db-user (backend + database)
- [x] Upload checklist PDF to CDN
- [x] Upload BPC logo to CDN for email template

## Phase 2: Backend API
- [x] Create subscribers table in database (name, email, created_at)
- [x] POST /api/subscribe endpoint -- validate, store, send email
- [x] GET /api/subscribers/export endpoint -- CSV export (admin-protected)
- [x] Integrate SendGrid for email delivery
- [x] Add SENDGRID_API_KEY secret

## Phase 3: Branded Email Template
- [x] Build HTML email with BPC logo, brass gold accents, ivory background
- [x] Include checklist PDF download link
- [x] Professional layout matching site branding

## Phase 4: Frontend
- [x] Remove Kit.com embed from Home page
- [x] Remove Kit.com landing page link from Navigation
- [x] Build custom signup form component (branded)
- [x] Place signup form on Home page where Kit.com was
- [x] Handle success/error states in form

## Phase 5: Test & Deploy
- [x] Write vitest for SendGrid API key validation
- [x] Write vitest for subscribe endpoint input validation
- [x] Write vitest for access control on admin endpoints
- [x] Set up Single Sender Verification for info@brightpathcyber.com via API
- [x] Document DNS records for domain authentication
- [ ] User: verify info@brightpathcyber.com via email link (pending)
- [ ] User: add 3 CNAME DNS records for domain authentication (pending)
- [x] Push to GitHub for Cloudflare Pages deploy
- [x] Save checkpoint and deliver to user

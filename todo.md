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

## Bug Fixes
- [x] Fix email validation: root cause was Cloudflare Pages static deploy with no backend - fixed by deploying full-stack to Manus hosting
- [x] Deploy full-stack app to Manus hosting (frontend + backend)
- [x] Verify signup form works end-to-end on deployed site
- [x] Provide DNS instructions for pointing brightpathcyber.com to Manus hosting

## Logo Update
- [x] Upload BPC_Shield_Transparent.png to CDN
- [x] Generate favicon from shield logo
- [x] Update Navigation header to use new logo
- [x] Update favicon in index.html (already wired, new favicon.ico placed in public/)
- [x] Update any other logo placements (email template updated to shield logo)
- [ ] Push to GitHub and redeploy

## Email Logo Fix
- [ ] Re-upload BPC_Shield_Transparent.png and get verified CDN URL
- [ ] Update emailTemplate.ts LOGO_URL to the correct shield PNG
- [ ] Verify email brand colors match Concept D Editorial (ivory #F5F0E8, brass #C9A84C, near-black #1A1A1A)
- [ ] Push to GitHub and redeploy

## Nav Logo Size Fix
- [x] Increase shield logo size in Navigation header so it is clearly visible
- [x] Ensure proper vertical alignment with the wordmark text
- [x] Push to GitHub and redeploy

## Nav Logo Redesign (Reference Match)
- [x] Replace logo lockup with single CDN-hosted header image (user's reference design)
- [x] Crop whitespace from image and re-upload to CDN
- [x] Display at 72px height in 88px header
- [x] Push to GitHub and redeploy

## Admin Dashboard
- [x] Add ADMIN_PASSWORD secret
- [x] Build admin tRPC procedures: login, list subscribers, stats, CSV export
- [x] Build /admin page with password login gate
- [x] Show total subscriber count and subscriber table
- [x] Add CSV export button
- [x] On-brand design (ivory, brass gold, Playfair/DM Sans)
- [x] Write vitest for admin procedures
- [x] Push to GitHub and redeploy

## Stripe E-book Checkout
- [x] Add Stripe secrets (STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY)
- [x] Create Stripe checkout session endpoint for e-book ($27)
- [x] Wire all "Get the E-book" buttons to trigger Stripe checkout
- [x] Build on-brand success page after payment
- [x] Write vitest tests for Stripe checkout endpoint
- [x] Add Stripe webhook handler for checkout.session.completed
- [x] Push to GitHub and redeploy

## Automatic E-book Delivery
- [x] Create purchases table in DB (session_id, email, amount, product, created_at)
- [x] Update Stripe webhook to store completed purchases in DB
- [x] Build branded HTML email template for e-book delivery
- [x] Send e-book download link via SendGrid on checkout.session.completed
- [x] Push DB migration
- [x] Write vitest tests for purchases endpoint and email template

## Admin Purchases Tab
- [x] Add admin.listPurchases tRPC endpoint (password-protected)
- [x] Build Purchases tab UI in admin dashboard
- [x] Show date, customer email, amount for each purchase

## Admin Quick Links
- [x] Add quick-link buttons section to admin dashboard
- [x] Include: Cloudflare, Stripe, Bluevine, Facebook, Instagram
- [x] On-brand styling matching admin design
- [x] Push to GitHub and redeploy

## Email Broadcast Feature
- [x] Create broadcasts table in DB (subject, template_type, body_json, recipient_count, status, scheduled_at, sent_at, created_at)
- [x] Build branded HTML broadcast email templates (Blog Update, Course Launch, Custom)
- [x] Implement SendGrid batch sending logic (batches of 100)
- [x] Add admin.createBroadcast tRPC endpoint
- [x] Add admin.sendBroadcast tRPC endpoint
- [x] Add admin.listBroadcasts tRPC endpoint
- [x] Add admin.previewBroadcast tRPC endpoint
- [x] Build Broadcast tab UI with compose form (3 template types)
- [x] Add email preview modal before sending
- [x] Show broadcast history with date, subject, recipient count, status
- [x] Add schedule option (send now or pick future date/time)
- [x] Write vitest tests for broadcast endpoints (12 tests)
- [x] Push to GitHub and redeploy

## Brand Style Cleanup (No Em Dashes, No Emojis)
- [x] Scan all blog post components and remove em dashes and en dashes (97 instances across 10 files)
- [x] Scan all blog post components and remove emojis
- [x] Update broadcast email templates to not use em dashes or emojis
- [x] Update existing email templates (checklist, e-book delivery) to remove em dashes
- [x] Verify Navigation, Footer, and other shared components are clean

## Bug Fix: Broadcast Sending Not Working
- [x] Debug broadcast send endpoint - emails not being delivered
- [x] Fix SendGrid integration - switched from batch sgMail.send(array) to individual sends per subscriber
- [x] Added detailed error logging for each send attempt
- [x] Test broadcast sending end-to-end

## Notification Emails to sales@brightpathcyber.com
- [x] Send notification email when someone subscribes for free checklist
- [x] Send notification email when someone purchases the e-book
- [x] Include subscriber/buyer name and email in notification
- [x] Write vitest tests for notification service (6 tests)
- [x] Push to GitHub and redeploy

## Blog CMS Feature
- [x] Create blog_posts table (id, title, slug, category, excerpt, content, date, readTime, imageUrl, status, created_at, updated_at)
- [x] Add blog DB helpers (CRUD operations)
- [x] Add tRPC endpoints: listPosts, getPost, createPost, updatePost, deletePost, toggleStatus
- [x] Migrate all hardcoded blog posts from Blog.tsx into database
- [x] Build admin Blog Posts tab with post list, create/edit/delete forms
- [x] Add Markdown content editor with preview
- [x] Add draft/published toggle
- [x] Update public Blog.tsx to fetch from API (published only)
- [x] Update public BlogPost.tsx to fetch individual post from API
- [x] Auto-broadcast on publish (draft -> published triggers Blog Update email)
- [x] Enforce brand rules: no emojis, no em/en dashes in content
- [x] Write vitest tests for blog endpoints (15 tests)
- [ ] Push to GitHub and redeploy

## Bug Fix: Blog Update Broadcast Email
- [x] Fix broken logo image URL in broadcast email template (use absolute public CDN URL)
- [x] Fix "undefined" excerpt in blog update broadcast email (check auto-broadcast variable name)
- [x] Also fix course_launch bodyJson field names in Admin.tsx broadcast compose form
- [x] Push to GitHub and redeploy

## CAN-SPAM Unsubscribe Feature
- [x] Add unsubscribeToken and unsubscribed fields to subscribers table
- [x] Generate unique token on subscriber insert (crypto.randomUUID)
- [x] Backfill tokens for existing subscribers
- [x] Add db helpers: getSubscriberByToken, markUnsubscribed, getActiveSubscribers, getSubscriberByEmail
- [x] Add tRPC public endpoint: subscribe.unsubscribe (accepts token, marks unsubscribed)
- [x] Add tRPC public endpoint: subscribe.getByToken (for page status check)
- [x] Update broadcast sending to use getActiveSubscribers (excludes unsubscribed)
- [x] Add per-subscriber unsubscribe URL to broadcast emails (blog update, course launch, custom)
- [x] Add unsubscribe link to checklist delivery email
- [x] Build /unsubscribe confirmation page (accepts ?token=xxx, calls API, shows confirmation)
- [x] Register /unsubscribe route in App.tsx
- [x] Write 13 vitest tests for unsubscribe feature (token format, API endpoints, email templates)
- [ ] Push to GitHub and redeploy

## Liability Disclaimer
- [x] Add one-liner disclaimer to site-wide footer
- [x] Add "Disclaimer" link to footer
- [x] Create /disclaimer page with full legal disclaimer language (Concept D Editorial branding)
- [x] Register /disclaimer route in App.tsx
- [ ] Push to GitHub and redeploy

## Legal Pages
- [x] Create /privacy-policy page (Concept D Editorial branding)
- [x] Create /terms page (Concept D Editorial branding)
- [x] Register /privacy-policy and /terms routes in App.tsx
- [x] Update footer Privacy Policy and Terms of Service links to point to new pages
- [ ] Push to GitHub and redeploy

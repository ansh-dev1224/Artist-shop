# Atelier — Artist Shop

A polished full-stack artist marketplace using React/Vite and Supabase.

## Included
- Editorial responsive marketplace UI
- Email/password authentication
- Collector, artist and admin roles
- Artist studio and artwork publishing
- Supabase Storage image uploads
- Discovery, search and categories
- Artist portfolios
- Protected routes
- PostgreSQL + Row Level Security
- Vercel SPA routing
- Production environment template

## Setup
1. `npm install`
2. Copy `.env.example` to `.env`
3. Create a Supabase project.
4. Run `supabase/schema.sql` in Supabase SQL Editor.
5. Enable Email authentication.
6. Set the VITE variables.
7. `npm run dev`

For an interview/demo, create an account and promote it with:
```sql
update public.profiles set role='admin' where email='your@email.com';
```

## Vercel
Import the repo, add the VITE variables, and deploy. `vercel.json` handles client-side routing.

## Security
The browser only uses the Supabase anon key. RLS is the database security boundary. Artist mutations are restricted to the authenticated artist's own rows and storage folder. Never put a Supabase service-role key in frontend code.

## Important production scope note
The included purchase CTA is deliberately a safe demo state. Before accepting real money, add a server-side order/payment service with payment signature verification, webhooks, inventory/order state, idempotency and audit logging. Do not verify payments only in the browser.

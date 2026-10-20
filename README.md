# Huddle

Huddle is a campus organization discovery app for every student, regardless of major. This starter contains the approved informational landing page, the club finder experience, and a Supabase ready database foundation.

## Recommended stack

1. Next.js App Router for the website, API routes, server rendering, and future manager dashboard.

2. TypeScript for reliable types across components, database results, and form data.

3. Tailwind CSS for the design system. The current design also keeps a focused global stylesheet so the approved visual treatment is easy to maintain.

4. Supabase PostgreSQL for universities, clubs, categories, schedules, locations, managers, and links.

5. Supabase Auth for club manager accounts. Students can browse without signing in.

6. Supabase Storage for club logos and future media uploads.

7. Zod and React Hook Form when manager create and edit forms are added. They are intentionally not installed yet because the current finder form does not need them.

8. Vercel for deployment and preview environments.

9. Vitest for unit tests and Playwright for end to end tests when the database flows are connected.

A separate FastAPI service is not necessary for this project. Next.js route handlers and server actions can safely call Supabase and cover the backend needs of the initial product.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The club browser at `/find-clubs` is a frontend-only interface. It uses local university options and lets students enter a club search, select interests, and add multiple availability slots with all seven weekdays and start/end times. The results area is a placeholder. There are no sample club records, club matching/filtering algorithms, or database search requests. Preferences remain local to the page.

The separate university API endpoint uses local demo data until both Supabase environment variables are present. The current club browser does not call that endpoint.

## Connect Supabase

1. Create a Supabase project.

2. Copy `.env.example` to `.env.local`.

3. In Supabase, open **Project Settings → API** and copy the project URL and publishable key into `.env.local`.

4. Install the Supabase CLI and link the project:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

5. Apply the included migration:

```bash
npx supabase db push
```

6. Add university records in the Supabase Table Editor or through a seed migration.

Once credentials are available, `GET /api/universities?q=...` automatically queries the `university` table instead of demo data.

## Project structure

```text
app/
  api/universities/route.ts   University autocomplete endpoint
  globals.css                 Huddle design system
  layout.tsx                  Root metadata and layout
  page.tsx                    Home page
  about/page.tsx              Team and Phase 1 project information
  find-clubs/page.tsx         Dedicated club finder page
components/
  huddle-site.tsx             Landing page
  club-finder.tsx             Frontend search and preference controls
  site-header.tsx             Shared site navigation
lib/
  mock-data.ts                Demo universities and interest options
  types.ts                    Shared application types
  supabase/                   Browser and server clients
supabase/migrations/          PostgreSQL schema and initial RLS policies
```

## Suggested next implementation order

1. Seed universities, category types, categories, and a small set of clubs.

2. Replace the interest fallback data with categories available at the selected university.

3. Add a club search query using university, categories, meeting day, time, and keyword.

4. Build the results page and individual club profile page.

5. Add Supabase Auth for club managers.

6. Add manager CRUD forms and ownership based RLS policies.

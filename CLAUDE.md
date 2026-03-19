# I Am Visible Today - Project Instructions

## Project Overview
Privacy-first mental health story archive where users share "visibility moments" (text, photo, voice) anonymously. Human-curated, no algorithms, no ads, donation-supported. Phase 1 = curated archive, future phases = social platform with communities.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Backend:** Supabase (auth, database, storage)
- **Hosting:** Vercel (free tier)
- **Icons:** Lucide React
- **UI Primitives:** Radix UI, class-variance-authority, clsx, tailwind-merge
- **Media:** piexifjs (EXIF stripping), browser-image-compression, react-audio-voice-recorder

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm start` - Start production server

## Git Workflow

This project uses a three-branch strategy:

### Branches

- **`main`** - Production branch. Only deploy-ready code. Protected branch.
- **`dev`** - Development branch. Integration branch where features are tested together.
- **`feature/*`** - Feature branches. Create one for each feature/fix.

### Workflow

1. **Create feature branch** from `dev`:

   ```bash
   git checkout dev
   git pull
   git checkout -b feature/description-of-feature
   ```

2. **Work and commit** to your feature branch:

   ```bash
   git add <files>
   git commit -m "Feature description"
   git push -u origin feature/description-of-feature
   ```

3. **Push to `dev`** when feature is ready:
   - Create a PR from your feature branch to `dev` on GitHub
   - Review and merge once tested
   - Delete the feature branch after merge

4. **Deploy to `main`** when ready for production:
   - Create a PR from `dev` to `main` on GitHub
   - This triggers production deployment on Vercel
   - Use PR description to document what's being deployed

### Naming Convention

- Features: `feature/story-display`
- Fixes: `fix/dark-mode-toggle`
- Docs: `docs/api-documentation`

## Path Aliases
- `@/*` maps to project root (e.g., `@/components/ui/Button`)

## Tailwind v4 - CRITICAL
This project uses **Tailwind v4** syntax. Do NOT use v3 directives.
- Entry point: `@import "tailwindcss"` (NOT `@tailwind base/components/utilities`)
- Config: `@config "../tailwind.config.ts"` in globals.css
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` (class-based)
- No `darkMode: 'class'` in tailwind.config.ts (handled by CSS custom variant)

## Design System
### Colors (Warm & Inviting Theme)
- **rose** - Primary: warm and inviting (#ec4899)
- **amber** - Accent: warm and energetic (#f59e0b)
- **slate** - Neutrals: cool and calm (#475569)
- **Dark palette:** dark-bg-primary (#1a1d1a), dark-bg-secondary (#242824), dark-bg-tertiary (#2d322d)

### Theme Switching
To change themes in the future, edit `tailwind.config.ts`:
1. Replace color scale definitions (rose, amber, slate)
2. Update Button variant colors: `primary`, `secondary`, `ghost`
3. Update Footer background and border colors
4. Update CTA section background in `app/page.tsx`
5. Update Ko-Fi link color in Footer

### Typography
- **Inter** - Sans-serif for UI and display text
- **Lora** - Serif for story content
- Max reading width: 680px (content), 1024px (wide), 1280px (full)

### Animation Style
- Subtle & smooth: page transitions, scroll reveals, hover effects
- Pattern: `initial={{ opacity: 0, y: 16-20 }}` with `whileInView` for scroll reveals
- Staggered delays (0.1s increments) for lists
- `AnimatePresence mode="wait"` for step transitions
- `viewport={{ once: true }}` to animate only on first scroll

## Project Structure
```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (fonts, header, footer, dark mode)
  page.tsx              # Homepage with Framer Motion animations
  globals.css           # Tailwind v4 entry point (4 lines)
components/
  layout/               # Header, Footer, ThemeToggle
  ui/                   # Button, Card, Container
  story/                # (placeholder - story display components)
  submit/               # (placeholder - submission form components)
lib/
  supabase/client.ts    # Supabase client
  media/                # (placeholder - EXIF strip, compression)
  utils/                # (placeholder - formatting utilities)
  data/                 # (placeholder - data access layer)
types/                  # (placeholder - TypeScript types)
```

## Existing Components
- **Button** - Variants: primary/secondary/ghost, Sizes: sm/md/lg
- **Card** - Props: children, className, hover (boolean)
- **Container** - Props: maxWidth (content=680px / wide=1024px / full=1280px)
- **Header** - Sticky nav with logo, /archive, /about links, ThemeToggle, "Share Your Story" CTA
- **Footer** - 4-column grid, Ko-Fi donation, crisis resources (988 US, 1-833-456-4566 Canada)
- **ThemeToggle** - Client component, localStorage + system preference, moon/sun icons

## Database Schema (Supabase)
- `submissions` - Moderation queue (text, photo, voice, privacy prefs, status)
- `stories` - Published stories (slug, content_type, view_count, content warnings)
- `users` - Phase 2 (pseudonymous accounts)
- `story_interactions` - Phase 2 (seen/relate buttons)
- RLS enabled, public read for stories, anyone can submit

## Privacy Requirements
- No tracking, no analytics beyond Vercel Web Analytics
- EXIF data stripped from all uploaded photos (browser-side)
- Anonymous submissions (no account required)
- No AI training on user content
- Mental health disclaimer in every page footer
- Crisis resources always visible: 988 (US), 1-833-456-4566 (Canada)

## Legal
- Trademark: "I Am Visible Today" using ™ symbol
- Age gate: 13+ required
- Non-commercial guarantee in ToS

## Phase 1 Pages (Build Plan)
- [x] `/` Homepage (hero + featured story)
- [x] `/story/[slug]` Coming soon page
- [x] `/archive` Coming soon page
- [x] `/submit` Coming soon page
- [x] `/about` Coming soon page
- [x] `/privacy` Coming soon page
- [x] `/guidelines` Coming soon page
- [x] `/terms` Coming soon page
- [ ] `/admin/` Protected moderation dashboard
- [ ] `/admin/queue` Moderation queue

## Coming Soon Pages
All public pages now have coming soon templates (`ComingSoon.tsx`) with:
- Animated header with icon
- Description
- Link back to home
- Ko-Fi donation CTA
- Professional loading state

## Submission Formats
- Text only (100-500 words)
- Photo with optional caption
- Voice note (1-3 min)
- Combined (any mix of above)

## Ko-Fi Integration
- Ko-Fi account created: `ko-fi.com/iamvisibletoday`
- All links updated in Footer: https://ko-fi.com/iamvisibletoday
- Coming soon pages include Ko-Fi CTA

## Build Plan (from session Feb 14, 2026)

### Phase 0: Foundation Layer
- `types/database.ts` - Supabase types (Submission, Story, enums)
- `lib/data/mock-stories.ts` - Mock data for dev (toggle via `NEXT_PUBLIC_USE_MOCK_DATA`)
- `lib/data/stories.ts` - Story data access (fetch by slug, list, filter)
- `lib/data/submissions.ts` - Submission data access (create, list for admin)
- `lib/media/exif.ts` - EXIF stripping with piexifjs
- `lib/media/compress.ts` - Image compression wrapper
- `lib/utils/word-count.ts` - Word count validation
- `lib/utils/format.ts` - Date/time formatting helpers

### Phase 1: Story Display
- `/story/[slug]` page (server component, metadata)
- Components: ContentWarning, StoryTextContent, StoryPhotoContent, StoryVoiceContent, StoryContent, StoryNavigation, CrisisResources

### Phase 2: Archive Page
- `/archive` page with URL-based filtering (search params, not client state)
- Components: StoryCard, ContentTypeBadge, ArchiveFilter, ArchiveEmptyState, Pagination

### Phase 3: Submission Form
- `/submit` page with multi-step form
- React context for form state management
- Components: SubmitFormContext, StepIndicator, FormatStep, ContentStep, PrivacyStep, ReviewStep, ConfirmationStep

### Phase 4: About & Legal Pages
- `/about`, `/privacy`, `/guidelines`, `/terms`
- Shared components: PageHeader, Prose

### Phase 5: Homepage Enhancement
- Featured story section pulling from stories data

### Phase 6: Supabase Schema
- SQL migration for submissions + stories tables

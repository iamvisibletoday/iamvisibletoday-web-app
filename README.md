# I Am Visible Today™

A privacy-first mental health story archive where people share their "visibility moments" anonymously. Human-curated, no algorithms, no ads, donation-supported.

## About

**I Am Visible Today** is a safe space for sharing mental health stories through text, photos, and voice notes. Every submission is human-reviewed before publishing. No accounts required, no data tracking, no AI training on content.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) + TypeScript + React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + [Framer Motion](https://motion.dev)
- **Backend:** [Supabase](https://supabase.com) (database, auth, storage)
- **Hosting & Analytics:** [Vercel](https://vercel.com) (deployment, Web Analytics, Speed Insights)
- **Icons:** [Lucide React](https://lucide.dev)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase keys to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## Project Structure

```
app/                    # Next.js App Router pages
components/
  layout/               # Header, Footer, ThemeToggle
  ui/                   # Button, Card, Container
  story/                # Story display components
  submit/               # Submission form components
lib/
  supabase/             # Supabase client
  media/                # EXIF stripping, image compression
  utils/                # Formatting helpers
  data/                 # Data access layer
types/                  # TypeScript type definitions
```

## Pages & Features

### Published Pages

- **Homepage** - Featured story, mission statement, donation link
- **Story Display** (`/story/[slug]`) - Individual story pages with content warnings
- **Archive** (`/archive`) - Browseable story collection with filtering and search
- **Submit** (`/submit`) - Multi-step submission form (text, photo, voice)
- **About** (`/about`) - Mission, values, and tech stack showcase
- **Contact** (`/contact`) - Specialized contact forms:
  - `report@iamvisibletoday.com` - Content violation reports (48h response SLA)
  - `privacy@iamvisibletoday.com` - Privacy/GDPR/CCPA/COPPA/PIPEDA requests (30d)
  - `legal@iamvisibletoday.com` - Legal/terms/DMCA questions (30d)
  - `feedback@iamvisibletoday.com` - Feature requests & feedback (30d)
  - `hello@iamvisibletoday.com` - General inquiries (30d)
- **Privacy Policy** (`/privacy`) - Comprehensive GDPR/CCPA/COPPA/PIPEDA compliant
- **Community Guidelines** (`/guidelines`) - Moderation criteria and content standards
- **Terms of Service** (`/terms`) - Non-commercial guarantee and user terms

### Coming Soon

- Admin moderation dashboard (`/admin`)
- Community features (Phase 2+)

## Privacy & Transparency

- **Analytics:** Vercel Web Analytics (aggregated, non-identifying data only; no tracking cookies, no individual user tracking, no behavioral profiles)
- **Performance:** Vercel Speed Insights (page performance metrics without user identification)
- **EXIF Protection:** Metadata stripped from all uploaded photos (browser-side with piexifjs)
- **Image Compression:** Browser-side compression to reduce file sizes before upload
- **No User Tracking:** Anonymous submissions, no accounts, no account tracking
- **Content Safety:** Content never used for AI training; no AI processing on user stories
- **Age Gate:** 13+ required (COPPA compliant)
- **Crisis Resources:** Displayed on every page (988 US, 1-833-456-4566 Canada, [findahelpline.com](https://findahelpline.com) International)

## Contact & Support

For general inquiries or to get in touch, visit the [Contact page](/contact) or email **hello@iamvisibletoday.com**.

All emails are managed through Google Workspace with specialized routing and response SLAs.

## Crisis Resources

If you or someone you know is in crisis:
- **US:** Call or text **988** (Suicide & Crisis Lifeline)
- **Canada:** Call **1-833-456-4566** (Crisis Services Canada)
- **International:** Visit [findahelpline.com](https://findahelpline.com)

## Git Workflow

This project uses a three-branch strategy:

- **`main`** - Production branch (deployed on [Vercel](https://vercel.com))
- **`dev`** - Development/integration branch
- **`feature/*`** - Feature branches (create from dev, PR back to dev, then to main)

See [CLAUDE.md](CLAUDE.md) for detailed workflow instructions.

## Design System

- **Primary Color:** Rose (#ec4899) - warm and inviting
- **Accent Color:** Amber (#f59e0b) - warm and energetic
- **Neutral Color:** Slate (#475569) - cool and calm
- **Typography:** Inter (UI), Lora (story content)
- **Animation:** Subtle & smooth with Framer Motion (scroll reveals, transitions)
- **Dark Mode:** Supported with CSS custom variant (no class-based config)

## Development

For detailed project instructions, see [CLAUDE.md](CLAUDE.md) which includes:

- Complete build plan phases
- Path aliases and configuration
- Tailwind v4 setup (critical notes)
- Database schema for Supabase
- Submission format specifications

## License

All rights reserved. This is a non-commercial project.

---

**Built with [Next.js](https://nextjs.org), [React](https://react.dev), [TypeScript](https://typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com). Hosted on [Vercel](https://vercel.com). Made with ❤️ by [Claude Code](https://claude.com/claude-code).**

# EMCA Project

A modern Next.js web application focused on empowerment, community, and advocacy initiatives.

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with Radix UI components and custom styling
- **Dynamic Content** - Server-side rendering with Next.js 16
- **Interactive Elements** - Smooth animations and transitions
- **Accessibility First** - WCAG compliant components
- **Type-Safe** - Full TypeScript support
- **Analytics** - Vercel Analytics integration

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Charts**: [Recharts](https://recharts.org/)
- **Database**: [Supabase](https://supabase.com/) (configured)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sparkssam/EMCA-Project.git
cd EMCA-Project
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app directory (pages and layouts)
├── components/           # Reusable React components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── home/           # Homepage components
│   ├── donate/         # Donation page components
│   ├── empower/        # Empowerment page components
│   ├── impact/         # Impact page components
│   ├── partner/        # Partnership page components
│   ├── philosophy/     # Philosophy page components
│   ├── stories/        # Stories/blog components
│   ├── gallery/        # Gallery components
│   └── volunteer/      # Volunteer page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
│   ├── actions/        # Server actions
│   ├── queries/        # Data fetching queries
│   └── supabase/       # Supabase client setup
├── public/             # Static assets
├── scripts/            # Database setup and seed scripts
└── styles/             # Global styles

```

## Available Scripts

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Pages

- `/` - Homepage with hero, mission, and featured projects
- `/about` - About page
- `/donate` - Donation and impact page
- `/empower` - Community empowerment initiatives
- `/gallery` - Photo gallery
- `/impact` - Impact metrics and success stories
- `/partner` - Partnership opportunities
- `/philosophy` - Organization philosophy and values
- `/stories` - Blog and success stories
- `/volunteer` - Volunteer opportunities
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Database Setup

The project uses Supabase for database management. To set up:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL scripts in `scripts/` folder in this order:
   - `01-create-tables.sql` - Create database tables
   - `02-enable-rls.sql` - Enable Row Level Security
   - `03-seed-sample-data.sql` - Seed sample data
3. Add your Supabase credentials to `.env.local`

## Configuration Files

- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - Shadcn/ui components configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@emca-project.com or open an issue on GitHub.

## Roadmap

- [ ] User authentication system
- [ ] Donation tracking dashboard
- [ ] Volunteer management system
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Multi-language support

---

**Built with ❤️ by the EMCA Team**

# AlbumRater

Local-only web app to rate songs on Spotify albums. Built with Next.js, Tailwind and SQLite.

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` based on `.env.example` and fill in your Spotify credentials.

3. Generate Prisma client and run the initial migration:

```bash
npm run db:generate
npm run db:migrate
```

4. Start the dev server:

```bash
npm run dev
```

Visit <http://localhost:3000>.

## Scripts

- `dev` – run Next.js in development
- `build` – build for production
- `start` – start the production build
- `db:generate` – generate Prisma client
- `db:migrate` – run database migrations
- `db:studio` – open Prisma Studio
- `test` – run unit tests with Vitest

## License

MIT

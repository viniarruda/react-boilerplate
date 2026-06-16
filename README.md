# react-boilerplate

A modern, opinionated React starter — typed, tested, and wired end-to-end.

> Vite · React 19 · TanStack Router & Query · Tailwind v4 · shadcn/ui · React Hook Form + Zod · Vitest

## Features

- ⚡️ **Vite** dev server & build with TypeScript (strict).
- 🧭 **TanStack Router** — file-based routing with type-safe params and a
  **private-route guard** (`_authenticated` layout + `beforeLoad`).
- 🔄 **TanStack Query + Axios** — a shared client with a **request interceptor**
  (in React context) that injects the bearer `accessToken` on every request.
- 🔐 **Mocked auth** held in React context and persisted to `localStorage`.
- 🎨 **Tailwind CSS v4** (CSS-first config) + **shadcn/ui** primitives, dark by
  default, themed with CSS-variable design tokens.
- 📝 **React Hook Form + Zod** for typed, validated forms.
- ✅ **Vitest + Testing Library** wired up with example component and hook tests.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

Any non-empty username/password logs you in (auth is mocked) and lands you on the
home page, which showcases the stack and a live TanStack Query data demo.

### Scripts

| Script                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `pnpm dev`             | Start the Vite dev server.                        |
| `pnpm build`           | Generate routes, type-check, and build for prod.  |
| `pnpm preview`         | Preview the production build.                     |
| `pnpm test`            | Run the Vitest suite once.                        |
| `pnpm test:watch`      | Run Vitest in watch mode.                         |
| `pnpm test:ui`         | Open the Vitest UI.                               |
| `pnpm lint`            | Lint with ESLint (flat config).                   |
| `pnpm format`          | Format `src` with Prettier.                       |
| `pnpm routes:generate` | Regenerate `src/routeTree.gen.ts`.                |

## Project structure

```
src/
├── main.tsx                      # Providers (Query, Auth) + RouterProvider
├── index.css                     # Tailwind v4 + design tokens + atmosphere
├── router.tsx                    # createRouter + typed router context
├── routeTree.gen.ts              # generated (gitignored)
├── lib/utils.ts                  # cn()
├── components/
│   ├── ui/                       # shadcn primitives (button, input, card, form…)
│   └── layout/header.tsx         # app bar + sign out
├── context/auth.tsx              # AuthProvider, useAuth, axios interceptor
├── services/
│   ├── api.ts                    # axios instance
│   ├── query-client.ts           # QueryClient
│   ├── auth/use-login.ts         # mocked login mutation
│   └── products/use-products.ts  # products query
└── routes/
    ├── __root.tsx                # shell + devtools + toaster
    ├── index.tsx                 # redirect → /home
    ├── login.tsx                 # login page
    ├── _authenticated.tsx        # private-route guard layout
    └── _authenticated/home.tsx   # project showcase (private)
```

## How auth & the interceptor work

`AuthProvider` (`src/context/auth.tsx`) owns the `accessToken` (seeded from
`localStorage`) and registers an **axios request interceptor** on the shared
`api` client that adds `Authorization: Bearer <token>` to every request. The
live auth context is injected into the router so guards and routes can read
`context.auth`.

Private routes live under the pathless `_authenticated` layout. Its `beforeLoad`
redirects unauthenticated visitors to `/login` (remembering where they came from
via a `redirect` search param).

### Wiring a real backend

1. Set `VITE_API_URL` in `.env` (see `.env.example`).
2. Replace the body of `mockLogin` in `src/services/auth/use-login.ts` with a
   real call, e.g. `api.post('/auth/login', credentials)`.

That's it — the interceptor, guards, and query layer already handle the rest.

## Adding shadcn components

`components.json` is configured for Tailwind v4. Add more primitives with:

```bash
pnpm dlx shadcn@latest add dialog dropdown-menu …
```

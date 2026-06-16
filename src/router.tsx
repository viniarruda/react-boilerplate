import { createRouter } from '@tanstack/react-router';

import { queryClient } from '@/services/query-client';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // `auth` is injected at render time by <RouterProvider> in main.tsx.
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

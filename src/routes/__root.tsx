import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/sonner';
import type { AuthContextValue } from '@/context/auth';

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="relative isolate min-h-dvh">
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}

import type { CSSProperties } from 'react';
import { createFileRoute, redirect, useNavigate, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowRight, Loader2, Lock, Terminal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLogin } from '@/services/auth/use-login';

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' });
    }
  },
  component: LoginPage,
});

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginValues = z.infer<typeof loginSchema>;

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

const STACK = ['vite@8', 'react@19', 'tanstack-router', 'tanstack-query', 'tailwind@4', 'shadcn/ui'];

function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const search = Route.useSearch();
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  function onSubmit(values: LoginValues) {
    mutate(values, {
      onSuccess: () => {
        toast.success('Authenticated', { description: 'Session token stored locally.' });
        if (search.redirect) {
          router.history.push(search.redirect);
        } else {
          navigate({ to: '/home' });
        }
      },
      onError: (error) => {
        toast.error('Login failed', {
          description: error instanceof Error ? error.message : 'Please try again.',
        });
      },
    });
  }

  return (
    <div className="relative z-10 grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      {/* Brand / manifest panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-border/60 p-12 lg:flex xl:p-16">
        <div
          className="reveal flex items-center gap-2.5"
          style={delay(0)}
        >
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_28px_-6px_var(--primary)]">
            <Terminal className="size-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            react<span className="text-muted-foreground">/</span>boilerplate
          </span>
        </div>

        <div className="max-w-lg">
          <p
            className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary"
            style={delay(80)}
          >
            // production starter
          </p>
          <h1
            className="reveal mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight xl:text-6xl"
            style={delay(140)}
          >
            Everything wired.
            <br />
            <span className="text-glow text-primary">Nothing</span> in your way.
          </h1>
          <p
            className="reveal mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground"
            style={delay(220)}
          >
            A typed, tested React foundation — routing, data-fetching, auth and UI
            primitives already in place. Sign in to explore the build.
          </p>

          <ul className="reveal mt-9 flex flex-wrap gap-2" style={delay(300)}>
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border/70 bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal font-mono text-xs text-muted-foreground" style={delay(380)}>
          <span className="text-primary">$</span> pnpm dev{' '}
          <span className="opacity-60">→ http://localhost:5173</span>
        </p>
      </aside>

      {/* Auth panel */}
      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="reveal w-full max-w-sm" style={delay(160)}>
          {/* compact brand for small screens */}
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              react<span className="text-muted-foreground">/</span>boilerplate
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            01 / authenticate
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use any non-empty credentials — authentication is mocked.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ada.lovelace" autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Mock session · bearer token persisted to localStorage
          </p>
        </div>
      </main>
    </div>
  );
}

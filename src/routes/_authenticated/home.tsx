import type { CSSProperties, ComponentType } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Atom,
  Check,
  Component,
  Database,
  FileCheck2,
  FlaskConical,
  Network,
  Palette,
  RefreshCw,
  Route as RouteIcon,
  Sparkles,
  TriangleAlert,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProducts, type Product } from '@/services/products/use-products';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
});

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

interface StackItem {
  icon: ComponentType<{ className?: string }>;
  name: string;
  role: string;
  version: string;
}

const STACK: StackItem[] = [
  { icon: Zap, name: 'Vite', role: 'Build tool & dev server', version: '8.0' },
  { icon: Atom, name: 'React', role: 'UI library', version: '19.2' },
  { icon: RouteIcon, name: 'TanStack Router', role: 'Type-safe file-based routing', version: '1.x' },
  { icon: Database, name: 'TanStack Query', role: 'Server-state & caching', version: '5.x' },
  { icon: Palette, name: 'Tailwind CSS', role: 'Utility-first styling', version: '4.3' },
  { icon: Component, name: 'shadcn/ui', role: 'Accessible UI primitives', version: 'new-york' },
  { icon: FileCheck2, name: 'React Hook Form + Zod', role: 'Typed forms & validation', version: '7 · 4' },
  { icon: Network, name: 'Axios', role: 'HTTP client w/ interceptor', version: '1.18' },
  { icon: FlaskConical, name: 'Vitest', role: 'Unit & component testing', version: '4.1' },
];

const FEATURES = [
  'Private routes guarded by router `beforeLoad`',
  'Axios interceptor injects the bearer token',
  'Mocked auth held in React context',
  'CSS-variable design tokens, dark by default',
  'Path alias `@/*` across the app',
  'Vitest + Testing Library pre-wired',
];

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <Hero />
      <StackSection />
      <LiveDataSection />
      <FeaturesSection />
      <footer className="reveal mt-20 border-t border-border/60 pt-8 font-mono text-xs text-muted-foreground">
        <span className="text-primary">//</span> react-boilerplate · built with Vite + TanStack +
        Tailwind v4
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24">
      <p
        className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary"
        style={delay(0)}
      >
        // production starter · v1.0.0
      </p>
      <h1
        className="reveal mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
        style={delay(80)}
      >
        A modern React stack,
        <br />
        <span className="text-glow text-primary">wired end-to-end.</span>
      </h1>
      <p
        className="reveal mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
        style={delay(160)}
      >
        Vite, TanStack Router &amp; Query, Tailwind v4 and shadcn/ui — typed, tested, and ready to
        build on from the first commit.
      </p>

      <div className="reveal mt-8 flex flex-wrap items-center gap-3" style={delay(220)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          session active
        </span>
        <span className="rounded-full border border-border/70 bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground">
          9 libraries
        </span>
        <span className="rounded-full border border-border/70 bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground">
          typescript · strict
        </span>
      </div>

      <div className="reveal mt-10 flex flex-wrap gap-3" style={delay(280)}>
        <Button asChild size="lg">
          <a href="#stack">
            Explore the stack
            <Sparkles />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#live">See live data</a>
        </Button>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="scroll-mt-20">
      <SectionHeading index="02" eyebrow="the stack" title="Batteries included" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((item, i) => (
          <Card
            key={item.name}
            className="reveal group gap-0 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_36px_-12px_var(--primary)]"
            style={delay(i * 60)}
          >
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-border/70 bg-secondary/60 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{item.name}</h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {item.version}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function LiveDataSection() {
  const { data, isLoading, isError, isFetching, refetch } = useProducts();

  return (
    <section id="live" className="mt-24 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          index="03"
          eyebrow="live query · tanstack query + axios"
          title="Real data, fetched on mount"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="reveal"
        >
          <RefreshCw className={isFetching ? 'animate-spin' : ''} />
          {isFetching ? 'Fetching' : 'Refetch'}
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} index={i} />)}

        {isError && (
          <Card className="reveal col-span-full border-destructive/40 bg-destructive/5">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <TriangleAlert className="size-7 text-destructive" />
              <div>
                <p className="font-display text-lg font-semibold">Couldn’t load products</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The request failed. Check your connection and try again.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {data?.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Card
      className="reveal group gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      style={delay(index * 60)}
    >
      <div className="grid aspect-[5/3] place-items-center bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col gap-2 p-5">
        <span className="w-fit rounded-full border border-border/70 bg-secondary/50 px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">{product.title}</h3>
        <p className="mt-1 font-display text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}

function ProductSkeleton({ index }: { index: number }) {
  return (
    <Card className="reveal gap-0 overflow-hidden py-0" style={delay(index * 60)}>
      <div className="aspect-[5/3] animate-pulse bg-muted" />
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-5 w-16 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

function FeaturesSection() {
  return (
    <section className="mt-24">
      <SectionHeading index="04" eyebrow="what's wired" title="So you can skip the plumbing" />
      <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <div
            key={feature}
            className="reveal flex items-start gap-3 border-b border-border/50 pb-4"
            style={delay(i * 60)}
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <p className="text-sm text-muted-foreground">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="reveal">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="text-primary">{index}</span> / {eyebrow}
      </p>
      <h2 className="mt-3 flex items-center gap-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
        <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </h2>
    </div>
  );
}

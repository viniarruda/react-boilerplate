import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, Terminal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

export function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate({ to: '/login' });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/home" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-transform group-hover:scale-105">
            <Terminal className="size-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            react<span className="text-muted-foreground">/</span>boilerplate
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            mock@trace <span className="text-primary">~</span> %
          </span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'var(--popover)',
          '--success-text': 'var(--primary)',
          '--error-bg': 'var(--popover)',
          '--error-text': 'var(--destructive)',
          '--font-family': 'var(--font-mono)',
        } as CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);

    await user.click(screen.getByRole('button', { name: 'Press' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as a child anchor when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/home">Go home</a>
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute('href', '/home');
  });
});

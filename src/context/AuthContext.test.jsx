import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from './AuthContext';

// Mock the puterService module
vi.mock('../services/puterService', () => ({
  puterAuth: vi.fn()
}));

import { puterAuth } from '../services/puterService';

function TestConsumer() {
  const { user, signIn } = useAuthContext();
  return (
    <div>
      <span data-testid="user">{user ? JSON.stringify(user) : 'null'}</span>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides user as null initially', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('provides signIn function', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('sets user after successful signIn', async () => {
    const user = userEvent.setup();
    const mockProfile = { id: '123', name: 'Alice' };
    puterAuth.mockResolvedValue(mockProfile);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByTestId('user')).toHaveTextContent(JSON.stringify(mockProfile));
  });

  it('calls puterAuth when signIn is invoked', async () => {
    const user = userEvent.setup();
    puterAuth.mockResolvedValue({ id: 'abc' });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(puterAuth).toHaveBeenCalledTimes(1);
  });

  it('throws when signIn fails (puterAuth rejects)', async () => {
    const user = userEvent.setup();
    puterAuth.mockRejectedValue(new Error('Auth failed: network error'));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // signIn rejection should propagate; user stays null
    await expect(
      act(async () => {
        await user.click(screen.getByRole('button', { name: 'Sign In' }));
      })
    ).rejects.toThrow();

    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('renders children inside the provider', () => {
    render(
      <AuthProvider>
        <span>Child content</span>
      </AuthProvider>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('useAuthContext returns null when used outside a provider', () => {
    function BareConsumer() {
      const ctx = useAuthContext();
      return <span>{ctx === null ? 'no-context' : 'has-context'}</span>;
    }
    render(<BareConsumer />);
    expect(screen.getByText('no-context')).toBeInTheDocument();
  });
});
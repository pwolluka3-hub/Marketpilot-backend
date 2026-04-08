import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuthContext } from '../AuthContext';

vi.mock('../../services/puterService', () => ({
  puterAuth: vi.fn()
}));

import { puterAuth } from '../../services/puterService';

function TestConsumer() {
  const { user, signIn } = useAuthContext();
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'no-user'}</span>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides null user initially', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('user').textContent).toBe('no-user');
  });

  it('provides signIn function to consumers', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('updates user state after successful signIn', async () => {
    puterAuth.mockResolvedValueOnce({ name: 'Alice' });
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Sign In' }).click();
    });
    expect(screen.getByTestId('user').textContent).toBe('Alice');
  });

  it('calls puterAuth when signIn is called', async () => {
    puterAuth.mockResolvedValueOnce({ name: 'Bob' });
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Sign In' }).click();
    });
    expect(puterAuth).toHaveBeenCalledTimes(1);
  });

  it('throws when useAuthContext is used outside AuthProvider', () => {
    const consoleError = console.error;
    console.error = () => {};
    function Orphan() {
      const ctx = useAuthContext();
      return <div>{ctx === null ? 'null-ctx' : 'has-ctx'}</div>;
    }
    render(<Orphan />);
    expect(screen.getByText('null-ctx')).toBeInTheDocument();
    console.error = consoleError;
  });

  it('renders children correctly', () => {
    render(
      <AuthProvider>
        <span>child content</span>
      </AuthProvider>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
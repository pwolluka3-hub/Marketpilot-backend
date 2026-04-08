import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from '../../context/AuthContext';

// Mock the puterService module
vi.mock('../../services/puterService', () => ({
  puterAuth: vi.fn()
}));

import { puterAuth } from '../../services/puterService';

// Consumer component to surface context values
function AuthConsumer() {
  const { user, signIn } = useAuthContext();
  return (
    <div>
      <span data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</span>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>
  );
}

describe('AuthContext / AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides null user initially', () => {
    renderWithProvider();
    expect(screen.getByTestId('user').textContent).toBe('no-user');
  });

  it('provides a signIn function', () => {
    renderWithProvider();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('updates user after successful signIn', async () => {
    const profile = { id: 'user-1', name: 'Alice' };
    puterAuth.mockResolvedValue(profile);

    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe(JSON.stringify(profile));
    });
  });

  it('calls puterAuth when signIn is invoked', async () => {
    puterAuth.mockResolvedValue({ id: 'user-1' });

    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(puterAuth).toHaveBeenCalledTimes(1);
  });

  it('user remains null if puterAuth rejects', async () => {
    puterAuth.mockRejectedValue(new Error('Auth failed'));

    renderWithProvider();

    await act(async () => {
      try {
        await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
      } catch {
        // expected rejection
      }
    });

    expect(screen.getByTestId('user').textContent).toBe('no-user');
  });

  it('returns null when useAuthContext is used outside provider', () => {
    function NoProvider() {
      const ctx = useAuthContext();
      return <div data-testid="ctx">{ctx === null ? 'null' : 'value'}</div>;
    }
    render(<NoProvider />);
    expect(screen.getByTestId('ctx').textContent).toBe('null');
  });
});
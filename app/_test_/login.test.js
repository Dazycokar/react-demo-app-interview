import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../login/page';
import { AuthProvider } from '../context/AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Login Page', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockPush
    }));
  });

  test('displays validation error for invalid phone number', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    // Submit without phone number
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });

    // Enter invalid phone number (missing country code)
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '0712345678' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must start with country code/i)).toBeInTheDocument();
    });
  });

  test('accepts valid phone number +254712345678', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const phoneInput = screen.getByLabelText(/phone number/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(phoneInput, { target: { value: '+254712345678' } });
    fireEvent.click(submitButton);

    // Should redirect to home page
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});

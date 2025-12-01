import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; 
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

// Custom mock provider that correctly wraps the AuthContext.Provider
const MockAuthProvider = ({ children }) => {
  const mockAuth = {
    login: vi.fn(),        // mock login function
    loading: false,
    user: null
  };

  return (
    <AuthContext.Provider value={mockAuth}>
      {children}
    </AuthContext.Provider>
  );
};

describe('LoginPage UI', () => {
  it('renders the login form elements', () => {
    render(
      <BrowserRouter>
        <MockAuthProvider>
          <LoginPage />
        </MockAuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});

// Toast Notification Test
describe('Toast System', () => {
  it('shows a toast message when triggered', async () => {
    render(<ToastContainer />);

    toast('Hello Toast!');
    
    const toastMessage = await screen.findByText('Hello Toast!', {}, { timeout: 3000 });
    expect(toastMessage).toBeInTheDocument();
  });
});

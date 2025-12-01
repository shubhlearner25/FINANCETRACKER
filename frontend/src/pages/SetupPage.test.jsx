import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import CurrencyContext from '../contexts/CurrencyContext';
import SetupPage from './SetupPage';

// Mock react-router navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock axios PUT call
vi.mock('../api/axios', () => ({
  default: {
    put: vi.fn(),
  },
}));

// Common mock user
const mockUser = {
  _id: '123',
  email: 'test@example.com',
  defaultCurrency: 'USD',
  isSetupComplete: false,
};

const MockAuthProvider = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: mockUser,
      loading: false,
      setup: vi.fn(),
    }}
  >
    {children}
  </AuthContext.Provider>
);

const MockCurrencyProvider = ({ children }) => {
  const mockCurrency = {
    currency: { code: 'USD', name: 'United States Dollar', symbol: '$', flag: '🇺🇸' },
    changeCurrency: vi.fn(),
    supportedCurrencies: [
      { code: 'USD', name: 'United States Dollar', symbol: '$', flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    ],
  };

  return (
    <CurrencyContext.Provider value={mockCurrency}>
      {children}
    </CurrencyContext.Provider>
  );
};

describe('SetupPage UI Tests', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render the welcome and instruction text', () => {
    render(
      <BrowserRouter>
        <MockAuthProvider>
          <MockCurrencyProvider>
            <SetupPage />
          </MockCurrencyProvider>
        </MockAuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to Finaance Tracker!')).toBeInTheDocument();
    expect(
      screen.getByText("Welcome, test@example.com! Let's set up your account.")
    ).toBeInTheDocument();
    expect(screen.getByText('Choose your default currency')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save and continue/i })).toBeInTheDocument();
  });

  it('should list all available currencies', () => {
    render(
      <BrowserRouter>
        <MockAuthProvider>
          <MockCurrencyProvider>
            <SetupPage />
          </MockCurrencyProvider>
        </MockAuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('United States Dollar')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('British Pound')).toBeInTheDocument();
  });
});

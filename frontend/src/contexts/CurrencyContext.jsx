import React, { createContext, useState, useEffect } from "react";
import { supportedCurrencies } from "../config/currencies";
import useAuth from "../hooks/useAuth";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const { user } = useAuth();

  // Default to first currency in list (usually USD)
  const [activeCurrency, setActiveCurrency] = useState(() => supportedCurrencies[0]);

  /**
   * Load user's default currency when user data becomes available
   */
  useEffect(() => {
    if (user?.defaultCurrency) {
      const match = supportedCurrencies.find(
        (c) => c.code === user.defaultCurrency
      );
      if (match) {
        setActiveCurrency(match);
      }
    }
  }, [user]);

  /**
   * Change the currently selected currency
   */
  const changeCurrency = (code) => {
    const selected = supportedCurrencies.find((c) => c.code === code);
    if (selected) {
      setActiveCurrency(selected);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: activeCurrency,
        changeCurrency,
        supportedCurrencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;

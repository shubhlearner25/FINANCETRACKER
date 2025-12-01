import React, { useState, useEffect } from "react";
import useCurrency from "../hooks/useCurrency";
import useAuth from "../hooks/useAuth";

const CurrencySelector = () => {
  const { currency, changeCurrency, supportedCurrencies } = useCurrency();
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  // Load user preference on mount
  useEffect(() => {
    if (user?.defaultCurrency) {
      const match = supportedCurrencies.find(
        (item) => item.code === user.defaultCurrency
      );
      if (match) changeCurrency(match);
    }
  }, [user, supportedCurrencies]);

  // Selecting a currency
  const handleCurrencyPick = (code) => {
    changeCurrency(code);
    setOpenMenu(false);
  };

  return (
    <div className="relative select-none">
      {/* Toggle Button */}
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
      >
        <span>{currency.flag}</span>
        <span>{currency.code}</span>
      </button>

      {/* Dropdown Panel */}
      {openMenu && (
        <div className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-md z-30">
          <ul className="py-1">
            {supportedCurrencies.map((item) => (
              <li
                key={item.code}
                onClick={() => handleCurrencyPick(item.code)}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span>{item.flag}</span>
                <span>
                  {item.name} ({item.code})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;

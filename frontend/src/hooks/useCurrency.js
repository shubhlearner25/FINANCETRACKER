import { useContext } from "react";
import CurrencyContext from "../contexts/CurrencyContext";

/**
 * Convenience hook to access currency-related state and actions.
 * Wraps the CurrencyContext so components can easily consume it.
 */
const useCurrency = () => {
  const currencyData = useContext(CurrencyContext);
  return currencyData;
};

export default useCurrency;

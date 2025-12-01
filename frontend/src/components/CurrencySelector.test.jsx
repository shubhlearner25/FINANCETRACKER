import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CurrencySelector from "./CurrencySelector";
import { CurrencyProvider } from "../contexts/CurrencyContext";

// ---------- Mock LocalStorage ----------
const mockStorage = (() => {
  let store = {};

  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, val) => {
      store[key] = String(val);
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockStorage,
});

// =======================================
// TEST SUITE
// =======================================
describe("CurrencySelector – persistence tests", () => {
  beforeEach(() => {
    mockStorage.clear();
    vi.resetAllMocks();
  });

  it("stores selected currency in localStorage & restores it after re-render", async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <CurrencyProvider>
        <CurrencySelector />
      </CurrencyProvider>
    );

    // Check default USD
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();

    // Open dropdown
    await user.click(screen.getByRole("button"));

    // Pick INR
    await user.click(screen.getByText(/Indian Rupee \(INR\)/i));

    // LocalStorage should save the selected currency code
    expect(mockStorage.setItem).toHaveBeenCalledWith("currencyCode", "INR");

    // UI must update
    expect(screen.getByText("INR")).toBeInTheDocument();
    expect(screen.getByText("🇮🇳")).toBeInTheDocument();

    // Unmount to simulate "page reload"
    unmount();

    // Render again (restoring stored currency)
    render(
      <CurrencyProvider>
        <CurrencySelector />
      </CurrencyProvider>
    );

    expect(mockStorage.getItem).toHaveBeenCalledWith("currencyCode");
    expect(screen.getByText("INR")).toBeInTheDocument();
    expect(screen.getByText("🇮🇳")).toBeInTheDocument();
  });

  it("correctly saves EUR selection in localStorage", async () => {
    const user = userEvent.setup();

    render(
      <CurrencyProvider>
        <CurrencySelector />
      </CurrencyProvider>
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText(/Euro \(EUR\)/i));

    expect(mockStorage.setItem).toHaveBeenCalledWith("currencyCode", "EUR");
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("🇪🇺")).toBeInTheDocument();
  });

  it("falls back to USD when storage has no previous value", () => {
    render(
      <CurrencyProvider>
        <CurrencySelector />
      </CurrencyProvider>
    );

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });
});

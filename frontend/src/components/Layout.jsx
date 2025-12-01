import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CurrencySelector from "./CurrencySelector";
import ThemeToggle from "./ThemeToggle";

const Layout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Updated link styling logic
  const navStyle = ({ isActive }) => {
    const base =
      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300";

    return isActive
      ? `${base} bg-orange-500 text-white shadow-md`
      : `${base} text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black`;
  };

  // Redirect to home
  const goHome = () => navigate("/");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-8">
              {/* Brand Logo/Title */}
              <span
                onClick={goHome}
                className="cursor-pointer text-xl font-extrabold text-orange-600 dark:text-orange-400 transition-all hover:scale-105 hover:text-orange-500 dark:hover:text-orange-300"
              >
                Finance Tracker
              </span>

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <div className="flex items-center space-x-4">
                  <NavLink to="/dashboard" className={navStyle}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/transactions" className={navStyle}>
                    Transactions
                  </NavLink>
                  <NavLink to="/receipts" className={navStyle}>
                    Receipts
                  </NavLink>
                  <NavLink to="/settings" className={navStyle}>
                    Settings
                  </NavLink>
                  <NavLink to="/budgets" className={navStyle}>
                    Budgets
                  </NavLink>
                  <NavLink to="/recurring-transactions" className={navStyle}>
                    Recurring
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <CurrencySelector />

              <button
                onClick={logout}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

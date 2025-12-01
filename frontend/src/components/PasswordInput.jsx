import React, { useState } from "react";

// ---------------- Icons ----------------
const ShowIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M2.5 12C3.8 8 7.5 5 12 5s8.2 3 9.5 7c-1.3 4-5 7-9.5 7s-8.2-3-9.5-7z"
    />
  </svg>
);

const HideIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M13.9 18.8A9.7 9.7 0 0112 19c-4.5 0-8.2-3-9.5-7C3.8 8 7.5 5 12 5c.8 0 1.6.1 2.4.3"
    />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M2 2l20 20"
    />
  </svg>
);

// ---------------- Component ----------------
const PasswordInput = ({
  value,
  onChange,
  id = "password",
  placeholder = "Password",
  error,
  className = ""
}) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow((prev) => !prev);

  const baseStyle =
    "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 transition";
  const errorStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 dark:border-gray-600 focus:ring-orange-500";

  return (
    <div className="relative">
      {/* Input */}
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={`${baseStyle} ${errorStyle} pr-10 ${className}`}
      />

      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={show ? "Hide password" : "Show password"}
        className="
          absolute inset-y-0 right-0 flex items-center pr-3
          text-gray-400 dark:text-gray-500
          hover:text-orange-600 dark:hover:text-orange-400
          transition-colors duration-200
        "
      >
        {show ? <HideIcon /> : <ShowIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;

import React from "react";

const Spinner = ({ inline = false }) => {
  // Small inline loader (used inside buttons or text)
  if (inline) {
    return (
      <div
        className="
          h-5 w-5 
          border-2 border-dashed 
          rounded-full animate-spin 
          border-orange-400
        "
      />
    );
  }

  // Full-screen / centered loader (default)
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="
          h-16 w-16 
          border-4 border-dashed 
          rounded-full animate-spin 
          border-orange-600
        "
      />
    </div>
  );
};

export default Spinner;

import React from "react";

const EmptyState = ({ message, icon }) => {
  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center rounded-xl border shadow-md 
                        bg-orange-50 dark:bg-gray-900 
                        border-orange-200 dark:border-gray-700 
                        p-6 text-center transition-all duration-300">

          {icon && (
            <div className="mb-3 flex h-14 w-14 items-center justify-center 
                            rounded-lg bg-orange-200 dark:bg-gray-800">
              {icon}
            </div>
          )}

          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

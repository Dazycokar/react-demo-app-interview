import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4 sm:p-8">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default LoadingSpinner;

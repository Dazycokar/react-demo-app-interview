import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded flex items-center text-sm sm:text-base">
      <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;

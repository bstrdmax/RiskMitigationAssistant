
import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm" role="alert">
      <div className="flex">
        <div className="py-1">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
        </div>
        <div>
          <p className="font-bold text-red-800">An Error Occurred</p>
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

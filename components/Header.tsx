
import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-center">
        <ShieldCheckIcon className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight">
          Risk Mitigation Assistant
        </h1>
      </div>
    </header>
  );
};

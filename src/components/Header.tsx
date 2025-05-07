import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-neutral-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary-400" />
          <h1 className="text-xl font-bold">Transaction Monitoring Rule Builder</h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 rounded hover:bg-neutral-700 transition-colors">
            Rules
          </button>
          <button className="px-4 py-2 rounded hover:bg-neutral-700 transition-colors">
            Models
          </button>
          <button className="px-4 py-2 rounded hover:bg-neutral-700 transition-colors">
            Analytics
          </button>
          <button className="px-4 py-2 bg-primary-600 rounded hover:bg-primary-700 transition-colors">
            New Rule
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
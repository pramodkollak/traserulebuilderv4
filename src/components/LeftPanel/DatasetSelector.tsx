import React from 'react';
import { Database, Users, CreditCard } from 'lucide-react';
import { DatasetType } from '../../types';
import { useRuleStore } from '../../store/useRuleStore';

const DatasetSelector: React.FC = () => {
  const { selectedDataset, setSelectedDataset } = useRuleStore();

  const datasets: { type: DatasetType; icon: React.ReactNode; description: string }[] = [
    {
      type: 'Customer',
      icon: <Users className="h-5 w-5" />,
      description: 'Customer profile data',
    },
    {
      type: 'Account',
      icon: <Database className="h-5 w-5" />,
      description: 'Account information',
    },
    {
      type: 'Transaction',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Transaction details',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="font-semibold text-neutral-700 mb-3">Select Dataset</h2>
      <div className="space-y-2">
        {datasets.map(({ type, icon, description }) => (
          <button
            key={type}
            className={`w-full flex items-center p-3 rounded-md border transition-all ${
              selectedDataset === type
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
            onClick={() => setSelectedDataset(type)}
          >
            <div
              className={`p-2 rounded-full mr-3 ${
                selectedDataset === type ? 'bg-primary-100' : 'bg-neutral-100'
              }`}
            >
              {icon}
            </div>
            <div className="text-left">
              <div className="font-medium">{type}</div>
              <div className="text-sm text-neutral-500">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatasetSelector;
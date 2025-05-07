import React from 'react';
import DatasetSelector from './DatasetSelector';
import AttributeList from './AttributeList';
import OperatorList from './OperatorList';

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-neutral-50 border-r h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-neutral-800">Dataset & Operators</h2>
        <p className="text-sm text-neutral-500">
          Select a dataset and drag operators to the canvas
        </p>
      </div>
      <DatasetSelector />
      <div className="border-t">
        <AttributeList />
      </div>
      <div className="border-t">
        <OperatorList />
      </div>
    </div>
  );
};

export default LeftPanel;
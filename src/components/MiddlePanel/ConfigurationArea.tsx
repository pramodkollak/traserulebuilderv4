import React from 'react';
import { Sliders, Calendar, Hash } from 'lucide-react';

const ConfigurationArea: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Sliders className="h-5 w-5 text-orange-500 mr-2" />
          <h3 className="font-medium text-neutral-800">Configuration</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-neutral-200 rounded-md p-3">
          <div className="flex items-center mb-2">
            <Hash className="h-4 w-4 text-neutral-500 mr-2" />
            <h4 className="text-sm font-medium text-neutral-700">Threshold</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              placeholder="Enter threshold value"
              min={0}
            />
            <select className="ml-2 px-3 py-2 border border-neutral-300 rounded-md text-sm">
              <option>$</option>
              <option>%</option>
              <option>Count</option>
            </select>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-md p-3">
          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 text-neutral-500 mr-2" />
            <h4 className="text-sm font-medium text-neutral-700">Loopback Period</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              placeholder="Enter period"
              min={1}
            />
            <select className="ml-2 px-3 py-2 border border-neutral-300 rounded-md text-sm">
              <option>Days</option>
              <option>Weeks</option>
              <option>Months</option>
              <option>Years</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationArea;
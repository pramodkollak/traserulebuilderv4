import React from 'react';
import { GitMerge, PlusCircle, X, Settings } from 'lucide-react';
import { useRuleStore } from '../../store/useRuleStore';
import { Operator } from '../../types';

const OperatorBlockArea: React.FC = () => {
  const { ruleBlocks, removeRuleBlock, updateRuleBlock } = useRuleStore();
  
  const operatorBlocks = ruleBlocks.filter(block => block.type === 'operator');

  const handleParameterChange = (blockId: string, operator: Operator, value: string) => {
    updateRuleBlock(blockId, {
      data: {
        ...operator,
        parameter: value,
      },
    });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <GitMerge className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="font-medium text-neutral-800">Operator Blocks</h3>
        </div>
        <div className="text-xs text-neutral-500">
          {operatorBlocks.length} blocks
        </div>
      </div>

      {operatorBlocks.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-md p-6 text-center">
          <p className="text-neutral-500 mb-2">Drag operators here to build your rule</p>
          <p className="text-xs text-neutral-400">Operators will be chained in the order they appear</p>
        </div>
      ) : (
        <div className="space-y-2">
          {operatorBlocks.map((block, index) => {
            const operator = block.data as Operator;
            return (
              <div 
                key={block.id}
                className="bg-white border border-neutral-200 rounded-md p-3 flex items-start hover:shadow-sm transition-shadow"
              >
                <div className="bg-blue-100 text-blue-600 p-1.5 rounded mr-3">
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-neutral-800">{operator.name}</h4>
                    <button 
                      onClick={() => removeRuleBlock(block.id)}
                      className="text-neutral-400 hover:text-error-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-500">{operator.description}</p>
                  <div className="mt-2 p-2 bg-neutral-50 rounded-md">
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="Enter parameter value..."
                      value={operator.parameter || ''}
                      onChange={(e) => handleParameterChange(block.id, operator, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          
          <button className="w-full py-2 border border-dashed border-neutral-300 rounded-md text-neutral-500 hover:border-primary-300 hover:text-primary-600 flex items-center justify-center">
            <PlusCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Add Operator</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default OperatorBlockArea;
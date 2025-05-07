import React from 'react';
import { Code, PlusCircle, X } from 'lucide-react';
import { useDroppable } from '../../hooks/useDroppable';
import { useRuleStore } from '../../store/useRuleStore';
import { Attribute, Operator } from '../../types';

const LogicBuilder: React.FC = () => {
  const { addRuleBlock, ruleBlocks, removeRuleBlock } = useRuleStore();
  const { setNodeRef, isOver } = useDroppable({
    id: 'logic-builder',
    onDrop: (data) => {
      if (data) {
        addRuleBlock({
          type: data.type,
          data: data.data,
        });
      }
    },
  });

  const renderBlockContent = (block: any) => {
    if (block.type === 'attribute') {
      const attribute = block.data as Attribute;
      return (
        <div className="flex items-center">
          <span className="text-sm font-medium">{attribute.dataset}.{attribute.name}</span>
          <span className="ml-2 text-xs text-neutral-500">({attribute.type})</span>
        </div>
      );
    } else if (block.type === 'operator') {
      const operator = block.data as Operator;
      return (
        <div className="flex items-center">
          <span className="text-sm font-medium">{operator.name}</span>
          {operator.parameter && (
            <span className="ml-2 text-xs bg-neutral-100 px-2 py-1 rounded">
              {operator.parameter}
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Code className="h-5 w-5 text-indigo-500 mr-2" />
          <h3 className="font-medium text-neutral-800">Logic Builder</h3>
        </div>
        <button className="text-xs flex items-center text-primary-600 hover:text-primary-700">
          <PlusCircle className="h-3 w-3 mr-1" />
          Add Condition
        </button>
      </div>

      <div 
        ref={setNodeRef}
        className={`bg-neutral-50 border ${
          isOver ? 'border-primary-500 border-dashed bg-primary-50' : 'border-neutral-200'
        } rounded-md p-3 transition-colors duration-200`}
      >
        <div className="flex items-center mb-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-medium mr-2">
            IF
          </span>
          <div className="flex-1 border-b border-dashed border-neutral-300"></div>
        </div>

        <div className="pl-6 border-l-2 border-indigo-200 my-2">
          {ruleBlocks.length > 0 ? (
            <div className="space-y-2">
              {ruleBlocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-white border border-neutral-200 rounded p-2 flex items-center justify-between group"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                      <Code className="h-4 w-4" />
                    </div>
                    {renderBlockContent(block)}
                  </div>
                  <button
                    onClick={() => removeRuleBlock(block.id)}
                    className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-error-500 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded p-2 mb-2 flex items-center">
              <div className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                <Code className="h-4 w-4" />
              </div>
              <p className="text-sm text-neutral-600">
                {isOver ? 'Drop here to add condition' : 'Drag conditions here'}
              </p>
            </div>
          )}
          
          <button className="text-xs flex items-center text-neutral-500 hover:text-neutral-700 py-1">
            <PlusCircle className="h-3 w-3 mr-1" />
            Add Sub-condition
          </button>
        </div>

        <div className="flex items-center mt-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium mr-2">
            THEN
          </span>
          <div className="flex-1 border-b border-dashed border-neutral-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LogicBuilder;
import React from 'react';
import { useRuleStore } from '../../store/useRuleStore';
import { useDroppable } from '../../hooks/useDroppable';
import LogicBuilder from './LogicBuilder';
import OperatorBlockArea from './OperatorBlockArea';
import ConfigurationArea from './ConfigurationArea';

const RuleCanvas: React.FC = () => {
  const { addRuleBlock } = useRuleStore();
  const { setNodeRef, isOver, onDrop } = useDroppable({ 
    id: 'rule-canvas',
    onDrop: (data) => {
      if (data) {
        addRuleBlock({
          type: data.type,
          data: data.data,
        });
      }
    }
  });

  return (
    <div className="p-6 h-full flex flex-col overflow-y-auto">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">Rule Canvas</h2>
      <div className="flex-1 flex flex-col space-y-6">
        <LogicBuilder />
        <OperatorBlockArea />
        <ConfigurationArea />

        <div
          ref={setNodeRef}
          className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 ${
            isOver
              ? 'bg-primary-100 bg-opacity-40 border-2 border-dashed border-primary-400 opacity-100'
              : 'opacity-0'
          }`}
        >
          {isOver && (
            <div className="flex items-center justify-center h-full">
              <p className="text-primary-600 font-medium bg-white px-4 py-2 rounded-md shadow-sm">
                Drop here to add to rule
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuleCanvas;
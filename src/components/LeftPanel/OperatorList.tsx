import React from 'react';
import { useRuleStore } from '../../store/useRuleStore';
import { 
  Filter, 
  GitMerge, 
  Plus, 
  Calendar,
  Hash,
  BarChart,
  Combine,
  ArrowRight,
  ArrowLeft,
  Equal,
  Calculator,
  Clock
} from 'lucide-react';
import { useDraggable } from '../../hooks/useDraggable';
import { OperatorType } from '../../types';

const operatorConfig: Record<OperatorType, {
  icon: React.ReactNode;
  description: string;
  operators: Array<{
    name: string;
    description: string;
  }>;
}> = {
  'Filter': {
    icon: <Filter className="h-5 w-5" />,
    description: 'Filter data based on conditions',
    operators: [
      { name: 'Equal To', description: 'Match exact values' },
      { name: 'Not Equal To', description: 'Exclude exact values' },
      { name: 'Greater Than', description: 'Values above threshold' },
      { name: 'Less Than', description: 'Values below threshold' },
      { name: 'Between', description: 'Values in range' },
      { name: 'Contains', description: 'Partial text match' }
    ]
  },
  'Join': {
    icon: <GitMerge className="h-5 w-5" />,
    description: 'Combine multiple datasets',
    operators: [
      { name: 'Inner Join', description: 'Match records in both sets' },
      { name: 'Left Join', description: 'Keep all left records' },
      { name: 'Right Join', description: 'Keep all right records' }
    ]
  },
  'Math': {
    icon: <Calculator className="h-5 w-5" />,
    description: 'Mathematical operations',
    operators: [
      { name: 'Sum', description: 'Add values together' },
      { name: 'Average', description: 'Calculate mean value' },
      { name: 'Multiply', description: 'Multiply values' },
      { name: 'Divide', description: 'Divide values' }
    ]
  },
  'DateFn': {
    icon: <Clock className="h-5 w-5" />,
    description: 'Date and time operations',
    operators: [
      { name: 'Date Difference', description: 'Time between dates' },
      { name: 'Date Add', description: 'Add time to date' },
      { name: 'Date Subtract', description: 'Subtract time from date' },
      { name: 'Is Weekend', description: 'Check if date is weekend' }
    ]
  },
  'Logic': {
    icon: <Combine className="h-5 w-5" />,
    description: 'Logical operations',
    operators: [
      { name: 'AND', description: 'All conditions must match' },
      { name: 'OR', description: 'Any condition must match' },
      { name: 'NOT', description: 'Invert condition' }
    ]
  },
  'Aggregation': {
    icon: <BarChart className="h-5 w-5" />,
    description: 'Group and aggregate data',
    operators: [
      { name: 'Count', description: 'Count records' },
      { name: 'Group By', description: 'Group records by field' },
      { name: 'Distinct', description: 'Get unique values' }
    ]
  },
  'Threshold': {
    icon: <Hash className="h-5 w-5" />,
    description: 'Set threshold values',
    operators: [
      { name: 'Value Threshold', description: 'Set numeric threshold' },
      { name: 'Percentage Threshold', description: 'Set percentage threshold' },
      { name: 'Count Threshold', description: 'Set count threshold' }
    ]
  }
};

const DraggableOperator: React.FC<{
  type: OperatorType;
  operator: { name: string; description: string };
  icon: React.ReactNode;
}> = ({ type, operator, icon }) => {
  const { setNodeRef, attributes } = useDraggable({
    id: `${type}-${operator.name}`,
    data: {
      type: 'operator',
      data: {
        id: `${type}-${operator.name}`,
        type,
        name: operator.name,
        description: operator.description,
        icon: type.toLowerCase()
      }
    }
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="flex items-center p-2 bg-white border border-neutral-200 rounded-md cursor-grab hover:border-primary-300 hover:shadow-sm transition-all"
    >
      <div className={`p-1 rounded mr-2 ${
        {
          'Filter': 'bg-blue-100 text-blue-600',
          'Join': 'bg-purple-100 text-purple-600',
          'Math': 'bg-green-100 text-green-600',
          'DateFn': 'bg-yellow-100 text-yellow-600',
          'Logic': 'bg-indigo-100 text-indigo-600',
          'Aggregation': 'bg-pink-100 text-pink-600',
          'Threshold': 'bg-orange-100 text-orange-600',
        }[type] || 'bg-gray-100'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{operator.name}</div>
        <div className="text-xs text-neutral-500">{operator.description}</div>
      </div>
    </div>
  );
};

const OperatorList: React.FC = () => {
  const [expandedType, setExpandedType] = React.useState<OperatorType | null>(null);

  const handleTypeClick = (type: OperatorType) => {
    setExpandedType(expandedType === type ? null : type);
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-neutral-700 mb-3">Operators</h2>
      <div className="space-y-2">
        {Object.entries(operatorConfig).map(([type, config]) => (
          <div key={type} className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleTypeClick(type as OperatorType)}
              className={`w-full flex items-center p-3 text-left transition-colors ${
                expandedType === type ? 'bg-primary-50' : 'bg-white hover:bg-neutral-50'
              }`}
            >
              <div className={`p-2 rounded-full mr-3 ${
                expandedType === type ? 'bg-primary-100' : 'bg-neutral-100'
              }`}>
                {config.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium">{type}</div>
                <div className="text-sm text-neutral-500">{config.description}</div>
              </div>
              {expandedType === type ? (
                <ArrowRight className="h-5 w-5 text-neutral-400" />
              ) : (
                <ArrowLeft className="h-5 w-5 text-neutral-400" />
              )}
            </button>
            
            {expandedType === type && (
              <div className="border-t border-neutral-200 p-2 bg-neutral-50">
                <div className="space-y-2">
                  {config.operators.map((operator) => (
                    <DraggableOperator
                      key={`${type}-${operator.name}`}
                      type={type as OperatorType}
                      operator={operator}
                      icon={config.icon}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorList;
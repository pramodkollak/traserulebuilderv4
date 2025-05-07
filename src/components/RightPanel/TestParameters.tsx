import React from 'react';
import { Calendar, BarChart } from 'lucide-react';
import { useRuleStore } from '../../store/useRuleStore';

const TestParameters: React.FC = () => {
  const { testParameters, setTestParameters, runTest, ruleExpression } = useRuleStore();

  return (
    <div className="p-4">
      <h2 className="font-semibold text-neutral-700 mb-3">Test Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Start</label>
              <input
                type="date"
                value={testParameters.dateRange.start}
                onChange={(e) => 
                  setTestParameters({ 
                    dateRange: { 
                      ...testParameters.dateRange, 
                      start: e.target.value 
                    } 
                  })
                }
                className="w-full p-2 border border-neutral-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">End</label>
              <input
                type="date"
                value={testParameters.dateRange.end}
                onChange={(e) => 
                  setTestParameters({ 
                    dateRange: { 
                      ...testParameters.dateRange, 
                      end: e.target.value 
                    } 
                  })
                }
                className="w-full p-2 border border-neutral-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2 flex items-center">
            <BarChart className="h-4 w-4 mr-1" />
            Sample Size
          </label>
          <input
            type="number"
            value={testParameters.sampleSize}
            onChange={(e) => 
              setTestParameters({ 
                sampleSize: parseInt(e.target.value) || 100 
              })
            }
            min={1}
            max={1000}
            className="w-full p-2 border border-neutral-300 rounded-md text-sm"
          />
        </div>
        
        <button
          onClick={runTest}
          disabled={!ruleExpression}
          className={`w-full py-3 rounded-md font-medium flex items-center justify-center transition-colors ${
            ruleExpression
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Test Rule
        </button>
      </div>
    </div>
  );
};

export default TestParameters;
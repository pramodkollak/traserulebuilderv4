import React from 'react';
import { Code, Copy } from 'lucide-react';
import { useRuleStore } from '../../store/useRuleStore';

const RulePreview: React.FC = () => {
  const { ruleExpression } = useRuleStore();

  const copyToClipboard = () => {
    if (ruleExpression) {
      navigator.clipboard.writeText(ruleExpression);
      // In a real app, you would show a toast or notification
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-neutral-700">Rule Expression</h2>
        {ruleExpression && (
          <button 
            onClick={copyToClipboard}
            className="text-neutral-500 hover:text-primary-600 p-1"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="bg-neutral-800 text-white rounded-md p-3 font-mono text-sm overflow-x-auto">
        {ruleExpression ? (
          <pre className="whitespace-pre-wrap">{ruleExpression}</pre>
        ) : (
          <div className="text-neutral-400 flex items-center justify-center py-4">
            <Code className="h-5 w-5 mr-2" />
            Build your rule to see the expression
          </div>
        )}
      </div>
    </div>
  );
};

export default RulePreview;
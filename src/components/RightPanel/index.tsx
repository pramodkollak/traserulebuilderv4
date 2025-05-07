import React from 'react';
import SegmentSelector from './SegmentSelector';
import RulePreview from './RulePreview';
import TestParameters from './TestParameters';

const RightPanel: React.FC = () => {
  return (
    <div className="bg-neutral-50 border-l h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-neutral-800">Preview & Testing</h2>
        <p className="text-sm text-neutral-500">
          Configure segments and test your rule
        </p>
      </div>
      <SegmentSelector />
      <div className="border-t">
        <RulePreview />
      </div>
      <div className="border-t">
        <TestParameters />
      </div>
    </div>
  );
};

export default RightPanel;
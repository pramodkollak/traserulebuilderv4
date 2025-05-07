import React from 'react';
import RuleCanvas from './RuleCanvas';

const MiddlePanel: React.FC = () => {
  return (
    <div className="bg-white h-full overflow-y-auto relative">
      <RuleCanvas />
    </div>
  );
};

export default MiddlePanel;
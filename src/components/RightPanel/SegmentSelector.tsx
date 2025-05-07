import React from 'react';
import { Users } from 'lucide-react';
import { useRuleStore } from '../../store/useRuleStore';

const SegmentSelector: React.FC = () => {
  const { 
    customerSegments, 
    selectedSegment, 
    setSelectedSegment,
    scoringCategory,
    setScoringCategory
  } = useRuleStore();

  return (
    <div className="p-4">
      <h2 className="font-semibold text-neutral-700 mb-3">Segments & Scoring</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Customer Segment
        </label>
        <select 
          className="w-full p-2 border border-neutral-300 rounded-md"
          value={selectedSegment?.id || ''}
          onChange={(e) => {
            const segmentId = e.target.value;
            const segment = customerSegments.find(s => s.id === segmentId);
            if (segment) {
              setSelectedSegment(segment);
            }
          }}
        >
          <option value="">Select a segment</option>
          {customerSegments.map((segment) => (
            <option key={segment.id} value={segment.id}>
              {segment.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Scoring Category
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => setScoringCategory('High')}
            className={`flex-1 py-2 rounded-md text-center text-sm font-medium transition-colors ${
              scoringCategory === 'High'
                ? 'bg-error-100 text-error-700 border border-error-300'
                : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setScoringCategory('Medium')}
            className={`flex-1 py-2 rounded-md text-center text-sm font-medium transition-colors ${
              scoringCategory === 'Medium'
                ? 'bg-warning-100 text-warning-700 border border-warning-300'
                : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setScoringCategory('Low')}
            className={`flex-1 py-2 rounded-md text-center text-sm font-medium transition-colors ${
              scoringCategory === 'Low'
                ? 'bg-success-100 text-success-700 border border-success-300'
                : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
            }`}
          >
            Low
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentSelector;
import React from 'react';
import { useRuleStore } from '../../store/useRuleStore';
import { Calendar, Hash, Type, Check } from 'lucide-react';
import { useDraggable } from '../../hooks/useDraggable';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'string':
      return <Type className="h-4 w-4 text-neutral-500" />;
    case 'number':
      return <Hash className="h-4 w-4 text-neutral-500" />;
    case 'boolean':
      return <Check className="h-4 w-4 text-neutral-500" />;
    case 'date':
      return <Calendar className="h-4 w-4 text-neutral-500" />;
    default:
      return <Type className="h-4 w-4 text-neutral-500" />;
  }
};

interface DraggableAttributeProps {
  attribute: {
    id: string;
    name: string;
    type: string;
  };
}

const DraggableAttribute: React.FC<DraggableAttributeProps> = ({ attribute }) => {
  const { setNodeRef, attributes: dragAttributes } = useDraggable({
    id: attribute.id,
    data: {
      type: 'attribute',
      data: attribute,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...dragAttributes}
      className="flex items-center p-2 bg-white border border-neutral-200 rounded-md cursor-grab hover:border-primary-300 hover:shadow-sm transition-all"
    >
      <div className="mr-2">{getTypeIcon(attribute.type)}</div>
      <div className="flex-1">
        <div className="font-medium text-sm">{attribute.name}</div>
        <div className="text-xs text-neutral-500 capitalize">{attribute.type}</div>
      </div>
    </div>
  );
};

const AttributeList: React.FC = () => {
  const { selectedDataset, attributes } = useRuleStore();

  if (!selectedDataset) {
    return (
      <div className="p-4 text-neutral-500 text-center italic">
        Select a dataset to view attributes
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-neutral-700 mb-3">Attributes</h2>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {attributes.map(attribute => (
          <DraggableAttribute key={attribute.id} attribute={attribute} />
        ))}
      </div>
    </div>
  );
};

export default AttributeList;
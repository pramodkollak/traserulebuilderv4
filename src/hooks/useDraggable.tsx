import { useDraggable as useDndKitDraggable } from '@dnd-kit/core';

interface UseDraggableProps {
  id: string;
  data?: any;
}

export const useDraggable = ({ id, data }: UseDraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDndKitDraggable({
    id,
    data,
  });

  return {
    setNodeRef,
    attributes: {
      ...attributes,
      ...listeners,
      style: {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : undefined,
        cursor: 'grab',
      },
    },
  };
};
import { useDroppable as useDndKitDroppable } from '@dnd-kit/core';

interface UseDroppableProps {
  id: string;
  onDrop?: (data: any) => void;
}

export const useDroppable = ({ id, onDrop }: UseDroppableProps) => {
  const { setNodeRef, isOver, active } = useDndKitDroppable({
    id,
  });

  const nodeRef = (node: HTMLElement | null) => {
    if (node) {
      node.dataset.droppableId = id;
      node.__onDrop = onDrop;
    }
    setNodeRef(node);
  };

  return {
    setNodeRef: nodeRef,
    isOver,
    active,
  };
};
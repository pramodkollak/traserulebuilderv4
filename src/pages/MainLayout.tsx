import React from 'react';
import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import MiddlePanel from '../components/MiddlePanel';
import RightPanel from '../components/RightPanel';
import TestSummary from '../components/TestResults/TestSummary';
import { useRuleStore } from '../store/useRuleStore';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const MainLayout: React.FC = () => {
  const { isTestResultVisible } = useRuleStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const dropZone = document.querySelector(`[data-droppable-id="${over.id}"]`);
      if (dropZone && dropZone.__onDrop) {
        dropZone.__onDrop(active.data.current);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          {isTestResultVisible ? (
            <div className="flex-1 p-6 flex items-center justify-center bg-neutral-100">
              <TestSummary />
            </div>
          ) : (
            <>
              <div className="w-80 lg:w-96 h-full">
                <LeftPanel />
              </div>
              <div className="flex-1 h-full">
                <MiddlePanel />
              </div>
              <div className="w-80 lg:w-96 h-full">
                <RightPanel />
              </div>
            </>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default MainLayout;
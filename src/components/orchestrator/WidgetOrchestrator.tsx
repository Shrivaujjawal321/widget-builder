import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useOrchestratorStore } from '../../store/useOrchestratorStore';
import { LivingIcon } from './LivingIcon';
import { ChatInterface } from './ChatInterface';

export const WidgetOrchestrator: React.FC = () => {
  const { isOpen, manifest } = useOrchestratorStore();
  const { position } = manifest.behavior;

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-8 right-8' 
    : 'bottom-8 left-8';

  return (
    <div className={`fixed ${positionClasses} z-[9999] flex flex-col items-end`}>
      <AnimatePresence>
        {!isOpen ? (
          <LivingIcon key="fab" />
        ) : (
          <ChatInterface key="chat" />
        )}
      </AnimatePresence>
    </div>
  );
};

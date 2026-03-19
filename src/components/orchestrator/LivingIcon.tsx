import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Sparkles, Bot, Zap, Ghost, CircleDashed, 
  Skull, Flame, Star, Heart, Scissors 
} from 'lucide-react';
import { useOrchestratorStore } from '../../store/useOrchestratorStore';
import { getAnimationVariants } from './AnimationEngine';

export const LivingIcon: React.FC = () => {
  const { manifest, toggleOpen } = useOrchestratorStore();
  const { theme, animation, iconType, behavior } = manifest;
  const { openTransition } = behavior;
  const [isHovered, setIsHovered] = React.useState(false);

  const variants = getAnimationVariants(animation.type, animation.intensity, theme.motionPersonality);

  const layoutId = openTransition === 'morph' ? 'widget-container' : undefined;
  const iconLayoutId = openTransition === 'morph' ? 'widget-icon' : undefined;

  const getIcon = () => {
    switch (iconType) {
      case 'bot': return <Bot size={28} />;
      case 'sparkles': return <Sparkles size={28} />;
      case 'zap': return <Zap size={28} />;
      case 'ghost': return <Ghost size={28} />;
      case 'skull': return <Skull size={28} />;
      case 'flame': return <Flame size={28} />;
      case 'star': return <Star size={28} />;
      case 'heart': return <Heart size={28} />;
      case 'scissors': return <Scissors size={28} />;
      case 'message':
      default: return <MessageSquare size={28} />;
    }
  };

  const getShapeStyles = () => {
    switch (manifest.shape) {
      case 'circle': return { borderRadius: '50%' };
      case 'blob': return { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' };
      case 'pill': return { borderRadius: '999px', width: '80px' };
      case 'diamond': return { borderRadius: '12px', rotate: '45deg' };
      case 'square':
      default: return { borderRadius: theme.radius };
    }
  };

  const getStyleProps = () => {
    const baseShape = getShapeStyles();
    switch (theme.visualStyle) {
      case 'brutalist':
        return {
          ...baseShape,
          border: `3px solid ${theme.text}`,
          boxShadow: isHovered ? `6px 6px 0px ${theme.primary}` : `4px 4px 0px ${theme.primary}`,
          background: theme.primary,
        };
      case 'neo-brutalism':
        return {
          ...baseShape,
          border: `2px solid ${theme.text}`,
          boxShadow: isHovered ? `5px 5px 0px ${theme.text}` : `3px 3px 0px ${theme.text}`,
          background: theme.primary,
        };
      case 'dark-luxury':
        return {
          ...baseShape,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 15px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.5)',
          color: '#fff',
        };
      case 'cyberpunk':
        return {
          ...baseShape,
          background: '#000',
          border: `2px solid ${theme.accent}`,
          boxShadow: isHovered ? `0 0 25px ${theme.accent}` : `0 0 15px ${theme.accent}`,
          clipPath: manifest.shape === 'square' ? 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' : 'none',
          color: theme.accent,
        };
      case 'glassmorphism':
      default:
        return {
          ...baseShape,
          background: theme.gradient,
          boxShadow: isHovered ? '0 12px 30px -5px rgba(0,0,0,0.2)' : theme.shadow,
          color: '#fff',
        };
    }
  };

  const styleProps = getStyleProps();

  return (
    <div className="relative">
      {/* Background Pulse Layer */}
      <motion.div
        layoutId="widget-glow"
        animate={{
          scale: isHovered ? [1.1, 1.4, 1.1] : [1, 1.2, 1],
          opacity: isHovered ? [0.6, 0.1, 0.6] : [0.5, 0, 0.5],
        }}
        transition={{
          duration: isHovered ? 1.2 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: -4,
          background: theme.primary,
          filter: 'blur(8px)',
          zIndex: 49,
          ...getShapeStyles(),
        } as any}
      />

      <motion.button
        layoutId={layoutId}
        onClick={toggleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={animation.trigger === 'idle' ? "idle" : undefined}
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        style={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          outline: 'none',
          position: 'relative',
          zIndex: 50,
          '--glow-color': theme.accent,
          ...styleProps,
        } as any}
        className="group"
      >
        <motion.div
          layoutId={iconLayoutId}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          style={{ 
            rotate: manifest.shape === 'diamond' ? '-45deg' : '0deg',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon()}
        </motion.div>
      </motion.button>
    </div>
  );
};

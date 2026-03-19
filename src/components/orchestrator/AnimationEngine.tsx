import { motion, Variants } from 'motion/react';
import { AnimationType, WidgetManifest } from '../../store/useOrchestratorStore';

export const getAnimationVariants = (
  type: AnimationType, 
  intensity: number, 
  personality: WidgetManifest['theme']['motionPersonality']
): Variants => {
  const transition = getTransition(personality);
  
  const interactionVariants = {
    hover: {
      scale: personality === 'bouncy' ? 1.18 : personality === 'snappy' ? 1.08 : 1.12,
      rotate: (personality === 'bouncy' ? [0, -5, 5, -5, 0] : personality === 'snappy' ? 2 : [0, -2, 2, 0]) as any,
      y: personality === 'fluid' ? -4 : 0,
      filter: personality === 'snappy' ? 'brightness(1.1)' : 'brightness(1.05)',
      transition: {
        ...(transition as any),
        rotate: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    },
    tap: {
      scale: personality === 'snappy' ? 0.85 : personality === 'bouncy' ? 0.75 : 0.92,
      rotate: personality === 'bouncy' ? [0, -12, 12, 0] : personality === 'snappy' ? -5 : 0,
      transition: { 
        type: "spring", 
        stiffness: personality === 'snappy' ? 1200 : personality === 'bouncy' ? 600 : 400, 
        damping: personality === 'snappy' ? 40 : personality === 'bouncy' ? 12 : 25 
      } as const
    }
  };

  switch (type) {
    case 'elastic_pulse':
      return {
        ...interactionVariants,
        idle: {
          scale: [1, 1.2 * intensity, 0.9, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'liquid_morph':
      return {
        ...interactionVariants,
        idle: {
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          scale: [1, 1.05, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'orbital_spin':
      return {
        ...interactionVariants,
        idle: {
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          transition: { 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        }
      };
    case 'ethereal_float':
      return {
        ...interactionVariants,
        idle: {
          y: [0, -15 * intensity, 0],
          rotate: [-5, 5, -5],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'glow_breathing':
      return {
        ...interactionVariants,
        idle: {
          boxShadow: [
            `0 0 0px rgba(0,0,0,0)`,
            `0 0 ${30 * intensity}px var(--glow-color)`,
            `0 0 0px rgba(0,0,0,0)`
          ],
          scale: [1, 1.02, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'ink_bleed':
      return {
        ...interactionVariants,
        idle: {
          filter: ["blur(0px)", `blur(${4 * intensity}px)`, "blur(0px)"],
          scale: [1, 1.15, 1],
          opacity: [1, 0.6, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'neon_flicker':
      return {
        ...interactionVariants,
        idle: {
          opacity: [1, 0.4, 1, 0.8, 1, 0.2, 1],
          scale: [1, 1.02, 0.98, 1.05, 1],
          textShadow: [
            `0 0 5px var(--glow-color)`,
            `0 0 30px var(--glow-color)`,
            `0 0 5px var(--glow-color)`
          ],
          transition: { duration: 0.4, repeat: Infinity, repeatType: "mirror" }
        }
      };
    case 'magnetic_hover':
      return {
        ...interactionVariants,
        hover: {
          scale: 1.2,
          rotate: [0, -5, 5, 0],
          transition: { 
            scale: { type: "spring", stiffness: 400, damping: 10 },
            rotate: { duration: 0.3, repeat: Infinity }
          }
        }
      };
    default:
      return interactionVariants;
  }
};

export const getTransition = (personality: WidgetManifest['theme']['motionPersonality']) => {
  switch (personality) {
    case 'snappy':
      return { type: "spring", stiffness: 500, damping: 30 };
    case 'bouncy':
      return { type: "spring", stiffness: 400, damping: 10 };
    case 'fluid':
    default:
      return { type: "spring", stiffness: 200, damping: 25 };
  }
};

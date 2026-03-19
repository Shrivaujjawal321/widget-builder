import { motion, Variants } from 'motion/react';
import { AnimationType, WidgetManifest } from '../../store/useOrchestratorStore';

export const getAnimationVariants = (type: AnimationType, intensity: number): Variants => {
  const scale = 1 + (0.05 * intensity);
  
  switch (type) {
    case 'elastic_pulse':
      return {
        idle: {
          scale: [1, 1.2 * intensity, 0.9, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'liquid_morph':
      return {
        idle: {
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          scale: [1, 1.05, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'orbital_spin':
      return {
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
        idle: {
          y: [0, -15 * intensity, 0],
          rotate: [-5, 5, -5],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'glow_breathing':
      return {
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
        idle: {
          filter: ["blur(0px)", `blur(${4 * intensity}px)`, "blur(0px)"],
          scale: [1, 1.15, 1],
          opacity: [1, 0.6, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      };
    case 'super_morph':
      return {
        idle: {
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.9, 1.1, 1],
          transition: { 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }
        }
      };
    case 'magnetic_hover':
      return {
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
      return {};
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

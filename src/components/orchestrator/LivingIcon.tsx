import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Sparkles, Bot, Zap, Ghost, CircleDashed, 
  Skull, Flame, Star, Heart, Scissors, ShoppingBag, Utensils,
  Coffee, Stethoscope, Briefcase, GraduationCap, Camera,
  Music, Plane, Home, Dumbbell, Truck, Code, Palette, Hammer,
  ShoppingCart, Building, Landmark, Hotel, Car, Bike, Gift,
  Camera as CameraRetro, Clapperboard, Gamepad2, Mic, Headphones,
  Book, Newspaper, PenTool, Brush, Layers, Database, Cpu, Server,
  Cloud, Shield, Lock, Key, Wallet, CreditCard, DollarSign,
  TrendingUp, PieChart, BarChart3, Activity, HeartPulse,
  Thermometer, Pill, Syringe, Baby, Dog, Cat, Fish,
  Leaf, Sprout, Flower2, Sun, Moon, CloudRain, Wind, Droplets,
  Umbrella
} from 'lucide-react';
import { useOrchestratorStore } from '../../store/useOrchestratorStore';
import { getAnimationVariants } from './AnimationEngine';

export const LivingIcon: React.FC = () => {
  const { manifest, toggleOpen } = useOrchestratorStore();
  const { theme, animation, iconType } = manifest;

  const variants = getAnimationVariants(animation.type, animation.intensity);

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
      case 'shopping-bag': return <ShoppingBag size={28} />;
      case 'utensils': return <Utensils size={28} />;
      case 'coffee': return <Coffee size={28} />;
      case 'stethoscope': return <Stethoscope size={28} />;
      case 'briefcase': return <Briefcase size={28} />;
      case 'graduation-cap': return <GraduationCap size={28} />;
      case 'camera': return <Camera size={28} />;
      case 'music': return <Music size={28} />;
      case 'plane': return <Plane size={28} />;
      case 'home': return <Home size={28} />;
      case 'dumbbell': return <Dumbbell size={28} />;
      case 'truck': return <Truck size={28} />;
      case 'code': return <Code size={28} />;
      case 'palette': return <Palette size={28} />;
      case 'hammer': return <Hammer size={28} />;
      case 'shopping-cart': return <ShoppingCart size={28} />;
      case 'building': return <Building size={28} />;
      case 'landmark': return <Landmark size={28} />;
      case 'hotel': return <Hotel size={28} />;
      case 'car': return <Car size={28} />;
      case 'bike': return <Bike size={28} />;
      case 'gift': return <Gift size={28} />;
      case 'camera-retro': return <CameraRetro size={28} />;
      case 'clapperboard': return <Clapperboard size={28} />;
      case 'gamepad-2': return <Gamepad2 size={28} />;
      case 'mic': return <Mic size={28} />;
      case 'headphones': return <Headphones size={28} />;
      case 'book': return <Book size={28} />;
      case 'newspaper': return <Newspaper size={28} />;
      case 'pen-tool': return <PenTool size={28} />;
      case 'brush': return <Brush size={28} />;
      case 'layers': return <Layers size={28} />;
      case 'database': return <Database size={28} />;
      case 'cpu': return <Cpu size={28} />;
      case 'server': return <Server size={28} />;
      case 'cloud': return <Cloud size={28} />;
      case 'shield': return <Shield size={28} />;
      case 'lock': return <Lock size={28} />;
      case 'key': return <Key size={28} />;
      case 'wallet': return <Wallet size={28} />;
      case 'credit-card': return <CreditCard size={28} />;
      case 'dollar-sign': return <DollarSign size={28} />;
      case 'trending-up': return <TrendingUp size={28} />;
      case 'pie-chart': return <PieChart size={28} />;
      case 'bar-chart-3': return <BarChart3 size={28} />;
      case 'activity': return <Activity size={28} />;
      case 'heart-pulse': return <HeartPulse size={28} />;
      case 'thermometer': return <Thermometer size={28} />;
      case 'pill': return <Pill size={28} />;
      case 'syringe': return <Syringe size={28} />;
      case 'baby': return <Baby size={28} />;
      case 'dog': return <Dog size={28} />;
      case 'cat': return <Cat size={28} />;
      case 'fish': return <Fish size={28} />;
      case 'leaf': return <Leaf size={28} />;
      case 'sprout': return <Sprout size={28} />;
      case 'flower-2': return <Flower2 size={28} />;
      case 'sun': return <Sun size={28} />;
      case 'moon': return <Moon size={28} />;
      case 'cloud-rain': return <CloudRain size={28} />;
      case 'wind': return <Wind size={28} />;
      case 'droplets': return <Droplets size={28} />;
      case 'umbrella': return <Umbrella size={28} />;
      case 'message':
      default: return <MessageSquare size={28} />;
    }
  };

  const getShapeStyles = () => {
    switch (manifest.shape) {
      case 'blob_standard': return { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' };
      case 'blob_tall': return { borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%', height: '72px' };
      case 'blob_wide': return { borderRadius: '30% 70% 40% 60% / 60% 40% 60% 40%', width: '80px' };
      case 'blob_asymmetric': return { borderRadius: '50% 20% 80% 50% / 30% 60% 40% 70%' };
      case 'blob_fluid': return { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' };
      default: return { borderRadius: '50%' };
    }
  };

  const getStyleProps = () => {
    const baseShape = getShapeStyles();
    const isClipped = false; // All blobs use border-radius now
    
    switch (theme.visualStyle) {
      case 'brutalist':
        return {
          ...baseShape,
          border: isClipped ? 'none' : `3px solid ${theme.text}`,
          boxShadow: isClipped ? 'none' : `4px 4px 0px ${theme.primary}`,
          filter: isClipped ? `drop-shadow(4px 4px 0px ${theme.text})` : 'none',
          background: theme.primary,
        };
      case 'neo-brutalism':
        return {
          ...baseShape,
          border: isClipped ? 'none' : `2px solid ${theme.text}`,
          boxShadow: isClipped ? 'none' : `3px 3px 0px ${theme.text}`,
          filter: isClipped ? `drop-shadow(3px 3px 0px ${theme.text})` : 'none',
          background: theme.primary,
        };
      case 'dark-luxury':
        return {
          ...baseShape,
          background: '#0a0a0a',
          border: isClipped ? 'none' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isClipped ? 'none' : '0 10px 30px rgba(0,0,0,0.5)',
          filter: isClipped ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' : 'none',
          color: '#fff',
        };
      case 'cyberpunk':
        return {
          ...baseShape,
          background: '#000',
          border: isClipped ? 'none' : `2px solid ${theme.accent}`,
          boxShadow: isClipped ? 'none' : `0 0 15px ${theme.accent}`,
          filter: isClipped ? `drop-shadow(0 0 8px ${theme.accent})` : 'none',
          color: theme.accent,
        };
      case 'glassmorphism':
      default:
        return {
          ...baseShape,
          background: theme.gradient,
          boxShadow: isClipped ? 'none' : theme.shadow,
          filter: isClipped ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' : 'none',
          color: '#fff',
        };
    }
  };

  const styleProps = getStyleProps();

  return (
    <div className="relative">
      {/* Background Pulse Layer */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
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
        layoutId="widget-container"
        onClick={toggleOpen}
        initial={false}
        animate={animation.trigger === 'idle' ? "idle" : undefined}
        whileHover={animation.trigger === 'hover' ? "hover" : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          style={{ 
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

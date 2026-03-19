import { create } from 'zustand';

export type AnimationType = 
  | 'elastic_pulse' 
  | 'liquid_morph' 
  | 'orbital_spin' 
  | 'magnetic_hover' 
  | 'ethereal_float' 
  | 'glow_breathing'
  | 'ink_bleed'
  | 'neon_flicker';

export type VisualStyle = 
  | 'minimal' 
  | 'brutalist' 
  | 'neo-brutalism' 
  | 'glassmorphism' 
  | 'soft-ui' 
  | 'dark-luxury'
  | 'cyberpunk'
  | 'vintage';

export interface DesignDNA {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  radius: string;
  shadow: string;
  glassmorphism: boolean;
  fontFamily: string;
  gradient: string;
  motionPersonality: 'snappy' | 'fluid' | 'bouncy';
  visualStyle: VisualStyle;
}

export interface WidgetManifest {
  widgetId: string;
  name: string;
  iconType: 'bot' | 'sparkles' | 'zap' | 'ghost' | 'message' | 'skull' | 'flame' | 'star' | 'heart' | 'scissors';
  shape: 'circle' | 'square' | 'blob' | 'pill' | 'diamond';
  theme: DesignDNA;
  animation: {
    type: AnimationType;
    intensity: number;
    trigger: 'hover' | 'idle' | 'click';
  };
  behavior: {
    openTransition: 'morph' | 'fade' | 'slide' | 'reveal' | 'rotate' | 'zoom';
    position: 'bottom-right' | 'bottom-left';
  };
  context?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface OrchestratorState {
  manifest: WidgetManifest;
  isOpen: boolean;
  messages: Message[];
  setManifest: (manifest: WidgetManifest) => void;
  updateTheme: (theme: Partial<DesignDNA>) => void;
  updateAnimation: (animation: Partial<WidgetManifest['animation']>) => void;
  updateContext: (context: string) => void;
  toggleOpen: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
}

export const defaultManifest: WidgetManifest = {
  widgetId: 'widget_default',
  name: 'Default Assistant',
  iconType: 'bot',
  shape: 'circle',
  theme: {
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    background: '#ffffff',
    text: '#1f2937',
    radius: '24px',
    shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glassmorphism: true,
    fontFamily: 'Inter, sans-serif',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    motionPersonality: 'fluid',
    visualStyle: 'glassmorphism',
  },
  animation: {
    type: 'ethereal_float',
    intensity: 1,
    trigger: 'idle',
  },
  behavior: {
    openTransition: 'morph',
    position: 'bottom-right',
  },
  context: 'You are a helpful AI assistant.',
};

export const useOrchestratorStore = create<OrchestratorState>((set) => ({
  manifest: defaultManifest,
  isOpen: false,
  messages: [],
  setManifest: (manifest) => set({ manifest }),
  updateTheme: (theme) => set((state) => ({
    manifest: {
      ...state.manifest,
      theme: { ...state.manifest.theme, ...theme }
    }
  })),
  updateAnimation: (animation) => set((state) => ({
    manifest: {
      ...state.manifest,
      animation: { ...state.manifest.animation, ...animation }
    }
  })),
  updateContext: (context) => set((state) => ({
    manifest: { ...state.manifest, context }
  })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() }]
  })),
  clearMessages: () => set({ messages: [] }),
}));

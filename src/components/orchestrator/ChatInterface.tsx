import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Paperclip, Smile, Sparkles, Bot, User } from 'lucide-react';
import { useOrchestratorStore } from '../../store/useOrchestratorStore';
import { getTransition } from './AnimationEngine';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const ChatInterface: React.FC = () => {
  const { manifest, toggleOpen, messages, addMessage } = useOrchestratorStore();
  const { theme } = manifest;
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const transition = getTransition(theme.motionPersonality);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMsg });
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `Context: ${manifest.context || 'You are a helpful assistant.'}` }] },
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process that.";
      addMessage({ role: 'assistant', content: reply });
    } catch (error) {
      console.error("Chat Error:", error);
      addMessage({ role: 'assistant', content: "Sorry, I encountered an error. Please try again." });
    } finally {
      setIsTyping(false);
    }
  };

  const getStyleProps = () => {
    switch (theme.visualStyle) {
      case 'brutalist':
        return {
          border: `4px solid ${theme.text}`,
          boxShadow: `8px 8px 0px ${theme.primary}`,
          borderRadius: '0px',
        };
      case 'neo-brutalism':
        return {
          border: `2px solid ${theme.text}`,
          boxShadow: `4px 4px 0px ${theme.text}`,
          borderRadius: theme.radius,
        };
      case 'dark-luxury':
        return {
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          color: '#fff',
        };
      case 'cyberpunk':
        return {
          background: '#000',
          border: `2px solid ${theme.accent}`,
          boxShadow: `0 0 20px ${theme.accent}`,
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
        };
      case 'glassmorphism':
      default:
        return {
          background: theme.background,
          border: theme.glassmorphism ? '1px solid rgba(255,255,255,0.2)' : 'none',
          backdropFilter: theme.glassmorphism ? 'blur(12px)' : 'none',
          boxShadow: theme.shadow,
          borderRadius: theme.radius,
        };
    }
  };

  const styleProps = getStyleProps();

  const getContainerVariants = () => {
    const { openTransition, position } = manifest.behavior;
    const origin = position === 'bottom-right' ? 'bottom right' : 'bottom left';

    const base = {
      visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        transition: {
          ...transition,
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    };

    switch (openTransition) {
      case 'slide':
        return {
          ...base,
          hidden: { opacity: 0, y: 100, scale: 0.95 },
          exit: { opacity: 0, y: 100, scale: 0.95 }
        };
      case 'rotate':
        return {
          ...base,
          hidden: { opacity: 0, scale: 0, rotate: -180, transformOrigin: origin },
          exit: { opacity: 0, scale: 0, rotate: 180, transformOrigin: origin }
        };
      case 'zoom':
        return {
          ...base,
          hidden: { opacity: 0, scale: 0, transformOrigin: origin },
          exit: { opacity: 0, scale: 0, transformOrigin: origin }
        };
      case 'reveal':
        return {
          ...base,
          hidden: { opacity: 0, height: 0, transformOrigin: 'bottom' },
          visible: { ...base.visible, height: '520px' },
          exit: { opacity: 0, height: 0 }
        };
      case 'fade':
        return {
          ...base,
          hidden: { opacity: 0 },
          exit: { opacity: 0 }
        };
      case 'morph':
      default:
        return {
          ...base,
          hidden: { 
            opacity: 0, 
            scale: 0.8, 
            y: 40,
            rotateX: 15,
            transformOrigin: origin
          },
          exit: { 
            opacity: 0, 
            scale: 0.8, 
            y: 40,
            rotateX: -15,
            transition: { duration: 0.3, ease: "easeInOut" }
          }
        };
    }
  };

  const containerVariants = getContainerVariants();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...transition }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    }
  };

  return (
    <motion.div
      layoutId="widget-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        width: '380px',
        height: '520px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: theme.fontFamily,
        position: 'relative',
        zIndex: 51,
        perspective: '1000px',
        ...styleProps,
      } as any}
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        style={{ 
          padding: '20px', 
          background: theme.gradient, 
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">{manifest.name}</h3>
            <p className="text-[10px] opacity-80 uppercase tracking-wider font-medium">Online</p>
          </div>
        </div>
        <button 
          onClick={toggleOpen}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Messages Area */}
      <motion.div 
        variants={itemVariants}
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto bg-slate-50/50 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-full text-slate-400 text-xs text-center px-8"
          >
            Start a conversation with {manifest.name}.
          </motion.div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              layout
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                style={{ 
                  borderRadius: theme.radius, 
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : theme.radius,
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : theme.radius,
                  background: msg.role === 'user' ? theme.primary : '#fff',
                  color: msg.role === 'user' ? '#fff' : theme.text,
                }}
                className={`max-w-[85%] p-3 shadow-sm text-sm whitespace-pre-wrap`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex justify-start"
          >
            <div 
              style={{ borderRadius: theme.radius, borderBottomLeftRadius: '4px' }}
              className="p-3 bg-white shadow-sm flex gap-1 items-center"
            >
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Input Area */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-white border-t border-slate-100"
      >
        <div className="relative flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Paperclip size={18} />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-offset-1 transition-all outline-none"
            style={{ '--tw-ring-color': theme.primary } as any}
          />
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Smile size={18} />
          </button>
          <button 
            onClick={handleSend}
            disabled={isTyping}
            style={{ background: theme.primary }}
            className="p-2 text-white rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Powered by Dynamic Orchestrator
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

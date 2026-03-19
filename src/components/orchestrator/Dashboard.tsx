import React, { useState } from 'react';
import { useOrchestratorStore, defaultManifest, AnimationType } from '../../store/useOrchestratorStore';
import { generateWidgetManifest } from '../../services/aiService';
import { Sparkles, Settings, Code, Palette, Zap, Layout, Terminal, Bot, Skull, Flame, Star, Heart, Scissors, MessageSquare, Ghost, CircleDashed } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { manifest, setManifest, updateTheme, updateAnimation, updateContext } = useOrchestratorStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'manual' | 'export'>('ai');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const newManifest = await generateWidgetManifest(prompt);
      setManifest(newManifest);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const iconOptions = [
    { id: 'bot', icon: <Bot size={16} /> },
    { id: 'sparkles', icon: <Sparkles size={16} /> },
    { id: 'zap', icon: <Zap size={16} /> },
    { id: 'ghost', icon: <Ghost size={16} /> },
    { id: 'skull', icon: <Skull size={16} /> },
    { id: 'flame', icon: <Flame size={16} /> },
    { id: 'star', icon: <Star size={16} /> },
    { id: 'heart', icon: <Heart size={16} /> },
    { id: 'scissors', icon: <Scissors size={16} /> },
    { id: 'message', icon: <MessageSquare size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-500">System v1.0</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">Widget Orchestrator</h1>
            <p className="text-zinc-500 mt-2 max-w-md">Design DNA driven AI widget generation system with premium morphing transitions.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'ai' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              AI Mode
            </button>
            <button 
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'manual' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Manual Mode
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'export' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Export
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls Area */}
          <div className="lg:col-span-7 space-y-8">
            {activeTab === 'ai' && (
              <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-indigo-400" size={24} />
                  <h2 className="text-xl font-semibold">AI Generation</h2>
                </div>
                <div className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your brand vibe... (e.g., 'Cyberpunk neon assistant with bouncy movements')"
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Generate Design DNA
                        <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="space-y-6">
                {/* Knowledge Base */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bot className="text-indigo-400" size={24} />
                    <h2 className="text-xl font-semibold">Knowledge Base</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-500 font-medium">Provide context for the AI to use when replying to users.</p>
                    <textarea
                      value={manifest.context}
                      onChange={(e) => updateContext(e.target.value)}
                      placeholder="e.g., 'This is a gaming cafe called Pixel Paradise. We have PS5, Xbox Series X, and high-end PCs. Games include Valorant, FIFA 24, and Elden Ring...'"
                      className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Theme Controls */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Palette className="text-indigo-400" size={24} />
                    <h2 className="text-xl font-semibold">Design DNA</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Primary Color</label>
                      <input 
                        type="color" 
                        value={manifest.theme.primary}
                        onChange={(e) => updateTheme({ primary: e.target.value })}
                        className="w-full h-12 bg-transparent border-none cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Visual Style</label>
                      <select 
                        value={manifest.theme.visualStyle}
                        onChange={(e) => updateTheme({ visualStyle: e.target.value as any })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="brutalist">Brutalist</option>
                        <option value="neo-brutalism">Neo-Brutalism</option>
                        <option value="glassmorphism">Glassmorphism</option>
                        <option value="soft-ui">Soft UI</option>
                        <option value="dark-luxury">Dark Luxury</option>
                        <option value="cyberpunk">Cyberpunk</option>
                        <option value="vintage">Vintage</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Widget Icon</label>
                      <div className="grid grid-cols-5 gap-2">
                        {iconOptions.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setManifest({ ...manifest, iconType: opt.id as any })}
                            className={`p-2 rounded-lg flex items-center justify-center transition-all ${manifest.iconType === opt.id ? 'bg-indigo-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                          >
                            {opt.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Widget Shape</label>
                      <select 
                        value={manifest.shape}
                        onChange={(e) => setManifest({ ...manifest, shape: e.target.value as any })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none"
                      >
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                        <option value="blob">Organic Blob</option>
                        <option value="pill">Pill</option>
                        <option value="diamond">Diamond</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Open Transition</label>
                      <select 
                        value={manifest.behavior.openTransition}
                        onChange={(e) => setManifest({ 
                          ...manifest, 
                          behavior: { ...manifest.behavior, openTransition: e.target.value as any } 
                        })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none"
                      >
                        <option value="morph">Morph</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide Up</option>
                        <option value="reveal">Vertical Reveal</option>
                        <option value="rotate">Rotate In</option>
                        <option value="zoom">Zoom In</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Motion Personality</label>
                      <select 
                        value={manifest.theme.motionPersonality}
                        onChange={(e) => updateTheme({ motionPersonality: e.target.value as any })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none"
                      >
                        <option value="snappy">Snappy</option>
                        <option value="fluid">Fluid</option>
                        <option value="bouncy">Bouncy</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Animation Controls */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-indigo-400" size={24} />
                    <h2 className="text-xl font-semibold">Animation Engine</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(['elastic_pulse', 'liquid_morph', 'orbital_spin', 'magnetic_hover', 'ethereal_float', 'glow_breathing', 'ink_bleed', 'neon_flicker'] as AnimationType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => updateAnimation({ type })}
                        className={`p-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border ${manifest.animation.type === type ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-transparent hover:border-white/20'}`}
                      >
                        {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="text-indigo-400" size={24} />
                  <h2 className="text-xl font-semibold">Export Manifest</h2>
                </div>
                <div className="relative">
                  <pre className="bg-black/60 rounded-2xl p-6 text-xs font-mono text-indigo-300 overflow-x-auto max-h-96">
                    {JSON.stringify(manifest, null, 2)}
                  </pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(manifest, null, 2))}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Terminal size={16} />
                    <span>Micro-frontend Embed Script</span>
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-zinc-500">
                    {`<script src="https://cdn.orchestrator.ai/widget.js" data-manifest-id="${manifest.widgetId}"></script>`}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-8">
              <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] aspect-[4/5] overflow-hidden relative group">
                {/* Mock Website Content */}
                <div className="p-12 space-y-6 opacity-20 pointer-events-none">
                  <div className="h-4 w-24 bg-white/20 rounded-full" />
                  <div className="h-12 w-full bg-white/10 rounded-2xl" />
                  <div className="h-12 w-2/3 bg-white/10 rounded-2xl" />
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <div className="h-32 bg-white/5 rounded-3xl" />
                    <div className="h-32 bg-white/5 rounded-3xl" />
                  </div>
                </div>

                {/* The Actual Widget Orchestrator */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-zinc-600 text-xs font-medium uppercase tracking-[0.3em] animate-pulse">Live Preview</p>
                </div>

                {/* Floating Widget Container */}
                <div className={`absolute ${manifest.behavior.position === 'bottom-right' ? 'bottom-8 right-8' : 'bottom-8 left-8'}`}>
                   {/* This is where the actual widget will be rendered in the App.tsx */}
                   <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4 text-right">Interactive Widget</div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-8 text-zinc-500">
                <div className="flex items-center gap-2">
                  <Layout size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Morphing Engine Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">DNA Sync: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

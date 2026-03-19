import { GoogleGenAI, Type } from "@google/genai";
import { WidgetManifest } from "../store/useOrchestratorStore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateWidgetManifest = async (prompt: string): Promise<WidgetManifest> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a premium widget manifest for a chat assistant based on this prompt: "${prompt}".
    
    The system is a "Dynamic Widget Orchestrator". You must pick a theme that perfectly matches the brand vibe.
    For example:
    - "Tattoo Shop": dark-luxury or brutalist style, skull or flame icon, deep reds/blacks, ink_bleed animation.
    - "Tech Startup": minimal or glassmorphism, bot or zap icon, indigo/violet, fluid motion.
    - "Eco Brand": soft-ui, sparkles or heart icon, emerald/sage, ethereal_float animation.

    Ensure the "context" field contains a brief knowledge base about the business described in the prompt.
    Return ONLY the JSON manifest.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          widgetId: { type: Type.STRING },
          name: { type: Type.STRING },
          iconType: { 
            type: Type.STRING,
            enum: [
              "bot", "sparkles", "zap", "ghost", "message", "skull", "flame", "star", "heart", "scissors",
              "shopping-bag", "utensils", "coffee", "stethoscope", "briefcase", "graduation-cap", "camera", 
              "music", "plane", "home", "dumbbell", "truck", "code", "palette", "hammer", "shopping-cart",
              "building", "landmark", "hotel", "car", "bike", "gift", "camera-retro", "clapperboard",
              "gamepad-2", "mic", "headphones", "book", "newspaper", "pen-tool", "brush", "layers",
              "database", "cpu", "server", "cloud", "shield", "lock", "key", "wallet", "credit-card",
              "dollar-sign", "trending-up", "pie-chart", "bar-chart-3", "activity", "heart-pulse",
              "thermometer", "pill", "syringe", "baby", "dog", "cat", "fish", "leaf",
              "sprout", "flower-2", "sun", "moon", "cloud-rain", "wind", "droplets", "umbrella"
            ]
          },
          shape: {
            type: Type.STRING,
            enum: ["blob_standard", "blob_tall", "blob_wide", "blob_asymmetric", "blob_fluid"]
          },
          theme: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              accent: { type: Type.STRING },
              background: { type: Type.STRING },
              text: { type: Type.STRING },
              radius: { type: Type.STRING },
              shadow: { type: Type.STRING },
              glassmorphism: { type: Type.BOOLEAN },
              fontFamily: { type: Type.STRING },
              gradient: { type: Type.STRING },
              motionPersonality: { 
                type: Type.STRING,
                enum: ["snappy", "fluid", "bouncy"]
              },
              visualStyle: {
                type: Type.STRING,
                enum: ["minimal", "brutalist", "neo-brutalism", "glassmorphism", "soft-ui", "dark-luxury", "cyberpunk", "vintage"]
              }
            },
            required: ["primary", "secondary", "accent", "background", "text", "radius", "shadow", "glassmorphism", "fontFamily", "gradient", "motionPersonality", "visualStyle"]
          },
          animation: {
            type: Type.OBJECT,
            properties: {
              type: { 
                type: Type.STRING,
                enum: ["elastic_pulse", "liquid_morph", "orbital_spin", "magnetic_hover", "ethereal_float", "glow_breathing", "ink_bleed", "super_morph"]
              },
              intensity: { type: Type.NUMBER },
              trigger: { 
                type: Type.STRING,
                enum: ["hover", "idle", "click"]
              },
            },
            required: ["type", "intensity", "trigger"]
          },
          behavior: {
            type: Type.OBJECT,
            properties: {
              openTransition: { 
                type: Type.STRING,
                enum: ["morph", "fade", "slide", "reveal", "rotate", "zoom"]
              },
              position: { 
                type: Type.STRING,
                enum: ["bottom-right", "bottom-left"]
              },
            },
            required: ["openTransition", "position"]
          },
          context: { type: Type.STRING }
        },
        required: ["widgetId", "name", "iconType", "shape", "theme", "animation", "behavior", "context"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as WidgetManifest;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid AI response");
  }
};

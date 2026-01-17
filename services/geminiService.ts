import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize the client strictly with the API key from environment
const ai = new GoogleGenAI({ apiKey: apiKey });

export const createTutorChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a helpful English tutor roleplaying with a student. 
      The scenario is: The student is dissatisfied with their current mobile phone provider and is asking you for advice.
      
      Your goals:
      1. Answer their questions about changing providers.
      2. Use the following vocabulary naturally in your responses where appropriate: "a good deal", "exceptional", "beat", "superior to", "a cut above", "top-notch".
      3. Encourage the student to compare price vs. quality.
      4. Correct their grammar gently if they make major mistakes, but prioritize flow.
      5. Keep responses concise (under 50 words) to keep the conversation moving.`,
    },
  });
};

export const sendMessageToTutor = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I didn't catch that.";
  } catch (error) {
    console.error("Gemini Interaction Error:", error);
    return "Sorry, I am having trouble connecting right now. Please try again.";
  }
};

export const generateConversationAudio = async (text: string): Promise<string | undefined> => {
  try {
    // Determine if the text implies multiple speakers for configuration
    // For this specific app, we will use a multi-speaker config by default for the listening exercise
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: { parts: [{ text }] },
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
            multiSpeakerVoiceConfig: {
                speakerVoiceConfigs: [
                    {
                        speaker: 'Manager',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                    },
                    {
                        speaker: 'Analyst',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
                    }
                ]
            }
        }
      }
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return undefined;
  }
};
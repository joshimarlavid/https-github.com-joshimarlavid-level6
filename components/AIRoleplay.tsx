import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, RefreshCcw, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types';
import { createTutorChat, sendMessageToTutor } from '../services/geminiService';
import { Chat } from "@google/genai";

const AIRoleplay: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startNewSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewSession = () => {
    const chat = createTutorChat();
    setChatSession(chat);
    setMessages([
        { 
            role: 'model', 
            text: "Hi there! I hear you're thinking about changing your mobile phone provider. What are you looking for in a new plan? A good deal on price, or better service?" 
        }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await sendMessageToTutor(chatSession, userMessage);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const insertHint = () => {
      const hints = ["superior to", "a good deal", "competitive", "drawback", "top-notch"];
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setInput(prev => prev ? `${prev} ${randomHint}` : randomHint);
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col pb-6">
      <header className="mb-4 flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-800">
        <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"/> AI Roleplay Partner
            </h2>
            <p className="text-xs text-slate-400 mt-1">
            Scenario: Comparing Providers
            </p>
        </div>
        <button 
            onClick={startNewSession}
            className="text-xs font-bold flex items-center gap-2 text-indigo-300 bg-indigo-900/30 border border-indigo-500/30 px-3 py-2 rounded-lg hover:bg-indigo-900/50 transition-colors"
        >
            <RefreshCcw size={14} /> Restart
        </button>
      </header>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/50 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 animate-fade-in-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-emerald-400 border border-slate-700'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-md text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
              }`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
                <Bot size={20} />
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-slate-700 flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-indigo-400" />
                 <span className="text-xs font-medium text-slate-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
            {/* Quick Actions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                <button onClick={insertHint} className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-900/30 border border-amber-500/30 px-3 py-1.5 rounded-full hover:bg-amber-900/50 transition-colors whitespace-nowrap">
                    <Lightbulb size={12} /> Suggest Word
                </button>
                <div className="h-full w-px bg-slate-700 mx-1"></div>
                <span className="text-xs text-slate-500 py-1.5">Try using:</span>
                {["superior to", "cost-effective", "service"].map(word => (
                     <button key={word} onClick={() => setInput(prev => `${prev} ${word}`)} className="text-xs text-indigo-300 bg-indigo-900/30 hover:bg-indigo-800/50 border border-indigo-500/20 px-2 py-1 rounded-md transition-colors whitespace-nowrap">
                        {word}
                     </button>
                ))}
            </div>

          <div className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your response..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner text-white placeholder-slate-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl px-6 transition-all shadow-lg shadow-indigo-900/30 hover:scale-105 active:scale-95 flex items-center justify-center border border-indigo-500"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRoleplay;
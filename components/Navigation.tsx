import React from 'react';
import { LessonSection } from '../types';
import { BookOpen, Zap, Headphones, MessageCircle, Presentation, Mic, Swords, X } from 'lucide-react';

interface NavigationProps {
  currentSection: LessonSection;
  setSection: (section: LessonSection) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, setSection, isOpen, onClose }) => {
  const navItems = [
    { id: LessonSection.INTRO, label: 'Goal Setting', icon: <BookOpen size={20} /> },
    { id: LessonSection.WARMUP, label: 'Warm Up', icon: <Zap size={20} /> },
    { id: LessonSection.PRACTICE, label: 'Listening', icon: <Headphones size={20} /> },
    { id: LessonSection.LANGUAGE, label: 'Language Focus', icon: <MessageCircle size={20} /> },
    { id: LessonSection.PERFORMANCE, label: 'Performance', icon: <Presentation size={20} /> },
    { id: LessonSection.BRAND_BATTLE, label: 'Brand Battle', icon: <Swords size={20} /> },
    { id: LessonSection.ROLEPLAY, label: 'AI Roleplay', icon: <Mic size={20} /> },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <nav className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-out
        md:relative md:translate-x-0 flex flex-col h-full shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-slate-800 bg-slate-900">
          <div className="flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
                <span className="text-3xl">🚀</span> Market<span className="font-light text-slate-400">Master</span>
                </h1>
                <p className="text-[10px] font-bold text-indigo-400 mt-2 uppercase tracking-[0.2em]">Business English v2.0</p>
             </div>
             <button 
                onClick={onClose}
                className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all"
            >
                <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`group w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-200 border border-transparent ${
                  isActive
                    ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`${isActive ? 'text-indigo-400 drop-shadow-md' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {item.icon}
                  </span>
                  <span className="font-bold tracking-wide text-sm">{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
              </button>
            );
          })}
        </div>
        
        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500"></div>
                <p className="text-xs font-bold text-indigo-200 uppercase mb-2 flex items-center gap-2">
                    <Zap size={12} className="fill-current" /> Pro Tip
                </p>
                <p className="text-sm font-medium leading-relaxed">Use "Superior to" instead of "Better than" for more impact.</p>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
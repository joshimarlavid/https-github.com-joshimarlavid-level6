import React, { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import WarmUp from './components/WarmUp';
import ListeningExercise from './components/ListeningExercise';
import LanguageFocus from './components/LanguageFocus';
import PerformanceTask from './components/PerformanceTask';
import BrandBattle from './components/BrandBattle';
import AIRoleplay from './components/AIRoleplay';
import { LessonSection } from './types';
import { Target, Users, Trophy, Menu, ArrowRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [section, setSection] = useState<LessonSection>(LessonSection.INTRO);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleSectionChange = (newSection: LessonSection) => {
    setSection(newSection);
    setIsMobileMenuOpen(false);
    if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        if (scrollRef.current) {
            setScrollY(scrollRef.current.scrollTop);
        }
    };
    
    const el = scrollRef.current;
    if (el) {
        el.addEventListener('scroll', handleScroll);
    }
    return () => {
        if (el) {
            el.removeEventListener('scroll', handleScroll);
        }
    }
  }, []);

  const renderContent = () => {
    switch (section) {
      case LessonSection.INTRO:
        return <IntroSection startLesson={() => handleSectionChange(LessonSection.WARMUP)} />;
      case LessonSection.WARMUP:
        return <WarmUp />;
      case LessonSection.PRACTICE:
        return <ListeningExercise />;
      case LessonSection.LANGUAGE:
        return <LanguageFocus />;
      case LessonSection.PERFORMANCE:
        return <PerformanceTask />;
      case LessonSection.BRAND_BATTLE:
        return <BrandBattle />;
      case LessonSection.ROLEPLAY:
        return <AIRoleplay />;
      default:
        return <IntroSection startLesson={() => handleSectionChange(LessonSection.WARMUP)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-gray-100 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Abstract Background Effects with Parallax */}
      <div 
        className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div 
        className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse delay-1000 will-change-transform"
        style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
      ></div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex h-full w-full">
          <Navigation 
            currentSection={section} 
            setSection={handleSectionChange} 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-950/50 backdrop-blur-sm">
            {/* Mobile Header */}
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center gap-4 md:hidden flex-shrink-0 z-10 sticky top-0 shadow-lg">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-indigo-400 hover:bg-slate-800 rounded-lg active:bg-slate-700 transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                MarketMaster
              </h1>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
              <div className="max-w-7xl mx-auto h-full animate-fade-in-up">
                {renderContent()}
              </div>
            </main>
          </div>
      </div>
    </div>
  );
};

const IntroSection: React.FC<{ startLesson: () => void }> = ({ startLesson }) => (
  <div className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-12 py-10 relative">
    
    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-md text-indigo-400 font-bold text-sm mb-8 shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-fade-in-up hover:scale-105 transition-transform cursor-default">
            <Sparkles size={16} className="fill-current animate-pulse" /> 
            <span>Professional Business English v2.0</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Dominate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 animate-gradient-x">
                Market Position
            </span>
        </h1>
        
        {/* Subhead */}
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Elevate your communication skills. Learn to analyze competitors, articulate strengths, and define your unique value proposition with precision.
        </p>

        {/* Action Button */}
        <button 
            onClick={startLesson}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] focus:outline-none ring-offset-2 ring-offset-slate-900 focus:ring-2 ring-indigo-500 mb-16"
        >
            <span className="text-lg">Start Learning Journey</span>
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
        </button>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left px-4">
            {[
                { icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', title: 'Competitor Analysis', desc: 'Identify and analyze market rivals.' },
                { icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', title: 'Core Strengths', desc: 'Articulate where you are superior.' },
                { icon: Target, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', title: 'Strategic Growth', desc: 'Pinpoint areas for improvement.' }
            ].map((item, idx) => (
                <div key={idx} className={`group p-8 bg-slate-900/60 backdrop-blur-md rounded-3xl border ${item.border} shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden cursor-default`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>
                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 border ${item.border} group-hover:rotate-6 transition-transform`}>
                        <item.icon className={`${item.color}`} size={28} />
                    </div>
                    <h3 className="font-bold text-xl text-slate-100 mb-3 relative z-10">{item.title}</h3>
                    <p className="text-slate-400 font-medium relative z-10 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
  </div>
);

export default App;
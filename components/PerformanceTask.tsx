import React, { useState, useEffect } from 'react';
import { Monitor, Save, Clock, Play, Pause, RotateCcw } from 'lucide-react';

const PerformanceTask: React.FC = () => {
  const [slide1, setSlide1] = useState('');
  const [slide2, setSlide2] = useState('');
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <header className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-black text-white mb-2">The Pitch</h2>
            <p className="text-slate-400 max-w-2xl">
            Synthesize your research into two impactful slides. Focus on "Us vs. Them".
            </p>
        </div>
        <div className="hidden md:block">
            <PresentationTimer />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Slide Editor Area */}
        <div className="flex-1 w-full space-y-6">
            <div className="flex gap-4 mb-4">
                <button 
                    onClick={() => setActiveSlide(1)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border ${activeSlide === 1 ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'}`}
                >
                    Slide 1: Strengths
                </button>
                <button 
                    onClick={() => setActiveSlide(2)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border ${activeSlide === 2 ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'}`}
                >
                    Slide 2: Improvements
                </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-8 shadow-2xl aspect-[16/9] flex flex-col relative overflow-hidden group transition-all duration-500 border border-slate-800 hover:shadow-indigo-500/10">
                {/* Background Image for Slides */}
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    alt="Office Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm group-hover:blur-0 transition-all duration-700 will-change-transform"
                />
                <div className="absolute inset-0 bg-slate-950/80"></div>
                
                {/* Decorative background effects */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] opacity-20"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="border-b border-slate-800 pb-4 mb-6">
                    <input 
                        type="text" 
                        placeholder={activeSlide === 1 ? "e.g., Our Competitive Advantage" : "e.g., Areas for Growth"}
                        className="bg-transparent text-white font-bold text-3xl w-full focus:outline-none placeholder-slate-600 drop-shadow-md"
                    />
                    </div>
                    <textarea
                    className="w-full h-full bg-transparent text-slate-200 resize-none focus:outline-none leading-relaxed text-xl drop-shadow-sm placeholder-slate-600"
                    placeholder={activeSlide === 1 ? "• As far as quality is concerned...\n• In terms of service, we are..." : "• When it comes to price...\n• We need to improve our..."}
                    value={activeSlide === 1 ? slide1 : slide2}
                    onChange={(e) => activeSlide === 1 ? setSlide1(e.target.value) : setSlide2(e.target.value)}
                    />
                </div>
                
                <div className="absolute bottom-4 right-6 text-slate-600 font-mono text-xs tracking-widest uppercase">
                    CONFIDENTIAL // {new Date().getFullYear()}
                </div>
            </div>
        </div>

        {/* Tools Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
            <div className="md:hidden">
                 <PresentationTimer />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
                <h4 className="font-bold text-indigo-300 mb-4 flex items-center gap-2 relative z-10">
                    <Monitor size={18}/> Success Checklist
                </h4>
                <ul className="space-y-3 relative z-10">
                    <CheckItem text="Use 'In terms of'" />
                    <CheckItem text="Use 'When it comes to'" />
                    <CheckItem text="Use 'Superior to'" />
                    <CheckItem text="Keep bullets concise" />
                </ul>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-indigo-500 group">
                <Save size={18} className="group-hover:animate-bounce" /> Finalize Presentation
            </button>
        </div>
      </div>
    </div>
  );
};

const CheckItem: React.FC<{text: string}> = ({text}) => {
    const [checked, setChecked] = useState(false);
    return (
        <li 
            onClick={() => setChecked(!checked)}
            className={`flex items-center gap-3 cursor-pointer select-none transition-all ${checked ? 'text-indigo-400 line-through opacity-70' : 'text-slate-400'} hover:translate-x-1`}
        >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-600 bg-slate-800'}`}>
                {checked && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-sm font-medium">{text}</span>
        </li>
    )
}

const PresentationTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col items-center min-w-[200px] transition-all duration-300 hover:border-slate-700">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Clock size={12} /> Practice Timer
            </div>
            <div className="text-3xl font-mono font-bold text-slate-200 mb-3 tabular-nums">
                {formatTime(time)}
            </div>
            <div className="flex gap-2 w-full">
                <button 
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 flex justify-center py-2 rounded-lg text-white font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                >
                    {isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button 
                    onClick={() => { setIsRunning(false); setTime(0); }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    )
}

export default PerformanceTask;
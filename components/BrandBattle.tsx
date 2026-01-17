import React, { useState } from 'react';
import { Swords, Shield, Zap, TrendingUp, MessageSquare, Award, ChevronRight, ChevronLeft } from 'lucide-react';

interface BattleScenario {
    id: number;
    title: string;
    brandA: { name: string; color: string; strengths: string[] };
    brandB: { name: string; color: string; strengths: string[] };
    context: string;
}

const SCENARIOS: BattleScenario[] = [
    {
        id: 1,
        title: "The Smartphone Wars",
        brandA: { 
            name: "iPhone (Apple)", 
            color: "from-slate-700 to-slate-900", 
            strengths: ["Ecosystem integration", "Resale value", "User privacy", "Ease of use"] 
        },
        brandB: { 
            name: "Galaxy (Samsung)", 
            color: "from-blue-600 to-blue-800", 
            strengths: ["Screen technology", "Customization", "Camera zoom", "Hardware specs"] 
        },
        context: "You are debating which phone to buy for the company work phones."
    },
    {
        id: 2,
        title: "Coffee Culture",
        brandA: { 
            name: "Starbucks", 
            color: "from-emerald-700 to-emerald-900", 
            strengths: ["Convenience & speed", "Consistent taste", "Rewards program", "Work-friendly spaces"] 
        },
        brandB: { 
            name: "Local Hipster Cafe", 
            color: "from-amber-700 to-amber-900", 
            strengths: ["Bean quality", "Authentic atmosphere", "Supporting local", "Latte art skills"] 
        },
        context: "Deciding where to hold the informal team morning meeting."
    },
    {
        id: 3,
        title: "EV Showdown",
        brandA: { 
            name: "Tesla", 
            color: "from-red-600 to-red-800", 
            strengths: ["Supercharger network", "Autopilot tech", "Brand status", "Software updates"] 
        },
        brandB: { 
            name: "Toyota Hybrid", 
            color: "from-sky-600 to-sky-800", 
            strengths: ["Build reliability", "Manufacturing quality", "Service availability", "Physical buttons"] 
        },
        context: "Choosing a new fleet of vehicles for the sales team."
    }
];

const BrandBattle: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState(0);

    const scenario = SCENARIOS[activeScenario];

    const nextScenario = () => setActiveScenario((prev) => (prev + 1) % SCENARIOS.length);
    const prevScenario = () => setActiveScenario((prev) => (prev - 1 + SCENARIOS.length) % SCENARIOS.length);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <Swords className="text-rose-500" size={32} /> Brand Battle Arena
                    </h2>
                    <p className="text-slate-400 max-w-2xl">
                        Choose a side. Use the target phrases to argue why your brand is superior.
                    </p>
                </div>
                
                {/* Scenario Navigation */}
                <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <button onClick={prevScenario} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronLeft />
                    </button>
                    <div className="text-center min-w-[200px]">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Scenario {scenario.id}/{SCENARIOS.length}</span>
                        <h3 className="font-bold text-white">{scenario.title}</h3>
                    </div>
                    <button onClick={nextScenario} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronRight />
                    </button>
                </div>
            </header>

            {/* Language Arsenal */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                <h3 className="text-indigo-300 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
                    <Zap size={16} /> Your Language Arsenal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Structuring</span>
                        <div className="flex flex-wrap gap-2">
                            <PhraseBadge text="When it comes to..." />
                            <PhraseBadge text="In terms of..." />
                            <PhraseBadge text="As far as... is concerned" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Saying "Better"</span>
                        <div className="flex flex-wrap gap-2">
                            <PhraseBadge text="Superior to" color="bg-emerald-900/30 text-emerald-300 border-emerald-500/30" />
                            <PhraseBadge text="A cut above" color="bg-emerald-900/30 text-emerald-300 border-emerald-500/30" />
                            <PhraseBadge text="Beats the competition" color="bg-emerald-900/30 text-emerald-300 border-emerald-500/30" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Saying "Best"</span>
                        <div className="flex flex-wrap gap-2">
                            <PhraseBadge text="Top-notch" color="bg-amber-900/30 text-amber-300 border-amber-500/30" />
                            <PhraseBadge text="Second-to-none" color="bg-amber-900/30 text-amber-300 border-amber-500/30" />
                            <PhraseBadge text="Unrivaled" color="bg-amber-900/30 text-amber-300 border-amber-500/30" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Battle Ground */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center w-20 h-20 bg-slate-950 rounded-full border-4 border-slate-800 shadow-xl">
                    <span className="text-2xl font-black text-rose-500 italic">VS</span>
                </div>

                {/* Brand A */}
                <BrandCard 
                    brand={scenario.brandA} 
                    side="left" 
                />

                {/* Brand B */}
                <BrandCard 
                    brand={scenario.brandB} 
                    side="right" 
                />
            </div>

            {/* Prompt */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center">
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-bold">Context</p>
                <p className="text-white text-xl font-medium">"{scenario.context}"</p>
            </div>
        </div>
    );
};

const PhraseBadge: React.FC<{ text: string, color?: string }> = ({ text, color = "bg-indigo-900/30 text-indigo-300 border-indigo-500/30" }) => (
    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${color} whitespace-nowrap shadow-sm hover:scale-105 transition-transform cursor-default`}>
        {text}
    </span>
);

const BrandCard: React.FC<{ brand: { name: string, color: string, strengths: string[] }, side: 'left' | 'right' }> = ({ brand, side }) => {
    return (
        <div className={`
            relative overflow-hidden rounded-3xl p-8 min-h-[400px] flex flex-col group
            transition-all duration-500 hover:shadow-2xl
            bg-gradient-to-br ${brand.color}
        `}>
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className={`flex items-start mb-8 ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
                        <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{brand.name}</h3>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                        Key Strengths
                    </p>
                    {brand.strengths.map((strength, idx) => (
                        <div 
                            key={idx} 
                            className={`
                                flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10
                                transform transition-all duration-300 hover:scale-105 hover:bg-black/50
                                ${side === 'right' ? 'flex-row-reverse text-right' : ''}
                            `}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                {idx === 0 && <Award size={20} className="text-yellow-400" />}
                                {idx === 1 && <TrendingUp size={20} className="text-cyan-400" />}
                                {idx === 2 && <Shield size={20} className="text-emerald-400" />}
                                {idx === 3 && <MessageSquare size={20} className="text-purple-400" />}
                            </div>
                            <span className="text-white font-bold text-lg text-shadow">{strength}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BrandBattle;
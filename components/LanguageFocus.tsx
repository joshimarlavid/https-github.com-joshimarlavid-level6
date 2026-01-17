import React, { useState } from 'react';
import { CheckCircle2, PenTool, Sparkles, Copy, Delete, ArrowLeft, Check, Eraser } from 'lucide-react';

const LanguageFocus: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-10">
      <header>
        <h2 className="text-3xl font-black text-white mb-2">Language Focus</h2>
        <p className="text-slate-400 text-lg">Master the phrases used to compare and contrast business aspects.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theory Section */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden h-fit">
            <div className="bg-indigo-900/50 p-6 text-white relative overflow-hidden border-b border-indigo-500/20">
                <h3 className="text-xl font-bold mb-2 relative z-10 text-indigo-100">Focus Patterns</h3>
                <p className="opacity-70 relative z-10 text-indigo-200">Structure your comparison efficiently.</p>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10 text-indigo-400">
                    <PenTool size={150} />
                </div>
            </div>
            
            <div className="p-8 space-y-8">
            <PatternItem 
                title="When it comes to..." 
                example='"When it comes to quality, we are superior."'
                type="noun / gerund"
            />
            <PatternItem 
                title="In terms of..." 
                example='"In terms of price, we are somewhat more expensive."'
                type="noun"
            />
            <PatternItem 
                title="As far as... is concerned" 
                example='"As far as size is concerned, we are the market leader."'
                type="noun"
            />
            </div>
        </div>

        {/* Practice Section */}
        <div className="space-y-6">
            <div className="bg-violet-900/10 border border-violet-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-violet-300 mb-4 flex items-center gap-2">
                    <Sparkles className="text-violet-500" /> Interactive Practice
                </h3>
                <p className="text-violet-200/70 mb-6">Re-write these sentences using the focus patterns.</p>
                
                <div className="grid gap-4">
                    <PracticeCard 
                        original="Their service is better than ours." 
                        hint="When it comes to..."
                        answer="When it comes to service, they are superior to us."
                    />
                    <PracticeCard 
                        original="We are cheaper than them." 
                        hint="In terms of..."
                        answer="In terms of price, we are a good deal cheaper."
                    />
                    <PracticeCard 
                        original="Our market share is the biggest." 
                        hint="As far as..."
                        answer="As far as market share is concerned, we are the biggest."
                    />
                </div>
            </div>

            {/* Visual Aid */}
            <div className="grid grid-cols-3 gap-3">
                 {[
                    "https://images.unsplash.com/photo-1436491865332-7a61a109a33e?auto=format&fit=crop&q=80&w=300", 
                    "https://images.unsplash.com/photo-1494905998402-395d579af97f?auto=format&fit=crop&q=80&w=300",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300"
                 ].map((src, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-xl h-24 shadow-sm border border-slate-800">
                        <img src={src} alt="Business Context" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors" />
                    </div>
                 ))}
            </div>
        </div>
      </div>
      
      <SentenceBuilderTool />
    </div>
  );
};

const PatternItem: React.FC<{title: string, example: string, type: string}> = ({title, example, type}) => (
    <div className="relative pl-6 border-l-4 border-indigo-500 group">
        <div className="flex justify-between items-baseline">
            <h4 className="text-lg font-bold text-slate-200 mb-1 group-hover:text-indigo-400 transition-colors">{title}</h4>
            <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">[{type}]</span>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg text-slate-300 italic border border-slate-700 mt-2">
            {example}
        </div>
    </div>
);

const PracticeCard: React.FC<{ original: string; hint: string; answer: string }> = ({ original, hint, answer }) => {
    const [showAnswer, setShowAnswer] = React.useState(false);

    return (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-600 transition-all">
            <p className="font-semibold text-slate-200 mb-2">Original: <span className="font-normal text-slate-400">{original}</span></p>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded uppercase tracking-wider">Target</span>
                <span className="text-sm text-slate-500 font-medium">{hint}</span>
            </div>
            
            {showAnswer ? (
                <div className="bg-emerald-900/20 border border-emerald-500/20 p-3 rounded-lg text-emerald-300 flex items-start gap-2 animate-fade-in">
                    <CheckCircle2 size={18} className="mt-1 shrink-0" />
                    <p className="font-medium">{answer}</p>
                </div>
            ) : (
                <button 
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-sm font-bold text-slate-500 hover:text-indigo-400 hover:bg-slate-800 hover:border-indigo-500/30 transition-all"
                >
                    Reveal Answer
                </button>
            )}
        </div>
    )
}

const SentenceBuilderTool = () => {
    const [sentence, setSentence] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    // Grouped words for better structure
    const wordGroups = {
        starters: ["When it comes to", "In terms of", "As far as"],
        subjects: ["price", "quality", "customer service", "innovation", "our company", "the competition", "market share"],
        verbs: ["is", "are", "offers", "has"],
        modifiers: ["a good deal", "somewhat", "significantly", "slightly"],
        comparatives: ["superior to", "better than", "cheaper than", "more expensive", "top-notch"],
        closers: ["concerned", "."]
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sentence.join(" "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUndo = () => {
        setSentence(prev => prev.slice(0, -1));
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-200">
                            <PenTool className="text-indigo-400" /> Sentence Construction Lab
                        </h3>
                        <p className="text-indigo-200/70 text-sm max-w-lg">
                            Assemble professional business comparisons by selecting phrases from the categories below.
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                         <button 
                            onClick={handleUndo}
                            disabled={sentence.length === 0}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-indigo-200"
                            title="Undo last word"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button 
                            onClick={() => setSentence([])}
                            disabled={sentence.length === 0}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-indigo-200 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Clear all"
                        >
                            <Eraser size={18} />
                        </button>
                    </div>
                </div>

                {/* Sentence Display Area */}
                <div className="min-h-[100px] bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-indigo-500/30 shadow-inner relative group">
                    <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                        {sentence.length === 0 && (
                            <span className="text-white/20 italic select-none font-light text-lg">
                                Select words below to start building...
                            </span>
                        )}
                        {sentence.map((word, idx) => (
                            <span 
                                key={idx} 
                                className="animate-pop-in bg-gradient-to-b from-indigo-600 to-indigo-700 text-white px-3 py-1.5 rounded-lg font-medium shadow-lg border border-indigo-400/30 hover:scale-105 transition-transform cursor-default"
                            >
                                {word}
                            </span>
                        ))}
                        {sentence.length > 0 && (
                            <span className="w-0.5 h-6 bg-cyan-400 animate-pulse ml-1"></span>
                        )}
                    </div>
                    
                    {sentence.length > 0 && (
                        <button 
                            onClick={handleCopy}
                            className="absolute bottom-3 right-3 flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-indigo-200 px-3 py-1.5 rounded-full transition-all"
                        >
                            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy Text"}
                        </button>
                    )}
                </div>

                {/* Word Banks */}
                <div className="space-y-6">
                    <WordGroup label="Structure" words={wordGroups.starters} color="from-cyan-500/20 to-blue-600/20 border-cyan-500/30 text-cyan-100" onAdd={w => setSentence([...sentence, w])} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <WordGroup label="Subjects" words={wordGroups.subjects} color="from-violet-500/20 to-purple-600/20 border-violet-500/30 text-violet-100" onAdd={w => setSentence([...sentence, w])} />
                        <WordGroup label="Verbs" words={wordGroups.verbs} color="from-fuchsia-500/20 to-pink-600/20 border-fuchsia-500/30 text-fuchsia-100" onAdd={w => setSentence([...sentence, w])} />
                    </div>
                    <WordGroup label="Modifiers & Comparatives" words={[...wordGroups.modifiers, ...wordGroups.comparatives]} color="from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-100" onAdd={w => setSentence([...sentence, w])} />
                    <WordGroup label="Endings" words={wordGroups.closers} color="from-slate-700 to-slate-800 border-slate-600 text-slate-300" onAdd={w => setSentence([...sentence, w])} />
                </div>
            </div>
        </div>
    )
}

const WordGroup: React.FC<{label: string, words: string[], color: string, onAdd: (w: string) => void}> = ({label, words, color, onAdd}) => (
    <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">{label}</h4>
        <div className="flex flex-wrap gap-2">
            {words.map((word, idx) => (
                <button 
                    key={idx}
                    onClick={() => onAdd(word)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-1 active:translate-y-0 shadow-sm border bg-gradient-to-br ${color} hover:brightness-125`}
                >
                    {word}
                </button>
            ))}
        </div>
    </div>
);

export default LanguageFocus;
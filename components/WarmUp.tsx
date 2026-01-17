import React, { useState } from 'react';
import { Star, MessageCircle, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { VocabularyItem } from '../types';

const vocabList: VocabularyItem[] = [
  { term: "a good deal (lower)", definition: "Significantly lower; a lot lower.", example: "Their prices are a good deal lower than ours." },
  { term: "exceptional", definition: "Unusually good; outstanding.", example: "We provide exceptional customer service." },
  { term: "to beat", definition: "To do better than a competitor.", example: "Competitors can't beat us in quality." },
  { term: "superior to", definition: "Better than.", example: "Our new model is superior to the old one." },
  { term: "top-notch", definition: "Excellent; of the highest quality.", example: "They have a top-notch staff." },
  { term: "second-to-none", definition: "The best; better than all others.", example: "Our reliability is second-to-none." },
];

const WarmUp: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [quizMode, setQuizMode] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">Warm Up</h2>
            <p className="text-slate-400 text-lg">Read the dialog and learn the key vocabulary.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg text-indigo-400 font-medium text-sm">
            <MessageCircle size={18} />
            <span>Focus: Comparisons</span>
        </div>
      </header>

      {/* Dialog Section */}
      <section className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden group hover:border-slate-700 transition-colors duration-300">
        <div className="bg-slate-800/50 p-4 flex justify-between items-center text-white border-b border-slate-700">
          <h3 className="font-bold text-lg flex items-center gap-2 text-indigo-300">
            <MessageCircle className="text-indigo-500" /> Dialog Practice
          </h3>
          <span className="text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wide">Read Aloud</span>
        </div>
        <div className="p-8 space-y-8 bg-gradient-to-b from-slate-900 to-slate-950">
          <DialogBubble 
             speaker="Manager A" 
             text="Who are your competitors?" 
             align="left"
             img="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          />
          <DialogBubble 
             speaker="Manager B" 
             text={<>Well, we've got quite a few, but our biggest competitor is <span className="font-bold text-indigo-400">Cooperative Auto Service</span>.</>} 
             align="right"
             img="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" 
             variant="blue"
          />
          <DialogBubble 
             speaker="Manager A" 
             text="And how do you compare?" 
             align="left"
             img="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          />
          <DialogBubble 
             speaker="Manager B" 
             text={
                <>
                Their prices are <Highlight>a good deal lower</Highlight> than ours, 
                but when it comes to providing <Highlight>exceptional service</Highlight> and 
                guaranteed satisfaction on repairs, they <Highlight>can't beat us</Highlight>.
                </>
             } 
             align="right"
             img="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" 
             variant="blue"
          />
        </div>
      </section>

      {/* Vocabulary Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Star className="text-amber-400 fill-amber-400" /> Key Vocabulary
            </h3>
            <button 
                onClick={() => setQuizMode(!quizMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border ${
                    quizMode 
                    ? 'bg-amber-900/20 border-amber-500/50 text-amber-400 hover:bg-amber-900/30' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
            >
                {quizMode ? <><HelpCircle size={18}/> Quiz Mode Active</> : <><Eye size={18} /> Study Mode</>}
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabList.map((item, index) => (
            <div 
              key={index}
              onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              className="group relative h-56 perspective cursor-pointer"
            >
              <div className={`absolute inset-0 w-full h-full transition-all duration-500 preserve-3d shadow-lg hover:shadow-2xl rounded-2xl ${flippedCard === index ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className={`absolute inset-0 w-full h-full bg-slate-900 border-2 ${quizMode ? 'border-amber-500/50 bg-amber-950/10' : 'border-slate-800 group-hover:border-indigo-500/50'} rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden transition-colors`}>
                    {quizMode ? (
                         <>
                            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Definition</p>
                            <p className="text-center font-medium text-slate-200 text-lg leading-snug">{item.definition}</p>
                            <span className="mt-4 text-xs text-amber-500 font-bold flex items-center gap-1"><HelpCircle size={12}/> Tap to see Word</span>
                         </>
                    ) : (
                        <>
                            <h4 className="text-2xl font-extrabold text-white text-center">{item.term}</h4>
                            <p className="text-xs text-indigo-500 mt-4 font-bold uppercase tracking-wider">Tap to reveal</p>
                        </>
                    )}
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-700 to-violet-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center rotate-y-180 backface-hidden shadow-inner border border-white/10">
                   {quizMode ? (
                        <>
                             <p className="text-indigo-200 text-xs font-bold uppercase mb-2">The word is</p>
                             <h4 className="text-2xl font-extrabold text-white text-center mb-2">{item.term}</h4>
                             <p className="text-sm text-indigo-100 italic text-center opacity-80">"{item.example}"</p>
                        </>
                   ) : (
                       <>
                            <p className="font-medium text-center mb-4 text-lg leading-relaxed">{item.definition}</p>
                            <div className="bg-black/20 rounded-lg p-3 w-full border border-white/5">
                                <p className="text-sm text-indigo-100 italic text-center">"{item.example}"</p>
                            </div>
                       </>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Highlight: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <span className="font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-1 py-0.5 rounded box-decoration-clone hover:bg-indigo-500/30 transition-colors cursor-help" title="Key Vocabulary">
        {children}
    </span>
);

const DialogBubble: React.FC<{ speaker: string, text: React.ReactNode, align: 'left' | 'right', img: string, variant?: 'gray' | 'blue' }> = ({ speaker, text, align, img, variant = 'gray' }) => {
    const isRight = align === 'right';
    return (
        <div className={`flex gap-4 items-start ${isRight ? 'flex-row-reverse' : ''} group`}>
            <img 
                src={img} 
                alt={speaker} 
                className={`w-12 h-12 rounded-full object-cover border-2 shadow-md group-hover:scale-110 transition-transform duration-300 ${isRight ? 'border-indigo-500' : 'border-slate-600'}`} 
            />
            <div className={`
                p-5 max-w-lg shadow-md relative transition-all duration-300 hover:shadow-lg border
                ${isRight 
                    ? 'bg-indigo-900/30 border-indigo-500/30 rounded-2xl rounded-tr-none text-right' 
                    : 'bg-slate-800 border-slate-700 rounded-2xl rounded-tl-none'}
            `}>
                <p className={`text-xs font-bold mb-1 uppercase tracking-wide ${isRight ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {speaker}
                </p>
                <p className="text-slate-200 leading-relaxed text-lg">
                    {text}
                </p>
            </div>
        </div>
    )
}

export default WarmUp;
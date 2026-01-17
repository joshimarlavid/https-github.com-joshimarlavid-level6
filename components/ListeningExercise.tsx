import React, { useState } from 'react';
import { Play, Pause, Headphones, FileText, CheckCircle2, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import { generateConversationAudio } from '../services/geminiService';

const SCRIPT = `Manager: I've been analyzing the competitor's new product launch, the X-500 series.
Analyst: It's certainly cheaper than our model.
Manager: Exactly. It's priced twenty percent lower. However, early reviews mention it overheats significantly.
Analyst: That's a major flaw. We should emphasize our advanced cooling technology in the next campaign.
Manager: I agree. Let's focus on reliability rather than trying to match their price.`;

const QUIZ_DATA = [
    {
        question: "What is the competitor's product called?",
        options: ["The Z-100", "The X-500 series", "The Alpha model", "The Budget Buster"],
        correct: 1
    },
    {
        question: "What is the main problem with the competitor's product?",
        options: ["It is too expensive", "It is too slow", "It overheats", "It breaks easily"],
        correct: 2
    },
    {
        question: "What strategy does the Manager decide on?",
        options: ["Lowering their prices", "Focusing on reliability", "Ignoring the competitor", "Releasing a new model"],
        correct: 1
    },
    {
        question: "What is the Manager's decision regarding pricing?",
        options: ["To cut prices by 20%", "To match the competitor's price", "Not to match the competitor's price", "To increase prices"],
        correct: 2
    }
];

const ListeningExercise: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(QUIZ_DATA.length).fill(-1));

    // Helpers for audio decoding
    function decode(base64: string) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    async function decodeAudioData(
        data: Uint8Array,
        ctx: AudioContext,
    ): Promise<AudioBuffer> {
        const sampleRate = 24000; 
        const numChannels = 1;
        
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length / numChannels;
        const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

        for (let channel = 0; channel < numChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = 0; i < frameCount; i++) {
                channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
            }
        }
        return buffer;
    }

    const loadAudio = async () => {
        setIsLoading(true);
        try {
            const base64Audio = await generateConversationAudio(SCRIPT);
            if (!base64Audio) throw new Error("No audio returned");

            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            setAudioContext(ctx);

            const buffer = await decodeAudioData(decode(base64Audio), ctx);
            setAudioBuffer(buffer);
            setIsLoading(false);
            // Auto play after load
            playAudio(ctx, buffer);
        } catch (error) {
            console.error("Failed to load audio", error);
            setIsLoading(false);
            alert("Could not generate audio. Please check your connection.");
        }
    };

    const playAudio = (ctx: AudioContext, buffer: AudioBuffer) => {
        if (sourceNode) {
            sourceNode.stop();
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        source.start(0);
        setSourceNode(source);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (!audioBuffer) {
            loadAudio();
            return;
        }

        if (isPlaying && sourceNode) {
            sourceNode.stop();
            setIsPlaying(false);
        } else if (audioContext && audioBuffer) {
            playAudio(audioContext, audioBuffer);
        }
    };

    const handleAnswerSelect = (qIndex: number, optionIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[qIndex] = optionIndex;
        setSelectedAnswers(newAnswers);
    };

    const score = selectedAnswers.reduce((acc, curr, idx) => curr === QUIZ_DATA[idx].correct ? acc + 1 : acc, 0);
    const allAnswered = !selectedAnswers.includes(-1);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-black text-white mb-2">Market Intelligence Briefing</h2>
                    <p className="text-slate-400">
                        Listen to the conversation between a Manager and an Analyst. Answer the questions below.
                    </p>
                </div>
                <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg px-4 py-2 flex gap-2 items-center text-indigo-300 text-sm font-bold animate-pulse shadow-glow">
                    <Headphones size={18} />
                    <span>Audio Exercise</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Player & Transcript (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Audio Player Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group min-h-[350px] flex flex-col items-center justify-center border border-slate-700/50 hover:shadow-indigo-500/10 transition-all duration-500">
                        {/* Background Image */}
                        <img 
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" 
                            alt="Tech Background" 
                            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-950"></div>
                        
                        <div className="relative z-10 flex flex-col items-center space-y-8 w-full p-6">
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-500 backdrop-blur-sm ${isPlaying ? 'border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.5)] scale-110 bg-indigo-950/30' : 'border-slate-500/30 bg-slate-900/50'}`}>
                                {isLoading ? (
                                    <Loader2 size={40} className="text-indigo-400 animate-spin" />
                                ) : (
                                    <button 
                                        onClick={handlePlayPause}
                                        className="w-full h-full rounded-full flex items-center justify-center text-white hover:text-indigo-400 transition-colors focus:outline-none hover:scale-110 active:scale-95"
                                    >
                                        {isPlaying ? <Pause size={40} className="fill-current" /> : <Play size={40} className="fill-current ml-2" />}
                                    </button>
                                )}
                            </div>
                            
                            <div className="text-center space-y-1">
                                <h3 className="text-white font-bold text-xl tracking-wide">Competitor Analysis</h3>
                                <p className="text-indigo-200/60 text-sm font-medium uppercase tracking-widest">Confidential Recording</p>
                            </div>

                            {isPlaying && (
                                <div className="flex gap-1.5 items-end h-8">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="w-1 bg-indigo-400 rounded-full animate-music-bar shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transcript Toggle */}
                    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all duration-300 hover:border-slate-700">
                        <button 
                            onClick={() => setShowTranscript(!showTranscript)}
                            className="w-full p-4 flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider"><FileText size={16}/> Transcript</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">{showTranscript ? 'Hide' : 'Show'}</span>
                        </button>
                        
                        {showTranscript && (
                            <div className="p-4 bg-slate-950/50 border-t border-slate-800 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {SCRIPT.split('\n').map((line, i) => {
                                    const [speaker, text] = line.split(':');
                                    const isManager = speaker.trim() === 'Manager';
                                    return (
                                        <div key={i} className={`flex gap-3 ${isManager ? '' : 'flex-row-reverse'} animate-fade-in`}>
                                            <img 
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker}&backgroundColor=b6e3f4`}
                                                alt={speaker}
                                                className={`w-10 h-10 rounded-full bg-slate-800 border-2 ${isManager ? 'border-indigo-500' : 'border-emerald-500'}`}
                                            />
                                            <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] ${isManager ? 'bg-indigo-900/20 text-indigo-100 rounded-tl-none border border-indigo-500/20' : 'bg-slate-800 text-slate-300 rounded-tr-none border border-slate-700'}`}>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isManager ? 'text-indigo-400' : 'text-emerald-400'}`}>{speaker}</span>
                                                {text}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Quiz (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-full hover:border-slate-700 transition-colors duration-300">
                         {/* Hero Image for Quiz */}
                        <div className="h-48 relative overflow-hidden group">
                             <img 
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                                alt="Data Analysis" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="inline-flex items-center gap-2 text-indigo-300 font-bold mb-2 bg-indigo-950/50 backdrop-blur-md px-3 py-1 rounded-full border border-indigo-500/30">
                                     <HelpCircle size={14} /> 
                                     <span className="text-xs uppercase tracking-wider">Comprehension Check</span>
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tight">Test Your Knowledge</h3>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-center">
                            <div className="space-y-8">
                                {QUIZ_DATA.map((q, qIdx) => (
                                    <div key={qIdx} className="space-y-3">
                                        <p className="font-medium text-slate-100 text-lg leading-snug">
                                            <span className="text-slate-600 mr-2 font-bold text-sm">0{qIdx + 1}</span>
                                            {q.question}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {q.options.map((option, oIdx) => {
                                                const isSelected = selectedAnswers[qIdx] === oIdx;
                                                const isCorrect = q.correct === oIdx;
                                                const showResult = allAnswered; 

                                                let btnClass = "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600";
                                                if (isSelected) btnClass = "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50";
                                                if (showResult && isCorrect) btnClass = "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/50";
                                                if (showResult && isSelected && !isCorrect) btnClass = "bg-red-900/30 border-red-500/50 text-red-200";

                                                return (
                                                    <button
                                                        key={oIdx}
                                                        onClick={() => !showResult && handleAnswerSelect(qIdx, oIdx)}
                                                        disabled={showResult}
                                                        className={`
                                                            px-4 py-3 rounded-xl border text-left text-sm font-medium 
                                                            transition-all duration-300 flex justify-between items-center group/btn 
                                                            ${btnClass}
                                                            hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg
                                                        `}
                                                    >
                                                        {option}
                                                        {showResult && isCorrect && <CheckCircle2 size={16} className="text-emerald-200" />}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {allAnswered && (
                                <div className={`mt-10 p-6 rounded-2xl flex items-center justify-center gap-4 animate-fade-in border ${score === QUIZ_DATA.length ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                                    <div className={`p-3 rounded-full ${score === QUIZ_DATA.length ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/50' : 'bg-slate-700 text-slate-400'}`}>
                                        {score === QUIZ_DATA.length ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                                    </div>
                                    <div>
                                        <h4 className={`text-lg font-black ${score === QUIZ_DATA.length ? 'text-emerald-400' : 'text-slate-200'}`}>
                                            {score === QUIZ_DATA.length ? 'Perfect Score!' : 'Quiz Complete'}
                                        </h4>
                                        <p className="text-slate-400 font-medium">You got <span className="text-white font-bold">{score}</span> out of {QUIZ_DATA.length} correct.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes music-bar {
                    0% { height: 20%; }
                    50% { height: 100%; }
                    100% { height: 20%; }
                }
                .animate-music-bar {
                    animation: music-bar 1s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ListeningExercise;
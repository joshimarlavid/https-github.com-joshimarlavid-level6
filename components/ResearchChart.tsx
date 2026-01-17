import React, { useState } from 'react';
import { Lightbulb, Info, Save, RotateCcw } from 'lucide-react';
import { ComparisonRow } from '../types';

const ResearchChart: React.FC = () => {
  const [rows, setRows] = useState<ComparisonRow[]>([
    { category: 'Prices', myCompany: '', competitor: '', notes: 'Check online catalog', score: 50 },
    { category: 'Quality', myCompany: '', competitor: '', notes: 'Read reviews', score: 50 },
    { category: 'Marketing', myCompany: '', competitor: '', notes: 'Social media analysis', score: 50 },
    { category: 'Customer Service', myCompany: '', competitor: '', notes: 'Call support line', score: 50 },
    { category: 'Sales', myCompany: '', competitor: '', notes: 'Annual reports', score: 50 },
  ]);

  const handleUpdate = (index: number, field: keyof ComparisonRow, value: string | number) => {
    const newRows = [...rows];
    // @ts-ignore
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const getScoreLabel = (score: number) => {
    if (score < 30) return { text: "Weakness", color: "text-red-400" };
    if (score < 45) return { text: "Slight Disadvantage", color: "text-orange-400" };
    if (score > 70) return { text: "Strength", color: "text-emerald-400" };
    if (score > 55) return { text: "Slight Advantage", color: "text-lime-400" };
    return { text: "Parity / Equal", color: "text-slate-500" };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h2 className="text-3xl font-black text-white mb-2">Research Dashboard</h2>
            <p className="text-slate-400">
            Compare your company against the competition. Use the sliders to indicate strength.
            </p>
        </div>
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 flex gap-3 items-center text-sm max-w-md">
            <Lightbulb className="text-amber-500 shrink-0" size={20} />
            <p className="text-amber-200 font-medium">
                <strong className="text-amber-500">Tip:</strong> Be honest! Identifying weaknesses is just as important as finding strengths.
            </p>
        </div>
      </header>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-5 font-bold w-1/6">Category</th>
                <th className="p-5 font-bold w-1/5">My Company</th>
                <th className="p-5 font-bold w-1/5">Competitor</th>
                <th className="p-5 font-bold w-1/4 text-center">Strength Meter</th>
                <th className="p-5 font-bold w-1/6">Notes</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group">
                    <td className="p-5 font-bold text-slate-300">{row.category}</td>
                    <td className="p-5">
                    <input 
                        type="text" 
                        placeholder="Our status..."
                        className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 focus:outline-none py-1 transition-colors text-white placeholder-slate-600"
                        value={row.myCompany}
                        onChange={(e) => handleUpdate(index, 'myCompany', e.target.value)}
                    />
                    </td>
                    <td className="p-5">
                    <input 
                        type="text" 
                        placeholder="Their status..."
                        className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 focus:outline-none py-1 transition-colors text-white placeholder-slate-600"
                        value={row.competitor}
                        onChange={(e) => handleUpdate(index, 'competitor', e.target.value)}
                    />
                    </td>
                    <td className="p-5">
                        <div className="flex flex-col items-center gap-1">
                             <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={row.score}
                                onChange={(e) => handleUpdate(index, 'score', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between w-full text-[10px] text-slate-500 font-bold uppercase">
                                <span>Them</span>
                                <span>Us</span>
                            </div>
                            <span className={`text-xs font-bold ${getScoreLabel(row.score).color}`}>
                                {getScoreLabel(row.score).text}
                            </span>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="relative">
                            <input 
                                type="text" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder-slate-600"
                                value={row.notes}
                                onChange={(e) => handleUpdate(index, 'notes', e.target.value)}
                            />
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Mobile View Card Layout */}
        <div className="md:hidden space-y-4 p-4 bg-slate-950">
             {rows.map((row, index) => (
                <div key={index} className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800">
                    <h3 className="font-bold text-lg text-indigo-300 mb-4">{row.category}</h3>
                    <div className="space-y-4">
                        <input 
                            placeholder="My Company..."
                            className="w-full bg-transparent border-b border-slate-700 py-2 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-600"
                            value={row.myCompany}
                            onChange={(e) => handleUpdate(index, 'myCompany', e.target.value)}
                        />
                         <input 
                            placeholder="Competitor..."
                            className="w-full bg-transparent border-b border-slate-700 py-2 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-600"
                            value={row.competitor}
                            onChange={(e) => handleUpdate(index, 'competitor', e.target.value)}
                        />
                         <div className="pt-2">
                             <label className="text-xs font-bold text-slate-500 uppercase">Advantage Meter</label>
                             <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={row.score}
                                onChange={(e) => handleUpdate(index, 'score', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                            />
                             <div className="text-center mt-1 text-sm font-bold text-indigo-400">
                                {getScoreLabel(row.score).text}
                             </div>
                        </div>
                    </div>
                </div>
             ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
        <button 
             onClick={() => setRows(rows.map(r => ({...r, myCompany: '', competitor: '', score: 50})))}
             className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors text-sm font-medium"
        >
            <RotateCcw size={16} /> Reset
        </button>
        <button 
          onClick={() => alert("Analysis saved! Use these points in your presentation.")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/20 hover:scale-105 flex items-center gap-2"
        >
          <Save size={18} /> Save Analysis
        </button>
      </div>
    </div>
  );
};

export default ResearchChart;
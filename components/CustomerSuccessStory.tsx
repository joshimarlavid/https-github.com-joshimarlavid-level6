import React, { useState } from 'react';
import { Quote, Briefcase, TrendingUp, CheckCircle, FileText, Download } from 'lucide-react';

const CustomerSuccessStory: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    product: '',
    challenge: '',
    solution: '',
    results: '',
    testimonial: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
       {/* Header */}
       <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
            <h2 className="text-3xl font-black text-white mb-2">Customer Success Story</h2>
            <p className="text-slate-400">Create a narrative detailing a customer's journey from problem to solution.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-indigo-300 font-bold bg-indigo-900/30 border border-indigo-500/30 px-4 py-2 rounded-lg hover:bg-indigo-900/50 transition-colors">
            <Download size={18} /> Export PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Side */}
        <div className="space-y-6 bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-800 h-fit">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
                <FileText size={20} />
                <h3 className="font-bold text-lg uppercase tracking-wider">Story Builder</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <InputField 
                    label="Client Name" 
                    placeholder="e.g. Acme Corp" 
                    value={formData.clientName} 
                    onChange={(val) => handleChange('clientName', val)} 
                />
                <InputField 
                    label="Industry" 
                    placeholder="e.g. Logistics" 
                    value={formData.industry} 
                    onChange={(val) => handleChange('industry', val)} 
                />
            </div>

            <InputField 
                label="Product/Service Used" 
                placeholder="e.g. Enterprise Cloud Solution" 
                value={formData.product} 
                onChange={(val) => handleChange('product', val)} 
            />

            <TextAreaField 
                label="The Challenge" 
                placeholder="What specific problem was the customer facing? Be descriptive."
                value={formData.challenge}
                onChange={(val) => handleChange('challenge', val)}
                height="h-24"
            />

            <TextAreaField 
                label="The Solution" 
                placeholder="How did your company solve it? What features were key?"
                value={formData.solution}
                onChange={(val) => handleChange('solution', val)}
                height="h-24"
            />

            <TextAreaField 
                label="Key Results & Metrics" 
                placeholder="List quantitative metrics (e.g. 50% cost reduction, 2x speed increase)."
                value={formData.results}
                onChange={(val) => handleChange('results', val)}
                height="h-24"
            />
            
            <TextAreaField 
                label="Customer Testimonial" 
                placeholder='"This solution changed everything for us..."'
                value={formData.testimonial}
                onChange={(val) => handleChange('testimonial', val)}
                height="h-20"
                italic
            />
        </div>

        {/* Preview Side */}
        <div className="relative">
            <div className="sticky top-6">
                <h3 className="font-bold text-sm text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-widest">
                    Live Preview
                </h3>
                
                <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 transition-all duration-300 transform hover:scale-[1.01]">
                    {/* Card Header */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10 rotate-12 transform translate-x-4 -translate-y-4">
                            <Quote size={150} />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-indigo-500"></div>
                        
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <h4 className="text-4xl font-extrabold mb-2 tracking-tight text-white">{formData.clientName || 'Client Name'}</h4>
                                <p className="text-indigo-200 text-sm flex items-center gap-2 font-medium bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <Briefcase size={14} /> {formData.industry || 'Industry'}
                                </p>
                            </div>
                            <div className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                                Success Story
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                         <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                            <div className="bg-slate-900 p-3 rounded-full text-emerald-400 shadow-sm border border-slate-800">
                                <CheckCircle size={24} /> 
                            </div>
                            <div>
                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Powered By</h5>
                                <p className="text-indigo-300 font-bold text-lg">{formData.product || 'Product Name'}</p>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            <div className="relative pl-6 border-l-4 border-slate-700">
                                <h5 className="font-bold text-slate-300 mb-2 uppercase text-xs tracking-wider">The Challenge</h5>
                                <p className="text-slate-400 text-sm leading-relaxed">{formData.challenge || 'Description of the customer\'s initial problem...'}</p>
                            </div>
                             <div className="relative pl-6 border-l-4 border-indigo-500">
                                <h5 className="font-bold text-indigo-300 mb-2 uppercase text-xs tracking-wider">The Solution</h5>
                                <p className="text-slate-400 text-sm leading-relaxed">{formData.solution || 'Description of the solution provided...'}</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700">
                             <h5 className="font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider">
                                <TrendingUp size={16} /> Impact & Results
                            </h5>
                            <p className="text-slate-200 font-bold text-lg whitespace-pre-line leading-relaxed">{formData.results || 'The positive outcomes achieved...'}</p>
                        </div>

                        {formData.testimonial && (
                            <div className="relative mt-8 pt-6 border-t border-slate-800 text-center">
                                <p className="italic text-slate-400 text-xl font-light leading-relaxed px-4 font-serif">
                                    "{formData.testimonial}"
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <div className="w-10 h-1 bg-indigo-500/50 rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-950 p-4 border-t border-slate-800 text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                        Confidential Case Study • {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{ label: string, value: string, onChange: (val: string) => void, placeholder: string }> = ({ label, value, onChange, placeholder }) => (
    <div className="group">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 transition-colors group-focus-within:text-indigo-400">{label}</label>
        <input 
            type="text" 
            className="w-full border-b-2 border-slate-700 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none bg-transparent transition-colors placeholder-slate-700"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const TextAreaField: React.FC<{ label: string, value: string, onChange: (val: string) => void, placeholder: string, height: string, italic?: boolean }> = ({ label, value, onChange, placeholder, height, italic }) => (
    <div className="group">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 transition-colors group-focus-within:text-indigo-400">{label}</label>
        <textarea 
            className={`w-full border-2 border-slate-700 rounded-lg p-3 ${height} focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/20 focus:outline-none resize-none bg-slate-800/50 transition-all placeholder-slate-600 ${italic ? 'italic font-serif text-lg text-slate-300' : 'text-slate-300'}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default CustomerSuccessStory;
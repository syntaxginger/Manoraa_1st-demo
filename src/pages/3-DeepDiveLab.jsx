import React, { useState } from 'react';
import { Box, Target, Ruler, Maximize2, RefreshCw, Layers, ChevronRight } from 'lucide-react';

const DeepDiveLab = () => {
  const [distance, setDistance] = useState("2.45");
  const [logKi, setLogKi] = useState("7.42");

  // Simulate dynamic analysis
  const triggerAnalysis = () => {
    const d = (Math.random() * (3.5 - 1.5) + 1.5).toFixed(2);
    const k = (Math.random() * (8.5 - 6.5) + 6.5).toFixed(2);
    setDistance(d);
    setLogKi(k);
  };

  return (
    <div className="h-full flex flex-col relative bg-[#F1F5F9] overflow-hidden">
      
      {/* 1. Floating Tool Palette (Minimalist Sidebar) */}
      <div className="absolute top-8 left-8 z-20">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-2 rounded-2xl flex flex-col gap-2 shadow-xl shadow-slate-200/50">
          <button className="p-3.5 hover:bg-slate-900 hover:text-white rounded-xl text-slate-500 transition-all shadow-sm" title="Atom Selector">
            <Target size={20} />
          </button>
          <button onClick={triggerAnalysis} className="p-3.5 hover:bg-slate-900 hover:text-white rounded-xl text-slate-500 transition-all shadow-sm" title="Distance Tool">
            <Ruler size={20} />
          </button>
          <button className="p-3.5 hover:bg-slate-900 hover:text-white rounded-xl text-slate-500 transition-all shadow-sm" title="Toggle Surface">
            <Layers size={20} />
          </button>
          <div className="h-[1px] bg-slate-100 mx-2 my-1"></div>
          <button className="p-3.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* 2. Real-time Analysis Monitor (Floating Insight) */}
      <div className="absolute top-8 right-8 z-20 w-72">
        <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-2xl shadow-slate-300/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Affinity Monitor</span>
            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          
          <div className="space-y-1">
            <p className="text-4xl font-black text-slate-900 tracking-tighter italic">{logKi}</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">LogKi Prediction</p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Interatomic Dist.</div>
            <div className="text-sm font-mono font-black text-slate-900">{distance} Å</div>
          </div>
        </div>
      </div>

      {/* 3. Main 3D Environment (Clean Canvas) */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Decorative Grid Line (เลียนแบบโปรแกรมวิจัย) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        {/* Mock Molecular Model */}
        <div className="relative z-10 flex flex-col items-center group">
          <Box size={320} className="text-slate-200 animate-spin-slow transition-colors group-hover:text-slate-300" strokeWidth={0.5} />
          
          {/* Interaction Visualizer Overlay */}
          <div className="absolute flex items-center gap-6">
            <div className="w-5 h-5 bg-slate-900 rounded-full border-4 border-white shadow-lg"></div>
            <div className="w-40 h-[1.5px] border-t border-dashed border-slate-300 relative flex justify-center">
               <span className="absolute -top-5 text-[10px] font-black text-slate-400 font-mono bg-[#F1F5F9] px-2 italic">{distance} Å</span>
            </div>
            <div className="w-5 h-5 bg-slate-400 rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-10 flex items-center gap-8 bg-white/60 backdrop-blur-md px-8 py-3 rounded-2xl border border-slate-200 shadow-sm">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PDB: 1STU</div>
           <div className="w-[1px] h-3 bg-slate-200"></div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Renderer: Stable v2</div>
           <button onClick={triggerAnalysis} className="flex items-center gap-2 text-[10px] font-black text-slate-900 hover:opacity-60 transition-opacity uppercase tracking-[0.2em]">
             <RefreshCw size={12} /> Recalculate
           </button>
        </div>
      </div>

    </div>
  );
};

export default DeepDiveLab;
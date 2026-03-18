import React, { useState } from 'react';
import { Box, Target, Ruler, Maximize2, RefreshCw, Layers, ChevronRight, X, Activity } from 'lucide-react';

// --- MOCK DATA: พิกัดจริงจากหน้า 10 (Summary Report) ---
const MOCK_COORDINATES = {
  atom_1: { name: 'N1 (Ligand)', x: 12.452, y: -5.231, z: 24.110 },
  atom_2: { name: 'ASP508 (Protein)', x: 13.102, y: -4.892, z: 23.954 }
};

// ฟังก์ชันคำนวณระยะทางจริง (Euclidean Distance)
const calculateDistance = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) + 
    Math.pow(p2.y - p1.y, 2) + 
    Math.pow(p2.z - p1.z, 2)
  ).toFixed(2);
};

const DeepDiveLab = () => {
  const [distance, setDistance] = useState("0.00");
  const [logKi, setLogKi] = useState("---");
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [isAtomSelectorOpen, setIsAtomSelectorOpen] = useState(false);

  // สั่งวิเคราะห์ (Simulate Real Calculation)
  const triggerAnalysis = () => {
    setIsMeasuring(true);
    const d = calculateDistance(MOCK_COORDINATES.atom_1, MOCK_COORDINATES.atom_2);
    setDistance(d);
    setLogKi("7.42"); // ค่าคงที่ตามโมเดลทำนาย (หน้า 10)
  };

  const resetAnalysis = () => {
    setIsMeasuring(false);
    setDistance("0.00");
    setLogKi("---");
  };

  return (
    <div className="h-full flex flex-col relative bg-[#F1F5F9] overflow-hidden">
      
      {/* 1. Floating Tool Palette & Atom Selection Panel */}
      <div className="absolute top-8 left-8 z-30 flex gap-4 items-start">
        {/* Main Toolbar */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-2 rounded-2xl flex flex-col gap-2 shadow-xl shadow-slate-200/50">
          <button 
            onClick={() => setIsAtomSelectorOpen(!isAtomSelectorOpen)}
            className={`p-3.5 rounded-xl transition-all shadow-sm ${isAtomSelectorOpen ? 'bg-slate-900 text-white' : 'hover:bg-slate-900 hover:text-white text-slate-500'}`} 
            title="Atom Selector"
          >
            <Target size={20} />
          </button>
          <button 
            onClick={triggerAnalysis} 
            className={`p-3.5 rounded-xl transition-all shadow-sm ${isMeasuring ? 'bg-indigo-600 text-white' : 'hover:bg-slate-900 hover:text-white text-slate-500'}`}
            title="Distance Tool"
          >
            <Ruler size={20} />
          </button>
          <button className="p-3.5 hover:bg-slate-900 hover:text-white rounded-xl text-slate-500 transition-all shadow-sm" title="Toggle Surface">
            <Layers size={20} />
          </button>
          <div className="h-[1px] bg-slate-100 mx-2 my-1"></div>
          <button onClick={resetAnalysis} className="p-3.5 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-500 transition-all" title="Clear All">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* --- Atom Selection Panel (Legacy Logic) --- */}
        {isAtomSelectorOpen && (
          <div className="w-72 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[32px] shadow-2xl p-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Atom Selection</h3>
                <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase italic">PDB: 1STU Substructures</p>
              </div>
              <button onClick={() => setIsAtomSelectorOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-[10px] font-black text-slate-500 uppercase italic">Heteroatoms (Ligand)</p>
              <div className="grid grid-cols-3 gap-2">
                {['N1', 'N2', 'N3', 'N4', 'O4', 'O5', 'O6'].map((atom) => (
                  <label key={atom} className="flex items-center gap-2 px-2.5 py-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-900 hover:text-white transition-all group">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-0" />
                    <span className="text-[11px] font-black font-mono uppercase">{atom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-5">
              <p className="text-[10px] font-black text-slate-500 uppercase italic">Atom Types</p>
              <div className="grid grid-cols-2 gap-2">
                {['C', 'CA', 'CT', 'N', 'O', 'All'].map((type) => (
                  <label key={type} className="flex items-center justify-between px-3 py-2 border border-slate-100 rounded-xl cursor-pointer hover:border-slate-900 transition-all group">
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900">{type}</span>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded-full border-slate-300 text-slate-900 focus:ring-0" />
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 transition-all shadow-lg">Apply Filter</button>
          </div>
        )}
      </div>

      {/* 2. Real-time Analysis Monitor */}
      <div className="absolute top-8 right-8 z-20 w-72">
        <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-2xl shadow-slate-300/20 relative overflow-hidden">
          {isMeasuring && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse"></div>}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Affinity Monitor</span>
            <div className={`flex h-2 w-2 rounded-full ${isMeasuring ? 'bg-green-500 animate-pulse' : 'bg-slate-200'}`}></div>
          </div>
          
          <div className="space-y-1">
            <p className={`text-4xl font-black tracking-tighter italic transition-all ${isMeasuring ? 'text-slate-900' : 'text-slate-200'}`}>{logKi}</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">LogKi Prediction</p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Distance (Å)</div>
            <div className={`text-sm font-mono font-black ${isMeasuring ? 'text-slate-900' : 'text-slate-200'}`}>{distance}</div>
          </div>
        </div>
      </div>

      {/* 3. Main 3D Environment (Clean Canvas) */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        {/* Mock Molecular Model */}
        <div className="relative z-10 flex flex-col items-center">
          <Box size={320} className={`transition-all duration-700 ${isMeasuring ? 'text-indigo-200 rotate-12 scale-110' : 'text-slate-200 rotate-0 scale-100'}`} strokeWidth={0.5} />
          
          {/* --- เส้นประวัดระยะ (Visualized Logic) --- */}
          {isMeasuring && (
            <div className="absolute flex items-center gap-6 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="w-5 h-5 bg-slate-900 rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-900 whitespace-nowrap italic uppercase">N1 (Ligand)</span>
              </div>

              <div className="w-48 h-[2px] border-t-2 border-dashed border-indigo-400 relative flex justify-center items-center">
                  <div className="absolute -top-8 bg-indigo-600 text-white text-[10px] font-black font-mono px-3 py-1 rounded-full shadow-xl shadow-indigo-100 italic">
                    {distance} Å
                  </div>
              </div>

              <div className="relative">
                <div className="w-5 h-5 bg-indigo-500 rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-900 whitespace-nowrap italic uppercase">ASP508 (Prot)</span>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-10 flex items-center gap-8 bg-white/60 backdrop-blur-md px-8 py-3 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             <Activity size={12} className="text-green-500" /> PDB: 1STU (Active)
           </div>
           <div className="w-[1px] h-3 bg-slate-200"></div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">RMSD: 0.042 Å</div>
           <button onClick={triggerAnalysis} className="flex items-center gap-2 text-[10px] font-black text-slate-900 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]">
             <RefreshCw size={12} className={isMeasuring ? 'animate-spin' : ''} /> Recalculate
           </button>
        </div>
      </div>

    </div>
  );
};

export default DeepDiveLab;
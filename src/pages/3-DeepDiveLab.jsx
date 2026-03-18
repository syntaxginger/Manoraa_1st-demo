import React, { useState } from 'react';
import { 
  Zap, CheckSquare, Square, Info, 
  Database, Activity, ChevronDown, FileText,
  Layers, Ruler, Maximize2, Download
} from 'lucide-react';

const DeepDiveWorkbench = () => {
  // --- 1. HARDCODED DATA ---
  const pdbData = {
    "1NVR": { uniprot: "O14757", target: "CHK1_HUMAN", affinity: "0.0078", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[CYS]87:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'HB2', type: 'HBOND', label: '[GLU]134:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[CYS]87:A', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]},
    "10KY": { uniprot: "O15530", target: "PDPK1_HUMAN", affinity: "0.0065", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ALA]162:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]162:A', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]},
    "1XJD": { uniprot: "Q04759", target: "KPCT_HUMAN", affinity: "0.00033", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ASP]508:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]407:A', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]}
    // ... เพิ่ม PDB อื่นๆ ได้ที่นี่
  };

  // --- 2. STATES ---
  const [selectedPdb, setSelectedPdb] = useState('1NVR');
  const [mainMode, setMainMode] = useState('interaction'); // 'interaction' or 'drug-design'
  const [activeInteractions, setActiveInteractions] = useState([]); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // ควบคุมตารางเหลือง

  const currentData = pdbData[selectedPdb] || pdbData["1NVR"];
  const pdbList = Object.keys(pdbData);

  const toggleInteraction = (id) => {
    setActiveInteractions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden">
      
      {/* --- TOP NAV: MODE & PDB SELECTOR --- */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-2 rounded-lg text-white shadow-lg"><Database size={18} /></div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {pdbList.map(pdb => (
                <button key={pdb} onClick={() => { setSelectedPdb(pdb); setActiveInteractions([]); }}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${selectedPdb === pdb ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                  {pdb}
                </button>
              ))}
            </div>
          </div>

          <div className="flex bg-slate-900 p-1 rounded-2xl shadow-inner">
            <button onClick={() => setMainMode('interaction')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'interaction' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Zap size={14} /> Interaction
            </button>
            <button onClick={() => setMainMode('drug-design')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'drug-design' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Activity size={14} /> Drug Design
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* --- LEFT SIDEBAR (เฉพาะ Drug Design) --- */}
        {mainMode === 'drug-design' && (
          <div className="absolute top-10 left-10 z-40 flex flex-col gap-4">
            {['Conservation', 'Distances', 'Contraction', 'Expansion'].map(layer => (
              <button key={layer} className="w-14 h-14 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all group relative">
                <Layers size={20} />
                <span className="absolute left-16 bg-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap tracking-widest">{layer}</span>
              </button>
            ))}
          </div>
        )}

        {/* --- CENTER: THE THEATER (VDO Area) --- */}
        <main className="flex-1 relative bg-black flex items-center justify-center p-8">
          
          {/* HUD Equation (เฉพาะ Drug Design) */}
          {mainMode === 'drug-design' && (
            <div className="absolute top-10 z-30 px-10 py-6 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-[32px] text-center max-w-2xl shadow-2xl">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 italic">Influential Distance Equation</p>
              <code className="text-sm text-white/90 font-mono tracking-tighter">
                Log10Ki = -10.9961 + <span className="text-blue-400 font-bold underline decoration-blue-500/50">0.2155xD(B18,B22)</span> + 0.1799xD(B3,B6) + 0.1481xD(B4,B6)
              </code>
            </div>
          )}

          <div className="w-full h-full rounded-[48px] overflow-hidden border border-white/5 relative bg-[#050505] flex items-center justify-center">
             <video key={`${selectedPdb}-${mainMode}`} autoPlay loop muted className="w-full h-full object-contain opacity-70">
                <source src={`vdo/${selectedPdb}_${mainMode}.mp4`} type="video/mp4" />
             </video>
             <div className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">
                {mainMode === 'interaction' ? 'Bond Analysis' : 'Superposition Analysis'}: {selectedPdb}
             </div>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: ANALYTICS --- */}
        <aside className="w-[420px] bg-white border-l border-slate-200 p-8 flex flex-col z-50 shadow-2xl overflow-y-auto">
          
          {mainMode === 'interaction' ? (
            /* --- Interaction Mode UI --- */
            <>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-3 font-black text-slate-900 uppercase text-xs tracking-widest leading-none"><Zap size={16} className="text-blue-600" /> Interacting Partners</div>
                <span className="text-[10px] font-bold text-slate-300 uppercase">{currentData.interactions.length} Total</span>
              </div>
              <div className="flex-1 space-y-4">
                {currentData.interactions.map(item => (
                  <div key={item.id} onClick={() => toggleInteraction(item.id)}
                    className={`p-6 rounded-[32px] border transition-all cursor-pointer group ${activeInteractions.includes(item.id) ? 'bg-blue-50 border-blue-200 shadow-sm scale-[1.02]' : 'bg-white border-transparent hover:bg-slate-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${item.bg}`}></div>
                         <span className={`text-[11px] font-black uppercase italic tracking-wider ${item.color}`}>{item.type}</span>
                       </div>
                       {activeInteractions.includes(item.id) ? <CheckSquare size={20} className="text-blue-600" /> : <Square size={20} className="text-slate-200 group-hover:text-slate-300" />}
                    </div>
                    <p className="text-sm font-mono font-medium text-slate-600 group-hover:text-slate-900 uppercase tracking-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* --- Drug Design Mode UI --- */
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 italic"><Info size={18} className="text-blue-600" /> Analytical Insights</h3>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100 italic">
                  <p className="text-[13px] text-blue-900 leading-relaxed font-medium">
                    "Drug Design mode focuses on atomic coordinates (B1-B12) to correlate distance with binding affinity (Ki)."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Max Occupancy</p>
                    <p className="text-2xl font-black text-slate-900 italic">9/11</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">RMSD Variance</p>
                    <p className="text-2xl font-black text-slate-900 italic">0.042 Å</p>
                  </div>
                </div>
              </div>
              <button className="mt-auto w-full py-5 bg-slate-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                <FileText size={16} /> Export Design Data
              </button>
            </div>
          )}
        </aside>

        {/* --- BOTTOM DRAWER (เฉพาะ Drug Design: ตารางเหลืองพับได้) --- */}
        {mainMode === 'drug-design' && (
          <div className={`absolute bottom-0 left-0 right-[420px] bg-[#FFFBEB] border-t-4 border-amber-200 z-[55] transition-all duration-700 shadow-2xl ${isDrawerOpen ? 'h-[400px]' : 'h-16'}`}>
            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="w-full h-16 flex items-center justify-between px-10 hover:bg-amber-100 transition-all border-b border-amber-100">
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.3em] flex items-center gap-3"><Database size={16} /> View Residue Mapping Index (B1 - B12)</span>
              <ChevronDown className={`transition-transform duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="p-10 h-[calc(100%-64px)] overflow-auto">
              <table className="w-full text-left text-[11px] font-mono">
                <thead>
                  <tr className="text-amber-900/40 border-b border-amber-200 italic uppercase font-black tracking-tighter">
                    <th className="pb-3 pr-4 text-amber-600 italic">PDB</th>
                    {Array.from({length: 12}).map((_, i) => <th key={i} className="pb-3 px-2">B{i+1}</th>)}
                  </tr>
                </thead>
                <tbody className="text-amber-900/80 font-bold italic">
                  {['*1NVR', '10KY', '1XJD', '2OIC'].map(pdb => (
                    <tr key={pdb} className="border-b border-amber-100/50 hover:bg-white/50 transition-colors tracking-tighter">
                      <td className="py-3 font-black text-blue-600">{pdb}</td>
                      <td>ALA-26</td><td>ALA-36</td><td>ASN-135</td><td>ASP-148</td>
                      <td className="bg-amber-200/40 text-amber-600 px-1">CYS-87</td>
                      <td>GLN-24</td><td>GLU-22</td><td>GLU-85</td><td>GLY-16</td><td>GLY-90</td><td>LEU-137</td><td>LEU-212</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="h-10 bg-white border-t border-slate-100 px-10 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex gap-8 italic">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Simulation Sync</span>
          <span>Target: STU-Ligand</span>
        </div>
        <span className="text-blue-600 font-black tracking-[0.2em]">MANORAA DEEPDIVE v4.0</span>
      </footer>
    </div>
  );
};

export default DeepDiveWorkbench;
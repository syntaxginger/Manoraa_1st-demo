import React, { useState } from 'react';
import {
  Zap, CheckSquare, Square, Info,
  Database, Activity, ChevronDown, FileText,
  Layers, Orbit, Minimize2, Maximize2
} from 'lucide-react';

const DeepDiveWorkbench = () => {
  const pdbData = {
    "1NVR": { uniprot: "O14757", target: "CHK1_HUMAN", affinity: "0.0078", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[CYS]87:A', color: 'text-cyan-500', bg: 'bg-cyan-500' },
        { id: 'HB2', type: 'HBOND', label: '[GLU]134:A', color: 'text-cyan-500', bg: 'bg-cyan-500' },
        { id: 'VD1', type: 'VDW', label: '[CYS]87:A', color: 'text-amber-500', bg: 'bg-amber-500' }
      ]},
    "10KY": { uniprot: "O15530", target: "PDPK1_HUMAN", affinity: "0.0065", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ALA]162:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]162:A', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]},
    "1XJD": { uniprot: "Q04759", target: "KPCT_HUMAN", affinity: "0.00033", interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ASP]508:A', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]407:A', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]}
  };

  const [selectedPdb, setSelectedPdb] = useState('1NVR');
  const [mainMode, setMainMode] = useState('interaction');
  const [activeInteractions, setActiveInteractions] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentData = pdbData[selectedPdb] || pdbData["1NVR"];
  const pdbList = Object.keys(pdbData);

  const toggleInteraction = (id) => {
    setActiveInteractions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen bg-[#F1F5F9] flex flex-col font-sans overflow-hidden text-slate-700 text-[14px]">
      {/* --- SLIM NAV --- */}
      <nav className="bg-white border-b border-slate-200 px-8 py-3 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Database size={18} />
            </div>
            <h1 className="text-[15px] font-black tracking-tight text-slate-900 uppercase">Manoraa <span className="text-blue-600">v4.0</span></h1>
          </div>
          <div className="flex gap-2 border-l border-slate-200 pl-6">
            {pdbList.map(pdb => (
              <button
                key={pdb}
                onClick={() => { setSelectedPdb(pdb); setActiveInteractions([]); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${
                  selectedPdb === pdb ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                {pdb}
              </button>
            ))}
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button onClick={() => setMainMode('interaction')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'interaction' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
            <Zap size={14} className="inline mr-1.5 mb-0.5" /> Interaction
          </button>
          <button onClick={() => setMainMode('drug-design')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'drug-design' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
            <Activity size={14} className="inline mr-1.5 mb-0.5" /> Drug Design
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative p-4 gap-4">
        
        {/* --- MAIN VIEWER AREA --- */}
        <main className="flex-1 relative rounded-[2.5rem] overflow-hidden bg-slate-200 border border-slate-200/60 shadow-2xl">
          {mainMode === 'drug-design' && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-[92%] bg-slate-900/85 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10 shadow-2xl">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1.5 opacity-80">Influential Distance Equation</p>
              <code className="text-[13px] text-blue-50 font-mono tracking-wider block">
                Log10Ki = -10.9961 + <span className="text-blue-400 font-black">0.2155xD(B18,B22)</span> + 0.1799xD(B3,B6) + 0.1481xD(B4,B6) + 0.1120xD(B7,B10)
              </code>
            </div>
          )}

          <video key={`${selectedPdb}-${mainMode}`} autoPlay loop muted className="w-full h-full object-contain opacity-90 scale-95 transition-transform duration-700">
            <source src={`vdo/${selectedPdb}_${mainMode}.mp4`} type="video/mp4" />
          </video>

          {/* INTEGRATED TOOLS (แนวตั้ง) */}
          {mainMode === 'drug-design' && (
            <div className="absolute bottom-24 left-8 z-40 flex flex-col gap-2.5 p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
              {[Layers, Orbit, Minimize2, Maximize2].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all shadow-sm group relative">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          )}

        </main>

        {/* --- OPTIMIZED SIDEBAR --- */}
        <aside className="w-[300px] xl:w-[320px] flex flex-col gap-4 z-40">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[1.5rem] p-5 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Target Info</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-slate-400 uppercase font-black">UniProt</span>
                <span className="text-[12px] font-black text-slate-900">{currentData.uniprot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-slate-400 uppercase font-black">Affinity</span>
                <span className="text-[12px] font-black text-blue-600">{currentData.affinity}</span>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Target Name</p>
                <p className="text-[12px] font-black text-slate-800 leading-tight">{currentData.target}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-[1.5rem] p-5 flex flex-col overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Interactions</h3>
              <span className="bg-blue-50 text-[10px] px-2.5 py-0.5 rounded-full font-black text-blue-600">{currentData.interactions.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {currentData.interactions.map(item => (
                <button key={item.id} onClick={() => toggleInteraction(item.id)} className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${activeInteractions.includes(item.id) ? 'bg-blue-50/50 border-blue-500 shadow-sm shadow-blue-50' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.bg}`} />
                      <span className={`text-[9px] font-black uppercase ${item.color}`}>{item.type}</span>
                    </div>
                    <p className="text-[11px] font-mono font-black text-slate-700 uppercase truncate">{item.label}</p>
                  </div>
                  {activeInteractions.includes(item.id) ? <CheckSquare size={18} className="text-blue-600 ml-2" /> : <Square size={18} className="text-slate-200 ml-2" />}
                </button>
              ))}
            </div>
            
            <button className="mt-4 w-full py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
              <FileText size={15} /> Export
            </button>
          </div>
        </aside>

        {/* --- BOTTOM DRAWER (ปรับขยับลงมา 30% และแก้ปุ่มสีเทา) --- */}
        {mainMode === 'drug-design' && (
          <div className={`absolute bottom-4 left-8 right-[320px] xl:right-[340px] bg-amber-50/95 backdrop-blur-xl border border-amber-200/50 z-[55] rounded-3xl transition-all duration-500 shadow-2xl overflow-hidden ${isDrawerOpen ? 'h-[300px]' : 'h-11'}`}>
            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="w-full h-11 flex items-center justify-between px-7">
              <span className="text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em] flex items-center gap-3">
                <Database size={15} /> Residue Mapping Index (B1 - B12)
              </span>
              <ChevronDown size={14} className={`text-amber-700 transition-transform duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="px-7 pb-7 overflow-auto h-[250px]">
              <div className="rounded-2xl border border-amber-200/30 bg-white overflow-hidden shadow-inner">
                <table className="w-full text-[10px] font-mono text-left">
                  <thead className="bg-amber-100/50 text-amber-900/50 uppercase font-black">
                    <tr className="border-b border-amber-100">
                      <th className="py-4 px-5">PDB</th>
                      {Array.from({ length: 6 }).map((_, i) => <th key={i} className="py-4 px-2">B{i + 1}</th>)}
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 font-bold">
                    {['*1NVR', '10KY', '1XJD'].map(pdb => (
                      <tr key={pdb} className="border-b border-amber-50/50 hover:bg-amber-50/50">
                        <td className="py-3.5 px-5 font-black text-slate-900">{pdb}</td>
                        {Array.from({ length: 6 }).map((_, i) => <td key={i} className={`px-2 py-3.5 ${i === 4 ? 'text-blue-600' : ''}`}>ALA-26</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="h-9 bg-white border-t border-slate-100 px-10 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <div className="flex gap-8">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> System Sync</span>
          <span>Target: Complex STU</span>
        </div>
        <span className="text-blue-600/40 tracking-[0.4em]">MANORAA DEEPDIVE</span>
      </footer>
    </div>
  );
};

export default DeepDiveWorkbench;
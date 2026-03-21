import React, { useState } from 'react';
import {
  Zap, CheckSquare, Square, Database, Activity, 
  ChevronDown, FileText, Layers, Orbit, 
  Minimize2, Maximize2, Sigma, Calculator, Info, AlertCircle
} from 'lucide-react';

const DeepDiveWorkbench = () => {
  const pdbData = {
    "1NVR": { 
      uniprot: "O14757", 
      target: "CHK1_HUMAN", 
      affinity: "0.0078", 
      // เพิ่มข้อมูลระยะห่างเฉพาะของ 1NVR
      distances: [
        { pair: 'B11-B20', label: 'GLY-16 : PHE-149', dist: '4.24' },
        { pair: 'B23-B20', label: 'VAL-23 : PHE-149', dist: '5.12' },
        { pair: 'B4-B6', label: 'ASN-135 : GLN-24', dist: '3.88' }
      ],
      interactions: [
        { id: 'HB1', type: 'HBOND', label: '[CYS]87:A', dist: '2.84', color: 'text-cyan-500', bg: 'bg-cyan-500' },
        { id: 'HB2', type: 'HBOND', label: '[GLU]134:A', dist: '3.12', color: 'text-cyan-500', bg: 'bg-cyan-500' },
        { id: 'VD1', type: 'VDW', label: '[CYS]87:A', dist: '3.85', color: 'text-amber-500', bg: 'bg-amber-500' }
      ]
    },
    "10KY": { 
      uniprot: "O15530", 
      target: "PDPK1_HUMAN", 
      affinity: "0.0065", 
      // เพิ่มข้อมูลระยะห่างเฉพาะของ 10KY
      distances: [
        { pair: 'B11-B20', label: 'GLY-89 : PHE-224', dist: '6.15' },
        { pair: 'B23-B20', label: 'VAL-96 : PHE-224', dist: '4.82' },
        { pair: 'B4-B6', label: 'ASN-210 : VAL-97', dist: '5.44' }
      ],
      interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ALA]162:A', dist: '2.95', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]162:A', dist: '4.10', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]
    },
    "1XJD": { 
      uniprot: "Q04759", 
      target: "KPCT_HUMAN", 
      affinity: "0.00033", 
      // เพิ่มข้อมูลระยะห่างเฉพาะของ 1XJD
      distances: [
        { pair: 'B11-B20', label: 'GLY-387 : PHE-456', dist: '3.92' },
        { pair: 'B23-B20', label: 'VAL-394 : PHE-456', dist: '4.15' },
        { pair: 'B4-B6', label: 'ASN-509 : PHE-395', dist: '2.78' }
      ],
      interactions: [
        { id: 'HB1', type: 'HBOND', label: '[ASP]508:A', dist: '2.78', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { id: 'VD1', type: 'VDW', label: '[ALA]407:A', dist: '3.92', color: 'text-yellow-400', bg: 'bg-yellow-400' }
      ]
    }
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
      {/* --- TOP NAV --- */}
      <nav className="bg-white border-b border-slate-200 px-8 py-3 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Database size={18} />
            </div>
            <h1 className="text-[15px] font-black tracking-tight text-slate-900 uppercase">Manoraa <span className="text-blue-400">v4.0</span></h1>
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
          <button onClick={() => setMainMode('interaction')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'interaction' ? 'bg-white text-blue-400 shadow-sm' : 'text-slate-500'}`}>
            <Zap size={14} className="inline mr-1.5 mb-0.5" /> Interaction
          </button>
          <button onClick={() => setMainMode('drug-design')} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mainMode === 'drug-design' ? 'bg-white text-blue-400 shadow-sm' : 'text-slate-500'}`}>
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
                Log10Ki = -12.4200 + <span className="text-blue-400 font-black">0.2215xD(B11,B20)</span> + 0.2143xD(B23,B20) + 0.1788xD(B4,B6)
              </code>
            </div>
          )}

          <video key={`${selectedPdb}-${mainMode}`} autoPlay loop muted className="w-full h-full object-contain opacity-90 scale-95 transition-transform duration-700">
            <source src={`vdo/${selectedPdb}_${mainMode}.mp4`} type="video/mp4" />
          </video>

          <div className="absolute bottom-24 left-8 z-40 flex flex-col gap-2.5 p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            {[Layers, Orbit, Minimize2, Maximize2].map((Icon, i) => (
              <button key={i} className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center text-slate-600 hover:text-blue-400 hover:bg-white transition-all shadow-sm">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </main>

        {/* --- SIDEBAR --- */}
        <aside className="w-[310px] xl:w-[360px] flex flex-col gap-4 z-40">
          
          <div className="bg-slate-900 text-white rounded-[1.5rem] p-4 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sigma size={14} className="text-blue-400" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100/50">Summary</h3>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black text-slate-500 uppercase">Live</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-3 border border-white/5">
              <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest leading-none">Predicted Ki</p>
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-xl font-mono font-black text-blue-400">
                  {currentData.affinity}
                </span>
                <span className="text-[9px] font-black text-slate-500 uppercase">nM</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-[1.5rem] p-5 flex flex-col overflow-hidden shadow-sm">
            
            {mainMode === 'interaction' ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Interactions</h3>
                  <span className="bg-blue-50 text-[10px] px-2.5 py-0.5 rounded-full font-black text-blue-400">{currentData.interactions.length}</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {currentData.interactions.map(item => (
                    <button 
                      key={item.id} 
                      onClick={() => toggleInteraction(item.id)} 
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                        activeInteractions.includes(item.id) 
                        ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                        : 'bg-slate-50 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.bg} ${activeInteractions.includes(item.id) ? 'animate-pulse' : ''}`} />
                          <span className={`text-[9px] font-black uppercase tracking-tight ${item.color}`}>{item.type}</span>
                        </div>
                        <div className="flex justify-between items-center pr-2">
                          <p className="text-[11px] font-mono font-black text-slate-700 uppercase truncate">{item.label}</p>
                          <span className="text-[10px] font-black text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100 shadow-sm">{item.dist} Å</span>
                        </div>
                      </div>
                      <div className="ml-2.5">
                        {activeInteractions.includes(item.id) ? (
                          <CheckSquare size={20} className="text-blue-400" />
                        ) : (
                          <Square size={20} className="text-slate-200 group-hover:text-slate-300 transition-colors" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                    <Calculator size={14} className="text-blue-400" /> Analysis Node
                  </h3>
                  <span className="bg-blue-600 text-[8px] px-2 py-0.5 rounded text-white font-black uppercase">On-the-fly</span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar">
                  <div className="space-y-2.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Pair Distances</p>
                    {/* ส่วนที่แก้ไข: ดึงข้อมูลจาก currentData.distances มาแสดงผล */}
                    {currentData.distances.map((calc, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 hover:border-blue-200 transition-colors animate-in fade-in duration-500">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-blue-400 bg-blue-50 px-2 py-0.5 rounded-lg">{calc.pair}</span>
                          <span className="text-[11px] font-mono font-black text-slate-900">{calc.dist} Å</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 mb-2 truncate">{calc.label}</p>
                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full transition-all duration-700 ease-out" style={{width: `${(parseFloat(calc.dist)/8)*100}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mt-2">
                    <div className="flex items-center gap-2 mb-2 text-indigo-700">
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-tight">Lead Optimization</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-indigo-900/70 font-bold">
                      {selectedPdb === '1XJD' ? (
                        "Current distances are optimal for high affinity binding in KPCT protein."
                      ) : (
                        `The positive coefficient for B11-B20 suggests that increasing distance may improve affinity for ${selectedPdb}.`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <button className="mt-4 w-full py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg">
              <FileText size={15} /> Export Report
            </button>
          </div>
        </aside>

        {/* --- BOTTOM DRAWER --- */}
        {mainMode === 'drug-design' && (
          <div className={`absolute bottom-4 left-8 right-[320px] xl:right-[360px] bg-amber-50/95 backdrop-blur-xl border border-amber-200/50 z-[55] rounded-3xl transition-all duration-500 shadow-2xl overflow-hidden ${isDrawerOpen ? 'h-[300px]' : 'h-11'}`}>
            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="w-full h-11 flex items-center justify-between px-7">
              <span className="text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em] flex items-center gap-3">
                <Database size={15} /> Residue Mapping Index (B1 - B23)
              </span>
              <ChevronDown size={14} className={`text-amber-700 transition-transform duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="px-7 pb-7 overflow-auto h-[250px]">
              <div className="rounded-2xl border border-amber-200/30 bg-white overflow-hidden shadow-inner">
                <table className="w-full text-[10px] font-mono text-left">
                  <thead className="bg-amber-100/50 text-amber-900/50 uppercase font-black">
                    <tr className="border-b border-amber-100">
                      <th className="py-4 px-5">PDB ID</th>
                      <th className="py-4 px-2">B4</th>
                      <th className="py-4 px-2">B6</th>
                      <th className="py-4 px-2">B11</th>
                      <th className="py-4 px-2">B20</th>
                      <th className="py-4 px-2">B23</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 font-bold">
                    {[
                      {id: '*1XJD', b4: 'ASN-509', b6: 'PHE-395', b11: 'GLY-387', b20: 'PHE-456', b23: 'VAL-394'},
                      {id: '1NVR', b4: 'ASN-135', b6: 'GLN-24', b11: 'GLY-16', b20: 'PHE-149', b23: 'VAL-23'},
                      {id: '10KY', b4: 'ASN-210', b6: 'VAL-97', b11: 'GLY-89', b20: 'PHE-224', b23: 'VAL-96'}
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-amber-50/50 hover:bg-amber-50/50 transition-colors ${row.id.includes(selectedPdb) ? 'bg-amber-50/80' : ''}`}>
                        <td className="py-3.5 px-5 font-black text-slate-900">{row.id}</td>
                        <td className="px-2 py-3.5">{row.b4}</td>
                        <td className="px-2 py-3.5">{row.b6}</td>
                        <td className="px-2 py-3.5 text-blue-400">{row.b11}</td>
                        <td className="px-2 py-3.5 text-blue-400">{row.b20}</td>
                        <td className="px-2 py-3.5">{row.b23}</td>
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
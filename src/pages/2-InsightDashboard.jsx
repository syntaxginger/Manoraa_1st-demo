import React, { useState } from 'react';
import { 
  Database, Zap, FileText, ChevronDown, ExternalLink, 
  LayoutGrid, Activity, Beaker, ClipboardCheck, 
  ShieldCheck, ArrowUpRight, Box 
} from 'lucide-react';

const InsightDashboard = () => {
  // รวมข้อมูล Hardcode ทั้ง 5 ชุด
  const topEntries = [
    { 
      pdbId: "1XJD", target: "KPCT_HUMAN", uniprot: "Q04759", res: "2.0", affinity: "0.00033", chain: "A",
      fullName: "Protein kinase C theta type", gene: "PRKCQ", length: "706 AA", 
      pathway: "hsa:5588 (T-cell receptor signaling)",
      description: "Muny's Note: Notice the strong Hydrogen bond at ASP508. High occupancy suggests a very stable binding pose."
    },
    { 
      pdbId: "2Z7R", target: "KS6A1_HUMAN", uniprot: "Q15418", res: "2.0", affinity: "0.003", chain: "A",
      fullName: "Ribosomal protein S6 kinase alpha-1", gene: "RPS6KA1", length: "735 AA",
      pathway: "hsa:6195 (MAPK signaling pathway)",
      description: "Muny's Note: Optimal structural alignment (RMSD < 0.05). Ligand fits perfectly within the hydrophobic pocket."
    },
    { 
      pdbId: "2OIC", target: "IRAK4_HUMAN", uniprot: "Q9NWZ3", res: "2.4", affinity: "0.004", chain: "A/B",
      fullName: "Interleukin-1 receptor-associated kinase 4", gene: "IRAK4", length: "460 AA",
      pathway: "hsa:51135 (Toll-like receptor signaling)",
      description: "Muny's Note: Multiple interaction points identified. Core scaffold shows minimal deviation from reference."
    },
    { 
      pdbId: "1OKY", target: "PDPK1_HUMAN", uniprot: "O15530", res: "2.3", affinity: "0.0065", chain: "A",
      fullName: "3-phosphoinositide-dependent protein kinase 1", gene: "PDPK1", length: "556 AA",
      pathway: "hsa:5170 (Insulin signaling pathway)",
      description: "Muny's Note: Noticeable shift in Side Chain 412, but binding affinity remains within high-potency range."
    },
    { 
      pdbId: "1NVR", target: "CHK1_HUMAN", uniprot: "O14757", res: "1.8", affinity: "0.0078", chain: "A",
      fullName: "Serine/threonine-protein kinase Chk1", gene: "CHEK1", length: "476 AA",
      pathway: "hsa:1111 (Cell cycle control)",
      description: "Muny's Note: Exceptional resolution confirms atomic coordinates with high precision. Optimal for export."
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showUniprot, setShowUniprot] = useState(false);
  const current = topEntries[selectedIndex];

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 font-sans text-slate-900 leading-normal">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- 1. HEADER (Sharp & Identity) --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-300 pb-6 gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-[#0F172A] p-3 rounded-md shadow-xl shadow-slate-200">
              <LayoutGrid size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                Insight <span className="text-slate-500 font-medium tracking-normal not-italic">Console</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1 italic">Structural Analysis Build v3.2</p>
            </div>
          </div>
          
          {/* Tabs Navigator */}
          <div className="flex gap-1 bg-slate-200 p-1 rounded-md self-stretch md:self-auto overflow-x-auto">
            {topEntries.map((entry, idx) => (
              <button 
                key={entry.pdbId} 
                onClick={() => {setSelectedIndex(idx); setShowUniprot(false);}}
                className={`px-5 py-2 rounded text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                  selectedIndex === idx 
                  ? 'bg-[#0F172A] text-white shadow-md scale-105' 
                  : 'text-slate-500 hover:bg-slate-300'
                }`}
              >
                {entry.pdbId}
              </button>
            ))}
          </div>
        </header>

        {/* --- 2. MAIN WORKSPACE --- */}
        <div className="grid grid-cols-12 gap-6 items-start">
          
          {/* LEFT: 3D Visualization Area (Fixed Height) */}
          <div className="col-span-12 lg:col-span-8 bg-[#0F172A] rounded-lg overflow-hidden relative border border-slate-800 shadow-lg flex flex-col h-[650px]">
             <div className="absolute top-5 left-5 z-10 flex items-center gap-3 bg-slate-900/90 backdrop-blur-sm px-4 py-2 border border-slate-700 rounded shadow-2xl">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Live Structural Rendering: {current.pdbId}</span>
             </div>
             
             {/* Center Brand Mock (Canvas Placeholder) */}
             <div className="flex-1 flex flex-col items-center justify-center text-white/5 font-black text-[120px] md:text-[150px] italic tracking-tighter select-none pointer-events-none">
                {current.pdbId}
             </div>

             {/* Muny Observation Overlay */}
             <div className="p-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-start gap-4 z-20">
                <div className="bg-indigo-600/20 p-2 rounded text-indigo-400">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1 italic">Muny's Analysis Report</p>
                  <p className="text-sm text-slate-300 font-medium tracking-tight italic leading-relaxed">
                    {current.description}
                  </p>
                </div>
             </div>
          </div>

          {/* RIGHT: Analysis Console (Scrollable Sidebar) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            
            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm flex flex-col shrink-0">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Structural <span className="text-slate-400 not-italic">Verdict</span></h2>
                <ShieldCheck size={20} className="text-slate-300" />
              </div>

              <div className="space-y-8">
                {/* Affinity Stats */}
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider leading-none">Binding Affinity (Ki)</span>
                      <p className="text-4xl font-black text-[#0F172A] tracking-tighter italic">
                        {current.affinity} 
                        <span className="text-xs text-slate-400 not-italic tracking-normal font-bold ml-1">µM</span>
                      </p>
                   </div>
                   <Zap size={24} className="text-indigo-600 mb-2 animate-pulse" />
                </div>

                {/* Res & Chain Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Resolution</span>
                    <span className="text-base font-black text-slate-900 tracking-tight">{current.res} Å</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Chain</span>
                    <span className="text-base font-black text-slate-900 tracking-tight">{current.chain}</span>
                  </div>
                </div>

                {/* UniProt Identification Drawer */}
                <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm transition-all duration-300">
                  <button 
                    onClick={() => setShowUniprot(!showUniprot)}
                    className={`w-full p-4 flex justify-between items-center transition-all ${
                      showUniprot ? 'bg-[#0F172A] text-white' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Database size={14} className={showUniprot ? 'text-indigo-400' : 'text-slate-400'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">UniProt Metadata</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${showUniprot ? 'rotate-180' : ''}`} />
                  </button>

                  {showUniprot && (
                    <div className="p-5 bg-[#0F172A] text-white border-t border-slate-800 animate-in slide-in-from-top-2 duration-300">
                       <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 italic">Protein Info</h4>
                       <p className="text-xs text-white font-black leading-tight mb-4 tracking-tight uppercase border-l-2 border-indigo-500 pl-3">
                         {current.fullName}
                       </p>
                       <div className="space-y-4 border-t border-slate-800 pt-4">
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                             <span className="text-slate-500 italic">Gene Code</span>
                             <span className="text-slate-200 font-black">{current.gene}</span>
                          </div>
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                             <span className="text-slate-500 italic">Total Length</span>
                             <span className="text-slate-200 font-black">{current.length}</span>
                          </div>
                          <div className="space-y-2 pt-2 border-t border-slate-800/50">
                             <span className="text-[9px] font-black text-indigo-400 uppercase italic tracking-widest block">Biological Pathway</span>
                             <p className="text-[10px] text-slate-300 font-medium leading-relaxed bg-slate-800/50 p-2 rounded">
                               {current.pathway}
                             </p>
                          </div>
                       </div>
                       <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-slate-800 border border-slate-700 text-[9px] font-black uppercase tracking-widest rounded hover:bg-white hover:text-black transition-all">
                          UniProt Entry <ExternalLink size={10} />
                       </button>
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-[#0F172A] hover:bg-black text-white rounded-md text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-3 italic">
                <FileText size={16} /> Finalize Report
              </button>
            </div>
          </div>
        </div >

        {/* --- 3. BOTTOM SPECIFICATIONS (Molecule Meta) --- */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-12">
           {[
             { label: "Molecular Weight", value: "466.53", unit: "G/MOL", icon: <Box size={16}/> },
             { label: "Lipophilicity", value: "4.12", unit: "LOGP", icon: <ArrowUpRight size={16}/> },
             { label: "H-Bond Donors", value: "2", unit: "COUNT", icon: <Beaker size={16}/> },
             { label: "H-Bond Acceptors", value: "5", unit: "COUNT", icon: <ClipboardCheck size={16}/> }
           ].map((item, idx) => (
             <div key={idx} className="group bg-white p-5 border border-slate-200 rounded-lg flex items-center justify-between shadow-sm hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block leading-none">{item.label}</span>
                  <p className="text-base font-black text-slate-900 italic tracking-tighter uppercase leading-none mt-1">
                    {item.value} <span className="text-[9px] text-slate-400 not-italic ml-0.5">{item.unit}</span>
                  </p>
                </div>
                <div className="text-slate-200 group-hover:text-indigo-200 transition-colors">
                  {item.icon}
                </div>
             </div>
           ))}
        </section>
      </div>

      {/* Global CSS for Custom Scrollbar (สามารถย้ายไปไว้ใน index.css ได้) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}} />
    </div>
  );
};

export default InsightDashboard;
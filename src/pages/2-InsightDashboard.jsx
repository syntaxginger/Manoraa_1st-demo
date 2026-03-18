import React, { useState } from 'react';
import { Beaker, Activity, Box, ClipboardCheck, Info, Database, Zap, FileText, ChevronRight, Dna } from 'lucide-react';

const InsightDashboard = () => {
  // --- HARDCODED 5 BEST PDB ENTRIES WITH UNIPROT DATA ---
  const topEntries = [
    { 
      pdbId: "1XJD", uniprot: "Q04759", target: "KPCT_HUMAN", 
      affinity: "0.00033", resolution: "2.0", lipinski: "PASSED",
      description: "Complex STU (1STU) with Kinase-A",
      proteinName: "Protein kinase C theta type",
      gene: "PRKCQ",
      organism: "Homo sapiens (Human)",
      aminoAcids: "706",
      score: "5/5"
    },
    { 
      pdbId: "2Z7R", uniprot: "Q15418", target: "KS6A1_HUMAN", 
      affinity: "0.003", resolution: "2.0", lipinski: "PASSED",
      description: "Ribosomal protein S6 kinase alpha-1",
      proteinName: "Ribosomal protein S6 kinase alpha-1",
      gene: "RPS6KA1",
      organism: "Homo sapiens (Human)",
      aminoAcids: "735",
      score: "5/5"
    },
    { 
      pdbId: "2OIC", uniprot: "Q9NWZ3", target: "IRAK4_HUMAN", 
      affinity: "0.004", resolution: "2.4", lipinski: "PASSED",
      description: "Interleukin-1 receptor kinase 4",
      proteinName: "Interleukin-1 receptor-associated kinase 4",
      gene: "IRAK4",
      organism: "Homo sapiens (Human)",
      aminoAcids: "460",
      score: "5/5"
    },
    { 
      pdbId: "1OKY", uniprot: "O15530", target: "PDPK1_HUMAN", 
      affinity: "0.0065", resolution: "2.3", lipinski: "PASSED",
      description: "3-phosphoinositide-dependent kinase 1",
      proteinName: "3-phosphoinositide-dependent protein kinase 1",
      gene: "PDPK1",
      organism: "Homo sapiens (Human)",
      aminoAcids: "556",
      score: "5/5"
    },
    { 
      pdbId: "1NVR", uniprot: "O14757", target: "CHK1_HUMAN", 
      affinity: "0.0078", resolution: "1.8", lipinski: "PASSED",
      description: "Serine/threonine-protein kinase Chk1",
      proteinName: "Serine/threonine-protein kinase Chk1",
      gene: "CHEK1",
      organism: "Homo sapiens (Human)",
      aminoAcids: "476",
      score: "5/5"
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentEntry = topEntries[selectedIndex];

  const stuData = {
    name: "Staurosporine",
    ligandId: "STU",
    smiles: "CN1C2=C(C=CC=C2)C3=C1C4=CC=CC=C4C5=C3C6=C(C(=O)N5)C7C(O6)C(C(C7)NC)OC",
    metrics: {
      mw: "466.53",
      logp: "4.12",
      hbd: "2",
      hba: "5"
    }
  };

  const displaySmiles = stuData.smiles.length > 35 
    ? stuData.smiles.substring(0, 35) + "..." 
    : stuData.smiles;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- 1. HEADER SECTION --- */}
        <header className="flex justify-between items-center mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest leading-tight">REF ID: {currentEntry.pdbId}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mt-1">
              Insight <span className="text-blue-600">Dashboard</span>
            </h1>
          </div>
          
          <div className="hidden md:block p-4 bg-white border border-slate-100 rounded-2xl text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 opacity-70">Target Chemical Structure</p>
            <p className="text-sm font-mono font-medium text-slate-600 tracking-tight">{displaySmiles}</p>
          </div>
        </header>

        {/* --- 2. MAIN METRICS GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Molecular Weight", value: stuData.metrics.mw, unit: "g/mol", icon: <Box size={18} className="text-blue-600" /> },
            { label: "Lipophilicity (LogP)", value: stuData.metrics.logp, unit: "calc", icon: <Activity size={18} className="text-blue-600" /> },
            { label: "H-Bond Donors", value: stuData.metrics.hbd, unit: "count", icon: <Beaker size={18} className="text-blue-600" /> },
            { label: "H-Bond Acceptors", value: stuData.metrics.hba, unit: "count", icon: <ClipboardCheck size={18} className="text-blue-600" /> }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100/70 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400">{item.icon}</div>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-300">
                    <Info size={14} />
                </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.unit}</span>
              </div>
            </div>
          ))}
        </section>

        {/* PDB Selection Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {topEntries.map((entry, idx) => (
            <button
              key={entry.pdbId}
              onClick={() => setSelectedIndex(idx)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedIndex === idx 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' 
                : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {entry.pdbId}
            </button>
          ))}
        </div>

        {/* --- 3. BOTTOM VISUAL & VERDICT --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-[550px]">
          
          {/* Visual Mapping Card (กล่องวิดีโอ - ซ้าย) */}
          <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden relative flex flex-col hover:shadow-lg transition-all group">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center group-hover:bg-slate-50/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">3D Structure Viewer</span>
              </div>
            </div>
            
            <div className="flex-1 bg-black relative flex items-center justify-center">
              <video 
                key={currentEntry.pdbId}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="vdo/3D_Structure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute bottom-6 left-6 p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-1 leading-none">Visualization</p>
                <p className="text-xs font-medium opacity-90 italic">{currentEntry.description}</p>
              </div>
            </div>
          </div>

          {/* Quick Verdict Card (ขวา) */}
          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Quick <span className="text-blue-600">Verdict</span></h4>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">ID: {currentEntry.uniprot} · {currentEntry.target}</p>
                </div>
                <Zap size={18} className="text-blue-100" />
              </div>

              <div className="space-y-5">
                {[
                  { label: "Binding Affinity", value: `${currentEntry.affinity} µM`, highlight: true },
                  { label: "PDB Resolution", value: `${currentEntry.resolution} Å`, highlight: false },
                  { label: "Lipinski's Rule", value: currentEntry.lipinski, highlight: false, passed: true }
                ].map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center ${idx < 2 ? 'border-b border-slate-50 pb-3' : ''}`}>
                      <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider leading-none">{item.label}</span>
                      {item.passed && item.label === "Lipinski's Rule" ? (
                          <span className="text-[10px] font-black text-white bg-green-500 px-3 py-1 rounded-md uppercase tracking-tighter shadow-sm leading-none">Passed</span>
                      ) : (
                          <span className={`text-base font-black ${item.highlight ? 'text-blue-600' : 'text-slate-700'} tracking-tight leading-none`}>{item.value}</span>
                      )}
                    </div>
                ))}
              </div>

              {/* --- NEW: UNIPROT IDENTIFICATION BOX (Replacing Equation) --- */}
              <div className="p-5 bg-slate-50 rounded-[32px] border border-slate-100 relative transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Dna size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">UniProt Identification</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Protein</span>
                    <p className="text-[10px] font-black text-slate-800 leading-tight uppercase tracking-tight">{currentEntry.proteinName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Gene</span>
                      <p className="text-[10px] font-bold text-blue-600">{currentEntry.gene}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Amino Acids</span>
                      <p className="text-[10px] font-bold text-slate-700">{currentEntry.aminoAcids}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter italic">{currentEntry.organism}</span>
                    <div className="flex items-center gap-1">
                       <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Score</span>
                       <span className="text-[9px] font-black text-emerald-500">{currentEntry.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

<button className="w-full py-3 bg-[#1E293B] hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-3 mt-6 border border-white/10">
  <FileText size={14} strokeWidth={2.5} />
  <span>Generate PDF Report</span>
</button>
          </div>

        </section>
      </div>
    </div>
  );
};

export default InsightDashboard;
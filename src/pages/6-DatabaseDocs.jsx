import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, ExternalLink, ShieldCheck } from 'lucide-react';

const DatabaseDocs = () => {
  const navigate = useNavigate();

  const sources = [
    {
      name: "Protein Data Bank (PDB)",
      usage: "Structural Coordinates",
      version: "March 2026 Update",
      desc: "Source for 3D atomic coordinates used in our Lab Visualizer and Summary Reports.",
      link: "https://www.rcsb.org/"
    },
    {
      name: "UniProt KB",
      usage: "Protein Metadata",
      version: "Rel. 2025_05",
      desc: "Provides functional information about proteins and amino acid sequences.",
      link: "https://www.uniprot.org/"
    },
    {
      name: "MANORAA Central DB",
      usage: "Binding Affinity (LogKi)",
      version: "v3.2-Hierarchical",
      desc: "The core database containing mapped analogous nuclei and calculated binding energy.",
      link: "https://www.manoraa.org/"
    }
  ];

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* ปุ่ม Back - ปรับให้เล็กลงและสะอาดตา */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Search</span>
      </button>

      <div className="space-y-4 border-b border-slate-100 pb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-tighter border border-blue-100/50">
          <ShieldCheck size={10} /> Data Integrity Verified
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <Database size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Database Documentation
          </h2>
        </div>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Technical specifications and provenance of the biological data utilized across the MANORAA platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {sources.map((src, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-blue-500/30 hover:shadow-sm transition-all">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{src.name}</h3>
                <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase">{src.version}</span>
              </div>
              <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{src.usage}</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{src.desc}</p>
            </div>
            
            {/* ปุ่ม Link - ปรับให้กะทัดรัด (Minimal) */}
            <a 
              href={src.link} 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 md:mt-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
            >
              Ref <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      {/* Footer เล็กๆ เพิ่มความโปร */}
      <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em] pt-4">
        System Core v3.2.0 • Data Verified 2026
      </p>
    </div>
  );
};

export default DatabaseDocs;
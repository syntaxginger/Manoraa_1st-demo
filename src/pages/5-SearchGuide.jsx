import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, Code } from 'lucide-react';

const SearchGuide = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: "SMILES Notation",
      desc: "Search using Simplified Molecular Input Line Entry System strings.",
      example: "Example: CC1=C(C=C(C=C1)O)C",
      // เปลี่ยน className จาก text-bronze เป็น text-slate-600
      icon: <Code className="text-slate-600 group-hover:text-white transition-colors" size={20} />
    },
    {
      title: "PDB Identifier",
      desc: "Directly fetch protein-ligand complexes from the Protein Data Bank.",
      example: "Example: 1STU, 2W9H",
      // เปลี่ยน className จาก text-bronze เป็น text-slate-600
      icon: <Search className="text-slate-600 group-hover:text-white transition-colors" size={20} />
    }
  ];

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* ปุ่ม Back - ปรับให้เล็กลง (text-[10px]) และ Minimal ขึ้น */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Search</span>
      </button>

      <div className="space-y-3 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Search Guide
          </h2>
        </div>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Learn how to effectively query the MANORAA database using various chemical identifiers and structural inputs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((g, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-500/30 transition-all group">
            {/* กล่อง Icon เล็กลง (w-10 h-10) และเปลี่ยนสี Hover เป็น Slate-900 */}
            <div className="mb-5 bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              {g.icon}
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">{g.title}</h3>
            <p className="text-slate-500 text-xs mb-5 leading-relaxed">{g.desc}</p>
            
            {/* กล่อง Example กะทัดรัดขึ้น */}
            <div className="bg-slate-50 p-3 rounded-lg font-mono text-[10px] text-slate-400 border border-slate-100 group-hover:text-slate-600 transition-colors">
              {g.example}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status แบบเนียนๆ */}
      <div className="flex justify-center pt-6">
        <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Documentation Updated: March 2026</span>
        </div>
      </div>
    </div>
  );
};

export default SearchGuide;
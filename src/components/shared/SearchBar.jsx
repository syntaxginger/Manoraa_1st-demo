import React from 'react';
import { Search, PenTool } from 'lucide-react';

const SearchBar = ({ value, onChange, onOpenSketcher }) => {
  return (
    <div className="relative group w-full">
      {/* Search Icon */}
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
      
      {/* Input Field: ปรับขนาด placeholder (e.g.) ให้เล็กลงด้วย text-[13px] */}
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Staurosporine, SMILES, or PDB ID..."
        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-12 text-[15px] focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all text-slate-900 placeholder:text-[13px] placeholder:text-slate-400 placeholder:font-normal font-medium shadow-sm"
      />

      {/* Sketcher Button: ปรับให้เล็กลง (Compact) และขยับตำแหน่งให้เนี๊ยบขึ้น */}
      <button 
        type="button"
        onClick={onOpenSketcher}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-all shadow-sm active:scale-95"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.1em]">Sketcher</span>
        <PenTool size={13} />
      </button>
    </div>
  );
};

export default SearchBar;
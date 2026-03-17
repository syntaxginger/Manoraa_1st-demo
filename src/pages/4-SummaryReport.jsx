import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Copy, ArrowLeft, CheckCircle2, Share2, Database } from 'lucide-react';

const SummaryReport = () => {
  const navigate = useNavigate();

  // Mock Data: Atomic Coordinates (PDB Standard Format)
  const coordinates = [
    { atom: "C1", type: "Carbon", x: "12.452", y: "-5.231", z: "24.110", occupancy: "1.00" },
    { atom: "N2", type: "Nitrogen", x: "13.102", y: "-4.892", z: "23.954", occupancy: "1.00" },
    { atom: "O1", type: "Oxygen", x: "11.874", y: "-6.120", z: "25.012", occupancy: "1.00" },
    { atom: "C2", type: "Carbon", x: "14.221", y: "-3.445", z: "22.887", occupancy: "1.00" },
    { atom: "S1", type: "Sulfur", x: "15.004", y: "-2.910", z: "21.554", occupancy: "1.00" },
  ];

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 bg-[#F8FAFC]">
      
      {/* 1. Report Header */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Visualizer
          </button>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Final Data Export</h2>
            <p className="text-slate-500 font-medium italic text-sm">Generated on March 17, 2026 • Project ID: MNR-772-STU</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-900/10">
            <Download size={18} /> Export PDB File
          </button>
        </div>
      </div>

      {/* 2. Status & Validation Badge */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="bg-slate-50 p-4 rounded-2xl text-slate-900 border border-slate-100">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-900 font-black text-lg tracking-tight uppercase">Structure Validated</h4>
            <p className="text-slate-500 text-sm font-medium">RMSD: <span className="text-slate-900 font-bold">0.042 Å</span> | Final Affinity Score: <span className="text-slate-900 font-bold">7.42 LogKi</span></p>
          </div>
        </div>
        <div className="hidden md:block">
           <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Standard: PDB v3.3
           </div>
        </div>
      </div>

      {/* 3. Coordinate Data Table */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-[#FDFDFD]">
          <div className="flex items-center gap-3">
            <Database size={20} className="text-slate-400" />
            <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest">Atomic Coordinate Records</h3>
          </div>
          <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 flex items-center gap-2 transition-colors uppercase tracking-[0.15em]">
            <Copy size={14} /> Copy Clipboard
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-10 py-5 border-b border-slate-100">Atom</th>
                <th className="px-10 py-5 border-b border-slate-100">Type</th>
                <th className="px-10 py-5 border-b border-slate-100 font-mono text-center">X-Axis</th>
                <th className="px-10 py-5 border-b border-slate-100 font-mono text-center">Y-Axis</th>
                <th className="px-10 py-5 border-b border-slate-100 font-mono text-center">Z-Axis</th>
                <th className="px-10 py-5 border-b border-slate-100 text-right">Occupancy</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {coordinates.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-5 text-slate-900 font-black">{row.atom}</td>
                  <td className="px-10 py-5 text-slate-500 font-semibold">{row.type}</td>
                  <td className="px-10 py-5 text-slate-900 font-mono text-center bg-slate-50/30 group-hover:bg-transparent">{row.x}</td>
                  <td className="px-10 py-5 text-slate-900 font-mono text-center">{row.y}</td>
                  <td className="px-10 py-5 text-slate-900 font-mono text-center bg-slate-50/30 group-hover:bg-transparent">{row.z}</td>
                  <td className="px-10 py-5 text-slate-400 text-right">{row.occupancy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">End of Computed Structural Output</p>
        </div>
      </div>

    </div>
  );
};

export default SummaryReport;
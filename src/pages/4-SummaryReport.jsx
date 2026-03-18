import React from 'react';
import { Download, FileText, Share2, CheckCircle, ArrowLeft } from 'lucide-react';

const SummaryReport = () => {
  // Mock data สำหรับตาราง
  const coordinates = [
    { atom: 'C1', type: 'Carbon', x: '12.452', y: '-5.231', z: '24.110', occ: '1.00' },
    { atom: 'N2', type: 'Nitrogen', x: '13.102', y: '-4.892', z: '23.954', occ: '1.00' },
    { atom: 'O1', type: 'Oxygen', x: '11.874', y: '-6.120', z: '25.012', occ: '1.00' },
    // ... ใส่เพิ่มตามต้องการ
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-12">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto flex justify-between items-end mb-12">
        <div>
          <button className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4 hover:text-slate-900 transition-colors">
            <ArrowLeft size={14} /> Back to Visualizer
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Final Data Export</h1>
          <p className="text-slate-400 text-xs font-bold mt-2">Generated on March 18, 2026 • Project ID: MNR-772-STU</p>
        </div>
        <div className="flex gap-3">
           <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><Share2 size={20}/></button>
           <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 shadow-xl shadow-slate-200 transition-all">
             <Download size={18} /> Export PDB File
           </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* 1. Validation Card */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 flex items-center justify-between shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
              <CheckCircle size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase">Structure Validated</h3>
              <p className="text-slate-400 text-xs font-bold">RMSD: <span className="text-indigo-500">0.042 Å</span> | Final Affinity Score: <span className="text-indigo-500">7.42 LogKi</span></p>
            </div>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
            Standard: PDB v3.3
          </div>
        </div>

        {/* 2. Atomic Records Table */}
        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <FileText size={20} className="text-slate-400" />
               <h3 className="font-black text-slate-900 uppercase text-sm tracking-wider">Atomic Coordinate Records</h3>
             </div>
             <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">Copy Clipboard</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-4 font-black">Atom</th>
                <th className="px-8 py-4 font-black">Type</th>
                <th className="px-8 py-4 font-black text-center">X-Axis</th>
                <th className="px-8 py-4 font-black text-center">Y-Axis</th>
                <th className="px-8 py-4 font-black text-center">Z-Axis</th>
                <th className="px-8 py-4 font-black text-center">Occupancy</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-slate-600">
              {coordinates.map((row, idx) => (
                <tr key={idx} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-slate-900 font-black">{row.atom}</td>
                  <td className="px-8 py-4">{row.type}</td>
                  <td className="px-8 py-4 font-mono text-center">{row.x}</td>
                  <td className="px-8 py-4 font-mono text-center">{row.y}</td>
                  <td className="px-8 py-4 font-mono text-center">{row.z}</td>
                  <td className="px-8 py-4 font-mono text-center text-slate-400">{row.occ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Mathematical Grounding (Equation จากเว็บเก่า) */}
        <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100">
          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Prediction Model Methodology</h4>
          <p className="text-sm font-mono text-indigo-900 leading-relaxed italic">
            Log10Ki = -12.4200 + 0.2215×D(B11,B20) + 0.2143×D(B23,B20) + 0.1788×D(B4,B6)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
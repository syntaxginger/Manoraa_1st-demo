import React, { useState } from 'react';
import { 
  X, RotateCcw, Box, CheckCircle2, FlaskConical, 
  MousePointer2, Plus, Eraser, Move, Maximize2 
} from 'lucide-react';

const SketcherModal = ({ isOpen, onClose, onApply }) => {
  const [smiles, setSmiles] = useState("");
  const [structureName, setStructureName] = useState("");

  if (!isOpen) return null;

  // ฟังก์ชันสำหรับกดปุ่มแล้วขึ้นรูป/โครงสร้างบนกระดาษ
  const handleSelectStructure = (name, smilesValue) => {
    setSmiles(smilesValue);
    setStructureName(name);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-[#F1F5F9] w-full max-w-6xl h-[85vh] rounded-[2.5rem] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* 1. Sidebar: เครื่องมือสำเร็จรูป */}
        <div className="w-80 border-r border-slate-200 bg-white p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <FlaskConical size={20}/>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Structure Library</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Build 2026 Node</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rings & Bases</p>
              <button 
                onClick={() => handleSelectStructure("Benzene Ring", "c1ccccc1")}
                className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-between border-2 ${
                  structureName === "Benzene Ring" 
                  ? 'bg-blue-50 border-blue-600 text-blue-600' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                }`}
              >
                Benzene Ring <Plus size={14}/>
              </button>

              <button 
                onClick={() => handleSelectStructure("Cyclohexane", "C1CCCCC1")}
                className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-between border-2 ${
                  structureName === "Cyclohexane" 
                  ? 'bg-blue-50 border-blue-600 text-blue-600' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                }`}
              >
                Cyclohexane <Plus size={14}/>
              </button>
            </div>
          </div>

        </div>

        {/* 2. Main Workstation: หน้ากระดาษวาดรูป */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Toolbar ด้านบนกระดาษ */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-6">
              <button className="p-2 hover:bg-slate-100 rounded-lg text-blue-600"><MousePointer2 size={18}/></button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Move size={18}/></button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Eraser size={18}/></button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {['C', 'N', 'O', 'S', 'P'].map(atom => (
                  <button key={atom} className="w-8 h-8 flex items-center justify-center rounded-md text-[11px] font-black border border-slate-100 hover:bg-blue-600 hover:text-white transition-all text-slate-500">
                    {atom}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400 transition-all ml-4">
              <X size={18}/>
            </button>
          </div>

          {/* Canvas Area (กระดาษวาดรูป) */}
          <div className="flex-1 m-6 mt-24 bg-white rounded-[2rem] shadow-inner border border-slate-200 relative overflow-hidden flex items-center justify-center" 
               style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            
            {smiles ? (
              <div className="relative animate-in fade-in zoom-in duration-500">
                {/* แผ่นกระดาษแสดงผล Card */}
                <div className="w-[450px] h-[450px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center p-12 relative group">
                   <div className="absolute top-6 right-6 text-slate-200"><Maximize2 size={20}/></div>
                   
                   {/* วงแหวนจำลอง (Simulated Drawing) */}
                   <div className="w-48 h-48 border-4 border-slate-800 rounded-full flex items-center justify-center mb-10 relative">
                      <div className="w-32 h-32 border-4 border-slate-800 rounded-full opacity-20 animate-ping absolute"></div>
                      <Box size={48} className="text-slate-800"/>
                   </div>

                   <div className="text-center">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Structure View</h4>
                      <p className="text-lg font-black text-slate-900 mb-2">{structureName}</p>
                      <div className="px-4 py-2 bg-blue-50 rounded-full">
                        <code className="text-xs font-mono text-blue-600 font-bold">{smiles}</code>
                      </div>
                   </div>
                </div>

                {/* Validation Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <CheckCircle2 size={14}/> Valid Interaction
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-20">
                <MousePointer2 size={48} className="mx-auto text-slate-400 animate-pulse"/>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Ready for sketching</p>
              </div>
            )}
          </div>

          {/* 3. Footer Control */}
          <div className="px-12 pb-8 flex justify-between items-center">
            <button 
              onClick={() => { setSmiles(""); setStructureName(""); }} 
              className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-all text-[11px] font-black uppercase tracking-widest"
            >
              <RotateCcw size={16}/> Clear Canvas
            </button>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={onClose} 
                className="text-[11px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => onApply(smiles)}
                disabled={!smiles}
                className={`px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
                  smiles 
                  ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700' 
                  : 'bg-slate-300 text-slate-100 cursor-not-allowed'
                }`}
              >
                Apply Structure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketcherModal;
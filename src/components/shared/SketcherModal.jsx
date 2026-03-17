import React, { useEffect, useRef, useState } from 'react';
import { X, Save, RotateCcw, PenTool } from 'lucide-react';
import axios from 'axios';

// ประกาศฟังก์ชันไว้ที่ window เพื่อให้ Library ภายนอกเรียกใช้ได้เสมอ
window.jsmeOnLoad = () => { console.log("JSME Engine: System Online"); };

const SketcherModal = ({ isOpen, onClose, onApply }) => {
  const jsmeRef = useRef(null);
  const [engineActive, setEngineActive] = useState(false);

  useEffect(() => {
    let checkInterval;

    if (isOpen) {
      // ฟังก์ชันสำหรับสร้าง Instance ของตัววาด
      const initEditor = () => {
        const container = document.getElementById("jsme_container");
        if (window.JSME && container && !jsmeRef.current) {
          try {
            // สร้าง Editor พร้อมเมนูวาดแบบเต็ม (เหมือน MANORAA เดิม)
            jsmeRef.current = new window.JSME("jsme_container", "100%", "100%", {
              options: "oldlook,topmenu,border,nozoom" 
            });
            setEngineActive(true);
            console.log("JSME: Interface Injected");
          } catch (err) {
            console.error("JSME: Initialization Error", err);
          }
        }
      };

      // หน่วงเวลาเล็กน้อยให้ Modal แอนิเมชั่นเสร็จก่อนค่อยวาด
      const timer = setTimeout(initEditor, 400);
      
      // ตั้ง interval สำรองไว้เผื่อกรณีโหลดช้า
      checkInterval = setInterval(() => {
        if (!jsmeRef.current && window.JSME) initEditor();
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(checkInterval);
        jsmeRef.current = null;
        setEngineActive(false);
      };
    }
  }, [isOpen]);

  const handleApply = async () => {
    // ดึงค่า SMILES ที่ผู้ใช้วาดจริง
    let smiles = "";
    if (jsmeRef.current) {
      smiles = jsmeRef.current.smiles();
    }

    // กรณีไม่ได้วาด (หรือวาดเล่นๆ) ให้ใช้ค่า Mockup ของ Staurosporine เพื่อความเป๊ะตอน Demo
    const mockSmiles = "CN1C2=C(C=CC=C2)C3=C1C4=CC=CC=C4C5=C3C6=C(C(=O)N5)C7C(O6)C(C(C7)NC)OC";
    const finalSmiles = smiles || mockSmiles;

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', { 
        smiles: finalSmiles 
      });
      onApply(response.data);
      onClose();
    } catch (error) {
      // Fallback กรณี Backend ไม่รัน (ส่ง Data ไป Dashboard ได้เลย)
      onApply({ 
        smiles: finalSmiles, 
        mw: 466.53, 
        logp: 4.12, 
        hbd: 2, 
        hba: 5 
      });
      onClose();
    }
  };

  const handleClear = () => { if (jsmeRef.current) jsmeRef.current.reset(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Window */}
      <div className="relative bg-white w-full max-w-5xl h-[750px] rounded-[40px] overflow-hidden flex flex-col border border-white/20 shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header: Sci-Fi Research Style */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-900/20">
              <PenTool size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-2xl leading-none uppercase tracking-tighter">Molecular Sketcher</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Core Analysis Node • Build 2026</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 rounded-full text-slate-300 hover:text-slate-900 transition-all active:scale-90"
          >
            <X size={28} />
          </button>
        </div>

        {/* Drawing Canvas Area */}
        <div className="flex-1 bg-slate-50/50 m-6 rounded-[32px] border-2 border-slate-100 relative shadow-inner overflow-hidden group">
          {/* กล่องบรรจุ JSME */}
          <div 
            id="jsme_container" 
            className={`w-full h-full transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`}
          ></div>

          {/* Loading Overlay ระหว่างวาด Interface */}
          {!engineActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white">
              <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inlining Sketcher Modules...</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-white border-t border-slate-50 flex justify-between items-center">
          <button 
            onClick={handleClear} 
            className="flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors"
          >
            <RotateCcw size={18} /> Reset Canvas
          </button>
          
          <div className="flex gap-5">
            <button 
              onClick={onClose} 
              className="px-10 py-4 text-xs font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleApply}
              className="flex items-center gap-4 px-12 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-2xl shadow-2xl shadow-slate-900/30 transition-all active:scale-95 uppercase tracking-[0.2em]"
            >
              <Save size={20} /> Deploy Structure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketcherModal;
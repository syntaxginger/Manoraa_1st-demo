import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/shared/SearchBar';
import SketcherModal from '../components/shared/SketcherModal';
import { ArrowRight, Beaker, Globe, Database, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const SmartSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSketcherOpen, setIsSketcherOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันการค้นหาพร้อมส่งข้อมูลไป Python Backend (อยู่ใน Component แล้ว)
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!searchValue.trim()) {
      alert("Please input a chemical structure or identifier to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      // ส่งค่า SMILES ไปคำนวณที่ Backend พอร์ต 8000
      const response = await axios.post('http://localhost:8000/analyze', {
        smiles: searchValue
      });
      
      // นำข้อมูลที่ได้จาก Python (mw, logp, ฯลฯ) ไปที่หน้า Dashboard
      navigate('/dashboard', { state: { result: response.data } });
    } catch (error) {
      console.error("Backend Error:", error);
      // ถ้า Backend ไม่รัน ให้พาไปหน้า Dashboard แบบใช้ข้อมูลสำรอง
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-12 bg-[#F1F5F9] overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="w-full max-w-3xl text-center mb-14 space-y-6">
        <div className="flex justify-center mb-4">
          <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center gap-2.5">
            <ShieldCheck size={14} className="text-blue-600" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Verified Research Terminal</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
          Manoraa<span className="text-blue-600">.</span>
        </h1>
        
        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mx-auto">
          Mapping Analogous Nuclei onto Residue and Affinity. 
          <span className="block text-slate-400 text-xs mt-2 font-normal tracking-wide italic">
            Advanced drug discovery and protein-ligand interaction analysis.
          </span>
        </p>
      </div>

      {/* 2. Main Search Console */}
      <div className="w-full max-w-3xl space-y-8">
        <form onSubmit={handleSearch} className="flex flex-col items-center gap-8">
          <div className="w-full bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 transition-shadow focus-within:shadow-xl focus-within:shadow-blue-500/5">
            <SearchBar 
              value={searchValue} 
              onChange={setSearchValue} 
              onOpenSketcher={() => setIsSketcherOpen(true)} 
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing Data...' : 'Initiate Full Analysis'}
            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />}
          </button>
        </form>
      </div>

      {/* 3. System Highlights */}
      <div className="grid grid-cols-3 gap-10 mt-20 border-t border-slate-200 pt-12 w-full max-w-4xl">
        <div className="space-y-3 text-center md:text-left group">
          <div className="flex items-center gap-3 text-slate-900 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-blue-50 transition-colors">
              <Database size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Repository</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Full synchronization with UniProt and PDB hierarchical structural data.
          </p>
        </div>

        <div className="space-y-3 text-center md:text-left group">
          <div className="flex items-center gap-3 text-slate-900 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-blue-50 transition-colors">
              <Globe size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Affinity</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Accurate LogKi models based on validated binding datasets.
          </p>
        </div>

        <div className="space-y-3 text-center md:text-left group">
          <div className="flex items-center gap-3 text-slate-900 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-blue-50 transition-colors">
              <Beaker size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Visual Lab</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Interactive structural exploration with real-time geometric feedback.
          </p>
        </div>
      </div>

      <SketcherModal 
        isOpen={isSketcherOpen} 
        onClose={() => setIsSketcherOpen(false)}
        onApply={(smiles) => {
          setSearchValue(smiles);
          setIsSketcherOpen(false);
        }}
      />

      <div className="mt-auto pt-10 pb-6 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] flex items-center gap-4">
        <span className="w-8 h-px bg-slate-200"></span>
        System Build v3.2.0 • 2026 Stable
        <span className="w-8 h-px bg-slate-200"></span>
      </div>
    </div>
  );
};

export default SmartSearch;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Eye, Cpu, Save, Search } from 'lucide-react';

const SystemSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Universal Back to Search Button */}
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
            <Settings size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            System Settings
          </h2>
        </div>
        <p className="text-slate-500 text-sm font-medium">Configure analysis parameters and visualization preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Visualization Settings */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <Eye size={14} /> Visualization
          </h3>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 text-sm">High-Fidelity Rendering</p>
                <p className="text-[11px] text-slate-400">Enable advanced shadows and ambient occlusion.</p>
              </div>
              {/* Toggle Switch - Slate Style */}
              <div className="w-10 h-5 bg-slate-900 rounded-full relative cursor-pointer transition-colors">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Model Settings */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <Cpu size={14} /> AI Engine
          </h3>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-bold text-xs text-slate-700 outline-none focus:border-blue-500/50 transition-colors">
              <option>MANORAA Predictor v3.2 (Stable)</option>
              <option>DeepAffinity Experimental v4.0</option>
              <option>AutoDock Vina Integration</option>
            </select>
            <p className="text-[9px] text-slate-400 mt-3 font-bold uppercase tracking-wider">
              Note: Experimental models may increase computation time.
            </p>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <button className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-slate-900/10 transition-all active:scale-95">
          <Save size={14} /> Save Configurations
        </button>
        
      </div>
    </div>
  );
};

export default SystemSettings;
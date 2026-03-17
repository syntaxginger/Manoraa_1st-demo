import React from 'react';
import { Beaker, Activity, Box, ClipboardCheck, Info, Database, Zap, FileText } from 'lucide-react';

const InsightDashboard = () => {
  // --- HARDCODED DEMO DATA ---
  const stuData = {
    name: "Staurosporine",
    ligandId: "STU",
    pdbId: "1XJD",
    smiles: "CN1C2=C(C=CC=C2)C3=C1C4=CC=CC=C4C5=C3C6=C(C(=O)N5)C7C(O6)C(C(C7)NC)OC",
    metrics: {
      mw: "466.53",
      logp: "4.12",
      hbd: "2",
      hba: "5"
    },
    verdict: {
      affinity: "0.00033",
      resolution: "2.0"
    },
    equation: "Log10Ki = -12.4200 + 0.2215xD(B11,B20) + 0.2143xD(B23,B20) + 0.1788xD(B4,B6)"
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
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest leading-tight">REF ID: {stuData.pdbId}</span>
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

        {/* --- 3. BOTTOM VISUAL & VERDICT --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-[550px]">
          
          {/* Visual Mapping Card (กล่องวิดีโอ - ซ้าย) */}
          <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden relative flex flex-col hover:shadow-lg transition-all group">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center group-hover:bg-slate-50/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">3D Structure Viewer (1XJD)</span>
              </div>
            </div>
            
            <div className="flex-1 bg-black relative flex items-center justify-center">
              {/* <----- วางไฟล์วิดีโอที่คุณอัดไว้ที่นี่! -----> */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="vdo\3D_Structure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay ข้อมูลแบบ Minimal */}
              <div className="absolute bottom-6 left-6 p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-1 leading-none">Visualization</p>
                <p className="text-xs font-medium opacity-90 italic">Complex STU (1STU) with Kinase-A</p>
              </div>
            </div>
          </div>

          {/* Quick Verdict Card (ขวา) */}
          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Quick <span className="text-blue-600">Verdict</span></h4>
                <Zap size={18} className="text-blue-100" />
              </div>

              <div className="space-y-6">
                {[
                  { label: "Binding Affinity", value: `${stuData.verdict.affinity} µM`, highlight: true },
                  { label: "PDB Resolution", value: `${stuData.verdict.resolution} Å`, highlight: false },
                  { label: "Lipinski's Rule", value: "PASSED", highlight: false, passed: true }
                ].map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center ${idx < 2 ? 'border-b border-slate-50 pb-3' : ''}`}>
                      <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider leading-none">{item.label}</span>
                      {item.passed ? (
                          <span className="text-[10px] font-black text-white bg-green-500 px-3 py-1 rounded-md uppercase tracking-tighter shadow-sm leading-none">Passed</span>
                      ) : (
                          <span className={`text-base font-black ${item.highlight ? 'text-blue-600' : 'text-slate-700'} tracking-tight leading-none`}>{item.value}</span>
                      )}
                    </div>
                ))}
              </div>

              {/* Model Formula Box (Minimalist Gradient) */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/20 rounded-[32px] border border-slate-100 relative group transition-all hover:border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Database size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Prediction Model Ki</span>
                </div>
                <code className="text-[10px] text-blue-600 font-mono leading-relaxed block break-words italic font-medium">
                  {stuData.equation}
                </code>
              </div>
            </div>

            {/* ปุ่มเหลี่ยมมนสีดำสมส่วน */}
            <button className="w-full py-4.5 bg-[#1E293B] hover:bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-2 mt-10">
              <FileText size={16} />
              Generate PDF Report
            </button>
          </div>

        </section>
      </div>
    </div>
  );
};

export default InsightDashboard;
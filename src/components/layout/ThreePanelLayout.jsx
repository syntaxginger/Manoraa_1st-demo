import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import MunySidebar from './MunySidebar';

const ThreePanelLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // สำหรับปุ่มเปลี่ยนหน้า
  const [isMunyOpen, setIsMunyOpen] = useState(true);
  const [hasSearched, setHasSearched] = useState(false); // สถานะปลดล็อคหน้าอื่น
  
  const getPageName = () => {
    switch(location.pathname) {
      case '/': return 'search';
      case '/dashboard': return 'dashboard';
      case '/lab': return 'lab';
      case '/report': return 'report';
      default: return 'search';
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans antialiased selection:bg-blue-100 font-inter">
      
      {/* 1. LEFT PANEL: Hierarchy & Navigation (โค้ดเดิมของคุณ) */}
      <aside className="hidden lg:flex w-[260px] flex-col border-r border-slate-200 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2.5">
          <div className="w-6 h-6 bg-slate-900 rounded-sm flex items-center justify-center">
             <span className="text-[10px] text-white font-black">M</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Manoraa</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Research Navigation</p>
          <div className="space-y-4">
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Active Workspace</p>
              <div className="space-y-1.5">
                <div className="group cursor-pointer p-3 rounded-xl bg-blue-50 border border-blue-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[13px] font-bold text-blue-900">Staurosporine</span>
                  </div>
                  <p className="text-[10px] text-blue-500 mt-1 ml-5 font-medium">PDB: 1STU • Loaded</p>
                </div>
                <div className="group cursor-pointer p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-400"></div>
                    <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">Trimethoprim</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 ml-5 font-medium">PDB: 2W9H • In Queue</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 border border-dashed border-slate-200 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all uppercase tracking-tighter">
                + Add New Structure
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-slate-100">
           <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">System Build: v3.2.0</div>
        </div>
      </aside>

      {/* 2. CENTER PANEL */}
      <main className="relative flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* --- FLOATING NAVIGATION PILL (ตรงกลางล่าง) --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[40] flex items-center bg-white/60 backdrop-blur-lg border border-white/20 p-1.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

        </div>

        {/* --- MINIMAL FLOATING AI BUTTON (มุมล่างขวา) --- */}
        {!isMunyOpen && (
          <div className="absolute bottom-6 right-6 z-[100] flex items-center group">
            <span className="mr-3 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 pointer-events-none">
              Muny Assistant
            </span>
            <button 
              onClick={() => setIsMunyOpen(true)} 
              className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-sm hover:shadow-blue-100 hover:bg-white/60 transition-all duration-300 active:scale-90 group"
            >
              <div className="w-8 h-8 bg-slate-900/90 rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-md group-hover:bg-blue-600 transition-colors duration-300">
                M
              </div>
              <div className="absolute inset-0 rounded-full border border-blue-400/0 group-hover:border-blue-400/20 group-hover:scale-110 transition-all duration-500"></div>
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto pb-24">
          {/* ส่ง context ไปให้หน้าลูกเพื่อใช้ setHasSearched(true) */}
          <Outlet context={[hasSearched, setHasSearched]} />
        </div>
      </main>

      {/* 3. RIGHT PANEL: Muny AI Sidebar */}
      <aside 
        className={`relative flex flex-col border-l border-slate-200 bg-white transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-20 
          ${isMunyOpen ? 'w-[320px]' : 'w-0'}`}
      >
        {isMunyOpen && (
          <button 
            onClick={() => setIsMunyOpen(false)}
            className="absolute -left-5 bottom-6 z-50 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg hover:text-blue-500 transition-all duration-300 active:scale-90 group"
          >
             <span className="text-slate-300 group-hover:text-slate-600 transition-colors">❯</span>
          </button>
        )}

        <div className={`min-w-[320px] h-full transition-opacity duration-300 ${isMunyOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <MunySidebar currentPage={getPageName() || 'general'} />
        </div>
      </aside>

    </div>
  );
};

// Helper Component สำหรับปุ่มเมนู
const NavButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300
      ${active 
        ? 'bg-slate-900 text-white shadow-md' 
        : 'text-slate-400 hover:text-slate-900 hover:bg-white/50'}`}
  >
    {label}
  </button>
);

export default ThreePanelLayout;
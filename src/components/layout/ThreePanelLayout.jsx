import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MunySidebar from './MunySidebar';

const ThreePanelLayout = () => {
  const location = useLocation();
  
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
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans antialiased selection:bg-blue-100">
      
      {/* 1. LEFT PANEL: Hierarchy & Navigation (Academic Gray) */}
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
    {/* Demo ตัวที่ 1 */}
    <div className="group cursor-pointer p-3 rounded-xl bg-blue-50 border border-blue-100 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-[13px] font-bold text-blue-900">Staurosporine</span>
      </div>
      <p className="text-[10px] text-blue-500 mt-1 ml-5 font-medium">PDB: 1STU • Loaded</p>
    </div>

    {/* Demo ตัวที่ 2 */}
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

      {/* 2. CENTER PANEL: Main Workstation */}
      <main className="relative flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* 3. RIGHT PANEL: Muny AI Sidebar (Professional White) */}
      <aside className="w-[320px] flex flex-col border-l border-slate-200 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] shadow-sm z-20">
        <MunySidebar currentPage={getPageName()} />
      </aside>

    </div>
  );
};

export default ThreePanelLayout;
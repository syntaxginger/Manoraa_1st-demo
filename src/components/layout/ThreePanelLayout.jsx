import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, Beaker, FileText } from 'lucide-react'; 
import MunySidebar from './MunySidebar';

const ThreePanelLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMunyOpen, setIsMunyOpen] = useState(true);
  const [hasSearched, setHasSearched] = useState(false); 
  
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
      
      {/* 1. LEFT PANEL: Split into Rail and Workspace */}
      <aside className="hidden lg:flex w-[320px] border-r border-slate-200 bg-white z-10 shadow-sm">
        
        {/* --- PART A: LEFT SIDE RAIL (Main Navigation) --- */}
        <nav className="w-20 flex flex-col items-center py-6 gap-6 border-r border-slate-50 bg-slate-50/50">
          {/* Mini Logo */}
          <div 
            className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => navigate('/')}
          >
             <span className="text-xs text-white font-black">M</span>
          </div>
          
          <RailIcon 
            icon={<Search size={20}/>} 
            active={location.pathname === '/'} 
            onClick={() => navigate('/')} 
            label="Search" 
          />
          <RailIcon 
            icon={<LayoutDashboard size={20}/>} 
            active={location.pathname === '/dashboard'} 
            onClick={() => navigate('/dashboard')} 
            label="Dash" 
          />
          <RailIcon 
            icon={<Beaker size={20}/>} 
            active={location.pathname === '/lab'} 
            onClick={() => navigate('/lab')} 
            label="3D Lab" 
          />
          <RailIcon 
            icon={<FileText size={20}/>} 
            active={location.pathname === '/report'} 
            onClick={() => navigate('/report')} 
            label="Report" 
          />
        </nav>

        {/* --- PART B: WORKSPACE PANEL (Hierarchy) --- */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">Manoraa</h2>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Platform V4.0</p>
          </div>

          <div className="p-5 space-y-8">
            <section>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Active Workspace</p>
              <div className="space-y-2">
                {/* Structure Item 1 */}
                <div className="group cursor-pointer p-3 rounded-xl bg-blue-50 border border-blue-100 transition-all hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[13px] font-bold text-blue-900">Staurosporine</span>
                  </div>
                  <p className="text-[10px] text-blue-400 mt-1 ml-5.5 font-medium">PDB: 1STU • Loaded</p>
                </div>
                {/* Structure Item 2 */}
                <div className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-slate-400"></div>
                    <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Trimethoprim</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 ml-5.5 font-medium">PDB: 2W9H • In Queue</p>
                </div>
              </div>
              <button className="w-full mt-5 py-2.5 border border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all uppercase tracking-tighter">
                + Add New Structure
              </button>
            </section>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/30">
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Build v3.2.0 • 2026</div>
          </div>
        </div>
      </aside>

      {/* 2. CENTER PANEL */}
      <main className="relative flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        {/* --- FLOATING AI TOGGLE (มุมล่างขวา) --- */}
        {!isMunyOpen && (
          <div className="absolute bottom-8 right-8 z-[100] flex items-center group">
            <span className="mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl translate-x-2 group-hover:translate-x-0 pointer-events-none uppercase tracking-widest">
              Open Muny AI
            </span>
            <button 
              onClick={() => setIsMunyOpen(true)} 
              className="w-14 h-14 bg-white/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:bg-white/60 transition-all duration-300 active:scale-90 group"
            >
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-lg group-hover:bg-blue-600 transition-colors">
                M
              </div>
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto">
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
            className="absolute -left-6 bottom-8 z-50 w-12 h-12 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl hover:text-blue-500 transition-all active:scale-90 group"
          >
             <span className="text-slate-300 group-hover:text-slate-600 transition-colors text-lg font-light">❯</span>
          </button>
        )}

        <div className={`min-w-[320px] h-full transition-opacity duration-300 ${isMunyOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <MunySidebar currentPage={getPageName() || 'general'} />
        </div>
      </aside>

    </div>
  );
};

// Helper Component สำหรับปุ่มเมนูบน Side Rail
const RailIcon = ({ icon, active, onClick, label, disabled }) => (
  <button 
    onClick={!disabled ? onClick : undefined}
    className={`group relative flex flex-col items-center w-full transition-all ${disabled ? 'opacity-20 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
  >
    <div className={`p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-white shadow-xl shadow-blue-100 text-blue-200 scale-110' : 'text-slate-400 group-hover:text-slate-900 group-hover:bg-white/50'}`}>
      {icon}
    </div>
    <span className={`text-[9px] mt-2 font-black uppercase tracking-tighter transition-colors ${active ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-600'}`}>
      {label}
    </span>
    {/* Active Indicator Line */}
    {active && <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full shadow-[2px_0_8px_rgba(37,99,235,0.4)]" />}
  </button>
);

export default ThreePanelLayout;
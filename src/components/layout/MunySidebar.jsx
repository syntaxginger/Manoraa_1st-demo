import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  MessageSquare, 
  ChevronRight, 
  Settings, 
  BookOpen, 
  Search,
  Activity,
  FileText,
  MousePointer2
} from 'lucide-react';

const MunySidebar = ({ currentPage }) => {
  const navigate = useNavigate();

  const menuConfig = {
    search: {
      greeting: "Welcome to the MANORAA Platform. You can begin your analysis by entering a molecule name (SMILES) or uploading a structure to search our comprehensive database.",
actions: [
  { 
    label: "Search Guide", 
    icon: <Search size={16} />, 
    path: "/guide" // <--- ลองเปลี่ยนเป็น /guide ชั่วคราวเพื่อให้เห็นว่ามัน "ทำงานแล้ว"
  },
  { 
  label: "Database Docs", 
  icon: <BookOpen size={16} />, 
  path: "/docs"
},
  { label: "System Settings", icon: <Settings size={16} />, path: "/settings" }
]
    },
    dashboard: {
      greeting: "Analysis complete. We've summarized the initial data and LogKi affinity scores. Would you like to perform a deep-dive analysis of the molecular interactions?",
      actions: [
        { label: "Open 3D Lab", icon: <Activity size={16} />, path: "/lab" },
        { label: "Generate Report", icon: <FileText size={16} />, path: "/report" },
        { label: "New Search", icon: <Search size={16} />, path: "/" }
      ]
    },
    lab: {
      greeting: "You are in the 3D Visualization environment. You can measure interatomic distances or inspect binding forces in real-time.",
      actions: [
        { label: "Export Data", icon: <FileText size={16} />, path: "/report" },
        { label: "Back to Home", icon: <Search size={16} />, path: "/" }
      ]
    },
    report: {
        greeting: "The structural coordinate report is ready for export. You can download the data in PDB format or share the results with your team.",
        actions: [
          { label: "Download PDB", icon: <FileText size={16} />, path: "/report" },
          { label: "Open Visualizer", icon: <Activity size={16} />, path: "/lab" },
          { label: "Start New Project", icon: <Search size={16} />, path: "/" }
        ]
      }
  };

  const currentMenu = menuConfig[currentPage] || menuConfig.search;

  return (
    <div className="flex flex-col h-full bg-white text-slate-700 font-sans border-l border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-[#F8FAFC]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-sm">
              <MessageSquare size={20} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Muny Assistant</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">AI Research Support</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-8">
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
          <p className="text-[13px] leading-relaxed text-slate-600 font-medium italic">
            "{currentMenu.greeting}"
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Suggested Operations</p>
          <div className="space-y-2">
            {currentMenu.actions.map((btn, index) => (
              <button
                key={index}
                onClick={() => navigate(btn.path)} // <--- หัวใจสำคัญที่ทำให้กดได้ทุกลิ้งก์
                className="w-full flex items-center justify-between group p-3.5 bg-white hover:bg-slate-900 border border-slate-200 rounded-xl transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3 text-[12px] font-bold text-slate-600 group-hover:text-white transition-colors">
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {btn.icon}
                  </span>
                  {btn.label}
                </div>
                <ChevronRight size={14} className="text-slate-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30">
        <div className="bg-white p-3 rounded-lg flex items-center justify-center gap-2 border border-slate-200">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Server Status: Connected</span>
        </div>
      </div>
    </div>
  );
};

export default MunySidebar;
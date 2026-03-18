import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, ChevronRight, Sparkles, ArrowLeft, PlayCircle, 
  BookOpen, Settings, RotateCcw, FileText, Search, LayoutDashboard
} from 'lucide-react';

const MunySidebar = ({ currentAffinity, interactions, currentPage }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  // --- 1. CONFIG: หน้าและคำถามที่สำคัญ (Contextual Suggestions) ---
  const pageConfigs = {
    search: {
      welcome: "Welcome to MANORAA. I'm Muny, your AI research assistant. How can I help you today?",
      options: [
        { label: "Search Guide", action: "guide_info", icon: <Search size={14}/> },
        { label: "Database Sources", action: "db_info", icon: <BookOpen size={14}/> },
        { label: "Go to Dashboard", action: "/dashboard", icon: <LayoutDashboard size={14}/>, isReal: true },
        { label: "System Settings", action: "/settings", icon: <Settings size={14}/> }
      ],
      backPath: "/" // หน้าแรกอยู่แล้ว
    },
    dashboard: {
      welcome: "Insight Dashboard loaded. I've analyzed the structural clusters and binding trends.",
      options: [
        { label: "What is this score?", action: "score_info" },
        { label: "Deep-Dive in 3D Lab", action: "/lab", icon: <PlayCircle size={14}/>, isReal: true },
        { label: "Back to Search", action: "/", icon: <Search size={14}/>, isReal: true }
      ],
      backPath: "/"
    },
    lab: {
      welcome: "3D Lab active. I'm ready to calculate real-time binding affinity and forces.",
      options: [
        { label: "How to interact?", action: "lab_info" },
        { label: "Check Ki Affinity", action: "affinity", isReal: true },
        { label: "View Report", action: "/report", icon: <FileText size={14}/>, isReal: true }
      ],
      backPath: "/"
    },
    report: {
      welcome: "Summary Report generated. All molecular interactions are mapped and verified.",
      options: [
        { label: "Export Data", action: "export_info" },
        { label: "Start New Analysis", action: "/", icon: <RotateCcw size={14}/>, isReal: true }
      ],
      backPath: "/"
    }
  };

  const config = pageConfigs[currentPage] || pageConfigs.search;

  useEffect(() => {
    setMessages([{ role: 'ai', content: config.welcome }]);
    setCurrentOptions(config.options);
  }, [currentPage]);

  // --- 2. DEMO ANSWERS: จำลองคำตอบ 5 แบบ ---
  const getDemoResponse = (action) => {
    const responses = {
      "guide_info": "To search, enter a PDB ID (e.g., 1HLV) or a SMILES string. My system will retrieve hierarchical data and visualize it in 3D.",
      "db_info": "MANORAA integrates data from UniProt, PDBbind, and ChEMBL. We use a hierarchical structure to make navigation 10x faster.",
      "score_info": "The 'Smart Score' represents a weighted average of binding affinity and structural stability (RMSD). Higher is better.",
      "lab_info": "You can click on any atom to view its specific interactions. Toggle the 'Pocket' view to see the binding site clearly.",
      "affinity": `Current analysis shows a Binding Affinity (Ki) of **${currentAffinity || '5.2'} nM**, indicating a very strong interaction.`,
      "export_info": "You can export the results as a PDF Report or download the processed PDB file for further MD simulations."
    };
    return responses[action] || "Processing your request... Module synchronized.";
  };

  // --- 3. LOGIC: การจัดการคำตอบและ Thinking Mode ---
  const handleSelection = (option) => {
    const newMessages = [...messages, { role: 'user', content: option.label }];
    setMessages(newMessages);
    setIsThinking(true); 

    // ถ้าเป็น Navigation ให้ไปทันทีหลังจาก "คิด" เสร็จ
    if (option.action?.startsWith('/')) {
        setTimeout(() => {
            setIsThinking(false);
            navigate(option.action);
        }, 1000);
        return;
    }

    // จำลองการตอบคำถาม
    setTimeout(() => {
      setIsThinking(false);
      const response = getDemoResponse(option.action);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans border-l border-slate-200 shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white relative">
            <MessageSquare size={18} />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div>
            <h4 className="text-[13px] font-black text-slate-800">Muny AI</h4>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{currentPage || 'Home'} NODE</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-[#F8FAFC] custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] p-4 rounded-2xl text-[12.5px] shadow-sm ${
              msg.role === 'user' 
              ? 'bg-slate-900 text-white rounded-tr-none font-bold' 
              : 'bg-white text-slate-600 border border-slate-200/50 rounded-tl-none font-medium'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Thinking Indicator (....) */}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
              <span className="text-slate-400 text-xs font-black animate-pulse">Muny is thinking</span>
              <div className="flex gap-1 ml-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Chips */}
        {!isThinking && (
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Sparkles size={12} className="text-blue-400" /> Suggested
            </p>
            <div className="flex flex-wrap gap-2">
              {currentOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelection(opt)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 bg-white text-slate-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all shadow-sm"
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-5 border-t border-slate-100 bg-white space-y-3">
        {/* ปุ่ม Back to Search เสมอตามคำขอ */}
        <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:bg-slate-50 transition-all"
        >
            <ArrowLeft size={14} /> Back to Search
        </button>

        {/* Primary Action Button */}
        <button 
            onClick={() => navigate(currentPage === 'lab' ? '/report' : '/lab')}
            className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-xl text-white group hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-50"
        >
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
            {currentPage === 'lab' ? <FileText size={16} /> : <PlayCircle size={16} />}
            {currentPage === 'lab' ? 'View Final Report' : 'Quick Start: Lab'}
          </div>
          <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default MunySidebar;